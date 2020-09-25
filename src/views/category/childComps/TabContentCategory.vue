<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div v-for="(item,index) in subcategories.list" :key="index" class="item">
        <a :href="item.link">
          <img :src="item.image" class="item-img">
          <p class="item-txt">
            {{item.title}}
          </p>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView"
export default {
  name:"TabContentCategory",
  components:{
    GridView
  },
  props:{
    subcategories:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .item{
    text-align:center;
    font-size:12px;
  }
  .item-img{
    width:80%;
  }
  .item-text {
    margin-top: 15px;
  }
</style>