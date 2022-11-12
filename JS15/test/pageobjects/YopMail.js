const Page = require('./Page');

class YopMail extends Page {
  baseURL = 'https://yopmail.com/';

  get login() { return $('//*[@id="login"]'); }
  
  get generatedEmail() { return $('//*[@id="egen"]'); }

  get mailboxMenuBtn() { return $('//body[@id="webmail"]//div[@class="wminboxheader"]/div[1]/button'); }
  get mailboxMenuDiv() { return $('//body[@id="webmail"]//div[@class="menu"]'); }
  get mailboxDelAllBtn() { return $('//body[@id="webmail"]//button[@id="delall"]'); }
  get mailboxRefreshBtn() { return $('//*[@id="refresh"]'); }
  get inboxIFrame() { return $('//iframe[@id="ifinbox"]'); }
  get emailIFrame() { return $('//iframe[@id="ifmail"]'); }
  get emailBodyDiv() {return $('//div[@id="mail"]'); }

  async open() {
    await super.open(this.baseURL);
  }

  async getNewMailbox() {
    await browser.deleteCookies();
    await super.open(`${this.baseURL}email-generator`);
    const email = await this.generatedEmail.getText();
    return email;
  }

  async checkMail(emailAddress) {
    await this.open();
    await this.login.setValue(emailAddress);
    await this.login.keys('Enter');
  }
  
  async clearInbox(emailAddress) {
    await this.checkMail(emailAddress);

    await this.mailboxMenuBtn.click();
    await this.mailboxMenuDiv.waitForDisplayed();

    if(await this.mailboxDelAllBtn.isClickable()) {
      await this.mailboxDelAllBtn.click();
      await browser.acceptAlert();
    }
  }

  async waitForMail(emailAddress, waitTimer = 10, refreshPeriod = 1) {
    await this.checkMail(emailAddress);
    const timerId = setInterval(async (btn) => await btn.click(), refreshPeriod * 1000, await this.mailboxRefreshBtn);

    try {
      await this.inboxIFrame.waitForDisplayed({timeout: waitTimer * 1000});
    } finally {
      clearInterval(timerId);
    }

  }

  async getEmailBody() {
    await browser.switchToFrame(await this.emailIFrame);
    const email = await this.emailBodyDiv.getHTML();
    await browser.switchToFrame(null);

    return email;
  }

}

module.exports = new YopMail();
