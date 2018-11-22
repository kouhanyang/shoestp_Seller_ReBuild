<template>
  <div class="main">
    <el-form :inline="true" size="mini">
      <el-form-item label="国家">
        <el-select v-model="page.country" clearable>
          <el-option v-for="(v,index) in country" :key="index" :label="v.name" :value="v.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="page.keyword" placeholder="内容"/>
      </el-form-item>
      <el-button type="primary" size="mini" @click="search()">
        搜索
      </el-button>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180"/>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"/>
      <el-table-column
        :formatter="getCountry"
        prop="country"
        label="国家"
      />
      <el-table-column
        prop="email"
        label="Email"/>
      <el-table-column
        prop="tel"
        label="电话"/>
      <el-table-column
        :formatter="getInquiry"
        prop="inquiry"
        label="询盘内容"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="view(scope.row.id)">查看</el-button>
          <el-button type="text" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="page.cur"
      :page-sizes="[20, 50, 100, 150]"
      :page-size="20"
      :total="page.count"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changeSize"
      @current-change="changePage"/>
  </div>
</template>
<script>
import request from '@/utils/request'
import sotre from '@/store'

export default {
  name: 'ActivitySignInList',
  data() {
    return {
      country: sotre.state.app.country,
      page: {
        country: null,
        keyword: null,
        limit: 20,
        start: 0,
        count: 0,
        cur: 1
      },
      tablecCol: [{
        label: '分类名称',
        prop: 'name'
      }],
      tableData: []
    }
  }, mounted() {
    this.getTableData()
  }, methods: {
    search() {
      this.page.start = 0
      this.page.cur = 1
      this.getTableData()
    },
    changePage(data) {
      data = data - 1
      this.page.start = data * this.page.limit
      this.getTableData()
    },
    changeSize(data) {
      this.page.limit = data
      this.getTableData()
    },
    getCountry(data) {
      for (const value of this.country) {
        if (data.country == value.id) {
          return value.name
        }
      }
      return '未知国家'
    },
    getInquiry(data) {
      if (data.inquiry && data.inquiry.length > 0) {
        return data.inquiry
      }
      return '无'
    },
    del(id) {
      this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/activitys_Activity_del',
          method: 'post',
          data: {
            id: id
          }
        }).then(value => {
          this.getTableData()
        })
      }).catch(() => {
      })
    },
    view(id) {
      this.$router.push('/activitySignIn/view?id=' + id)
    },
    getTableData() {
      request({
        url: '/seller/activitys_Activity_list',
        method: 'get',
        params: {
          country: this.page.country,
          keyword: this.page.keyword,
          start: this.page.start,
          limit: this.page.limit
        }
      }).then(value => {
        if (value.data.ret && value.data.ret == 1) {
          this.tableData = value.data.result.items
          this.page.count = value.data.result.totalCount
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 25px;
  }
</style>
