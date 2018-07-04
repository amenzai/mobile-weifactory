<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="申请专家托管" />
    <van-cell-group class="mt10">
      <van-cell title="设备序列号：">
        <span>{{ resData.sn }}</span>
      </van-cell>
      <van-cell title="设备规格：">
        <span>{{ resData.deviceType | seeLabel(typeDic) }}</span>
      </van-cell>
      <van-cell title="选择托管方式：" is-link @click="pickBarData.applyType = true">
        <span>{{ pickBarData.typeText }}</span>
      </van-cell>
      <van-cell title="选择开始托管时间：" is-link @click="pickBarData.showDate1 = true"  v-show="isShow">
        <span>{{ pickBarData.date1Text }}</span>
      </van-cell>
      <van-cell title="选择结束托管时间：" is-link @click="pickBarData.showDate2 = true"  v-show="isShow">
        <span>{{ pickBarData.date2Text }}</span>
      </van-cell>
      <van-cell title="选择托管专家：" is-link @click="pickBarData.expert = true">
        <span>{{ pickBarData.expertText }}</span>
      </van-cell>
      <van-cell :title="paramTitle + '：'">
        <span>{{money | currency}}</span>
      </van-cell>
    </van-cell-group>
    <div class="p15 tc mb10">
      <van-button type="primary" size="large" @click="submit">提交</van-button>
    </div>
    <van-popup v-model="pickBarData.applyType" position="bottom">
      <van-picker show-toolbar title="选择托管方式" :columns="applyType" value-key="label" @confirm="confirmType" @cancel="cancelType" />
    </van-popup>
    <van-popup v-model="pickBarData.showDate1" position="bottom">
      <van-datetime-picker title="选择开始托管时间" v-model="currentDate" type="date" @confirm="confirmDate1" @cancel="cancelDate1" />
    </van-popup>
    <van-popup v-model="pickBarData.showDate2" position="bottom">
      <van-datetime-picker title="选择结束托管时间" v-model="currentDate" type="date" @confirm="confirmDate2" @cancel="cancelDate2" />
    </van-popup>
    <van-popup v-model="pickBarData.expert" position="bottom">
      <van-picker show-toolbar title="选择托管专家" :columns="expertArr" value-key="label" @confirm="confirmExpert" @cancel="cancelExpert" />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'HostEspert',
  data() {
    return {
      money: '',
      paramTitle: "费用",
      deviceId: '',
      isShow: false,
      batchId: '',
      expertArr: [],
      paramList: [],
      typeDic: [],
      applyType: [],
      resData: {},
      searchEngine: [],
      currentDate: new Date(),
      pickBarData: {
        applyType: false,
        typeText: '',
        showDate1: false,
        date1Text: '',
        showDate2: false,
        date2Text: '',
        expert: false,
        expertText: ''
      },
      send: {
        deposit: '',
        exportId: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  created() {
    this.deviceId = this.$storage.session.get('__deviceInfo__', {}).id
    this.getList();
    this.getOnlineExpert();
    this.getParamList();
    this.getTypeDic();
    this.getApplyType();
  },
  methods: {
    getList() {
      this.$http.get("order/device", this.deviceId).then(res => {
        this.resData = res.data;
      });
    },
    getOnlineExpert() {
      this.$http.post("user/onlineExpert").then(res => {
        this.expertArr = res.data.map(item => {
          return {
            label: item.userName,
            value: item.userId
          };
        });
      });
    },
    getTypeDic() {
      this.$http.get("dict/dictItemList/device.type").then(res => {
        this.typeDic = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          };
        });
      });
    },
    getApplyType() {
      this.$http.get("dict/dictItemList/deposit").then(res => {
        this.applyType = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          };
        });
      });
    },
    getParamList() {
      this.$http.get("param/listAll").then(res => {
        this.paramList = res.data;
      });
    },
    confirmType(item) {
      const val = item.value
      const length = this.paramList.length;
      if (val === "1") {
        for (let i = 0; i < length; i++) {
          if (this.paramList[i].paramCode === "allPrice") {
            this.money = this.paramList[i].paramValue;
            this.paramTitle = this.paramList[i].paramName;
            break;
          }
        }
        this.isShow = false;
      }
      if (val === "2") {
        for (let i = 0; i < length; i++) {
          if (this.paramList[i].paramCode === "price") {
            this.money = this.paramList[i].paramValue;
            this.paramTitle = this.paramList[i].paramName;
            break;
          }
        }
        this.isShow = true;
      }
      this.send.deposit = val
      this.pickBarData.typeText = item.label
      this.pickBarData.applyType = false
    },
    cancelType(value, index) {
      this.pickBarData.applyType = false
    },
    confirmExpert(item) {
      this.send.exportId = item.value
      this.pickBarData.expertText = item.label
      this.pickBarData.expert = false
    },
    cancelExpert(value, index) {
      this.pickBarData.expert = false
    },
    confirmDate1(val) {
      this.pickBarData.showDate1 = false
      this.send.startTime = this.$dateFilter(val, 'YYYY-MM-DD 00:00:00')
      this.pickBarData.date1Text = this.$dateFilter(val, 'YYYY-MM-DD')
    },
    cancelDate1() {
      this.pickBarData.showDate1 = false
    },
    confirmDate2(val) {
      this.pickBarData.showDate2 = false
      this.send.endTime = this.$dateFilter(val, 'YYYY-MM-DD 00:00:00')
      this.pickBarData.date2Text = this.$dateFilter(val, 'YYYY-MM-DD')
    },
    cancelDate2() {
      this.pickBarData.showDate2 = false
    },
    submit(formName) {
      if (!this.send.deposit) {
        this.$toast('请选择托管方式！')
        return
      }
      if (!this.send.exportId) {
        this.$toast('请选择专家！')
        return
      }
      if (this.send.deposit === '2') {
        if (!this.send.startTime || !this.send.endTime) {
          this.$toast('请选择托管时间！')
          return
        }
      }
      const send = { ...this.send }
      send.deviceId = this.deviceId
      this.$http.post("order/pay", send).then(res => {
        this.$store.commit("UPDATE_ORDER", res.data);
        this.$router.push("/pay");
        this.$toast.success(res.message)
      });
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
</style>
