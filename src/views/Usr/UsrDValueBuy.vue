<template>
  <div id="UsrDValueBro" class="page">

    <Header back="true">
      <template v-slot:title>D瓜回购</template>
      <template v-slot:tool>
        <router-link class="header-tool" to="/d_buy_logs">回购记录</router-link>
      </template>
    </Header>

    <div class="page-cont">
      <div class="page-panel usr-fn-panel">
        <div class="flex-column usr-bag">
          <div class="col-item"><span class="t">D瓜账户</span></div>
          <div class="col-item">
            <span class="dd">可用{{ amount }}个</span>
          </div>
          <div class="col-item"><img src="../../assets/images/icon_usr_money.svg"></div>
          <div class="col-item"><img src="../../assets/images/icon_arrow_rt_b.svg"></div>
        </div>
        <div class="flex-column usr-fn">
          <div class="col-item"><input class="d" type="number" placeholder="请输入回购数量" v-model="inputBro"></div>
          <div class="col-item"><span class="unit">个</span></div>
        </div>
      </div>
      <div class="page-panel info">
        <p>当前价格：{{ price }}元</p>
        <p>回购消耗率：50%</p>
        <p>实际到账：0.00 元（入账至余额）</p>
      </div>
      <div class="page-panel agree-panel">
        <div class="button-large" @click="submitVerify">确认提交</div>
      </div>
      <div class="page-panel info">
        <p>D瓜回购注意事项：</p>
        <p>1.最低回购100元，回购消耗率50%；</p>
        <p>2.回购成功后实时到达余额账户；</p>
        <p>3.回购时间为6:00至24:00。</p>
      </div>
    </div>

    <transition name="fade" tag="div">
      <div class="dialog-msg" v-show="msgShow">{{ msg }}</div>
    </transition>

    <transition name="fade" tag="div">
      <div class="dialog-pwd" v-show="pwdShow">
        <div class="container">
          <h3>请输入安全密码</h3>
          <input type="password" v-model="inputPwd">
          <button class="confirm" @click="sendBro">确认</button>
          <div class="links">
            <span class="cancel" @click="cancelBro">取消交易</span>
            <span class="setpwd" @click="setTradePwd">修改/设置安全密码</span>
          </div>
        </div>
      </div>
    </transition>

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
  name: 'UsrDValueBro',
  components: {
    Header
  },
  setup () {
    const currentInstance = getCurrentInstance()
    const { $axios, $router } = currentInstance.appContext.config.globalProperties

    // 获取存储的token
    const accessToken = ref(localStorage.getItem('access_token'))
    const unLogin = ref(false)

    const msg = ref('') // dialog 消息
    const msgShow = ref(false) // dialog 消息
    const amount = ref('') // 余额总价
    const price = ref('') // 价格
    const inputBro = ref('') // 输入交易额
    const pwdShow = ref(false) // 密码面板显示
    const inputPwd = ref('')

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
            price.value = response.data.data.price
          }
        })
    }

    getContent()

    // msg 方法
    function msgDialog (m) {
      msg.value = m
      msgShow.value = true
      setTimeout(() => {
        msgShow.value = false
      }, 3500)
    }

    // 提交前校验
    function submitVerify () {
      if (inputBro.value === '') {
        msgDialog('请输入回购数量')
      } else if (parseFloat(inputBro.value) > parseFloat(amount.value)) {
        msgDialog('回购数量不能大于可用数量')
      } else {
        dialogPwd()
      }
    }

    // 输入密码
    function dialogPwd () {
      pwdShow.value = true
    }

    // 确认提交
    function sendBro () {
      if (inputPwd.value === '') {
        msgDialog('请输入密码')
      } else {
        $axios.post('/api/token/back',
          {
            size: inputBro.value,
            tradePassword: inputPwd.value
          }, {
            headers: {
              'Content-Type': 'application/json',
              authorization: accessToken.value
            }
          })
          .then(response => {
            // console.log(response)
            if (response.data.status === -1) {
              msgDialog(response.data.message)
              pwdShow.value = false
            } else if (response.data.status !== 200) {
              msgDialog(response.data.message)
            } else if (response.data.status === 200) {
              msgDialog(response.data.message)
              setTimeout(() => {
                $router.push('/d')
              }, 2000)
            }
          })
          .catch(() => {
            msgDialog('网络繁忙，稍后再试')
          })
      }
    }

    // 取消交易
    function cancelBro () {
      msgDialog('交易已取消')
      pwdShow.value = false
      inputBro.value = ''
    }

    // 取消交易
    function setTradePwd () {
      msgDialog('即将跳转修改/设置交易密码')
      $router.push('/set_trade_pwd')
    }

    return {
      unLogin,
      msgShow,
      msg,
      amount,
      price,
      inputBro,
      submitVerify,
      pwdShow,
      inputPwd,
      sendBro,
      cancelBro,
      setTradePwd
    }
  }
}
</script>
<style lang="scss" scoped>
.header-tool {
  font-size: 1.3rem;
  color: #fff;
}
.usr-fn-panel {
  .flex-column {
    margin-top: .8rem;
    border-bottom: 1px solid rgba(#000, .1);
    .col-item {
      width: auto;
      height: 6rem;
      line-height: 6rem;
      span,img {
        display: inline;
        vertical-align: middle;
      }
    }
    .col-item:first-of-type {
      width: 100%;
    }
  }
  .t {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
  }
  .dd {
    white-space: nowrap;
    font-size: 1.4rem;
    color: #666;
  }
  input {
    height: 4rem;
    width: 70vw!important;
    border: 0;
    outline: none;
    text-align: left!important;
    font-size: 2rem;
  }
  .unit {
    font-size: 1.8rem;
    font-weight: bold;
  }
}
.info {
  p {
    font-size: 1.4rem;
    color: #666;
    padding: 0 0 .6rem 0;
  }
}
.agree-panel {
  input,label {
    display: inline-block;
    vertical-align: middle;
  }
  label {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    padding: 0 0 0 2rem;
  }
  input {
    background: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: .2rem;
    left: .1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  img {
    position: absolute;
    top: .1rem;
    left: .1rem;
    width: 1.7rem;
    height: 1.7rem;
  }
  .button-large {
    margin: 2.5rem 0 5rem;
  }
}

.dialog-msg {
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(#f91943, 1);
  padding: 1.5rem 2.5rem;
  border-radius: 5rem;
  box-shadow: 0 .5rem 2rem rgba(#f91943, .2);
  font-size: 1.4rem;
  z-index: 9999;
  color: #fff;
  white-space: nowrap;
}

.dialog-pwd {
  position: fixed;
  z-index: 9998;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(#000, .7);
  .container {
    position: absolute;
    top: 25vh;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    background: #fff;
    border-radius: 3rem;
    h3 {
      font-size: 1.8rem;
      width: auto;
      padding: 2.5rem;
      font-weight: bold;
      text-align: center;
    }
    input {
      display: block;
      width: 60vw;
      margin: 0 auto;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      border: 1px solid rgba(#000, .2);
      font-size: 3rem;
      font-weight: bold;
      letter-spacing: .5rem;
      outline: none;
    }
    button.confirm {
      background: linear-gradient(93.5deg, #F8124B 18.71%, #FE2C2D 83.26%);
      border-radius: 23px;
      border: 0;
      width: 40vw;
      display: block;
      margin: 2.5rem auto 1.5rem;
      padding: 1rem 2rem;
      font-size: 1.6rem;
      color: #fff;
    }
    .links {
      background: none;
      border-radius: 23px;
      border: 0;
      width: auto;
      display: block;
      margin: 2.5rem auto 2.5rem;
      padding: 1rem 1rem;
      color: #666;
      text-align: center;
      span {
        display: inline-block;
        font-size: 1.4rem;
        margin: 0 2rem;
      }
      .setpwd {
        color: #F8124B;
      }
      .cancel {
        color: #666;
      }
    }
  }
}
</style>
