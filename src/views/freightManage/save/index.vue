<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <el-form ref="form" :model="status" label-width="150px">
        <el-form-item
          :rules="[
            { required: true, message: '快递公司不可为空',
              trigger: ['blur','change']
            },{
              max: 50,
              message: '长度不能大于50字符', trigger: ['blur','change']
            },{
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9\s]+$/,
              message: '快递公司只能为数字/字母，不含特殊符号', trigger: ['blur','change']}
          ]"
          prop="company"
          label="快递公司"
          placeholder="快递公司"
        >
          <el-input v-model="status.company"/>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: 'LOGO不可为空'}
          ]"
          label="LOGO"
          placeholder="Logo"
        >
          <!--:before-upload="beforeAvatarUpload"-->
          <el-upload
            :show-file-list="false"
            :on-success="uploadSuccess"
            class="avatar-uploader"
            action="/seller/plt_PltFreightSeller_upload">
            <img v-if="status.logo" :src="_logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
          <div class="el-upload__tip">请上传pdf、png、jpg及jpeg格式图片(建议分辨率150*150)</div>
        </el-form-item>
        <el-form-item
          :rules="[{
            pattern: /^[a-zA-Z]*[0-9]*[\x21-\x7e]*$/,
            message: '请填写数字/字母/符号'
          }
          ]"
          prop="expressUrl"
          label="查询快递单号地址"
          placeholder="查询快递单号地址"
        >
          <el-input v-model="status.expressUrl"/>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '排序优先级不可为空'},
            { max: 5,message: '长度不能大于5字符', trigger: 'blur'},
            {
              pattern: /^[0-9]*$/,
              message: '排序优先级只能为数字'}
          ]"
          prop="sort"
          label="排序优先级"
          placeholder="排序优先级"
        >
          <el-input v-model="status.sort"/>
        </el-form-item>
        <el-form-item
          label="启用"
        >
          <el-radio-group v-model="status.enabled">
            <el-radio-button :label="0">停用</el-radio-button>
            <el-radio-button :label="1">启用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="使用接口"
        >
          <el-radio-group v-model="status.useInterface">
            <el-radio-button :label="0">停用</el-radio-button>
            <el-radio-button :label="1">启用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="计算方式"
        >
          <el-radio-group v-model="status.type">
            <el-radio-button :label="0">重量</el-radio-button>
            <el-radio-button :label="1">体积</el-radio-button>
            <el-radio-button :label="2">件数</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '计算范围不可为空'}
          ]"
          label="范围"
        >
          <!--<el-col :span="11">-->
          <el-form-item
            :rules="[
              { required: true, message: '计算范围不可为空'}
            ]"
            prop="weightMin"
            style="float: left;"
          >
            <el-input-number v-model="status.weightMin" :min="0" size="medium"/>
          </el-form-item>
          <!--</el-col>-->

          <!--<el-col :span="2">-->
          <span style="float: left;width: 50px; text-align: center;"> 到 </span>
          <!--</el-col>-->

          <!--<el-col :span="11">-->
          <el-form-item
            :rules="[
              { required: true, message: '计算范围不可为空'}
            ]"
            prop="weightMax"
            style="float: left;"
          >
            <el-input-number v-model="status.weightMax" :min="0" size="medium"/>
          </el-form-item>
          <!--</el-col>-->
        </el-form-item>
        <el-button type="primary" @click="save">完成</el-button>
        <el-button type="primary">取消</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  name: 'FreightManageSave',
  data() {
    return {
      title: '修改',
      status: {
        pkey: 0,
        company: '',
        logo: '',
        expressUrl: '',
        sort: 0,
        enabled: 1,
        useInterface: 0,
        type: 0,
        weightMin: 0,
        weightMax: 0
      }
    }
  }, computed: {
    _logo() {
      return store.getters.ImageBaseUrl + this.status.logo
    }
  }, mounted() {
    const self = this
    if (this.$route.query.id) {
      request({
        url: '/seller/plt_PltFreightSeller_load',
        method: 'get',
        params: {
          pkey: this.$route.query.id
        }
      }).then(value => {
        self.status = value.data
      })
    } else {
      self.title = '添加'
    }
  }, methods: {
    uploadSuccess: function(response, file, fileList) {
      const self = this
      if (response.ret && response.ret === 1) {
        self.status.logo = response.result.url
      }
    },
    save: function() {
      const self = this
      let _url = '/seller/plt_PltFreightSeller_upd'
      if (!this.$route.query.id) {
        _url = '/seller/plt_PltFreightSeller_ins'
      }
      const data = {}
      for (const key in this.status) {
        if (key === 'supplier') {
          this.status[key] = this.status[key].split('##')[0]
        }
        data['bean.' + key] = this.status[key]
      }
      request({
        url: _url,
        method: 'post',
        data: data
      }).then(value => {
        if (value.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          self.$router.go(-1)
          self.$store.dispatch('delVisitedViews', self.$route)
        } else {
          this.$message({
            type: 'error',
            message: value.data.msg
          })
        }
        if (value.data.ret == 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          self.$router.go(-1)
          self.$store.dispatch('delVisitedViews', self.$route)
        } else {
          this.$message({
            type: 'error',
            message: value.data.msg
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
