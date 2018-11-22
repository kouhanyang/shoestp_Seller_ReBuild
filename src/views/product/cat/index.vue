<template>
  <div class="main">
    <el-form :inline="true" size="mini">
      <el-form-item label="分类名称">
        <el-input v-model="page.keyword" placeholder="分类名称"/>
      </el-form-item>
      <el-button type="primary" size="mini" @click="getTableData()">
        {{ $t('搜索') }}
      </el-button>
      <el-button type="primary" size="mini" @click="addCat()">
        添加
      </el-button>
    </el-form>
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
        label="上、下状态"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            :active-text="showStatus(scope.row)"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(scope)"
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-loading="loading"
      :visible.sync="showEdit"
      title="修改"
      width="40%"
      center>
      <el-form size="mini">
        <el-form-item label="标题">
          <el-input v-model="status.name" placeholder="标题"/>
        </el-form-item>
        <el-form-item label="隶属分类">
          <el-select
            v-model="status.categoryUp"
            :filter-method="search"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in temp.categoryUp"
              :key="item.pkey"
              :label="item.name"
              :value="item.pkey"
            />
          </el-select>
        </el-form-item>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>SEO:标题与标签</span>
          </div>
          <el-form-item label="标题">
            <el-input v-model="status.seoTitleEn" placeholder="标题"/>
          </el-form-item>
          <el-form-item label="关键词">
            <el-input v-model="status.seoKeywordEn" placeholder="关键词"/>
          </el-form-item>
          <el-form-item label="简述">
            <el-input v-model="status.seoDescriptionEn" placeholder="简述"/>
          </el-form-item>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="saveCat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'ProductList',
  data() {
    return {
      type: 0,
      loading: false,
      tablecCol: [{
        label: '分类名称',
        prop: 'name'
      }],
      tableData: [],
      showEdit: false,
      status: {
        pkey: -1,
        name: null,
        enabled: 1,
        seoDescriptionEn: null,
        seoKeywordEn: null,
        seoTitleEn: null,
        categoryUp: null
      },
      temp: {
        categoryUp: []
      },
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
    showStatus: function(val) {
      return val.enabled === 0 ? '下架' : '上架'
    }, change: function(val) {
      const data = {
        'bean.pkey': val.row.pkey, 'bean.enabled': val.row.enabled
      }
      request({
        url: '/seller/usr_UsrProductCategory_upperAndLowerFrame',
        method: 'post',
        data
      }).then(res => {

      })
    },
    search(val) {
      return false
    }, addCat() {
      this.showEdit = true
      this.status = {
        pkey: -1,
        name: null,
        enabled: 1,
        seoDescriptionEn: null,
        seoKeywordEn: null,
        seoTitleEn: null,
        categoryUp: null
      }
      this.temp.categoryUp = this.tableData
      this.type = 1
    },
    saveCat() {
      const self = this
      self.loading = true
      const data = {}
      for (const key in this.status) {
        if (key === 'supplier') continue
        data['bean.' + key] = this.status[key]
      }
      request({
        url: self.type === 0 ? '/seller/usr_UsrProductCategory_update' : '/seller/usr_UsrProductCategory_ins',
        method: 'post',
        data
      }).then(res => {
        if (res.data) {
          self.showEdit = false
          self.loading = false
          self.getTableData()
        }
      })
    },
    handleSizeChange(val) {
      this.page.showItem = val
      this.handleCurrentChange(this.page.curr)
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.page.curr = val
      console.log(this)
      // this.getTableData()
    }, getTableData() {
      const self = this
      request({
        url: '/seller/usr_UsrProductCategory_getCategory',
        method: 'get'
      }).then(res => {
        self.tableData = res.data.grandPa
        for (const key in res.data.parents) {
          self.tableData.push(res.data.parents[key])
        }
        for (const key in res.data.children) {
          self.tableData.push(res.data.children[key])
        }
        // self.page.total = res.data.result.totalCount
      }).catch(err => {
        console.log(err)
      })
    }, edit(row) {
      this.getTableData()
      this.showEdit = true
      this.type = 0
      const self = this
      this.temp.categoryUp = this.tableData.filter(res => {
        if (res.pkey !== row.pkey) {
          if (!res.categoryUp) {
            return true
          }
        }
        return false
      })
      request({
        'url': '/seller/usr_UsrProductCategory_load',
        params: {
          pkey: row.pkey
        }
      }).then(res => {
        self.status = res.data
        if (res.data.categoryUp) {
          self.status.categoryUp = parseInt(res.data.categoryUp.split('##')[0])
        }
      })
    }, remove(row) {
      const self = this
      this.$confirm('是否删除该分类', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/usr_UsrProductCategory_del',
          method: 'post',
          data: {
            pkey: row.pkey
          }
        }).then(res => {
          if (res.data.success) {
            self.$message({
              type: 'success',
              message: '删除成功!'
            })
            self.getTableData()
          } else {
            self.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
