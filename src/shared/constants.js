/**
 * Created by erictsangx on 1/2/2017.
 */

export const IGNORED_TAG = ['INPUT', 'HTML']
export const IMAGE_TYPE = 'IMAGE_TYPE'
export const TEXT_TYPE = 'TEXT_TYPE'
export const LINK_TYPE = 'LINK_TYPE'

export const RIGHT = 'RIGHT'
export const LEFT = 'LEFT'
export const FIRST = 'FIRST'
export const LAST = 'LAST'

export const FOREGROUND = 'FOREGROUND'
export const BACKGROUND = 'BACKGROUND'

export const TAB_POSITIONS = [
  { label: 'Right of the current tab', value: RIGHT },
  { label: 'Left of the current tab', value: LEFT },
  { label: 'Always first', value: FIRST },
  { label: 'Always last', value: LAST },
]

export const DEFAULT_OPTIONS = {
  textActive: FOREGROUND,
  linkActive: BACKGROUND,
  imageActive: BACKGROUND,
  searchEngine: 'https://www.google.com/search?q=@@',
  position: TAB_POSITIONS[0].value,
  whitelist: '*.mozilla.org',
  cancelable: true,
}
