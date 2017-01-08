import * as crypto from 'crypto'
import * as firebase from 'firebase'
import * as path from 'path'
import App from './views/App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

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

export async function fetchImageList() {
  const data = await firebase.database().ref('/images/list').limitToLast(50).once('value')
  if (!data.val()) {
    return []
  }
  return Object.values(data.val()).reverse()
}

export async function fetchImageURL(id) {
  const data = await firebase.database().ref('/images/full/' + id).once('value')
  if (!data.val()) {
    throw new Error(`Could not find image URL for ID ${id}`)
  }
  return await firebase.storage().ref(data.val()).getDownloadURL()
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

export function generateImageID() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      err ? reject(err) : resolve(buf.toString('hex'))
    })
  })
}

export async function uploadImage(imageFile, progressCallback) {
  if (!state.user) throw new Error('User not logged in.')

  const id = await generateImageID()
  const extension = path.extname(imageFile.name)
  const filename = id + extension
  const upload = firebase.storage().ref().child(`/users/${state.user.uid}/images/${filename}`)

  const uploadTask = upload.put(imageFile)

  if (progressCallback) {
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, data => {
      progressCallback(data.bytesTransferred / data.totalBytes)
    })
  }

  await uploadTask
  await firebase.database().ref('/images/list').push(id)
  await firebase.database().ref('/images/full/' + id).set(upload.fullPath)

  return id
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
