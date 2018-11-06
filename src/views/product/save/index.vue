<template>
  <div class="main">
    <el-container>
      <el-main>
        <el-form ref="mainform" :rules="rules" :model="status" label-width="120px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品名称</span>
            </div>
            <el-tabs
              :before-leave="tabChange"
              type="card"
              style="width: 100%;"
            >
              <el-tab-pane
                v-for="d in language"
                v-if="d.isEnabled"
                :label="d.displayName"
                :key="d.shortName"

              >
                <el-form-item
                  v-if="d.isEnabled"
                  :label="d.displayName"
                  :key="d.shortName"
                  :rules="d.shortName==='en'?{ validator: validatePdtName, trigger: 'blur' }:null"
                  :required="d.shortName==='en'"
                  prop="pdtName"
                >
                  <el-input :placeholder="d.displayName" v-model="status.pdtName[d.shortName]"/>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>

          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品基本资料</span>
            </div>
            <!--<el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>-->
            <el-form-item label="商品分类" prop="productCat">
              <el-col :span="11">
                <el-cascader
                  :options="productCats"
                  :change-on-select="true"
                  v-model="temp.productCat"
                  class="w100p"
                  placeholder="商品分类"
                  filterable
                  @change="selectPdtCat"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="店铺分类" prop="supplierCat">
              <el-col :span="11">
                <el-cascader
                  :options="supplierCat"
                  :change-on-select="true"
                  v-model="temp.supplierCat"
                  class="w100p"
                  placeholder="店铺分类"
                  filterable
                />
              </el-col>
            </el-form-item>
            <!--编号-->
            <el-form-item
              label="编号"
              required
            >
              <el-col :span="5">
                <el-form-item
                  :rules=" {required: true, message:'请输入编码前缀', trigger: ['change', 'blur']}"
                  prop="number_left"
                >
                  <el-input v-model="status.number_left" placeholder="编号"/>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="tc"> -</el-col>
              <el-col :span="5">
                <el-form-item
                  :rules=" {required: true, message: '请输入编码前缀', trigger: ['change', 'blur']}"
                  prop="number_right"
                >
                  <el-input v-model="status.number_right" placeholder="编号"/>
                </el-form-item>
              </el-col>
              <el-col :span="5" class="ml15">
                <el-button :disabled="genrateNumberFirst" @click="genrateNumber">生成编号</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="SKU" prop="sku">
              <el-form-item>
                <el-input v-model="status.sku" placeholder="SKU"/>
              </el-form-item>
            </el-form-item>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品属性</span>
            </div>

            <!--迭代出来-->
            <template v-if="attr.length>0">
              <el-form-item
                v-for="(d,index) in attr"
                :label="d.name"
                :key="d.id"
              >
                <el-checkbox-group v-model="temp.attr[d.id]" class="pl30">
                  <el-checkbox
                    v-for="dd in d.items"
                    :label="dd.id"
                    :key="dd.id"
                    :true-label="dd.id"
                    :class="[getByteLen(dd.name)>15?'three-size':getByteLen(dd.name)>6?'two-size':'']"
                    size="small"
                  >
                    {{ dd.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </template>

            <el-form-item
              :rules=" { validator: validatePic, trigger: 'blur' }"
              label="商品图片(最多六张)"
              prop="pdtPics"
              required
            >
              <el-upload
                :on-remove="(res,file)=>{return handleRemove(res,null)}"
                :on-success="(res,file)=>{return handlesuccess(res,file,null)}"
                :file-list="_filelist"
                :before-upload="validatePidSzie"
                :limit="6"
                :multiple="true"
                action="/seller/pdt_PdtProduct_upload?widthLimit=0"
                list-type="picture-card"
              >
                <i class="el-icon-plus"/>
              </el-upload>
            </el-form-item>

          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品销售信息</span>
            </div>
            <el-form-item label="商城价格" prop="price">
              <el-input v-model="status.price" placeholder="price">
                <span slot="suffix" class="pr8">美元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="市场价" prop="mktPrice">
              <el-input v-model="status.mktPrice" placeholder="price">
                <span slot="suffix" class="pr8">美元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="进货价" prop="purPrice">
              <el-input v-model="status.purPrice" placeholder="price">
                <span slot="suffix" class="pr8">美元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="起订量" prop="min_oq">
              <el-input v-model="status.min_oq" placeholder="起订量">
                <span slot="suffix" class="pr8">双</span>
              </el-input>
            </el-form-item>
            <el-form-item label="最大购买量" prop="max_oq">
              <el-input v-model="status.max_oq" placeholder="最大购买量">
                <span slot="suffix" class="pr8">双</span>
              </el-input>
            </el-form-item>
            <el-form-item label="总库存">
              <el-col>
                <el-input :value="_AllStock" placeholder="总库存(根据所有规格得出)" disabled>
                  <span slot="suffix" class="pr8">双(根据所有规格库存计算得出)</span>
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="警告库存" prop="warnStock">
              <el-input v-model="status.warnStock" placeholder="警告库存">
                <span slot="suffix" class="pr8">双</span>
              </el-input>
            </el-form-item>

            <!-- <el-card class="box-card mb15">
                <div slot="header" class="clearfix">
                    <span>颜色</span>
                  </div>
                  <el-checkbox-group v-model="temp.specColor">
                    <el-checkbox v-for="dd in color" :label="dd" :key="dd.id">
                        {{dd.name}}
                    </el-checkbox>
                  </el-checkbox-group>
            </el-card> -->
            <!-- <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>尺码</span>
                  </div>
                  <el-checkbox-button v-for="dd in size" :label="dd" :key="dd.id"
                                      v-model="temp.specSize">
                      {{dd.name}}
                  </el-checkbox-button>
            </el-card> -->
            <el-card class="box-card mb15">
              <el-form-item label="颜色" class="checkbox-group color">
                <el-checkbox-group v-model="temp.specColor" class="pt8 pl30">
                  <el-checkbox
                    v-for="dd in color"
                    :label="dd"
                    :key="dd.id"
                    :class="[getByteLen(dd.name)>15?'three-size':getByteLen(dd.name)>6?'two-size':'']"
                  >
                    <el-popover
                      :disabled="isCustom(dd)"
                      placement="top"
                      width="130"
                      trigger="hover"
                      @hide="colorPopHide">
                      <input
                        v-model="editColorData"
                        style="position:unset;width:52%;"
                        placeholder="请输入颜色"
                        class="el-input__inner">
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        style="margin:0;"
                        @click="editColor(dd)"/>
                      <el-button
                        type="primary"
                        icon="el-icon-delete"
                        style="margin:0;"
                        @click="delColor(dd.id)"/>
                      <span slot="reference">
                        {{ dd.name }}
                      </span>
                    </el-popover>
                  </el-checkbox>
                </el-checkbox-group>
                <div class="newColor">
                  <el-input v-if="addNewColor" v-model="newColor" placeholder="请输入内容"/>
                  <a style="cursor:pointer;color: rgb(64,158,255);" @click="toAddNewColor">添加颜色</a>
                  <a
                    v-if="addNewColor"
                    style="cursor:pointer;color: rgb(64,158,255);"
                    @click="addNewColor=false;newColor=''">取消</a>
                </div>
              </el-form-item>
              <el-form-item label="尺码" class="checkbox-group size">
                <el-checkbox-group v-model="temp.specSize" class="pt8 pl30">
                  <el-checkbox
                    v-for="dd in size"
                    :label="dd"
                    :key="dd.id"
                    :class="[getByteLen(dd.name)>15?'three-size':getByteLen(dd.name)>6?'two-size':'']"
                  >
                    <el-popover
                      :disabled="isCustom(dd)"
                      placement="top"
                      width="130"
                      trigger="hover"
                      @hide="sizePopHide">
                      <input
                        v-model="editSizeData"
                        style="position:unset;width:52%;"
                        placeholder="请输入尺寸"
                        class="el-input__inner">
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        style="margin:0;"
                        @click="editSize(dd)"/>
                      <el-button
                        type="primary"
                        icon="el-icon-delete"
                        style="margin:0;"
                        @click="delSize(dd.id)"/>
                      <span slot="reference">
                        {{ dd.name }}
                      </span>
                    </el-popover>
                  </el-checkbox>

                </el-checkbox-group>
                <div v-if="size&&size.length>0" class="newSize">
                  <el-input v-if="addNewSize" v-model="newSize" placeholder="请输入内容"/>
                  <a style="cursor:pointer;color: rgb(64,158,255);" @click="toAddNewSize">添加尺码</a>
                  <a
                    v-if="addNewSize"
                    style="cursor:pointer;color: rgb(64,158,255);"
                    @click="addNewSize=false;newSize=''">取消</a>

                </div>
              </el-form-item>
            </el-card>
            <el-card v-if="status.spec&&status.spec.length>0" class="box-card mb15">
              <table class="spec-table">
                <tr>
                  <td>
                    属性
                  </td>
                  <td>
                    SKU
                  </td>
                  <td>
                    价格($)
                  </td>
                  <td>
                    库存(必填,默认值:500)
                  </td>
                  <td>
                    重量(千克)
                  </td>
                  <td>
                    批量
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>组合属性</label>
                  </td>
                  <td>
                    <el-button type="text" @click="syncs('sku')">同步</el-button>
                  </td>
                  <!--<td>-->
                  <!--<el-button type="text">同步</el-button>-->
                  <!--</td>-->
                  <td>
                    <el-button type="text" @click="syncs('price')">同步</el-button>
                  </td>
                  <td>
                    <el-button type="text" @click="syncs('stock')">同步</el-button>
                  </td>
                  <td>
                    <el-button type="text" @click="syncs('weight')">同步</el-button>
                  </td>
                  <td/>
                </tr>
                <tr v-for="d in status.spec">
                  <td>{{ d.name }}</td>
                  <td>
                    <el-input v-model="d.sku" placeholder="SKU"/>
                  </td>
                  <td>
                    <el-input
                      v-model="d.price"
                      :blur="validatorSpecPrice(null,d.price,function(value){
                      errorMessages[d.name+'_price']=value})"/>
                    <span style="color: red">  {{ errorMessages[d.name+'_price'] }}</span>
                  </td>
                  <td>
                    <el-input
                      v-model="d.stock"
                      :blur="validatorNumbers(d.stock,d.stock,function(value){errorMessages[d.name+'_stock']=value})"
                    />
                    <span style="color: red">  {{ errorMessages[d.name+'_stock'] }}</span>
                  </td>
                  <td>
                    <el-input
                      v-model="d.weight"
                      :blur="validatorNumbers(null,d.weight,function(value){errorMessages[d.name+'_weight']=value})"
                    />
                    <span style="color: red">  {{ errorMessages[d.name+'_weight'] }}</span>
                  </td>
                  <td>
                    <el-popover
                      :open-delay="200"
                      width="140"
                      trigger="hover"
                      placement="right"
                    >
                      <div style="text-align: right; margin: 0">
                        <el-button mini @click="syncs('price',d,'color')">同步同颜色价格</el-button>
                        <el-button mini @click="syncs('stock',d,'color')">同步同颜色库存</el-button>
                        <el-button mini @click="syncs('price',d,'size')">同步同尺寸价格</el-button>
                        <el-button mini @click="syncs('stock',d,'size')">同步同尺寸库存</el-button>
                      </div>
                      <el-button slot="reference">批量</el-button>
                    </el-popover>

                  </td>
                </tr>
              </table>
            </el-card>
            <el-card v-if="temp.specColor.length">
              <div v-for="d in temp.specColor" :key="d.id" style="margin-top: 15px">
                <el-form-item
                  :label="'商品图片:'+d.name"
                >
                  <el-upload
                    :on-remove="(res,file)=>{return handleRemove(res, d)}"
                    :on-success="(res,file)=>{return handlesuccess(res,file, d)}"
                    :before-upload="validatePidSzie"
                    :file-list="_specPicList(d)"
                    :limit="6"
                    :multiple="true"
                    action="/seller/pdt_PdtProduct_upload?widthLimit=0"
                    list-type="picture-card"
                  >
                    <i class="el-icon-plus"/>
                  </el-upload>
                </el-form-item>
              </div>
            </el-card>
            <el-form-item label="销售状态">
              <el-switch
                v-model="status.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="上架"
                inactive-text="下架"
              />
            </el-form-item>
            <!--<el-form-item label="定时上架">-->
            <!--<el-col :span="2">-->
            <!--<el-switch-->
            <!--v-model="status.soldInStatus"-->
            <!--active-color="#13ce66"-->
            <!--inactive-color="#ff4949"/>-->
            <!--</el-col>-->
            <!--<el-col :span="5" class="line">-->
            <!--<el-date-picker-->
            <!--v-show="status.soldInStatus"-->
            <!--v-model="status.soldInTime"-->
            <!--type="datetimerange"-->
            <!--range-separator="至"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期"-->
            <!--align="right"/>-->
            <!--</el-col>-->
            <!--</el-form-item>-->
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>物流信息</span>
            </div>
            <el-form-item label="是否免运费">
              <el-switch
                v-model="status.freeShipping"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="免运费"
              />
            </el-form-item>
            <el-form-item label="重量">
              <el-input v-model="status.weight" placeholder="总量"/>
            </el-form-item>
            <el-form-item label="长">
              <el-input v-model="status.length" placeholder="长"/>
            </el-form-item>
            <el-form-item label="宽">
              <el-input v-model="status.width" placeholder="宽"/>
            </el-form-item>
            <el-form-item label="高">
              <el-input v-model="status.height" placeholder="高"/>
            </el-form-item>
          </el-card>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>商品描述</span>
            </div>
            <el-form-item label="简述">
              <el-input
                :autosize="{ minRows: 5, maxRows:8}"
                v-model="status.briefDescription"
                type="textarea"
                placeholder="请输入内容"/>
            </el-form-item>
            <el-form-item label="详细描述" prop="description">
              <el-tabs
                :before-leave="tabChange"
                type="card"
                style="width: 100%;"
              >
                <el-tab-pane
                  v-for="d in language"
                  v-if="d.isEnabled"
                  :label="d.displayName"
                  :key="d.shortName"

                />
              </el-tabs>
              <div>
                <editor id="description"/>
              </div>
            </el-form-item>
          </el-card>
        </el-form>

      </el-main>
      <el-footer>
        <div>
          <el-button v-loading.fullscreen.lock="loading" type="primary" @click="submitForm('mainform')">
            {{ $route.query.id ?'修改':'立即创建' }}
          </el-button>
          <el-button @click="resetForm('mainform')">重置</el-button>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>
