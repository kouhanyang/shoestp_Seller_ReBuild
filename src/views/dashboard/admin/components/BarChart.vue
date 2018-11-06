<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        legend: {
          data: ['销售额']
        },
        xAxis: [
          {
            type: 'category',
            data: ['商品1', '商品2', '商品3', '商品4', '商品5', '商品6', '商品7', '商品8', '商品9']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '销售量',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            show: false,
            name: '销售额',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '销售量',
            type: 'bar',
            stack: 'vistors',
            data: [12, 22, 31, 18, 56, 110, 45, 32, 12]
          },
          {
            name: '销售额',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 38.2, 20.3, 23.4, 18.0]
          }
        ]
      })
    }
  }
}
</script>
