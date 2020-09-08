<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
      <div class="info-title">
          {{goods.title}}
      </div>
      <div class="info-price">
          <span>{{goods.newPrice}}</span>
          <span>{{goods.oldPrice}}</span>
          <span>{{goods.discount}}</span>
      </div>
      <div class="info-others">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.columns.length-1].name}}</span>
      </div>
      <div class="info-service">
          <span class="info-service-item" v-for="index in goods.services.length" :key="index">
            <img :src="goods.services[index-1].icon">
            <span>{{goods.services[index-1].name}}</span>
        </span>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailBaseInfo",
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>

</style>