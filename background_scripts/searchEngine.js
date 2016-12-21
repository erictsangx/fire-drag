/**
 * Created by erictsangx on 19/12/2016.
 */
import { loadOptions, createTab } from '../lang';

export default (searchObject) => {
  console.log('search', searchObject);
  loadOptions().then((options) => {
    if (searchObject.distance >= options.threshold) {
      const querying = browser.tabs.query({ currentWindow: true, active: true });
      if (searchObject.search) {
        const searchLink = `http://www.google.com/search?q=${searchObject.content}`;

        querying.then((tabs) => {
          createTab({
            url: searchLink,
            active: options.textActive,
            index: tabs[0].index + 1
          });
        });
      } else {
        querying.then((tabs) => {
          createTab({
            url: searchObject.content,
            active: options.linkActive,
            index: tabs[0].index + 1
          });
        });
      }
    }
  });
};
