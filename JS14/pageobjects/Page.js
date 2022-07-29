const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

class Page {
  get title() { return this.driver.getTitle(); }

  get url() { return this.driver.getCurrentUrl(); }

  async open(url) {
    const options = new Options();
    // options.headless = true;
    options.addArguments('--incognito');
    this.driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    return this.driver.get(url);
  }

  async quit(delay = 0) {
    setTimeout(() => this.driver.quit(), delay);
  }

  async waitforReload() {
    const element = this.driver.findElement(By.css('html'));
    return this.driver.wait(until.stalenessOf(element), 10000);
  }
}

module.exports = Page;
