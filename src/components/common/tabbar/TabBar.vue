<template>
  <div id="tabbar">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:"TabBar"
}
</script>

<style>
    #tabbar{
        display: flex;
        text-align: center;
        height: 49px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f6f6f6;
        box-shadow: 0 -1px 1px #f1f1f1;
    }
</style>