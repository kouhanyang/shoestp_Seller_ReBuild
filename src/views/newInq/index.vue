<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>询盘列表</span>
      </div>
      <div class="divMargin">
        <el-input
          v-model="input"
          style="width: 50%"
          placeholder="请输入名字"
          clearable/>
        <el-button type="primary" @click="seach">搜索</el-button>
        <el-button type="primary" style="margin-left: 35%" @click="refresh">刷新</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="supplierName"
          label="供应商"/>
        <el-table-column
          prop="name"
          label="名字"
          width="180"/>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"/>
        <el-table-column
          prop="detail"
          label="详情"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      tableData: [{}],
      input: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    seach() {
      const self = this
      request({
        url: '/seller/inq_NewInq_getList',
        method: 'post',
        data: {
          name: self.input
        }
      }).then(data => {
        console.log(data)
        self.tableData = data.data.result.items
      }).catch(err => {
        console.log(err)
      })
    },
    getList() {
      const self = this
      request({
        url: '/seller/inq_NewInq_getList',
        method: 'get'
      }).then(data => {
        console.log(data)
        self.tableData = data.data.result.items
      }).catch(err => {
        console.log(err)
      })
    },
    refresh() {
      location.reload()
    }
  }
}
</script>

<style scoped>
  .main {
    margin: 20px;
  }

  .divMargin {
    margin-bottom: 10px;
  }
</style>
