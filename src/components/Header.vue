<template>
  <div class="header">
    <div class="back" @click="backPage"><img src="../assets/images/icon_header_back.svg"></div>
    <h1><slot name="title"></slot></h1>
    <div class="tool">
      <slot name="tool"></slot>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'CpHeader',
  setup () {
    const currentInstance = getCurrentInstance()
    const { $router } = currentInstance.appContext.config.globalProperties

    function backPage () {
      $router.back()
    }

    return {
      backPage
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 4.8rem;
  line-height: 4.8rem;
  .back {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0 2rem;
    width: 1rem;
    img {
      width: 1rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 4.8rem;
    line-height: 4.8rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  .tool {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0 2rem;
    min-width: 1rem;
    font-size: 1.4rem;
    color: #fff;
    a {
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
    }
  }
}
</style>
