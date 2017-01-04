import Vue from 'vue'
import App from './components/App.vue'

import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'

new Vue({
  el: 'main',
  render: h => h(App)
})
