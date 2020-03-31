<template>
  <div id="home">
    <NavBar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {getHomeMultidata} from "network/home"
export default {
  name:"home",
  components:{
    NavBar
  },
  data(){
    return {
      banners:"",
      recommends:""
    }
  },
  created(){
    //1.请求多个数据
    getHomeMultidata().then(res=>{
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
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