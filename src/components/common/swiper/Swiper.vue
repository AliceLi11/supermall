<template>
  <div id="hy-swiper">
    <div class="swiper">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"Swiper",
  props:{
    interval:{
      type:Number,
      default:3000
    },
    animDuration:{
      type:Number,
      default:300
    },
    moveRation:{
      type:Number,
      default:0.25
    },
    //是否显示点点
    showIndicator:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      slideCount:0,//元素个数
      totalWidth:0,//swiper的宽度
      swiperStyle:{},//swiper的样式
      currentIndex:1,//当前的index
      scrolling:false//是否正在滚动
    }
  },
  mounted(){

  },
  methods:{
    /**
     * 定时器操作
     */
    startTimer(){
      this.playTimer = window.setInterval(()=>{
        this.currentIndex++;

      },this.interval)
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent(){
      //0.设置正在滚动
      this.scrolling = true;

      //1.开始滚动动画
      this.swiperStyle.transition = 'transform '+this.animDuration +'ms';
      this.setTransform(currentPosition);

      //2.判断滚动到的位置
      this.checkPosition();

      //4.滚动完成
      this.scrolling = false;
    },
    /**
     * 操作DOM:在DOM前后添加Slide
     */
    handleDom(){
      //1.获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");

      //2.保存个数
      this.slideCount = slidesEls.length;

      //3.如果大于1个，那么在前后分别添加一个slide
      if(this.slideCount > 1){
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount-1].cloneNode(true);
        swiperEl.insertBefore(cloneLast,slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      
      //4.让swiper元素，显示第一个（目前是显示前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    }
  }
}
</script>

<style scoped>
  #hy-swiper{
    overflow: hidden;
    position: relative;
  }
  .swiper{
    display:flex;
  }
</style>