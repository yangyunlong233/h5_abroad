<template>
  <div id="UsrDValueForceBuy" class="page">

    <Header back="true">
      <template v-slot:title>D瓜账单记录</template>
    </Header>

    <div class="page-cont">
      <!-- <div class="page-panel panel-title"><i></i><span>我的贡献值</span></div> -->
      <div class="page-panel tab-panel">
        <ul class="flex-column">
          <li v-for="item, index in listType" :key="index"
            :class="{current: typeFlag == index}" @click="changeFlag(index, item.type)">{{ item.name }}</li>
        </ul>
      </div>

      <div class="nolist-default" v-if="noList">没有记录</div>
      <div class="page-panel list-panel"  v-if="noList">
        <ul>
          <li v-for="item, index in listContent" :key="index">
            <div class="t">
              <p>{{ item.text }}</p>
              <p>{{ item.createTime }}</p>
              <p class="up">交易成功 (1101)</p>
            </div>
            <div class="c">
              <p>{{ item.operate == 1 ? '收入:' : '支出:' }}</p>
              <p>手续费:</p>
              <p>余额:</p>
            </div>
            <div class="dd">
              <p class="up" :class="{dn: item.operate == 2, up: item.operate == 1}">{{ (item.operate == 1 ? '+' : '-') + item.size.toFixed(2) }}个</p>
              <p>0.01个</p>
              <p>1.34个</p>
            </div>
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
  name: 'UsrDValueForceBuy',
  components: {
    Header
  },
  setup () {
    const currentInstance = getCurrentInstance()
    const { $axios, $router } = currentInstance.appContext.config.globalProperties

    // 获取存储的token
    const accessToken = ref(localStorage.getItem('access_token'))
    const unLogin = ref(false)

    const listType = ref([]) // 账单类型
    const typeFlag = ref(0) // 当前current索引
    const currentType = ref('') // 获取的当前索引
    const listContent = ref([]) // 列表内容
    const noList = ref(false)

    // 接口获取账单类型
    function getListType () {
      $axios.get('/api/token/type', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: accessToken.value
        }
      })
        .then(response => {
          // console.log('response', response.data)
          listType.value = response.data.data
          currentType.value = response.data.data[0].type
          getListContent(currentType.value)
        })
    }

    getListType()

    // 切换类型索引
    function changeFlag (index, type) {
      typeFlag.value = index
      currentType.value = type
      getListContent(currentType.value)
    }

    // 根据类型请求内容
    function getListContent (type) {
      $axios.get('/api/token/bill', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: accessToken.value
        },
        params: {
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
            if (response.data.data.list.length === 0) {
              noList.value = true
            }
            // console.log('response', response.data.data)
          }
        })
    }

    return {
      unLogin,
      noList,
      listType,
      typeFlag,
      changeFlag,
      listContent
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
