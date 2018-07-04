<template>
  <div>
    <div v-if="trustStatus === '0'">
      <p class="cell-item-title gray">托管类型</p>
      <van-cell-group>
        <van-cell title="专家" is-link to="/host-expert" />
        <van-cell title="服务器" is-link @click="hostService" />
      </van-cell-group>
    </div>
    <div class="p15 tc mt20" v-else>
      <van-button @click="cancelHost" type="primary">取消托管</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HostService',
  data() {
    return {
      deviceId: ''
    }
  },
  computed: {
    trustStatus() {
      return this.$store.state.trustStatus
    }
  },
  created() {
    this.deviceId = this.$storage.session.get('__deviceInfo__', {}).id
  },
  methods: {
    hostService() {
      this.$dialog.confirm({
        message: '确定申请服务器托管？'
      }).then(() => {
        this.$http.get('trust', `device/${this.deviceId}/trustStatus/1`).then(res => {
          this.$toast.success('托管成功！')
          this.$store.commit('UPDATE_TRUST_STATUS', '1')
        })
      }).catch(() => {
        // on cancel
      });
    },
    cancelHost() {
      this.$dialog.confirm({
        message: '确定取消服务器托管？'
      }).then(() => {
        this.$http.get('trust/cancle/deviceId', this.deviceId).then(res => {
          this.$toast.success('取消托管成功！')
          this.$store.commit('UPDATE_TRUST_STATUS', '0')
        })
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>
