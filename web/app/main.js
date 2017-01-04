import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'
import './styles/common.scss'

import Vue from 'vue'
import App from './components/App.vue'

new Vue({
  el: 'main',
  render: h => h(App)
})
