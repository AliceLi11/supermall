<template>
  <div class="goods-info">
    <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="">
  </div>
</template>

<script>
export default {
  name:"DetailGoodsInfo",
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>