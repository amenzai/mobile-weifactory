import ajax from './ajax'

import echarts from './echarts'

export default {
  install(Vue) {
    Vue.prototype.$ajax = ajax
    Vue.prototype.$echarts = echarts
  }
}
