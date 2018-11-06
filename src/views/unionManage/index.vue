<template>
  <div class="main">
    <el-row :gutter="20">
      <el-form :inline="true">
        <el-form-item label="活动名称">
          <el-input v-model="page.keyword" placeholder="请输入活动名称"/>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getTableData()">
          搜索
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="unionManageTableData" stripe style="width: 100%">
      <el-table-column prop="title" label="活动名称"/>
      <el-table-column prop="startTime" label="开始时间" width="200"/>
      <el-table-column prop="endTime" label="结束时间" width="200"/>
      <el-table-column label="活动状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">未开始</span>
          <span v-if="scope.row.status===1">即将开始</span>
          <span v-if="scope.row.status===2">进行中</span>
          <span v-if="scope.row.status===3">即将结束</span>
          <span v-if="scope.row.status===4">已结束</span>
        </template>
      </el-table-column>
      <el-table-column prop="boughtCount" label="订购数" width="130"/>
      <el-table-column prop="personCount" label="采购人数" width="130"/>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-search"
            circle
            size="small"
            @click="search(scope.$index, scope.row)"/>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            @click="edit(scope.$index, scope.row)"/>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="delThis(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-count="page.total"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"/>

    <!-- 添加按钮弹出对话框 start -->
    <el-dialog :visible.sync="addDialog" title="活动产品信息" height="800px" width="1200px" @close="closeAddDialog">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="activity_goods grid-content">
            <el-form ref="addBean" :model="bean" :rules="rules" label-width="80px">
              <el-form-item
                label="活动名称">
                <el-input v-model="bean['bean.title']" placeholder="请输入活动名称"/>
              </el-form-item>
              <el-form-item label="持续时间">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="dateTimeRange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
              <el-form-item label="预告时间">
                <el-select v-model="bean['bean.preTime']" placeholder="请选择预告时间">
                  <el-option label="提前一个月" value="30"/>
                  <el-option label="提前十五天" value="15"/>
                  <el-option label="提前七天" value="7"/>
                  <el-option label="提前三天" value="3"/>
                </el-select>
              </el-form-item>
              <div>
                <span
                  style="display: inline-block;width:80px;line-height:36px;text-align:center;font-weight: 700;">活动商品</span>
                <ul class="activity_goods_list">
                  <li v-for="(good,index) in addLeftGoodsData" :key="index">
                    <div class="activity_goods_img">
                      <img :src="good.picture" alt="" style="width:100%">
                    </div>
                    <div class="activity_goods_info">
                      <p>{{ good.name }}</p>
                      <p>产品编号:{{ good.code }}</p>
                      <p>价格:{{ good.curPrice }}</p>
                      <div class="activity_goods_price">
                        <!--{{bean.listLine[index]}}-->
                        <!--<input type="hidden" v-model="bean['listLine['+index+']'].product = good.pkey"/>-->
                        <!--<input type="hidden" v-model="bean.listLine[index].product = good.pkey"/>-->
                        <p>采购价
                          <span style="border: 1px solid #ccc;display:inline-block;height:24px;line-height:24px">$
                            <input v-model.number="good.amt" type="text" style="border:none;height:19px;">
                          </span>
                        </p>
                        <p>
                          <span>起发量
                            <input v-model.number="good.qty" type="text">双
                          </span>
                        </p>
                        <p>
                          <span>最少购买量
                            <input v-model.number="good.minOq" type="text">双
                          </span>
                        </p>
                      </div>
                    </div>
                    <button class="activity_button" @click="addDeselect(index)">取消选择</button>
                  </li>
                </ul>
              </div>

            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form :inline="true">
              <el-form-item label="产品名称">
                <input
                  v-model.trim="goodsKeyWord"
                  type="text"
                  class="el-input__inner"
                  style="height:28px;width:300px;"
                  placeholder="请输入产品编号或者产品名称进行搜索">
              </el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getGoodsTableData()">
                搜索
              </el-button>
            </el-form>
            <div class="goodsList">
              <ul class="goodsUl">
                <li v-for="(good,index) in rightGoodsListFilter" :key="index" @click="addGoods(good)">
                  <div class="goods_img">
                    <img :src="getPic(good.picture)" alt="">
                  </div>
                  <div class="goods_info">
                    <p>{{ good.name }}</p>
                    <p>产品编号:{{ good.code }}</p>
                    <p>供应商:{{ good.supplier.split('##')[1] }}</p>
                    <p>价格:{{ good.curPrice }}</p>
                    <p>起发量:{{ good.minOq }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addActivity(bean)">确 定</el-button>
        <el-button @click="addDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹出对话框 end -->

    <!-- 编辑弹出对话框 start -->
    <el-dialog :visible.sync="editDialog" title="团购活动编辑" height="800px" width="1200px" @close="closeEditDialog">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="activity_goods grid-content">
            <el-form ref="editBean" :model="editBean" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="editBean['bean.title']"/>
              </el-form-item>
              <el-form-item label="持续时间" prop="editDateTimeRange">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="editDateTimeRange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
              <el-form-item label="预告时间">
                <el-select v-model="editBean['bean.preTime']" placeholder="请选择预告时间">
                  <el-option label="提前一个月" value="30"/>
                  <el-option label="提前十五天" value="15"/>
                  <el-option label="提前七天" value="7"/>
                  <el-option label="提前三天" value="3"/>
                </el-select>
              </el-form-item>
              <div>
                <span
                  style="display: inline-block;width:80px;line-height:36px;text-align:center;font-weight: 700;">活动商品</span>
                <ul class="activity_goods_list">
                  <li v-for="(good,index) in editLeftData.unionLine" :key="index">
                    <div class="activity_goods_img">
                      <img :src="getPic(good.pro.picture)" alt="" style="width:100%">
                    </div>
                    <div class="activity_goods_info">
                      <p>{{ good.sourcePro.name }}</p>
                      <p>产品编号:{{ good.sourcePro.code }}</p>
                      <p>价格:{{ good.pro.curPrice }}</p>
                      <div class="activity_goods_price">
                        <p>采购价
                          <span style="border: 1px solid #ccc;display:inline-block;height:24px;line-height:24px">$
                            <input
                              v-model.number="good.pro.curPrice"
                              type="text"
                              style="border:none;height:19px;">
                          </span>
                        </p>
                        <p>
                          <span>起发量
                            <input v-model.number="good.count" type="text">双
                          </span>
                        </p>
                        <p>
                          <span>最少购买量
                            <input v-model.number="good.pro.minOq" type="text">双
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      v-if="good.pro.state == 0"
                      class="activity_button"
                      @click="underCarriageThis(good.pkey,1,2)">上架
                    </button>
                    <button
                      v-else-if="good.pro.state == 1"
                      class="activity_button"
                      @click="underCarriageThis(good.pkey,0,2)">下架
                    </button>
                    <button v-else class="activity_button" @click="editDeselect(index)">取消选择</button>
                  </li>
                </ul>
              </div>

            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form :inline="true">
              <el-form-item label="活动名称">
                <input
                  v-model.trim="goodsKeyWord"
                  type="text"
                  class="el-input__inner"
                  style="height:28px;width:300px;"
                  placeholder="请输入产品编号或者产品名称进行搜索">
              </el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getGoodsTableData()">
                搜索
              </el-button>
            </el-form>
            <div class="goodsList">
              <ul class="goodsUl">
                <li v-for="(good,index) in rightGoodsListFilter" :key="index" @click="editGoods(good)">
                  <div class="goods_img">
                    <img :src="getPic(good.picture)" alt="">
                  </div>
                  <div class="goods_info">
                    <p>{{ good.name }}</p>
                    <p>产品编号:{{ good.code }}</p>
                    <p>供应商:{{ good.supplier.split('##')[1] }}</p>
                    <p>价格:{{ good.curPrice }}</p>
                    <p>起发量:{{ good.minOq }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editActivity(editLeftData,editBean)">确 定</el-button>
        <el-button @click="editDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出对话框 end -->
    <!-- 查看弹出对话框 start -->
    <el-dialog :visible.sync="viewDialog" title="活动产品信息" height="800px" width="1200px">
      <div class="view_table">
        <!-- 表格 -->
        <el-table :data="viewTableData" stripe style="width: 100%">
          <el-table-column prop="product.name" label="产品信息" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.product.picture.split(',')[0]" alt="" style="width:85px;margin-top: 4px;">
              <p v-text="scope.row.product.name"/>
            </template>
          </el-table-column>
          <el-table-column prop="product.curPrice" label="采购价" width="130">
            <template slot-scope="scope">
              <span v-text="scope.row.product.curPrice"/>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="起订量" width="130">
            <template slot-scope="scope">
              <span v-text="scope.row.count"/>
            </template>
          </el-table-column>
          <el-table-column prop="personCount" label="采购人数" width="130">
            <template slot-scope="scope">
              <span v-text="scope.row.personCount"/>
            </template>
          </el-table-column>
          <el-table-column prop="boughtCount" label="已采购量" width="130"/>
          <el-table-column label="总金额" width="130">
            <template slot-scope="scope">
              $<span v-text="scope.row.boughtCount * scope.row.product.curPrice"/>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.state===0">未开始售卖</span>
              <span v-if="scope.row.state===1">未开始售卖</span>
              <span v-if="scope.row.state===2">售卖中</span>
              <span v-if="scope.row.state===3">售卖中</span>
              <span v-if="scope.row.state===4">结束售卖</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <span
                v-if="scope.row.flag == 1 && scope.row.state != 0"
                style="color:#1E9FFF;cursor: pointer;">订单已发送</span>
              <span
                v-if="scope.row.flag == 0 && scope.row.state == 0"
                style="color:#1E9FFF;cursor: pointer;"
                @click="sendThisLine(scope.row.pkey)">订单发送给供应商</span>
              <span
                v-if="scope.row.product.state == 0"
                style="color:#1E9FFF;cursor: pointer;"
                @click="underCarriageThis(scope.row.pkey,1,1)">上架此商品</span>
              <span
                v-if="scope.row.product.state == 1"
                style="color:#1E9FFF;cursor: pointer;"
                @click="underCarriageThis(scope.row.pkey,0,1)">下架此商品</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="viewDialog = false">确 定</el-button>
        <el-button @click="viewDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 查看弹出对话框 end -->

    <form
      id="buynow"
      ref="buyNow"
      action="http://localhost:8080/home/odr_OdrOrder_toSettlementPage"
      target="_blank"
      method="post">
      <input v-model="orderInfo.jsonCarts" type="hidden" name="jsonCarts">
      <input v-model="orderInfo.supplier" type="hidden" name="supplier">
    </form>

  </div>
</template>
<script>
import request from '@/utils/request'
import Qs from 'qs'
import axios from 'axios'

export default {
  name: 'UnionManage',
  data() {
    return {
      imgUrlconfig: 'http://shoestp.oss-us-west-1.aliyuncs.com',
      addDialog: false, // 添加弹出框
      editDialog: false, // 编辑弹出框
      viewDialog: false, // 查看弹出框
      unionManageTableData: [], // 初始化活动列表数据
      viewTableData: [], // 查看一个活动下详细数据
      dateTimeRange: [], // 筛选时间range
      editDateTimeRange: [], // 筛选时间range
      orderInfo: {},
      pickerOptions: { // 日期筛选
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      page: {
        curr: 1,
        total: null,
        showItem: 10,
        keyword: null
      },
      bean: {
        'bean.title': '', // 活动名称
        'bean.preTime': '', // 持续时间
        'bean.startTime': '', // 开始时间
        'bean.endTime': '', // 结束时间
        listLine: [
          //  {"amt":'',"qty":'',"minOq":''},
        ]
      },
      editBean: {
        'bean.title': '', // 活动名称
        'bean.preTime': '', // 持续时间
        'bean.startTime': '', // 开始时间
        'bean.endTime': '', // 结束时间
        listLine: [
          //  {"amt":'',"qty":'',"minOq":''},
        ]
      },
      rightGoodsList: [], // 弹出框右侧商品列表
      rightGoodsListFilter: [], // 弹出框右侧商品列表 - 筛选后
      goodsKeyWord: null, // 弹出框右侧搜索商品用到的key
      addLeftGoodsData: [], // 添加弹出框左侧商品列表
      editLeftData: [], // 编辑弹出框左侧数据
      rules: {
        'bean.title': [{
          required: true,
          message: '请输入活动名称！',
          trigger: 'blur'
        }],
        'bean.preTime': [{
          required: true,
          message: '请输入预告时间！',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {
    dateTimeRange() {
      this.$set(this.bean, 'bean.startTime', this.dateTimeRange[0])
      this.$set(this.bean, 'bean.endTime', this.dateTimeRange[1])
    }
  },
  mounted() {
    this.getTableData()
    this.getRightGoddsListData()
  },
  methods: {
    closeEditDialog: function() {
      this.editBean['bean.title'] = ''
      this.editBean['bean.preTime'] = ''
      this.editBean['bean.startTime'] = ''
      this.editBean['bean.endTime'] = ''
      this.editBean.listLine = []
      this.editLeftData = []
      this.editDateTimeRange = []
    },
    closeAddDialog: function() {
      this.addLeftGoodsData = []
      this.bean = {
        'bean.title': '', // 活动名称
        'bean.preTime': '', // 持续时间
        'bean.startTime': '', // 开始时间
        'bean.endTime': '', // 结束时间
        listLine: []
      }
      // 清空列表
      this.addLeftGoodsData = []
      this.dateTimeRange = [], // 筛选时间range
      this.getTableData()
    },
    sendThisLine: function(pkey) {
      var data = { 'linePkey': pkey }
      var self = this
      request({
        url: '/seller/prm_PrmGroupPurchase_send',
        method: 'post',
        data
      })
        .then(res => {
          if (res.data.success == true) {
            self.orderInfo.jsonCarts = JSON.stringify(res.data.jsonCarts)
            self.orderInfo.supplier = res.data.supplier
            this.$refs.buyNow.submit()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 编辑商品
    edit(index, e) {
      this.editDialog = true
      const self = this
      const data = {
        pkey: e.pkey
      }
      request({
        url: '/seller/prm_PrmGroupPurchase_load',
        method: 'post',
        data
      })
        .then(res => {
          this.editLeftData = res.data
          //						this.editBean["bean.title"] = this.editLeftData.union.title, //活动名称
          //						this.editBean["bean.preTime"] = this.editLeftData.union.preTime.toString(), //活动名称
          //						{
          //							"bean.title": this.editLeftData.union.title, //活动名称
          //							"bean.preTime": this.editLeftData.union.preTime.toString(), //预告时间
          //						};
          this.$set(this.editBean, 'bean.title', this.editLeftData.union.title)
          this.$set(this.editBean, 'bean.preTime', this.editLeftData.union.preTime.toString())
          this.$set(this.editBean, 'bean.pkey', this.editLeftData.union.pkey)
          // 赋值给时间
          this.editDateTimeRange = [this.editLeftData.union.startTime, this.editLeftData.union.endTime]
          //						for(var i = 0; i < this.editLeftData.unionLine.length; i++) {
          //							this.$set(this.editBean, "listLine[" + i + "].minOq", this.editLeftData.unionLine[i].pro.minOq)
          //							this.$set(this.editBean, "listLine[" + i + "].amt", this.editLeftData.unionLine[i].pro.curPrice)
          //							this.$set(this.editBean, "listLine[" + i + "].qty", this.editLeftData.unionLine[i].count)
          //							this.$set(this.editBean, "listLine[" + i + "].groupLinePkey", this.editLeftData.unionLine[i].pkey)
          //							this.$set(this.editBean, "listLine[" + i + "].product", this.editLeftData.unionLine[i].pro.pkey)
          //						}
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 编辑按钮弹出框的确认按钮
    editActivity(e, formName) {
      this.editBean['bean.startTime'] = this.editDateTimeRange[0]
      this.editBean['bean.endTime'] = this.editDateTimeRange[1]
      var data = this.editBean
      var flag = this.verifyForm(data)
      if (flag == false) {
        return
      }
      if (this.editLeftData.unionLine.length == 0) {
        this.getPrompt('error', '请选择活动产品')
        return false
      }

      for (var i in this.editLeftData.unionLine) {
        var qty = Number(this.editLeftData.unionLine[i].count)
        var amt = Number(this.editLeftData.unionLine[i].pro.curPrice)
        var minOq = Number(this.editLeftData.unionLine[i].pro.minOq)
        if (qty <= 0 || qty == undefined || isNaN(qty)) {
          this.getPrompt('error', '请输入正确的商品数量')
          return
        }
        if (amt <= 0 || amt == undefined || isNaN(amt)) {
          this.getPrompt('error', '请输入正确的商品金额')
          return
        }
        if (minOq < 0 || minOq == undefined || isNaN(amt)) {
          this.getPrompt('error', '请输入正确的最小购买量')
          return
        }

        var info = {}
        if (this.editLeftData.unionLine[i].pkey != undefined) {
          info.groupLinePkey = this.editLeftData.unionLine[i].pkey
          info.product = this.editLeftData.unionLine[i].pro.pkey
        } else {
          info.product = this.editLeftData.unionLine[i].sourcePro.pkey
        }
        info.qty = this.editLeftData.unionLine[i].count
        info.amt = this.editLeftData.unionLine[i].pro.curPrice
        info.minOq = this.editLeftData.unionLine[i].pro.minOq
        this.editBean.listLine.push(info)
      }
      //				request({
      //						url: "/seller/prm_PrmGroupPurchase_upd",
      //						method: "post",
      //						data
      //					})
      axios.post('/seller/prm_PrmGroupPurchase_upd', Qs.stringify(this.editBean, { allowDots: true }))
        .then(res => {
          if (res.data.success == true) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.editDialog = false
          } else {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 编辑框取消选择按钮
    editDeselect(index) {
      this.editLeftData.unionLine.splice(index, 1)
      this.editBean.listLine.splice(index, 1)
    },
    // 编辑框点击商品列表添加商品
    editGoods(e) {
      for (var i = 0; i < this.editLeftData.unionLine.length; i++) {
        if (e.pkey == this.editLeftData.unionLine[i].sourcePro.pkey) {
          this.$message({
            type: 'info',
            message: '此商品已添加,请勿重复添加!'
          })
          return
        }
      }
      this.editLeftData.unionLine.push({
        count: e.minOq,
        pro: {
          curPrice: e.curPrice,
          picture: this.getPic(e.picture),
          minOq: e.minOq
        },
        sourcePro: {
          name: e.name,
          code: e.code,
          pkey: e.pkey,
          curPrice: e.curPrice
        }
      })
      //				for(var i = 0; i < this.editLeftData.unionLine.length; i++) {
      //					this.$set(this.editBean, "listLine[" + i + "].minOq", this.editLeftData.unionLine[i].pro.minOq)
      //					this.$set(this.editBean, "listLine[" + i + "].amt", this.editLeftData.unionLine[i].pro.curPrice)
      //					this.$set(this.editBean, "listLine[" + i + "].qty", this.editLeftData.unionLine[i].count)
      //					this.$set(this.editBean, "listLine[" + i + "].groupLinePkey", this.editLeftData.unionLine[i].pkey)
      //					this.$set(this.editBean, "listLine[" + i + "].product", this.editLeftData.unionLine[i].pro.pkey)
      //				}
      /* this.editBean.listLine.push({
                    product: e.pkey
                });*/
    },
    // 添加框取消选择按钮
    addDeselect(index) {
      this.addLeftGoodsData.splice(index, 1)
      var obj = this.bean.listLine.splice(index, 1)
    },
    // 添加框点击商品列表商品添加按钮
    addGoods(e) {
      for (var i = 0; i < this.addLeftGoodsData.length; i++) {
        if (e.pkey == this.addLeftGoodsData[i].pkey) {
          this.$message({
            type: 'info',
            message: '此商品已添加,请勿重复添加!'
          })
          return
        }
      }
      this.addLeftGoodsData.push({
        picture: this.getPic(e.picture),
        name: e.name,
        supplier: e.supplier.split('##')[1],
        code: e.code,
        curPrice: e.curPrice,
        pkey: e.pkey,
        minOq: e.minOq
      })
      // this.bean.listLine.push({product:e.pkey});
      // console.log(this.bean)
    },
    // 添加框搜索商品
    getGoodsTableData() {
      // rightGoodsList
      if (this.goodsKeyWord != '') {
        this.rightGoodsListFilter = this.rightGoodsList.filter((val, index) => {
          return (
            val.name.indexOf(this.goodsKeyWord) != -1 ||
              val.code.indexOf(this.goodsKeyWord) != -1
          )
        })
      } else {
        this.rightGoodsListFilter = this.rightGoodsList
      }
    },
    // 实时监听弹出框右侧搜索商品
    // handleChangeGoods(e){
    //   this.goodsKeyWord = e.value
    // },
    // 获取第一张图片
    getPic(val) {
      if (val) {
        if (val.split(',').length > 0) {
          return this.imgUrlconfig + val.split(',')[0]
        }
      }
      return val
    },
    getPrompt: function(type, msg) {
      this.$message({
        type: type,
        message: msg
      })
    },
    verifyForm: function(data) {
      if (data['bean.title'] == '') {
        this.getPrompt('error', '标题不可为空')
        return false
      }
      if (data['bean.startTime'] == undefined) {
        this.getPrompt('error', '开始时间不可为空')
        return false
      }
      if (data['bean.endTime'] == undefined) {
        this.getPrompt('error', '结束时间不可为空')
        return false
      }
      if (data['bean.preTime'] == '') {
        this.getPrompt('error', '预告时间不可为空')
        return false
      }
      var startTime = new Date(data['bean.startTime'])
      var endTime = new Date(data['bean.endTime'])
      if (startTime.getTime() > endTime.getTime()) {
        this.getPrompt('error', '开始时间不可早于结束时间')
        return false
      }

      return true
    },
    // 添加框确定按钮
    addActivity(formName) {
      this.bean['bean.startTime'] = this.dateTimeRange[0]
      this.bean['bean.endTime'] = this.dateTimeRange[1]
      var data = this.bean
      var flag = this.verifyForm(data)
      if (flag == false) {
        return
      }
      if (this.addLeftGoodsData.length == 0) {
        this.getPrompt('error', '请选择活动产品')
        return false
      }
      for (var i in this.addLeftGoodsData) {
        var qty = Number(this.addLeftGoodsData[i].qty)
        var amt = Number(this.addLeftGoodsData[i].amt)
        var minOq = Number(this.addLeftGoodsData[i].minOq)
        if (qty <= 0 || qty == undefined || isNaN(qty)) {
          this.getPrompt('error', '请输入正确的商品数量')
          return
        }
        if (amt <= 0 || amt == undefined || isNaN(amt)) {
          this.getPrompt('error', '请输入正确的商品金额')
          return
        }
        if (minOq < 0 || minOq == undefined || isNaN(amt)) {
          this.getPrompt('error', '请输入正确的最小购买量')
          return
        }

        var info = {}
        info.product = this.addLeftGoodsData[i].pkey
        info.qty = this.addLeftGoodsData[i].qty
        info.amt = this.addLeftGoodsData[i].amt
        info.minOq = this.addLeftGoodsData[i].minOq
        this.bean.listLine.push(info)
      }
      /* request({
                        url: "/seller/prm_PrmGroupPurchase_ins",
                        method: "post",
                        params:data
                    })*/
      axios.post('/seller/prm_PrmGroupPurchase_ins', Qs.stringify(this.bean, { allowDots: true }))
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.addDialog = false
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange(val) {
      this.page.showItem = val
      this.handleCurrentChange(this.page.curr)
    },
    handleCurrentChange(val) {
      this.page.curr = val
      this.getTableData()
    },
    // 查看按钮
    search(index, e) {
      this.viewDialog = true
      const data = {
        pkey: e.pkey
      }
      request({
        url: '/seller/prm_PrmGroupPurchase_showUnionPro',
        method: 'post',
        data
      })
        .then(res => {
          this.viewTableData = res.data.items
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 添加按钮
    add() {
      this.addDialog = true
    },
    // 获取弹出框右边商品列表
    getRightGoddsListData() {
      const self = this
      request({
        url: '/seller/pdt_PdtProduct_getAllPdt',
        method: 'post'
      })
        .then(res => {
          self.rightGoodsList = res.data.items
          self.rightGoodsListFilter = res.data.items
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取活动列表
    getTableData() {
      const data = {
        pageNumber: this.page.curr,
        limit: this.page.showItem,
        title: this.page.keyword
      }
      const self = this
      request({
        url: '/seller/prm_PrmGroupPurchase_groupList',
        method: 'post',
        data
      })
        .then(res => {
          self.unionManageTableData = res.data.items
          self.page.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除按钮
    delThis(index, e) {
      const data = {
        pkey: e.pkey
      }
      this.$confirm('确认删除该活动吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          request({
            url: '/seller/prm_PrmGroupPurchase_logicDelete',
            method: 'post',
            data
          })
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getTableData()
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 查看弹出框 上下架按钮
    underCarriageThis(pkey, state, type) {
      var _self = this
      const data = {
        pkey: pkey,
        state: state
      }
      var msg = state == 0 ? '产品下架成功' : '产品上架成功'
      request({
        url: '/seller/prm_PrmGroupPurchase_underCarriage',
        method: 'post',
        data
      })
        .then(res => {
          if (res.data.ret == 1) {
            this.$message({
              type: 'success',
              message: msg
            })
            if (type == 1) {
              for (var i in _self.viewTableData) {
                if (_self.viewTableData[i].pkey == pkey) {
                  _self.viewTableData[i].product.state = state
                }
              }
            } else if (type == 2) {
              for (var i in _self.editLeftData.unionLine) {
                if (_self.editLeftData.unionLine[i].pkey == pkey) {
                  _self.editLeftData.unionLine[i].pro.state = state
                }
              }
            }
          } else {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 20px;
    .el-table--fit {
      margin: 10px 0;
    }
    .el-pagination {
      text-align: center;
    }
    .el-table th {
      &:last-child {
        text-align: center;
      }
    }
  }

  .activity_goods_list {
    padding: 0;
    list-style: none;
    // height: 500px;
    // overflow-y: auto;
    li {
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px dashed #000;
      display: flex;
      cursor: pointer;
      justify-content: center;
      .activity_goods_img {
        width: 20%;
        display: inline-block;
      }
      .activity_goods_info {
        display: inline-block;
        width: 80%;
        p {
          margin: 0;
          line-height: 25px;
        }
        .activity_goods_price {
          p {
            display: inline-block;
            margin: 5px 15px 10px 0;
            input {
              width: 42px;
              margin: 0 5px;
              text-align: right;
              outline: none;
            }
          }
        }
      }
      .activity_button {
        width: 27px;
        margin: 0 6px;
        background-color: #3fe4d5;
        border: 0;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        padding: 10px 2px;
        border-radius: 5px;
        outline: none;
      }
    }
  }

  // 添加弹出框
  .activity_goods {
    height: 700px;
    overflow-y: auto;
  }

  .el-form--inline .el-form-item {
    vertical-align: inherit;
  }

  //  添加弹出框
  .goodsList {
    overflow-y: auto;
    height: 650px;
    .goodsUl {
      list-style: none;
      padding: 0;
      li {
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px dashed #000;
        display: flex;
        cursor: pointer;
        justify-content: center;
      }
      .goods_img {
        display: inline-block;
        height: 100%;
        width: 20%;
        img {
          width: 100%;
        }
      }
      .goods_info {
        display: inline-block;
        height: 100%;
        width: 80%;
        margin-left: 18px;
        p {
          margin: 0;
          line-height: 25px;
        }
      }
    }
  }

  .view_table {
    height: 595px;
    overflow-y: auto;
  }
</style>
