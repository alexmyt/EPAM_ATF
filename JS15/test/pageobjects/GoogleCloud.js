const Page = require('./Page');

class GoogleCloud extends Page {
  baseURL = 'https://cloud.google.com/';

  get searchField() { return $('//devsite-header//devsite-search/form//input[@name="q"]')}

  async open() {
    await super.open(this.baseURL);
  }

  async doSearch(searchString) {
    await this.searchField.setValue(searchString);
    await browser.keys('Enter');
    await $(`//a[@class="gs-title"]/descendant-or-self::*[text()="${searchString}"]`).click();
  }

  async switchToCalcFrame(){
    await browser.switchToFrame(await $('//devsite-iframe/iframe'));
    await browser.switchToFrame(await $('//iframe'));
  }

  async calcSelectTab(tabName) {
    await $(`//*[@id="mainForm"]/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper/md-tab-item/div[@title='${tabName}']`).click();
  }

  async calcSetInputValue(inputName, value) {
    await $(`//form[@name="ComputeEngineForm"]//label[normalize-space(text())="${inputName}"]/../input`).setValue(value);
  }

  async calcSetSelectOption(selectName, value) {
    const elementSelect = await $(`//form[@name="ComputeEngineForm"]//label[normalize-space(text())="${selectName}"]/../md-select`);
    const menuId = await elementSelect.getAttribute('aria-owns');
    await elementSelect.click();
    
    await $(`//*[@id="${menuId}"]`).waitForDisplayed();
    
    const elementSelectInput = await $$(`//*[@id="${menuId}"]//md-select-header/md-input-container/input`);
    if (elementSelectInput.length) {
      await elementSelectInput[0].setValue(value);
    }

    const listItemLocator = await $(`//*[@id="${menuId}"]/descendant::md-option/div[starts-with(normalize-space(text()),"${value}")]/..`);
    await listItemLocator.click();
    
    await $(`//*[@id="${menuId}"]`).waitForDisplayed({reverse: true});
  }

  async calcSetCheckbox(checkboxName, value = true) {
    const element = await $(`//form[@name="ComputeEngineForm"]//div[normalize-space(text())="${checkboxName}"]/../../md-checkbox`);

    if (await element.isSelected() !== value) {
      await element.click();
    }
  }

  async calcAddToEstimate(formName = 'ComputeEngineForm') {
    await $(`//form[@name="${formName}"]//button[contains(@ng-click, "listingCtrl.addComputeServer(${formName});")]`).click();
  }

  async getEstimateItems() {
    const elements = await $$('//*[@id="resultBlock"]/md-card/md-card-content//md-list/md-list-item/div[1]');

    const items = await Promise.all(elements.map((value) => value.getText()));

    return items;
  }

  async sendEstimateToMail(address) {
    await $('//button[@id="email_quote"]').click();
    await $('//form[@name="emailForm"]').waitForDisplayed();
    
    const emailField = await $('//form[@name="emailForm"]//md-input-container/descendant::label[normalize-space(text())="Email"]/../input');
    await emailField.setValue(address);
    
    const sendBtn = $('//form[@name="emailForm"]//button[normalize-space(text())="Send Email"]');
    await sendBtn.waitForClickable();
    await sendBtn.click();
  }
}

module.exports = new GoogleCloud();