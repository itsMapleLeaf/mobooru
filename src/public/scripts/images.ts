declare var Vue: any

new Vue({
  el: 'main',
  template: `<div>{{ msg }}</div>`,
  data: {
    msg: 'hello world'
  }
})
