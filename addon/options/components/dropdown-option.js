Vue.component('dropdown-option', {
  template: `
      <div>
          <span class="label">{{label}}</span>
          <select class="custom-select" v-model="tmp">
              <option v-for="option in options" v-bind:value="option.value">
                  {{ option.label }}
              </option>
          </select>
      </div>
  `,
  props: ['label', 'options', 'selected'],
  data: function () {
    return {tmp: this.selected}
  },
  watch: {
    tmp () {
      this.$emit('update:selected', this.tmp)
    }
  }
})
