/**
 * Created by erictsangx on 21/12/2016.
 */

import { DEFAULT_OPTIONS } from './constants'

const DEBUG_ENV = false

//mock extension api for local development
if (!window.browser) {
  // noinspection JSConstantReassignment
  window.browser = {
    storage: {
      local: {
        set() {},
        get() {},
      },
    },
  }
}

export function DEBUG(...args) {
  if (DEBUG_ENV) {
    console.info(...args)
  }
}

export function isEmpty(obj) {
  return obj === null || obj === undefined
}

const optionKey = 'options206'

export async function saveOptions(options) {
  DEBUG('saveOptions', options)
  await browser.storage.local.set({ [optionKey]: options })
}

export async function loadOptions() {
  const storage = await browser.storage.local.get(optionKey)
  DEBUG('load storage', storage)
  if (
    isEmpty(storage) ||
    Object.keys(storage).length === 0 ||
    !storage[optionKey]
  ) {
    return DEFAULT_OPTIONS
  } else {
    return { ...DEFAULT_OPTIONS, ...storage[optionKey] }
  }
}
