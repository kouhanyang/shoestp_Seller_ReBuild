<template>
  <div class="app-container">

    <div class="chat-wrap">
      <!-- 左侧 - 询盘详情 -->
      <chartInquiryInfo :data="leftbean"/>

      <!-- 右侧  - 聊天框 -->
      <div class="chart-box">
        <chartWindow :data="reltbean" :padding-bottom=" showUploadWrap?'100px':0" class="flex-grow"/>

        <!-- 右下角 - 填写内容区域 -->
        <div class="chart-input-wrap">
          <el-upload
            ref="uploadImgs"
            :limit="5"
            :on-preview="handlePictureCardPreview"
            :on-success="successPreview"
            :on-remove="handleRemove"
            class="upload-wrap"
            action="/seller/usr_UsrConsultMessage_upload"
            list-type="picture-card">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
          <div class="chart-textarea-wrap">
            <el-input
              ref="textarea"
              v-model="chartContent"
              class="chart-textarea"
              type="textarea"
              resize="none"
              placeholder="请输入内容"/>
              <!-- <div class="textarea-show-content"
v-html="chartContent" @click="focusInput">
</div> -->
          </div>
          <div class="opearte-row">
            <el-button @click="returnList">返回</el-button>
            <el-button type="warning" @click="toUpload">加载图片</el-button>
            <el-button type="primary" @click="sendMsg">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import chartInquiryInfo from './components/chart-inquiry-info'
import chartWindow from './components/chart-window'
import store from '@/store'

export default {
  name: 'Guide',
  components: {
    chartInquiryInfo,
    chartWindow
  },
  data() {
    return {
      id: -1,
      chartContent: '',
      showUploadWrap: false, // 是否显示上传图片区域
      bean: {},
      leftbean: {},
      reltbean: {},
      relation: -1,
      myImgLabelBefore: '<IMG_START>', // 自定义的imgs前缀标签
      myImgLabelAfter: '<IMG_END>', // 自定义的imgs后缀标签
      imgsToUpload: [], // 需要upload的img - 显示在页面上
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  mounted() {
    this.loadinquiry()
  },
  methods: {
    // 点击使textarea聚焦
    focusInput() {
      this.$refs.textarea.focus()
    },
    returnList: function() {
      store.dispatch('delCurrentViews', {
        view: this.$route,
        $router: this.$router
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }, successPreview(response, file, fileList) {
      if (response.ret !== 1) {
        this.$message({
          type: 'info',
          message: '上传失败'
        })
        this.$refs.uploadImgs.clearFiles()
        return
      }
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.imgsToUpload.push(response.result.url)
    },
    handleRemove(file, fileList) {
      // 清空imgs数组
      this.imgsToUpload = []
      // 删除图片后，将授予的图片地址放入数组
      if (!fileList) return
      this.imgsToUpload = fileList
    },
    loadinquiry() {
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
        console.log(res.data.result)
        self.leftbean = Object.assign({}, self.bean)
        self.reltbean = Object.assign({}, self.bean)
        self.relation = res.data.result.relations[0].id
        delete self.reltbean.countryName
        delete self.reltbean.content
        delete self.reltbean.image
        delete self.reltbean.product
        delete self.reltbean.productNum
        delete self.reltbean.quantity
        delete self.reltbean.title
        delete self.leftbean.relations
      }).catch(err => {
        console.log(err)
      })
    },
    toUpload() {
      this.showUploadWrap = true
    },
    sendMsg: function() {
      var self = this
      var content = self.chartContent
      // 将上传的图片 以字符串的形式拼接在txt后面"<IMG_START><IMG_END>"
      var textImgs = ''
      console.log(self.imgsToUpload)
      if (self.imgsToUpload && self.imgsToUpload.length) {
        for (var i = 0; i < self.imgsToUpload.length; i++) {
          textImgs += self.myImgLabelBefore + self.imgsToUpload[i] + self.myImgLabelAfter
        }
      } else {
        textImgs = ''
      }
      if ((self.chartContent + textImgs).replace(/[ ]/g, '').length < 1) {
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
          content: content + textImgs
        }
      }).then(res => {
        if (res.data.ret === 1) {
          this.$message({
            type: 'success',
            message: '发送成功'
          })
          var newMsg = {}
          newMsg.content = content + textImgs
          newMsg.sendTime = new Date().toLocaleString()
          newMsg.p2S = false
          self.reltbean.relations[0].msgs.push(newMsg)
          this.loadinquiry()
          self.chartContent = ''
          self.imgsToUpload.splice(0, self.imgsToUpload.length)
          this.$refs.uploadImgs.clearFiles()
        } else {
          self.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  img {
    object-fit: contain;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .flex-grow {
    flex-grow: 1;
  }

  p, ul, li {
    padding: 0;
    margin: 0;
  }

  .app-container {
    color: #666;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ {
    p, ul, li {
      padding: 0;
      margin: 0;
    }
    img {
      object-fit: contain;
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .mr15 {
      margin-right: 15px;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  .chat-wrap {
    width: 1000px;
    height: 750px;
    display: flex;
    align-items: stretch;
    border: 5px solid #eff1f5;
    .chart-box {
      flex-grow: 1;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;

      /deep/ .chart-window-content {
        border-right-width: 0;
      }
    }
  }

  .chart-input-wrap {
    position: relative;
    height: 200px;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    border-left: 2px solid #ebeff3;
    .chart-textarea-wrap {
      position: relative;
      flex-grow: 1;
      display: flex;
      align-items: stretch;
      // 显示用的 textarea - 可显示图片
      .textarea-show-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 8px 10px;
        background: #fff;
      }
    }
    .chart-textarea {
      flex-grow: 1;
      display: flex;
      align-items: stretch;
      /deep/ .el-textarea__inner {
        border-width: 0;
      }
    }

    .opearte-row {
      margin: 20px 10px;
      text-align: right;
    }
  }

  .chart-textarea {

  }

  .upload-wrap {
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    padding-top: 8px;
    z-index: 9;
    transform: translateY(-100%);
    background: #fff;
    /*上传按钮定位*/
    /deep/ {
      .el-upload--picture-card {
        width: auto;
        height: auto;
        line-height: 1.2;
        border-width: 0;
      }
      .el-upload-list--picture-card .el-upload-list__item {
        width: 80px;
        height: 80px;
      }
      .el-upload.el-upload--picture-card {
        position: absolute;
        left: 506px;
        bottom: -173px;
      }
    }
  }

</style>
