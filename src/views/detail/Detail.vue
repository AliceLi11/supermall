<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/detailChildren/DetailNavBar"

import {getDetails,Goods} from "network/detail"
export default {
  name:"Detail",
  components:{
    DetailNavBar
  },
  data(){
    return{
      id:null,
      goods:null
    }
  },
  created(){
    //1.保存传入的iid
    this.id = this.$route.params.id;
    //2.根据iid请求详情数据
    getDetails(this.id).then(res=>{
      console.log(res);
      const data = res.result;
      //1.获取图顶部图片轮播数据(先搁置)
      
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    })
  }
}
</script>

<style scoped>

</style>