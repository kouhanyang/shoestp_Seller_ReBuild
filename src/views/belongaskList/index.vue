<template>
  <div class="main">
    <el-row :gutter="20">
      <el-form :inline="true" size="mini">
        <el-form-item label="国家" label-width="42px">
          <el-input v-model="page.country" placeholder="请输入国家名称"/>
        </el-form-item>
        <el-form-item label="询盘标题" label-width="80px">
          <el-input v-model="page.title" placeholder="请输入询盘名称"/>
        </el-form-item>
        <el-button type="primary" size="mini" @click="getselerctTableData">
          {{ $t('search') }}
        </el-button>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="询盘名称"
        width="180"/>
      <el-table-column
        prop="name"
        label="名字"
        width="180"/>
      <el-table-column
        prop="countryName"
        label="国家">
        <template slot-scope="scope">
          <img v-if="scope.row.countryFlag!=''" :src="getImageUrl(scope.row.countryFlag)" style="max-width: 50px">
          <label v-else>{{ scope.row.countryName }}</label>
        </template>

      </el-table-column>

      <el-table-column
        width="180"
        label="是否有新消息">
        <template slot-scope="scope">
          <span v-if="scope.row.haveNewMsg == true">有</span>
          <span v-if="scope.row.haveNewMsg == false">无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="100"
        label="时间"/>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookUpData(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :page-count="page.total"
      style="text-align: center;"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!-- :current-page="page.curr"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"-->

  </div>
</template>

<script>
//
import request from '@/utils/request'
import store from '@/store'
export default {
  data() {
    return {
      tableData: [],
      page: {
        curr: 1, // 当前页数
        total: 1, // 总记录数
        showItem: 10, // 展示记录数
        showItems: [20, 50, 100], // 展示记录数选择
        country: '',
        title: ''
      }
    }
  },
  mounted: function() {
    this.getTableData()
  },
  methods: {
    getImageUrl(url) {
      if (url && url.length > 0) {
        return store.getters.ImageBaseUrl + url
      }
      return url
    },
    lookUpData: function(id) {
      this.$router.push({ name: 'askDetail', params: { id: id }})
    },
    handleSizeChange(val) {
      this.page.showItem = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.page.curr = val
      this.getTableData()
    },
    getTableData: function() {
      var start = 0
      if (this.page.curr == 1) {
        start = 0
      } else {
        start = (this.page.curr - 1) * this.page.showItem
      }
      var param = {
        'start': start,
        'limit': this.page.showItem,
        'countryName': this.page.country,
        'title': this.page.title
      }
      var self = this
      request({
        url: '/seller/usr_UsrConsultRelation_page',
        method: 'get',
        params: param
      }).then(res => {
        self.tableData = res.data.result.items
        for (var i in self.tableData) {
          var data = self.tableData[i]
          self.tableData[i].robbingState = data.supplierCount + ' / 5'
        }
        self.page.curr = res.data.result.currentPage
        self.page.total = res.data.result.totalPage
      }).catch(err => {
        console.log(err)
      })
    },
    getselerctTableData: function() {
      var param = {
        'start': 0,
        'limit': this.page.showItem,
        'countryName': this.page.country,
        'title': this.page.title
      }
      var self = this
      request({
        url: '/seller/usr_UsrConsultRelation_page',
        method: 'get',
        params: param
      }).then(res => {
        self.tableData = res.data.result.items
        for (var i in self.tableData) {
          var data = self.tableData[i]
          self.tableData[i].robbingState = data.supplierCount + ' / 5'
        }
        self.page.curr = res.data.result.currentPage
        self.page.total = res.data.result.totalPage
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 25px;
    width: 64%;
    margin-left: 2%;
  }
</style>
