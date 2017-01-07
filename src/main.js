import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'
import './styles/common.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import * as firebase from 'firebase'
import config from './firebase-config'

import App from './views/App.vue'

// init firebase
firebase.initializeApp(config)

// init vue router
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // { path: '/', component: Index },
    { path: '/upload', component: require('./views/Upload.vue') },
    { path: '/image/:id', component: require('./views/Image.vue') },
    { path: '/login', component: require('./views/Login.vue') },
    { path: '/register', component: require('./views/Register.vue') },
    { path: '/signout', component: require('./views/SignOut.vue') },
  ]
})

/* eslint no-new: off */
new Vue({
  el: 'main',
  render: h => h(App),
  router,
})
