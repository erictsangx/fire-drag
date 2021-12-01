/**
 * Created by erictsangx on 1/2/2017.
 */

const IGNORED_TAG = ['INPUT', 'HTML']
const IMAGE_TYPE = 'IMAGE_TYPE'
const TEXT_TYPE = 'TEXT_TYPE'
const LINK_TYPE = 'LINK_TYPE'

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
  searchEngine: 'https://www.google.com/search?q=@@',
  position: TAB_POSITIONS[0].value,
  whitelist: '*.mozilla.org' + '\n' + 'example.com'
}
