<template>
  <div class="detail-navbar">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" class="back-img">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles" :key="index" class="title-item" :class="{ativeTitle:index===currentIndex}" @click="itemClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name:"DetailNavBar",
  components:{
    NavBar
  },
  props:{
    currentIndex:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐']
    }
  },
  methods:{
    itemClick(index){
      this.$emit('itemClick', index)
    },
    backClick(){
      //this.$router.go(-1) 相当于 this.$router.back()
      this.$router.back();
    }
  }
}
</script>

<style scoped>
 .detail-navbar {
    background-color: #fff;
    font-weight: normal;
  }
  .title{
    display: flex;
    font-size: 13px;
    padding: 0 20px;
  }
  .title-item{
    flex:1;
  }
  .ativeTitle{
    color:var(--color-high-text);
  }
  .back-img{
    width: 26px;
    vertical-align: middle;
  }
</style>