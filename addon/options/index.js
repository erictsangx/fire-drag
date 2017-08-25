Vue.component('radio-option', {
  template: `
      <div class="row option">
      <span class="label">{{label}}</span>
      <div>
        <label :for="labelA">
            <input :id="labelA" type="radio" :name="label" value="true" v-model="tmp" />
            Foreground
        </label>
        <label :for="labelB">
            <input :id="labelB" type="radio" :name="label" value="false" v-model="tmp"/>
            Background
        </label>
      </div>
    </div>
  `,
  props: ['label', 'active'],
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

async function init () {
  const opts = await loadOptions()

  DEBUG('opts', opts)

  const app = new Vue({
    el: '#app',
    template: `
  <div>
  
  <radio-option label="Search texts in" :active="textActive" @change="setTextActive"></radio-option>
  <radio-option label="Open links in" :active="linkActive" @change="setLinkActive"></radio-option>
  <radio-option label="Open images in" :active="imageActive" @change="setImageActive"></radio-option>
  
</div> 
  `,
    data: {...opts},
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
      }
    }
  })
}

init().then()
