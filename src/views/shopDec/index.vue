<template slot-scope="scope">
  <div class="main">
    <el-form
      ref="editInfoForm"
      :model="data"
      label-width="160px"
    >
      <el-card class="box-card">
        <div slot="header">
          <span>店铺通用设置</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺LOGO：">
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="店招背景：" class="textRight" style="border-left: 1px solid #ccc;">
              <el-upload
                :on-success="sigBackGDSuccess"
                :before-upload="validatePidSzie"
                :show-file-list="false"
                class="avatar-uploader"
                action="/seller/usr_UsrSupplier_upload">
                <img v-if="sigBackGDShow" :src="sigBackGDShow" class="avatar">
                <img v-else src="/seller/static/admin/images/blank.gif" class="avatar">
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="首页底部产品展示：">
          <el-switch
            v-model="data.bottomProductDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>
      </el-card>
      <el-card style="margin-top: 1%">
        <el-form-item label="首页大海报：">
          <el-switch
            v-model="data.homeBigPoster"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>
        <el-form-item label-width="0">
          <el-tabs v-model="homeActiveName" type="border-card" @tab-click="hometabClick">
            <el-tab-pane
              v-for="d in language"
              v-if="d.isEnabled"
              :label="d.displayName"
              :data-short-name="d.shortName"
              :name="d.shortName"
              :key="d.shortName">
              <el-upload
                :limit="3"
                :file-list="adPhotoArr"
                :class="{'no-add-btn':adPhotoArr.length>2}"
                :on-success="adPhotoSuccess"
                :before-upload="validatePidSzie"
                :on-remove="adPhotoRemove"
                class="long-pic-wrap"
                action="/seller/usr_UsrSupplier_upload"
                list-type="picture-card">
                <i class="el-icon-plus"/>
              </el-upload>
              <el-form-item label="广告链接：" label-width="0"/>
              <el-form-item
                v-for="(value,index) in data.adPhotoLinkArr"
                :key="index"
                class="mb20">
                <el-input v-model="data.adPhotoLinkArr[index]" :key="index" placeholder="请输入链接"/>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="首页企业大海报：">
          <el-switch
            v-model="data.homeBusinessBigPoster"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>
        <el-form-item label-width="0">
          <el-tabs v-model="companyPhotoActiveName" type="border-card" @tab-click="companyPhotoTabClick">
            <el-tab-pane
              v-for="d in language"
              v-if="d.isEnabled"
              :label="d.displayName"
              :data-short-name="d.shortName"
              :name="d.shortName"
              :key="d.shortName">
              <el-upload
                :limit="3"
                :file-list="companyPhotoArr"
                :class="{'no-add-btn':companyPhotoArr.length>2}"
                :on-success="companyPhotoSuccess"
                :before-upload="validatePidSzie"
                :on-remove="companyPhotoRemove"
                action="/seller/usr_UsrSupplier_upload"
                class="long-pic-wrap"
                list-type="picture-card">
                <i class="el-icon-plus"/>
              </el-upload>
              <el-form-item label="广告链接：" label-width="0"/>
              <el-form-item
                v-for="(value,index) in data.companyPhotoLinkArr"
                :key="index"
                class="mb20">
                <el-input
                  :key="index"
                  v-model="data.companyPhotoLinkArr[index]"
                  placeholder="请输入链接"/>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-card>
      <el-card style="margin-top: 1%">
        <el-form-item
          label="首页自定义装修：">
          <el-switch
            v-model="data.homePageOn"
            active-color="#13ce66"
            inactive-color="#ff4949"
            prop="homePageOn"/>
          <el-tabs
            v-model="homeDIYName"
            type="card"
            style="width: 100%;"
            @tab-click="homeDIYClick"
          >
            <el-tab-pane
              v-for="d in language"
              v-if="d.isEnabled"
              :data-short-name="d.shortName"
              :name="d.shortName"
              :label="d.displayName"
              :key="d.shortName"
            />
          </el-tabs>
        </el-form-item>
        <div>
          <el-form-item label-width="0">
            <editor id="homePersonalityDecoration" :value="data.homePageDIY[homeDIYName]"/>
          </el-form-item>
        </div>
        <el-form-item
          hidden="true"
          label="公司介绍页自定义装修：">
          <el-switch
            v-model="data.aboutPageCustomDecoration"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
          <el-tabs
            v-model="productPagePersonalityDIYName"
            type="card"
            style="width: 100%;"
            @tab-click="productPagePersonalityDIYClick"
          >
            <el-tab-pane
              v-for="d in language"
              v-if="d.isEnabled"
              :label="d.displayName"
              :data-short-name="d.shortName"
              :name="d.shortName"
              :key="d.shortName"/>
          </el-tabs>
        </el-form-item>
        <div hidden="true">
          <el-form-item label-width="0">
            <editor id="productPagePersonalityDecoration" :value="data.aboutPageDIY[productPagePersonalityDIYName]"/>
          </el-form-item>
        </div>
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
      homeActiveName: 'en', // 首页大海报多语言(当前)
      companyPhotoActiveName: 'en', // 首页企业大海报多语言(当前)
      homeOldLang: 'en', // 首页大海报多语言(老)
      companyOldLang: 'en', // 首页企业大海报多语言(老)
      homeDIYName: 'en', // 首页自定义装修多语言(当前)
      productPagePersonalityDIYName: 'en', // 公司介绍页自定义装修多语言(当前)
      homeOldLanguage: 'en', // 首页自定义装修多语言(老)
      productOldLanguage: 'en', // 公司介绍页  自定义装修多语言(老)
      adPhotoArr: [], // 首页大海报图片数组(用于存放，最终转换为字符串到adPhoto)
      companyPhotoArr: [], // 首页企业大海报图片(用于存放，最终转换为字符串到companyPhoto)
      data: {
        bottomProductDisplay: false, // 首页底部产品展示
        homeBigPoster: false, // 首页大海报开关
        homeBusinessBigPoster: false, // 首页企业大海报开关
        logo: '', // LOGO
        signBackGD: '', // 店招背景
        adPhoto: {}, // 首页大海报图片
        adPhotoLink: {}, // 首页大海报广告链接
        adPhotoLinkArr: [], // 首页大海报广告链接(用于存放，最终转换为字符串到adPhotoLink)
        companyPhoto: {}, // 首页企业大海报图片
        companyPhotoLink: {}, // 首页企业大海报广告链接
        companyPhotoLinkArr: [], // 首页企业大海报广告链接(用于存放，最终转换为字符串到companyPhoto)
        homePageDIY: {}, // 首页自定义装修
        homePageOn: false, // 首页自定义装修开关
        aboutPageDIY: {}, // 公司介绍页自定义装修
        aboutPageCustomDecoration: false// 公司介绍页自定义装修开关
      }
    }
  },
  computed: {
    logoShow: function() {
      if (this.data.logo) {
        return store.getters.ImageBaseUrl + this.data.logo
      }
      return null
    },
    sigBackGDShow: function() {
      if (this.data.signBackGD) {
        return store.getters.ImageBaseUrl + this.data.signBackGD
      }
      return null
    }
  },
  mounted() {
    this.getShopDecorationInformation()
  },
  methods: {
    hometabClick(tab, event) {
      const oldLang = this.homeOldLang
      let url = ''
      this.adPhotoArr.forEach((value) => {
        if (url.length > 0) {
          url += ','
        }
        if (value) {
          url += value.url
        }
      })
      this.data.adPhoto[oldLang] = url
      this.data.adPhotoLink[oldLang] = this.data.adPhotoLinkArr.join(',')
      this.adPhotoArr = []
      this.data.adPhotoLinkArr = []
      this.data.adPhoto[tab.$el.dataset.shortName].split(',').forEach((value, index) => {
        if (value) {
          if (index >= 3) return
          if (value.indexOf(store.getters.ImageBaseUrl) !== -1) {
            this.adPhotoArr.push({
              name: value,
              url: value
            })
          } else {
            this.adPhotoArr.push({
              name: value,
              url: store.getters.ImageBaseUrl + value
            })
          }
        }
      })
      this.data.adPhotoLink[tab.$el.dataset.shortName].split(',').forEach((value) => {
        if (value) {
          this.data.adPhotoLinkArr.push(value)
        }
      })
      if (this.data.adPhotoLinkArr.length < 3) {
        for (let i = (3 - this.data.adPhotoLinkArr.length); i > 0; i--) {
          this.data.adPhotoLinkArr.push('')
        }
      }
      this.homeOldLang = tab.$el.dataset.shortName
    },
    companyPhotoTabClick(tab, event) {
      const oldLang = this.companyOldLang
      let url = ''
      this.companyPhotoArr.forEach((value) => {
        if (url.length > 0) {
          url += ','
        }
        if (value) {
          url += value.url
        }
      })
      this.data.companyPhoto[oldLang] = url
      this.data.companyPhotoLink[oldLang] = this.data.companyPhotoLinkArr.join(',')
      this.companyPhotoArr = []
      this.data.companyPhotoLinkArr = []
      this.data.companyPhoto[tab.$el.dataset.shortName].split(',').forEach((value, index) => {
        if (value) {
          if (index >= 3) return
          if (value.indexOf(store.getters.ImageBaseUrl) !== -1) {
            this.companyPhotoArr.push({
              name: value,
              url: value
            })
          } else {
            this.companyPhotoArr.push({
              name: value,
              url: store.getters.ImageBaseUrl + value
            })
          }
        }
      })
      this.data.companyPhotoLink[tab.$el.dataset.shortName].split(',').forEach((value) => {
        if (value) {
          this.data.companyPhotoLinkArr.push(value)
        }
      })
      if (this.data.companyPhotoLinkArr.length < 3) {
        for (let i = (3 - this.data.companyPhotoLinkArr.length); i > 0; i--) {
          this.data.companyPhotoLinkArr.push('')
        }
      }
      this.companyOldLang = tab.$el.dataset.shortName
    },
    homeDIYClick(tab, event) {
      const oldLang = this.homeOldLanguage
      this.data.homePageDIY[oldLang] = window.tinymce.get('homePersonalityDecoration').getContent()
      this.homeOldLanguage = tab.$el.dataset.shortName
      if (this.data.homePageDIY[this.homeDIYName]) {
        window.tinymce.get('homePersonalityDecoration').setContent(this.data.homePageDIY[this.homeDIYName])
      } else {
        window.tinymce.get('homePersonalityDecoration').setContent('')
      }
    },
    productPagePersonalityDIYClick(tab, event) {
      const oldLang = this.productOldLanguage
      this.data.aboutPageDIY[oldLang] = window.tinymce.get('productPagePersonalityDecoration').getContent()
      this.productOldLanguage = tab.$el.dataset.shortName
      if (this.data.aboutPageDIY[this.productPagePersonalityDIYName]) {
        window.tinymce.get('productPagePersonalityDecoration').setContent(this.data.aboutPageDIY[this.productPagePersonalityDIYName])
      } else {
        window.tinymce.get('productPagePersonalityDecoration').setContent('')
      }
    },
    logoSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.data.logo = res.result.url
      }
    },
    sigBackGDSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.data.signBackGD = res.result.url
      }
    },
    adPhotoSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.adPhotoArr.push({
          name: res.result.originalName,
          url: store.getters.ImageBaseUrl + res.result.url
        })
      }
    },
    adPhotoRemove(file, fileList) {
      this.adPhotoArr = fileList
    },
    companyPhotoSuccess(res, file) {
      if (res.ret != 1) {
        this.$message({ message: res.msg, type: 'error' })
        return
      } else {
        this.companyPhotoArr.push({
          name: res.result.originalName,
          url: store.getters.ImageBaseUrl + res.result.url
        })
      }
    },
    companyPhotoRemove(file, fileList) {
      this.companyPhotoArr = fileList
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
        // self.$notify({
        //   title: '提示',
        //   message: '上传图片宽高比列建议为 1:1'
        // })
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
    },
    getShopDecorationInformation() {
      const that = this
      request({
        url: '/seller/usr_UsrSupplier_getShopSetting',
        method: 'get'
      }).then(data => {
        if (data.data.ret != 0) {
          that.adPhotoArr = []
          that.companyPhotoArr = []
          const count = data.data.result
          that.data.homePageOn = count.homePageOn
          that.data.bottomProductDisplay = count.bottomproductdisplay
          that.data.homeBigPoster = count.homebigposter
          that.data.homeBusinessBigPoster = count.homebusinessbigposter
          that.data.aboutPageCustomDecoration = count.aboutpagecustomdecoration
          that.data.logo = count.logo
          console.log(count.signBackGD)
          that.data.signBackGD = count.signBackGD == undefined ? '' : count.signBackGD
          that.data.adPhoto = JSON.parse(count.adPhoto)
          that.data.adPhoto[that.homeActiveName].split(',').forEach((value, index) => {
            if (value) {
              if (index >= 3) return
              if (value.indexOf(store.getters.ImageBaseUrl) !== -1) {
                that.adPhotoArr.push({
                  name: value,
                  url: value
                })
              } else {
                that.adPhotoArr.push({
                  name: value,
                  url: store.getters.ImageBaseUrl + value
                })
              }
            }
          })
          that.data.adPhotoLink = JSON.parse(count.adPhotoLink)
          that.data.adPhotoLink[that.homeActiveName].split(',').forEach((value) => {
            if (value.length > 0) {
              that.data.adPhotoLinkArr.push(value)
            }
          })
          if (that.data.adPhotoLinkArr.length < 3) {
            for (let i = (3 - that.data.adPhotoLinkArr.length); i > 0; i--) {
              that.data.adPhotoLinkArr.push('')
            }
          }
          that.data.companyPhoto = JSON.parse(count.companyPhoto)
          that.data.companyPhoto[that.companyPhotoActiveName].split(',').forEach((value, index) => {
            if (value) {
              if (index >= 3) return
              that.companyPhotoArr.push({
                name: value,
                url: store.getters.ImageBaseUrl + value
              })
            }
          })
          that.data.companyPhotoLink = JSON.parse(count.companyPhotoLink)
          that.data.companyPhotoLink[that.homeActiveName].split(',').forEach((value) => {
            if (value.length > 0) {
              that.data.companyPhotoLinkArr.push(value)
            }
          })
          if (that.data.companyPhotoLinkArr.length < 3) {
            for (let i = (3 - that.data.companyPhotoLinkArr.length); i > 0; i--) {
              that.data.companyPhotoLinkArr.push('')
            }
          }
          that.data.homePageDIY = JSON.parse(count.homePageDIY)
          that.data.aboutPageDIY = JSON.parse(count.companyIntroductionPageCustomDecoration)
        } else {
          this.$message({
            message: data.data.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCommit() {
      const that = this
      const check = /^[a-zA-Z]*[0-9]*[\x21-\x7e]*$/
      for (let i = 0; i < that.data.adPhotoLinkArr.length; i++) {
        if (!(check.test(that.data.adPhotoLinkArr[i]))) {
          this.$alert('首页大海报下的第' + (i + 1) + '个广告链接错误，请填写数字/字母/符号')
          return
        }
      }

      for (let i = 0; i < that.data.companyPhotoLinkArr.length; i++) {
        if (!(check.test(that.data.companyPhotoLinkArr[i]))) {
          this.$alert('首页企业大海报下的第' + (i + 1) + '个广告链接错误，请填写数字/字母/符号')
          return
        }
      }
      let url = ''
      that.adPhotoArr.forEach((value) => {
        if (url.length > 0) {
          url += ','
        }
        if (value) {
          url += value.url
        }
      })
      that.data.adPhoto[that.homeActiveName] = url
      that.data.adPhotoLink[that.homeActiveName] = that.data.adPhotoLinkArr.join(',')
      url = ''
      that.companyPhotoArr.forEach((value) => {
        if (url.length > 0) {
          url += ','
        }
        if (value) {
          url += value.url
        }
      })
      that.data.companyPhoto[that.companyPhotoActiveName] = url
      that.data.companyPhotoLink[that.companyPhotoActiveName] = that.data.companyPhotoLinkArr.join(',')
      that.data.homePageDIY[that.homeDIYName] = window.tinymce.get('homePersonalityDecoration').getContent()
      that.data.aboutPageDIY[that.productPagePersonalityDIYName] = window.tinymce.get('productPagePersonalityDecoration').getContent()
      for (const homePersonalityDecorationKey in that.data.homePageDIY) {
        if (that.data.homePageDIY[homePersonalityDecorationKey].length > 10000) {
          this.$message({
            message: '首页个性装修字符不得大于10000',
            type: 'error'
          })
          return
        }
      }
      for (const homePersonalityDecorationKey in that.data.aboutPageDIY) {
        if (that.data.aboutPageDIY[homePersonalityDecorationKey].length > 10000) {
          this.$message({
            message: '公司介绍页自定义装修字符不得大于10000',
            type: 'error'
          })
          return
        }
      }
      that.language.forEach((lang) => {
        let string = ''
        that.data.adPhoto[lang.shortName].split(',').forEach((value) => {
          if (value) {
            value = value.replace(store.getters.ImageBaseUrl, '')
            if (string.length > 0) {
              string += ','
            }
            if (value) {
              string += value
            }
          }
          that.data.adPhoto[lang.shortName] = string
        })
      })

      that.language.forEach((lang) => {
        let string = ''
        that.data.companyPhoto[lang.shortName].split(',').forEach((value) => {
          if (value) {
            value = value.replace(store.getters.ImageBaseUrl, '')
            if (string.length > 0) {
              string += ','
            }
            if (value) {
              string += value
            }
          }
          that.data.companyPhoto[lang.shortName] = string
        })
      })
      var bean = {
        'logo': that.data.logo,
        'signBackGD': that.data.signBackGD,
        'adPhoto': JSON.stringify(that.data.adPhoto),
        'adPhotoLink': JSON.stringify(that.data.adPhotoLink),
        'companyPhoto': JSON.stringify(that.data.companyPhoto),
        'companyPhotoLink': JSON.stringify(that.data.companyPhotoLink),
        'homePageDIY': JSON.stringify(that.data.homePageDIY),
        'companyIntroductionPageCustomDecoration': JSON.stringify(that.data.aboutPageDIY),
        'homePageOn': that.data.homePageOn,
        'bottomproductdisplay': that.data.bottomProductDisplay,
        'homebigposter': that.data.homeBigPoster,
        'homebusinessbigposter': that.data.homeBusinessBigPoster,
        'aboutpagecustomdecoration': that.data.aboutPageCustomDecoration
      }
      const temp = []
      for (const beanKey in bean) {
        temp['usv.' + beanKey] = bean[beanKey]
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
            url: '/seller/usr_UsrSupplier_Updsuppliersetting',
            method: 'post',
            data: temp
          }).then(data => {
            if (data.data.ret === 1) {
              that.$message({
                type: 'success',
                message: '提交装修信息成功'
              })
              that.$router.push('/shopDec/index')
            } else {
              console.log(data.data.msg)
              if (data.data.msg.indexOf('Email不可为空，请输入') != -1) {
                that.$alert('请联系平台填写Email')
              } else {
                that.$alert('提交装修信息失败')
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
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
  /deep/ .el-form-item__label {
    white-space: nowrap;
  }
  .main {
    margin: 20px;
  }

  .mb20 {
    margin-bottom: 20px;
  }
  .no-add-btn /deep/ .el-upload {
    display: none;
  }

  /deep/ .el-form-item__label {
    text-align: left;
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

  图片显示长条形
  .long-pic-wrap /deep/ .el-upload-list {
    width: 100%;
  }

  .long-pic-wrap /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 30%;
  }

  .textRight /deep/ .el-form-item__label {
    text-align: right;
  }
</style>
