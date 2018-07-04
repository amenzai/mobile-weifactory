<template>
  <div class="wrap">
    <p class="cell-item-title gray">第一层</p>
    <van-cell-group>
      <van-switch-cell v-model="formData.led11" title="LED1" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.led12" title="LED2" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.led13" title="LED3" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.syyy1" title="施加营养液" :disabled="isDisabled" />
    </van-cell-group>
    <p class="cell-item-title gray">第二层</p>
    <van-cell-group>
      <van-switch-cell v-model="formData.led21" title="LED1" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.led22" title="LED2" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.led23" title="LED3" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.syyy2" title="施加营养液" :disabled="isDisabled" />
    </van-cell-group>
    <p class="cell-item-title gray">第三层</p>
    <van-cell-group>
      <van-switch-cell v-model="formData.led31" title="LED1" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.led32" title="LED2" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.led33" title="LED3" :disabled="isDisabled" />
      <van-switch-cell v-model="formData.syyy3" title="施加营养液" :disabled="isDisabled" />
    </van-cell-group>
    <div class="p15 flex">
      <van-button @click="getParamInfo" class="flex-item" :disabled="isDisabled">取消</van-button>
      <van-button type="primary" @click="submit" class="flex-item" :disabled="isDisabled">保存</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HandControl',
  data() {
    return {
      batchId: '',
      checked: false,
      formData: {}
    }
  },
  computed: {
    isDisabled() {
      return this.$store.state.trustStatus == '1' ? true : false
    }
  },
  created() {
    this.init()
    this.batchId = this.$storage.session.get('__batchId__', '')
    this.getParamInfo()
  },
  methods: {
    init() {
      this.formData = {
        led11: false,
        led12: false,
        led13: false,
        syyy1: false,
        syyy2: false,
        led21: false,
        led22: false,
        led23: false,
        syyy3: false,
        led31: false,
        led32: false,
        led33: false
      }
    },
    transformData(str) {
      if (str === '0') {
        return false
      } else if (str === '1') {
        return true
      }
      if (str === true) {
        return '1'
      } else if (str === false) {
        return '0'
      }
    },
    getParamInfo() {
      this.$http.get('hand', this.batchId).then(res => {
        if (res.data) {
          const data = res.data
          this.formData = {
            led11: this.transformData(data.led11),
            led12: this.transformData(data.led12),
            led13: this.transformData(data.led13),
            syyy1: this.transformData(data.syyy1),
            syyy2: this.transformData(data.syyy2),
            led21: this.transformData(data.led21),
            led22: this.transformData(data.led22),
            led23: this.transformData(data.led23),
            syyy3: this.transformData(data.syyy3),
            led31: this.transformData(data.led31),
            led32: this.transformData(data.led32),
            led33: this.transformData(data.led33)
          }
        } else {
          this.init()
        }
      })
    },
    submit() {
      const send = {
        led11: this.transformData(this.formData.led11),
        led12: this.transformData(this.formData.led12),
        led13: this.transformData(this.formData.led13),
        syyy1: this.transformData(this.formData.syyy1),
        syyy2: this.transformData(this.formData.syyy2),
        led21: this.transformData(this.formData.led21),
        led22: this.transformData(this.formData.led22),
        led23: this.transformData(this.formData.led23),
        syyy3: this.transformData(this.formData.syyy3),
        led31: this.transformData(this.formData.led31),
        led32: this.transformData(this.formData.led32),
        led33: this.transformData(this.formData.led33)
      }
      send.sn = this.$storage.session.get('__deviceInfo__', {}).sn
      this.$http
        .post('hand/saveOrUpdate', send)
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
