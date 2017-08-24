/**
 * Created by erictsangx on 21/12/2016.
 */

const DEBUG_ENV = true

function DEBUG(...args) {
  if (DEBUG_ENV) {
    console.info(...args)
  }
}
