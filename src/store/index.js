import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'good-storage'

// import * as actions from './actions' import * as getters from './getters'
// import state from './state' import mutations from './mutations' import
// createLogger from 'vuex/dist/logger'

const USER_ID = '__uid__'
const USER_INFO = '__userinfo__'
const TRUST_STATUS = '__trustStatus__'
const ONLINE_STATUS = '__onlineStatus__'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production' export default new
// Vuex.Store({   actions,   getters,   state,   mutations,   strict: debug,
// plugins: debug ? [createLogger()] : [] })

const state = {
  userId: storage
    .session
    .get(USER_ID, ''),
  userInfo: storage
    .session
    .get(USER_INFO, {}),
  orderPay: {},
  trustStatus: storage
    .session
    .get(TRUST_STATUS, ''),
  onlineStatus: storage
    .session
    .get(ONLINE_STATUS, '')
}
const store = new Vuex.Store({
  state,
  mutations: {
    UPDATE_USER(state, userInfo) {
      state.userInfo = userInfo
      storage
        .session
        .set(USER_INFO, userInfo)
    },
    UPDATE_USERID(state, userId) {
      state.userId = userId
      storage
        .session
        .set(USER_ID, userId)
    },
    UPDATE_TRUST_STATUS(state, trustStatus) {
      state.trustStatus = trustStatus
      storage
        .session
        .set(TRUST_STATUS, trustStatus)
    },
    UPDATE_ONLINE_STATUS(state, onlineStatus) {
      state.onlineStatus = onlineStatus
      storage
        .session
        .set(ONLINE_STATUS, onlineStatus)
    },
    UPDATE_ORDER(state, orderData) {
      state.orderPay = orderData
    }
  }
})

export default store
