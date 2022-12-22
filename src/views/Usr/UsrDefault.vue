<template>
  <div id="UsrDefault" class="page">

    <div class="header"></div>
    <Header back="true"></Header>

    <div class="page-panel flex-column">
      <div class="col-item">
        <div class="d">96,500.00</div>
        <div class="t">平台今日结算</div>
      </div>
      <div class="col-item">
        <div class="d">96,500.00</div>
        <div class="t">平台累计结算</div>
      </div>
      <div class="col-item">
        <div class="d">96,500.00</div>
        <div class="t">平台累计消耗</div>
      </div>
    </div>

    <div class="page-panel my-panel">
      <h2>我的贡献值</h2>
      <div class="rule-button">贡献值规则</div>
      <div class="flex-column">
        <div class="col-item">
          <div class="t">今日结算(点)</div>
          <div class="d">0.00</div>
        </div>
        <div class="col-item">
          <div class="t">累计结算(点)</div>
          <div class="d">0.00</div>
        </div>
        <div class="col-item">
          <div class="t">累计消耗(点)</div>
          <div class="d">0.00</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
  name: 'UsrDefault',
  components: {
    Header
  }
}
</script>
