import axios from 'axios'
import store from '../../store'
// import { ToastPlugin } from 'vux'
import querystring from 'querystring'

const commit = store.commit || store.dispatch
const base = ''

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://test.weifactory.vastsum.net:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.transformRequest = [
  function(data) {
    return querystring.stringify(data)
  }
]
axios.defaults.paramsSerializer = function(params) {
  return querystring.stringify(params, {
    arrayFormat: 'brackets'
  })
}

axios.interceptors.request.use(function(config) {
  commit('UPDATE_LOADING', true)
  return config
}, function(error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function(response) {
  if (response.status === 200) {
    if (!response.data.success) {
      // ToastPlugin.show({
      //  text: response.message,
      //  type: 'warn'
      // })
    }
  }
  // 不显示loading
  commit('UPDATE_LOADING', false)
  return response
}, function(error) {
  // 对响应错误做点什么
  // ToastPlugin.show({
  //  text: '服务端异常',
  //  type: 'warn'
  // })
  commit('UPDATE_LOADING', false)
  return Promise.reject(error)
})

var ajax = {
  get: function(path, params) {
    var config
    if (params === void 0) {
      config = `${base}` + path
    } else {
      // params = trimObject(params)
      config = `${base}` + path + '/' + params
    }
    return axios.get(config).then(res => res.data)
  },
  post: function(path, params, type) {
    if (params === void 0) {
      params = {}
    }
    params = trimObject(params, type)
    return axios.post(`${base}` + path, params).then(res => res.data)
  }
}

function trimObject(data, type) {
  var obj = JSON.parse(JSON.stringify(data));
  for (var k in obj) {
    if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'String') {
      obj[k] = obj[k].trim()
      if (obj[k] === '' && type === undefined) {
        delete obj[k];
      }
    } else if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'Object') {
      trimObject(obj[k])
    }
  }
  return obj
}

export default ajax
