<template>
  <div id="UsrDefault" class="page">

    <div class="header"></div>
    <Header back="true"></Header>

    <div class="page-cont">

      <div class="page-panel flex-column top-panel">
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
        <img src="../../assets/images/bg_usr_my_panel.png">
        <h2>我的贡献值</h2>
        <div class="rule-button" @click="()=>{this.rulesDialog=!this.rulesDialog}">贡献值规则</div>
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
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>支出</p></div>
            <div class="d dn"><p>-5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>收入</p></div>
            <div class="d up"><p>+5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>支出</p></div>
            <div class="d dn"><p>-5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>支出</p></div>
            <div class="d dn"><p>-5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>收入</p></div>
            <div class="d up"><p>+5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>支出</p></div>
            <div class="d dn"><p>-5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>支出</p></div>
            <div class="d dn"><p>-5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>收入</p></div>
            <div class="d up"><p>+5.06</p></div>
          </li>
          <li>
            <div class="t">
              <p>每天产出消耗</p>
              <p class="dd">2022-11-01 00:03:42</p>
            </div>
            <div class="c"><p>支出</p></div>
            <div class="d dn"><p>-5.06</p></div>
          </li>
        </ul>
      </div>

    </div>

    <RulesDialog :rulesDialog="rulesDialog" @changeDialog="changeDialog"></RulesDialog>

  </div>
</template>

<script>
import { ref } from 'vue'
import Header from '../../components/Header.vue'
import RulesDialog from '../../components/RulesDialog.vue'
export default {
  name: 'UsrDefault',
  data () {
    return {
    }
  },
  components: {
    Header,
    RulesDialog
  },
  setup () {
    const rulesDialog = ref(false)
    const changeDialog = (val) => {
      rulesDialog.value = val.data
    }
    return { rulesDialog, changeDialog }
  }
}
</script>

<style lang="scss" scoped>
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
