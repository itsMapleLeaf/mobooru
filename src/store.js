import * as crypto from 'crypto'
import * as firebase from 'firebase'
import * as path from 'path'
import App from './views/App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

// private
function generateImageID() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      err ? reject(err) : resolve(buf.toString('hex'))
    })
  })
}

// public
export const state = {
  user: null,
}

export function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyCaHZ0GElyOmXKkc-LeEdD1FNtL1uxufjY',
    authDomain: 'mobooru-27d7f.firebaseapp.com',
    databaseURL: 'https://mobooru-27d7f.firebaseio.com',
    storageBucket: 'mobooru-27d7f.appspot.com',
    messagingSenderId: '656274868388'
  })

  firebase.auth().onAuthStateChanged(user => { state.user = user })
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
    data: state,
    render: h => h(App),
    router,
  })
}

export function fetchImageList() {
  return firebase.database().ref('images').limitToLast(50).once('value')
    .then(data => data.val() || Promise.reject('Could not fetch image list...'))
    .then(images => Object.values(images).reverse())
}

export function fetchImageURL(id) {
  return firebase.database().ref('image/' + id).once('value')
    .then(data => data.val() || Promise.reject(`Could not find image URL for ID ${id}`))
    .then(path => firebase.storage().ref(path).getDownloadURL())
}

export function isImage(file) {
  return /^image\//.test(file.type)
}

export function readImageData(file) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.onload = ev => resolve(ev.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function uploadImage(imageFile) {
  return generateImageID()
    .then(id => {
      const extension = path.extname(imageFile.name)
      const filename = id + extension
      const upload = firebase.storage().ref().child('images/' + filename)
      return upload.put(imageFile)
        .then(() => firebase.database().ref('images').push(id))
        .then(() => firebase.database().ref('image/' + id).set(upload.fullPath))
        .then(() => id)
    })
}

export function signIn(email, pass) {
  return firebase.auth().signInWithEmailAndPassword(email, pass)
}

export function signOut() {
  return firebase.auth().signOut()
}

export function register(email, pass) {
  return firebase.auth().createUserWithEmailAndPassword(email, pass)
}
