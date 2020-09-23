<template>
  <div id="detail">
    <detail-nav-bar @itemClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-imgs="topImgs" ref="base"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-recommend-info :recommend-list="recommendList" ref="recommend"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
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
import DetailBottomBar from "views/detail/detailChildren/DetailBottomBar"

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
    DetailBottomBar,
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
      recommendList:[],
      themeTops:[],
      currentIndex:0
    }
  },
  created(){
    this._getDetailData()
    this._getRecommend()
  },
  updated(){
    //获取需要的四个offsetTop
    this._getOffsetTops();
  },
  methods:{
    _getOffsetTops(){
      this.themeTops = [];
      this.themeTops.push(this.$refs.base.$el.offsetTop);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);//JavaScript 中可表示的最大的数。它的近似值为 1.7976931348623157 x 10308。
    },
    contentScroll(position){
      //监听到滚动到哪一个主题
      this._listenScrollTheme(-position.y);
    },
     _listenScrollTheme(posY) {
        let length = this.themeTops.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (posY >= iPos && posY < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      },
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
    },
    addToCart(){
      //1.创建对象
      const obj = {};
      //2.对象信息
      obj.iid = this.id;
      obj.imageURL = this.topImgs[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.nowPrice;
      //3.添加到Store中
      this.$store.commit('addCart',obj);
    },
    titleClick(index){
      console.log(this.themeTops[index]);
      this.$refs.scroll.scrollTo(0,-this.themeTops[index],100);
      this.currentIndex = index;
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