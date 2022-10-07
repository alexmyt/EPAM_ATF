/* eslint-disable no-undef */
const { expect } = require('chai');
const testPage = require('../pageobjects/Pastebin');

// eslint-disable-next-line func-names
describe.skip('I Can Win', function () {
  this.timeout(20000);

  const requiredPasteName = 'helloweb';

  before(async () => {
    await testPage.open();
  });

  after(async () => {
    await testPage.quit(0);
  });

  // Skip for pastebin, because page is under cloudflare and I could't find resonable timeouts
  it.skip('Login to service', async () => {
    await testPage.login('', '');
  }).timeout(100000);

  it('Create new paste', async () => {
    expect(await testPage.title, 'Page title is equal to expected').to.eq('Pastebin.com - #1 paste tool since 2002!');

    await Promise.resolve(
      testPage
        .setPasteText('Hello from WebDriver')
        .setPasteName(requiredPasteName),
    );

    await testPage.setPasteExpiration('10 Minutes');
    await testPage.setPasteExposure('Unlisted');

    testPage.submitPaste();

    await testPage.waitforReload();

    const newURL = await testPage.url;
    const pasteSearchResults = newURL.match(`^${testPage.baseURL}/(.+)`);
    expect(pasteSearchResults, 'Found paste ID after create new paste').is.an('array').that.have.length.at.least(1);

    // const pasteId = pasteSearchResults[1];
    const pasteName = await testPage.getPasteName();

    expect(pasteName).to.eq(requiredPasteName);
  });
});
