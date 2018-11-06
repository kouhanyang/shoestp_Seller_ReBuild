<template>
  <div class="dashboard-editor-container">

    <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-header">地区销售量</div>
        <div class="chart-wrapper pb15">
          <pie-chart/>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-header">访问量</div>
        <div class="chart-wrapper funnel">
          <funnel-chart/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-header">访问量</div>
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

    <div class="chart-header">鞋子销售量</div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="{span: 24}" :sm="{span: 16}" :md="{span: 16}" :lg="{span: 16}" :xl="{span: 16}" style="margin-bottom:30px;">
        <div class="chart-header">留言板</div>
        <msg-board/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <div class="chart-header">联系我们</div>
        <contact-us/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import MsgBoard from './components/MsgBoard'
import ContactUs from './components/ContactUs'
import FunnelChart from './components/FunnelChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    MsgBoard,
    ContactUs,
    FunnelChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;

    &.funnel{
      padding-top: 0;
      padding-bottom: 30px;
    }
    &.pb15{
      padding-bottom: 15px;
    }
  }

  .chart-header{
    position: relative;
    height: 40px;
    line-height: 40px;
    color: #666;
    font-size: 18px;
  }
  .chart-header:after{
    content:"";
    display: inline-block;
    position: absolute;
    bottom: -2px;
    left: 0;
    z-index: 9;
    height: 2px;
    width: 150px;
    background: #3b6fed;
  }
}
</style>
