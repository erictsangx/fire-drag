/**
 * Created by erictsangx on 21/12/2016.
 */

const defaultOptions = {
  textActive: true,
  linkActive: false,
  threshold: 100
};

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
  browser.tabs.create(props);
}
