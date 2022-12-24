<template>
  <transition-group name="fade" tag="div">
    <div class="rules-dialog" v-show="ruleDialogShow" key="box1">
      <div class="mask" style="opacity: .6"></div>
      <div class="container">
        <h2>
          <slot name="title"></slot>
        </h2>
        <button @click="changeDialog"><img src="../assets/images/icon_dialog_close.svg"></button>
        <div class="cont">
          <p>一、什么是贡献值?</p>
          <p>贡献值是组织内消费资本置换的一种权益，按贡献度将所有权再分配到组织成员中，实现组织内价值全员所有。</p>

          <p>二、贡献值获得方式</p>
          <p>贡献值在买家确认收货后自动结算</p>
          <p>1.组织内的消费行为，买家获得消费贡献值=实际商家让利金额x10;</p>
          <p>2.商家的让利行为，商家获得让利贡献值=实际商家让利金额 x2;</p>
          <p>3.会员推广贡献值奖励;</p>
          <p>4.代理运营商区域运营的贡献值奖励。</p>

          <p>三、贡献值作用</p>
          <p>根据个人贡献值在平台总贡献值占比，系统每日按个人贡献值占比赠送D瓜。</p>
          <p>每回购价值1元的股权，则消耗1贡献值，回购的股权价值=减少贡献值的数量</p>
          <p>一、什么是贡献值?</p>
          <p>贡献值是组织内消费资本置换的一种权益，按贡献度将所有权再分配到组织成员中，实现组织内价值全员所有。</p>

          <p>二、贡献值获得方式</p>
          <p>贡献值在买家确认收货后自动结算</p>
          <p>1.组织内的消费行为，买家获得消费贡献值=实际商家让利金额x10;</p>
          <p>2.商家的让利行为，商家获得让利贡献值=实际商家让利金额 x2;</p>
          <p>3.会员推广贡献值奖励;</p>
          <p>4.代理运营商区域运营的贡献值奖励。</p>

          <p>三、贡献值作用</p>
          <p>根据个人贡献值在平台总贡献值占比，系统每日按个人贡献值占比赠送D瓜。</p>
          <p>每回购价值1元的股权，则消耗1贡献值，回购的股权价值=减少贡献值的数量</p>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
// import { ref } from 'vue'
export default {
  name: 'CpRulesDialog',
  props: {
    ruleDialogShow: Boolean
  },
  setup (props, context) {
    const changeDialog = () => {
      context.emit('changeDialog')
    }

    return {
      changeDialog
    }
  }
}
</script>

<style lang="scss">
.rules-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  transition: opacity 2s;
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
  }
  .container {
    position: absolute;
    top: 15vh;
    left: 4vw;
    right: 4vw;
    bottom: 6vh;
    padding: 2rem;
    background: linear-gradient(93.5deg, #F8124B 18.71%, #FE2C2D 83.26%);
    border-radius: .8rem;
    h2 {
      padding: 0 0 2rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: #fff;
      width: auto;
      text-align: center;
    }
    button {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: none;
      border: 0;
    }
    .cont {
      background: #fff;
      position: absolute;
      top: 6.5rem;
      left: 2rem;
      right: 2rem;
      bottom: 2rem;
      border-radius: .4rem;
      padding: 1.5rem;
      overflow-y: auto;
      p {
        font-size: 1.4rem;
        line-height: 1.5;
        padding-bottom: 1rem;
      }
    }
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
</style>
