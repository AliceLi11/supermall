<template>
  <scroll id="tab-menu" ref="scroll">
    <div class="menu-list">
      <div class="menu-list-item" :class="{'active':currIndex===index}" v-for="(item,index) in categories" :key="index" @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
export default {
  name:"TabMenu",
  components:{
    Scroll
  },
  props:{
    categories:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currIndex:0
    }
  },
  // mounted(){
  //   this.$refs.scroll.refresh();
  // },
  methods:{
    itemClick(index){
      this.currIndex = index;
      this.$emit('selectItem',index);
    }
  }
}
</script>

<style scoped>
  #tab-menu{
    width: 100px;
    height: 100%;
    flex-shrink: 0;
    background: #f6f6f6;
  }
  .menu-list-item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-list-item.active{
    background:#fff;
    color: var(--color-high-text);
    font-weight: bold;
    border-left: 3px solid var(--color-high-text);
  }
</style>