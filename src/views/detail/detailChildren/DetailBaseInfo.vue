<template>
  <!-- 如果是goods是空的对象，不渲染 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
      <div class="info-title">
          {{goods.title}}
      </div>
      <div class="info-price">
          <span class="nowprice">{{goods.newPrice}}</span>
          <span class="oldprice">{{goods.oldPrice}}</span>
          <span class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-others">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.columns.length-1].name}}</span>
      </div>
      <div class="info-service">
          <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index].icon" class="service-icon">
            <span class="service-txt">{{goods.services[index-1].name}}</span>
        </span>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailBaseInfo",
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .base-info{
        padding: 0 8px;
        margin-top: 15px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        color: #222;
    }
    .info-price{
        margin-top: 10px;
    }
    .nowprice{
        color:var(--color-high-text);
        font-size: 24px;
    }
    .oldprice{
        font-size: 13px;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .discount{
        color: #fff;
        background-color: var(--color-high-text);
        font-size: 12px;
        padding: 1px 8px;
        border-radius: 8px;
        vertical-align: top;
        margin-left: 6px;
    }

    .info-others{
        margin-top: 15px;
        line-height: 30px;
        display: flex;
        font-size: 13px;
        border-bottom: 1px solid rgba(100,100,100,.1);
        justify-content: space-between;
    }

    .info-service{
        display: flex;
        justify-content:space-between;
        line-height: 60px;
    }
    .service-icon{
        width: 14px;
        height: 14px;
        /*让元素下一些: 使用相对定位即可*/
        position: relative;
        top: 2px;
    }
    .service-txt{
        font-size: 13px;
        color: #333;
    }
</style>