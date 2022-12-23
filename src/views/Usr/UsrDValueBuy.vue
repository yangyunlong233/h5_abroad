<template>
  <div id="UsrDValueBuy" class="page">

    <Header back="true">
      <template v-slot:title>D瓜回购</template>
      <template v-slot:tool>
        <a class="header-tool" href="/">借款记录</a>
      </template>
    </Header>

    <div class="page-cont">
      <div class="page-panel usr-fn-panel">
        <div class="flex-column usr-bag">
          <div class="col-item"><span class="t">D瓜账户</span></div>
          <div class="col-item">
            <span class="dd">可用1.3924387个</span>
          </div>
          <div class="col-item"><img src="../../assets/images/icon_usr_money.svg"></div>
          <div class="col-item"><img src="../../assets/images/icon_arrow_rt_b.svg"></div>
        </div>
        <div class="flex-column usr-fn">
          <div class="col-item"><input class="d" type="number" min="2" placeholder="请输入回购数量"></div>
          <div class="col-item"><span class="unit">个</span></div>
        </div>
      </div>
      <div class="page-panel info">
        <p>当前价格：0.000001元</p>
        <p>回购消耗率：50%</p>
        <p>实际到账：0.00 元（入账至余额）</p>
      </div>
      <div class="page-panel agree-panel">
        <div class="button-large">确认提交</div>
      </div>
      <div class="page-panel info">
        <p>D瓜回购注意事项：</p>
        <p>1.最低回购100元，回购消耗率50%；</p>
        <p>2.回购成功后实时到达余额账户；</p>
        <p>3.回购时间为6:00至24:00。</p>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
  name: 'UsrDValueBuy',
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

</style>
