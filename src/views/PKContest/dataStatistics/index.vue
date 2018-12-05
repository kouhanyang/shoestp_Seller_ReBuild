<template>
  <div class="main">

    <el-card v-if="pkdata" class="box-card">
      <div slot="header" class="clearfix">
        <span>新联杯活动数据</span>
      </div>
      <div>
        <div class="dateRight">
          <el-date-picker
            v-model="times"
            :picker-options="options"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"/>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="12" :sm="12" :lg="6" :offset="3" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('exposure')">
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">曝光量</div>
                {{ pkdata.pkCompetitionData.pe }}

              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('clickVolume')">
              <div class="card-panel-icon-wrapper icon-message">
                <svg-icon icon-class="message" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">点击量</div>
                {{ pkdata.pkCompetitionData.trafficvolume }}

              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('inquiryVolume')">
              <div class="card-panel-icon-wrapper icon-money">
                <svg-icon icon-class="money" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">询盘量</div>
                {{ pkdata.pkCompetitionData.inquiry }}

              </div>

            </div>
          </el-col>
        </el-row>
        <div class="buttonMargin">
          <div class="time-select-wrap">
            <el-radio-group v-model="timeSelect" @change="timeSelectChange">
              <el-radio-button label="exposure">曝光量</el-radio-button>
              <el-radio-button label="clickVolume">点击量</el-radio-button>
              <el-radio-button label="inquiryVolume">询盘量</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div>
          <histogram
            :histogram="[pkdata.pkCompetitionGlobalDataView.top5,pkdata.pkCompetitionGlobalDataView.sum,pkdata.pkCompetitionData.pe]"
            style="margin: 0 auto;"/>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import histogram from './components/histogram'
import request from '@/utils/request'

export default {
  components: {
    'histogram': histogram
  },
  data() {
    return {
      times: '',
      options: '',
      timeSelect: 'exposure',
      pkdata: null
    }
  },
  mounted() {
    request({
      url: '/seller/activitys_Activity_getPkData',
      method: 'get'
    }).then(value => {
      value = value.data
      if (value.ret == 1) {
        this.pkdata = value.result
      }
    })
  },
  methods: {
    timeSelectChange(val) {
      console.log(val)
      // this.$emit('timeChange', val)
    },
    search() {
      console.log(this.times)
    },
    handleSetLineChartData(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .main {
    margin: 20px;
  }

  .buttonMargin {
    margin-left: 2%;
    margin-right: 2%;
  }

  .dateRight {
    margin-left: 52%;
  }

  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &
      :hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  // 右侧时间单选 - 竖向排列
  .time-select-wrap {
    position: fixed;
    right: 5%;
    top: 22%;
    transform: translateY(-50%);
    /deep/ {
      .el-radio-button {
        display: block;
        color: red;
      }
      .el-radio-button__inner {
        border-left: 1px solid #dcdfe6;
        border-top-width: 0;
      }
      .el-radio-button:first-child .el-radio-button__inner {
        border-top: 1px solid #dcdfe6;
        border-radius: 4px 4px 0 0;
      }
      .el-radio-button:last-child .el-radio-button__inner {
        border-radius: 0 0 4px 4px;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        webkit-box-shadow: 0px 0 0 0 #409EFF;
        box-shadow: 0px 0 0 0 #409EFF;
      }
    }
  }
</style>
