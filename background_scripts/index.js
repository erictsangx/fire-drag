/**
 * Created by erictsangx on 19/12/2016.
 */

import search from './searchEngine';
import { saveOptions, loadOptions, defaultOptions } from '../addon/core/lang'

function notify(message) {
  search(message);
}

browser.runtime.onMessage.addListener(notify);

loadOptions().then((options) => {
  Object.assign(defaultOptions, options);
  saveOptions(defaultOptions)
});

