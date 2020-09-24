<template>
  <div class="icon-selector" :class="{'selector-active': isChecked}"  @click="selectItem">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:"CheckButton",
  props:{
    value:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      isChecked:this.value
    }
  },
  watch:{
    //监听value属性的变化。默认值为true
    value:function(newValue){
      this.isChecked = newValue;
    }
  },
  methods:{
    selectItem(){
      this.$emit('checkBtnClick');
    }
  }
}
</script>

<style scoped>
  .icon-selector{
    position:relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border:2px solid #ccc;
    cursor: pointer;
  }
  .selector-active{
    background: #ff8198;
    border-color:#ff8198;
  }
</style>