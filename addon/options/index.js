Vue.component('radio-option', {
  template: `
      <div class="row option">
      <span class="label">{{label}}</span>
      <div>
        <label :for="labelA">
            <input :id="labelA" type="radio" :name="label" value="true" v-model="tmp" />
            {{left}}
        </label>
        <label :for="labelB">
            <input :id="labelB" type="radio" :name="label" value="false" v-model="tmp"/>
            {{right}}
        </label>
      </div>
    </div>
  `,
  props: ['label', 'left', 'right', 'active'],
  computed: {
    labelA: function () {
      return this.label.toLowerCase().replace(/ /g, '-') + '-a'
    },
    labelB: function () {
      return this.label.toLowerCase().replace(/ /g, '-') + '-b'
    },
    tmp: {
      get: function () {
        return this.active
      },
      set: function () {
        this.$emit('change', {active: !this.tmp})
      }
    }
  }
})

function isNumber (obj) {
  return !isNaN(parseFloat(obj))
}

function parseNumber (value) {
  return isNumber(value) && value >= 1 ? value : 1
}

Vue.component('number-option', {
  template: `
    <div class="row option">
      <span class="label">{{label}}</span>
      <div>
        <input type="number" min="0" v-model="tmp" />
      </div>
    </div>
  `,
  props: ['label', 'value'],
  computed: {
    tmp: {
      get: function () {
        return this.value
      },
      set: function (rawValue) {
        const newValue = parseNumber(rawValue)
        this.$emit('change', {value: newValue})
      }
    }
  }
})

Vue.component('dropdown-option', {
  template: `
    <div class="row option">
      <span class="label">{{label}}</span>
      <div>
      <select v-model="selected">
        <option v-for="option in options" v-bind:value="option.value">
          {{ option.label }}
        </option>
      </select>
      </div>
    </div>
  `,
  props: ['label', 'options', 'default'],
  computed: {
    selected: {
      get: function () {
        return this.default
      },
      set: function (newValue) {
        this.$emit('change', {value: newValue})
      }
    }
  }
})

async function init () {
  const opts = await loadOptions()

  DEBUG('opts', opts)

  const app = new Vue({
    el: '#app',
    template: `
<div>
  <radio-option label="Search texts in" left="Foreground" right="Background" :active="textActive" @change="setTextActive"></radio-option>
  <radio-option label="Open links in" left="Foreground" right="Background" :active="linkActive" @change="setLinkActive"></radio-option>
  <radio-option label="Open images in" left="Foreground" right="Background" :active="imageActive" @change="setImageActive"></radio-option>
  <radio-option label="Ignore selected text if dragging a hyperlink" left="On" right="Off" :active="overrideSelectedText" @change="setOverride"></radio-option>
  
  <number-option label="Ignore if the distance of dragging is less than" :value="threshold" @change="setThreshold"></number-option>

  <dropdown-option
    label="Select Search Engine"
    :options="engineList"
    :default="defaultSearch"
    @change="setSearch"
  ></dropdown-option>
  
  <dropdown-option
    label="New Tab Position"
    :options="tabPositions"
    :default="defaultPosition"
    @change="setPosition"
  ></dropdown-option>
  
</div> 
  `,
    data: {...opts},
    computed: {
      engineList: function () {
        return ENGINE_LIST
      },
      tabPositions: function () {
        return TAB_POSITIONS
      }
    },
    methods: {
      setTextActive: async function ({active}) {
        this.textActive = active
        await saveOptions({...this.$data})
      },
      setLinkActive: async function ({active}) {
        this.linkActive = active
        await saveOptions({...this.$data})
      },
      setImageActive: async function ({active}) {
        this.imageActive = active
        await saveOptions({...this.$data})
      },
      setOverride: async function ({active}) {
        this.overrideSelectedText = active
        await saveOptions({...this.$data})
      },
      setThreshold: async function ({value}) {
        this.threshold = value
        await saveOptions({...this.$data})
      },
      setSearch: async function ({value}) {
        this.defaultSearch = value
        await saveOptions({...this.$data})
      },
      setPosition: async function ({value}) {
        this.defaultPosition = value
        await saveOptions({...this.$data})
      }
    }
  })
}

init().then()
