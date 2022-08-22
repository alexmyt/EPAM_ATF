/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a page
    * @param url url of the page 
    */
    async open (url) {
        await browser.url(url)
    }
}
