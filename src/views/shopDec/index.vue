<template slot-scope="scope">
  <div class="main">
    <el-form ref="editInfoForm" :model="json" label-width="160px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>店铺装修</span>
        </div>
        <el-form-item label="店铺类型：">
          <el-select v-model="storeType" placeholder="请选择店铺类型">
            <el-option
              v-for="item in storeTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="位置：" style="width: 50%;" prop="location">
          <el-input v-model="json.location" class="myinput"/>
        </el-form-item>
        <el-form-item
          :rules="[{
            min: 0,
            max: 50,
            message: '长度不得超过50个字符',trigger: 'blur'},{
              pattern: /^[a-zA-Z]*[0-9]*$/,
              message: '请填写数字或字母'
            }
          ]"
          label="生产能力："
          style="width: 50%;"
          prop="productionCapacity">
          <el-input v-model="json.productionCapacity" class="myinput" placeholder="请输入整数"/>
        </el-form-item>
        <el-form-item
          :rules="[{
            min: 0,
            max: 10,
            message: '长度不得超过10个字符',trigger: 'blur'},{
              pattern: /^[0-9]*$/,
              message: '请填写正确生产总数'
            }
          ]"
          label="生产总数："
          style="width: 50%;"
          prop="totalProduction">
          <el-input v-model="json.totalProduction" class="myinput" placeholder="请输入整数">
            <span slot="suffix">(人)</span>
          </el-input>
        </el-form-item>
        <el-form-item
          :rules="[{
            min: 0,
            max: 10,
            message: '长度不得超过10个字符',trigger: 'blur'},{
              pattern: /^[0-9]*$/,
              message: '请填写正确员工总数'
            }
          ]"
          label="员工总数："
          style="width: 50%;"
          prop="numberOfEmployees">
          <el-input v-model="json.numberOfEmployees" class="myinput" placeholder="请输入整数">
            <span slot="suffix">(人)</span>
          </el-input>
        </el-form-item>
        <el-form-item
          :rules="[{
            min: 0,
            max: 10,
            message: '长度不得超过10个字符',trigger: 'blur'},{
              pattern: /^[0-9]*$/,
              message: '请填写正确的数量'
            }
          ]"
          label="年销售量："
          style="width: 50%;"
          prop="annualSales">
          <el-input v-model="json.annualSales" class="myinput" placeholder="请输入整数">
            <span slot="suffix">(美元/年)</span>
          </el-input>
        </el-form-item>
        <el-form-item
          :rules="[{
                     min: 0,
                     max: 50,
                     message: '长度不得超过50个字符',trigger: 'blur'},
                   {
                     pattern: /^[a-zA-Z]*[\u4e00-\u9fa5]*$/,
                     message: '请填写字母或汉字'
                   }
          ]"
          label="第三市场："
          style="width: 50%;"
          prop="thirdMarket">
          <el-input v-model="json.thirdMarket" class="mytextarea" type="textarea" rows="5" resize="none"/>
        </el-form-item>
        <el-form-item
          :rules="[{
                     min: 0,
                     max: 50,
                     message: '长度不得超过50个字符',trigger: 'blur'},
                   {
                     pattern: /^[a-zA-Z]*[\u4e00-\u9fa5]*$/,
                     message: '请填写字母或汉字'
                   }
          ]"
          label="材料选择："
          style="width: 50%;"
          prop="materialSelection">
          <el-input v-model="json.materialSelection" class="mytextarea" type="textarea" rows="5" resize="none"/>
        </el-form-item>
        <el-form-item
          :rules="[{
                     min: 0,
                     max: 30,
                     message: '长度不得超过30个字符',trigger: 'blur'},
                   {
                     pattern: /^[a-zA-Z]*[\u4e00-\u9fa5]*$/,
                     message: '请填写字母或汉字'
                   }
          ]"
          label="部门："
          style="width: 50%;"
          prop="department">
          <el-input v-model="json.department" class="myinput"/>
        </el-form-item>
        <el-form-item
          :rules="[{
                     min: 0,
                     max: 30,
                     message: '长度不得超过30个字符',trigger: 'blur'},
                   {
                     pattern: /^[a-zA-Z]*[\u4e00-\u9fa5]*$/,
                     message: '请填写字母或汉字'
                   }
          ]"
          label="职称："
          style="width: 50%;"
          prop="jobTitle">
          <el-input v-model="json.jobTitle" class="myinput"/>
        </el-form-item>
        <el-form-item
          :rules="[{
                     min: 0,
                     max: 30,
                     message: '长度不得超过30个字符',trigger: 'blur'},
                   {
                     pattern: /^[a-zA-Z]*[0-9]*[\x21-\x7e]*$/,
                     message: '请填写数字/字母/符号'
                   }
          ]"
          label="网站："
          style="width: 50%;"
          prop="website">
          <el-input v-model="json.website" class="myinput"/>
        </el-form-item>
        <el-form-item label="国家：">
          <el-select v-model="country" placeholder="请选择国家">
            <el-option
              v-for="item in countryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="省份：">
          <el-select v-model="province" placeholder="请选择省份">
            <el-option
              v-for="item in provinceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[{
            min: 0,
            max: 30,
            message: '长度不得超过30个字符',trigger: 'blur'},
          ]"
          label="市："
          style="width: 50%;"
          prop="city">
          <el-input v-model="json.city" class="myinput"/>
        </el-form-item>
        <el-form-item label="供应商首页产品展示：">
          <el-radio v-model="radio" :label="1" class="myradio">是</el-radio>
          <el-radio v-model="radio" :label="0" class="myradio">否</el-radio>
        </el-form-item>
        <el-form-item label="广告图片上传：">
          <el-upload
            :limit="5"
            :file-list="adsPicturesShow"
            :class="{'no-add-btn':adsPicturesShow.length>4}"
            :on-success="adsPicturesSuccess"
            :before-upload="validatePidSzie"
            :on-remove="adsPicturesRemove"
            action="/seller/usr_UsrSupplier_upload"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item
          v-for="(abc,index) in json.advertisingLink"
          :rules="[{
                     min: 0,
                     max: 100,
                     message: '长度不得超过100个字符',trigger: 'blur'},
                   {
                     pattern: /^[a-zA-Z]*[0-9]*[\x21-\x7e]*$/,
                     message: '请填写数字/字母/符号'
                   }
          ]"
          :prop="'advertisingLink['+index+']'"
          label="广告链接："
          style="width: 50%;">
          <el-input
            v-model="json.advertisingLink[index]"
            class="myinput"
            placeholder="请输入链接"
            style="margin-top: 10px"/>
        </el-form-item>
        <el-form-item label="企业图片上传：">
          <el-upload
            :limit="5"
            :file-list="corporatePictureShow"
            :class="{'no-add-btn':corporatePictureShow.length>4}"
            :on-success="corporatePictureSuccess"
            :before-upload="validatePidSzie"
            :on-remove="corporatePictureRemove"
            action="/seller/usr_UsrSupplier_upload"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item
          v-for="(abc,index) in json.businessLink"
          :rules="[{
                     min: 0,
                     max: 100,
                     message: '长度不得超过100个字符',trigger: 'blur'},
                   {
                     pattern: /^[a-zA-Z]*[0-9]*[\x21-\x7e]*$/,
                     message: '请填写数字/字母/符号'
                   }
          ]"
          :v-for="(abc,index) in json.businessLink"
          :prop="'businessLink['+index+']'"
          label="企业链接："
          style="width: 50%;">
          <el-input
            v-model="json.businessLink[index]"
            class="myinput"
            placeholder="请输入链接"
            style="margin-top: 10px"

          />
        </el-form-item>
        <el-form-item label="头像：">
          <el-upload
            :on-success="avatarSuccess"
            :before-upload="validatePidSzie"
            :show-file-list="false"
            class="avatar-uploader"
            action="/seller/usr_UsrSupplier_upload">
            <img v-if="avatarShow" :src="avatarShow" class="avatar">
            <img v-else src="/seller/static/admin/images/blank.gif" class="avatar">
          </el-upload>
        </el-form-item>
        <el-form-item label="LOGO：">
          <el-upload
            :on-success="logoSuccess"
            :before-upload="validatePidSzie"
            :show-file-list="false"
            class="avatar-uploader"
            action="/seller/usr_UsrSupplier_upload">
            <img v-if="logoShow" :src="logoShow" class="avatar">
            <img v-else src="/seller/static/admin/images/blank.gif" class="avatar">
          </el-upload>
        </el-form-item>
        <el-form-item label="店招背景：">
          <el-upload
            :limit="5"
            :file-list="shopTrickBackgroundShow"
            :class="{'no-add-btn':shopTrickBackgroundShow.length>4}"
            :on-success="shopTrickBackgroundSuccess"
            :before-upload="validatePidSzie"
            :on-remove="shopTrickBackgroundRemove"
            action="/seller/usr_UsrSupplier_upload"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="移动广告上传：">
          <el-upload
            :limit="5"
            :file-list="mobileAdsShow"
            :class="{'no-add-btn':mobileAdsShow.length>4}"
            :on-success="mobileAdsSuccess"
            :before-upload="validatePidSzie"
            :on-remove="mobileAdsRemove"
            action="/seller/usr_UsrSupplier_upload"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
      </el-card>
      <el-card class="box-card percent_50" style="margin-top: 2%">
        <div slot="header" class="clearfix">
          <span>个性装修</span>
        </div>
        <el-form-item
          label="首页个性装修：">
          <el-switch
            v-model="home"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
          <el-tabs
            :before-leave="tabChange"
            type="card"
            style="width: 100%;"
          >
            <el-tab-pane
              v-for="d in language"
              v-if="d.isEnabled"
              :label="d.displayName"
              :key="d.shortName"
            />
          </el-tabs>
          <div>
            <editor id="homePersonalityDecoration" :value="json.homePersonalityDecoration['zh_CN']"/>
          </div>
        </el-form-item>
        <el-form-item
          label="产品页个性装修：">
          <el-switch
            v-model="product"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
          <el-tabs
            :before-leave="tabChange2"
            type="card"
            style="width: 100%;"
          >
            <el-tab-pane
              v-for="d in language"
              v-if="d.isEnabled"
              :label="d.displayName"
              :key="d.shortName"
            />
          </el-tabs>
          <div>
            <editor id="productPagePersonalityDecoration" :value="json.productPagePersonalityDecoration['zh_CN']"/>
          </div>
        </el-form-item>
        <el-form-item
          label="联系页个性装修">
          <el-switch
            v-model="contact"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
          <el-tabs
            :before-leave="tabChange3"
            type="card"
            style="width: 100%;"
          >
            <el-tab-pane
              v-for="d in language"
              v-if="d.isEnabled"
              :label="d.displayName"
              :key="d.shortName"
            />
          </el-tabs>
          <div>
            <editor id="contactPagePersonalityDecoration" :value="json.contactPagePersonalityDecoration['zh_CN']"/>
          </div>
        </el-form-item>
      </el-card>
      <el-button :plain="true" class="mybutton" type="primary" @click="getCommit()">提交装修信息</el-button>
    </el-form>
  </div>
