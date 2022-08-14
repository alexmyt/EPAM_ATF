/* eslint-disable no-undef */
const { expect } = require('chai');
const googleCloud = require('../pageobjects/GoogleCloud');
const yopMail = require('../pageobjects/YopMail');

// eslint-disable-next-line func-names
describe('Hardcore', function () {
  this.timeout(60000);

  const searchString = 'Google Cloud Pricing Calculator';
  const requiredVMClass = 'Regular';
  const requiredInstanceType = 'n1-standard-8';
  const requiredSSD = '2x375';
  const requiredLocation = 'Madrid';
  const requiredCost = 4169.76;

  beforeEach(async () => {
    await googleCloud.open();
    // await yopMail.open(yopMail.baseURL, googleCloud.driver);
    await yopMail.open();
  });

  afterEach(async () => {
    googleCloud.quit();
    yopMail.quit();
  });

  it.skip('YopMail', async () => {
    const email = await yopMail.getNewMailbox();
    await yopMail.clearInbox(email);
    await yopMail.waitForMail(email);
  });

  it.only('Google Cloud Platform Pricing Calculator', async () => {
    const email = await yopMail.getNewMailbox();
    await yopMail.clearInbox(email);

    // await googleCloud.switchTo();
    await googleCloud.doSearch(searchString);
    await googleCloud.goToSearchResult(searchString);
    await googleCloud.switchToCalcFrame();
    await googleCloud.calcSelectTab('Compute Engine');

    await googleCloud.calcSetInputValue('Number of instances', 4);
    await googleCloud.calcSetSelectOption('Operating System / Software', 'Free:');
    await googleCloud.calcSetSelectOption('Provisioning model', requiredVMClass);
    await googleCloud.calcSetSelectOption('Series', 'N1');
    await googleCloud.calcSetSelectOption('Machine type', requiredInstanceType);
    await googleCloud.calcSetCheckbox('Add GPUs.');
    await googleCloud.calcSetSelectOption('GPU type', 'NVIDIA Tesla P100');
    await googleCloud.calcSetSelectOption('Number of GPUs', '1');
    await googleCloud.calcSetSelectOption('Local SSD', requiredSSD);
    await googleCloud.calcSetSelectOption('Datacenter location', requiredLocation);
    await googleCloud.calcSetSelectOption('Committed usage', '1 Year');
    await googleCloud.calcAddToEstimate();

    const estimateItems = await googleCloud.getEstimateItems();
    estimateText = estimateItems.join('|');

    expect(estimateText, 'Required VM class').to.include(`Provisioning model: ${requiredVMClass}`);
    expect(estimateText, 'Required Instance type').to.include(`Instance type: ${requiredInstanceType}`);
    expect(estimateText, 'Required SSD').to.include(`Local SSD: ${requiredSSD}`);
    expect(estimateText, 'Required Region').to.include(`Region: ${requiredLocation}`);

    expect(await googleCloud.getEstimatedTotalCost(), 'Cost eq expected').to.be.eq(requiredCost);

    await googleCloud.sendEstimateToMail(email);

    await yopMail.waitForMail(email);

    let costFromEmail;
    const emailBody = await yopMail.getEmailBody();
    const cost = emailBody.match(/Estimated Monthly Cost: USD\s+([\d,.]+)/);
    if (Array.isArray(cost) && cost.length >= 2) {
      costFromEmail = parseFloat(cost[1].replaceAll(',', ''));
    }

    expect(costFromEmail).to.be.eq(requiredCost, 'Cost from email eq to estimated');
  });
});
