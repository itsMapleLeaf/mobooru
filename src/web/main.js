import 'mdi/css/materialdesignicons.min.css'
import 'normalize.css/normalize.css'

import './styles/base.css'
import './styles/mobooru.css'

import Vue from 'vue'
import Main from './components/Main.vue'

new Vue({
  el: 'main',
  render: h => h(Main),
})
