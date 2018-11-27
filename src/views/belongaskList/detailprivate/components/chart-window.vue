<template>
  <!-- 右上角 - 主要的聊天窗口 -->
  <div class="chart-window-box">
    <!-- 顶部人物选择 -->
    <el-scrollbar class="chart-people-list">
      <li class="chart-people-item active">
        聊天/报价
      </li>
    </el-scrollbar>
    <!-- 聊天窗口区域 -->
    <el-scrollbar id="content" ref="content" :style="{'padding-bottom':paddingBottom}" class="chart-window-content">
      <!-- <div class="chart-window-content"> -->
      <template v-if="data.relations && data.relations[0]">
        <div v-for="(value) in data.relations[0].msgs">
          <div v-if="value.p2S===false" class="chart-content-item mine">
            <img v-if="data.supplierimage" :src="getImageUrl(data.supplierimage)" alt="" class="header-img">
            <img v-else src="../images/supplier.png" class="img-header">
            <div class="chart-content-box">
              <div class="name-and-time">
                <span class="mr15">{{ data.supplieremail }}</span>
                <span>{{ value.sendTime }}</span>
              </div>
              <div class="chart-text-box" v-html="value.content"/>
            </div>
          </div>

          <div v-else class="chart-content-item">
            <img v-if="data.purchaseimage" :src="getImageUrl(data.purchaseimage)" alt="" class="header-img">
            <img v-else src="../images/purchase.png" class="img-header">
            <div class="chart-content-box">
              <div class="name-and-time">
                <span class="mr15">{{ data.email }}</span>
                <span>{{ value.sendTime }}</span>
              </div>
              <div class="chart-text-box" v-html="value.content"/>
            </div>
          </div>
        </div>
      </template>
      <!-- </div> -->
    </el-scrollbar>

  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Guide',
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    paddingBottom: {
      default: 0
    }
  },
  data() {
    return {
      textHaveImg: 'nihao,<img src=\'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191\'>'
    }
  },
  watch: {
    data() {
      this.initData()
    }
  },
  mounted() {
  }, updated() {
    var scrollContent = document.getElementById('content')
    if (scrollContent != null) {
      scrollContent = scrollContent.children[0]
    }
    this.$nextTick(() => {
      scrollContent.scrollTop = 30000
    })
  },
  methods: {
    getImageUrl(url) {
      if (url && url.length > 0) {
        const temp = url.split(',')
        if (temp.length > 0) {
          return store.getters.ImageBaseUrl + temp[0] + '?x-oss-process=image/resize,m_pad,h_100,w_100'
        }
        return store.getters.ImageBaseUrl + url + '?x-oss-process=image/resize,m_pad,h_100,w_100'
      }
      return url
    },
    initData() {
      var relations = this.data.relations[0].msgs
      for (var i = 0; i < relations.length; i++) {
        if (relations[i].content.indexOf('<IMG_START>') != -1) {
          var reg = new RegExp('<IMG_START>', 'g')
          this.data.relations[0].msgs[i].content = relations[i].content.replace(reg, '<img src=\'' + store.getters.ImageBaseUrl)
          reg = new RegExp('<IMG_END>', 'g')
          this.data.relations[0].msgs[i].content = relations[i].content.replace(reg, '\'/>')
        }
      }
    }

  }
}
</script>
<style lang="scss" scoped>
  // 主要的聊天窗口
  .chart-window-box {
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    // border: 2px solid #ebeff3;
  }

  // 顶部人物选择
  .chart-people-list {
    position: relative;
    top: 2px;
    height: 36px;
    margin-left: 30px;
    // overflow: auto;
    /deep/ .el-scrollbar__wrap {
      padding-left: 30px;
      overflow-y: hidden;
      overflow-x: auto;
    }
  }

  .chart-people-item {
    position: relative;
    display: inline-block;
    min-width: 130px;
    height: 34px;
    line-height: 30px;
    padding: 0 15px;
    margin-right: 10px;
    text-align: center;
    border-top: 2px solid #ebeff3;
    background: #fff;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -5px;
      height: 100%;
      width: 10px;
      border-left: 2px solid #ebeff3;
      background: #fff;
      transform: skewX(-20deg);
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: -5px;
      height: 100%;
      width: 10px;
      border-right: 2px solid #ebeff3;
      background: #fff;
      transform: skewX(20deg);
    }
    &.active {
      z-index: 9;
    }
  }

  // 聊天窗口区域
  .chart-window-content {
    flex-grow: 1;
    padding: 20px 0;
    border: 2px solid #ebeff3;
    color: #999;
    // overflow: auto;
    height: 538px;
    background: #fff;
  }

  .chart-content-item {
    display: flex;
    margin-bottom: 20px;
    .header-img {
      width: 50px;
      height: 50px;
      margin: 16px 10px 0;
      border-radius: 50%;
      object-fit: cover;
    }
    .chart-content-box {
      max-width: 80%;
      line-height: 1.3;
    }
    .chart-text-box {
      position: relative;
      display: inline-block;
      padding: 15px 10px;
      margin-top: 6px;
      border-radius: 8px;
      background: #f3f5fb;
      /deep/ img {
        max-height: 200px;
        max-width: 200px;
        border-radius: 4px;
      }
      &:before {
        content: "";
        position: absolute;
        left: -6px;
        top: 12px;
        width: 16px;
        height: 10px;
        transform: skewX(45deg) skewY(-25deg);
        border-radius: 2px;
        background: #f3f5fb;
      }
    }

    &.mine {
      flex-direction: row-reverse;
      .chart-text-box {
        color: #fff;
        background: #4676ef;

        &:before {
          content: "";
          position: absolute;
          left: auto;
          right: -6px;
          top: 12px;
          width: 16px;
          height: 10px;
          transform: skewX(45deg) skewY(-25deg);
          border-radius: 2px;
          background: #4676ef;
        }
      }
    }
  }
</style>
