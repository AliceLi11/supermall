<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <home-recommend-view :recommends="recommends"/>
    <home-feature-view/>
    <tab-control :titles="['流行','新款','精选']" class="tab-bar"/>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
       <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
    </ul>
  </div>
</template>

<script>
// 代码的导入也要有规范，有利于后期管理。区分开相对不同的导入位置
import HomeRecommendView from "views/home/childComps/HomeRecommendView"
import HomeFeatureView from "views/home/childComps/HomeFeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"

import {getHomeMultidata} from "network/home"
import {getHomeGoods} from "network/home"

export default {
  name:"home",
  components:{
    //组件注册的顺序和导入顺序一致
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{"page":0,list:[]},
        'new':{"page":0,list:[]},
        'sell':{"page":0,list:[]}
      }
    }
  },
  //create()比较特殊，当我们组件一旦创建完就会执行的函数，所以最好只在里面写主要逻辑，至于里面更加详细的处理逻辑写在methods里
  created(){
    //this
    //1.请求多个数据
    // getHomeMultidata().then(res=>{
    //   console.log(res);
    //   //在函数调用完成数据销毁前先把数据保存下来
    //   //this在箭头函数中往上找作用域,这里的this相当于created()中的this,而这个this就是当前组件的对象
    //   this.banners = res.data.banner.list
    //   this.recommends = res.data.recommend.list
    //   console.log(this.banners)
    //   console.log(this.recommends);
    // }),
    //1.请求多个数据
    this.getHomeMultidata();
    //2.获取商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods:{
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    //获取商品数据
    getHomeGoods(type){
      const page = this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    }
  }
}
</script>

<style>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-bar{
    position:sticky;
    top: 44px;
  }
</style>