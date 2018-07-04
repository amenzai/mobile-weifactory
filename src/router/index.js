import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './router'

Vue.use(Router)

const myRouter = new Router({ mode: 'hash', base: __dirname, routes })

// const commit = store.commit
const loginUrl = '/login'
myRouter.beforeEach((to, from, next) => {
  if (!store.state.userId && to.path !== loginUrl && to.path.indexOf('/register') < 0) {
    next(loginUrl)
  } else {
    // commit('UPDATE_LOADING', true)
    if (to.path !== from.path) {
      window.document.title = to.meta.title
    }
    next()
  }
})

// myRouter.afterEach(route => {   commit('UPDATE_LOADING', false) })

export default myRouter
