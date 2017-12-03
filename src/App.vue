<template>
  <div id="app">
    <div v-transfer-dom>
      <loading :show="$store.state.loading" text="loading"></loading>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import {
  Loading,
  TransferDomDirective as TransferDom
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  data() {
    return {}
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #fbf9fe;
}
</style>
