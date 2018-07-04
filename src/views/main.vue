<template>
  <div>
    <gnav />
    <gtitle />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <van-tabbar v-model="tabActive">
      <router-link to="/view-status" class="tab-item">
        <van-icon name="browsing-history" />
        <span>状态查看</span>
      </router-link>
      <router-link to="/param-setting" class="tab-item">
        <van-icon name="setting" />
        <span>参数设置</span>
      </router-link>
      <router-link to="/hand-control" class="tab-item">
        <van-icon name="setting" />
        <span>手动控制</span>
      </router-link>
      <router-link to="/host-service" class="tab-item">
        <van-icon name="balance-pay" />
        <span>托管服务</span>
      </router-link>
      <!-- <van-tabbar-item icon="browsing-history">
        <router-link to="/view-status">状态查看</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="setting">
        <router-link  to="/param-setting">参数设置</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="setting">
        <router-link to="/hand-control">手动控制</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="balance-pay">
        <router-link to="/host-service">托管服务</router-link>
      </van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      tabActive: -1
    }
  }
}
</script>
<style scoped lang="less">
@import '~common/less/var.less';
.tab-item {
  font-size: 12px;
  color: #666;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // line-height: 50px;
  text-align: center;
  .van-icon {
    font-size: 18px;
    margin-bottom: 2px;
  }
}
.router-link-active {
  color: @blue;
}
</style>
