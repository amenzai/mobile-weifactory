// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
// import './common/css/style.css'
import store from './store'
import ajax from './common/js/ajax.js'
import components from './components'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
// require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');

FastClick.attach(document.body)

Vue.use(components)

Vue.prototype.$ajax = ajax

Vue.config.devtools = true
Vue.prototype.$echarts = echarts 

  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
