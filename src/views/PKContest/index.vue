<template>
  <div class="main">
    <el-table
      :data="table"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="tel"
        label="电话"/>
      <el-table-column
        prop="email"
        label="邮箱"/>
      <el-table-column
        prop="companyname"
        label="公司名称"/>
    </el-table>
    <el-pagination
      :total="total"
      style="margin-left: 45%;margin-top: 1%"
      background
      layout="prev, pager, next"/>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      table: [],
      total: 0
    }
  },
  mounted() {
    this.getPkContest()
  },
  methods: {
    getPkContest() {
      const self = this
      request({
        url: '/seller/as_ActivitySignIns_getActivitySignInsList',
        method: 'get'
      }).then(data => {
        const result = data.data.result
        self.total = result.totalPage
        self.table = result.items
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .main {
    margin: 20px;
  }
</style>
