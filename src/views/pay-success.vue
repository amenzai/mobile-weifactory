<template>
  <div class="wrap">
    <van-nav-bar title="微型植物工厂" />
    <div class="mt10 tc">
      <van-icon name="wechat" class="green" style="font-size:60px" />
      <p>支付成功！</p>
      <van-button type="primary" @click="$router.push('/index')" class="mt20">返回设备列表页</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.$store.commit('UPDATE_TRUST_STATUS', '2')
  },
  methods: {
    // onClickLeft() {
    //   this.$router.go(-1)
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
