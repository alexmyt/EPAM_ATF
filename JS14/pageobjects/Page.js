/* eslint-disable no-underscore-dangle */
const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

class Page {
  get windowHandle() { return this.windowHandle_; }

  get title() { return this.driver.getTitle(); }

  get url() { return this.driver.getCurrentUrl(); }

  /**
   * Open new page in new or existing WebDriver instance
   *
   * @param {string} url Page url
   * @param {WebDriver} [driver=undefined] WebDriver object
   * @memberof Page
   */
  async open(url, driver = undefined) {
    if (!driver) {
      const options = new Options();
      // options.headless = true;
      options.addArguments('--incognito');
      this.driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    } else {
      this.driver = driver;
      await this.driver.switchTo().newWindow('tab');
    }
    this.windowHandle_ = await this.driver.getWindowHandle();

    await this.driver.get(url);
  }

  /**
   * Switch to window related to current page object
   *
   * @memberof Page
   */
  async switchTo() {
    const allHandles = await this.driver.getAllWindowHandles();
    allHandles.forEach(async (handle) => {
      if (handle === this.windowHandle) {
        await this.driver.switchTo().window(handle);
      }
    });
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
