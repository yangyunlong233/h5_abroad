<template>
  <div id="UsrDValue" class="page">

    <Header back="true">
      <template v-slot:title>D瓜</template>
    </Header>

    <div class="page-cont">

      <div class="page-panel theme-bg my-panel">
        <h2>我的D瓜</h2>
        <div class="rule-button" @click="changeDialog">D瓜规则</div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">余额总价值(元)</div>
            <div class="d">0.000000</div>
          </div>
          <div class="col-item">
            <div class="t">D瓜余额(个)</div>
            <div class="d">0.000000</div>
          </div>
        </div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">今日获得D瓜(个)</div>
            <div class="d">0.000000</div>
          </div>
          <div class="col-item">
            <div class="t">累计获得D瓜(个)</div>
            <div class="d">0.000000</div>
          </div>
        </div>
      </div>
      <div class="page-panel fns">
        <button class="btn-fill">D瓜回购</button>
        <button class="btn-border">D瓜账单</button>
        <button class="btn-border">质押借贷</button>
        <button class="btn-fill">强制回购</button>
      </div>

      <div class="page-panel market-data-panel">
        <div class="title">
          <i><img src="../../assets/images/icon_title_chart.svg"></i>
          <span>市场行情</span>
        </div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">当前价格</div>
            <div class="d">0.00</div>
          </div>
          <div class="col-item">
            <div class="t">当前发行总量</div>
            <div class="d">500万</div>
          </div>
        </div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">累计利润余额</div>
            <div class="d">0.00</div>
          </div>
          <div class="col-item">
            <div class="t">累计流通股余额</div>
            <div class="d">500万</div>
          </div>
        </div>
      </div>

      <div class="page-panel chart-fn">
        <div class="fn-dd"><span class="d">2022-10</span><i><img src="../../assets/images/icon_arrow_dn_b.svg"></i></div>
        <div class="price">今日价格<span class="dd">¥124.32</span></div>
      </div>

      <div class="page-panel">
        <MarketChart></MarketChart>
      </div>

      <div class="flex-column bottom-panel">
        <div class="col-item">
          <div class="t">已会后D瓜(个)</div>
          <div class="d">0.00</div>
        </div>
        <div class="col-item">
          <div class="t">下次强制回购时间点</div>
          <div class="d">-----</div>
        </div>
        <div class="col-item">
          <div class="t">待回购D瓜(个)</div>
          <div class="d">0.00</div>
        </div>
      </div>

      <div class="page-panel process-panel">
        <div>已回购<span>0.00%</span></div>
        <div>待回购<span>0.00%</span></div>
      </div>

    </div>

    <RulesDialog :ruleDialogShow="ruleDialogShow" @changeDialog="changeDialog">
      <template v-slot:title>贡献值规则</template>
    </RulesDialog>

  </div>
</template>

<script>
import { ref } from 'vue'
import Header from '../../components/Header.vue'
import MarketChart from '../../components/MarketChart.vue'
import RulesDialog from '../../components/RulesDialog.vue'
export default {
  name: 'UsrDValue',
  components: {
    Header,
    MarketChart,
    RulesDialog
  },
  setup () {
    const ruleDialogShow = ref(false)

    const changeDialog = () => {
      ruleDialogShow.value = !ruleDialogShow.value
    }

    return {
      changeDialog,
      ruleDialogShow
    }
  }
}
</script>

<style lang="scss" scoped>
.my-panel {
  z-index: 9;
  border-radius: .8rem;
  padding: 2rem 0 1rem;
  box-shadow: 0px 4px 6px rgba(74, 3, 3, 0.25);
  h2 {
    padding-left: 2.8rem;
    font-size: 1.5rem;
    font-weight: bold;
    color:#fff;
  }
  .rule-button {
    position: absolute;
    top: 1.8rem;
    right: 0;
    display: inline-block;
    padding: .3rem .6rem;
    font-size: 1.3rem;
    color: #725418;
    background: linear-gradient(180deg, #FFE4CB 0%, #FFDBAA 100%);
    border-radius: 10px 0px 0px 10px;
  }
  .flex-column {
    margin: 2rem;
    .col-item {
      border-right: 1px solid rgba(#fff, .3);
      .d, .t {
        text-align: left;
        color: #fff;
      }
      .t {
        font-size: 1.2rem;
        padding-bottom: .6rem;
      }
      .d {
        font-size: 1.5rem;
      }
    }
    .col-item:last-of-type {
      border: 0;
    }
  }
}
.fns {
  z-index: 8;
  margin-top: -3rem;
  padding: 3.5rem 0 2.5rem;
  background: #FF2D2E;
  border-radius: 0 0 .6rem .6rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .btn-fill {
    padding: .6rem 1rem;
    background: linear-gradient(180deg, #FFF1DB 0%, #FFE4B6 100%);
    box-shadow: 0px 2px 4px rgba(255, 231, 190, 0.3);
    border-radius: 3rem;
    border: 1px solid #FFE4B6;
    color: #725418;
    font-size: 1.4rem;
  }
  .btn-border {
    padding: .6rem 1rem;
    background: rgba(#000, .15);
    box-shadow: 0px 2px 4px rgba(255, 231, 190, 0.3);
    border-radius: 3rem;
    border: 1px solid #FFE4B6;
    color: #FFE4B6;
    font-size: 1.4rem;
  }
  button:first-of-type {
    margin-left: 1rem;
  }
  button:last-of-type {
    margin-right: 1rem;
  }
}
.market-data-panel {
  .title {
    text-align: center;
    i,span {
      display: inline-block;
      vertical-align: bottom;
    }
    i {
      padding-right: .5rem;
    }
    span {
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
  .flex-column {
    margin: 2rem 0;
    .t {
      font-size: 1.4rem;
      color: #666;
    }
    .d {
      font-size: 1.8rem;
    }
  }
}
.chart-fn {
  .fn-dd, .price {
    padding: 0 2.5rem 0 0;
    display: inline-block;
    font-size: 1.4rem;
    span, i {
      display: inline-block;
    }
  }
  .fn-dd {
    vertical-align: middle;
    span {
      font-size: inherit;
    }
    i {
      position: relative;
      top: -.2rem;
      padding: 0 0 0 .5rem;
    }
  }
  .price {
    span {
      font-size: inherit;
      color: #fe2c2d;
    }
  }
}
.bottom-panel {
  .col-item {
    .d {
      color: #000;
      font-size: 1.7rem;
    }
    .t {
      color: #666;
      padding-bottom: .3rem;
      font-size: 1.3rem;
    }
  }
}
</style>
