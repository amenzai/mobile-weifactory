import { dateFmt, seeLabel, currencyFmt, jsonp } from './utils'

import http from './ajax'

import storage from 'good-storage'

//  import CONSTANT from './constant'

export default {
  install(Vue) {
    Vue.prototype.$dateFilter = dateFmt
    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
    Vue.prototype.$jsonp = jsonp
      //  Vue.prototype.$CONSTANT = CONSTANT
    Vue.filter('dateFilter', dateFmt)
    Vue.filter('currency', currencyFmt)
    Vue.filter('seeLabel', seeLabel)
  }
}
