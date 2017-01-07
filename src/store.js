import * as firebase from 'firebase'
import App from './views/App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

// const state = {}

export function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyCaHZ0GElyOmXKkc-LeEdD1FNtL1uxufjY',
    authDomain: 'mobooru-27d7f.firebaseapp.com',
    databaseURL: 'https://mobooru-27d7f.firebaseio.com',
    storageBucket: 'mobooru-27d7f.appspot.com',
    messagingSenderId: '656274868388'
  })
}

export function initVue() {
  Vue.use(VueRouter)

  const router = new VueRouter({
    routes: [
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
}
