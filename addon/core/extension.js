/**
 * Created by erictsangx on 21/12/2016.
 */

const DEBUG_ENV = false

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
  await browser.storage.local.set({options110: options})
}

async function loadOptions () {
  const storage = await browser.storage.local.get('options110')
  DEBUG('load storage', storage)
  if (isEmpty(storage) || Object.keys(storage).length === 0) {
    return DEFAULT_OPTIONS
  } else {
    return storage.options110
  }
}
