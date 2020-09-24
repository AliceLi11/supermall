<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <p>购物车</p>
      </template>
    </nav-bar>
    <scroll>
      <cart-list :cart-list="cartList"></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

import NavBar from "components/common/navbar/NavBar"
import BottomBar from "./childComps/BottomBar"
import CartList from "./childComps/CartList"

import Scroll from "components/common/scroll/Scroll"
export default {
  name:"Cart",
  components:{
    NavBar,
    BottomBar,
    CartList,
    Scroll
  },
  computed:{
    ...mapGetters([
      'cartList',
      'cartCount'
    ])
  }
}
</script>

<style scoped>
.cart-nav{
  background: var(--color-tint);
  color: white;
}
</style>