<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
        <slot name="item-icon"></slot>
    </div>
    <div v-else>
        <slot name="item-icon-active"></slot>
    </div>
    <div :style="isActiveColor">
        <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        link:{
          type:String,
          required
        },
        activeColor:{
            type:String,
            default:"blue"
        }
    },
    data(){
        return{
            router:""
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.link) !== -1
        },
        isActiveColor(){
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            if(this.$route.path!==this.path){
                this.$router.replace(this.path)
            }
        }
    }

}
</script>

<style scoped>
    .tabbar-item{
        flex: 1;
        font-size: var(--font-size);
    }
    .active{
        color: red;
    }
    .tabbar-item img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
        vertical-align: middle;
        margin-bottom: 3px;
    }
</style>