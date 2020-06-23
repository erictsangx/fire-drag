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
  return obj === null || obj === undefined || Object.keys(obj).length === 0
}

async function saveOptions (options) {
  DEBUG('saveOptions', options)
  await browser.storage.local.set({options110: options})
}

async function loadOptions () {
  let storage = await browser.storage.local.get('options110').options110
  DEBUG('load storage', storage)
  if (isEmpty(storage)) {
    await saveOptions(DEFAULT_OPTIONS)
    return DEFAULT_OPTIONS
  } else {
    return storage
  }
}
