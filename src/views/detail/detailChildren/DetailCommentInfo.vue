<template>
  <div v-if="Object.keys(commentInfo).length!==0" class="comment-info">
    <div class="top-theme">
      <p class="theme-left">用户评价</p>
      <p class="theme-right">更多></p>
    </div>

    <div class="comment-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="comment-detail">
      <p class="detail-txt">{{commentInfo.content}}</p>
      <div class="detail-other">
        <span class="detail-date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="detail-images" v-if="commentInfo.images && commentInfo.images.length!==0">
        <img v-for="(item,index) in commentInfo.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils"
export default {
  name:"DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showDate(value){
      let date = new Date(value*1000);
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment-info{
    padding: 20px 15px;
    border-bottom: 5px solid #f2f5f8;
  }


  .top-theme{
    display:flex;
    justify-content:space-between;
    font-size: 15px;
    padding-bottom: 20px;
    border-bottom:2px solid rgba(100,100,100,.1);
  }


  .comment-user{
    padding:10px 0 5px;
    display: flex;
    align-items: center;
  }
  .comment-user img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }



  .comment-detail{
    padding: 0 5px 15px;
  }
  .detail-txt{
    line-height:1.5;
    font-size: 15px;
    color: #777;
  }
  .detail-other{
    font-size:12px;
    color:#aaa;
    margin-top: 9px;
  }
  .detail-date{
    margin-right: 8px;
  }
  .detail-images{
    margin-top: 10px;
  }
  .detail-images img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>