import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'
import './styles/common.scss'
import './styles/transitions.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './routes/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '*', component: Index },
  ]
})

const options = {
  el: 'main',
  render: h => h('router-view'),
  router,
}

/* eslint no-new: off */
new Vue(options)
