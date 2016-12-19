/**
 * Created by erictsangx on 19/12/2016.
 */


const search = require('./../background_scripts/searchEngine');

function notify(message) {
    search(message)
}

browser.runtime.onMessage.addListener(notify);