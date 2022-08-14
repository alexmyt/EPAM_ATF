const {
  By, until,
} = require('selenium-webdriver');

const Page = require('./Page');

class YopMail extends Page {
  baseURL = 'https://yopmail.com/';

  async open(url = this.baseURL, driver = undefined) {
    await super.open(url, driver);
  }

  /**
   * Generate new random email box
   *
   * @return {string} Random email
   * @memberof YopMail
   */
  async getNewMailbox() {
    await this.driver.get(`${this.baseURL}email-generator`);
    const elementLocator = By.xpath('//*[@id="egen"]');
    await this.driver.wait(until.elementLocated(elementLocator));
    const elemenText = await this.driver.findElement(elementLocator).getText();
    return elemenText;
  }

  /**
   * Go to mailbox page
   *
   * @param {string} emailAddress
   * @memberof YopMail
   */
  async checkMail(emailAddress) {
    await this.driver.get(this.baseURL);

    const elementLocator = By.xpath('//*[@id="login"]');
    await this.driver.wait(until.elementLocated(elementLocator));
    const element = await this.driver.findElement(elementLocator);
    await element.clear();
    await element.sendKeys(emailAddress);
    await element.submit();
    await this.driver.wait(until.elementLocated(By.xpath('//*[@id="ifmail"]')));
  }

  /**
   * Delete all mail froma mailbox
   *
   * @param {string} emailAddress
   * @memberof YopMail
   */
  async clearInbox(emailAddress) {
    await this.checkMail(emailAddress);

    const elementBtnLocator = By.xpath('//body[@id="webmail"]//div[@class="wminboxheader"]/div[1]/button');
    await this.driver.wait(until.elementLocated(elementBtnLocator));
    await this.driver.findElement(elementBtnLocator).click();
    await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath('//body[@id="webmail"]//div[@class="menu"]'))));

    const elementDelAll = await this.driver.findElement(By.xpath('//body[@id="webmail"]//button[@id="delall"]'));
    if (await elementDelAll.isEnabled()) {
      await elementDelAll.click();
      await this.driver.wait(until.alertIsPresent());
      const alert = await this.driver.switchTo().alert();
      await alert.accept();
    }
  }

  /**
   * Go to mailbox page and wait while mailbox is empty
   *
   * @param {*} emailAddress
   * @param {number} [waitTimer=10] How seconds wait from incoming mail
   * @param {number} [refreshPeriod=1] Period for refreshing mailbox
   * @memberof YopMail
   */
  async waitForMail(emailAddress, waitTimer = 10, refreshPeriod = 1) {
    await this.checkMail(emailAddress);

    const elementInboxFrame = await this.driver.findElement(By.xpath('//iframe[@id="ifinbox"]'));
    const elementBtn = this.driver.findElement(By.xpath('//*[@id="refresh"]'));
    const timerId = setInterval(() => elementBtn.click(), refreshPeriod * 1000);

    try {
      await this.driver.wait(until.elementIsVisible(elementInboxFrame), waitTimer * 1000);
    } finally {
      clearInterval(timerId);
    }
  }

  /**
   * Return the body of first email in mailbox
   *
   * @return {string} Email body
   * @memberof YopMail
   */
  async getEmailBody() {
    const elementInboxFrame = await this.driver.findElement(By.xpath('//iframe[@id="ifmail"]'));
    await this.driver.switchTo().frame(elementInboxFrame);

    const emailText = await this.driver.findElement(By.xpath('//div[@id="mail"]')).getText();
    await this.driver.switchTo().defaultContent();

    return emailText;
  }
}

module.exports = new YopMail();
