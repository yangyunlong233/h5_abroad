<template>
  <div id="UsrDValueForceBuy" class="page">

    <Header back="true">
      <template v-slot:title>D瓜账单记录</template>
    </Header>

    <div class="page-cont">
      <div class="page-panel panel-title"><i></i><span>我的贡献值</span></div>
      <div class="page-panel tab-panel">
        <ul class="flex-column">
          <li class="current">全部</li>
          <li>注册奖励</li>
          <li>消费让利</li>
          <li>团队收益</li>
          <li>产出消耗</li>
        </ul>
      </div>

      <div class="page-panel list-panel">
        <ul>
          <li>
            <div class="t">
              <p>赠送用户D瓜</p>
              <p>2022-11-01 00:03:42</p>
              <p class="up">交易成功 (1101)</p>
            </div>
            <div class="c">
              <p>收入:</p>
              <p>手续费:</p>
              <p>余额:</p>
            </div>
            <div class="dd">
              <p class="up">+0.33个</p>
              <p>0.01个</p>
              <p>1.34个</p>
            </div>
          </li>
          <li>
            <div class="t">
              <p>赠送用户D瓜</p>
              <p>2022-11-01 00:03:42</p>
              <p class="up">交易成功 (1101)</p>
            </div>
            <div class="c">
              <p>收入:</p>
              <p>手续费:</p>
              <p>余额:</p>
            </div>
            <div class="dd">
              <p class="dn">-0.33个</p>
              <p>0.01个</p>
              <p>1.34个</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
  name: 'UsrDValueForceBuy',
  data () {
    return {
      agree: false
    }
  },
  components: {
    Header
  },
  methods: {
    agree_handle () {
      this.agree = true
    }
  }
}
</script>
<style lang="scss" scoped>
.top-panel {
  .t {
    font-size: 1.3rem;
    white-space: nowrap;
    padding: 0 0 .3rem 0;
  }
  .d {
    font-size: 1.7rem;
  }
}
</style>
