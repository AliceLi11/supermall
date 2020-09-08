<template>
  <div id="app">
    <!-- exclude去除个别页面的缓存 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar"
export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style scoped>
  @import "assets/css/base.css";
  #app{
    width: 100%;
    height: 100%;
  }
</style>

