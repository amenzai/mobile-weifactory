<template>
  <div>
    <van-nav-bar title="微型植物工厂" />
    <p class="cell-item-title gray">设备列表</p>
    <van-cell-group>
      <van-cell :title="(index + 1) + '号植物工厂'" is-link :key="index" v-for="(item, index) in deviceInfo" @click="getDetail(index, item.deviceId, item.sn, item.trustStatus, item.onlineStatus)">
        <template slot="title">
          <span class="van-cell-text">{{ index + 1 }}号植物工厂</span>
          <span class="blue">{{ item.sn }}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      userId: '',
      deviceInfo: []
    }
  },
  created() {
    this.userId = this.$store.state.userId
    this.getDeviceData()
  },
  methods: {
    getDeviceData() {
      this.$http.get("device/deviceList", this.userId).then(res => {
        this.deviceInfo = res.data;
      })
    },
    getDetail(index, id, sn, trustStatus, onlineStatus) {
      const obj = {
        index: index + 1,
        id,
        sn
      }
      this.$storage.session.set("__deviceInfo__", obj);
      this.$store.commit('UPDATE_TRUST_STATUS', trustStatus)
      this.$store.commit('UPDATE_ONLINE_STATUS', onlineStatus)
      this.$router.push("/view-status");
    }
  }
}
</script>
<style scoped lang="less">
</style>
