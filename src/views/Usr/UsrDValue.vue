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
            <div class="d">{{ amount }}</div>
          </div>
          <div class="col-item">
            <div class="t">D瓜余额(个)</div>
            <div class="d">{{ balance }}</div>
          </div>
        </div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">今日获得D瓜(个)</div>
            <div class="d">{{ userToday }}</div>
          </div>
          <div class="col-item">
            <div class="t">累计获得D瓜(个)</div>
            <div class="d">{{ userTotal }}</div>
          </div>
        </div>
      </div>
      <div class="page-panel fns">
        <button class="btn-fill" @click="linkTo('/d_buy')">D瓜回购</button>
        <button class="btn-border" @click="linkTo('/d_logs')">D瓜账单</button>
        <button class="btn-border" @click="linkTo('/d_bro')">质押借贷</button>
        <button class="btn-fill" @click="linkTo('/d_force_buy')">强制回购</button>
      </div>

      <div class="page-panel market-data-panel">
        <div class="title">
          <i><img src="../../assets/images/icon_title_chart.svg"></i>
          <span>市场行情</span>
        </div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">当前价格</div>
            <div class="d">{{ price }}</div>
          </div>
          <div class="col-item">
            <div class="t">当前发行总量</div>
            <div class="d">{{ total }}</div>
          </div>
        </div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">累计利润余额</div>
            <div class="d">{{ profit }}</div>
          </div>
          <div class="col-item">
            <div class="t">累计流通股余额</div>
            <div class="d">{{ tokenTotal }}</div>
          </div>
        </div>
      </div>

      <div class="page-panel chart-fn">
        <div class="fn-dd">
          <span class="d" @click="showMonthHandle">{{ nowDate }}</span>
          <i><img src="../../assets/images/icon_arrow_dn_b.svg"></i>
        </div>
        <div class="price">今日价格<span class="dd">¥{{ price }}</span></div>
      </div>

      <div class="page-panel">
        <MarketChart :xAxis="xAxis" :series="series"></MarketChart>
      </div>

      <div class="flex-column bottom-panel">
        <div class="col-item">
          <div class="t">已回购D瓜(个)</div>
          <div class="d">0.00</div>
        </div>
        <div class="col-item">
          <div class="t">下次强制回购时间</div>
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

    <RulesDialog :ruleDialogShow="ruleDialogShow" :rule="rule" @changeDialog="changeDialog">
      <template v-slot:title>D瓜规则</template>
    </RulesDialog>

    <div class="date-select" v-show="showMonth">
      <div class="tool">
        <div class="d">{{ thisDate.year }}年</div>
        <div class="cancel" @click="cancelChange">取消</div>
        <div class="confirm" @click="confirmChange">确定</div>
      </div>
      <div class="container">
        <ul>
          <li v-for="item in thisDate.month" :key="item" @click="chooseMonth(item)" :class="{current: item == changeMonth}">{{ item }}月</li>
        </ul>
      </div>
    </div>

    <div class="unLogin" v-if="unLogin">
      <p>登录过期或未登录，请先去登录<br></p>
      <p>正在跳转到登录</p>
    </div>

  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { timestampToTime } from '../../unitl/libs'
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

    const currentInstance = getCurrentInstance()
    const { $axios, $router } = currentInstance.appContext.config.globalProperties

    // 获取存储的token
    const accessToken = ref(localStorage.getItem('access_token'))
    const unLogin = ref(false)

    const amount = ref('') // 余额总价
    const balance = ref('') // 余额
    const price = ref('') // 价格
    const profit = ref('') // 累计利润
    const tokenTotal = ref('') // 累计流通股
    const total = ref('') // 总发行
    const userToday = ref('') // 今日获得
    const userTotal = ref('') // 累计获取
    const rule = ref('') // D瓜规则

    // 创建时间
    const nowDate = ref(timestampToTime(2))
    const xAxis = ref([])
    const series = ref([])

    // 接口获取  D瓜详情
    function getContent () {
      $axios.get('/api/token/info', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: accessToken.value
        }
      })
        .then(response => {
          if (response.data.status !== 200) {
            unLogin.value = true
            setTimeout(() => {
              $router.push('/login')
            }, 2000)
          } else {
            // console.log('response', response.data.data)
            amount.value = parseFloat(response.data.data.amount).toFixed(6)
            balance.value = parseFloat(response.data.data.balance).toFixed(6)
            price.value = response.data.data.price
            profit.value = response.data.data.profit
            tokenTotal.value = response.data.data.tokenTotal
            total.value = response.data.data.total
            userToday.value = parseFloat(response.data.data.userToday).toFixed(6)
            userTotal.value = parseFloat(response.data.data.userTotal).toFixed(6)
            rule.value = response.data.data.rule
            getPrices(nowDate.value.slice(0, 4), nowDate.value.slice(5, 7))
          }
        })
    }

    getContent()

    // 获取价格图表数据
    function getPrices (year, month) {
      $axios.get('/api/token/market', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: accessToken.value
        },
        params: {
          year: year,
          month: month
        }
      })
        .then(response => {
          if (response.data.status !== 200) {
            unLogin.value = true
            setTimeout(() => {
              $router.push('/login')
            }, 2000)
          } else {
            // console.log('response', response.data)
            xAxis.value = []
            series.value = []
            response.data.data.forEach(item => {
              xAxis.value.push(item.date)
              series.value.push(item.price)
            })
          }
        })
    }

    // 创建选择时间
    const thisDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    }
    const changeMonth = ref('')
    const showMonth = ref(false)

    // 显示选择时间面板
    const showMonthHandle = () => {
      showMonth.value = true
    }

    // 取消时间选择
    const cancelChange = () => {
      changeMonth.value = ''
      showMonth.value = false
    }

    // 选择时间
    const chooseMonth = (month) => {
      changeMonth.value = month
    }

    const confirmChange = () => {
      showMonth.value = false
      if (changeMonth.value === '') {
        return
      }
      if (changeMonth.value.length < 2) {
        nowDate.value = nowDate.value.slice(0, 4) + '-0' + changeMonth.value
        getPrices(nowDate.value.slice(0, 4), '0' + changeMonth.value)
      } else {
        nowDate.value = nowDate.value.slice(0, 4) + '-' + changeMonth.value
        getPrices(nowDate.value.slice(0, 4), changeMonth.value)
      }
    }

    // button菜单跳转
    function linkTo (path) {
      $router.push(path)
    }

    return {
      linkTo,
      changeDialog,
      ruleDialogShow,
      unLogin,
      amount,
      balance,
      price,
      profit,
      tokenTotal,
      total,
      userToday,
      userTotal,
      rule,
      nowDate,
      xAxis,
      series,
      thisDate,
      chooseMonth,
      changeMonth,
      showMonth,
      showMonthHandle,
      confirmChange,
      cancelChange
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
.date-select {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(#000, .7);
  z-index: 9999;
  .tool {
    position: absolute;
    bottom: 30vh;
    width: 100vw;
    background: #fff;
    height: 5rem;
    line-height: 5rem;
    text-align: right;
    .d, .cancel, .confirm {
      height: 5rem;
      line-height: 5rem;
      display: inline-block;
      margin: 0 2rem;
      font-size: 1.4rem;
    }
    .d {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
    }
    .cancel {
      color: #666;
    }
    .confirm {
      color: #fe2c2d;
    }
  }
  .container {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 30vh;
    background: #fff;
    overflow-y: auto;
    ul {
      padding: 0 10vw 1.5rem;
      li {
        text-align: center;
        padding: 1.5rem 0;
        font-size: 1.4rem;
        border-top: 1px solid rgba(#000, .1);
      }
      li.current {
        position: relative;
        color: #fe2c2d;
        font-weight: bold;
        font-size: 1.6rem;
        border-top: 1px solid rgba(#fe2c2d, .6);
      }
      li.current + li {
        border-top: 1px solid rgba(#fe2c2d, .6);
      }
    }
  }
}
</style>
