<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img :src="showImage" alt="" @load="loadedImg">
    <div>
      <p class="goodsitem-title">{{goodsItem.title}}</p>
      <p class="goodsitem-others">
        <span class="goodsitem-price">¥{{goodsItem.price}}</span>
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
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
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
      //方案1，首页离开的时候，就不再监听这个事件，所以Home页面有设置
      this.$bus.$emit("itemImgLoaded");
      //方案2，不同页面设置不同的监听名
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit("homeImgLoaded");
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit("detailItemImgLoaded");
      // }
    },
    goodsItemClick(){
      if(this.$route.path.indexOf('/home')!==-1){
        this.$router.push("/detail/"+this.goodsItem.iid);
      }else{
        return false;
      }
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
    margin-bottom: 10px;
  }
  .goodsitem-price{
    color:var(--color-tint);
    font-size: 12px;
    margin-right: 20px;
  }
  .goodsitem-cfav{
    font-size: 12px;
    position: relative;
  }
  .goodsitem-cfav::before{
    content:'';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>