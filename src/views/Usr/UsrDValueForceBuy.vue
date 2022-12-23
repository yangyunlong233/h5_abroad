<template>
  <div id="UsrDValueForceBuy" class="page">

    <Header back="true">
      <template v-slot:title>D瓜强制回购</template>
    </Header>

    <div class="page-cont">
      <div class="page-panel flex-column top-panel">
        <div class="col-item">
          <div class="t">已回购D瓜(个)</div>
          <div class="d">0</div>
        </div>
        <div class="col-item">
          <div class="t">下次强制回购时间</div>
          <div class="d">2023-10-29</div>
        </div>
        <div class="col-item">
          <div class="t">待回购D瓜(个)</div>
          <div class="d">1.390166</div>
        </div>
      </div>
      <div class="page-panel process-panel">
        <div>已回购<span>0.00%</span></div>
        <div>待回购<span>0.00%</span></div>
      </div>

      <div class="page-panel list-panel">
        <ul>
          <li>
            <div class="t">
              <p>奖励股份</p>
              <p>2022-11-01 00:03:42</p>
              <p class="up">等待回购</p>
            </div>
            <div class="c">
              <p>奖励数量:</p>
              <p>到账时间:</p>
              <p>强制回购:</p>
            </div>
            <div class="dd">
              <p>0.330157</p>
              <p>2022-11-01</p>
              <p>2022-11-01</p>
            </div>
          </li>
          <li>
            <div class="t">
              <p>奖励股份</p>
              <p>2022-11-01 00:03:42</p>
              <p class="up">等待回购</p>
            </div>
            <div class="c">
              <p>奖励数量:</p>
              <p>到账时间:</p>
              <p>强制回购:</p>
            </div>
            <div class="dd">
              <p>0.330157</p>
              <p>2022-11-01</p>
              <p>2022-11-01</p>
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
