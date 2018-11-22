<template>
  <div class="main">
    <el-form ref="supplier" v-model="supplier" :label-position="labelPosition" label-width="120px">
      <!--公司基本信息-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="title">公司基本信息
            <i class="el-icon-caret-top" @click="slide('companyInfo',$event)"> <span
              class="companyInfo">收起</span></i>
          </div>
        </div>
        <div id="companyInfo">
          <el-row :gutter="gutter">
            <el-col :md="12" :sm="24">
              <el-form-item label="公司名称">
                <el-input v-model="supplier.name" :disabled="flag"/>
                <!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="企业性质">
                <el-input v-model="supplier.companyNature"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="企业类型">
                <el-input v-model="supplier.companyType"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="公司官网地址">
                <el-input v-model="supplier.webSite"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="公司所在地">
                <el-row :gutter="10">
                  <el-col :md="6" :sm="12" class="mb15-md-and-down">
                    <el-form-item>
                      <el-cascader
                        :disabled="flag"
                        :options="countries"
                        :props="props"
                        v-model="generalAddress"
                        style="width:100%;"
                        @active-item-change="handleItemChange"/>
                    </el-form-item>
                  </el-col>

                  <el-col :md="6" :sm="12" class="mb15-md-and-down">
                    <el-form-item>
                      <el-input :disabled="flag" v-model="supplier.city" placeholder="请输入城市"/>
                    </el-form-item>
                  </el-col>
                  <!-- v-model="form.name" -->
                  <el-col :md="12" :sm="24">
                    <el-form-item>
                      <el-input :disabled="flag" v-model="supplier.companyAddr" placeholder="请输入详细地址"/>
                    </el-form-item>
                  </el-col>
                  <!-- v-model="form.name" -->
                </el-row>
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="公司电话">
                <el-input :disabled="flag" v-model="supplier.telephone"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="公司邮箱">
                <el-input :disabled="flag" v-model="supplier.email"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="公司传真">
                <el-input v-model="supplier.fax"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="注册资金">
                <el-input :disabled="flag" v-model="supplier.registeredCapital"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="企业成立时间">
                <el-date-picker
                  :disabled="flag"
                  v-model="supplier.companyEstablishTime"
                  type="date"
                  style="width: 100%;"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"/>
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="业务期限">
                <el-input v-model="supplier.operationTerm"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="主要销售区">
                <el-input v-model="supplier.mainSalesArea"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="主要产品">
                <el-input v-model="supplier.mainProd"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="生产模式">
                <el-input v-model="supplier.prodPattern"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="备注">
                <el-input v-model="supplier.des"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="公司信用代码">
                <el-input v-model="supplier.creditCode"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="QQ">
                <el-input v-model="supplier.qq"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="营业执照是否长期">
                <el-radio-group v-model="supplier.businessLicenseIsSecular" :disabled="flag"> <!--secularFlag-->
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!--:picker-options="pickerOptions2"-->
            <el-col :md="12" :sm="24">
              <el-form-item label="营业执照有效期">
                <el-date-picker
                  v-model="businessLicenseTime"
                  :disabled="flag"
                  style="width: 100%;"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="法定代表人/首席执行官">
                <el-input :disabled="flag" v-model="supplier.entity"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="纳税人类型">
                <el-input v-model="supplier.taxpayerType"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="法人身份证号码">
                <el-input :disabled="flag" v-model="supplier.idCard"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="法人身份证照片">
                <el-upload
                  :disabled="flag"
                  :limit="2"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :file-list="entityPhoto"
                  class="no-add-btn"
                  action="/seller/pdt_PdtProduct_upload?widthLimit=0"
                  accept="image/jpeg,image/gif,image/png"
                  list-type="picture-card"><!--上传图片超出两张隐藏上传框-->
                  <i class="el-icon-plus"/>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img :src="dialogImageUrl" width="100%" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!--运营信息-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <legend class="title">运营信息<i class="el-icon-caret-top" @click="slide('service',$event)"> <span
            class="service">收起</span></i></legend>
        </div>
        <div id="service">
          <el-row :gutter="gutter">
            <el-col :md="24">
              <el-form-item label="联系人头像">
                <!--<el-upload-->
                <!--:disabled="flag"-->
                <!--:show-file-list="false"-->
                <!--:on-success="(res,file)=>{return handleSuccess(res,file,'head')}"-->
                <!--:before-upload="beforeAvatarUpload"-->
                <!--class="avatar-uploader"-->
                <!--action="/seller/pdt_PdtProduct_upload?widthLimit=0"-->
                <!--accept="image/jpeg,image/gif,image/png">-->
                <!--<img v-if="head" :src="head" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon el-upload"/>-->
                <!--</el-upload>-->
                <img
                  :src="head?head:'/seller/static/admin/images/blank.gif'"
                  class="avatar"
                  @click="showBigPic">
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="联系人">
                <el-input v-model="supplier.contacts"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="联系人部门">
                <el-input v-model="supplier.department"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="联系人职称">
                <el-input v-model="supplier.jobTitle"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="手机">
                <el-input v-model="supplier.phone"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="结算开户行">
                <el-input v-model="supplier.settlementBank"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="银行账号">
                <el-input v-model="supplier.bankAccount"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="银行开户行">
                <el-input v-model="supplier.bankBranch"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="开户行所在地">
                <el-cascader
                  v-model="bankAddress"
                  :options="countries"
                  :props="props"
                  filterable
                  style="width: 100%;"
                  @active-item-change="handleItemChange"
                />
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="运营负责人身份证号码">
                <el-input v-model="supplier.operateIdCard"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="运营负责人身份证照片">
                <el-upload
                  :disabled="flag"
                  :limit="2"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :file-list="contactsPhoto"
                  class="no-add-btn"
                  action="/seller/pdt_PdtProduct_upload?widthLimit=0"
                  accept="image/jpeg,image/gif,image/png"
                  list-type="picture-card">
                  <i class="el-icon-plus"/>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!--平台店铺相关信息-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <legend class="title">平台店铺相关信息
            <i class="el-icon-caret-top" @click="slide('other',$event)"> <span class="other">收起</span></i>
          </legend>
        </div>
        <div id="other">
          <el-row :gutter="gutter">
            <el-col :md="24" :sm="24">
              <!-- <el-form-item :style="{width:getWidth(tabLength)}" label="网站显示名称"> -->
              <el-form-item :style="{width:getWidth(tabLength)}" label="网站显示名称">
                <template>
                  <el-tabs v-model="activeName" style="width: 80%" @tab-click="handleClick">
                    <el-tab-pane v-for="language in languages" :label="language.displayName">
                      <el-input
                        v-model="showName[language.shortName]"
                        :placeholder="language.displayName"/>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="店铺关键字">
                <el-input v-model="supplier.seoTitle"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="搜索引擎说明">
                <el-input v-model="supplier.seoContent"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="认证状态">
                <el-radio-group v-model="supplier.isAuth" :disabled="flag"><!--authFlag-->
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="认证时间">
                <el-input :disabled="flag" v-model="supplier.authTime"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!--资质证书-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <legend class="title">资质证书
            <i class="el-icon-caret-top" @click="slide('datum',$event)"> <span class="datum">收起</span></i>
          </legend>
        </div>
        <div id="datum">
          <el-row :gutter="gutter">
            <el-col :sm="12">
              <el-form-item label="营业执照">
                <!--<el-upload-->
                <!--:disabled="flag"-->
                <!--:show-file-list="false"-->
                <!--:on-success="(res,file)=>{return handleSuccess(res,file,'certPhoto')}"-->
                <!--:before-upload="beforeAvatarUpload"-->
                <!--class="avatar-uploader"-->
                <!--action="/seller/pdt_PdtProduct_upload?widthLimit=0"-->
                <!--accept="image/jpeg,image/gif,image/png">-->
                <!--<img v-if="certPhoto" :src="certPhoto" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon el-upload"/>-->
                <!--</el-upload>-->
                <img
                  :src="certPhoto?certPhoto:'/seller/static/admin/images/blank.gif'"
                  class="avatar"
                  @click="showBigPic">
              </el-form-item>
            </el-col>

            <el-col :sm="12">
              <el-form-item label="合作凭证">
                <!--<el-upload-->
                <!--:disabled="flag"-->
                <!--:show-file-list="false"-->
                <!--:on-success="(res,file)=>{return handleSuccess(res,file,'coopCertPhoto')}"-->
                <!--:before-upload="beforeAvatarUpload"-->
                <!--class="avatar-uploader"-->
                <!--action="/seller/pdt_PdtProduct_upload?widthLimit=0"-->
                <!--accept="image/jpeg,image/gif,image/png">-->
                <!--<img v-if="coopCertPhoto" :src="coopCertPhoto" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon el-upload"/>-->
                <!--</el-upload>-->
                <img
                  :src="coopCertPhoto?coopCertPhoto:'/seller/static/admin/images/blank.gif'"
                  class="avatar"
                  @click="showBigPic">
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!--营销设置-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <legend class="title">营销设置
            <i class="el-icon-caret-top" @click="slide('setup',$event)"> <span class="setup">收起</span></i>
          </legend>
        </div>
        <div id="setup">
          <el-row :gutter="gutter">
            <el-col :md="12" :sm="24">
              <el-form-item label="跟踪代码">
                <el-input v-model="supplier.traceCode"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>

            <el-col :md="12" :sm="24">
              <el-form-item label="自定义链接名称">
                <el-input v-model="supplier.webSizeTitle"/><!-- v-model="form.name" -->
              </el-form-item>
            </el-col>
            <!--暂时不要-->
            <!--<el-col :md="12" :sm="24">-->
            <!--<el-form-item label="第三方统计地址">-->
            <!--<el-input v-model="supplier.tongjiUrl"/>&lt;!&ndash; v-model="form.name" &ndash;&gt;-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :md="12" :sm="24">-->
            <!--<el-form-item label="第三方统计密码">-->
            <!--<el-input v-model="supplier.tongjiPwd"/>&lt;!&ndash; v-model="form.name" &ndash;&gt;-->
            <!--</el-form-item>-->
            <!--</el-col>-->
          </el-row>
        </div>
      </el-card>

      <el-form-item class="text-center">
        <div class="button">
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            type="primary"
            class="el-button"
            @click="submitForm">修 改
          </el-button><!-- @click="onSubmit" -->
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'SupplierInfo',
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: 'top',
      gutter: 20,
      categories: [],
      countries: [],
      supplier: {},
      props: {
        label: 'name',
        value: 'pkey',
        children: 'provinces'
      },
      selectedCategory: '',
      generalAddress: [],
      businessLicenseTime: [],
      secularFlag: null,
      entityPhoto: [],
      head: '',
      bankAddress: [],
      contactsPhoto: [],
      authFlag: null,
      certPhoto: '',
      coopCertPhoto: '',
      flag: true,
      dialogImageUrl: '',
      dialogVisible: false,
      languages: [],
      tabLength: 0,
      showName: {},
      activeName: 'second',
      // pickerOptions2: {
      //   shortcuts: [{
      //     text: '最近一周',
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }, {
      //     text: '最近一个月',
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }, {
      //     text: '最近三个月',
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }]
      // },
      imageUrl: ''
    }
  },
  beforeCreate: function() {
    this.post = function(url, data, then, error) {
      request({
        method: 'POST',
        url: url,
        data: Qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(then => {
        console.log(then)
      }).catch(error)
    }
    this.get = function(url, parm, then, error) {
      request.get(url, {
        params: parm
      }).then(then).catch(error)
    }
  },
  mounted: function() {
    const _this = this
    // supplier对象
    this.get('/seller/usr_UsrSupplier_loadOnlineSup', null, function(res) {
      console.log('res')
      _this.$set(_this, 'supplier', res.data)
      _this.$set(_this, 'selectedCategory', Number(res.data.category.split('##')[0]))
      // 公司所在地
      const country = Number(res.data.country.split('##')[0])
      const province = Number(res.data.province.split('##')[0])
      _this.generalAddress.push(country)
      _this.generalAddress.push(province)
      // 营业执照时间
      const beginTime = new Date(res.data.businessLicenseBeginTime)
      const endTime = new Date(res.data.businessLicenseEndTime)
      _this.businessLicenseTime.push(beginTime)
      _this.businessLicenseTime.push(endTime)
      // 营业执照是否长期
      switch (res.data.businessLicenseIsSecular) {
        case 1:
          _this.secularFlag = true
          break
        case 0:
          _this.secularFlag = false
          break
        default:
          _this.secularFlag = false
      }
      // 法人身份证
      const idCardFrontPhoto = {}
      idCardFrontPhoto.url = res.data.idCardFrontPhoto
      idCardFrontPhoto.name = '身份证正面'

      const idCardBackPhoto = {}
      idCardBackPhoto.url = res.data.idCardBackPhoto
      idCardBackPhoto.name = '身份证反面'

      _this.entityPhoto.push(idCardFrontPhoto)
      _this.entityPhoto.push(idCardBackPhoto)
      // 联系人头像
      _this.head = res.data.headPic
      // 银行国家省份
      const bankCountry = Number(res.data.bankCountry.split('##')[0])
      const bankProvince = Number(res.data.bankProvince.split('##')[0])
      _this.bankAddress.push(bankCountry)
      _this.bankAddress.push(bankProvince)
      // 联系人身份证
      const contactsFrontPhoto = {}
      contactsFrontPhoto.url = res.data.contactsIdCardFrontPhoto
      contactsFrontPhoto.name = '身份证正面'

      const contactsCardBackPhoto = {}
      contactsCardBackPhoto.url = res.data.contactsIdCardBackPhoto
      contactsCardBackPhoto.name = '身份证反面'

      _this.contactsPhoto.push(contactsFrontPhoto)
      _this.contactsPhoto.push(contactsCardBackPhoto)

      // 认证状态
      switch (res.data.isAuth) {
        case 1:
          _this.authFlag = true
          break
        case 0:
          _this.authFlag = false
          break
        default:
          _this.authFlag = false
      }

      // 资质证书
      _this.certPhoto = res.data.certPhoto
      // 合作凭证
      _this.coopCertPhoto = res.data.coopCertPhoto

      // 语言集合
      _this.get('/seller/plt_PltConfig_enabledLanguage', null, function(res) {
        _this.$set(_this, 'languages', res.data)
        _this.$set(_this, 'tabLength', res.data.length)
        for (const i in _this.languages) {
          for (const key in _this.languages[i]) {
            if (key == 'shortName') {
              _this.showName[_this.languages[i][key]] = ''
            }
          }
        }

        const showname = _this.supplier.showname
        for (const key in showname) {
          _this.showName[key] = showname[key]
        }
      }, function(err) {
        console.log(err)
      })
    }, function(err) {
      console.log(err)
    })
    // 国家集合
    this.get('/home/plt_PltCountry_countries', null, function(res) {
      _this.$set(_this, 'countries', res.data.items)
    }, function(err) {
      console.log(err)
    })
    // supplier分类集合
    this.get('/seller/usr_UsrSupplierCategory_listTop', null, function(res) {
      _this.$set(_this, 'categories', res.data.result)
    }, function(err) {
      console.log(err)
    })
  },
  methods: {
    getSupType: function() {
      return 1
    },
    showBigPic: function(e) {
      this.dialogVisible = true
      this.dialogImageUrl = e.currentTarget.src
    },
    getWidth: function(width) {
      return width * 100 + 'px'
    },
    handleItemChange(val) {
      setTimeout(_ => {
      }, 300)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleClick(tab, event) {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleCoopCertPhotoSuccess(res, file) {
      this.coopCertPhoto = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    slide: function(data, e) {
      var target = $('#' + data).closest('.el-card__body')
      if ($('#' + data).is(':visible')) {
        // 可见
        target.slideUp('slow', 'swing', function() {
          target.addClass('p0')
        })
        $(e.currentTarget).removeClass('el-icon-caret-top').addClass('el-icon-caret-bottom').children('span').text('展开')
      } else {
        // 不可见
        target.removeClass('p0')
        target.slideDown('slow')
        $(e.currentTarget).removeClass('el-icon-caret-bottom').addClass('el-icon-caret-top').children('span').text('收起')
      }
    },
    submitForm: function() {
      const _this = this
      if (_this.showName['en'].trim() == '') {
        _this.$message({
          message: '【网站显示名称】中,英语语种必填',
          type: 'warning'
        })
        return
      } else if (_this.showName['zh_TW'].trim() == '') {
        _this.$message({
          message: '【网站显示名称】中,繁体中文必填',
          type: 'warning'
        })
        return
      } else if (_this.showName['zh_CN'].trim() == '') {
        _this.$message({
          message: '【网站显示名称】中,简体中文必填',
          type: 'warning'
        })
        return
      }
      const param = _this.initForm()
      console.log('param', param)

      _this.fullscreenLoading = true
      setTimeout(() => {
        _this.fullscreenLoading = false
      }, 2000)

      request({
        url: '/seller/usr_UsrSupplier_updInfo',
        method: 'post',
        data: param
      }).then(res => {
        if (res.data.ret == 1) {
          this.$message({
            message: '修改成功',
            type: 'success',
            center: true
          })
          _this.load()
        } else {
          this.$message({
            message: '修改失败',
            type: 'warning',
            center: true
          })
        }
        _this.fullscreenLoading = false
      }).catch(err => {
        _this.fullscreenLoading = false
        console.log(err)
      })
    },
    initForm: function() {
      const _this = this
      const param = {}
      param['bean.pkey'] = _this.supplier.pkey
      param['bean.companyNature'] = _this.supplier.companyNature
      param['bean.companyType'] = _this.supplier.companyType
      param['bean.webSite'] = _this.supplier.webSite
      param['bean.fax'] = _this.supplier.fax
      param['bean.operationTerm'] = _this.supplier.operationTerm
      param['bean.mainSalesArea'] = _this.supplier.mainSalesArea
      param['bean.mainProd'] = _this.supplier.mainProd
      param['bean.prodPattern'] = _this.supplier.prodPattern
      param['bean.des'] = _this.supplier.des
      param['bean.creditCode'] = _this.supplier.creditCode
      param['bean.qq'] = _this.supplier.qq
      param['bean.taxpayerType'] = _this.supplier.taxpayerType
      param['bean.contacts'] = _this.supplier.contacts
      param['bean.phone'] = _this.supplier.phone
      param['bean.seoTitle'] = _this.supplier.seoTitle
      param['bean.showName'] = _this.supplier.showName
      param['bean.seoContent'] = _this.supplier.seoContent
      param['bean.traceCode'] = _this.supplier.traceCode
      param['bean.webSizeTitle'] = _this.supplier.webSizeTitle
      param['bean.tongjiUrl'] = _this.supplier.tongjiUrl
      param['bean.tongjiPwd'] = _this.supplier.tongjiPwd
      param['bean.department'] = _this.supplier.department
      param['bean.jobTitle'] = _this.supplier.jobTitle
      param['showName'] = JSON.stringify(_this.showName)
      param['bean.category'] = _this.selectedCategory
      param['bean.bankCountry'] = _this.bankAddress[0]
      param['bean.bankProvince'] = _this.bankAddress[1]
      param['bean.headPic'] = _this.head
      param['bean.coopCertPhoto'] = _this.coopCertPhoto
      param['bean.settlementBank'] = _this.supplier.settlementBank
      param['bean.bankAccount'] = _this.supplier.bankAccount
      param['bean.bankBranch'] = _this.supplier.bankBranch
      param['bean.bankCountry'] = _this.bankAddress[0]
      param['bean.bankProvince'] = _this.bankAddress[1]
      param['bean.businessLicenseIsSecular'] = _this.supplier.businessLicenseIsSecular
      param['bean.isAuth'] = _this.supplier.isAuth
      return param
    },
    handleSuccess: function(response, file, photo) {
      const _this = this
      if (response.ret != 1 || response.result.state != 'SUCCESS') {
        this.$notify({
          title: '提示',
          message: '网络错误建议重新上传'
        })
        return
      }
      if (response.result.state != 'SUCCESS') {
        this.$notify({
          title: '提示',
          message: '未知错误'
        })
      } else {
        _this[photo] = response.result.url
      }
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
  .main {
    padding: 20px;
  }

  /* form-item中，嵌套着响应式布局时，自定义margin */
  @media only screen and (max-width: 992px) {
    .mb15-md-and-down {
      margin-bottom: 15px;
    }
  }

  /* card标题 */
  .title {
    font-size: 20px;
    font-weight: 300;
    width: 100%;
    color: #5d6575;
  }

  /* card标题 - 右侧点击下拉按钮*/
  .title i {
    float: right;
    display: inline-block;
    font-size: 16px;
    font-weight: lighter;
  }

  /*.row .el-form-item .el-form-item__label {
    line-height: 30px;
    font-size: 18px;
    font-weight: 300;
    display: inline-block;
    width: 100%;
  } */

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

  .no-add-btn /deep/ .el-upload {
    display: none;
  }

  /* /deep/ .el-form-item--medium .el-form-item__label {
    font-size: 18px;
    line-height: 30px;
    font-weight: 300;
    display: inline-block;
    width: 100%;
    color: #5d6575;
  } */

  /deep/ .el-card__body.p0 {
    padding: 0;
  }

  .el-card {
    margin-bottom: 20px;
  }
</style>
