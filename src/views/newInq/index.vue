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
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="show(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :visible.sync="showStats"
      title="详情"
      width="30%">
      <el-input
        :disabled="true"
        :rows="2"
        v-model="textField"
        autosize
        type="textarea"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showStats = false">取 消</el-button>
        <el-button type="primary" @click="showStats = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      tableData: [{}],
      input: '',
      showStats: false,
      textField: ''
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
    },
    show(row) {
      this.showStats = true
      this.textField = row.detail
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
