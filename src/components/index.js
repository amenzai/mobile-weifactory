import {
  XHeader,
  XButton,
  XSwitch,
  XInput,
  Group,
  Cell,
  Grid, 
  GridItem,
  Checklist,
  Datetime,
  ToastPlugin,
  LoadingPlugin
} from 'vux'

export default {
  install(Vue) {
    Vue.component('x-header', XHeader)
    Vue.component('x-switch', XSwitch)
    Vue.component('x-button', XButton)
    Vue.component('x-input', XInput)
    Vue.component('group', Group)
    Vue.component('cell', Cell)
    Vue.component('grid', Grid)
    Vue.component('grid-item', GridItem)
    Vue.component('checklist', Checklist)
    Vue.component('datetime', Datetime)
    Vue.use(LoadingPlugin)
    Vue.use(ToastPlugin)
  }
}
