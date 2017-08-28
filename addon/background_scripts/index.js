/**
 * Created by erictsangx on 19/12/2016.
 */

DEBUG('background start')

async function createTab (props) {
  const allTabs = await browser.tabs.query({})

  const options = await loadOptions()

  const tabs = await browser.tabs.query({currentWindow: true, active: true})

  let position = tabs[0].index + 1
  if (options.defaultPosition === LEFT) {
    position = tabs[0].index
  }
  if (options.defaultPosition === FIRST) {
    position = 0
  }
  if (options.defaultPosition === LAST) {
    position = allTabs.length
  }
  if (position < 0) {
    position = 0
  }

  await browser.tabs.create(Object.assign(props, {index: position}))
}

function submitSearch (value, query) {
  const engine = ENGINE_LIST.find((item) => {
    return item.value === value
  })
  return encodeURI(engine.url.replace('@@', query))
}

async function search ({type, content, distance, parent}) {
  const options = await loadOptions()

  if (options.overrideSelectedText && parent) {
    await createTab({
      url: parent,
      active: options.linkActive
    })
    return
  }

  if (distance >= options.threshold) {
    switch (type) {
      case IMAGE_TYPE:
        await createTab({
          url: content,
          active: options.imageActive
        })
        break
      case LINK_TYPE:
        await createTab({
          url: content,
          active: options.linkActive
        })
        break
      case TEXT_TYPE:
        await createTab({
          url: submitSearch(options.defaultSearch, content),
          active: options.textActive
        })
        break
      default:
        console.error('should not happen')
    }
  }
}

async function init () {
  const options = await loadOptions()
  const save = Object.assign(DEFAULT_OPTIONS, options)
  await saveOptions(save)

  browser.runtime.onMessage.addListener((message) => {
    search(message).then()
  })
}

init().then()

DEBUG('background end')
