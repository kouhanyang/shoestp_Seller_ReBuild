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
        <el-button type="primary" size="mini" @click="selectlayer(activeName)">
          {{ $t('search') }}
        </el-button>
      </el-form>
    </el-row>
    <template>
      <el-tabs v-model="activeName" @tab-click="Middlelayer">
        <el-tab-pane label="商家已抢单" name="first">
          <el-table
            :data="RobbingData"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="询盘名称"
              width="250"/>
            <el-table-column
              prop="email"
              label="采购商邮箱"
              width="220"/>
            <el-table-column
              prop="countryName"
              label="国家">
              <template slot-scope="scope">
                <img
                  v-if="scope.row.countryFlag!=''"
                  :src="getImageUrl(scope.row.countryFlag)"
                  style="max-width: 50px">
                <label v-else>{{ scope.row.countryName }}</label>
              </template>
            </el-table-column>
            <el-table-column
              prop="robbingState"
              label="已抢单"/>
            <el-table-column
              prop="createTime"
              label="时间"/>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="lookUpData(scope.row)">查看</el-button>
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

        </el-tab-pane>
        <el-tab-pane label="未抢单" name="second">
          <el-table
            :data="NorobberyData"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="询盘名称"
              width="250"/>
            <el-table-column
              prop="email"
              label="采购商邮箱"
              width="220"/>
            <el-table-column
              prop="countryName"
              label="国家">
              <template slot-scope="scope">
                <img
                  v-if="scope.row.countryFlag!=''"
                  :src="getImageUrl(scope.row.countryFlag)"
                  style="max-width: 50px">
                <label v-else>{{ scope.row.countryName }}</label>
              </template>
            </el-table-column>
            <el-table-column
              prop="robbingState"
              label="已抢单"/>
            <el-table-column
              prop="createTime"
              label="时间"/>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="lookUpData(scope.row)">查看</el-button>
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

        </el-tab-pane>
      </el-tabs>
    </template>

  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      activeName: 'first',
      NorobberyData: [],
      RobbingData: [],
      tableData: [],
      bean: {},
      page: {
        curr: 1, // 当前页数
        total: 1, // 总记录数
        showItem: 10, // 展示记录数
        showItems: [20, 50, 100], // 展示记录数选择
        country: '',
        title: '',
        qdvalue: ''
      },
      lookUp: false,
      imgUrlconfig: 'http://shoestp.oss-us-west-1.aliyuncs.com',
      writeFlag: true,
      robbingInfo: {
        id: '',
        msg: '',
        quotedPrice: ''
      }
    }
  },
  mounted: function() {
    this.getTableData()
  },
  methods: {
    Middlelayer(v) {
      var self = this
      self.page.curr = 1
      self.page.total = 1
      self.handleClick(v.name)
    }, selectlayer(v) {
      var self = this
      self.page.curr = 1
      self.page.total = 1
      self.handleClick(v)
    },
    handleClick(v) {
      var self = this
      self.start = 0
      if (self.page.curr === 1) {
        self.start = 0
      } else {
        self.start = (self.page.curr - 1) * self.page.showItem
      }
      if (v === 'first') {
        var param = {
          'start': self.start,
          'limit': self.page.showItem,
          'countryName': self.page.country,
          'title': self.page.title,
          'qdvalue': 1
        }
        request({
          url: '/seller/usr_UsrConsult_page',
          method: 'get',
          params: param
        }).then(res => {
          self.RobbingData = res.data.result.items
          self.page.curr = res.data.result.currentPage
          self.page.total = res.data.result.totalPage
          for (var i in self.RobbingData) {
            if (self.RobbingData[i].title && self.RobbingData[i].title.length > 40) {
              self.RobbingData[i].title = self.RobbingData[i].title.substr(0, 40) + '...'
            }
            if (self.RobbingData[i].email && self.RobbingData[i].email.length > 10) {
              self.RobbingData[i].email = self.RobbingData[i].email.substr(0, 10) + '...'
            }
            if (self.RobbingData[i].countryName && self.RobbingData[i].countryName.length > 16) {
              self.RobbingData[i].countryName = self.RobbingData[i].countryName.substr(0, 16) + '...'
            }
            var data = self.RobbingData[i]
            self.RobbingData[i].robbingState = data.supplierCount + ' / 5'
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        var param1 = {
          'start': self.start,
          'limit': self.page.showItem,
          'countryName': self.page.country,
          'title': self.page.title,
          'qdvalue': 0
        }
        request({
          url: '/seller/usr_UsrConsult_page',
          method: 'get',
          params: param1
        }).then(res => {
          self.NorobberyData = res.data.result.items
          self.page.curr = res.data.result.currentPage
          self.page.total = res.data.result.totalPage
          for (var i in self.NorobberyData) {
            if (self.NorobberyData[i].title && self.NorobberyData[i].title.length > 40) {
              self.NorobberyData[i].title = self.NorobberyData[i].title.substr(0, 40) + '...'
            }
            if (self.NorobberyData[i].email && self.NorobberyData[i].email.length > 10) {
              self.NorobberyData[i].email = self.NorobberyData[i].email.substr(0, 10) + '...'
            }
            if (self.NorobberyData[i].countryName && self.NorobberyData[i].countryName.length > 16) {
              self.NorobberyData[i].countryName = self.NorobberyData[i].countryName.substr(0, 16) + '...'
            }
            var data = self.NorobberyData[i]
            self.NorobberyData[i].robbingState = data.supplierCount + ' / 5'
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getImageUrl(url) {
      if (url && url.length > 0) {
        return this.imgUrlconfig + url
      }
      return url
    },
    robbingClose: function() {
      this.robbingInfo.msg = ''
      this.robbingInfo.quotedPrice = ''
      this.robbingInfo.id = ''
    },
    handleSizeChange(val) {
      this.page.showItem = val
      this.handleClick(this.activeName)
    },
    handleCurrentChange(val) {
      this.page.curr = val
      this.handleClick(this.activeName)
    },
    lookUpData: function(row) {
      request({
        url: '/seller/usr_UsrConsult_detail',
        method: 'get',
        params: {
          id: row.id
        }
      }).then(res => {
        if (res.data.ret === 1) {
          if (!res.data.result) {
            return
          }
          if (res.data.result.relations !== undefined) {
            // 专属询盘处理方式
            this.$router.push({ name: 'beloangdetail', params: { id: row.id }})
          } else {
            // 公共询盘未抢单处理方式
            this.$router.push({ name: 'askDetail1', params: { id: row.id, supplierCount: row.supplierCount }})
          }
        } else {
          this.$alert(res.data.msg, '消息', {
            confirmButtonText: '确定',
            callback: action => {
              // 此处写点击确定后的事件
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    robbingIt: function() {
      var self = this

      if (self.robbingInfo.msg === '') {
        self.$message.error('留言不可为空')
        return
      }
      if (self.robbingInfo.quotedPrice === '' || self.robbingInfo.quotedPrice === 0) {
        self.$message.error('请输入正确的价格')
        return
      }
      request({
        url: '/seller/usr_UsrConsult_quote',
        method: 'post',
        params: self.robbingInfo
      }).then(res => {
        if (res.data.ret === 1) {
          this.$alert('抢单成功', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              self.lookUp = false
              // 此处写点击确定后的事件
            }
          })
        } else {
          this.$alert(res.data.msg, '消息', {
            confirmButtonText: '确定',
            callback: action => {
              // 此处写点击确定后的事件
              self.lookUp = false
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTableData: function() {
      var start = 0
      if (this.page.curr === 1) {
        start = 0
      } else {
        start = (this.page.curr - 1) * this.page.showItem
      }
      var param = {
        'start': start,
        'limit': this.page.showItem,
        'countryName': this.page.country,
        'title': this.page.title,
        'qdvalue': 1
      }
      var self = this
      request({
        url: '/seller/usr_UsrConsult_page',
        method: 'get',
        params: param
      }).then(res => {
        self.RobbingData = res.data.result.items
        for (var i in self.RobbingData) {
          if (self.RobbingData[i].title && self.RobbingData[i].title.length > 40) {
            self.RobbingData[i].title = self.RobbingData[i].title.substr(0, 40) + '...'
          }
          if (self.RobbingData[i].email && self.RobbingData[i].email.length > 10) {
            self.RobbingData[i].email = self.RobbingData[i].email.substr(0, 10) + '...'
          }
          if (self.RobbingData[i].countryName && self.RobbingData[i].countryName.length > 16) {
            self.RobbingData[i].countryName = self.RobbingData[i].countryName.substr(0, 16) + '...'
          }
          var data = self.RobbingData[i]
          self.RobbingData[i].robbingState = data.supplierCount + ' / 5'
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

  .fl {
    float: left;
  }

  /deep/ .el-dialog.el-dialog--center {
    border-radius: 5px;
  }

  /deep/ .el-dialog__header {
    background-color: #545B6D;
    text-align: left;
    padding: 16px 34px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  /deep/ .el-dialog .el-dialog__headerbtn .el-dialog__close.el-icon.el-icon-close {
    color: #fff;
  }

  /deep/ .el-dialog .el-dialog__header .el-dialog__title {
    color: #fff
  }

  /deep/ .el-dialog .el-input__inner {
    width: 600px;
  }

  /deep/ .el-dialog .el-dialog__body {
    padding: 60px 80px 40px 80px;
  }

  /deep/ .el-dialog .el-textarea {
    width: 600px;
  }

  /deep/ .el-dialog .el-button--default {
    background-color: #B5B6BB;
    width: 98px;
  }

  /deep/ .el-dialog .el-button--default:hover {
    background-color: rgb(85, 90, 109) !important;
  }

  /deep/ .el-dialog .el-button--default:focus {
    background-color: rgb(85, 90, 109) !important;
  }

  /deep/ .el-dialog .el-button--primary {
    background-color: rgb(70, 119, 238);
  }

  /deep/ .el-dialog .el-button--primary:hover {
    background-color: rgb(51, 86, 170) !important;
  }

  /deep/ .el-dialog .el-button--primary:focus {
    background-color: rgb(51, 86, 170) !important;
  }

  /deep/ .el-dialog .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 60px;
  }

</style>
