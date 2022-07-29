const {
  By, until, Key,
} = require('selenium-webdriver');

const Page = require('./Page');

class GoogleCloud extends Page {
  baseURL = 'https://cloud.google.com/';

  async open(url = this.baseURL) {
    super.open(url);
  }

  async quit(wait) {
    await this.driver.switchTo().defaultContent();
    super.quit(wait);
  }

  async doSearch(searchString) {
    const elementLocator = By.xpath('//devsite-header//devsite-search/form//input[@name="q"]');

    await this.driver.wait(until.elementLocated(elementLocator));

    const inputSearchElement = await this.driver.findElement(elementLocator);
    await inputSearchElement.click();
    await inputSearchElement.clear();
    await inputSearchElement.sendKeys(searchString, Key.ENTER);

    return this;
  }

  async goToSearchResult(searchString) {
    const elementLocator = By.xpath(`//a[@class="gs-title"]/descendant-or-self::*[text()="${searchString}"]`);

    const element = await this.driver
      .wait(until.elementLocated(elementLocator));

    return this.driver
      .wait(until.elementIsVisible(element))
      .click();
  }

  async switchToCalcFrame() {
    await this.driver.switchTo().defaultContent();

    const outerIframe = await this.driver.wait(until.elementLocated(By.xpath('//devsite-iframe/iframe')));
    await this.driver.wait(until.ableToSwitchToFrame(outerIframe));

    const innerIframe = await this.driver.wait(until.elementLocated(By.xpath('//iframe')));
    await this.driver.wait(until.ableToSwitchToFrame(innerIframe));
  }

  async calcSelectTab(tabName) {
    const elementLocator = By.xpath(`//*[@id="mainForm"]/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item/div[@title='${tabName}']`);

    const element = await this.driver
      .wait(until.elementLocated(elementLocator));

    return this.driver
      .wait(until.elementIsVisible(element))
      .click();
  }

  async calcSetInputValue(inputName, value) {
    const elementLocator = By.xpath(`//form[@name="ComputeEngineForm"]//label[normalize-space(text())="${inputName}"]/../input`);
    const element = await this.driver.wait(until.elementLocated(elementLocator));
    await this.driver.wait(until.elementIsVisible(element));
    return element.sendKeys(value);
  }

  async calcSetSelectOption(selectName, value) {
    const elementLocator = By.xpath(`//form[@name="ComputeEngineForm"]//label[normalize-space(text())="${selectName}"]/../md-select`);

    const elementMdSelect = await this.driver.wait(until.elementLocated(elementLocator));

    await this.driver
      .wait(until.elementIsVisible(elementMdSelect))
      .click();

    const selectMenuId = await elementMdSelect.getAttribute('aria-owns');
    const elementSelectMenu = await this.driver.findElement(By.id(selectMenuId));

    // await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"})', elementSelectMenu);

    const elementSelectInput = await this.driver
      .findElements(By.xpath(`//*[@id="${selectMenuId}"]//md-select-header/md-input-container/input`));
    if (elementSelectInput.length) {
      await elementSelectInput[0].sendKeys(value);
    }

    const listItemLocator = By.xpath(`//*[@id="${selectMenuId}"]/descendant::md-option/div[starts-with(normalize-space(text()),"${value}")]/..`);
    await this.driver
      .wait(until.elementIsVisible(this.driver.findElement(listItemLocator)))
      .click();

    await this.driver.wait(until.elementIsNotVisible(elementSelectMenu), 1000);
    await this.driver.wait(until.elementTextContains(elementMdSelect, value), 1000);
  }

  async calcSetCheckbox(checkboxName, value = true) {
    const elementLocator = By.xpath(`//form[@name="ComputeEngineForm"]//div[normalize-space(text())="${checkboxName}"]/../../md-checkbox`);
    const element = await this.driver.findElement(elementLocator);

    if (element.isSelected !== value) {
      await element.click();
    }

    return this;
  }

  async calcAddToEstimate(formName = 'ComputeEngineForm') {
    const elementLocator = By.xpath(`//form[@name="${formName}"]//button[contains(@ng-click, "listingCtrl.addComputeServer(${formName});")]`);

    return this.driver
      .findElement(elementLocator)
      .click();
  }

  async getEstimateItems() {
    const elementLocator = By.xpath('//*[@id="resultBlock"]/md-card/md-card-content//md-list/md-list-item/div[1]');
    await this.driver.wait(until.elementsLocated(elementLocator));
    const elements = await this.driver.findElements(elementLocator);

    const items = await Promise.all(elements.map((value) => value.getText()));

    return items;
  }

  async getEstimatedTotalCost() {
    const elementLocator = By.xpath('//*[@id="resultBlock"]/md-card/md-card-content/div/div/div/h2/b');
    this.driver.wait(until.elementsLocated(elementLocator));
    const costText = await this.driver.findElement(elementLocator).getText();

    const cost = costText.match(/USD ([\d.,]+)/);
    if (Array.isArray(cost) && cost.length >= 2) {
      return parseFloat(cost[1].replaceAll(',', ''));
    }
    return 0;
  }
}

module.exports = new GoogleCloud();
