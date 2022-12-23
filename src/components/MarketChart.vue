<template>
  <div id="myEcharts" :style="{ width: '100%', height: '30rem' }">
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
export default {
  name: 'CpMarketChart',
  setup () {
    /// 声明定义一下echart
    const echart = echarts

    onMounted(() => {
      initChart()
    })

    // 基础配置一下Echarts
    function initChart () {
      const chart = echart.init(document.getElementById('myEcharts'))
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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

    return { initChart }
  }
}
</script>

<style lang="scss">
</style>
