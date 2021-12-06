// noinspection HttpUrlsUsage

/**
 * Created by erictsangx on 5/10/2015.
 */

import { DEBUG, isEmpty, loadOptions } from '../shared/utils'
import {
  IGNORED_TAG,
  IMAGE_TYPE,
  LINK_TYPE,
  TEXT_TYPE,
} from '../shared/constants'

DEBUG('content start')

//@see https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
function isURL(url) {
  const strRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi
  const re = new RegExp(strRegex)
  return re.test(url)
}

function parseLink(text) {
  const httpText = `http://${text}`
  const httpsText = `https://${text}`
  if (isURL(text)) {
    return {
      link: text,
      isLink: true,
    }
  } else if (isURL(httpText)) {
    return {
      link: httpText,
      isLink: true,
    }
  } else if (isURL(httpsText)) {
    return {
      link: httpsText,
      isLink: true,
    }
  }
  return {
    isLink: false,
  }
}

function parseDataTransfer(data) {
  const array = [...data.types]
  if (array.includes('application/x-moz-nativeimage')) {
    return {
      type: IMAGE_TYPE,
      content: data.getData('text/uri-list').trim(),
    }
  }

  if (array.includes('text/uri-list')) {
    return {
      type: LINK_TYPE,
      content: data.getData('text/uri-list').trim(),
    }
  }

  return {
    type: TEXT_TYPE,
    content: data.getData('text').trim(),
  }
}

async function checkWhitelist() {
  const options = await loadOptions()
  const whitelist = options.whitelist.split('\n')
  const hostname = window.location.hostname
  const domain = hostname.match(/[^.]*\.[^.]*$/)[0]
  const result = whitelist.find(function (item) {
    const test = item.trim()
    if (test === hostname) {
      return true
    }
    if (test.includes('*.')) {
      const wildcard = test.replace('*.', '')
      return wildcard === domain
    }
    return false
  })

  if (isEmpty(result)) {
    init(options.cancelable)
  }
}

function createOverlay() {
  const overlay = document.createElement('div')
  overlay.id = 'fire-drag-overlay'

  overlay.style.backgroundImage = `url("${browser.runtime.getURL(
    'icons/no-touch.png',
  )}")`

  overlay.addEventListener('dragover', () => {
    overlay.style.opacity = '1'
  })

  overlay.addEventListener('dragleave', () => {
    overlay.style.opacity = '0.4'
  })

  overlay.ondrop = (event) => {
    event.preventDefault()
  }
  document.body.append(overlay)
  return overlay
}

function init(cancelable) {
  let preventDrop = false
  const overlay = cancelable ? createOverlay() : null

  document.addEventListener(
    'dragstart',
    (event) => {
      if (overlay) {
        overlay.style.left = event.clientX - 50 + 'px'
        overlay.style.top = event.clientY - 50 + 'px'
        overlay.style.display = 'block'
      }
    },
    false,
  )

  document.addEventListener('dragend', (event) => {
    if (overlay) {
      overlay.style.display = 'none'
    }

    if (!preventDrop) {
      event.preventDefault()

      const payload = parseDataTransfer(event.dataTransfer)

      const emitObj = { ...payload }

      if (payload.type === TEXT_TYPE) {
        const parsed = parseLink(payload.content)
        if (parsed.isLink) {
          emitObj.content = parsed.link
          emitObj.type = LINK_TYPE
        }
      }

      DEBUG('emitObj', emitObj)
      preventDrop = false
      browser.runtime.sendMessage(emitObj).then()
    }
  })

  document.ondrop = (event) => {
    if (event.target === overlay) {
      preventDrop = true
    }
    if (!preventDrop) {
      event.preventDefault()
    }
  }

  document.ondragover = (event) => {
    event.preventDefault()
    preventDrop = IGNORED_TAG.includes(event.target.nodeName)
  }
}

checkWhitelist().then()

DEBUG('content end')