</template>
<script>

import store from '@/store'
import request from '@/utils/request'
import editor from './Tinymce'

export default {
  components: {
    'editor': editor
  },
  data() {
    return {
      language: store.getters.alllanguage,
      storeTypeOptions: [], // 所有店铺类型
      storeType: '', // 店铺类型
      countryOptions: [], // 所有国家
      country: '', // 国家
      provinceOptions: [], // 所有省份
      province: '', // 省份

      radio: 0, // 供应商首页产品展示
      adsPictures: [], // 广告图片上传
      corporatePicture: [], // 企业图片上传
      avatar: '', // 头像
      logo: '', // logo
      shopTrickBackground: [], // 店招背景
      mobileAds: [''], // 移动广告上传
      json: {
        location: {}, // 位置
        productionCapacity: {}, // 生产能力
        totalProduction: {}, // 生产总数
        numberOfEmployees: {}, // 员工总数
        annualSales: {}, // 年销售量
        thirdMarket: {}, // 第三市场
        materialSelection: {}, // 材料选择
        department: {}, // 部门
        jobTitle: {}, // 职称
        website: '', // 网站
        city: {}, // 城市
        advertisingLink: ['', '', '', '', ''], // 广告链接
        businessLink: ['', '', '', '', ''], // 企业链接
        homePersonalityDecoration: {}, // 首页个性装修
        productPagePersonalityDecoration: {}, // 产品页个性装修
        contactPagePersonalityDecoration: {} // 联系页个性装修
      },
      home: 0, // 首页个性装修开关
      product: 0, // 产品页个性装修开关
      contact: 1// 联系页个性装修开关
    }
  },

  computed: {
    adsPicturesShow: function() {
      const arr = []
      this.adsPictures.forEach((val) => {
        if (val && val.length > 1) {
          arr.push({
            name: val,
            url: store.getters.ImageBaseUrl + val
          })
        } else {
          arr.push({
            name: '/seller/static/admin/images/blank.gif',
            url: '/seller/static/admin/images/blank.gif'
          })
        }
      })
      return arr
    },
    corporatePictureShow: function() {
      const arr = []
      this.corporatePicture.forEach((val) => {
        if (val && val.length > 1) {
          arr.push({
            name: val,
            url: store.getters.ImageBaseUrl + val
          })
        } else {
          arr.push({
            name: '/seller/static/admin/images/blank.gif',
            url: '/seller/static/admin/images/blank.gif'
          })
        }
      })
      return arr
    },
    avatarShow: function() {
      return store.getters.ImageBaseUrl + this.avatar
    },
    logoShow: function() {
      return store.getters.ImageBaseUrl + this.logo
    },
    shopTrickBackgroundShow: function() {
      const arr = []
      this.shopTrickBackground.forEach((val) => {
        if (val && val.length > 1) {
          arr.push({
            name: val,
            url: store.getters.ImageBaseUrl + val
          })
        } else {
          arr.push({
            name: '/seller/static/admin/images/blank.gif',
            url: '/seller/static/admin/images/blank.gif'
          })
        }
      })
      return arr
    },
    mobileAdsShow: function() {
      const arr = []
      this.mobileAds.forEach((val) => {
        if (val && val.length > 1) {
          arr.push({
            name: val,
            url: store.getters.ImageBaseUrl + val
          })
        } else {
          arr.push({
            name: '/seller/static/admin/images/blank.gif',
            url: '/seller/static/admin/images/blank.gif'
          })
        }
      })
      return arr
    }
  },
  mounted() {
    this.getShopDecorationInformation()
  },
  methods: {
    tabChange3(activeName, oldActiveName) {
      if (activeName != null && oldActiveName != null) {
        this.json.contactPagePersonalityDecoration[this.language[oldActiveName].shortName] = window.tinymce.get('contactPagePersonalityDecoration').getContent()
        if (this.json.contactPagePersonalityDecoration[this.language[activeName].shortName]) {
          window.tinymce.get('contactPagePersonalityDecoration').setContent(this.json.contactPagePersonalityDecoration[this.language[activeName].shortName])
        } else {
          window.tinymce.get('contactPagePersonalityDecoration').setContent('')
        }
      }
    },
    tabChange2(activeName, oldActiveName) {
      if (activeName != null && oldActiveName != null) {
        this.json.productPagePersonalityDecoration[this.language[oldActiveName].shortName] = window.tinymce.get('productPagePersonalityDecoration').getContent()
        if (this.json.productPagePersonalityDecoration[this.language[activeName].shortName]) {
          window.tinymce.get('productPagePersonalityDecoration').setContent(this.json.productPagePersonalityDecoration[this.language[activeName].shortName])
        } else {
          window.tinymce.get('productPagePersonalityDecoration').setContent('')
        }
      }
    },
    tabChange(activeName, oldActiveName) {
      if (activeName != null && oldActiveName != null) {
        this.json.homePersonalityDecoration[this.language[oldActiveName].shortName] = window.tinymce.get('homePersonalityDecoration').getContent()
        if (this.json.homePersonalityDecoration[this.language[activeName].shortName]) {
          window.tinymce.get('homePersonalityDecoration').setContent(this.json.homePersonalityDecoration[this.language[activeName].shortName])
        } else {
          window.tinymce.get('homePersonalityDecoration').setContent('')
        }
      }
    },
    adsPicturesSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.adsPictures.push(res.result.url)
      }
    },
    adsPicturesRemove(file, fileList) {
      const temp = []
      fileList.forEach(value => {
        temp.push(value.name)
      })
      this.adsPictures = temp
    },
    corporatePictureSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.corporatePicture.push(res.result.url)
      }
    },
    corporatePictureRemove(file, fileList) {
      const temp = []
      fileList.forEach(value => {
        temp.push(value.name)
      })
      this.corporatePicture = temp
    },
    avatarSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.avatar = res.result.url
      }
    },
    logoSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.logo = res.result.url
      }
    },
    shopTrickBackgroundSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.shopTrickBackground.push(res.result.url)
      }
    },
    shopTrickBackgroundRemove(file, fileList) {
      const temp = []
      fileList.forEach(value => {
        temp.push(value.name)
      })
      this.shopTrickBackground = temp
    },
    mobileAdsSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.mobileAds.push(res.result.url)
      }
    },
    mobileAdsRemove(file, fileList) {
      const temp = []
      fileList.forEach(value => {
        temp.push(value.name)
      })
      this.mobileAds = temp
    },
    getShopDecorationInformation() {
      const that = this
      request({
        url: '/seller/usr_UsrSupplier_loadshopsetting',
        method: 'get'
      }).then(data => {
        const count = data.data.result
        that.storeType = count.shopcategory
        that.country = count.countryPkey
        that.province = count.provincPpkey
        that.json.location = count.location
        that.json.productionCapacity = count.productionCapacity
        that.json.totalProduction = count.totalProduction
        that.json.numberOfEmployees = count.numberEmployees
        that.json.annualSales = count.annualSalesFigure
        that.json.thirdMarket = count.thirdMarket
        that.json.materialSelection = count.materialSelection
        that.json.department = count.department
        that.json.jobTitle = count.jobTitle
        that.json.website = count.website
        that.json.city = count.city
        that.radio = count.isPro
        that.avatar = count.headimgurl
        that.logo = count.logo
        that.shopTrickBackground = count.signBackGD.split(',')
        that.mobileAds = count.adPhotoMobile.split(',')
        that.adsPictures = count.adimg.split(',')
        that.corporatePicture = count.companyPhoto.split(',')
        that.json.homePersonalityDecoration = JSON.parse(count.homePageDIY)
        that.json.productPagePersonalityDecoration = JSON.parse(count.productPageDIY)
        that.json.contactPagePersonalityDecoration = JSON.parse(count.contactPageDIY)
        if (count.adPhotoLink) {
          count.adPhotoLink.split(',').forEach((value, index) => {
            that.json.advertisingLink[index] = (value)
          })
        }
        if (count.companyPhotoLink) {
          count.companyPhotoLink.split(',').forEach((value, index) => {
            that.json.businessLink[index] = (value)
          })
        }
        that.getCountry()
        that.getAllStoreType()
      }).catch(err => {
        console.log(err)
      })
    },
    getCountry() {
      const that = this
      request({
        url: '/seller/plt_PltCountry_list',
        method: 'get'
      }).then(data => {
        data.data.items.forEach((v, i) => {
          that.countryOptions.push({
            value: v.id,
            label: v.name
          })
        })
        that.getProvince()
      }).catch(err => {
        console.log(err)
      })
    },
    getProvince() {
      const that = this
      request({
        url: '/home/plt_PltProvince_list',
        method: 'post',
        data: { 'countryId': that.country }
      }).then((res) => {
        if (res.data.ret != 1) return
        res.data.result.forEach((v, i) => {
          that.provinceOptions.push({
            value: v.id,
            label: v.name
          })
        })
        that.province = that.provinceOptions[0].value
      }).catch(err => {
        console.log(err)
      })
    },
    getAllStoreType() {
      const that = this
      request({
        url: '/seller/usr_UsrSupplierCategory_listTop',
        method: 'get'
      }).then((res) => {
        if (res.data.ret != 1) return
        res.data.result.forEach((v, i) => {
          that.storeTypeOptions.push({
            value: v.id,
            label: v.name
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getCommit() {
      const that = this
      for (const homePersonalityDecorationKey in that.json.homePersonalityDecoration) {
        if (that.json.homePersonalityDecoration[homePersonalityDecorationKey].length > 1000) {
          this.$message({
            message: '首页个性装修字符不得大于1000',
            type: 'error'
          })
          return
        }
      }
      for (const homePersonalityDecorationKey in that.json.homePersonalityDecoration) {
        if (that.json.productPagePersonalityDecoration[homePersonalityDecorationKey].length > 1000) {
          this.$message({
            message: '产品页个性装修字符不得大于1000',
            type: 'error'
          })
          return
        }
      }
      for (const homePersonalityDecorationKey in that.json.homePersonalityDecoration) {
        if (that.json.contactPagePersonalityDecoration[homePersonalityDecorationKey].length > 1000) {
          this.$message({
            message: '联系页个性装修字符不得大于1000',
            type: 'error'
          })
          return
        }
      }
      var bean = {
        'businessTyp': that.storeType,
        'location': that.json.location,
        'production': that.json.productionCapacity,
        'developer': that.json.totalProduction,
        'totalEmployees': that.json.numberOfEmployees,
        'annualSales': that.json.annualSales,
        'top3Markets': that.json.thirdMarket,
        'materials': that.json.materialSelection,
        'headPic': that.avatar,
        'department': that.json.department,
        'jobTitle': that.json.jobTitle,
        'webSite': that.website,
        'country': that.country,
        'province': that.province,
        'city': that.json.city,
        'isPro': that.radio,
        'logo': that.logo,
        'signBackgd': that.shopTrickBackground.join(','),
        'adPhoto': that.adsPictures.join(','),
        'adPhotoMobile': that.mobileAds.join(','),
        'adPhotoLink': that.json.advertisingLink.join(','),
        'companyPhoto': that.corporatePicture.join(','),
        'companyPhotoLink': that.json.businessLink.join(','),
        'homePageDiy': JSON.stringify(that.json.homePersonalityDecoration),
        'productPageDiy': JSON.stringify(that.json.productPagePersonalityDecoration),
        'contactPageDiy': JSON.stringify(that.json.contactPagePersonalityDecoration),
        'homePageOn': that.home,
        'productPageOn': that.product,
        'contactPageOn': that.contact
      }
      const temp = []
      for (const beanKey in bean) {
        temp['bean.' + beanKey] = bean[beanKey]
      }
      that.$refs.editInfoForm.validate(function(e) {
        if (!e) {
          that.$message({
            message: '请将表单填写完整',
            type: 'error'
          })
          return
        } else {
          request({
            url: '/seller/usr_UsrSupplier_UpdBizDiy',
            method: 'post',
            data: temp
          }).then(data => {
            if (data.data.ret === 1) {
              that.$message({
                type: 'success',
                message: '提交装修信息成功'
              })
              that.getShopDecorationInformation()
            } else {
              that.$message({
                type: 'error',
                message: '提交装修信息失败 '
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    validatePidSzie(file) {
      // 校验文件大小
      const self = this
      const isSize = new Promise(function(resolve, reject) {
        var _URL = window.URL || window.webkitURL
        var img = new Image()
        img.onload = function() {
          var valid = img.width / img.height === 1 && img.width % img.height === 0
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        self.$notify({
          title: '提示',
          message: '上传图片宽高比列建议为 1:1'
        })
        return file
      })

      var isLt2M = file.size / 1024 / 1024 < 5
      /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
      do {
        if (file.type === 'image/jpeg') {
          break
        }
        if (file.type === 'image/png') {
          break
        }
        if (file.type === 'image/gif') {
          break
        }
        if (file.type === 'image/jpg') {
          break
        }
        self.$message.error('上传图片不是个图片文件')
        return false
      } while (false)
      if (!isLt2M) {
        self.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt2M && isSize
    }
  },
  delete(file, d) {
    if (file.status === 'success') {
      if (d == null) {
        delete this.status.pdtPics[file.name]
      } else {
        delete d.pic[file.name]
      }
    }
  }
}
</script>
<style scoped>
  .main {
    margin: 20px;
  }

  .no-add-btn /deep/ .el-upload {
    display: none;
  }

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

  .mybutton {
    margin-top: 2%;
    margin-left: 50%;
    margin-bottom: 30px;
  }
</style>
