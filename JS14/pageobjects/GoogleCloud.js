const {
  By, until, Key,
} = require('selenium-webdriver');

const Page = require('./Page');

class GoogleCloud extends Page {
  baseURL = 'https://cloud.google.com/';

  async open() {
    super.open(this.baseURL);
  }

  async doSearch(searchString) {
    const elementLocator = By.xpath('//devsite-header//devsite-search/form//input[@name="q"]');

    await this.driver.wait(until.elementLocated(elementLocator));

    const inputSearchElement = await this.driver.findElement(elementLocator);
    await inputSearchElement.click();
    await inputSearchElement.sendKeys(searchString, Key.ENTER);

    await this.driver
      .wait(until.elementLocated(By.xpath('//*[@id="gc-wrapper"]/main/devsite-content/article/article/div/devsite-cse')));

    return this;
  }

  async goToSearchResult(searchString) {
    const elementLocator = By.xpath(`//a[@class="gs-title"]/b[text()="${searchString}"]/..`);

    await this.driver
      .wait(until.elementLocated(elementLocator));

    return this.driver
      .findElement(elementLocator)
      .click();
  }

  async switchToCalcFrame() {
    const iframe = await this.driver.wait(until.elementLocated(By.id('myFrame')));
    this.driver.switchTo().frame(iframe);
  }

  async calcSelectTab(tabName) {
    const elementLocator = `//*[@id="mainForm"]/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item/div[@title='${tabName}']`;

    return this.driver
      .wait(until.elementLocated(elementLocator))
      .click();
  }
}

module.exports = new GoogleCloud();
