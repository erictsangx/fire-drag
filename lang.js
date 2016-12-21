/**
 * Created by erictsangx on 21/12/2016.
 */


export const IGNORED_TAG = ['INPUT', 'HTML'];

const defaultOptions = {
  textActive: true,
  linkActive: false,
  imageActive: false,
  threshold: 100
};

export const IMAGE_TYPE = 'IMAGE_TYPE';
export const TEXT_TYPE = 'TEXT_TYPE';
export const LINK_TYPE = 'LINK_TYPE';

export function saveOptions(options) {
  console.info('save options', options);
  browser.storage.local.set({ options });
}


export function loadOptions() {
  return new Promise((resolve, reject) => {
    const query = browser.storage.local.get('options');
    query.then((result) => {
      console.info('load options', result);
      if (result && result.options) {
        resolve(result.options);
      } else {
        saveOptions(defaultOptions);
        resolve(defaultOptions);
      }
    }, (error) => {
      reject(error);
    });
  });
}

export function createTab(props) {
  const query = browser.tabs.query({ currentWindow: true, active: true });
  query.then((tabs) => {
    browser.tabs.create({ ...props, index: tabs[0].index + 1 });
  });
}
