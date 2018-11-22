<template>
  <div>
    <el-card class="main">
      <div>表单信息</div>
      <el-form size="mini">
        <el-form-item label="姓名">
          <el-input v-model="info.name" readonly/>
        </el-form-item>
        <el-form-item label="国家">
          <el-input :value="getCountryName(info.country)" readonly/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="info.tel" readonly/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="info.email" readonly/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="info.inquiry" :autosize="{ minRows: 2, maxRows: 50}" type="textarea" readonly/>
        </el-form-item>
      </el-form>
      <el-button class="button" @click="closeButton()">返回</el-button>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import request from '@/utils/request'

export default {
  name: 'ActivitySignInView',
  data() {
    return {
      info: {
        name: '',
        country: '',
        tel: '',
        email: '',
        inquiry: ''
      }
    }
  }, mounted() {
    if (this.$route.query && this.$route.query.id) {
      request({
        url: '/seller/activitys_Activity_load',
        method: 'get',
        params: {
          id: this.$route.query.id
        }
      }).then(value => {
        if (value.data.ret === 1) {
          this.$set(this, 'info', value.data.result)
        }
      })
    }
  },
  methods: {
    closeButton() {
      store.dispatch('delCurrentViews', {
        view: this.$route,
        $router: this.$router
      })
    }, getCountryName(id) {
      for (const countryKey of store.state.app.country) {
        if (countryKey.id == id) {
          return countryKey.name
        }
      }
      return '未知国家'
    }
  }
}
</script>

<style scoped>
  .main {
    width: 800px;
    margin: 25px;
  }

  .button {
    margin: 0 auto;
    text-align: center;
  }
</style>
