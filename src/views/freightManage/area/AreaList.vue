<template>
  <div class="coutryList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>区域设置</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="add">
          <svg-icon icon-class="增加"/>
        </el-button>
      </div>
      <div v-for="d in coutryList" :key="d.id" class="text item">
        {{ d.name }}
        <span class="right">
          <a href="javascript:void(0)" @click="coutry(d.id)"><svg-icon icon-class="设置"/></a>
          <a href="javascript:void(0)" @click="edit(d.id)"><svg-icon icon-class="编辑"/></a>
          <a href="javascript:void(0)" @click="remove(d.id)"><svg-icon icon-class="删除"/></a>
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
// import request from '@/utils/request'

export default {
  name: 'AreaList',
  props: {
    coutryList: {
      type: Array, default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  }, mounted() {

  }, methods: {
    add: function() {
      this.$emit('changRightComp')
    }, edit: function(id) {
      this.$emit('editAreaSetting', id)
    }, remove: function(id) {
      this.$emit('removeAreaSetting', id)
    }, coutry: function(id) {
      this.$emit('editCoutrySetting', id)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .item {
    margin-bottom: 18px;
  }

  .right {
    float: right;
  }

  .right a {
    padding-left: 5px;
  }
</style>
