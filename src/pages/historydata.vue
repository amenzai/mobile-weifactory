<template>
  <div>
    <h2 class="title">温度适时数据</h2>
    <div id="myChartA" style="width: 100%;height: 400px"></div>
    <h2 class="title">湿度适时数据</h2>
    <div id="myChartB" style="width: 100%;height: 400px"></div>
  </div>
</template>
<script>
import {
  dateFormat
} from 'vux'
export default {
  data() {
      return {
        deviceId: '',
        chartLineA: null,
        chartLineB: null,
        timer: null,
        optionA: {},
        optionB: {}
      }
    },
    created() {
      this.deviceId = this.$route.params.deviceId
      this.init()
      this.getList()
      this.getChartData()
    },
    updated() {
      this.drawChartLineA()
      this.drawChartLineB()
    },
    methods: {
      init() {
        this.optionA = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '温度',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: []
          }]
        }
        this.optionB = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '湿度',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: []
          }]
        }
      },
      drawChartLineA() {
        this.chartLineA = this.$echarts.init(document.getElementById('myChartA'))
        this.chartLineA.setOption(this.optionA)
      },
      drawChartLineB() {
        this.chartLineB = this.$echarts.init(document.getElementById('myChartB'))
        this.chartLineB.setOption(this.optionB)
      },
      getList() {
        var date = new Date()
        this.$ajax.get('history/sensor/temperature', this.deviceId)
          .then(res => {
            console.log('', res);
            this.optionA.series[0].data.push(res.data.data)
            this.optionA.xAxis.data.push(dateFormat(date, 'HH:mm:ss'))
            this.drawChartLineA()
          })
        this.$ajax.get('history/sensor/humidity', this.deviceId)
          .then(res => {
            console.log('', res);
            this.optionB.series[0].data.push(res.data.data)
            this.optionB.xAxis.data.push(dateFormat(date, 'HH:mm:ss'))
            this.drawChartLineB()
          })
      },
      getChartData() {
        var num = 1
        this.timer = null
        this.timer = setInterval(() => {
          var date = new Date()
          if (num >= 5) {
            this.optionA.series[0].data.splice(0, 1)
            this.optionA.xAxis.data.splice(0, 1)
            this.optionB.series[0].data.splice(0, 1)
            this.optionB.xAxis.data.splice(0, 1)
          }
          this.$ajax.get('history/sensor/temperature', this.deviceId)
            .then(res => {
              console.log('', res);
              this.optionA.series[0].data.push(res.data.data)
              this.optionA.xAxis.data.push(dateFormat(date, 'HH:mm:ss'))
              this.drawChartLineA()
            })
          this.$ajax.get('history/sensor/humidity', this.deviceId)
            .then(res => {
              console.log('', res);
              this.optionB.series[0].data.push(res.data.data)
              this.optionB.xAxis.data.push(dateFormat(date, 'HH:mm:ss'))
              this.drawChartLineB()
            })
          num++
        }, 2000)
      },
    },
    destroyed() {
      clearInterval(this.timer)
    }
}
</script>
<style scoped>
.title {
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  padding-top: 30px;
}
</style>
