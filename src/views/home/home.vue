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
    //1.请求多个数据
    getHomeMultidata().then(res=>{
      console.log(res);
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
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