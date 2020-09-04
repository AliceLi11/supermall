<template>
  <div class="good-list">
    <goods-list-item v-for="(item,index) in goodsList" :key="index" :goodsItem = "item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
export default {
  name:"GoodsList",
  props:{
   goodsList:{
     type:Array,
     default(){
       return []
     }
   }
  },
  components:{
    GoodsListItem
  } 
}
</script>

<style scoped>
  .good-list{
    display: flex;
    /* 换行，要想设置一行排几个就换行，就得给子元素.good-list-item设置宽度，这里设置了46% */
    flex-wrap: wrap;
    /* 左右2侧空白和item之间的空白都均等分 */
    justify-content: space-evenly;
  }
</style>