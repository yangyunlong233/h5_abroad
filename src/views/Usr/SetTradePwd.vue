<template>
  <div id="LoginDefault" class="page">

    <Header back="true">
      <template v-slot:title>修改交易密码</template>
    </Header>

    <div class="page-cont">

      <div class="page-panel">
        <div class="form-el">
          <div class="item tel d">+86</div>
          <div class="item"><input class="d" type="number" v-model="mobile" placeholder="手机号"></div>
        </div>
        <div class="form-el">
          <div class="item"><input class="d" type="password" placeholder="设置交易密码" v-model="setPwd"></div>
        </div>
        <div class="form-el">
          <div class="item"><input class="d" type="number" placeholder="验证码" v-model="smsCode"></div>
          <div class="item code" @click="beforeSms">{{ smsMsg }}<span v-show="timer != 0">{{ timer }}</span></div>
        </div>
      </div>
      <div class="page-panel agree-panel">
        <div class="button-large" @click="loginSubmit">提交</div>
      </div>

      <transition-group name="fade" tag="div">
        <div class="verify-panel" v-show="verifyPanelShow" key="box1">
          <div class="tool">
            <i class="refresh" @click="refreshVerify"><img src="../../assets/images/icon_verify_panel_refresh.svg"></i>
            <i class="close" @click="closeVerify"><img src="../../assets/images/icon_verify_panel_close.svg"></i>
          </div>
          <div class="verify-container">
            <div id="verifyImage" class="verify-image" :style="{ backgroundImage: urlBase64 }"></div>
            <div class="verify-words">依次点击：<span>{{ wordsShow }}</span></div>
          </div>
        </div>
      </transition-group>

    </div>

    <transition name="fade" tag="div">
      <div id="msg" class="msg" v-show="msg != ''">{{ msg }}</div>
    </transition>

  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
