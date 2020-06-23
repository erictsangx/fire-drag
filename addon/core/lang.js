/**
 * Created by erictsangx on 21/12/2016.
 */

const DEBUG_ENV = true

function DEBUG (...args) {
  if (DEBUG_ENV) {
    console.info(...args)
  }
}

function isEmpty (obj) {
  return obj === null || obj === undefined
}

async function saveOptions (options) {
  DEBUG('saveOptions', options)
  await browser.storage.local.set({options210: options})
}

async function loadOptions () {
  let storage = await browser.storage.local.get('options210')
  DEBUG('load storage', storage)
  if (isEmpty(storage)) {
    return {}
  } else {
    return storage.options210
  }
}
