<template>
  <transition-group name="fade" tag="div">
    <div class="rules-dialog" v-show="ruleDialogShow" key="box1">
      <div class="mask" style="opacity: .6"></div>
      <div class="container">
        <h2>
          <slot name="title"></slot>
        </h2>
        <button @click="changeDialog"><img src="../assets/images/icon_dialog_close.svg"></button>
        <div class="cont" v-html="rule">
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
    ruleDialogShow: Boolean,
    rule: String
  },
  setup (props, context) {
    const changeDialog = () => {
      context.emit('changeDialog')
    }

    // console.log(props)

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
