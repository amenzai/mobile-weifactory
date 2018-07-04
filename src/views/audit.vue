<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <div class="tc container">
      <van-loading type="spinner" color="black" />
      <p>正在等待管理员审核</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.container {
  padding-top: 40px;
  color: #666;
}
.van-loading {
  display: inline-block;
}
</style>
