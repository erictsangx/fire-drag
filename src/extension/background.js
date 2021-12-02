/**
 * Created by erictsangx on 19/12/2016.
 */

import { DEBUG, loadOptions } from '../shared/utils'
import {
  FIRST,
  FOREGROUND,
  IMAGE_TYPE,
  LAST,
  LEFT,
  LINK_TYPE,
  TEXT_TYPE,
} from '../shared/constants'

DEBUG('background start')

async function createTab(props) {
  const allTabs = await browser.tabs.query({})

  const options = await loadOptions()

  const tabs = await browser.tabs.query({ currentWindow: true, active: true })

  let position = tabs[0].index + 1
  if (options.position === LEFT) {
    position = tabs[0].index
  }
  if (options.position === FIRST) {
    position = 0
  }
  if (options.position === LAST) {
    position = allTabs.length
  }
  if (position < 0) {
    position = 0
  }

  await browser.tabs.create(Object.assign(props, { index: position }))
}

function submitSearch(url, query) {
  return encodeURI(url.replace('@@', query))
}

function foregroundBool(target) {
  return target === FOREGROUND
}

async function search({ type, content }) {
  const options = await loadOptions()

  switch (type) {
    case IMAGE_TYPE:
      await createTab({
        url: content,
        active: foregroundBool(options.imageActive),
      })
      break
    case LINK_TYPE:
      await createTab({
        url: content,
        active: foregroundBool(options.linkActive),
      })
      break
    case TEXT_TYPE:
      await createTab({
        url: submitSearch(options.searchEngine, content),
        active: foregroundBool(options.textActive),
      })
      break
    default:
      console.error('should not happen')
  }
}

async function init() {
  browser.runtime.onMessage.addListener((message) => {
    DEBUG('received object', message)
    search(message).then()
  })
}

init().then()
DEBUG('background end')
