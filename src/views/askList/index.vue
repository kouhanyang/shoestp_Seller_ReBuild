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
        <!--<span>抢单</span>-->
        <el-form-item label="抢单" label-width="80px">
          <el-select v-model="page.qdvalue" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-button type="primary" size="mini" @click="getSelectTableData">
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
          <img v-if="scope.row.countryFlag!=''" :src="getImageUrl(scope.row.countryFlag)" style="max-width: 150px">
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

    <el-dialog
      :visible.sync="lookUp"
      width="870px"
      title="抢单"
      center
      @close="robbingClose">
      <el-form ref="form" label-width="88px">
        <el-form-item label="询盘名称：">
          <el-input :disabled="writeFlag" v-model="bean.title"/>
        </el-form-item>
        <el-form-item label="产品图片：">
          <el-upload
            v-if="bean.showImage"
            :disabled="writeFlag"
            :src="bean.showImage"
            class="avatar-uploader"/>
          <img
            class="avatar"
            style="width:208px;">
        </el-form-item>
        <!--&lt;!&ndash;<el-form-item label="产品编号：">-->
        <!--<el-input v-model="form.name"></el-input>-->
        <!--</el-form-item>&ndash;&gt;-->
        <el-form-item label="姓名：">
          <el-input :disabled="writeFlag" v-model="bean.name"/>
        </el-form-item>
        <el-form-item label="国家：">
          <img :src="getImageUrl(bean.image)" style="max-width: 150px">
        </el-form-item>
        <el-form-item label="时间：">
          <el-input :disabled="writeFlag" v-model="bean.createTime"/>
        </el-form-item>
        <el-form-item label="已抢单：">
          <el-input :disabled="writeFlag" v-model="bean.robbingState"/>
        </el-form-item>
        <el-form-item label="留言：">
          <el-input :rows="7" v-model="robbingInfo.msg" placeholder="输入留言" type="textarea"/>
        </el-form-item>
        <el-form-item label="报价：" style="margin-bottom:0;">
          <el-input v-model="robbingInfo.quotedPrice" placeholder="请输入您的报价"/>
        </el-form-item>

      </el-form>
      <!--</fieldset>-->
      <span slot="footer" class="dialog-footer">
        <el-button style="background-color:#B5B6BB;color:#fff;" @click="lookUp = false">取 消</el-button>
        <el-button type="primary" @click="robbingIt">立即抢单</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data() {
    return {
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
      },
      options: [{
        value: '',
        label: '所有询盘'
      }, {
        value: '0',
        label: '未抢单'
      }, {
        value: '1',
        label: '已抢单'
      }]
    }
  },
  mounted: function() {
    this.getTableData()
  },
  methods: {
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
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.page.curr = val
      this.getTableData()
    },
    lookUpData: function(id) {
      var self = this
      request({
        url: '/seller/usr_UsrConsult_detail',
        method: 'get',
        params: {
          id: id
        }
      }).then(res => {
        if (res.data.ret === 1) {
          if (!res.data.result) {
            return
          }
          if (res.data.result.relations !== undefined) {
            // 专属询盘处理方式
            this.$router.push({ name: 'askDetail', params: { id: id }})
          } else {
            // 公共询盘未抢单处理方式
            self.bean = res.data.result
            var data = self.tableData
            for (var i in data) {
              if (data[i].id === id) {
                self.bean.robbingState = data[i].robbingState
                self.bean.showImage = self.imgUrlconfig + data[i].image.split(',')[0]
              }
            }
            self.robbingInfo.id = id
            self.lookUp = true
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
        console.log(res)
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
        'qdvalue': this.page.qdvalue
      }
      var self = this
      request({
        url: '/seller/usr_UsrConsult_page',
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
    getSelectTableData: function() {
      var param = {
        'start': 0,
        'limit': this.page.showItem,
        'countryName': this.page.country,
        'title': this.page.title,
        'qdvalue': this.page.qdvalue
      }
      var self = this
      request({
        url: '/seller/usr_UsrConsult_page',
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

function clearNoNum(obj) {
  obj.value = obj.value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  obj.value = obj.value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')// 只能输入两个小数
  if (obj.value.indexOf('.') < 0 && obj.value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj.value = parseFloat(obj.value)
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
