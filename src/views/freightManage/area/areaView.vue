<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <el-form ref="form" :model="status" label-width="150px">
        <el-form-item
          label="快递公司"
          placeholder="快递公司"
        >
          <el-input :value="company" disabled/>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '配送区域名称不可为空',
              trigger: ['blur']
            },{
              max: 50,
              message: '长度不能大于50字符', trigger: ['blur','change']
            }
          ]"
          prop="section"
          label="区域名称"
          placeholder="区域名称"
        >
          <el-input v-model="status.section"/>
        </el-form-item>
        <el-form-item
          label="简介"
          placeholder="简介"
        >
          <el-input v-model="status.brief"/>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '免费额度不可为空'
            }
          ]"
          prop="free"
          label="免费额度"
        >
          <el-switch
            v-model="status.free"
            :inactive-value="0"
            :active-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="test"
          />
          <el-form-item
            :rules="[
              { required: true, message: '免费金额不可为空',
                trigger: ['blur','change']
              }
            ]"
            prop="freePrice"
          >
            <el-input-number v-if="status.free==1" v-model="status.freePrice" :min="0" label="描述文字"/>
          </el-form-item>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '附加费用不可为空',
              trigger: ['blur']
            }
          ]"
          prop="extraPrice"
          label="附加费用"
        >
          <el-input v-model.number="status.extraPrice"><i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="运费计算方式"
          placeholder="运费计算方式"
        >
          <el-input :value="jstype" disabled/>
        </el-form-item>
        <el-form-item
        v-if="jstype=='重量'"
        label="首重重量"
        placeholder="首重重量">
        <el-input v-model="status.weightSection"><i slot="suffix">KG</i></el-input>
      </el-form-item>
        <el-form-item
          v-if="jstype=='重量'"
          label="续重重量"
          placeholder="续重重量"
        >
          <el-input v-model="status.aggravateSection">
            <i slot="suffix">KG</i>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='重量'"
          label="首重价格"
          placeholder="首重价格"
        >
          <el-input v-model="status.weightPrice">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='重量'"
          label="续重价格"
          placeholder="续重价格"
        >
          <el-input v-model="status.aggravatePrice">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item
        v-if="jstype=='件数'"
        label="首寄件数"
        placeholder="首寄件数">
        <el-input v-model="status.weightSection"><i slot="suffix">件</i></el-input>
      </el-form-item>
        <el-form-item
          v-if="jstype=='件数'"
          label="续寄件数"
          placeholder="续寄件数"
        >
          <el-input v-model="status.aggravateSection">
            <i slot="suffix">件</i>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='件数'"
          label="首寄价格"
          placeholder="首寄价格"
        >
          <el-input v-model="status.weightPrice">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='件数'"
          label="续寄价格"
          placeholder="续寄价格"
        >
          <el-input v-model="status.aggravatePrice">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='体积'"
          label="首寄体积"
          placeholder="首寄体积">
          <el-input v-model="status.weightSection"><i slot="suffix">件</i></el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='体积'"
          label="首寄价格"
          placeholder="首寄价格"
        >
          <el-input v-model="status.aggravateSection">
            <i slot="suffix">件</i>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='体积'"
          label="续寄体积"
          placeholder="续寄体积"
        >
          <el-input v-model="status.weightPrice">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="jstype=='体积'"
          label="续寄价格"
          placeholder="续寄价格"
        >
          <el-input v-model="status.aggravatePrice">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-button @click="save">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'AreaView',
  props: {
    title: {
      type: String,
      default: 'No Data'
    },
    company: {
      type: String,
      default: 'No Data'
    },
    id: {
      type: Number,
      default: -1
    },
    jstype: {
      type: String,
      default: ''
    },
    mainId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      status: {
        aggravatePrice: 0,
        aggravateSection: 0,
        brief: '',
        extraPrice: 0,
        free: 0,
        freePrice: 0,
        weightPrice: 0,
        weightSection: 0
      }
    }
  }, watch: {
    'id': function(n, o) {
      if (n < 0) {
        this.status = {
          aggravatePrice: 0,
          aggravateSection: 0,
          brief: '',
          extraPrice: 0,
          free: 0,
          freePrice: 0,
          weightPrice: 0,
          weightSection: 0
        }
      } else {
        this.load()
      }
    }
  }, mounted() {
    this.load()
  }, methods: {
    test: function() {
      this.status.freePrice = 0
    },
    save: function() {
      const self = this
      const data = {}
      let url = '/seller/plt_PltFreightSellerLine_upd'
      if (self.status.main) {
        self.status.main = self.status.main.split('##')[0]
      } else {
        url = '/seller/plt_PltFreightSellerLine_ins'
        self.status['main'] = self.mainId
      }
      for (const key in self.status) {
        data['bean.' + key] = (self.status[key])
      }
      request({
        url: url,
        method: 'post',
        data: data
      }).then(value => {
        if (value.data.ret === 1) {
          self.$alert('完成')
        }
        self.reload()
        self.load()
      })
    },
    reload: function() {
      console.log('wdwa ')
      this.$emit('load')
    },
    load: function() {
      const self = this
      request({
        url: '/seller/plt_PltFreightSellerLine_load',
        method: 'get',
        params: {
          pkey: self.id
        }
      }).then(value => {
        self.status = value.data
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
