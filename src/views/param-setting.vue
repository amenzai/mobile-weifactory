<template>
  <div class="wrap">
    <van-cell-group class="mt10">
      <van-field v-model="formData.dayTemperature2" type="number" label="白天温度/℃：" placeholder="请输入白天温度" :disabled="isDisabled" />
      <van-field v-model="formData.dayHumidity2" type="number" label="白天湿度/RH%：" placeholder="请输入白天湿度" :disabled="isDisabled" />
      <van-field v-model="formData.nightTemperature2" type="number" label="晚上温度/℃：" placeholder="请输入晚上温度" :disabled="isDisabled" />
      <van-field v-model="formData.nightHumidity2" type="number" label="晚上湿度/RH%：" placeholder="请输入晚上湿度" :disabled="isDisabled" />
    </van-cell-group>
    <div class="p15 tc flex">
      <van-button @click="getParamInfo" class="flex-item" :disabled="isDisabled">取消</van-button>
      <van-button type="primary" @click="submit" class="flex-item" :disabled="isDisabled">保存</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ParamSetting',
  data() {
    return {
      sn: '',
      formData: {
        dayTemperature2: ' ',
        nightTemperature2: ' ',
        dayHumidity2: ' ',
        nightHumidity2: ' '
      }
    }
  },
  computed: {
    isDisabled() {
      return this.$store.state.trustStatus == '1' ? true : false
    }
  },
  created() {
    this.sn = this.$storage.session.get('__deviceInfo__', {}).sn
    this.getParamInfo()
  },
  methods: {
    getParamInfo() {
      this.$http.get('paramSet/device', this.sn).then(res => {
        if (res.data) {
          this.formData = {
            paramSetId: res.data.paramSetId,
            dayTemperature2: res.data.dayTemperature2,
            nightTemperature2: res.data.nightTemperature2,
            dayHumidity2: res.data.dayHumidity2,
            nightHumidity2: res.data.nightHumidity2
          }
        }
      })
    },
    submit() {
      const send = { ...this.formData }
      send.sn = this.sn
      this.$http
        .post('paramSet/saveOrUpdate', send)
        .then(res => {
          setTimeout(() => {
            this.$toast.success(res.message)
          }, 500)
          this.getParamInfo()
        })
        .catch(() => {
          this.getParamInfo()
        })
    }
  }
}
</script>
<style scoped lang="less">
</style>
