<template>
  <div class="main">
    <!-- 搜索条 -->
    <el-form ref="form" label-width="120px">
      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item :label="$t('订单号')">
          <el-input v-model.number="filterParams['search.number']" :placeholder="$t('请输入订单号')"/>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-form-item :label="$t('订单时间')">
          <el-date-picker
            v-model="timeRange"
            :start-placeholder="$t('开始时间')"
            :end-placeholder="$t('结束时间')"
            value-format="yyyy-MM-DD"
            format="yyyy-MM-DD"

            style="width: 100%;"
            type="daterange"
            range-separator="-"/>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item>
          <el-button type="primary" @click="initTableData(1)">{{ $t('查询') }}</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- 搜索条 - end -->

    <el-table
      :data="resData"
      border>
      <el-table-column
        prop="odrnum"
        label="采购商"
        min-width="200"/>
      <el-table-column
        prop="email"
        label="采购商"
        min-width="200"/>
      <el-table-column
        prop="time"
        label="日期"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ new Date(scope.row.time).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名字"
        min-width="150"/>
      <el-table-column
        prop="phone"
        label="电话"
        min-width="150"/>
      <el-table-column
        prop="count"
        label="出售(双)"
        min-width="150"/>
      <el-table-column
        label="操作"
        min-width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">导出</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      start: 0,
      limit: 20,
      timeRange: [], // 筛选参数： 时间range
      filterParams: { // 筛选用的参数
        'search.number': '', // 订单编号
        'search.beginTime': '', // 下单时间
        'search.endTime': ''// 下单时间
      }, resData: [],
      formLabelWidth: '120px'
    }
  },
  watch: {
    timeRange() {
      this.$set(this.filterParams, 'search.beginTime', this.timeRange[0])
      this.$set(this.filterParams, 'search.endTime', this.timeRange[1])
    }
  }, mounted() {
    this.initTableData(0)
  }, methods: {
    initTableData(type) {
      let data = {
        start: this.start,
        limit: this.limit
      }
      // 当点击search时
      if (type == 1) {
        data = { ...data, ...this.filterParams }
      }
      request({
        url: '/seller/eo_EasyOdr_newOrderlist',
        method: 'post',
        data: data
      }).then((res) => {
        if (res.data.ret != 1) return
        this.resData = res.data.result.items
      })
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 25px;
  }

  // 下拉选的width
  .el-select {
    width: 100%;
  }

  /deep/ .el-table__row.expanded + tr td:first-child {
    padding: 0;
  }

  .goods-info-wrap {
    position: relative;
    padding-left: 60px;
  }

  // 商品图片大小
  .goods-info-wrap img {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }

  // 内嵌的table
  /deep/ {
    .table-inner {
      position: relative;
      margin-bottom: 20px;
      overflow: visible;

      &:after {
        content: "";
        position: absolute;
        bottom: -20px;
        left: 0;
        height: 20px;
        width: 120%;
        background: #fff;
      }
      // 内嵌的table 取消header最后一个border(DOM上有个hidden的th)
      th:nth-last-child(2) {
        border-right-width: 0;
      }
      // 内嵌的table 取消body最后一个border
      tr:first-child td:last-child {
        border-right-width: 0;
      }
    }

    // 最后一个inner-table不marginbottom
    tr:last-child .table-inner {
      margin-bottom: 0;
      &:after {
        display: none;
      }
    }
    // 不知道为什么高度会比36大0.几，导致后面的都往下移了
    .el-form-item--medium .el-form-item__content {
      height: 36px;
    }
    .el-form-item__label {
      white-space: nowrap;
      overflow: hidden;
    }
  }

</style>
