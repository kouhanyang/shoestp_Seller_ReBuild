<template>
  <div v-loading="loading" class="main">
    <div v-for="(d,index) in setting" :setting="d" :key="d.name" class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ d.name }}</span>
        </div>
        <el-form ref="form" :model="d" label-width="150px">
          <el-form-item label="启用">
            <el-switch
              v-model="d.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="InitValidate(d)"
            />
          </el-form-item>
          <!--{{ d }}-->

          <div v-if="d.enabled">
            <el-form-item
              v-for="(dd,_index) in d.setting"
              v-if="dd.label!=null"
              :key="_index"
              :label="dd.label"
              required
            >
              <el-input v-model="dd.value" @change="change(dd.name,dd.value)" @blur="change(dd.name,dd.value)"/>
              <label v-if="temp[dd.name]" style="color:red">不能为空</label>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
    <el-button type="primary" plain @click="submit">保存</el-button>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      loading: false,
      temp: {},
      setting: [
        {
          id: -1,
          mode: 5,
          name: this.getName('OFFINE_PAY'),
          enabled: false,
          poundage: 0,
          extra_costs: 0,
          setting: [
            {
              label: this.getName('ACCOUNT_NAME'),
              name: 'ACCOUNT_NAME',
              value: ''
            }, {
              label: this.getName('BANK_ACCOUNT'),
              name: 'BANK_ACCOUNT',
              value: ''
            }, {
              label: this.getName('DEPOS_IT_BANK_SUBBRANCH'),
              name: 'DEPOS_IT_BANK_SUBBRANCH',
              value: ''
            }, {
              label: this.getName('DEPOS_IT_BANK_SUBBRANCH_ASCRIPTION'),
              name: 'DEPOS_IT_BANK_SUBBRANCH_ASCRIPTION',
              value: ''
            }
          ]
        }, {
          id: -1,
          mode: 10,
          name: this.getName('TTPAY'),
          enabled: false,
          poundage: 0,
          extra_costs: 0,
          setting: [
            {
              label: this.getName('BENEFICIARYBANK'),
              name: 'BENEFICIARYBANK',
              value: ''
            }, {
              label: this.getName('SWIFTCODE'),
              name: 'SWIFTCODE',
              value: ''
            }, {
              label: this.getName('BRNEFICIARY'),
              name: 'BRNEFICIARY',
              value: ''
            }, {
              label: this.getName('BANKADDRESS'),
              name: 'BANKADDRESS',
              value: ''
            }, {
              label: this.getName('BENEFICIARYACCOUNT'),
              name: 'BENEFICIARYACCOUNT',
              value: ''
            }
          ]
        }
      ]

    }
  }, mounted() {
    const self = this
    request({
      url: 'seller/plt_PltPay_getPaySettings',
      params: {
        v: 2
      },
      methods: 'get'
    }).then(function(json) {
      json = json.data
      if (json.ret == 1) {
        json = json.result
        for (const value of json) {
          for (const key in self.setting) {
            if (value.mode === self.setting[key].mode) {
              for (const _key in value) {
                if (_key !== 'setting') {
                  self.setting[key][_key] = value[_key]
                } else {
                  const temp = []
                  const tempJ = JSON.parse(value[_key])
                  for (const __key in tempJ) {
                    temp.push(
                      {
                        label: self.getName(__key),
                        name: __key,
                        value: tempJ[__key]
                      }
                    )
                  }
                  self.setting[key][_key] = temp
                }
              }
            }
          }
        }
      }
    })
  }, methods: {
    getName: function(name) {
      const obj = {
        ACCOUNT_NAME: '结算开户人',
        TTPAY: 'TT支付',
        OFFINE_PAY: '现金支付',
        BANK_ACCOUNT: '银行账户',
        DEPOS_IT_BANK_SUBBRANCH: '开户银行支行名称',
        DEPOS_IT_BANK_SUBBRANCH_ASCRIPTION: '开户银行支行所在地,',
        BENEFICIARYBANK: 'BENEFICIARY BANK',
        SWIFTCODE: 'SWIFT CODE',
        BRNEFICIARY: 'BENEFICIARY',
        BANKADDRESS: 'BANK Address',
        BENEFICIARYACCOUNT: 'BENEFICIARY ACCOUNT'
      }
      if (obj[name.toUpperCase()]) { return obj[name.toUpperCase()] }
      return name
    },
    submit: function() {
      for (const tempKey in this.temp) {
        if (this.temp[tempKey] || this.temp[tempKey] === null) {
          this.$alert('请先填写内容')
          return
        }
      }
      const self = this
      self.loading = true
      request({
        url: '/seller/plt_PltPay_savePaySetting',
        method: 'POST',
        data: {
          paySetting: JSON.stringify(this.setting),
          v: 2
        }
      }).then(function(result) {
        self.loading = false
      })
    }, change: function(name, value) {
      if (value && value.length > 0) {
        this.$set(this.temp, name, false)
      } else {
        this.$set(this.temp, name, true)
      }
    }, InitValidate: function(value) {
      const self = this
      if (value.enabled) {
        value.setting.forEach(value1 => {
          if (value1.value && value1.value.length > 0) {
            self.$set(self.temp, value1.name, false)
          } else {
            self.$set(self.temp, value1.name, null)
          }
        })
      }
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 25px;
  }

  .card {
    padding-top: 25px;
    padding-bottom: 25px;
  }
</style>
