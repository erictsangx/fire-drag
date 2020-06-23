//
// function isNumber (obj) {
//   return !isNaN(parseFloat(obj))
// }
//
// function parseNumber (value) {
//   return isNumber(value) && value >= 1 ? value : 1
// }
//
// Vue.component('number-option', {
//   template: `
//       <div class="row option">
//           <span class="label">{{label}}</span>
//           <div>
//               <input type="number" min="0" v-model="tmp"/>
//           </div>
//       </div>
//   `,
//   props: ['label', 'value'],
//   computed: {
//     tmp: {
//       get: function () {
//         return this.value
//       },
//       set: function (rawValue) {
//         const newValue = parseNumber(rawValue)
//         this.$emit('change', {value: newValue})
//       }
//     }
//   }
// })
//
// Vue.component('dropdown-option', {
//   template: `
//       <div class="row option">
//           <span class="label">{{label}}</span>
//           <div>
//               <select v-model="selected">
//                   <option v-for="option in options" v-bind:value="option.value">
//                       {{ option.label }}
//                   </option>
//               </select>
//           </div>
//       </div>
//   `,
//   props: ['label', 'options', 'default'],
//   computed: {
//     selected: {
//       get: function () {
//         return this.default
//       },
//       set: function (newValue) {
//         this.$emit('change', {value: newValue})
//       }
//     }
//   }
// })
//
// Vue.component('whitelist', {
//   template: `
//       <div>
//           <span class="label">Disable fire-drag on these websites(separated by new lines)</span>
//           <textarea v-model=""></textarea>
//       </div>
//   `,
//   props: ['label', 'whitelist'],
//   methods: {
//     keyupHandler: function () {
//       this.$emit('change')
//     },
//     remove: function (index) {
//       DEBUG('remove', index)
//     }
//   },
//   computed: {
//     // whitelist: {
//     //   get: function () {
//     //     return this.options
//     //   },
//     //   set: function (newValue) {
//     //     DEBUG('set', newValue)
//     //     this.$emit('change', {value: newValue})
//     //   }
//     // }
//   }
// })
//

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

  const options = {}

  const app = new Vue({
    el: '#app',
    template: `
        <div class="container-fluid">
            <form>
                <div class="form-group">
                    <label for="searchEngine">Search Engine URL(e.g. https://www.google.com/search?q=@@ ->
                        https://www.google.com/search?q=SelectedText)</label>
                    <input type="text" class="form-control" id="searchEngine" v-model="searchEngine"
                           placeholder="https://www.google.com/search?q=@@">
                </div>
                <radio-option label="Search texts in" :active.sync="textActive"></radio-option>
                <button type="submit" class="btn btn-default">Submit</button>
                {{engineList}}
            </form>
        </div>
    `,
    data: {
      searchEngine: checkString(options, DEFAULT_OPTIONS.searchEngine),
      textActive: checkBoolean(options, DEFAULT_OPTIONS.textActive),
      linkActive: checkBoolean(options, DEFAULT_OPTIONS.linkActive),
      imageActive: checkBoolean(options, DEFAULT_OPTIONS.imageActive)
    },
    computed: {
      engineList: function () {
        setInterval(() => {
          DEBUG('textActive', this.textActive)
        }, 2000)
        return ENGINE_LIST
      },
      tabPositions: function () {
        DEBUG('this.data', this.$data)
        return TAB_POSITIONS
      }
    },
    methods: {
      setTextActive: function ({active}) {
        // this.textActive = active
        DEBUG('textActive', this.textActive)
      },
      setLinkActive: function ({active}) {
        this.linkActive = active
      },
      setImageActive: function ({active}) {
        this.imageActive = active
      },
      setSearch: function ({value}) {
        this.defaultSearch = value
      },
      setPosition: function ({value}) {
        this.defaultPosition = value
      },
      setWhitelist: function () {
        DEBUG('setWhiteList')
        // await saveOptions({...this.$data})
      }
    }
  })
}

init().then()
