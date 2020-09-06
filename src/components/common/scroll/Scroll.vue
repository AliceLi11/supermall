<template>
  <div class="wrap" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"
import Pullup from '@better-scroll/pull-up'
import { finished } from 'stream'
BScroll.use(Pullup)
export default {
    name:"Scroll",
    data(){
        return {
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        //暂时这么写，应该等图片加载完调用refresh，可以再better-scroll官网上常见问题中查看
        setTimeout(this.__initScroll,20)
    },
    methods:{
        __initScroll(){
            if(!this.$refs.wrapper) return
            //1.创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,//如果是button的话，设置为false也能点击，但是其他普通元素,此属性必须设置为true才能触发事件
                /**
                 * 3代表实时监听滚动位置，有0/1/2/3
                 * 如果要监听滚动的位置，这个属性一定要设置
                 * 有些页面并不需要监听，所以这里不定死，由父组件动态传对应的数字过来或者不传，因为默认值是0
                 */
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad//开启上拉加载,测试发现，如果开启了上拉加载，就会实时监听滚动位置
            });
            //2.监听滚动的位置
            this.scroll.on('scroll',(position)=>{
                this.$emit('scroll',position)
            })
            //3.监听上拉加载
            if(this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                    this.$emit("pullingUp");
                    // console.log("上拉加载");
                })
            }
        },
        //1. 因为将better-scroll封装成了组件，所以在其他页面最好不要直接用这个组件的方法，所以这里也将原插件的方法封装成了组件的方法供外部调用
        //2.这种&&写法，是为了保证页面在调用这个方法的时候，this.scroll已经存在，否则就没操作
        scrollTo(x,y,time){
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
        },
        // 重新计算content高度
        refresh(){
            //通过这个输出可以知道用了防抖动函数之后，这个函数被调用了几次
            console.log('--------');
            this.scroll && this.scroll.refresh && this.scroll.refresh();
        }
    },
    //还得加强理解，只大概知道监听数据变化，不深入
    // watch:{
    //     data(){
    //         setTimeout(this.refresh,20);
    //     }
    // }
}
</script>

<style scoped>

</style>