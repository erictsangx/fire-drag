/**
 * Created by erictsangx on 19/12/2016.
 */

const search = require('./searchEngine');
browser.storage.local.clear();
const {prefs} = require('../config');
browser.storage.local.set({prefs});

function notify(message) {
    search(message)
}

browser.runtime.onMessage.addListener(notify);