<template>
  <div v-if="Object.keys(detailInfo).length!==0">
    <div class="goods-info">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :src="item" alt="" :key="index">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object
    }
  }
}
</script>

<style scoped>
.goods-info{
  width:100%;
}
</style>