<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" width="100%" style="border:1px solid #ccc">
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/detailChildren/DetailNavBar"
import DetailBaseInfo from "views/detail/detailChildren/DetailBaseInfo"
import DetailShopInfo from "views/detail/detailChildren/DetailShopInfo"
import DetailGoodsInfo from "views/detail/detailChildren/DetailGoodsInfo"

import Scroll from "components/common/scroll/Scroll"

import {getDetails,Goods,Shop} from "network/detail"
export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll
  },
  data(){
    return{
      id:null,
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
      const data = res.result;
      //1.获取图顶部图片轮播数据(先搁置)
      
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
    /* height: calc(100% - 44px);
    overflow: hidden; */
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>