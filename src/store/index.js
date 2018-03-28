import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false,
  userId: parseFloat(window.sessionStorage.getItem('__uid__')) || ''
}
const store = new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.loading = status
    },
    UPDATE_USERID(state, userId) {
      state.userId = userId
      if (userId) {
        window.sessionStorage.setItem('__uid__', JSON.stringify(userId))
      } else {
        window.sessionStorage.removeItem('__uid__')
      }
    }
  }
})

export default store

