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
      default: '375px'
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
				        	        trigger: 'item',
				        	        formatter: "{a} <br/>{b} : {c}%"
				        	    },
				        	    toolbox: {
                          y: 'bottom',
				        	        feature: {
				        	            dataView: {readOnly: false},
				        	            restore: {},
				        	            saveAsImage: {}
				        	        }
				        	    },
				        	    legend: {
                          y: 'bottom',
				        	        data: ['访问量','访客量','收藏量','询盘量','订单量']
				        	    },
				        	    series: [
				        	        {
				        	            name: '',
				        	            type: 'funnel',
				        	            left: '10%',
				        	            width: '80%',
				        	            label: {
				        	                normal: {
				        	                    formatter: ''
				        	                },
				        	                emphasis: {
				        	                    position:'inside',
				        	                    formatter: ''
				        	                }
				        	            },
				        	            labelLine: {
				        	                normal: {
				        	                    show: false
				        	                }
				        	            },
				        	            itemStyle: {
				        	                normal: {
				        	                    opacity: 0.7
				        	                }
				        	            },
				        	            data: [
				        	                {value: 60, name: '访问量'},
				        	                {value: 40, name: '访客量'},
				        	                {value: 20, name: '收藏量'},
				        	                {value: 80, name: '询盘量'},
				        	                {value: 100, name: '订单量'}
				        	            ]
				        	        },
				        	        {
				        	            name: '',
				        	            type: 'funnel',
				        	            left: '',
				        	            width: '',
				        	            maxSize: '',
				        	            label: {
				        	                normal: {
				        	                    position: 'inside',
				        	                    formatter: '{c}%',
				        	                    textStyle: {
				        	                        color: '#fff'
				        	                    }
				        	                },
				        	                emphasis: {
				        	                    position:'inside',
				        	                    formatter: '{b}实际: {c}%'
				        	                }
				        	            },
				        	            itemStyle: {
				        	                normal: {
				        	                    opacity: 0.5,
				        	                    borderColor: '#fff',
				        	                    borderWidth: 2
				        	                }
				        	            },
				        	            data: [
				        	                {value: 30, name: '访问量'},
				        	                {value: 10, name: '访客量'},
				        	                {value: 5, name: '收藏量'},
				        	                {value: 50, name: '询盘量'},
				        	                {value: 80, name: '订单量'}
				        	            ]
				        	        }
				        	    ]

				        })
    }
  }
}
</script>
