const Page = require('./Page')

class PasteBin extends Page {
  baseURL = 'https://pastebin.com';

  async open() {
    await super.open(this.baseURL);
  }

  get pasteTextField() {return $('//*[@id="postform-text"]')}
  get pasteNameField() {return $('//input[@id="postform-name"]')}
  get btnCreatePaste() {return $('//button[text()="Create New Paste"]')}
  
  get pasteRawText() {return $('//textarea[@class="textarea -raw js-paste-raw"]')}
  get pasteSourceSyntax() {return $('//div[@class="highlighted-code"]/div/div/a')}

  async setSelect2Value(fieldName, value) {
    const ulResultsLocator = `//ul[@id="select2-postform-${fieldName}-results"]`;
    const textboxLocator = `//div[@class='form-group field-postform-${fieldName}']//span[@role='textbox']`;
    const textboxElement = await $(textboxLocator);

    await textboxElement.click();

    await $(ulResultsLocator).waitForExist();

    await $(`//li[starts-with(@id,'select2-postform-${fieldName}')][text()='${value}']`).click();

    await $(ulResultsLocator).waitForExist({reverse: true});

  }

  async createPaste(options = {}) {
    if(options.name) {
      await this.pasteNameField.setValue(options.name);
    }

    if(options.text) {
      await this.pasteTextField.setValue(options.text);
    }

    if(options.expiration) {
      await this.setSelect2Value('expiration', options.expiration);
    }

    if(options.syntax) {
      await this.setSelect2Value('format', options.syntax);
    }

    await this.btnCreatePaste.click();
  }
}

module.exports = new PasteBin();