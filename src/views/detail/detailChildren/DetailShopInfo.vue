<template>
  <div class="shop-info">
    <div class="shop-title">
      <img :src='"http:"+shop.logo' alt="" style="width:40px">
      <span>{{shop.name}}</span>
      <div>
        <span>{{shop.sells}}</span>
        <span>||</span>
        <span>{{shop.goodsCount}}</span>
        <span>||</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailShopInfo",
  props:{
    shop:{
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