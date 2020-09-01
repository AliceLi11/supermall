<template>
  <div id="home">
    <NavBar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </NavBar>
    <HomeRecommendView :recommends="recommends"></HomeRecommendView>
    <HomeFeatureView></HomeFeatureView>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {getHomeMultidata} from "network/home"
import HomeRecommendView from "views/home/childComps/HomeRecommendView"
import HomeFeatureView from "views/home/childComps/HomeFeatureView"
export default {
  name:"home",
  components:{
    NavBar,
    HomeRecommendView,
    HomeFeatureView
  },
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  created(){
    //this
    //1.请求多个数据
    getHomeMultidata().then(res=>{
      console.log(res);
      //在函数调用完成数据销毁前先把数据保存下来
      //this在箭头函数中往上找作用域,这里的this相当于created()中的this,而这个this就是当前组件的对象
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      console.log(this.banners)
      console.log(this.recommends);
    })
  }
}
</script>

<style>
  .home-nav{
    background: var(--color-tint);
    color: white;
  }
</style>