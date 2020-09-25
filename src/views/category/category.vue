<template>
  <div id="category">
    <nav-bar class="category-nav">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
        <ul>
          <li>1111</li>
          <li>2111</li>
          <li>3111</li>
          <li>4111</li>
          <li>5111</li>
          <li>6111</li>
          <li>7111</li>
          <li>8111</li>
          <li>9111</li>
          <li>10111</li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import TabMenu from "./childComps/TabMenu"
import TabContentCategory from "./childComps/TabContentCategory"
import TabContentDetail from "./childComps/TabContentDetail"

import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"
import TabControl from "components/content/tabControl/TabControl"

import {getCategory,getSubcategory,getCategoryDetail} from "network/category"

import {POP,NEW,SELL} from "common/const"
import {itemListenerMixin} from "common/mixin"
export default {
  name:"Category",
  components:{
    TabMenu,
    TabContentCategory,
    TabContentDetail,
    NavBar,
    Scroll,
    TabControl
  },
  mixins:[itemListenerMixin],
  data(){
    return {
      categories:[],
      categoryData:{},
      currentIndex:-1,
      currentType:POP
    }
  },
  created(){
    this._getCategory();
  },
  computed:{
    showSubcategory(){
      if(this.currentIndex === -1){
        return {}
      }else{
        return this.categoryData[this.currentIndex].subcategories;
      }
    },
    showCategoryDetail(){
      if(this.currentIndex === -1){
        return []
      }else{
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    }
  },
  deactivated(){
    //取消全局事件的监听，不能只传一个事件，一定要把监听的函数也加上，不然所有监听了这个事件的地方全被取消了
    this.$bus.$off('itemImgLoaded',this.itemImgListener)
  },
  methods:{
    _getCategory(){
      getCategory().then(res=>{
        console.log(res);
        //1.获取分类数据
        this.categories = res.data.category.list;
        //初始化每个类别的子数据
        for(var i = 0; i < this.categories.length; i++){
          this.categoryData[i] = {
            subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        this. _getSubcategories(0);
      })
    },
    _getSubcategories(index){
      this.currentIndex = index;
      let maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res=>{
        this.categoryData[index].subcategories = res.data;
        this.categoryData = {...this.categoryData};
        this._getCategoryDetail(POP);
        this._getCategoryDetail(NEW);
        this._getCategoryDetail(SELL);
      })
    },
    _getCategoryDetail(type){
      //1.获取请求的miniWallKey
      let miniWallKey = this.categories[this.currentIndex].miniWallkey;
      //2.发送请求，传入miniWallKey和tyPe
      getCategoryDetail(miniWallKey,type).then(res=>{
        console.log(res);
        //3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {...this.categoryData};
      })
    },
    /**
     * 事件响应的相关方法
     */
    selectItem(index){
      this._getSubcategories(index);
    },
    tabClick(index){
      if(index===0){
        this.currentType = POP;
      }else if(index===1){
        this.currentType = NEW;
      }else if(index===2){
        this.currentType = SELL;
      }
    }
  }
}
</script>

<style scoped>
  #category{
    height:100vh;
  }
  .category-nav{
    background: var(--color-tint);
    color: #fff;
    /* position: relative;
    z-index:9; */
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    overflow: hidden;
  }
  #tab-content{
    flex:1;
    height:100%;
  }
</style>