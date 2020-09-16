<template>
  <swiper v-if="topImgs.length">
      <swiper-item v-for="(item,index) in topImgs" :key="index" class="item">
          <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
    name:"DetailSwiper",
    props:{
        topImgs:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
    .item{
        height: 300px;
        text-align: center;
    }
</style>