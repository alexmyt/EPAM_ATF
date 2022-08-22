const expectChai = require('chai').expect;
const GCPage = require('../pageobjects/GoogleCloud');
const YopMail = require('../pageobjects/YopMail');

describe.skip('YopMail', function () {

  beforeEach(async ()=>{
    await YopMail.open();
    await browser.deleteCookies();
  })

  it('create new email', async () => {
    const email = await YopMail.getNewMailbox();
    console.log(email);
  });

  it('go to mailbox', async () => {
    await YopMail.checkMail('feizeuroigruddei-5758@yopmail.com');
  })

  it('clear mailbox', async () => {
    await YopMail.clearInbox('feizeuroigruddei-5758@yopmail.com');
    expect(await YopMail.emailIFrame).not.toBeDisplayed();
  })

  it('wait for mail', async () => {
    await YopMail.clearInbox('feizeuroigruddei-5758@yopmail.com');
    await YopMail.waitForMail('feizeuroigruddei-5758@yopmail.com');
    console.log(await YopMail.getEmailBody());
    await browser.debug();
  })

})

describe.only('Google Cloud', function () {
  // this.timeout(60000 * 60 * 24);

  const searchString = 'Google Cloud Pricing Calculator';
  const requiredVMClass = 'Regular';
  const requiredInstanceType = 'n1-standard-8';
  const requiredSSD = '2x375';
  const requiredLocation = 'Madrid';
  const requiredCost = 4169.76;

  it('configure and email', async () => {
    const email = await YopMail.getNewMailbox();
    await YopMail.clearInbox(email);
  
    await browser.newWindow(GCPage.baseURL);

    await GCPage.doSearch(searchString);
    await GCPage.switchToCalcFrame();
    await GCPage.calcSelectTab('Compute Engine');

    await GCPage.calcSetInputValue('Number of instances', 4);
    await GCPage.calcSetSelectOption('Operating System / Software', 'Free:');
    await GCPage.calcSetSelectOption('Provisioning model', requiredVMClass);
    await GCPage.calcSetSelectOption('Series', 'N1');
    await GCPage.calcSetSelectOption('Machine type', requiredInstanceType);

    await GCPage.calcSetCheckbox('Add GPUs.');
    await GCPage.calcSetSelectOption('GPU type', 'NVIDIA Tesla P100');
    await GCPage.calcSetSelectOption('Number of GPUs', '1');
    await GCPage.calcSetSelectOption('Local SSD', requiredSSD);
    await GCPage.calcSetSelectOption('Datacenter location', requiredLocation);
    await GCPage.calcSetSelectOption('Committed usage', '1 Year');
    await GCPage.calcAddToEstimate();

    const estimateItems = await GCPage.getEstimateItems();
    estimateText = estimateItems.join('|');

    expectChai(estimateText, 'Required VM class').to.include(`Provisioning model: ${requiredVMClass}`);
    expectChai(estimateText, 'Required Instance type').to.include(`Instance type: ${requiredInstanceType}`);
    expectChai(estimateText, 'Required SSD').to.include(`Local SSD: ${requiredSSD}`);
    expectChai(estimateText, 'Required Region').to.include(`Region: ${requiredLocation}`);
    expectChai(estimateText, 'Estimated Cost').to.include(`USD ${new Intl.NumberFormat('en-US').format(requiredCost)}`);

    await GCPage.sendEstimateToMail(email);

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[0]); 
    await YopMail.waitForMail(email);

    const emailBody = await YopMail.getEmailBody();
    expectChai(emailBody, 'Estimated Cost').to.include(`Estimated Monthly Cost: USD ${new Intl.NumberFormat('en-US').format(requiredCost)}`);

    // await browser.debug();
  });
})