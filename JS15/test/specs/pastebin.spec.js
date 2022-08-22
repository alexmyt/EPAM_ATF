const PasteBinPage = require('../pageobjects/PasteBin');

describe('PasteBin site', () => {
  const pasteCode = 'git config --global user.name  "New Sheriff in Town"\n'
  + 'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")\n'
  + 'git push origin master --force';

  const pasteName = 'how to gain dominance among developers';
  const pasteExpiration = '10 Minutes';
  const pasteSyntax = 'Bash';

  it('should create paste', async () => {
    await PasteBinPage.open();
    
    await PasteBinPage.createPaste({
      name: pasteName, 
      text: pasteCode,
      expiration: pasteExpiration,
      syntax: pasteSyntax
    });

    await expect(browser).toHaveTitleContaining(pasteName);
    await expect(PasteBinPage.pasteRawText).toHaveValue(pasteCode);
    await expect(PasteBinPage.pasteSourceSyntax).toHaveText(pasteSyntax);

    // await browser.debug();
  })
})