import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'
import './styles/common.scss'
import './styles/transitions.scss'

import Vue from 'vue'
import App from './components/App.vue'

/* eslint no-new: off */
new Vue({
  el: 'main',
  render: h => h(App)
})
