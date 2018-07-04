<template>
  <div>
    <h2 class="tc mt20"><span>{{ index }}</span>号微植物工厂<van-tag :type="trustStatus !== '0' ? 'success' : ''">{{ trustStatus | seeLabel(trustStatusArr)}}</van-tag><van-tag style="margin-left:6px" :type="onlineStatus == '1' ? 'success' : ''">{{ onlineStatus == '1' ? '在线' : '离线' }}</van-tag></h2>
  </div>
</template>
<script>
export default {
  name: 'Gtitle',
  data() {
    return {
      index: '',
      trustStatusArr: []
    }
  },
  computed: {
    trustStatus() {
      return this.$store.state.trustStatus
    },
    onlineStatus() {
      return this.$store.state.onlineStatus
    }
  },
  created() {
    this.getTrustStatus()
    const obj = this.$storage.session.get('__deviceInfo__', {})
    this.index = obj.index
  },
  methods: {
    getTrustStatus() {
      this.$http.get('dict/dictItemList/trustStatus').then(res => {
        this.trustStatusArr = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          }
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
h2 {
  font-size: 20px;
  font-weight: normal;
}
</style>
