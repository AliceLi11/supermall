<template>
  <div class="goods-list-item">
    <img :src="goodsItem.show.img" alt="" @load="loadedImg">
    <div>
      <p>{{goodsItem.title}}</p>
      <span>{{goodsItem.price}}</span>
      <span>{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    //加载完图片
    /*这里用了事件总线的方法
    * 1.this.$bus.$emit("itemImgLoaded");发射事件
    * 2.this.$bus.$on("itemImgLoaded"，fn);监听事件并做处理
    * 3.单上面2步的话，其实this.$bus是空的，所以要在入口文件在原型上给$bus赋值 Vue.prototype.$bus = new Vue()    
    */
    loadedImg(){
      this.$bus.$emit("itemImgLoaded");
    }
  }
}
</script>

<style scoped>
  .goods-list-item{
    width: 46%;
  }
</style>