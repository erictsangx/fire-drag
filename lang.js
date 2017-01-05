/**
 * Created by erictsangx on 21/12/2016.
 */


export const IGNORED_TAG = ['INPUT', 'HTML'];

export const engineList = [
  { label: 'Google', url: 'https://www.google.com/search?q=@@' },
  { label: 'Yahoo', url: 'https://search.yahoo.com/search?p=@@&fr=sfp&fr2=sb-top-search&iscqry=' },
  { label: 'Bing', url: 'https://www.bing.com/search?q=@@' },
  { label: 'Amazon', url: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=@@' },
  { label: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=@@' },
  { label: 'Twitter', url: 'https://twitter.com/search?q=@@&src=typd' },
  { label: 'Wikipedia(en)', url: 'https://en.wikipedia.org/w/index.php?search=@@&title=Special:Search&go=Go' }
];


const defaultOptions = {
  textActive: true,
  linkActive: false,
  imageActive: false,
  threshold: 100,
  defaultSearch: engineList[0].label
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
