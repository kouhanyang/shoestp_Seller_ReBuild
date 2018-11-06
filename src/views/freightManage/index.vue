<template>
  <div class="main">
    <el-row :gutter="20">
      <el-form :inline="true" size="mini">
        <el-form-item label="公司名">
          <el-input v-model="page.keyword" placeholder="公司名"/>
        </el-form-item>
        <el-button type="primary" size="mini" @click="getTableData()">
          {{ $t('查询') }}
        </el-button>
        <el-button type="primary" size="mini" @click="add">
          添加运费模板
        </el-button>
        <el-button type="primary" size="mini" @click="defaultsetting">
          恢复默认
        </el-button>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      height="990"
      style="width: 100%">
      <el-table-column
        v-for="d in tablecCol"
        :key="d.prop"
        :prop="d.prop"
        :label="d.label"
        :formatter="d.formatter"
      />

      <el-table-column
        fixed="right"
        label="Logo"
      >
        <template slot-scope="scope">
          <img :src="getImageUrl(scope.row.logo)" style="max-width: 150px">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCountry(scope.row)">区域设置</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
    <!--:current-page="page.curr"-->
    <!--:page-sizes="page.showItems"-->
    <!--:page-size="page.showItem"-->
    <!--:total="page.total"-->
    <!--layout="total, sizes, prev, pager, next, jumper"-->
    <!--@current-change="handleCurrentChange"-->
    <!--@size-change="handleSizeChange"-->
    <!--/>-->
    <div>
      <el-dialog :visible.sync="showCoutry" :title="title+'_区域设置'">
        <AreaIndex :id="id" :title="title" :jstype="jstype" :company="title"/>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import AreaIndex from './area'
import store from '@/store'

export default {
  name: 'FreightManageList',
  components: {
    AreaIndex
  },
  data() {
    return {
      ImageBaseUrl: function() {
        return store.getters.ImageBaseUrl
      },
      showCoutry: false,
      title: '',
      jstype: '',
      id: -1,
      tablecCol: [{
        label: '序号',
        prop: 'index'
      }, {
        label: '公司名', prop: 'company'
      }, {
        label: '是否启用',
        prop: 'enabled', formatter: function(row) {
          return row.enabled ? '启用' : '停用'
        }
      }, {
        label: '计算方式',
        prop: 'type'
      }
      ],
      tableData: [],
      page: {
        curr: 1,
        total: 99,
        showItem: 20,
        showItems: [20, 50, 100],
        keyword: null
      }
    }
  }, mounted() {
    this.getTableData()
  }, methods: {
    getImageUrl(url) {
      if (url && url.length > 0) {
        return store.getters.ImageBaseUrl + url
      }
      return url
    },
    editCountry(row) {
      this.id = row.id
      this.jstype = row.type
      this.title = row.company
      this.showCoutry = true
    },
    handleSizeChange(val) {
      this.page.showItem = val
      this.handleCurrentChange(this.page.curr)
    },
    handleCurrentChange(val) {
      this.page.curr = val
      this.getTableData()
    }, getTableData() {
      const data = { selectcompany: this.page.keyword }
      const self = this
      request({
        url: '/seller/plt_PltFreightSeller_listfreightlike',
        method: 'post',
        data
      }).then(res => {
        self.tableData = res.data.result.items
        for (var i = 0; i < self.tableData.length; i++) {
          self.tableData[i].index = i + 1
        }
        self.page.total = res.data.result.totalCount
      }).catch(err => {
        console.log(err)
      })
    }, getPic(val) {
      if (val) {
        if (val.split(',').length > 0) {
          return val.split(',')[0] + '?x-oss-process=image/resize,m_fixed,h_250,w_250'
        }
      }
      return val
    }, add() {
      this.$router.push('/freightManage/save')
    }, edit(row) {
      this.$router.push('/freightManage/save?id=' + row.id)
    }, remove(row) {
      const self = this
      this.$confirm('是否删除该快递公司', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/plt_PltFreightSeller_del',
          method: 'post',
          data: {
            pkey: row.id
          }
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          self.getTableData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }, defaultsetting() {
      const self = this
      this.$confirm('是否恢复系统默认', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/plt_PltFreightSeller_recovery',
          method: 'post'
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '恢复成功!'
            })
          }
          self.getTableData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '恢复失败'
        })
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
