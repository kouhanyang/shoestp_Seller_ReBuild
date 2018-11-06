<template>
  <div class="AreaMain">
    <el-container>
      <el-aside style="width: 250px">
        <CoutryList
          :coutry-list="coutryList"
          @changRightComp="changRightComp"
          @editAreaSetting="editAreaSetting"
          @editCoutrySetting="editCoutrySetting"
          @removeAreaSetting="removeAreaSetting"/>
      </el-aside>
      <el-main v-if="show" class="right">
        <areaView
          v-if="flag"
          :title="title"
          :company="company"
          :jstype="jstype"
          :id="areaId"
          :main-id="id"
          @load="load"/>
        <CoutrySetting v-if="!flag" :id="areaId"/>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'AreaIndex',
  components: {
    CoutrySetting: () => import('./CoutrySetting'),
    areaView: () => import('./areaView'),
    CoutryList: () => import('./AreaList')
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    company: {
      type: String,
      default: ''
    },
    jstype: {
      type: String,
      default: 'No Data'
    }
  },
  data() {
    return {
      flag: false,
      show: false,
      title: '编辑',
      coutryList: [],
      areaId: -1
      // ,       filterCoutry: {}
    }
  }, mounted() {
    this.load()
  }, methods: {
    load: function(id) {
      const self = this
      var selid = this.id
      if (id != undefined) {
        console.log(id)
        selid = id
      }
      // request({
      //   url: '/seller/plt_PltCountryFreight_list',
      //   method: 'get'
      // }).then(function(data) {
      //   data.data.items.forEach(value => {
      //     if (!self.filterCoutry[value.region.split('##')[0]]) {
      //       self.filterCoutry[value.region.split('##')[0]] = []
      //     }
      //     self.filterCoutry[value.region.split('##')[0]].push(parseInt(value.country.split('##')[0]))
      //   })
      // })
      request({
        url: '/seller/plt_PltFreightSellerLine_list',
        method: 'post',
        data: {
          filter: JSON.stringify([{ 'property': 'main', 'value': selid }])
        }
      }).then(function(result) {
        self.coutryList = []
        if (result.data && result.data.items) {
          result.data.items.forEach(function(k, v) {
            self.coutryList.push({
              id: k.pkey,
              name: k.section
            })
          })
        }
      })
    },
    changRightComp: function() {
      this.areaId = -1
      this.title = '添加区域'
      this.flag = true
      this.show = true
    },
    editAreaSetting: function(id) {
      this.areaId = id
      this.title = '编辑区域'
      this.flag = true
      this.show = true
    }, editCoutrySetting: function(id) {
      this.areaId = id
      this.flag = false
      this.show = true
    }, removeAreaSetting: function(id) {
      const self = this
      this.$confirm('是否删除该配送区域', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/plt_PltFreightSellerLine_del',
          method: 'post',
          data: {
            pkey: id
          }
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            self.load(this.id)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .right {
    padding: 0 0 0 15px;
  }
</style>
