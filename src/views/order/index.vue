<template>
  <div class="main">
    <!-- 搜索条 -->
    <el-form ref="form" label-width="120px">
      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item :label="$t('采购商')">
          <el-input v-model="filterParams['search.email']" :placeholder="$t('请输入采购商')"/>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item :label="$t('订单号')">
          <el-input v-model.number="filterParams['search.number']" :placeholder="$t('请输入订单号')"/>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-form-item :label="$t('订单时间')">
          <!-- <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始日期" style="width: 100%;"
              v-model="filterParams['search.beginTime']"
            ></el-date-picker>
          </el-col>
          <el-col class="line tc" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束日期" style="width: 100%;"
              v-model="filterParams['search.endTime']"
            ></el-date-picker>
          </el-col> -->

          <el-date-picker
            v-model="timeRange"
            :start-placeholder="$t('开始时间')"
            :end-placeholder="$t('结束时间')"
            style="width: 100%;"
            type="daterange"
            range-separator="-"/>
        </el-form-item>
      </el-col>

      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item :label="$t('支付方式')">
          <el-select v-model="filterParams['search.payType']" :placeholder="$t('请选择')+' '+$t('支付方式')">
            <el-option v-for="payWay in payWaysList" :label="payWay.name" :value="payWay.id"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item :label="$t('状态')">
          <el-select v-model="filterParams['search.status']" :placeholder="$t('请选择')+' '+$t('状态')">
            <el-option
              v-for="orderStatus in orderStatusList"
              :label="orderStatus.name"
              :value="orderStatus.pkey"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item :label="$t('类型')">
          <el-select v-model="filterParams['search.types']" :placeholder="$t('请选择')+' '+$t('类型')">
            <el-option
              v-for="orderStatus in ordertype"
              :label="orderStatus.name"
              :value="orderStatus.pkey"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="6">
        <el-form-item>
          <el-button type="primary" @click="initTableData(1)">{{ $t('查询') }}</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- 搜索条 - end -->

    <!-- table数据展示 show-header -->
    <el-table
      :data="tableData"
      :show-header="false"
      border
      style="width: 100%"
      default-expand-all>

      <el-table-column prop="date" label="日期">
        <template slot-scope="scope">
          <div>
            {{ $t('订单号') }}：<img src="./images/single.png" alt="">{{ scope.row.number }}
            <span class="ml30">{{ $t('订单时间') }}：</span>{{ new Date(scope.row.date).toLocaleString() }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="itemsCount" label="数量"  width="180"></el-table-column>
      <el-table-column prop="total" label="总价"  width="180"></el-table-column>
      <el-table-column prop="number" label="货号"></el-table-column>
      <el-table-column prop="status" label="状态"  width="50"></el-table-column> -->

      <el-table-column type="expand">
        <template slot-scope="scopeParent">
          <el-table
            :span-method="tableSpanMethod"
            :data="scopeParent.row.lines"
            class="table-inner"
            style="width: 100%">
            <el-table-column
              :label="$t('产品名称')"
              min-width="320px">
              <template slot-scope="scope">
                <div class="goods-info-wrap">
                  <img :src="getImageUrl(scope.row.spec.images)" class="img-contain" alt="">
                  {{ scope.row.spec.productName }}
                  <br>
                  {{ $t('product.specifications') }}:{{ scope.row.spec.keyName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('价格')"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.spec.price }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('数量')"
              prop="qty"
              width="100"/>

            <el-table-column
              :label="$t('总价')"
              prop="subtotal"
              width="120"/>

            <el-table-column
              :label="$t('状态')"
              width="120">
              <template slot-scope="scope">
                {{ convertStatus( scopeParent.row.status ) }}
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('操作')"
              width="220">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="reviewOrder(scopeParent.$index, scopeParent.row)">
                  {{ $t('查看订单') }}
                </el-button>
                <el-button
                  v-if=" scopeParent.row.status == 2 ||scopeParent.row.status == 3 ||scopeParent.row.status == 5"
                  size="mini"
                  @click="cancelOrder(scopeParent.$index, scopeParent.row)">
                  {{ $t('取消订单') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <!-- table数据展示 - end -->

    <!-- 分页 -->
    <div v-if="resData.totalPage && resData.totalPage>1" class="tc mt20">
      <el-pagination
        :page-size="limit"
        :total="resData.totalCount"
        background
        layout="prev, pager, next"
        @current-change="changePage"/>
    </div>

    <!-- 点击取消订单 时的对话框 cancelOrderVisible-->
    <el-dialog :title="$t('取消订单')" :visible.sync="cancelOrderVisible">
      <el-form>

        <el-form-item :label="$t('订单号')" :label-width="formLabelWidth">
          {{ selectedOrderNum }}
        </el-form-item>
        <el-form-item :label="$t('取消原因')" :label-width="formLabelWidth">
          <el-select v-model="cancelReason" :placeholder="$t('pleaseSelect')+' '+$t('order.cancelReason')">
            <el-option :label="$t('缺货')" :value="0"/>
            <el-option :label="$t('不是有效订单')" :value="1"/>
            <el-option :label="$t('买家要求')" :value="2"/>
            <el-option :label="$t('其他原因')" :value="3"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="confirnCancelOrder">{{ $t('确认') }}</el-button>
      </div>
    </el-dialog>
    <!-- 点击取消订单  时的对话框  - end -->
  </div>
</template>
<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  data() {
    return {
      start: 0,
      limit: 20,
      timeRange: [], // 筛选参数： 时间range
      filterParams: { // 筛选用的参数
        'search.email': '', // 采购商
        'search.number': '', // 订单编号
        'search.beginTime': '', // 下单时间
        'search.endTime': '', // 下单时间
        'search.payType': '', // 支付方式
        'search.status': '', // 订单状态
        'search.types': '' // 订单类型
      },
      resData: {}, // table数据展示
      payWaysList: [], // 支付方式列表
      orderStatusList: [], // 订单状态列表
      ordertype: [],
      formLabelWidth: '120px', // form下 label宽度
      cancelOrderVisible: false, // 取消订单 弹框是否显示
      selectedOrderNum: 0, // 当前选中的orderId
      cancelReason: 0 // 取消订单的原因
    }
  },
  computed: {
    // 获取列表数据
    tableData() {
      return this.resData.items ? this.resData.items : []
    }
  },
  watch: {
    timeRange() {
      this.$set(this.filterParams, 'search.beginTime', this.timeRange[0])
      this.$set(this.filterParams, 'search.endTime', this.timeRange[1])
    }
  },
  mounted() {
    // 初始化 table 数据
    this.initTableData()
    // 初始化 支付方式列表
    this.getPayWaysList()
    // 获取 订单状态列表
    this.getStatusList()
    this.getTypeList()
  },
  methods: {
    getImageUrl(url) {
      if (url && url.length > 0) {
        return store.getters.ImageBaseUrl + url
      }
      return url
    },
    // 初始化 table 数据。 type==1时，为搜索事件，需添加搜索条件
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
        url: '/seller/odr_OdrOrder_list',
        method: 'post',
        data: data
      }).then((res) => {
        if (res.data.ret != 1) return
        this.resData = res.data.result
      })
    },
    // 获取 支付方式列表
    getPayWaysList() {
      request({
        url: '/seller/odr_OdrOrder_loadpay',
        method: 'post'
      }).then((res) => {
        if (res.data.ret != 1) return
        this.payWaysList = res.data.result
      })
    },
    // 获取 订单状态列表
    getStatusList() {
      request({
        url: '/seller/odr_OdrOrder_loadstate',
        method: 'post'
      }).then((res) => {
        if (!res.data.STORE_ROOT || res.data.STORE_ROOT.length == 0) return
        this.orderStatusList = res.data.STORE_ROOT
      })
    },
    // 获取 订单类型列表
    getTypeList() {
      request({
        url: '/seller/odr_OdrOrder_loadtype',
        method: 'post'
      }).then((res) => {
        console.log('type', res)
        if (!res.data.STORE_ROOT || res.data.STORE_ROOT.length == 0) return
        this.ordertype = res.data.STORE_ROOT
        console.log(res.data.STORE_ROOT)
      })
    },
    // table单元格合并 - 竖向合并最后两列
    tableSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && (columnIndex == 4 || columnIndex == 5)) {
        return [100, 1]
      } else if (columnIndex == 4 || columnIndex == 5) {
        return [0, 0]
      }
    },
    // 点击查看详细order信息
    reviewOrder(index, row) {
      this.$router.push('/order/detail?orderNum=' + row.number)
    },
    // 点击取消订单 显示弹出框
    cancelOrder(index, row) {
      this.cancelOrderVisible = true
      this.selectedOrderNum = row.number
    },
    // 点击取消订单 显示弹出框
    confirnCancelOrder(index, row) {
      this.cancelOrderVisible = false
      request({
        url: '/seller/odr_OdrOrder_cancel',
        method: 'post',
        data: {
          'bean.orderNum': this.selectedOrderNum,
          'bean.odrCancel': this.cancelReason
        }
      }).then((res) => {
        if (res.data.ret != 1) return
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        // 初始化 table 数据
        this.initTableData()
      })
    },
    // 状态码 转 文字
    convertStatus(num) {
      switch (num) {
        case 0:
          return this.$t('待付款')
        case 1:
          return this.$t('订单确认付款')
        case 2:
          return this.$t('付款错误')
        case 3:
          return this.$t('等待发货')
        case 4:
          return this.$t('已发货')
        case 5:
          return this.$t('完成订单')
        case 6:
          return this.$t('已取消订单')
        case 7:
          return this.$t('已删除')
      }
    },
    // 分页
    changePage(e) {
      this.start = (e - 1) * this.limit
      // 更新 table 数据
      this.initTableData(1)
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
