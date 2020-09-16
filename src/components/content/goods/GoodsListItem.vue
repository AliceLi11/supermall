<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img :src="goodsItem.show.img" alt="" @load="loadedImg">
    <div>
      <p class="goodsitem-title">{{goodsItem.title}}</p>
      <p class="goodsitem-others">
        <span class="goodsitem-price">{{goodsItem.price}}</span>
        <span class="goodsitem-cfav">{{goodsItem.cfav}}</span>
      </p>
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
    },
    goodsItemClick(){
      this.$router.push("/detail/"+this.goodsItem.iid);
    }
  }
}
</script>

<style>
  .goods-list-item{
    width: 46%;
  }
  .goodsitem-title{
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    margin-top: 5px;
  }
  .goodsitem-others{
    text-align: center;
  }
  .goodsitem-price{
    color:var(--color-tint);
    font-size: 12px;
  }
  .goodsitem-cfav{
    font-size: 12px;
  }
</style>