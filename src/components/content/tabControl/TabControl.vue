<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{activeItem:index===curIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      curIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.curIndex = index;
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background:#fff;
  }
  .tab-control-item{
    flex:1;
  }
  .tab-control-item span{
    padding:3px;
  }
  .activeItem{
    color:var(--color-high-text);
  }
  .activeItem span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>