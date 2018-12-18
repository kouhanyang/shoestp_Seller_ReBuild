<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-input v-model="page.keyword" size="mini" placeholder="商品名称"/>
      </el-col>
      <el-col :span="3">
        <el-input v-model="page.number" size="mini" placeholder="产品编号"/>
      </el-col>
      <el-col :span="3">
        <el-cascader
          :options="options"
          v-model="page.cat"
          :change-on-select="true"
          size="mini"
          clearable
        />

      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" native-tpye="button" @click="getTableData()">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      height="990"
      style="width: 100%">
      <el-table-column
        label="商品图片"
      >
        <template slot-scope="scope">
          <img :src="getPic(scope.row.picture)" style="max-width: 150px">
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="编号"
      />
      <el-table-column
        prop="name"
        label="名称"
      >
        <template slot-scope="scope">
          <a
            :href="'/'+scope.row.rewrite"
            target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="商品分类"
      />
      <el-table-column
        :formatter="categoryDiyFormatter"
        prop="categoryDiy"
        label="店铺分类"
      />
      <el-table-column
        :formatter="cur_priceFormatter"
        prop="cur_price"
        label="价格"
      />
      <el-table-column
        prop="update_time"
        label="更新时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="copy(scope.row)">复制</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page.curr"
      :page-sizes="page.showItems"
      :page-size="page.showItem"
      :total="page.total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  name: 'ProductList',
  data() {
    return {
      tableData: [],
      page: {
        curr: 1,
        total: 99,
        showItem: 20,
        showItems: [20, 50, 100],
        keyword: null,
        cat: [],
        number: ''
      }, options: []
    }
  }, mounted() {
    const self = this
    this.getTableData()
    request({
      url: '/seller/pdt_PdtCat_getPdtCatList',
      method: 'get'
    }).then(function(res) {
      self.$set(self, 'options', res.data.result)
    })
  }, methods: {
    categoryDiyFormatter: function(row, column, cellValue, index) {
      if (!cellValue) {
        return '无'
      }
      return cellValue
    }, cur_priceFormatter: function(row, column, cellValue, index) {
      return '$' + row.cur_price
    },
    handleSizeChange(val) {
      this.page.showItem = val
      this.handleCurrentChange(this.page.curr)
    },
    handleCurrentChange(val) {
      this.page.curr = val
      this.getTableData()
    }, getTableData() {
      const data = {
        'start': this.page.curr,
        'limit': this.page.showItem,
        name: this.page.keyword,
        number: this.page.number,
        cat: this.page.cat[this.page.cat.length - 1]
      }
      const self = this
      request({
        url: '/seller/pdt_PdtProduct_layuiList',
        method: 'post',
        data
      }).then(res => {
        self.tableData = res.data.result.items
        self.page.total = res.data.result.totalCount
      }).catch(err => {
        console.log(err)
      })
    }, getPic(val) {
      if (val) {
        if (val.split(',').length > 0) {
          return store.getters.ImageBaseUrl + val.split(',')[0] + '?x-oss-process=image/resize,m_fixed,h_250,w_250'
        }
      }
      return val
    }, edit(row) {
      this.$router.push('/product/view?id=' + row.pkey)
    }, copy(row) {
      this.$router.push('/product/view?id=' + row.pkey + '&Copy=1')
    }, remove(row) {
      const self = this
      this.$confirm('是否删除该商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/pdt_PdtProduct_delDetails',
          method: 'post',
          data: {
            pkey: row.pkey
          }
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            self.getTableData()
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
