<template>
  <div>
    <van-nav-bar title="微型植物工厂" left-arrow @click-left="onClickLeft" />
    <van-cell-group class="mt10">
      <van-cell title="订单号：">
        <span>{{ orderData.orderNumber }}</span>
      </van-cell>
      <van-cell title="设备序列号：">
        <span>{{ orderData.sn }}</span>
      </van-cell>
      <van-cell title="托管方式：">
        <span>{{ orderData.deposit === '1' ? '全托管方式' : '自定义托管方式' }}</span>
      </van-cell>
      <van-cell title="选择托管专家：">
        <span>{{ orderData.expertName }}</span>
      </van-cell>
      <van-cell title="总费用：">
        <span>{{ orderData.orderPrice | currency }}</span>
      </van-cell>
      <van-cell title="选择支付方式：" is-link @click="payType = true">
        <span>{{ payTypeText }}</span>
      </van-cell>
    </van-cell-group>
    <div class="p15 tc mb10">
      <van-button type="primary" size="large" @click="paySubmit">支付</van-button>
    </div>
    <p class="fr p15">
      <span class="blue" @click="$router.push('/index')">返回设备列表</span>
    </p>
    <van-popup v-model="payType" position="bottom">
      <van-picker show-toolbar title="选择支付方式" :columns="payChannel" value-key="label" @confirm="confirmType" @cancel="cancelType" />
    </van-popup>
    <van-dialog v-model="qrcodeShow" :show-confirm-button="false" show-cancel-button>
      <div id="qrcode"></div>
      <p class="tc m5" style="color: #f44">请长按二维码进行支付！</p>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: 'Pay',
  data() {
    return {
      payTypeText: '',
      payMode: 'wechat',
      payType: false,
      payChannel: [],
      orderData: {},
      qrcodeShow: false
    }
  },
  created() {
    this.orderData = this.$store.state.orderPay
    this.getPayChannel()
  },
  methods: {
    init() {
      const ws = new WebSocket(
        'ws://121.196.217.247:9000/websocket/' + this.orderData.orderNumber
      )
      const that = this
      ws.onopen = function() {
        console.log('successs')
        ws.send(that.orderData.orderNumber)
      }
      ws.onerror = function(event) {
        console.log('fail')
      }
      ws.onmessage = function(event) {
        const data = JSON.parse(event.data)
        console.log(data)
        // 处理数据
        if (data.success) {
          that.$router.push('/pay-success')
        }
      }
    },
    getPayChannel() {
      this.$http.get('dict/dictItemList', 'payChannel').then(res => {
        this.payChannel = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          }
        })
      })
    },
    confirmType(item) {
      this.payMode = item.value
      this.payTypeText = item.label
      this.payType = false
    },
    cancelType(value, index) {
      this.payType = false
    },
    paySubmit() {
      if (!this.orderData.orderNumber) {
        this.$toast.fail('订单不存在请重新生成订单！')
        return
      }
      const param = {
        order_number: this.orderData.orderNumber,
        way: this.payMode
      }
      function convertCanvasToImage(canvas) {
        // 新Image对象，可以理解为DOM
        var image = new Image()
        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
        // 指定格式 PNG
        image.src = canvas.toDataURL('image/png')
        return image
      }
      const url = 'http://pay.weifactory.vastsum.net/pay'
      if (this.payMode === 'wechat') {
        console.log('wechat')
        this.init()
        this.qrcodeShow = true
        this.$jsonp(url, param)
          .then(res => {
            console.log(res)
            $('#qrcode').empty()
            $('#qrcode').qrcode(res)
            const mycanvas1 = document.getElementsByTagName('canvas')[0]
            const img = convertCanvasToImage(mycanvas1)
            $('#qrcode').empty()
             $('#qrcode').append(img)
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
#qrcode {
  padding: 10px;
  text-align: center;
}
.van-dialog {
  width: 95%;
}
.m5 {
  padding-bottom: 5px;
}
</style>
