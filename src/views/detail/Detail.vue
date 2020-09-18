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
      <ul>
        <li>aaa1</li>
        <li>aaa2</li>
        <li>aaa3</li>
        <li>aaa4</li>
        <li>aaa5</li>
        <li>aaa6</li>
        <li>aaa7</li>
        <li>aaa8</li>
        <li>aaa9</li>
        <li>aaa10</li>
        <li>aaa11</li>
        <li>aaa12</li>
        <li>aaa13</li>
        <li>aaa14</li>
        <li>aaa15</li>
        <li>aaa16</li>
        <li>aaa17</li>
        <li>aaa18</li>
        <li>aaa19</li>
        <li>aaa20</li>
        <li>aaa21</li>
        <li>aaa22</li>
        <li>aaa23</li>
        <li>aaa24</li>
        <li>aaa25</li>
        <li>aaa26</li>
        <li>aaa27</li>
        <li>aaa28</li>
        <li>aaa29</li>
        <li>aaa30</li>
        <li>aaa31</li>
        <li>aaa32</li>
        <li>aaa33</li>
        <li>aaa34</li>
        <li>aaa35</li>
        <li>aaa36</li>
        <li>aaa37</li>
        <li>aaa38</li>
        <li>aaa39</li>
        <li>aaa40</li>
        <li>aaa41</li>
        <li>aaa42</li>
        <li>aaa43</li>
        <li>aaa44</li>
        <li>aaa45</li>
        <li>aaa46</li>
        <li>aaa47</li>
        <li>aaa48</li>
        <li>aaa49</li>
        <li>aaa50</li>
        <li>aaa51</li>
        <li>aaa52</li>
        <li>aaa53</li>
        <li>aaa54</li>
        <li>aaa55</li>
        <li>aaa56</li>
        <li>aaa57</li>
        <li>aaa58</li>
        <li>aaa59</li>
        <li>aaa60</li>
        <li>aaa61</li>
        <li>aaa62</li>
        <li>aaa63</li>
        <li>aaa64</li>
        <li>aaa65</li>
        <li>aaa66</li>
        <li>aaa67</li>
        <li>aaa68</li>
        <li>aaa69</li>
        <li>aaa70</li>
        <li>aaa71</li>
        <li>aaa72</li>
        <li>aaa73</li>
        <li>aaa74</li>
        <li>aaa75</li>
        <li>aaa76</li>
        <li>aaa77</li>
        <li>aaa78</li>
        <li>aaa79</li>
        <li>aaa80</li>
        <li>aaa81</li>
        <li>aaa82</li>
        <li>aaa83</li>
        <li>aaa84</li>
        <li>aaa85</li>
        <li>aaa86</li>
        <li>aaa87</li>
        <li>aaa88</li>
        <li>aaa89</li>
        <li>aaa90</li>
        <li>aaa91</li>
        <li>aaa92</li>
        <li>aaa93</li>
        <li>aaa94</li>
        <li>aaa95</li>
        <li>aaa96</li>
        <li>aaa97</li>
        <li>aaa98</li>
        <li>aaa99</li>
        <li>aaa100</li>
      </ul>
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
    /* overflow: hidden; */
  }
</style>