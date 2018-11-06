<template>
  <div >
    <el-card>
      <div v-for="i in 4" :key="i" class="msg-box">
        <div class="msg-header">
          <span class="name">慕枫</span>

          <div class="time">
            2011-11-11 11:11
          </div>
        </div>
        <div class="msg-content">
          这个系统可以的*{{ i }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  // components: { PanThumb, Mallki },
  //
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       success: 'success',
  //       pending: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  // data() {
  //   return {
  //     statisticsData: {
  //       article_count: 1024,
  //       pageviews_count: 1024
  //     }
  //   }
  // },
  // computed: {
  //   ...mapGetters([
  //     'name',
  //     'roles'
  //   ])
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-card__body {
    padding: 0;
  }

  .msg-box {
    padding: 18px 30px;
    color: #999;
    font-size: 16px;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom-width: 0;
    }

    .msg-header {
      height: 32px;
      line-height: 24px;
      .name {
        color: #333;
        font-weight: bold;
      }
      .time {
        float: right;
        font-size: 14px;
      }
    }
    .msg-content {

    }
  }
</style>
