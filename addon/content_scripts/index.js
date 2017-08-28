/**
 * Created by erictsangx on 5/10/2015.
 */

DEBUG('content start')

//@see https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
function isURL (url) {
  const strRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
  const re = new RegExp(strRegex)
  return re.test(url)
}

function parseLink (text) {
  const httpText = `http://${text}`
  const httpsText = `https://${text}`
  if (isURL(text)) {
    return {
      link: text,
      isLink: true
    }
  } else if (isURL(httpText)) {
    return {
      link: httpText,
      isLink: true
    }
  } else if (isURL(httpsText)) {
    return {
      link: httpsText,
      isLink: true
    }
  }
  return {
    isLink: false
  }
}

function parseDataTransfer (data) {
  const array = [...data.types]
  if (array.includes('application/x-moz-nativeimage')) {
    return {
      type: IMAGE_TYPE,
      content: data.getData('text/uri-list').trim()
    }
  }

  if (array.includes('text/uri-list')) {
    return {
      type: LINK_TYPE,
      content: data.getData('text/uri-list').trim()
    }
  }

  return {
    type: TEXT_TYPE,
    content: data.getData('text').trim()
  }
}

function init () {
  const start = {}
  let distance = 0
  let preventDrop = false
  let selectedText = ''

  document.addEventListener('dragstart', (event) => {
    start.x = event.clientX
    start.y = event.clientY
  }, false)

  document.onmouseup = () => {
    selectedText = window.getSelection().toString()
  }

  document.addEventListener('dragend', (event) => {
    if (!preventDrop) {
      event.preventDefault()

      const payload = parseDataTransfer(event.dataTransfer)

      const emitObj = {...payload, distance}

      const parent = event.target.parentNode

      if (parent && parent.nodeName === 'A') {
        emitObj.parent = parent.href
      }

      //ignore text not selected by users
      if (payload.type === TEXT_TYPE) {
        if (payload.content !== selectedText && emitObj.parent) {
          emitObj.content = emitObj.parent
          emitObj.type = LINK_TYPE
        }
      }

      if (payload.type === TEXT_TYPE) {
        const parsed = parseLink(payload.content)
        if (parsed.isLink) {
          emitObj.content = parsed.link
          emitObj.type = LINK_TYPE
        }
      }

      DEBUG('emitObj', emitObj)

      browser.runtime.sendMessage(emitObj)
    }
  })

  document.ondrop = (event) => {
    if (!preventDrop) {
      event.preventDefault()
    }
  }

  document.ondragover = (event) => {
    event.preventDefault()
    if (IGNORED_TAG.includes(event.target.nodeName)) {
      preventDrop = true
    } else {
      distance = Math.hypot(event.clientX - start.x, event.clientY - start.y)
      preventDrop = false
    }
  }
}

init()

DEBUG('content end')
