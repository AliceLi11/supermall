<template>
  <div class="goods-list-item">
    <img :src="goodsItem.show.img" alt="">
    <div>
      <p>{{goodsItem.title}}</p>
      <span>{{goodsItem.price}}</span>
      <span>{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goods-list-item{
    width: 46%;
  }
</style>