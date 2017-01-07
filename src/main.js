import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'
import './styles/common.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import * as firebase from 'firebase'
import config from './firebase-config'

import Index from './routes/Index.vue'
import Upload from './routes/Upload.vue'
import Image from './routes/Image.vue'

// init firebase
firebase.initializeApp(config)

// init vue router
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // { path: '/', component: Index },
    { path: '/upload', component: Upload },
    { path: '/image/:image', component: Image },
  ]
})

/* eslint no-new: off */
new Vue({
  el: 'main',
  render: h => h(Index),
  router,
})
