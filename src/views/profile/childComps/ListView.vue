<template>
  <div id="list">
    <div v-for="(item,index) in listData" :key="index" class="list-item">
      <p class="icon">
        <svg :fill="item.iconColor"><use :xlink:href="item.icon"></use></svg>
      </p>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"ListView",
  props:{
    listData:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  #list{
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }
  .list-item{
    height: 44px;
    line-height: 44px;
    position: relative;
  }
  .icon{
    position: absolute;
    margin-top: 10px;
    left: 16px;
    top: -7px;
  }
  .icon svg {
    width: 18px;
    height: 18px;
  }
  .info{
    margin-left: 40px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    padding-left: 5px;
  }
  .list-item:last-of-type .info{
    border-bottom: none;
  }
</style>