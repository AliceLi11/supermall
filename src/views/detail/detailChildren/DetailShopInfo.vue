<template>
  <div class="shop-info">

    <div class="shop-title">
      <div class="shop-icon-box">
        <img :src='shop.logo' class="shop-icon">     
      </div>
      <span class="shop-name">{{shop.name}}</span>
    </div>

    <div class="shop-others">
      <div class="shop-others-left shop-others-item">
        <div class="shop-sell">
          <p class="sells-count">{{shop.sells | sellCountFilter}}</p>
          <span class="sells-txt">总销量</span>
        </div>
        <div class="shop-counts">
          <p class="goods-count">{{shop.goodsCount}}</p>
          <span class="goods-txt">全部宝贝</span>
        </div>
      </div>
      <div class="shop-others-right shop-others-item">
        <div class="shop-score">
          <table>
            <tr v-for="(item,index) in shop.score" :key="index">
              <td>{{item.name}}</td>
              <td class="shop-score-val" :class='{isHighScoreVal:item.isBetter}'>{{item.score}}</td>
              <td class="shop-score-toal" :class='{isHighScoreTotal:item.isBetter}'><span>{{item.isBetter?"高":"低"}}</span></td>
            </tr>
          </table>
        </div>
      </div>  
    </div>

    <div class="shop-bottom">
      <p class="enter-shop">进店逛逛</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailShopInfo",
  props:{
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    sellCountFilter(value){
      if(value<10000) return value;
      return (value/10000).toFixed(1)+'万'
    }
  }
}
</script>

<style scoped>
  .shop-info{
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

/* shop-title */
  .shop-icon-box,
  .shop-name{
    display: inline-block;
    vertical-align: middle;
  }
  .shop-icon-box{
    width: 40px; 
    height: 40px;
    border-radius: 50%;
    border:1px solid #ddd;
    overflow: hidden;
    margin-right: 8px;
  }
  .shop-icon{
    width: 100%;
  }

/* shop-others */
  .shop-others{
    display: flex;
    margin-top:15px;
    align-items: center;
  }
  .shop-others-item{
    flex: 1;
  }
  .shop-others-left{
    display: flex;
    justify-content: space-evenly;
    color:#333;
    text-align: center;
    border-right:1px solid rgba(0,0,0,.1);
  }
  .sells-count,
  .goods-count{
    font-size: 18px;
  }
  .sells-txt,
  .goods-txt{
    font-size: 12px;
    margin-top:10px;
  }

  .shop-others-right{
    font-size:13px;
    color: #333;
  }
  .shop-others-right table{
    width: 120px;
    margin-left:30px;
  }
  .shop-others-right table td{
    padding:5px 0;
  }

  .shop-score-val{
    color: #5ea732;
  }
  .isHighScoreVal{
    color:#f13e3a;
  }
  .shop-score-toal{
    background: #5ea732;
    color: #fff;
    text-align: center;
  }
  .isHighScoreTotal{
    background: #f13e3a;
  }

/* shop-bottom */
  .shop-bottom{
    margin-top:10px;
    text-align:center;
  }
  .enter-shop{
    display: inline-block;
    font-size:14px;
    background: #f2f5f8;
    border-radius: 10px;
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align:center;
  }
</style>