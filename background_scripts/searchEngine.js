/**
 * Created by erictsangx on 19/12/2016.
 */


module.exports = function (searchObject) {
    console.log('search', searchObject);
    if (searchObject.distance >= 100) {
        const querying = browser.tabs.query({currentWindow: true, active: true});
        if (searchObject.search) {
            let searchLink = `http://www.google.com/search?q=${searchObject.content}`;

            querying.then(tabs => {
                browser.tabs.create({
                    url: searchLink,
                    active: false,
                    index: tabs[0].index + 1
                });
            });

        }
        else {
            querying.then(tabs => {
                browser.tabs.create({
                    url: searchObject.content,
                    active: false,
                    index: tabs[0].index + 1
                });
            });

        }
    }
};