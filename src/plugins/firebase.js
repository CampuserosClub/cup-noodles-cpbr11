import firebase from 'firebase'
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyBiIq0VgI7A5_TUguyGJZ6FA--oXF7GeRc',
  authDomain: 'cup-noodles-cpbr11.firebaseapp.com',
  databaseURL: 'https://cup-noodles-cpbr11.firebaseio.com',
  projectId: 'cup-noodles-cpbr11',
  storageBucket: 'cup-noodles-cpbr11.appspot.com',
  messagingSenderId: '942862042188'
}

const connection = firebase.initializeApp(config)
const DB = connection.firestore()

const install = (Vue, { router }) => {
  Object.defineProperties(Vue.prototype, {
    $db: { get: () => DB }
  })
}

export default { install, connection }
