/**
 * Created by erictsangx on 1/2/2017.
 */

const IGNORED_TAG = ['INPUT', 'HTML']
const IMAGE_TYPE = 'IMAGE_TYPE'
const TEXT_TYPE = 'TEXT_TYPE'
const LINK_TYPE = 'LINK_TYPE'

const ENGINE_LIST = [
  {
    label: 'Google',
    value: 'Google',
    url: 'https://www.google.com/search?q=@@'
  },
  {
    label: 'Yahoo',
    value: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=@@&fr=sfp&fr2=sb-top-search&iscqry='
  },
  {
    label: 'Bing',
    value: 'Bing',
    url: 'https://www.bing.com/search?q=@@'
  },
  {
    label: 'Amazon',
    value: 'Amazon',
    url: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=@@'
  },
  {
    label: 'DuckDuckGo',
    value: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=@@'
  },
  {
    label: 'Twitter',
    value: 'Twitter',
    url: 'https://twitter.com/search?q=@@&src=typd'
  },
  {
    label: 'Wikipedia(en)',
    value: 'Wikipedia(en)',
    url: 'https://en.wikipedia.org/w/index.php?search=@@&title=Special:Search&go=Go'
  },
  {
    label: 'Yandex',
    value: 'Yandex',
    url: 'https://yandex.ru/yandsearch?text=@@'
  }
]

const RIGHT = 'RIGHT'
const LEFT = 'LEFT'
const FIRST = 'FIRST'
const LAST = 'LAST'

const TAB_POSITIONS = [
  {label: 'Right of the current tab', value: RIGHT},
  {label: 'Left of the current tab', value: LEFT},
  {label: 'Always first', value: FIRST},
  {label: 'Always last', value: LAST}
]

const DEFAULT_OPTIONS = {
  textActive: true,
  linkActive: false,
  imageActive: false,
  threshold: 100,
  overrideSelectedText: false,
  defaultSearch: ENGINE_LIST[0].label,
  defaultPosition: TAB_POSITIONS[0].value
}
