<template>
  <div>
    <group v-if="id === '1'" title="请选择设备">
      <cell :title="item.sn" is-link v-for="(item,index) in deviceList" :key="index" :link="`/home/btn-control/${item.sn}`"></cell>
    </group>
    <group v-else title="请选择设备">
      <cell :title="item.sn" is-link v-for="(item,index) in deviceList" :key="index" :link="`/home/historydata/${item.deviceId}`"></cell>
    </group>
  </div>
</template>
<script>
export default {
  data() {
      return {
        id: '',
        deviceList: []
      }
    },
    created() {
      this.id = this.$route.params.id
      this.userId = JSON.parse(window.sessionStorage.getItem('user')).userId
      this.getList()
    },
    methods: {
      getList() {
        if (this.userId === 2) {
          this.$ajax.get('device/list/1/1000')
            .then(res => {
              console.log('', res);
              this.deviceList = res.data.list;
            })
        } else {
          this.$ajax.get('device/deviceList', this.userId)
            .then(res => {
              console.log('', res);
              this.deviceList = res.data;
            })
        }
      }
    }
}
</script>
<style scoped>
</style>
