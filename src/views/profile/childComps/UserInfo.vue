<template>
  <div class="user-info">
    <a href="#" class="clear-fix user-info-box">
      <div class="user-icon">
        <slot name="user-icon">
          <svg class="privateImage-svg left">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
          </svg>
        </slot>
      </div>
      
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg>
          </span>
          <div class="user-phone">
            <slot name="user-phone">暂无绑定手机号</slot>
          </div>
        </div>
      </div>

      <div class="arror-right">
        <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
      </div>
      
    </a>
  </div>
</template>

<script>
export default {
  name:"UserInfo"
}
</script>

<style scoped>
  .user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  .user-info-box{
    display: flex;
    align-items: center;
  }
  .user-icon{
    width:70px;
  }
  .arror-right{
    width:20px;
    text-align: right;
  }
  .login-info{
    flex:1;
  }
 .user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .user-info .arrow-svg {
    width: 11px;
    height: 22px;
  }

  .user-info .login-info {
    color: #fff;
  }

  .user-info .login-info .phone {
    position: relative;
    font-size: 13px;
    margin-top: 5px;
    font-weight: 300;
  }

  .user-phone{
    display: inline-block;
    vertical-align: middle;
  }
  .user-info .login-info .phone .icon-mobile {
    width: 12px;
    height: 18px;
    vertical-align: middle;
  }
</style>