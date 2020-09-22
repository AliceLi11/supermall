
import {debounce} from "./utils.js"
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted(){
    //1.监听item中图片加载完成,完成之后触发better-scroll插件的refresh函数
    const refresh = debounce(this.$refs.scroll.refresh,500);
    this.itemImgListener = ()=>{
      refresh();
    }
    this.$bus.$on('itemImgLoaded',this.itemImgListener
    // ()=>{
    //   /**
    //    * 防抖函数起作用的过程：
    //    * ·如果我们直接执行refresh,namerefresh函数会被执行图片加载总数的次数
    //    * ·可以将refresh函数传入到debounce函数中，生成一个新的函数
    //    * ·之后在调用非常频繁的时候，就使用新生成的函数
    //    * ·而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉
    //    */
    //   refresh();
    // }
    )
  }
}