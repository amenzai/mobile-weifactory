<template>
  <div>
    <group v-for="(item,index) in btnList" :key="index">
      <x-switch :title="item.actuatorName" @on-change="postStatus(index,item.actuatorId)" v-model="btnGroup[index]"></x-switch>
      <datetime v-model="date[index][0]" title="开启时间" is-link format="YYYY-MM-DD HH:mm" v-show="!checkGroup[index].length"></datetime>
      <datetime v-model="date[index][1]" title="结束时间" is-link format="YYYY-MM-DD HH:mm" v-show="!checkGroup[index].length"></datetime>
      <checklist title="是否一直开启" :options="['1']" v-model="checkGroup[index]" label-position="left"></checklist>
    </group>
  </div>
</template>
<script>
import {
  dateFormat
} from 'vux'
export default {
  data() {
      return {
        btnList: [],
        send: {},
        checkGroup: [],
        btnGroup: [],
        sn: '',
        date: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      }
    },
    created() {
      this.sn = this.$route.params.sn
      this.send = {
        sn: this.sn,
        sensorId: '',
        status: '',
        timeVal: '',
        startTime: '',
        endTime: ''
      }
      this.getList()
    },
    methods: {
      getList() {
        this.$ajax.get('control/list', this.sn)
          .then(res => {
            console.log('', res);
            this.btnList = res.data;
            const length = this.btnList.length;
            for (let i = 0; i < length; i++) {
              this.checkGroup[i] = this.btnList[i].timeval ? this.btnList[i].timeval.split(',') : []
              this.btnGroup[i] = this.btnList[i].status === '1' ? true : false
              this.date[i][0] = this.btnList[i].startTime ? dateFormat(new Date(this.btnList[i].startTime), 'YYYY-MM-DD HH:mm:ss') : ''
              this.date[i][1] = this.btnList[i].endTime ? dateFormat(new Date(this.btnList[i].endTime), 'YYYY-MM-DD HH:mm:ss') : ''
            }
          })
      },
      postStatus(index, id) {
        if (!this.checkGroup[index].toString() && !this.date[index][0] && !this.date[index][1]) {
          this.$vux.toast.show({
           text: '请设定时间',
           type: 'warn'
          })
          return
        }
        if (!this.checkGroup[index].length) {
          this.send.startTime = this.date[index][0] + ':00'
          this.send.endTime = this.date[index][1] + ':00'
          this.send.timeVal = ''
        } else {
          this.send.startTime = ''
          this.send.endTime = ''
          this.send.timeVal = this.checkGroup[index].toString()
        }
        this.send.sensorId = id
        this.send.status = this.btnGroup[index] ? '1' : '0'
        console.log(this.send)
        this.$ajax.post('control/sensor', this.send)
          .then(res => {
            var type = res.success ? 'success' : 'warn';
            if (type === 'success') {
              this.getList();
            }
            this.$vux.toast.show({
             text: res.message,
             type: type
            })
          })
      }
    }
}
</script>
<style scoped>
</style>
