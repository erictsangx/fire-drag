async function init () {
  // const opts = await loadOptions()
  // DEBUG('opts', opts)

  function isEmpty (value) {
    return value === null || value === undefined
  }

  function checkBoolean (value, def) {
    if (isEmpty(value) || typeof value !== 'boolean') {
      return def
    }
    return value
  }

  function checkString (value, def) {
    if (isEmpty(value) || typeof value !== 'string') {
      return def
    }
    return value
  }

  function checkPosition (value, def) {
    const exist = TAB_POSITIONS.find((ele) => {
      return ele.value === value
    })
    return exist ? value : def
  }

  const options = {
    textActive: false,
    linkActive: true,
    imageActive: false,
    searchEngine: 'https://twitter.com/search?q=@@&src=typd',
    position: TAB_POSITIONS[2].value,
    whitelist: 'example.com' + '\n' + '*.mozilla.org'
  }

  const app = new Vue({
    el: '#app',
    template: `
        <div class="container-fluid">
            <form class="list-group" @submit="saveForm">
                <div class="list-group-item">
                    <label for="searchEngine">Search Engine URL(e.g. https://www.google.com/search?q=@@ ->
                        https://www.google.com/search?q=SelectedText)</label>
                    <input type="text" class="form-control" id="searchEngine" v-model="searchEngine"
                           placeholder="https://www.google.com/search?q=@@">
                </div>
                <radio-option class="list-group-item" label="Search texts in"
                              :active.sync="textActive"></radio-option>
                <radio-option class="list-group-item" label="Open links in"
                              :active.sync="linkActive"></radio-option>
                <radio-option class="list-group-item" label="Open images in"
                              :active.sync="imageActive"></radio-option>
                <dropdown-option class="list-group-item" label="New Tab Position"
                                 :options="tabPositions"
                                 :selected.sync="position"></dropdown-option>

                <div class="list-group-item">
                    <label for="whitelist">Disable fire-drag on these websites(separated by new lines)</label>
                    <textarea class="form-control" id="whitelist" rows="5" v-model="whitelist"></textarea>
                </div>

                <button type="submit" class="btn btn-success">Save</button>
            </form>
        </div>
    `,
    data: {
      searchEngine: checkString(options.searchEngine, DEFAULT_OPTIONS.searchEngine),
      textActive: checkBoolean(options.textActive, DEFAULT_OPTIONS.textActive),
      linkActive: checkBoolean(options.linkActive, DEFAULT_OPTIONS.linkActive),
      imageActive: checkBoolean(options.imageActive, DEFAULT_OPTIONS.imageActive),
      position: checkPosition(options.position, DEFAULT_OPTIONS.position),
      whitelist: checkString(options.whitelist, DEFAULT_OPTIONS.whitelist)
    },
    computed: {
      tabPositions: function () {
        return TAB_POSITIONS
      }
    },
    methods: {
      saveForm: function (e) {
        const newOptions = Object.assign({}, this.$data)
        DEBUG('save', newOptions)
        e.preventDefault()
      }
    }
  })
}

init().then()
