/**
 * Created by erictsangx on 19/12/2016.
 */

import search from './searchEngine';

browser.storage.local.clear();
browser.storage.local.set({ options: {} });

function notify(message) {
  search(message);
}

browser.runtime.onMessage.addListener(notify);
