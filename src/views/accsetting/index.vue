<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账户设置</h3>
      </div>
      <el-form ref="editInfoForm" :label-position="labelPosition" :model="form" label-width="100px">
        <el-row :gutter="gutter">
          <el-col :md="12" :sm="24">
            <el-form-item label="用户名">
              <el-input :value="username" :disabled="true" type="text" readonly/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item label="账户状态">
              <el-input :value="useraccount" :disabled="true" type="text" readonly/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item label="店铺名称">
              <el-input :value="shopname" :disabled="true" type="text" readonly/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item label="企业类型">
              <el-input :value="gongsi" :disabled="true" type="text" readonly/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item label="位置：">
              <el-input v-model="inputaddress.zh_CN" :disabled="true" class="myinput" readonly/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '生产能力不能为空',trigger:'blur'}]"
              label="生产能力："
              prop="inputpower.zh_CN">
              <el-input v-model="form.inputpower.zh_CN" class="myinput"/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '生产总数不能为空',trigger:'blur'}]"
              label="生产总数："
              prop="inputnums.zh_CN">
              <el-input v-model="form.inputnums.zh_CN" class="myinput" placeholder="请输入整数"/>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '员工总数不能为空',trigger:'blur'}]"
              label="员工总数："
              prop="inputstaffs.zh_CN">
              <el-input v-model="form.inputstaffs.zh_CN" class="myinput" placeholder="请输入整数"/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '年销售量不能为空',trigger:'blur'}]"
              label="年销售量："
              prop="inputyearnum.zh_CN">
              <el-input v-model="form.inputyearnum.zh_CN" class="myinput" placeholder="请输入整数"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="gutter">
          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '第三市场不能为空',trigger:'blur'}]"
              label="第三市场："
              prop="textmarket.zh_CN">
              <el-input v-model="form.textmarket.zh_CN" class="mytextarea" type="textarea" rows="5" resize="none"/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '材料选择不能为空',trigger:'blur'}]"
              label="材料选择："
              prop="texttype.zh_CN">
              <el-input v-model="form.texttype.zh_CN" class="mytextarea" type="textarea" rows="5" resize="none"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24">
            <el-form-item label="头像：">
              <el-upload
                :show-file-list="false"
                :on-success="userSuccess"
                class="avatar-uploader"
                action="/seller/usr_UsrSupplier_upload">
                <img v-if="userimageUrl" :src="image(userimageUrl)" class="avatar img-contain">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item label="LOGO：">
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                class="avatar-uploader"
                action="/seller/usr_UsrSupplier_upload">
                <img v-if="logourl" :src="image(logourl)" class="avatar img-contain">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '部门不能为空',trigger:'blur'}]"
              label="部门："
              prop="department.zh_CN">
              <el-input v-model="form.department.zh_CN" class="myinput"/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '职称不能为空',trigger:'blur'}]"
              label="职称："
              prop="inputtitle.zh_CN">
              <el-input v-model="form.inputtitle.zh_CN" class="myinput"/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item
              :rules="[{ required: true, message: '网站不能为空',trigger:'blur'}]"
              label="网站："
              prop="inputweb">
              <el-input v-model="form.inputweb" class="myinput"/>
            </el-form-item>
          </el-col>

          <el-col :md="12" :sm="24">
            <el-form-item label="最后登录">
              <el-input :value="lastlogin" :disabled="true" type="text" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" style="margin-left: 47.5%" @click="update">修改</el-button>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>密码设置</h3>
      </div>
      <el-row>
        <el-col>
          <el-form :model="numberValidateForm" label-width="100px">
            <el-form-item
              :rules="[{ required: true, message: '原密码不能为空',trigger:'blur'}]"
              label="原密码"
              prop="oldpassw">
              <el-input v-model="numberValidateForm.oldpassw" type="password"/>
            </el-form-item>
            <el-form-item
              :rules="[{ required: true, message: '新密码不能为空',trigger:'blur'}]"
              prop="newpassw"
              label="新密码">
              <el-input v-model="numberValidateForm.newpassw" type="password"/>
            </el-form-item>
            <el-form-item
              :rules="[{ required: true, message: '确认密码不能为空',trigger:'blur'}]"
              label="确认密码"
              prop="checkpassw">
              <el-input v-model="numberValidateForm.checkpassw" type="password"/>
            </el-form-item>

            <el-form-item>
              <el-button>取消</el-button>
              <el-button type="primary" @click="updPwd">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  name: 'Accsetting',
  data() {
    return {
      inputaddress: '',
      username: '111',
      labelPosition: 'top',
      gutter: 20,
      useraccount: '',
      shopname: '',
      gongsi: '',
      lastlogin: '',
      logourl: '',
      logoVisible: false,
      userimageUrl: '',
      numberValidateForm: {
        newpassw: '',
        oldpassw: '',
        checkpassw: ''
      },
      form: {
        inputpower: {},
        inputnums: '',
        inputstaffs: '',
        inputyearnum: '',
        textmarket: '',
        texttype: '',
        department: '',
        inputtitle: '',
        inputweb: ''
      }
    }
  },
  computed: {},
  mounted() {
    var that = this
    var time = new Date()
    that.lastlogin = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    request({
      method: 'get',
      url: '/seller/usr_UsrSupplier_selSupplier'
    }).then(function(response) {
      var data = response.data
      if (data.ret === 1) {
        if (data.status === 1) {
          that.useraccount = '已审核'
        } else {
          that.useraccount = '未审核'
        }
        data = data.result
        that.logourl = data.logo
        that.userimageUrl = data.headPic
        that.form.inputweb = data.website
        that.username = data.loginName
        that.shopname = data.name
        that.gongsi = data.companyType
        that.inputaddress = JSON.parse(data.location)
        that.form.inputpower = JSON.parse(data.production)
        that.form.inputnums = JSON.parse(data.developer)
        that.form.inputstaffs = JSON.parse(data.totalEmployees)
        that.form.inputyearnum = JSON.parse(data.annualSales)
        that.form.textmarket = JSON.parse(data.top3Markets)
        that.form.texttype = JSON.parse(data.materials)
        that.form.department = JSON.parse(data.department)
        that.form.inputtitle = JSON.parse(data.jobTitle)
      }
    }
    ).catch(function(error) {
      console.log(error)
    })
  },
  methods: {
    image(v) {
      return store.getters.ImageBaseUrl + v
    },
    userSuccess(res, file) {
      if (res.ret === 0) {
        alert(res.msg)
      } else {
        this.userimageUrl = res.result.url
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.ret === 0) {
        alert(res.msg)
      } else {
        this.logourl = res.result.url
      }
      // if (res.ret === 1) {
      //   request({
      //     method: 'post',
      //     url: '/seller/usr_UsrSupplier_updLogo',
      //     data: {
      //       'logo': this.logourl,
      //       'bean.rowVersion': ''
      //     }
      //   }).then(function(res) {
      //     console.log(res)
      //   })
      // }
    },
    update() {
      const self = this
      self.$refs.editInfoForm.validate(function(e) {
        if (!e) {
          self.$message({
            message: '请将表单填写完整',
            type: 'error'
          })
        } else {
          request({
            url: '/seller/usr_UsrSupplier_upAccount',
            method: 'post',
            data: {
              'asv.productionCapacity': JSON.stringify(self.form.inputpower),
              'asv.totalProduction':
                JSON.stringify(self.form.inputnums),
              'asv.numberEmployees':
                JSON.stringify(self.form.inputstaffs),
              'asv.annualSalesFigure':
                JSON.stringify(self.form.inputyearnum),
              'asv.thirdMarket':
                JSON.stringify(self.form.textmarket),
              'asv.materialSelection':
                JSON.stringify(self.form.texttype),
              'asv.avatar':
              self.userimageUrl,
              'asv.logo':
              self.logourl,
              'asv.department':
                JSON.stringify(self.form.department),
              'asv.jobTitle':
                JSON.stringify(self.form.inputtitle),
              'asv.website':
              self.form.inputweb
            }
          }).then(data => {
            self.$message({
              type: 'success',
              message: '修改成功'
            })
          })
            .catch(err => {
              self.$message({
                type: 'error',
                message: '修改失败'
              })
            })
        }
      })
    },
    image(v) {
      if (v) {
        return store.getters.ImageBaseUrl + v
      }
      return '沒有圖片'
    },
    updPwd: function() {
      console.log(this.numberValidateForm.newpassw === this.numberValidateForm.oldpassw)
      console.log(this.numberValidateForm.newpassw)
      console.log(this.numberValidateForm.oldpassw)
      var reg = /[a-z0-9]{8,15}/
      if (this.numberValidateForm.oldpassw === '' || this.numberValidateForm.newpassw === '' || this.numberValidateForm.checkpassw === '') {
        alert('密码不能为空')
        return
      } else if (this.numberValidateForm.newpassw === this.numberValidateForm.oldpassw) {
        alert('新密码不能与原密码一致')
        return
      } else if (!reg.test(this.numberValidateForm.newpassw)) {
        alert('密码不能小于8位')
        return
      } else if (this.numberValidateForm.newpassw === this.numberValidateForm.checkpassw) {
        request({
          method: 'post',
          url: '/seller/usr_UsrSupplier_UpdPwd',
          data: {
            oldPwd: this.numberValidateForm.oldpassw,
            newPwd: this.numberValidateForm.newpassw,
            checkpwd: this.numberValidateForm.checkpassw
          }
        }).then(function(response) {
          var data = response.data
          if (data.ret === 1) {
            alert('密码修改成功')
          } else {
            alert(data.msg)
          }
        }).catch(function(error) {
          console.log(error)
        })
      } else {
        alert('请重新确认密码')
      }
    }
  }
}
</script>
<style scoped>
  .main {
    padding: 20px;
  }

  .el-card {
    margin-bottom: 20px;
  }

  /deep/ .el-upload-list__item-thumbnail {
    object-fit: contain;
  }

  .img-contain {
    object-fit: contain;
  }

  /* 头像上传 样式 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>
