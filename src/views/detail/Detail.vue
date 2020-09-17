<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/detailChildren/DetailNavBar"
import DetailSwiper from "views/detail/detailChildren/DetailSwiper"
import DetailBaseInfo from "views/detail/detailChildren/DetailBaseInfo"
import DetailShopInfo from "views/detail/detailChildren/DetailShopInfo"
import DetailGoodsInfo from "views/detail/detailChildren/DetailGoodsInfo"

import Scroll from "components/common/scroll/Scroll"

import {getDetails,Goods,Shop} from "network/detail"
export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll
  },
  data(){
    return{
      id:null,
      topImgs:[],
      goods:{},
      shop:{},
      detailInfo:{}
    }
  },
  created(){
    //1.保存传入的iid
    this.id = this.$route.params.id; 
    //2.根据iid请求详情数据
    getDetails(this.id).then(res=>{
      console.log(res);
      //获取结果
      const data = res.result;
      //1.获取顶部图片轮播数据
      this.topImgs = data.itemInfo.topImages;
      
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
    
      //3.获取商家信息
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
    })
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    height: 100vh;
    z-index: 9;
    background: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom:60px;
  }
</style>