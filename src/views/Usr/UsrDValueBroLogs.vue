<template>
  <div class="page">

    <Header back="true">
      <template v-slot:title>贷款记录</template>
    </Header>

    <div class="page-cont">
      <div class="nolist-default" v-if="noList">没有记录</div>
      <div class="page-panel list-panel" v-if="!noList">
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

    <div class="unLogin" v-if="unLogin">
      <p>登录过期或未登录，请先去登录<br></p>
      <p>正在跳转到登录</p>
    </div>

  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import Header from '../../components/Header.vue'
export default {
  components: {
    Header
  },
  setup () {
    const currentInstance = getCurrentInstance()
    const { $axios, $router } = currentInstance.appContext.config.globalProperties

    // 获取存储的token
    const accessToken = ref(localStorage.getItem('access_token'))
    const unLogin = ref(false)

    // 记录条目
    const billLists = ref([])
    // 无记录默认文本
    const noList = ref(false)

    // 接口获取  D瓜详情
    function getContent () {
      $axios.get('/api/token/loan/record', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: accessToken.value
        }
      })
        .then(response => {
          // console.log('response', response.data.data)
          if (response.data.status !== 200) {
            unLogin.value = true
            setTimeout(() => {
              $router.push('/login')
            }, 2000)
          } else {
            if (response.data.data.list.length === 0) {
              noList.value = true
            } else {
              billLists.value = response.data.data
            }
          }
        })
    }

    getContent()

    return {
      unLogin,
      billLists,
      noList
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

.nolist-default {
  padding: 3rem;
  width: auto;
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}
</style>
