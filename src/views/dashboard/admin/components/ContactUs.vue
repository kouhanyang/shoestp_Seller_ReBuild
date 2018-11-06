<template>
  <el-card class="p20">
    <div class="tc mb20">
      <i class="el-icon-service"></i>
    </div>
    <div class="item">
      <svg-icon icon-class="qq" class-name="disabled" />
      <div class="text">
        769306890
      </div>
    </div>
    
    <div class="item">
      <svg-icon icon-class="qq" class-name="disabled" />
      <div class="text">
        769306890@qq.com
      </div>
    </div>
  </el-card>
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
  .el-icon-service{
    font-size: 82px;
    color: #356bed;
  }

  .item{
    .text{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      color: #999;
    }
  }
</style>
