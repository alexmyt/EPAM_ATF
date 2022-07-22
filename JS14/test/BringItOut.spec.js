/* eslint-disable no-undef */
const { expect } = require('chai');
const testPage = require('../pageobjects/Pastebin');

// eslint-disable-next-line func-names
describe.skip('Bring It Out', function () {
  this.timeout(20000);

  const requiredPasteName = 'how to gain dominance among developers';
  const requiredPasteSyntax = 'Bash';
  const requiredPasteText = 'git config --global user.name  "New Sheriff in Town"\n'
  + 'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")\n'
  + 'git push origin master --force';

  before(async () => {
    await testPage.open();
  });

  after(async () => {
    await testPage.quit(20000);
  });

  it('Create new paste', async () => {
    await Promise.resolve(
      testPage
        .setPasteText(requiredPasteText)
        .setPasteName(requiredPasteName),
    );

    await testPage.setSelect2Value('expiration', '10 Minutes');
    await testPage.setSelect2Value('status', 'Unlisted');
    await testPage.setSelect2Value('format', requiredPasteSyntax);

    testPage.submitPaste();

    await testPage.waitforReload();

    expect(await testPage.title, 'Title is eq to required').to.include(requiredPasteName);
    expect(await testPage.getPasteRawText(), 'Text is eq to required').to.eq(requiredPasteText);
    expect(await testPage.getSourceSyntax(), 'Syntax is eq to required').to.eq(requiredPasteSyntax);
  });
});
