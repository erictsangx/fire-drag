Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
