<template>
  <div id="app">
    <!-- exclude去除个别页面的缓存 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar"
import Icon from 'components/content/icon/Icon.vue'
import SvgIcon from 'components/content/icon/svg.vue'
export default {
  name: 'App',
  components:{
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
  @import "assets/css/base.css";
  #app{
    width: 100%;
    height: 100%;
  }
</style>

