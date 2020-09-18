<template>
  <div v-if="Object.keys(detailInfo).length!==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :src="item" alt="" :key="index" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object
    }
  },
  data(){
    return {
      counter:0,
      imagesLength:0
    }
  },
  methods:{
    imgLoad(){
      //判断，所有的图片都加载完了，那么进行一次回调就可以了
      if(++this.counter===this.imagesLength){
        this.$emit("imageLoadEnd");
      }
    }
  },
  watch:{
    detailInfo(){
      //获取图片的个数
      //这里通过watch监听detailInfo这个属性的变化，从而给imagesLength赋值，而不是直接在data中给imagesLength初始为this.detailInfo.detailImage[0].list.length，因为父组件detailInfo默认为{}，所以这里接收的值一开始也可能也为{}
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
/* 详情页图片的整体部分 */
  .goods-info{
    padding: 20px 0;
    border-bottom:5px solid #f2f5f8;
  }
/* 详情页图片上的文字描述 */
  .info-desc{
    padding:0 15px;
  }
  .info-desc .start, 
  .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start{
    float: left;
  }
  .info-desc .end{
    float:right;
  }
  .info-desc .start::before,
  .info-desc .end::after{
    content:'';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

/* 详情页图片的顶部描述 */
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

/* 详情页图片 */
  .info-list img{
    width: 100%;
  }
</style>