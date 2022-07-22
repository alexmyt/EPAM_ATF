/* eslint-disable no-undef */
const { expect } = require('chai');
const testPage = require('../pageobjects/GoogleCloud');

// eslint-disable-next-line func-names
describe('Hurt me plenty', function () {
  this.timeout(20000);
  const searchString = 'Google Cloud Pricing Calculator';

  before(async () => {
    await testPage.open();
  });

  after(async () => {
    await testPage.quit(20000);
  });

  it('Google Cloud Platform Pricing Calculator', async () => {
    await testPage.doSearch(searchString);
    await testPage.goToSearchResult(searchString);
    await testPage.switchToCalcFrame();
    await testPage.calcSelectTab('Compute Engine');
  });
});
