const {
  Builder, Browser, By, Key, until,
} = require('selenium-webdriver');

const driver = new Builder().forBrowser(Browser.CHROME).build();

try {
  driver.get('https://www.selenium.dev/');
  const btnDocSearch = driver.wait(until.elementLocated(By.css('button.DocSearch')), 10000);
  btnDocSearch.click();

  const input = driver.wait(until.elementLocated(By.id('docsearch-input')), 10000);
  input.sendKeys('selenium java');

} finally {
  setTimeout(() => driver.quit(), 10000);
}
