<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @checkBtnClick="checkedChange" v-model="itemInfo.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imageURL" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.newPrice}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton"
export default {
  name:"CartListItem",
  props:{
    itemInfo:Object
  },
  components:{
    CheckButton
  },
  methods:{
    checkedChange(){
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
}
</script>

<style scoped>
  #shop-item{
    width:100%;
    display: flex;
    padding: 5px;
    border-bottom:1px solid #ccc;
  }
  .item-selector{
    width:14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .item-title,
  .item-desc{
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info-bottom{
    position:absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>