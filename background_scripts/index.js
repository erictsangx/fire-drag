/**
 * Created by erictsangx on 19/12/2016.
 */

import search from './searchEngine';

function notify(message) {
  search(message);
}

browser.runtime.onMessage.addListener(notify);
