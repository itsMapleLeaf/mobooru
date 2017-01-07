import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'
import './styles/common.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import * as firebase from 'firebase'
import config from './firebase-config'

import App from './components/App.vue'

// init firebase
firebase.initializeApp(config)

// init vue router
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // { path: '/', component: Index },
    { path: '/upload', component: require('./routes/Upload.vue') },
    { path: '/image/:image', component: require('./routes/Image.vue') },
    { path: '/login', component: require('./routes/Login.vue') },
    { path: '/register', component: require('./routes/Register.vue') },
    { path: '/signout', component: require('./routes/SignOut.vue') },
  ]
})

/* eslint no-new: off */
new Vue({
  el: 'main',
  render: h => h(App),
  router,
})
