<template>
  <div id="LoginDefault" class="page">

    <div class="logo">
      <img src="../../assets/images/login_logo.png">
    </div>

    <div class="page-panel">
      <div class="form-el">
        <div class="item tel d">+86</div>
        <div class="item"><input class="d" type="text" placeholder="手机号"></div>
      </div>
      <div class="form-el">
        <div class="item"><input class="d" type="text" placeholder="验证码"></div>
        <div class="item code">获取验证码</div>
      </div>
    </div>
    <div class="page-panel agree-panel">
      <input type="radio" id="Agree" @click="agree_handle">
      <i v-show="agree"><img src="../../assets/images/icon_checked_green.svg"></i>
      <label for="Agree">已阅读并同意<span>《用户协议》</span>与<span>《隐私政策》</span></label>
      <div class="button-large">登录</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LoginDefault',
  data () {
    return {
      agree: false
    }
  },
  methods: {
    agree_handle () {
      this.agree = true
    }
  }
}
</script>

<style lang="scss">
.logo {
  margin: 10vh auto 0;
  width: 35vw;
  img {
    width: 100%;
    height: auto;
  }
}
.agree-panel {
  width: 70vw;
  margin: 12vh 15vw 0;
  input,label {
    display: inline-block;
    vertical-align: middle;
  }
  label {
    font-size: 1.2rem;
    color: #000;
    padding: 0 0 0 2rem;
    span {
      color: #E63C39;
    }
  }
  input {
    background: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: .2rem;
    left: .1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  img {
    position: absolute;
    top: .1rem;
    left: .1rem;
    width: 1.7rem;
    height: 1.7rem;
  }
  .button-large {
    margin: 2.5rem 0 5rem;
  }
}
</style>
