<template>
  <div class="main">
    <div class="mb15">
      <el-button @click="back">{{ $t('返回') }}</el-button>
      <el-button type="primary" @click="toPrint">{{ $t('订单打印') }}</el-button>
    </div>

    <el-row :gutter="20">
      <el-col :sm="24" :md="8">
        <!-- 卡片 - 收货地址 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('收货地址') }}:</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="showEditShipAddress">
              {{ $t('编辑') }}
            </el-button>
          </div>

          <el-form label-width="100px" label-position="left">
            <el-form-item :label="$t('姓名')">
              {{ shipAddress.name +' '+ shipAddress.surname }}
            </el-form-item>
            <el-form-item :label="$t('地址')">
              {{ shipAddress.region ?
              shipAddress.address+','+shipAddress.city+','+shipAddress.region.name+','+shipAddress.country.name : '' }}
            </el-form-item>
            <el-form-item :label="$t('邮政编码')">
              {{ shipAddress ? shipAddress.postalCode : '' }}
            </el-form-item>
            <el-form-item :label="$t('电话')">
              {{ shipAddress.phone }}
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 卡片 - 收货地址 - end -->

        <!-- 卡片 - 账单地址 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('账单地址') }}:</span>
          </div>

          <el-form label-width="100px" label-position="left">
            <el-form-item :label="$t('姓名')">
              {{ billAddress.name+' '+billAddress.surname }}
            </el-form-item>
            <el-form-item :label="$t('地址')">
              {{ billAddress.region ?
              billAddress.address+','+billAddress.city+','+billAddress.region.name+','+billAddress.country.name : '' }}
            </el-form-item>
            <el-form-item :label="$t('邮政编码')">
              {{ billAddress ? billAddress.postalCode : '' }}
            </el-form-item>
            <el-form-item :label="$t('电话')">
              {{ billAddress.phone }}
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 卡片 - 账单地址 - end -->

        <!-- 卡片 - 配送方式  -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('配送方式') }}:</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="editDeliveryVisible = true">
              {{ $t('编辑') }}
            </el-button>
          </div>

          <el-form label-width="120px" label-position="left">
            <el-form-item :label="$t('配送公司')">
              {{ orderData.deliveryType }}
            </el-form-item>
            <el-form-item :label="$t('支付方式')">
              {{ orderData.payType ? orderData.payType.name : '' }}
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 卡片 - 配送方式 - end  -->
      </el-col>

      <el-col :sm="24" :md="16">
        <!-- 卡片 - 订单信息 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('订单信息') }}:</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="showEditOrderInfo">
              {{ $t('编辑') }}
            </el-button>
          </div>

          <el-form label-width="140px" label-position="left">
            <el-form-item :label="$t('订单号')">
              {{ this.$route.query.orderNum }}
            </el-form-item>
            <el-form-item :label="$t('采购商邮箱')">
              {{ orderData.usrEmail }}
            </el-form-item>
            <el-form-item :label="$t('订单时间')">
              {{ new Date(orderData.date).toLocaleString() }}
            </el-form-item>
            <el-form-item :label="$t('订单状态')">
              {{ convertStatus(orderData.status) }}
              <el-button v-if="orderData.status ==1" type="primary" @click="toupd1">确认付款</el-button>
              <el-button v-if="orderData.status ==1" type="primary" @click="toupd2">付款错误</el-button>
              <el-button v-if="orderData.status ==3" type="primary" @click="Confirmationofdelivery = true">确认收货
              </el-button>
              <el-button v-if="orderData.status ==5" type="primary" @click="toupd6">取消订单</el-button>
            </el-form-item>
            <el-form-item :label="$t('产品总额')">
              {{ orderData.subtotal }}
            </el-form-item>
            <el-form-item :label="$t('运费')">
              {{ orderData.shippingCharges || '0.00' }}
            </el-form-item>
            <el-form-item :label="$t('手续费')">
              {{ orderData.insurance || '0.00' }}
            </el-form-item>
            <el-form-item :label="$t('订单备注')">
              {{ orderData.remark || $t('none') }}
            </el-form-item>
            <el-form-item :label="$t('订单总价')">
              {{ orderData.total }}
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 卡片 - 订单信息 - end -->
      </el-col>
    </el-row>

    <!-- 产品信息列表 -->
    <el-table :data="tableData" border stripe class="products-table mb20">
      <el-table-column type="index"/>
      <el-table-column :label="$t('产品')" min-width="240">
        <template slot-scope="scope">
          <div class="goods-name">
            <img :src="image(scope.row.spec.images)" class="img-contain">
            {{ scope.row.spec.productName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('产品规格')" prop="spec.keyName" width="240"/>
      <el-table-column :label="$t('价格')" prop="spec.price" width="180"/>
      <el-table-column :label="$t('数量')" prop="qty" width="100"/>
      <el-table-column :label="$t('总价')" prop="subtotal" width="180"/>
    </el-table>
    <!-- 产品信息列表 - end -->

    <!-- 订单状态信息列表 -->
    <el-table :data="statusData" border stripe>
      <el-table-column :label="$t('时间')" prop="" width="240">
        <template slot-scope="scope">
          {{ new Date(scope.row.date).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('状态')" prop="status" width="240">
        <template slot-scope="scope">
          {{ convertStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作员')" prop="operator" width="240"/>
      <el-table-column :label="$t('操作描述')" prop="descrip"/>
    </el-table>
    <!-- 订单状态信息列表 - end -->

    <!-- 编辑收货地址时的对话框 -->
    <el-dialog
      v-if="editShipAddressForm.bean.address"
      :title="$t('收货地址')"
      :visible.sync="editShipAddressVisible">
      <el-form :model="editShipAddressForm" :rules="editOrderRules">

        <el-form-item :label="$t('姓氏')" :label-width="formLabelWidth" prop="bean.address.name">
          <el-input v-model="editShipAddressForm.bean.address.name"/>
        </el-form-item>

        <el-form-item :label="$t('名字')" :label-width="formLabelWidth" prop="bean.address.surname">
          <el-input v-model="editShipAddressForm.bean.address.surname"/>
        </el-form-item>

        <el-form-item :label="$t('国家')" :label-width="formLabelWidth" prop="bean.address.country">
          <el-select
            v-model="editShipAddressForm.bean.address.country"
            :placeholder="$t('请选择国家')"
            value-key="id"
            @change="getProvinceList"
          >
            <el-option
              v-for="country in countriesList"
              :label="country.name"
              :value="{id:country.id,name:country.name}"
              :key="country.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('省份')" :label-width="formLabelWidth" prop="bean.address.region">
          <el-select
            v-model="editShipAddressForm.bean.address.region"
            :placeholder="$t('请选择省份')"
            value-key="id">
            <el-option
              v-for="province in provincesList"
              :label="province.name"
              :value="{id:province.id,name:province.name}"/>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('城市')" :label-width="formLabelWidth" prop="bean.address.city">
          <el-input v-model="editShipAddressForm.bean.address.city"/>
        </el-form-item>

        <el-form-item :label="$t('地址')" :label-width="formLabelWidth" prop="bean.address.address">
          <el-input v-model="editShipAddressForm.bean.address.address"/>
        </el-form-item>

        <el-form-item :label="$t('邮政编码')" :label-width="formLabelWidth" prop="bean.address.postalCode">
          <el-input v-model="editShipAddressForm.bean.address.postalCode"/>
        </el-form-item>

        <el-form-item :label="$t('电话')" :label-width="formLabelWidth" prop="bean.address.phone">
          <el-input v-model="editShipAddressForm.bean.address.phone"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShipAddressVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="confirmEditShipAddress">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑收货地址时的对话框  - end -->

    <!-- 编辑订单信息时的对话框 -->
    <el-dialog :title="$t('编辑订单')" :visible.sync="editOrderInfoVisible">
      <el-form ref="orderInfoForm" :model="editOrderInfoForm" :rules="editOrderRules" label-width="140px">

        <el-form-item :label="$t('订单号')">
          {{ this.$route.query.orderNum }}
        </el-form-item>
        <el-form-item :label="$t('产品总价')" prop="subtotal">
          <el-input v-model="editOrderInfoForm.subtotal">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('运费')" prop="shippingCharges">
          <el-input v-model="editOrderInfoForm.shippingCharges">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('手续费')" prop="insurance">
          <el-input v-model="editOrderInfoForm.insurance">
            <i slot="prefix">$</i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('备注')">
          <el-input v-model="editOrderInfoForm.remark" :placeholder="$t('none')"/>
        </el-form-item>
        <el-form-item :label="$t('订单总价')">
          $ {{ computedTotalPrice }}
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOrderInfoVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="confirmEditOrderInfo">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑订单信息时的对话框  - end -->

    <!-- 编辑配送方式时的对话框 -->
    <el-dialog :title="$t('编辑配送方式')" :visible.sync="editDeliveryVisible">
      <el-form>

        <el-form-item :label="$t('订单号')" :label-width="formLabelWidth">
          {{ this.$route.query.orderNum }}
        </el-form-item>
        <el-form-item :label="$t('配送方式')" :label-width="formLabelWidth">
          <el-select
            v-model="editDeliveryForm.deliveryType"
            :placeholder="$t('请选择方式')"
            value-key="company">
            <el-option v-for="item in deliveryCompaniesList" :label="item.company" :value="item.company"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDeliveryVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="confirmEditDelivery">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑配送方式时的对话框  - end -->
    <!-- 编辑配送方式时的对话框 -->
    <el-dialog :title="$t('确认发货')" :visible.sync="Confirmationofdelivery">
      <el-form>

        <el-form-item :label="$t('订单号')" :label-width="formLabelWidth">
          {{ this.$route.query.orderNum }}
        </el-form-item>
        <el-form-item :label="$t('发货方式')" :label-width="formLabelWidth">
          {{ orderData.deliveryType }}
        </el-form-item>
        <el-form-item :label="$t('运单号')" :label-width="formLabelWidth">
          <el-input v-model="waybillnumber"/>
        </el-form-item>
        <el-form-item :label="$t('包裹备注')" :label-width="formLabelWidth">
          <el-input v-model="parcelremark"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Confirmationofdelivery = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="ofdelivery">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑配送方式时的对话框  - end -->
  </div>
</template>
<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  data() {
    return {
      waybillnumber: '',
      parcelremark: '',
      formLabelWidth: '120px',
      orderData: {}, // 该订单的全部信息
      editShipAddressVisible: false, // 是否显示 编辑收获地址的 编辑框
      editOrderInfoVisible: false, // 是否显示 编辑order的 编辑框
      editDeliveryVisible: false, // 是否显示 编辑配送方式的 编辑框
      Confirmationofdelivery: false,
      editShipAddressForm: { bean: {}}, // 编辑收获地址的data
      editOrderInfoForm: {}, // 编辑order的data
      editDeliveryForm: {}, // 编辑配送方式的data
      countriesList: [], // 国家列表
      provincesList: [], // 省份列表
      deliveryCompaniesList: [], // 快递公司列表
      editOrderRules: { // 修改订单时的规则
        subtotal: [
          { required: true, message: '产品总价必须为数字', trigger: ['blur', 'change'], pattern: /^\d+(\.\d+)?$/ }
        ],
        shippingCharges: [
          { required: true, message: '运费必须为数字', trigger: ['blur', 'change'], pattern: /^\d+(\.\d+)?$/ }
        ],
        insurance: [
          { required: true, message: '保险费必须为数字', trigger: ['blur', 'change'], pattern: /^\d+(\.\d+)?$/ }
        ],
        'bean.address.name': [
          { required: true, message: '该值不能为空', trigger: ['blur', 'change'] }
        ],
        'bean.address.surname': [
          { required: true, message: '该值不能为空', trigger: ['blur', 'change'] }
        ],
        'bean.address.country': [
          { required: true, message: '该值不能为空', trigger: ['blur', 'change'] }
        ],
        'bean.address.region': [
          { required: true, message: '该值不能为空', trigger: ['blur', 'change'] }
        ],
        'bean.address.city': [
          { required: true, message: '该值不能为空', trigger: ['blur', 'change'] }
        ],
        'bean.address.address': [
          { required: true, message: '该值不能为空', trigger: ['blur', 'change'] }
        ],
        'bean.address.postalCode': [
          { required: true, message: '该值不能为空并且只能为数字', trigger: ['blur', 'change'], pattern: /^\d+(\.\d+)?$/ }
        ],
        'bean.address.phone': [
          { required: true, message: '该值不能为空并且只能为数字', trigger: ['blur', 'change'], pattern: /^\d+(\.\d+)?$/ }
        ]
      }
    }
  },
  computed: {
    // 收货地址
    shipAddress() {
      return this.orderData.shipAddress ? this.orderData.shipAddress : {}
    },
    // 账单地址
    billAddress() {
      return this.orderData.billAddress ? this.orderData.billAddress : {}
    },
    // 产品信息 - table显示
    tableData() {
      return this.orderData.lines ? this.orderData.lines : []
    },
    // 订单状态历史信息 - table显示
    statusData() {
      return this.orderData.historys ? this.orderData.historys : []
    },
    // 修改订单时，总额随 产品总价：运费：保险费：改变而改变
    computedTotalPrice() {
      console.log('in')
      const totalPrice = Number(this.editOrderInfoForm.subtotal > 0 ? this.editOrderInfoForm.subtotal : 0) +
          Number(this.editOrderInfoForm.shippingCharges > 0 ? this.editOrderInfoForm.shippingCharges : 0) +
          Number(this.editOrderInfoForm.insurance > 0 ? this.editOrderInfoForm.insurance : 0)
      return totalPrice
    }
  },
  mounted() {
    // 初始化页面
    this.init()
    // 获取国家列表
    this.getCountriesList()
  },
  methods: {
    image(src) {
      if (src) {
        return store.getters.ImageBaseUrl + src
      }
      return '沒有圖片'
    },
    // 初始化页面
    init() {
      request({
        url: '/seller/odr_OdrOrder_select',
        method: 'post',
        data: {
          orderNum: this.$route.query.orderNum
        }
      }).then((res) => {
        console.log('res', res.data.result)
        if (res.data.ret != 1) return
        this.orderData = res.data.result

        // 获取快递公司列表 - 需要知道orderData中的配送方式 进行循环判断 - 后台返回的不是id，而是company
        this.getDeliveryCompaniesList()
      })
    },
    // 状态码 转 文字
    convertStatus(num) {
      switch (num) {
        case 0:
          return this.$t('待付款')
        case 1:
          return this.$t('订单确认付款')
        case 2:
          return this.$t('付款错误')
        case 3:
          return this.$t('等待发货')
        case 4:
          return this.$t('已发货')
        case 5:
          return this.$t('完成订单')
        case 6:
          return this.$t('已取消订单')
        case 7:
          return this.$t('已删除')
      }
    },

    // 点击弹出修改 收获地址框
    showEditShipAddress() {
      this.editShipAddressVisible = true
      this.$set(this.editShipAddressForm.bean, 'address', Object.assign({}, this.shipAddress))
      this.getProvinceList(this.editShipAddressForm.bean.address.country.id)
    },

    // 确认修改收货地址
    confirmEditShipAddress() {
      // 按老的传参方式进行传参
      const data = {
        'city': this.editShipAddressForm.bean.address.city,
        'region': this.editShipAddressForm.bean.address.region,
        'country': this.editShipAddressForm.bean.address.country,
        'address': this.editShipAddressForm.bean.address.address,
        'surname': this.editShipAddressForm.bean.address.surname,
        'postalCode': this.editShipAddressForm.bean.address.postalCode,
        'name': this.editShipAddressForm.bean.address.name,
        'phone': this.editShipAddressForm.bean.address.phone
      }
      request({
        url: '/seller/odr_OdrOrder_updaddress',
        method: 'post',
        data: {
          'bean.address': JSON.stringify(data),
          'bean.orderNum': this.$route.query.orderNum
        }
      }).then((res) => {
        console.log('confirmEdit', res)
        if (res.data.ret != 1) return
        this.editShipAddressVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        // 重新载入页面
        this.init()
      }).catch((err) => {
        console.log(err)
        this.editShipAddressVisible = false
      })
    },

    // 点击弹出修改 订单信息框
    showEditOrderInfo() {
      this.editOrderInfoVisible = true
      this.editOrderInfoForm = Object.assign({}, this.orderData)
    },
    // btn-确认修改订单
    confirmEditOrderInfo() {
      this.$refs.orderInfoForm.validate((isRight) => {
        if (!isRight) return
        if (this.editOrderInfoForm.subtotal == '' || this.editOrderInfoForm.shippingCharges == '' || this.editOrderInfoForm.insurance == '') return
        request({
          url: '/seller/odr_OdrOrder_updorder',
          method: 'post',
          data: {
            'bean.orderNum': this.$route.query.orderNum,
            'bean.prodPrice': this.editOrderInfoForm.subtotal,
            'bean.freightPrice': this.editOrderInfoForm.shippingCharges,
            'bean.insurancePrice': this.editOrderInfoForm.insurance,
            'bean.odrRemarks': this.editOrderInfoForm.remark,
            'bean.priceTotal': this.computedTotalPrice
          }
        }).then((res) => {
          if (res.data.ret != 1) return
          this.editOrderInfoVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // 重新载入页面
          this.init()
        }).catch((e) => {
          console.log(e)
          this.editOrderInfoVisible = false
        })
      })
    },
    // btn-确认修改配送方式
    confirmEditDelivery() {
      if (!this.editDeliveryForm.deliveryType) return
      request({
        url: '/seller/odr_OdrOrder_updcompany',
        method: 'post',
        data: {
          'bean.orderNum': this.$route.query.orderNum,
          'bean.delivery': this.editDeliveryForm.deliveryType
        }
      }).then((res) => {
        if (res.data['bean.pkey'] <= 0) return

        this.editDeliveryVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        // 重新载入页面
        this.init()
      }).catch((e) => {
        console.log(e)
        this.editDeliveryVisible = false
      })
    },

    // 获取国家列表
    getCountriesList() {
      request({
        url: '/seller/plt_PltCountry_list',
        method: 'post'
      }).then((res) => {
        console.log('getCountriesList', res)
        if (!res.data.items || (res.data.items.length == 0)) return
        this.countriesList = res.data.items
      })
    },

    // 获取省份列表
    getProvinceList(countryId) {
      if (typeof countryId === 'object') {
        countryId = countryId.id
      }
      const self = this
      request({
        url: '/home/plt_PltProvince_list',
        method: 'post',
        data: { 'countryId': countryId }
      }).then((res) => {
        console.log('getProvinceList', res)
        if (res.data.ret != 1) return
        self.provincesList = res.data.result
        self.editShipAddressForm.bean.address.region = self.provincesList[0]
      })
    },

    // 获取快递公司列表
    getDeliveryCompaniesList(countryId) {
      request({
        url: '/seller/plt_PltFreightSeller_listfreight',
        method: 'post'
      }).then((res) => {
        if (!res.data.data || res.data.data.length == 0) return
        const deliveryCompaniesList = res.data.data
        // this.$set(this.editDeliveryForm,"deliveryCompaniesList",deliveryCompaniesList)
        this.deliveryCompaniesList = deliveryCompaniesList
        this.$set(this.editDeliveryForm, 'deliveryType', this.orderData.deliveryType)
        // 判断选中的是哪个公司，获取选中公司的id
        // deliveryCompaniesList.forEach((val,index)=>{
        //   if( val.company == this.orderData.deliveryType ) {
        //     this.$set(this.editDeliveryForm,"deliveryType",val.id)
        //   }
        // })
      })
    },
    // 后退
    back(event, n) {
      n = n || -1
      this.$router.go(n)
    },
    // 去打印
    toPrint() {
      console.log('toPrint')
      this.$router.push('/order/print?orderNum=' + this.$route.query.orderNum + '&print=1')
    }, toupd1() {
      const self = this
      this.$confirm('是否确认付款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/odr_OdrOrder_updline',
          method: 'post',
          data: {
            'bean.orderNum': this.$route.query.orderNum,
            'bean.state': 3
          }
        }).then(res => {
          if (res.data.ret == 1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          self.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '修改删除'
        })
      })
    }, toupd2() {
      const self = this
      this.$confirm('是否付款错误', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/odr_OdrOrder_updline',
          method: 'post',
          data: {
            'bean.orderNum': this.$route.query.orderNum,
            'bean.state': 3
          }
        }).then(res => {
          if (res.data.ret == 1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          self.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '修改删除'
        })
      })
    }, ofdelivery() {
      const self = this
      this.$confirm('是否确认收货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/seller/odr_OdrOrder_upddeliver',
          method: 'post',
          data: {
            'bean.orderNum': this.$route.query.orderNum,
            'bean.state': 4,
            'bean.expressNum': this.waybillnumber,
            'bean.pagRemarks': this.parcelremark
          }
        }).then(res => {
          if (res.data.ret == 1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          this.Confirmationofdelivery = false
          self.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '修改删除'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 25px;
  }

  .box-card {
    margin-bottom: 15px;
    /deep/ .el-card__body {
      padding: 10px 20px;
    }
    // 头部高度太大
    /deep/ .el-card__header {
      line-height: 22px;
      padding: 10px 20px;
    }
    // 防止高度过大
    .el-form-item {
      margin-bottom: 0
    }
  }

  .products-table {
    .goods-name {
      img {
        width: 60px;
        height: 60px;
      }
    }
  }

  // 下拉选的width
  .el-select {
    width: 100%;
  }

  /deep/ {
    .el-form-item__label {
      white-space: nowrap;
      overflow: hidden;
    }
    // form label添加 ":"
    .el-form-item__label:after {
      content: ":";
      display: inline-block;
    }
    .el-input__prefix {
      min-width: 30px;
    }
  }
</style>
