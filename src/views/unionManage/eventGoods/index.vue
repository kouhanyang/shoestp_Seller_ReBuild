<template>
  <div class="main">
    <orderInformation :order-informations="orderInformation"/>
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="订购会商品" name="orderGoods">
          <orderGoods :goods-ordered-will="orderGoods" @checkOrder="jumpOrder" @salesDetails="jumpSalesDetails"/>
        </el-tab-pane>
        <el-tab-pane label="合作商" name="partner">
          <partner :partner="partner" @viewProduct="jumpProduct" @viewOrder="jumpOrder"/>
        </el-tab-pane>
        <el-tab-pane label="销售明细" name="salesDetails">
          <salesDetails :sales-details="salesDetails"/>
        </el-tab-pane>
        <el-tab-pane label="订购会订单" name="orderOrder">
          <order-order :order-order="orderOrder"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import orderInformation from './Component/orderInformation/orderInformation'
import orderGoods from './Component/orderGoods/orderGoods'
import partner from './Component/Partner/partner'
import salesDetails from './Component/SalesDetails/salesDetails'
import orderOrder from './Component/OrderOrder/orderOrder'

export default {
  components: {
    'orderInformation': orderInformation,
    'orderGoods': orderGoods,
    'partner': partner,
    'salesDetails': salesDetails,
    'orderOrder': orderOrder
  },
  data() {
    return {
      omtId: 0, // 订购会pkey
      watchId: 0, // 给子组件做监听作用
      orderInformation: 0, // 订购会信息
      partner: {}, // 合作商信息以及合作商搜索
      orderGoods: {}, // 订购会商品信息以及搜索
      salesDetails: {}, // 销售明细以及商品搜索
      orderOrder: {}, // 订购会订单以及订单搜索
      activeName: 'orderGoods'
    }
  },
  mounted() {
    const self = this
    self.orderInformation = self.$route.query.id
    self.orderGoods = { omtId: self.omt, watchId: this.watchId }
  },
  methods: {
    jumpProduct(val) {
      this.orderGoods = {
        omtId: val.omtId,
        supplierId: val.id,
        watchId: this.watchId
      }
      this.activeName = 'orderGoods'
    },
    jumpOrder(val) {
      this.orderOrder = {
        omtId: val.omtId,
        // orderId: val.id,
        watchId: this.watchId
      }
      this.activeName = 'orderOrder'
    },
    jumpSalesDetails(val) {
      this.salesDetails = {
        omtId: val.omtId,
        // salesDetailsId: val.id,
        watchId: this.watchId
      }
      this.activeName = 'salesDetails'
    },
    handleClick() {
      const self = this
      self.watchId += 1
      self.orderInformation = self.$route.query.id
      self.omt = self.$route.query.id
      switch (this.activeName) {
        case 'orderGoods':// 订购会商品信息以及搜索信息
          self.orderGoods = { omtId: self.omt, watchId: this.watchId }
          break
        case 'partner':// 合作商信息以及合作商搜索信息
          self.partner = { omtId: self.omt, watchId: this.watchId }
          break
        case 'salesDetails':// 销售明细以及商品搜索信息
          self.salesDetails = { omtId: self.omt, watchId: this.watchId }
          break
        case 'orderOrder':// 订购会订单以及订单搜索信息
          self.orderOrder = { omtId: self.omt, watchId: this.watchId }
          break
      }
    }
  }
}
</script>

<style scoped>
  .main {
    margin: 20px;
  }

</style>
