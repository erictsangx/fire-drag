Vue.component('radio-option', {
  template: `
      <div class="row">
          <span class="col-2">{{label}}</span>
          <div class="">
              <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :id="labelA" v-model="tmp"
                         v-bind:value="true">
                  <label class="form-check-label" :for="labelA">
                      Foreground
                  </label>
              </div>
              <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :id="labelB" v-model="tmp"
                         v-bind:value="false">
                  <label class="form-check-label" :for="labelB">
                      Background
                  </label>
              </div>
          </div>
      </div>
  `,
  props: ['label', 'active'],
  data: function () {
    return {tmp: this.active}
  },
  computed: {
    labelA: function () {
      return this.label.toLowerCase().replace(/ /g, '-') + '-a'
    },
    labelB: function () {
      return this.label.toLowerCase().replace(/ /g, '-') + '-b'
    }
  },
  watch: {
    tmp () {
      this.$emit('update:active', this.tmp)
    }
  }
})
