<template>
  <div class="bottom-menu">
    <check-button class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计：¥{{totalPrice}}</span>
    <span class="buy-product">去计算：({{cartCount}})</span>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import CheckButton from "./CheckButton"
export default {
  name:"BottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters([
      'cartList',
      'cartCount'
    ]),
    totalPrice(){
     return this.cartList.filter(item=>{
       return item.checked
     }).reduce((prev,cur)=>{
       return prev+cur.count*cur.newPrice
     },0).toFixed(2);
    },
    //动态判断是否全选
    isSelectAll(){
      return this.cartList.every(item=>item.checked);
    }
  },
  methods:{
    checkBtnClick(){
      //1.判断是否有未选中的按钮
      let isSelectAll = this.cartList.some(item=>!item.checked)

      //2.有未选中的内容，则全部选中
      if(isSelectAll){
        this.cartList.forEach(item=>{
          item.checked = true;
        })
      }else{
        this.cartList.forEach(item=>{
          item.checked = false;
        })
      }
    }
  }
}
</script>

<style scoped>
  .bottom-menu{
    position:fixed;
    bottom: 50px;
    left:0;
    right:0;
    width: 100%;
    height: 44px;
    background: #eee;
    box-shadow: 0 -2px 3px rgba(0,0,0,.2);
    font-size: 14px;
    color:#888;
    line-height: 44px;
    padding-left: 35px;
  }
  .select-all{
    position: absolute;
    left:12px;
    top: 13px;
    line-height: 0;
  }
  .total-price{
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product{
    background: orangered;
    color: #fff;
    width:100px;
    float: right;
    text-align: center;
  }
</style>