/**
 * Created by erictsangx on 21/12/2016.
 */

const DEBUG_ENV = true

function DEBUG (...args) {
  if (DEBUG_ENV) {
    console.info(...args)
  }
}

async function saveOptions (options) {
  await browser.storage.local.set({options})
}

async function loadOptions () {
  const result = await browser.storage.local.get('options')
  if (result && result.options) {
    return result.options
  }
  await saveOptions(DEFAULT_OPTIONS)
  return DEFAULT_OPTIONS
}
