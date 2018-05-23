// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('es6-promise').polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
// import './common/css/style.css'
import store from './store'
import util from './common/js'
import VuxUI from './components/vuxui'

FastClick.attach(document.body)

Vue.use(VuxUI)
Vue.use(util)

Vue.config.devtools = true

  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
