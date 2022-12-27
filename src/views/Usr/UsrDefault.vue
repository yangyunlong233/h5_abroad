<template>
  <div id="UsrDefault" class="page">

    <Header back="true">
      <template v-slot:title>贡献值</template>
      <template v-slot:tool>
        <router-link class="header-tool" to="/d">D瓜</router-link>
      </template>
    </Header>

    <div class="page-cont">

      <div class="page-panel flex-column top-panel">
        <div class="col-item">
          <div class="d">{{ todayPointTotal }}</div>
          <div class="t">平台今日结算</div>
        </div>
        <div class="col-item">
          <div class="d">{{ outPointTotal }}</div>
          <div class="t">平台累计结算</div>
        </div>
        <div class="col-item">
          <div class="d">{{ usePointTotal }}</div>
          <div class="t">平台累计消耗</div>
        </div>
      </div>

      <div class="page-panel my-panel">
        <img src="../../assets/images/bg_usr_my_panel.png">
        <h2>我的贡献值</h2>
        <div class="rule-button" @click="changeDialog">贡献值规则</div>
        <div class="flex-column">
          <div class="col-item">
            <div class="t">今日结算(点)</div>
            <div class="d">{{ userTodayPoint }}</div>
          </div>
          <div class="col-item">
            <div class="t">累计结算(点)</div>
            <div class="d">{{ userPointTotal }}</div>
          </div>
          <div class="col-item">
            <div class="t">累计消耗(点)</div>
            <div class="d">{{ userUsePoint }}</div>
          </div>
        </div>
      </div>

      <div class="page-panel panel-title"><i></i><span>我的贡献值</span></div>
      <div class="page-panel tab-panel">
        <ul class="flex-column">
          <li v-for="item, index in typeList" :key="index" :class="{current: typeListFlag == index}"
            @click="typeListFlagChange(index, item.type)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="page-panel list-panel">
        <ul>
          <li v-for="item, index in billLists.list" :key="index">
            <div class="t">
              <p>{{ item.text }}</p>
              <p class="dd">{{ item.createTime }}</p>
            </div>
            <div class="c"><p>{{ item.operate == 1 ? '收入' : '支出' }}</p></div>
            <div class="d" :class="{dn: item.operate == 2, up: item.operate == 1}"><p>{{ (item.operate == 1 ? '+' : '-') + item.size.toFixed(2) }}</p></div>
          </li>
        </ul>
      </div>

    </div>

    <RulesDialog :ruleDialogShow="ruleDialogShow" :rule="rule" @changeDialog="changeDialog">
      <template v-slot:title>贡献值规则</template>
    </RulesDialog>

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
import RulesDialog from '../../components/RulesDialog.vue'
export default {
  name: 'UsrDefault',
  components: {
    Header,
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

    const typeList = ref([]) // 类型
    // const usePointTotal = ref('')
    const outPointTotal = ref('') // 平台累计结算(点)
    const todayPointTotal = ref('') // 平台今日结算(点)
    const usePointTotal = ref('') // 平台累计消耗(点)
    const userPointTotal = ref('') // 用户累计结算(点)
    const userTodayPoint = ref('') // 用户今日结算(点)
    const userUsePoint = ref('') // 用户累计消耗(点)
    const rule = ref('') // 规则
    const typeListFlag = ref(0) // typeList当前激活项

    // 接口获取  贡献值详情
    function getContent () {
      $axios.get('/api/asset/point/info', {
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
            outPointTotal.value = response.data.data.outPointTotal.toFixed(2)
            todayPointTotal.value = response.data.data.todayPointTotal.toFixed(2)
            usePointTotal.value = response.data.data.usePointTotal.toFixed(2)
            typeList.value = response.data.data.typeList
            userPointTotal.value = response.data.data.userPointTotal.toFixed(2)
            userTodayPoint.value = response.data.data.userTodayPoint.toFixed(2)
            userUsePoint.value = response.data.data.userUsePoint.toFixed(2)
            rule.value = response.data.data.rule
            getPointBill(typeList.value[0].type)
          }
        })
    }

    getContent()

    // 创建时间
    const nowDate = timestampToTime(1)
    // 记录条目
    const billLists = ref([])

    // 获取账单详情
    function getPointBill (type) {
      $axios.get('/api/asset/point/bill', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: accessToken.value
        },
        params: {
          date: nowDate,
          type: type
        }
      })
        .then(response => {
          if (response.data.status !== 200) {
            unLogin.value = true
            setTimeout(() => {
              $router.push('/login')
            }, 2000)
          } else {
            billLists.value = response.data.data
          }
        })
    }

    // 改变typeList激活项
    const typeListFlagChange = (index, type) => {
      // 改变显示
      typeListFlag.value = index
      // 请求记录
      getPointBill(type)
    }

    return {
      changeDialog,
      ruleDialogShow,
      unLogin,
      outPointTotal,
      todayPointTotal,
      usePointTotal,
      typeList,
      userPointTotal,
      userTodayPoint,
      userUsePoint,
      rule,
      typeListFlagChange,
      typeListFlag,
      billLists
    }
  }
}
</script>

<style lang="scss" scoped>
.header-tool {
  font-size: 1.3rem;
  color: #fff;
}
.unLogin {
  position: fixed;
  width: 100vw;
  height: 70vh;
  background: #fff;
  z-index: 9999;
  padding-top: 30vh;
  p {
    font-size: 1.6rem;
    color: rgba(#000, .7);
    text-align: center;
  }
}
.top-panel {
  .d {
    font-size: 1.7rem;
    color: #000;
    padding-bottom: .5rem
  }
  .t {
    font-size: 1.1rem;
    color: #666;
  }
}
.my-panel {
  background: linear-gradient(93.5deg, #F8124B 18.71%, #FE2C2D 83.26%);
  border-radius: .8rem;
  padding: 2.5rem 0;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 25vw;
    height: auto;
  }
  h2 {
    width: auto;
    font-size: 1.6rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  .rule-button {
    position: absolute;
    top: 2.5rem;
    right: 0;
    display: inline-block;
    padding: .3rem .6rem;
    font-size: 1.3rem;
    color: #725418;
    background: linear-gradient(180deg, #FFE4CB 0%, #FFDBAA 100%);
    border-radius: 10px 0px 0px 10px;
  }
  .flex-column {
    padding-top: 2rem;
    .d {
      font-size: 1.7rem;
      color: #fff;
      padding-top: .5rem;
    }
    .t {
      font-size: 1.2rem;
      color: #fff;
    }
  }
}
</style>
