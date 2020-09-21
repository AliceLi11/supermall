<template>
  <div class="recommend-info">
    {{recommendList}}
    <goods-list :goods-list="recommendList"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList"
export default {
  name:"DetailRecommendInfo",
  components:{
    GoodsList
  },
  props:{
    recommendList:{
      type:Array,
      default(){
        return []
      }
    }
  }
} 
</script>

<style scoped>

</style>