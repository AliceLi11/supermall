<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/detailChildren/DetailNavBar"
import DetailSwiper from "views/detail/detailChildren/DetailSwiper"
import DetailBaseInfo from "views/detail/detailChildren/DetailBaseInfo"
import DetailShopInfo from "views/detail/detailChildren/DetailShopInfo"
import DetailGoodsInfo from "views/detail/detailChildren/DetailGoodsInfo"
import DetailParamInfo from "views/detail/detailChildren/DetailParamInfo"
import DetailCommentInfo from "views/detail/detailChildren/DetailCommentInfo"
import DetailRecommendInfo from "views/detail/detailChildren/DetailRecommendInfo"

import Scroll from "components/common/scroll/Scroll"

import {getDetails,getRecommend,Goods,Shop,GoodsParam} from "network/detail"
import {itemListenerMixin} from "common/mixin"
export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    Scroll
  },
  mixins:[itemListenerMixin],
  data(){
    return{
      id:null,
      topImgs:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendList:[]
    }
  },
  created(){
    this._getDetailData()
    this._getRecommend()
  },
  methods:{
    _getDetailData(){
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

        //保存商品的参数
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);

        //保存用户评价信息
        this.commentInfo = data.rate.list[0];
      })
    },
    _getRecommend(){
      getRecommend().then((res,error)=>{
        if(error) return;
        this.recommendList = res.data.list;
      })
    },
    imageLoadEnd(){
      this.$refs.scroll.refresh();
    }
  },
  destroyed(){
    this.$bus.$off('itemImgLoaded',this.itemImgListener)
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    height: 100vh;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom:60px;
    left:0;
    right: 0;
    overflow: hidden;
  }
</style>