// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueQrcodeReader from 'vue-qrcode-reader'
import firebase from './plugins/firebase'
import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'
import 'vue-qrcode-reader/dist/vue-qrcode-reader.browser.js'

Vue.use(VueQrcodeReader)
Vue.use(firebase, { router })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
