<template>
  <div style="margin-top:15px">
    <grid :cols="2">
      <grid-item link="/home/devicelist/1" label="设备按钮控制"> <img slot="icon" src="../common/img/grid_icon.png"> </grid-item>
      <grid-item link="/home/devicelist/2" label="查看历史数据"> <img slot="icon" src="../common/img/grid_icon.png"> </grid-item>
    </grid>
  </div>
</template>
<script>
  export default {
    methods: {},
    data() {
      return {}
    }
  }

</script>
