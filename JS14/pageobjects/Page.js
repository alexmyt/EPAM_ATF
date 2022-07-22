const { Builder, By, until } = require('selenium-webdriver');

class Page {
  get title() { return this.driver.getTitle(); }

  get url() { return this.driver.getCurrentUrl(); }

  async open(url) {
    this.driver = new Builder().forBrowser('chrome').build();
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
