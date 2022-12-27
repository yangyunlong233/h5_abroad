<template>
  <div v-show="chartLoading" style="width: 100%; height: 30rem; position: absolute; top: 0; left: 0; z-index: 9999;">
    <img src="../assets/images/chart_loading.gif" style="width: 100%">
  </div>
  <div id="myEcharts" :style="{ width: '100%', height: '30rem' }">
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { ref, toRefs, watch } from 'vue'
export default {
  name: 'CpMarketChart',
  props: {
    xAxis: Array,
    series: Array
  },
  setup (props) {
    const chartLoading = ref(true)

    /// 声明定义一下echart
    const echart = echarts

    const { xAxis } = toRefs(props)
    const { series } = toRefs(props)

    setTimeout(() => {
      chartLoading.value = false
      initChart(xAxis.value, series.value)
    }, 1000)

    // 监听数据改变重新change图表
    watch(xAxis,
      () => {
        if (xAxis.value !== []) {
          initChart(xAxis.value, series.value)
        }
      }
    )

    let chart = null
    // 基础配置一下Echarts
    function initChart (x, s) {
      if (chart !== null && chart !== '' && chart !== undefined) {
        chart.dispose()
      }
      chart = echart.init(document.getElementById('myEcharts'))
      // 把配置和数据放这里
      chart.setOption({
        title: {
          show: true,
          text: 'D瓜价波动曲线图(元)',
          bottom: '0',
          left: '50%',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '13',
            color: 'rgba(0,0,0, .6)'
          },
          textAlign: 'center'
        },
        color: [{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(244,200,132, .7)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(244,200,132, .2)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }],
        grid: {
          top: '4%',
          right: '5%',
          bottom: '18%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: s,
            type: 'line',
            areaStyle: {}
          }
        ]
      })
      window.onresize = function () {
        // 自适应大小
        chart.resize()
      }
    }

    return { initChart, chartLoading }
  }
}
</script>

<style lang="scss">
</style>
