<template>
  <div class="app-container">
    <!-- 左侧 - 询盘详情 -->
    <div class="inquiry-detail-box">
      <div class="chart-header">询盘内容</div>
      <!-- 供应商信息 -->
      <div class="supplier-info flex">
        <img v-if="data.purchaseimage" :src="getImageUrl(data.purchaseimage)" class="img-header">
        <img v-else src="../images/purchase.png" class="img-header">
        <div class="supplier-text">
          <div class="email">{{ data.email }}</div>
          <div class="time">{{ data.createTime }}</div>
        </div>
      </div>
      <!-- 询盘简介 -->
      <div class="inquiry-info flex">
        <img :src="getImageUrl(data.image)" class="inquiry-goods-img">
        <div>
          <p class="line">Article no: {{ data.productNum }}</p>
          <p>Quantity : {{ data.quantity }} Pairs</p>
        </div>
      </div>

      <!-- 询盘详情 -->
      <div class="inquiry-detail-box-inner">
        <div class="inquiry-title">
          文字标题:{{ data.title }}
        </div>
        <el-scrollbar class="inquiry-detail">
          询盘详情:
          {{ data.content }}

        </el-scrollbar>
      </div>
    </div>
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
    }
  },
  data() {
    return {
      driver: null
    }
  },
  mounted() {
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
    }

  }
}
</script>
<style lang="scss" scoped>
  .inquiry-detail-box {
    color: #666;
  }

  // 左侧 - 询盘详情
  .inquiry-detail-box {
    width: 250px;
    .chart-header {
      height: 36px;
      line-height: 36px;
      margin-left: 10px;
      border-bottom: 2px solid #4676ef;
    }
    // 供应商信息
    .supplier-info {
      min-height: 100px;
      padding: 10px;
      .img-header {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
      }
      .time {
        margin-top: 4px;
        color: #aaa;
      }
    }
    // 询盘简介
    .inquiry-info {
      padding: 8px 10px;
      background: #f3f5fb;
      .inquiry-goods-img {
        width: 100px;
        height: 100px;
        margin-right: 6px;
        border: 1px dashed #ccc;
      }
      .line {
        margin-bottom: 6px;
      }
    }
    // 询盘详情
    .inquiry-detail-box-inner {
      padding: 18px 10px 10px;
      font-size: 15px;
      .inquiry-detail {
        line-height: 30px;
        height: 400px;
        color: #aaa;
      }
    }
  }

</style>
