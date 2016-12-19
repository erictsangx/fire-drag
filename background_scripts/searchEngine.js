/**
 * Created by erictsangx on 19/12/2016.
 */


module.exports = function (searchObject) {
    const gettingItem = browser.storage.local.get("options");
    console.log('search', searchObject);
    gettingItem.then(({options}) => {
        if (searchObject.distance >= options.threshold) {
            const querying = browser.tabs.query({currentWindow: true, active: true});
            if (searchObject.search) {
                let searchLink = `http://www.google.com/search?q=${searchObject.content}`;

                querying.then(tabs => {
                    browser.tabs.create({
                        url: searchLink,
                        active: options.openIn == 'active',
                        index: tabs[0].index + 1
                    });
                });

            }
            else {
                querying.then(tabs => {
                    browser.tabs.create({
                        url: searchObject.content,
                        active: options.searchIn == 'active',
                        index: tabs[0].index + 1
                    });
                });

            }
        }
    });

};