<script>

import store from '@/store'
import Editor from '@/components/Tinymce'
import rules from './utils/rules'
import watch from './modules/Watch'
import computed from './modules/Computed'
import goodsInfoData from './modules/GoodsInfoData'
import customcolorsizedata from './modules/CustomColorSizeData'
import request from '@/utils/request'
import { colorFormater, SupCatFormate } from './utils/Dataformater'

const validate = require('./utils/ValidateUtils')
const pdtInfo = require('./api/PdtInfo')
const customColorSize = require('./api/CustomColorSize')
export default {
  name: 'ProductSave',
  components: {
    'editor': Editor // <- Important part
  },
  data() {
    return {
      language: store.getters.alllanguage,
      loading: false,
      rules: rules,
      ...goodsInfoData(),
      ...customcolorsizedata()
    }
  }, computed,
  watch,
  mounted: function() {
    this.load()
  }, beforeCreate() {
    const self = this
    request({
      url: '/seller/pdt_PdtAttr_AttrList',
      method: 'get'
    }).then(res => {
      self.attr = res.data.result
    })
    request({
      url: '/seller/pdt_PdtColor_getColorList',
      method: 'get'
    }).then(res => {
      this.color = colorFormater(res)
    })
    request({
      url: '/seller/pdt_PdtCat_getPdtCatList'
    }).then(res => {
      self.productCats = res.data.result
    })
    request({
      url: '/seller/usr_UsrProductCategory_getCategoryTree'
    }).then(res => {
      if (res.data) {
        if (res.data.items === null || res.data.items.length < 1) {
          self.$alert('请添加店铺分类', '消息', {
            confirmButtonText: '确定'
          })
        } else {
          self.supplierCat = SupCatFormate(res.data.items)
        }
      }
    })
  },
  methods: {
    getByteLen(val) {
      if (val) {
        let len = 0
        for (let i = 0; i < val.length; i++) {
          if (val[i].match(/[^\x00-\xff]/gi) != null) {
            len += 1
          } else {
            len += 0.5
          }
        }
        return Math.floor(len)
      }
    },
    colorPopHide: function() {
      this.newColor = ''
    },
    sizePopHide: function() {
      this.newSize = ''
      this.editNewSize = false
    }, ...customColorSize,
    ...pdtInfo,
    ...validate
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 25px;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    line-height: 145px;
  }

  .el-upload-list--picture-card .el-upload-list__item > img {
    width: 100%;
    height: auto;
    display: inline-block;
    vertical-align: middle;
  }

  .el-upload-list--picture-card .el-upload-list__item-status-label {
    line-height: 32px;
  }

  .outer_div {
    position: fixed;
    right: 0;
    bottom: 123px;
    z-index: 999;
    text-align: center;
    background-color: #909399;
    padding: 12px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    cursor: pointer;
  }

  .inner_span {
    float: left;
    font-size: 14px;
    color: #fff;
    margin-left: 8px;
  }

  .inner_icon {
    float: left;
    color: #fff;
    margin-top: 3px;
  }

  .tc {
    text-align: center;
  }

  .mb15 {
    margin-bottom: 15px;
  }

  .ml15 {
    margin-left: 15px;
  }

  .pt8 {
    padding-top: 8px;
  }

  .w100p {
    width: 100%;
  }

  .pl30 {
    padding-left: 30px;
  }

  /*checkbox宽度随字数增加而增加 */
  .el-checkbox {
    width: 110px;
    /*             padding-left: 30px; */
    margin-left: 0px;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }

  .el-checkbox.two-size {
    width: 220px;
  }

  /*.two-size + .el-checkbox{
      padding-left: 60px;
  }*/
  .el-checkbox.three-size {
    width: 330px;
  }

  /*.three-size + .el-checkbox{
      padding-left: 90px;
  }*/
  /*checkbox增加border */
  .checkbox-have-bb .el-checkbox-group {
    border-bottom: 1px solid #eee;
  }

  .el-card .el-form-item:last-child {
    margin-bottom: 0;
  }

  .el-card {
    border-width: 0;
  }

  .el-card__header {
    position: relative;
    padding: 0 20px;
    font-size: 15px;
    position: relative;
    top: 10px;
    border-bottom-width: 0;
  }

  /* 价格里面checkbox的上下间距 */
  /*.checkbox-group .el-form-item__content {*/
  /*line-height: 25px;*/
  /*}*/

  .pr8 {
    padding-right: 8px;
  }

  .newColor .el-checkbox__input.is-checked .el-checkbox__inner {
    border: 0;
    background: #fff;
  }

  .newColor .el-checkbox__inner {
    border: 0;
    background: #fff;
  }

  .newSize .el-checkbox__input.is-checked .el-checkbox__inner {
    border: 0;
    background: #fff;
  }

  .newSize .el-checkbox__inner {
    border: 0;
    background: #fff;
  }

  .el-popover.el-popper {
    width: 258px !important;
  }

  footer {
    width: 100%;
    background: #ffffff;
    z-index: 999;
    position: fixed;
    bottom: 0;
    text-align:center
  }

</style>
