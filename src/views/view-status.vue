<template>
  <div class="wrap">
    <ul class="m-card">
      <li class="card-item">
        <p class="title van-hairline--bottom">第一层</p>
        <div class="con" v-if="batchInfo.plantOne">
          <p>蔬菜名称：{{ batchInfo.plantOne | seeLabel(vegetableName) }}</p>
          <p>生长模式：{{ batchInfo.cultModelOne | seeLabel(cultModel)}}</p>
          <p>定植日期：{{ batchInfo.onePlantingTime | dateFilter('YYYY-MM-DD') }}</p>
          <p v-if="batchInfo.cultModelOne == '3'">预计采收：{{ batchInfo.oneRecoveryTime | dateFilter('YYYY-MM-DD') }}</p>
          <p>
            <van-icon :class="{'yellow':batchInfo.ledOneLeft === '1'}" name="light-fill" />
            <van-icon :class="{'yellow':batchInfo.ledOneMiddle === '1'}" name="light-fill" />
            <van-icon :class="{'yellow':batchInfo.ledOneRight === '1'}" name="light-fill" />
          </p>
        </div>
        <p class="tc gray noinfo" v-else>该层还没有批次信息</p>
      </li>
      <li class="card-item">
        <p class="title van-hairline--bottom">第二层</p>
        <div class="con" v-if="batchInfo.plantTwo">
          <p>蔬菜名称：{{ batchInfo.plantTwo | seeLabel(vegetableName) }}</p>
          <p>生长模式：{{ batchInfo.cultModelTwo | seeLabel(cultModel)}}</p>
          <p>定植日期：{{ batchInfo.twoPlantingTime | dateFilter('YYYY-MM-DD') }}</p>
          <p v-if="batchInfo.cultModelTwo == '3'">预计采收：{{ batchInfo.twoRecoveryTime | dateFilter('YYYY-MM-DD') }}</p>
          <p>
            <van-icon :class="{'yellow':batchInfo.ledTwoLeft === '1'}" name="light-fill" />
            <van-icon :class="{'yellow':batchInfo.ledTwoMiddle === '1'}" name="light-fill" />
            <van-icon :class="{'yellow':batchInfo.ledTwoRight === '1'}" name="light-fill" />
          </p>
        </div>
        <p class="tc gray noinfo" v-else>该层还没有批次信息</p>
      </li>
      <li class="card-item">
        <p class="title van-hairline--bottom">第三层</p>
        <div class="con" v-if="batchInfo.plantThree">
          <p>蔬菜名称：{{ batchInfo.plantThree | seeLabel(vegetableName) }}</p>
          <p>生长模式：{{ batchInfo.cultModelThree | seeLabel(cultModel)}}</p>
          <p>定植日期：{{ batchInfo.threePlantingTime | dateFilter('YYYY-MM-DD') }}</p>
          <p v-if="batchInfo.cultModelThree == '3'">预计采收：{{ batchInfo.threeRecoveryTime | dateFilter('YYYY-MM-DD') }}</p>
          <p>
            <van-icon :class="{'yellow':batchInfo.ledThreeLeft === '1'}" name="light-fill" />
            <van-icon :class="{'yellow':batchInfo.ledThreeMiddle === '1'}" name="light-fill" />
            <van-icon :class="{'yellow':batchInfo.ledThreeRight === '1'}" name="light-fill" />
          </p>
        </div>
        <p class="tc gray noinfo" v-else>该层还没有批次信息</p>
      </li>
      <div class="card-item img-card" v-if="Object.keys(batchInfo).length > 0">
        <div class="con flex1">
          <p>温度/℃：{{ batchInfo.temperatureTwo }}</p>
          <p>湿度/RH%：{{ batchInfo.humidityTwo }}</p>
        </div>
        <img :src="batchInfo.videoTwo" alt="植物图" width="120" height="120">
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ViewStatus',
  data() {
    return {
      tabActive: 0,
      deviceId: '',
      batchInfo: {},
      vegetableName: [],
      cultModel: []
    }
  },
  created() {
    this.deviceId = this.$storage.session.get('__deviceInfo__', {}).id
    this.getVegetableName()
    this.getCultModel()
    this.getBatchInfo()
  },
  methods: {
    getBatchInfo() {
      this.$http.get('batch', this.deviceId).then(res => {
        if (res.data) {
          this.batchInfo = res.data
          this.$storage.session.set('__batchId__', res.data.batchId)
        }
      })
    },
    getCultModel() {
      this.$http.get('dict/dictItemList/controlModel').then(res => {
        this.cultModel = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          }
        })
      })
    },
    getVegetableName() {
      this.$http.get('dict/dictItemList/vegetable.name').then(res => {
        this.vegetableName = res.data.map(item => {
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
@import '~common/less/mixin.less';
.van-icon {
  font-size: 20px;
  vertical-align: middle;
  + .van-icon {
    margin-left: 30px;
  }
}
.noinfo {
  padding: 15px;
}
.m-card {
  padding: 0 15px;
  margin-top: 20px;
  .card-item {
    border-radius: 8px;
    background-color: #fff;
    margin-bottom: 15px;
    .title {
      padding: 15px;
      font-size: 12px;
      color: #666;
    }
    .con {
      padding: 15px;
      line-height: 32px;
    }
    .flex1 {
      flex:1;
      .pl(50px);
    }
    &.img-card {
      display: flex;
      overflow: hidden;
      margin-bottom: 5px;
    }
  }
}
</style>
