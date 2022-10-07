const {
  By, until,
} = require('selenium-webdriver');

const Page = require('./Page');

class Pastebin extends Page {
  baseURL = 'https://pastebin.com';

  get elementPasteName() { return this.driver.findElement(By.xpath('//div[@class="info-bar"]//h1')); }

  get inputPasteText() { return this.driver.findElement(By.xpath('//*[@id="postform-text"]')); }

  get inputPasteName() { return this.driver.findElement(By.xpath('//*[@id="postform-name"]')); }

  get btnCreateNewPaste() { return this.driver.findElement(By.xpath('//button[text()=\'Create New Paste\']')); }

  async open(url = this.baseURL) {
    return super.open(url);
  }

  async login(userName = '', userPassword = '') {
    if (await this.getUserName()) {
      return this;
    }

    await this.driver
      .findElement(By.xpath('//a[@class="btn-sign sign-in"]'))
      .click();

    await this.driver.wait(until.elementsLocated(By.xpath('//form[@action="/login"]')), 60000);

    await this.driver
      .findElement(By.id('loginform-username'))
      .sendKeys(userName);

    await this.driver
      .findElement(By.id('loginform-password'))
      .sendKeys(userPassword);

    await this.driver
      .findElement(By.xpath('//form[@action="/login"]'))
      .submit();

    await this.driver.wait(until.elementsLocated(By.xpath('//div[@class="post-create"]')), 10000);

    return this;
  }

  async getPasteRawText() {
    const value = this.driver
      .findElement(By.xpath('//textarea[@class="textarea -raw js-paste-raw"]'))
      .getText();

    return value;
  }

  async getSourceSyntax() {
    const value = this.driver
      .findElement(By.xpath('//div[@class="highlighted-code"]/div/div/a'))
      .getText();

    return value;
  }

  async getUserName() {
    const divUserFrameLocator = By.xpath('//div[contains(@class,"header__user-name")]');
    const userFrames = await this.driver.findElements(divUserFrameLocator);

    let userName;
    if (userFrames.length) {
      userName = userFrames[0].getText();
    }

    return userName;
  }

  setPasteText(text) {
    this.inputPasteText.sendKeys(text);
    return this;
  }

  async setSelect2Value(fieldName, value) {
    const ulResultsLocator = By.xpath(`//ul[@id="select2-postform-${fieldName}-results"]`);
    const textboxLocator = By.xpath(`//div[@class='form-group field-postform-${fieldName}']//span[@role='textbox']`);
    const textboxElement = this.driver.findElement(textboxLocator);

    await this.driver
      .wait(until.elementIsVisible(textboxElement))
      .click();

    const ulResultElement = await this.driver
      .wait(until.elementLocated(ulResultsLocator));

    await this.driver
      .findElement(By.xpath(`//li[starts-with(@id,'select2-postform-${fieldName}')][text()='${value}']`))
      .click();

    await this.driver
      .wait(until.elementTextIs(textboxElement, value));

    await this.driver
      .wait(until.stalenessOf(ulResultElement));

    return this;
  }

  async setPasteExpiration(value) {
    const result = await this.setSelect2Value('expiration', value);
    return result;
  }

  async setPasteExposure(value) {
    const result = await this.setSelect2Value('status', value);
    return result;
  }

  setPasteName(value) {
    this.inputPasteName.sendKeys(value);
    return this;
  }

  async getPasteName() {
    return this.elementPasteName.getText();
  }

  submitPaste() {
    this.btnCreateNewPaste.click();
    return this;
  }
}

module.exports = new Pastebin();
