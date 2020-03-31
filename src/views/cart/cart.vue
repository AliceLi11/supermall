<template>
  <div id="cart">
    <NavBar class="cart-nav">
      <template v-slot:center>
        <p>购物车</p>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name:"home",
  components:{
    NavBar
  }
}
</script>

<style>
.cart-nav{
  background: var(--color-tint);
  color: white;
}
</style>