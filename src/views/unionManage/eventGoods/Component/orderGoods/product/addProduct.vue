.<template>
  <div>
    <el-dialog :visible.sync="dialogTableVisible.addProductShow" title="添加商品">
      <el-transfer
        v-model="value"
        :titles="['未添加商品','已添加商品']"
        :button-texts="['移除', '添加']"
        :props="{
          key: 'id',
          label: 'name'
        }"
        :data="data"
        filterable>
        <span slot-scope="{ option }">
          <el-form
            v-if="value.indexOf(option.id)>=0"
            :ref="'formCommit'+option.id"
            :model="option"
            class="transfer-wrap"
            label-position="right">
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <img
                    :src="option.image |imageAddPrefix"
                    width="100"
                    height="100">
                </el-form-item>
              </el-col>
              <el-col :span="19" class="transferWrap">
                {{ option.name }}
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="原采购价:">
                      {{ option.oldPrice }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="原起订量:">
                      {{ option.oldMoq }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <!--{ message: '年龄必须为数字值',pattern: /^\d{n}$/},-->
                    <el-form-item
                      :rules="[
                        {
                          pattern: /^[0-9]+$/,
                          message: '用户名只能为中文'
                        }
                      ]"
                      label="订购会价:"
                      prop="newPrice">
                      <el-input
                        v-model="option.newPrice"
                        style="width: 150px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="现起订量:">
                      <el-input v-model.number="option.moq" style="width: 150px"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="目标量:">
                      <el-input v-model.number="option.aims" style="width: 150px"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <template v-else>
            <el-form
              class="transfer-wrap"
              label-position="right">
              <el-row>
                <el-col :span="5">
                  <el-form-item>
                    <img
                      :src="option.image |imageAddPrefix"
                      width="100"
                      height="100">
                  </el-form-item>
                </el-col>
                <el-col :span="19" class="transferWrap">
                  {{ option.name }}
                  <el-form>
                    <el-form-item label="产品编号:">
                      {{ option.code }}
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </span>
      </el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible.addProductShow = false">取 消</el-button>
        <el-button type="primary" @click="addProduct">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  filters: {
    imageAddPrefix: function(url) {
      if (!url) return ''
      url = url.toString()
      return store.getters.ImageBaseUrl + url
    }
  },
  props: {
    dialogTableVisible: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      data: [],
      value: []
    }
  },
  computed: {
    newPrices: function() {
      var num = 0
      return num
    }
  }, watch: {
    'dialogTableVisible.id': function() {
      this.getProducts()
      this.getAddedProducts()
    }
  },
  methods: {
    getProducts() {
      const self = this
      request({
        url: '/seller/omt_OdrMeeting_getProducts',
        method: 'get'
      }).then(data => {
        if (data.data.ret != 1) {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        } else {
          self.data = data.data.result
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getAddedProducts() {
      const self = this
      request({
        url: '/seller/omt_OdrMeeting_getAddedProducts',
        method: 'get',
        params: {
          // self.dialogTableVisible.id
          id: 1
        }
      }).then(data => {
        self.value = data.data.result
      }).catch(err => {
        console.log(err)
      })
    },
    addProduct() {
      const self = this
      var i = 0
      self.value.forEach((value) => {
        var string = 'formCommit' + value
        self.$refs[string].validate((valid) => {
          if (valid) {
            i++
          } else {
            self.$message({
              type: 'error',
              message: '请正确填写数据'
            })
            return
          }
        })
      })
      console.log(i)
      console.log(self.value.length)
      if (i === self.value.length) {
        const arr = []
        self.value.forEach((val) => {
          self.data.forEach((key) => {
            if (key.id === val) {
              arr.push({
                id: key.id,
                oldPrice: key.oldPrice,
                oldMoq: key.oldMoq,
                newPrice: key.newPrice,
                moq: key.moq,
                aims: key.aims
              })
            }
          })
        })
        request({
          url: '/seller/omt_OdrMeeting_addProducts',
          method: 'post',
          data: {
            // self.dialogTableVisible.id
            id: 1,
            products: JSON.stringify(arr)
          }
        }).then(data => {
          if (data.data.ret != 1) {
            self.$message({
              type: 'error',
              message: data.data.msg
            })
          } else {
            self.dialogTableVisible.addProductShow = false
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>
  /deep/ .el-transfer-panel {
    width: 45%;
  }

  .transfer-wrap /deep/ .el-form-item__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .transfer-wrap /deep/ .el-row .el-form-item__content {
    justify-content: left;
  }

  .transfer-wrap /deep/ .el-checkbox.el-transfer-panel__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /deep/ .el-transfer-panel__item {
    height: auto;
    margin-bottom: 10px;
  }

  /deep/ .el-transfer-panel__item .el-checkbox__input {
    top: 50%;
    transform: translateY(-20px);
  }

  .transferWrap /deep/ .el-form-item {
    margin-bottom: 0px;
  }

  .transferWrap /deep/ .el-row:last-child .el-form-item {
    margin-bottom: 0;
  }

  /*穿梭框高度*/
  /deep/ .el-transfer-panel__body {
    height: 746px;
  }

  /deep/ .el-transfer-panel__list {
    height: 746px;
  }

  /deep/ .el-transfer-panel__list.is-filterable {
    height: 694px;
  }

  /deep/ .el-transfer__button:first-child {
    margin-bottom: 30px;
  }
</style>
