<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <!-- <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" v-show="isTabFixed"/> -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="contentPullUp">
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <!-- 绑定的属性最好简洁，如果有js运算，可以把js运算放在计算属性中 -->
      <goods-list :goodsList="goodsTypeShow"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 代码的导入也要有规范，有利于后期管理。区分开相对不同的导入位置
import HomeRecommendView from "views/home/childComps/HomeRecommendView"
import HomeFeatureView from "views/home/childComps/HomeFeatureView"

import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backTop/BackTop"

import {getHomeMultidata,getHomeGoods} from "network/home"
import {debounce} from "common/utils.js"

export default {
  name:"home",
  components:{
    //组件注册的顺序和导入顺序一致
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{"page":0,list:[]},
        'new':{"page":0,list:[]},
        'sell':{"page":0,list:[]}
      },
      currType:'pop',
      isShowBackTop:false,
      saveY:0
      // isTabFixed:false,
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
  mounted(){
    //1.监听item中图片加载完成,完成之后触发better-scroll插件的refresh函数
    const refresh = debounce(this.$refs.scroll.refresh,500);
    this.$bus.$on('itemImgLoaded',()=>{
      /**
       * 防抖函数起作用的过程：
       * ·如果我们直接执行refresh,namerefresh函数会被执行图片加载总数的次数
       * ·可以将refresh函数传入到debounce函数中，生成一个新的函数
       * ·之后在调用非常频繁的时候，就使用新生成的函数
       * ·而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉
       */
      // this.$refs.scroll.refresh();
      refresh();
    })
    //2.获取tabControl的offsetTop
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      //自己写的方法，感觉比老师写的方法好
      this.currType = Object.keys(this.goods)[index];
      /*
      老师写的方法
      switch(index){
        case 0:
          this.currType='pop';
          break;
        case 1:
          this.currType='new';
          break;
        case 2:
          this.currType='sell';
          break;
      }
      */
    },
    backClick(){
      //可以获取到Scroll组件，并拿到Scroll组件里的信息
      this.$refs.scroll.scrollTo(0,0);
      console.log("点击了backtop")
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y)>3000
    },
    contentPullUp(){
      console.log("上拉加载");
      this.getHomeGoods(this.currType);
    },

    /**
     * 网络请求相关的方法
     */
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
        //结束上拉加载行为。每次触发 pullingUp 钩子后，等数据请求完成，并且将新的数据展示出来后,你应该主动调用 finishPullUp() 告诉 BetterScroll 准备好下一次的 pullingUp 钩子。
        //这里的finishPullUp()是在scroll组件里写的一个方法，里面封装了this.scroll.finshPullUp()
        this.$refs.scroll.finishPullUp();
      })
    }
  },
  computed:{
    goodsTypeShow(){
      return this.goods[this.currType].list
    }
  },
  activated(){
    //老师这行是加在后面的，偶发性来回点的时候，会跳到顶部。放在上面之后，暂时没看到这个bug。
    //其实如果没用better-scroll，可以直接用keep-alive记住位置。bs导致要人为去记住位置。方案：
    //离开时，即deactived保存一个位置信息saveY,进来时，将位置设置未原来保存的位置saveY即可。
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0);
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY();
  },
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
    /* background: #fff; 
    height: calc(100vh - 93px)*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .home-nav{
    background: var(--color-tint);
    color: white;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
</style>