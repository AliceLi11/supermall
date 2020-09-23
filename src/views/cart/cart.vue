<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <p>购物车</p>
      </template>
    </nav-bar>
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

<style scoped>
.cart-nav{
  background: var(--color-tint);
  color: white;
}
</style>