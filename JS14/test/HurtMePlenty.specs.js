/* eslint-disable no-undef */
const { expect } = require('chai');
const testPage = require('../pageobjects/GoogleCloud');

// eslint-disable-next-line func-names
describe('Hurt me plenty', function () {
  this.timeout(30000);
  // this.retries(3);

  const searchString = 'Google Cloud Pricing Calculator';
  const requiredVMClass = 'Regular';
  const requiredInstanceType = 'n1-standard-8';
  const requiredSSD = '2x375';
  const requiredLocation = 'Frankfurt';
  const requiredCost = 4024.56;

  beforeEach(async () => {
    // await testPage.open('https://cloud.google.com/products/calculator?hl=en');
    testPage.open();
  });

  afterEach(async () => {
    testPage.quit();
  });

  it('Google Cloud Platform Pricing Calculator', async () => {
    await testPage.doSearch(searchString);
    await testPage.goToSearchResult(searchString);
    await testPage.switchToCalcFrame();
    await testPage.calcSelectTab('Compute Engine');

    await testPage.calcSetInputValue('Number of instances', 4);
    await testPage.calcSetSelectOption('Operating System / Software', 'Free:');
    await testPage.calcSetSelectOption('Provisioning model', requiredVMClass);
    await testPage.calcSetSelectOption('Series', 'N1');
    await testPage.calcSetSelectOption('Machine type', requiredInstanceType);
    await testPage.calcSetCheckbox('Add GPUs.');
    await testPage.calcSetSelectOption('GPU type', 'NVIDIA Tesla P100');
    await testPage.calcSetSelectOption('Number of GPUs', '1');
    await testPage.calcSetSelectOption('Local SSD', requiredSSD);
    await testPage.calcSetSelectOption('Datacenter location', requiredLocation);
    await testPage.calcSetSelectOption('Committed usage', '1 Year');
    await testPage.calcAddToEstimate();

    const estimateItems = await testPage.getEstimateItems();
    estimateText = estimateItems.join('|');

    expect(estimateText, 'Required VM class').to.include(`Provisioning model: ${requiredVMClass}`);
    expect(estimateText, 'Required Instance type').to.include(`Instance type: ${requiredInstanceType}`);
    expect(estimateText, 'Required SSD').to.include(`Local SSD: ${requiredSSD}`);
    expect(estimateText, 'Required Region').to.include(`Region: ${requiredLocation}`);

    expect(await testPage.getEstimatedTotalCost(), 'Cost eq expected').to.be.eq(requiredCost);
  });
});
