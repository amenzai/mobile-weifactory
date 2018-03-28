import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

import Home from 'pages/home'
import Index from 'pages/index'
import Login from 'pages/login'
import Devicelist from 'pages/devicelist'
import BtnControl from 'pages/btn-control'
import Historydata from 'pages/historydata'

const myRouter = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      name: '后台控制面板',
      component: Index
    }, {
      path: 'devicelist/:id',
      name: '设备列表',
      component: Devicelist
    }, {
      path: 'btn-control/:sn',
      name: '设备控制',
      component: BtnControl
    }, {
      path: 'historydata/:deviceId',
      name: '历史数据',
      component: Historydata
    }]
  }, {
    path: '/login',
    name: '用户登录',
    component: Login
  }]
})

const commit = store.commit
const loginUrl = '/login'
myRouter.beforeEach((to, from, next) => {
  if (to.path === loginUrl) {
    commit('UPDATE_USERID', '')
  }
  if (!store.state.userId && to.path !== loginUrl && to.path.indexOf('register') < 0) {
    next(loginUrl)
  } else {
    // commit('UPDATE_LOADING', true)
    if (to.path !== from.path) {
      window.document.title = to.name
    }
    next()
  }
})

myRouter.afterEach(route => {
  // commit('UPDATE_LOADING', false)
})

export default myRouter