import CryptoJS from 'crypto-js'
import Header from '@/components/Header.vue'
export default {
  name: 'LoginDefault',
  components: {
    Header
  },
  setup () {
    const currentInstance = getCurrentInstance()
    const { $axios, $router } = currentInstance.appContext.config.globalProperties

    // 获取存储的token
    const accessToken = ref(localStorage.getItem('access_token'))
    const unLogin = ref(false)

    const msg = ref('')

    const verifyPanelShow = ref(false) // 验证面板显示 ***
    const verifySecretKey = ref('') // 接收验证key
    const verifyToken = ref('') // 接收验证token
    const verifyWords = ref([]) // 接收验证words
    const urlBase64 = ref('') // 人机验证base64图片
    const wordsShow = ref('') // 显示需要点击的词 ***
    const userClickPonits = ref([]) // 用户点击
    const x = ref(0) // 人机验证点击x
    const y = ref(0) // 人机验证点击y
    const point = ref('') // 提交验证point
    const captchaVerification = ref('') // 验证成功key封装
    const smsMsg = ref('获取验证码') // 发送验证码按钮
    const timer = ref(0) // 发送短信倒计时
    const mobile = ref('') // 手机号
    const smsCode = ref('') // 短信验证码
    const setPwd = ref('') // 设置密码

    // 获取短信验证码 ***
    const beforeSms = () => {
      if (!mobile.value || !isPhone(mobile.value)) {
        msg.value = '请输入正确的手机号码'
        return
      }
      if (timer.value === 0) {
        msg.value = ''
        requestVerify()
      }
    }

    // 手机号正则
    function isPhone (phone) {
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)
    }

    // 请求验证码
    function requestVerify () {
      $axios.get('/api/captcha', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          id: 2
        }
      })
        .then(response => {
          // console.log('获取验证码响应', response.data.status)
          if (response.data.status !== 200) {
            unLogin.value = true
            setTimeout(() => {
              $router.push('/login')
            }, 2000)
            return
          }
          // 显示验证码图片
          urlBase64.value = `url(data:image/png;base64,${response.data.data.originalImage})`
          // 显示要点的词
          wordsShow.value = response.data.data.words.join('、')
          // 显示验证码面板
          verifyPanelShow.value = true
          // 获取key,token,words
          verifySecretKey.value = response.data.data.key
          verifyToken.value = response.data.data.token
          verifyWords.value = response.data.data.words
        })
    }

    // 获取完用户点击验证结果
    function verifyResult () {
      point.value = verifySecretKey.value
        ? aesEncrypt(JSON.stringify(userClickPonits.value), verifySecretKey.value)
        : JSON.stringify(userClickPonits.value)
      // console.log('point', point.value)
      // console.log('key', verifySecretKey.value)
      $axios.post('/api/captcha/check',
        {
          id: 2,
          point: point.value,
          token: verifyToken.value
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.data.status !== 200) {
            msg.value = '验证错误，刷新重试'
          } else {
            captchaVerification.value = verifySecretKey.value
              ? aesEncrypt(verifyToken.value + '---' + JSON.stringify(userClickPonits.value), verifySecretKey.value)
              : verifyToken.value + '---' + JSON.stringify(userClickPonits.value)
            console.log(captchaVerification.value)
            captchaVerifySuc(captchaVerification.value)
          }
        })
        .catch(() => {
          msg.value = '网络繁忙，稍后再试'
        })
    }

    // 验证通过
    function captchaVerifySuc (captchaVerification) {
      verifyPanelShow.value = false
      timer.value = 60
      smsMsg.value = '重新获取验证码'
      setInterval(() => {
        if (timer.value > 0) {
          timer.value--
        } else {
          timer.value = 0
          smsMsg.value = '获取验证码'
        }
      }, 1000)
      sendSms(captchaVerification)
    }

    // 发送短信
    function sendSms (captchaVerification) {
      $axios.post('/api/send/sms',
        {
          behavior: 3,
          key: captchaVerification,
          mobile: mobile.value,
          type: 2
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          msg.value = '验证码已发送'
          setTimeout(() => {
            msg.value = ''
          }, 3000)
        })
        .catch(() => {
          msg.value = '网络繁忙，稍后再试'
        })
    }

    // 刷新验证码 ***
    const refreshVerify = () => {
      userClickPonits.value = []
      document.querySelector('#verifyImage').innerHTML = ''
      msg.value = ''
      requestVerify()
    }

    // 关闭验证面板 ***
    const closeVerify = () => {
      userClickPonits.value = []
      document.querySelector('#verifyImage').innerHTML = ''
      verifyPanelShow.value = false
      msg.value = ''
    }

    // key加密
    function aesEncrypt (word, keyWord = 'XwKsGlMcdPMEhR1B') {
      const key = CryptoJS.enc.Utf8.parse(keyWord)
      const srcs = CryptoJS.enc.Utf8.parse(word)
      const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
      return encrypted.toString()
    }

    // 修改密码
    const loginSubmit = () => {
      if (setPwd.value === '' || smsCode.value === '') {
        // 空值校验
        msg.value = '请填写密码或验证码'
      } else {
        $axios.post('/api/user/password/trade',
          {
            smsCode: smsCode.value,
            tradePassword: setPwd.value
          }, {
            headers: {
              'Content-Type': 'application/json',
              authorization: accessToken.value
            }
          })
          .then(response => {
            // console.log('获取修改密码结果', response.data)
            if (response.data.status === 200) {
              msg.value = '修改成功，3秒后自动跳转'
              $router.push('/d')
            }
          })
          .catch(() => {
            msg.value = '验证码过期，请重试'
          })
      }
    }

    // 挂载人机验证图片点击事件
    onMounted(() => {
      document.querySelector('#verifyImage').addEventListener('click', (e) => {
        if (userClickPonits.value.length >= verifyWords.value.length) {
          return
        }
        // 获取用户点击的x，y
        x.value = e.offsetX
        y.value = e.offsetY
        // 存放用户点击
        userClickPonits.value.push({ x: x.value, y: y.value })
        // 显示用户点击点
        const nSpan = document.createElement('span')
        nSpan.innerHTML = userClickPonits.value.length.toString()
        nSpan.className = 'user-click-point'
        nSpan.style.left = x.value + 'px'
        nSpan.style.top = y.value + 'px'
        document.querySelector('#verifyImage').appendChild(nSpan)
        // console.log(userClickPonits.value)
        if (userClickPonits.value.length === verifyWords.value.length) {
          verifyResult()
        }
      })
    })

    return {
      urlBase64,
      wordsShow,
      beforeSms,
      verifyPanelShow,
      refreshVerify,
      closeVerify,
      msg,
      timer,
      smsMsg,
      mobile,
      smsCode,
      loginSubmit,
      setPwd,
      unLogin
    }
  }
}
</script>

<style lang="scss">
.logo {
  margin: 10vh auto 0;
  width: 35vw;
  img {
    width: 100%;
    height: auto;
  }
}
.agree-panel {
  width: 70vw;
  margin: 12vh 15vw 0;
  input,label {
    display: inline-block;
    vertical-align: middle;
  }
  label {
    font-size: 1.2rem;
    color: #000;
    padding: 0 0 0 2rem;
    span {
      color: #E63C39;
    }
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

.verify-panel {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(#000, .6);

  .tool {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    padding: 1rem 1.5rem;
    background: #fff;
    border: 1px solid rgba(#000, .1);
    border-bottom: 0;
    border-radius: 1rem 1rem 0 0;
    height: 2rem;
    line-height: 2rem;
    text-align: right;
    i {
      display: inline-block;
      margin-left: 1.5rem;
    }
    img {
      height: 100%;
    }
  }

  .verify-container {
    position: absolute;
    top: calc(25% + 4rem);
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    padding: 1.5rem;
    background: #fff;
    border: 1px solid rgba(#000, .1);
    border-radius: 0 0 1rem 1rem;

    .verify-image {
      width: 300px;
      height: 150px;
      border-radius: 1rem;
      .user-click-point {
        position: absolute;
        background: rgba(#E63C39, .7);
        color: #fff;
        font-size: 1.2rem;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border-radius: 100%;
      }
    }

    .verify-words {
      padding-top: 1rem;
      width: auto;
      text-align: center;
      font-size: 1.6rem;
      color: #000;

      span {
        font-size: inherit;
        font-weight: bold;
        color: #E63C39;
      }
    }
  }
}
.msg {
  position: fixed;
  bottom: 10rem;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 1.5rem;
  font-size: 1.4rem;
  color: #000;
  border-radius: 5rem;
}
</style>
