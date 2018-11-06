<template>
  <div id="main" style="min-width:1200px">
    <div style="margin: 28px 80px;">
      <el-container>
        <el-header>
          <span>
            询盘信息
          </span>
        </el-header>
        <el-main>
          <el-form id="hide" label-width="99px" style="transition: height 2s ease 0s; overflow: hidden;height:506px">
            <el-form-item label="询盘名称：">
              <el-input :disabled="writeFlag" v-model="bean.title" style="width:42%;"/>
            </el-form-item>
            <el-form-item label="产品图片：">
              <img :src="bean.showImg" style="width:8%"><!-- bean.showImg -->
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input :disabled="writeFlag" v-model="bean.name" style="width:42%;"/>
            </el-form-item>
            <el-form-item label="国家：">
              <el-input :disabled="writeFlag" v-model="bean.countryName" style="width:42%;"/>
            </el-form-item>
            <el-form-item label="时间：">
              <el-input :disabled="writeFlag" v-model="bean.createTime" style="width:42%;"/>
            </el-form-item>
            <el-form-item label="数量：">
              <el-input :disabled="writeFlag" v-model="bean.quantity" style="width:42%;"/>
            </el-form-item>
            <el-form-item label="产品相关图：">
              <ul style="padding:0">
                <li style="display:  inline-block;width: 5%;margin-right: 20px;"><img
                  style="width: 100%;"
                  src="http://shoestp.oss-us-west-1.aliyuncs.com/public/upload/usr/consult/f2a182b6e46d074ae9f70b4aa8a4da40.png">
                </li>
                <li style="display:  inline-block;width: 5%;margin-right: 20px;"><img
                  style="width: 100%;"
                  src="http://shoestp.oss-us-west-1.aliyuncs.com/public/upload/usr/consult/f2a182b6e46d074ae9f70b4aa8a4da40.png">
                </li>
                <li style="display:  inline-block;width: 5%;margin-right: 20px;"><img
                  style="width: 100%;"
                  src="http://shoestp.oss-us-west-1.aliyuncs.com/public/upload/usr/consult/f2a182b6e46d074ae9f70b4aa8a4da40.png">
                </li>
                <li style="display:  inline-block;width: 5%;margin-right: 20px;"><img
                  style="width: 100%;"
                  src="http://shoestp.oss-us-west-1.aliyuncs.com/public/upload/usr/consult/f2a182b6e46d074ae9f70b4aa8a4da40.png">
                </li>
              </ul>
            </el-form-item>
          </el-form>
        </el-main>
        <el-footer style="text-align: center;">
          <span style="cursor:pointer;color: rgb(64, 158, 255);" @click="clickBy">
            <i ref="caret" class="el-icon-caret-top"/>
            收起
          </span>
        </el-footer>
      </el-container>
    </div>
    <div style="margin:0 80px 28px 80px;">
      <el-container>
        <el-header style="">
          留言记录
        </el-header>
        <el-main>
          <div>
            <ul id="content" style="padding:0;max-height: 490px;overflow-y: scroll;">
              <li v-for="msg in bean.relations[0].msgs" :key="msg" style="list-style: none;border-bottom: 1px solid rgb(240, 240, 240);padding: 12px 0;">
                <div v-if="msg.p2S == true" style="padding-right: 17px;">
                  <span style="float:left;font-weight: bold;">
                    {{ bean.name }}
                  </span>
                  <span style="margin: 0 16px;float:left;">|</span>
                  <span style="float:left;color: rgb(187,187,192);">
                    {{ msg.sendTime }}
                  </span>
                  <div style="clear:both;"/>
                </div>
                <div v-if="msg.p2S == true" style="margin: 15px 0;">
                  <p style="color: #000;;float:left;margin: 30px 20px 0 0;">
                    {{ textToImgsContent(msg.content,1) }}
                  </p>
                  <ul v-if="textToImgsContent(msg.content,0)" style="padding:0;float:left;">
                    <li
                      v-for="imgSrc in textToImgsContent(msg.content,0)"
                      :key="imgSrc"
                      style="display:  inline-block;width: 99px;;margin-right: 20px;">
                      <img
                        :src="imgSrc"
                        style="width: 100%;">
                    </li>
                  </ul>

                  <div style="clear:both;"/>
                </div>
                <div v-if="msg.p2S == false" style="padding-right: 17px;">
                  <span style="float:right;color: rgb(187,187,192);">
                    {{ msg.sendTime }}
                  </span>
                  <span style="margin: 0 16px;float:right;">|</span>
                  <span style="float:right;font-weight: bold;">
                    我
                  </span>
                  <div style="clear:both;"/>
                </div>
                <div v-if="msg.p2S == false" style="margin: 15px 0;">
                  <p style="color: #000;;float:right;margin: 30px 20px 0 0;">
                    {{ textToImgsContent(msg.content,1) }}
                  </p>
                  <ul v-if="textToImgsContent(msg.content,0)" style="padding:0;float:right;text-align: right;">
                    <li
                      v-for="imgSrc in textToImgsContent(msg.content,0)"
                      :key="imgSrc"
                      style="display:  inline-block;width: 99px;;margin-right: 20px;">
                      <img :src="imgUrlconfig + imgSrc" style="width: 100%;">
                    </li>
                  </ul>

                  <div style="clear:both;"/>
                </div>
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>

      <hr data-v-5c0659f4="" style="margin: 60px 0 30px 0;">

      <div class="chooseImgWrap">
        <el-upload
          ref="uploadImgs"
          :limit="5"
          :on-success="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="/seller/usr_UsrConsultMessage_upload"
          list-type="picture-card"
        >
          上传图片
        </el-upload>
        <el-input
          :rows="10"
          v-model="sendMsgContent"
          type="textarea"
          placeholder="请输入内容"/>

      </div>
      <el-button
        type="primary"
        size="small"
        style="width: 98px;color:#fff;float: right;margin: 7px 5px 60px 0;padding: 14px 16px;border: 1px solid #e6e6e6;"
        @click="sendMsg">发送
      </el-button>
      <el-button
        type="primary"
        size="small"
        style="width: 98px;color:#fff;float: left;margin: 7px 5px 60px 0;padding: 14px 16px;border: 1px solid #e6e6e6;"
        @click="returnList">返回
      </el-button>
    </div>

  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'Test',
  data: function() {
    return {
      id: -1,
      bean: {},
      writeFlag: true,
      myImgLabelBefore: '<IMG_START>', // 自定义的imgs前缀标签
      myImgLabelAfter: '<IMG_END>', // 自定义的imgs后缀标签
      imgUrlconfig: 'http://shoestp.oss-us-west-1.aliyuncs.com',
      relation: -1,
      sendMsgContent: '',
      imgsToUpload: [] // 需要upload的img - 显示在页面上
    }
  },
  created: function() {
    var self = this
    self.id = this.$router.history.current.params.id
    if (self.id === undefined) {
      self.$router.push({ name: 'askList' })
    }

    request({
      url: '/seller/usr_UsrConsult_detail',
      method: 'get',
      params: {
        id: self.id
      }
    }).then(res => {
      self.bean = res.data.result
      var img = res.data.result.image
      self.relation = res.data.result.relations[0].id
      console.log(self.relation)
      if (img) {
        if (img.indexOf(',') !== -1) {
          self.bean.showImg = self.imgUrlconfig + img.split(',')[0]
          var imgList = img.substring(img.indexOf(',') + 1).split(',')
          self.bean.imgList = imgList
        } else {
          self.bean.showImg = self.imgUrlconfig + img
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    clickBy() {
      // 点击事件
      var slide = {
        // down up事件
        down: function(div) {
          div.style.height = '506px'
        },
        up: function(div) {
          div.style.height = '50px'
        }
      }

      function toggleSlide(id, s) {
        var div = document.getElementById(id),
          div_height = div.offsetHeight
          // console.log(div_height)
          // div.style.transition='height '+s+'s';
          // div.style.overflow='hidden';
        if (div_height === 506) {
          slide.up(div)
        } else {
          slide.down(div)
        }
      }

      toggleSlide('hide', 2)
      // 调用事件传值
      var classN = this.$refs.caret.className// 获取类名
      if (classN === 'el-icon-caret-bottom') { // 切换图标类名
        this.$refs.caret.setAttribute('class', 'el-icon-caret-top')
      } else {
        this.$refs.caret.setAttribute('class', 'el-icon-caret-bottom')
      }
    },
    sendMsg: function() {
      var content = document.getElementById('content')
      var self = this
      // 将上传的图片 以字符串的形式拼接在txt后面"<IMG_START><IMG_END>"
      var textImgs = (self.imgsToUpload && self.imgsToUpload.length) ? (self.myImgLabelBefore + self.imgsToUpload.join(',') + self.myImgLabelAfter) : ''
      if ((self.sendMsgContent + textImgs).replace(/[ ]/g, '').length < 1) {
        this.$alert('请输入内容')
        return
      }
      if (self.relation === -1) {
        self.$message.error('数据异常')
        return
      }
      request({
        url: '/seller/usr_UsrConsultMessage_send2Purchase',
        method: 'post',
        params: {
          relation: self.relation,
          content: self.sendMsgContent + textImgs
        }
      }).then(res => {
        if (res.data.ret === 1) {
          self.$message.success('发送成功')

          var newMsg = {}
          newMsg.content = self.sendMsgContent + textImgs
          newMsg.sendTime = dateFtt('yyyy/MM/dd hh:mm', new Date())
          newMsg.p2S = false
          self.bean.relations[0].msgs.push(newMsg)

          self.sendMsgContent = ''
          self.imgsToUpload.splice(0, self.imgsToUpload.length)
          this.$refs.uploadImgs.clearFiles()
          this.$nextTick(() => {
            content.scrollTop = 30000
          })
        } else {
          self.$message.error(res.data.msg)
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    returnList: function() {
      window.history.go(-1)
    },
    rotate: function(e) {
      if (this.$refs.askDetail.style.display === '') {
        this.$refs.askDetail.style.display = 'none'
      } else {
        this.$refs.askDetail.style.display = ''
      }
    },
    // 服务器返回的msg内容，提取其中的imgs
    // type为0时，返回img的拼接字符串
    // type为1时，返回img之外的文字
    textToImgsContent(txt, type) {
      if (!txt) return null
      var firstIndex = txt.search(this.myImgLabelBefore)
      if (type == 0) {
        if (firstIndex == -1) return null
        var lastIndex = txt.search(this.myImgLabelAfter)
        // 获取上传前拼接的img字符串
        var imgsTxt = txt.slice(firstIndex + this.myImgLabelBefore.length, lastIndex)
        return imgsTxt.split(',')
      } else if (type === 1) {
        if (firstIndex === -1) return txt
        return txt.slice(0, firstIndex)
      }
    },
    // 图片上传成功时的预览
    handlePictureCardPreview(response, file, fileList) {
      if (response.ret !== 1) {
        layer.msg(response.msg, { icon: 2 })
        this.$refs.uploadImgs.clearFiles()
        return
      }
      this.imgsToUpload.push(response.result.url)
    },
    // elementui - 删除操作
    handleRemove(file, fileList) {
      // 清空imgs数组
      this.imgsToUpload = []
      // 删除图片后，将授予的图片地址放入数组
      if (!fileList) return
      $.each(fileList, (i, v) => {
        this.imgsToUpload.push(v.response.result.url)
      })
    }
  }
}

function dateFtt(fmt, date) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
</script>
<style scoped>
  .chooseImgWrap {
    position: relative;
  }

  /deep/ .chooseImgWrap .el-upload--picture-card {
    width: auto;
    height: auto;
    color: red;
    position: absolute;
    bottom: -48px;
    right: 120px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  /* 上传图片预览的大小 */
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 84px;
    height: 84px;
  }

  /deep/ .el-container .el-header {
    line-height: 60px;
    border-bottom: 1px solid #000;
    height: 60px;
    font-weight: bold;
    font-size: 20px;
  }

  /deep/ .el-textarea {
    margin-bottom: 22px;
    margin-top: 22px;
  }

  /deep/ .el-upload.el-upload--picture-card {
    background-color: #B5B6BB;
    color: #fff;
  }

  /deep/ .el-upload.el-upload--picture-card:hover {
    background-color: rgb(85, 90, 109) !important;
  }

  /deep/ .el-upload.el-upload--picture-card:focus {
    background-color: rgb(85, 90, 109) !important;
  }

  /deep/ .el-button--primary {
    background-color: rgb(70, 119, 238);
  }

  /deep/ .el-button--primary:hover {
    background-color: rgb(51, 86, 170) !important;
  }

  /deep/ .el-button--primary:focus {
    background-color: rgb(51, 86, 170) !important;
  }
</style>
