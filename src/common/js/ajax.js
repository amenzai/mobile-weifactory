import axios from 'axios'
import router from '../../router'
import config from './config'
import { Toast } from 'vant'
import querystring from 'querystring'

// axios.defaults.headers = {   referer:
// 'http://api.weifactory.vastsum.net:8852',   host:
// 'api.weifactory.vastsum.net:8852' }
axios.defaults.withCredentials = true
axios.defaults.baseURL = config.httpServer
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.transformRequest = [function(data) {
  return querystring.stringify(data)
}]
axios.defaults.paramsSerializer = function(params) {
  return querystring.stringify(params, { arrayFormat: 'brackets' })
}

axios
  .interceptors
  .request
  .use(function(config) {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '加载中'
    });
    return config
  }, function(error) {
    Toast.clear()
    return Promise.reject(error)
  })
axios
  .interceptors
  .response
  .use(function(response) {
    // 不显示loading
    Toast.clear()
    return response
  }, function(error) {
    // 对响应错误做点什么
    Toast.clear()
    Toast.fail('服务正在升级，请稍后再试！');
    return Promise.reject(error)
  })

function trimObject(data, type) {
  var obj = JSON.parse(JSON.stringify(data));
  for (var k in obj) {
    if (typeof obj[k] === 'string') {
      obj[k] = obj[k].trim()
    }
    if (!obj[k] && type == undefined) {
      delete obj[k];
    }
  }
  return obj
}

export default {
  get: function(path, params) {
    var config
    if (params === void 0) {
      config = path
    } else {
      config = path + '/' + params
    }
    return new Promise((resolve, reject) => {
      axios
        .get(config)
        .then(res => {
          if (res.data.success) {
            resolve(res.data)
          } else {
            setTimeout(() => {
              Toast.fail(res.data.message);
            }, 500)
            reject(res.data)
          }
        })
    })
  },
  post: function(path, params, type) {
    if (params === void 0) {
      params = {}
    }
    params = trimObject(params, type)
    return new Promise((resolve, reject) => {
      axios
        .post(path, params)
        .then(res => {
          if (res.data.success) {
            resolve(res.data)
          } else {
            setTimeout(() => {
              Toast.fail(res.data.message);
            }, 500)
            reject(res.data)
          }
        })
    })
  }
}
