<template>
  <div id="printWrap">
  <!--startprint-->
  <div class="main">
    <!--标题-->
    <h1 class="title">{{orderInfo.supplierShowName}}</h1>
    <!--详细信息-->
    <div class="order-details">

        <ul class="order-info-group">
            <li class="sub-title">{{ $t('订单信息') }}:</li>
            <li class="detail-item">
              <div class="name">{{ $t('订单号') }}:</div><span class="content">{{orderInfo.number}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('采购商邮箱') }}:</div><span class="content">{{orderInfo.usrEmail}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('时间') }}:</div><span class="content">{{changeTime(orderInfo.date)}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('状态') }}:</div><span class="content">{{convertStatus(orderInfo.status)}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('产品总额') }}:</div><span class="content">{{orderInfo.subtotal}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('运费') }}:</div><span class="content">{{orderInfo.shippingCharges || "$0.00"}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('手续费') }}:</div><span class="content">{{orderInfo.Insurance || "$0.00"}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('订单总价') }}:</div><span class="content">{{orderInfo.total}}</span>
            </li>
            <!-- <li class="detail-item">
              <div class="name">订单备注内容 :</div><span class="content">xxxxx</span>
            </li> -->
        </ul>

        <ul class="order-info-group" v-if="orderInfo.shipAddress">
            <li class="sub-title">{{ $t('收货地址') }}:</li>
            <li class="detail-item">
              <div class="name">{{ $t('姓名') }}:</div><span class="content">{{orderInfo.shipAddress.name +" "+ orderInfo.shipAddress.surname}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('地址') }}:</div><span class="content">{{orderInfo.shipAddress.country.name +' '+ orderInfo.shipAddress.region.name +' '+ orderInfo.shipAddress.city +' '+ orderInfo.shipAddress.address}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('邮政编码') }}:</div><span class="content">{{orderInfo.shipAddress.postalCode}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('电话') }}:</div><span class="content">{{orderInfo.shipAddress.phone}}</span>
            </li>
        </ul>

        <ul class="order-info-group" v-if="orderInfo.billAddress">
            <li class="sub-title">{{ $t('账单地址') }}:</li>
            <li class="detail-item">
              <div class="name">{{ $t('姓名') }}:</div><span class="content">{{orderInfo.billAddress.name +" "+ orderInfo.billAddress.surname}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('地址') }}:</div><span class="content">{{orderInfo.billAddress.country.name +' '+ orderInfo.billAddress.region.name +' '+ orderInfo.billAddress.city +' '+ orderInfo.billAddress.address}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('邮政编码') }}:</div><span class="content">{{orderInfo.billAddress.postalCode}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('电话') }}:</div><span class="content">{{orderInfo.billAddress.phone}}</span>
            </li>
        </ul>

        <ul class="order-info-group">
            <li class="sub-title">{{ $t('配送方式') }}:</li>
            <li class="detail-item" v-if="orderInfo.expressNum">
              <div class="name">{{ $t('订单号') }}:</div><span class="content">{{orderInfo.expressNum}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('配送公司') }}:</div><span class="content">{{orderInfo.deliveryType}}</span>
            </li>
            <li class="detail-item">
              <div class="name">{{ $t('支付方式') }}:</div><span class="content">{{orderInfo.payType && orderInfo.payType.name}}</span>
            </li>
            <li class="detail-item" v-if="orderInfo.pagRemark">
              <div class="name">{{ $t('包裹备注') }}:</div><span class="content">{{orderInfo.pagRemark}}</span>
            </li>
        </ul>
        <div class="flex normal-style">
          <div class="name">{{ $t('订单备注') }}:<span class="content" style="color: #777;">{{orderInfo.remark?orderInfo.pagRemark:"无"}}</span></div>
        </div>
    </div>

    <div class="mt30">
        <table  class="table-goods">
          <colgroup>
            <col width="5%">
            <col width="45%">
            <col width="20%">
            <col width="10%">
            <col width="8%">
            <col width="12%">
          </colgroup>

          <tbody>
            <tr class="table-goods-th">
                <td>{{ $t('序号') }}</td>
                <td>{{ $t('产品') }}</td>
                <td>{{ $t('规格') }}</td>
                <td>{{ $t('价格') }}</td>
                <td>{{ $t('数量') }}</td>
                <td>{{ $t('总额') }}</td>
            </tr>
            <!-- <tr class="table-goods-tr">
                <td>1</td>
                <td>
                    <img class="goods-img" src="" alt="">女士时尚金属扣莱卡拼接女鞋 侧拉链 欧美风 休闲风跟长筒靴 秋冬星品
                </td>
                <td>女性（us/es）9.5/41</td>
                <td>{{orderInfo.currencySymbol}} 10.00</td>
                <td>500</td>
                <td>{{orderInfo.currencySymbol}} 5000.00</td>
            </tr> -->
            <template v-if="orderInfo.lines && orderInfo.lines.length>0">
              <tr  class="table-goods-tr" v-for="(goods,index) in orderInfo.lines">
                <td>{{index+1}}</td>
                <td>
                  <!-- <img class="goods-img" :src="goods.spec.images" alt=""> -->
                  {{goods.spec.productName}}
                </td>
                <td>{{goods.spec.keyName}}</td>
                <td>{{goods.spec.price}}</td>
                <td>{{goods.qty}}</td>
                <td>{{goods.subtotal}}</td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="total-info">总计：
            <span class="total-num">{{orderInfo.itemsCount}}</span>
            <span class="total-count">{{orderInfo.total}}</span>
        </div>

        <table class="table-operate">
            <colgroup>
              <col width="20%">
              <col width="15%">
              <col width="15%">
              <col width="50%">
            </colgroup>

            <thead>
              <tr class="table-operate-th">
                <th>{{ $t('日期') }}</th>
                <th>{{ $t('状态') }}</th>
                <th>{{ $t('操作员') }}</th>
                <th>{{ $t('描述') }}</th>
              </tr>
            </thead>

            <tbody>
              <template v-if="orderInfo.historys && orderInfo.historys.length">
                <tr class="table-operate-tr" v-for="item in orderInfo.historys">
                  <td>{{changeTime(item.date)}}</td>
                  <td>{{convertStatus(item.status)}}</td>
                  <td>{{item.operator}}</td>
                  <td>{{item.descrip}}</td>
                </tr>
              </template>
            </tbody>
        </table>
    </div>
  </div>
  <!--endprint-->
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      orderInfo:{}
    }
  },
  computed:{

  },
  methods: {
    // 初始化页面
    init() {
      request({
        url: '/seller/odr_OdrOrder_select',
        method: 'post',
        data: {
          orderNum: this.$route.query.orderNum
        }
      }).then((res)=>{
        console.log("res",res.data.result)
        if(res.data.ret != 1) return;
        this.orderData = res.data.result;


        // 获取快递公司列表 - 需要知道orderData中的配送方式 进行循环判断 - 后台返回的不是id，而是company
        this.getDeliveryCompaniesList();
      })
    },
    // 状态码 转 文字
    convertStatus(num){
      switch(num){
        case 0:
        return "待付款";
        case 1:
        return "等待确认付款";
        case 2:
        return "付款错误";
        case 3:
        return "等待发货";
        case 4:
        return "已发货";
        case 5:
        return "完成订单";
        case 6:
        return "已取消订单";
        case 7:
        return "已删除";
      }
    },
    // 时间戳变时间
    changeTime(timeNum){
      return new Date().Format ? new Date().Format("yyyy/MM/dd HH:mm") :"00:00:00";
    },
  },
  mounted(){
    Date.prototype.Format = function (fmt) { //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
          o[k]).substr(("" + o[k]).length)));
      return fmt;
    }

    request({
      url: '/home/odr_OdrOrder_print',
      method: 'post',
      data:{
        orderId: this.$route.query.orderNum
      },
    }).then((res)=>{
      console.log('getRes',res)
      if(res.data.ret == 1 ){
        this.orderInfo = res.data.result;
        this.$nextTick(()=>{
          console.log("this.$route")
          console.log(this.$route.query.print)
          if( this.$route.query.print == 1 ){
            let printWrap =  document.getElementById('printWrap').innerHTML;
            // var oldhtml=window.document.body.innerHTML;//获取当前页的html代码
            window.document.body.innerHTML=printWrap;
            window.print();
            // window.document.body.innerHTML=oldhtml;
            this.$router.replace('/order/print?orderNum='+this.$route.query.orderNum)
            window.location.reload()
          }
        })
      }else{
        this.$message({
          message: '获取失败,'+ res.data.msg,
          type: 'warning'
        });
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    padding: 25px;
  }
  .mt30{
	margin-top: 30px;
}

// .main{
//     margin: 60px 0px 0px 60px;
//     width: 1100px;
// }
/* 订单信息 - 块级信息 - ul*/
.order-info-group{
	display: inline-block;
	vertical-align: top;
	width: 240px;
	padding-left: 15px;
	box-sizing: border-box;
}
.order-info-group:first-child{
	padding-left: 0;
}
li{
    list-style-type: none;
    font-size: 12px;
    line-height: 20px;
}
h1.title{
    font-weight: bold;
    color: #424242;
    line-height: 36px;
		font-size: 23px;
}
.sub-title {
	  line-height: 36px;
		font-weight: bold;
		color: #424242;
    font-size: 15px;
}

/* 详细信息 */
.order-details {
    margin-top: 10px;
}
.order-details .detail-item{
		display: flex;
}
.flex{
	display: flex;
}
.order-details .detail-item .name{
		min-width: 60px;
		flex-shrink: 0;
}
.order-details .detail-item .content{
		padding-left: 4px;
}
.normal-style{
	font-size: 12px;
	line-height: 20px;
}
table{
	border-collapse: collapse;
	table-layout:fixed;
	word-break:break-all;
}
.table-goods,.table-operate{
	margin: 0;
	width: 1006px;
}
.table-goods{
	text-align: center;
	border-bottom: 3px solid black;
}

.table-goods-th,.table-operate-th{
	width: 100%;
	height: 36px;
	font-size: 15px;
	line-height: 36px;
	font-weight: bold;
	color: #424242;
	background-color: #eee;
	text-align: center;
}
.table-goods-tr td,.table-operate-tr td{
	height: 46px;
	text-align: center;
	line-height: 46px;
	font-size: 12px;
	overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.table-goods-tr {
	border-bottom: 1px solid #c2c2c2;
}

.goods-img{
	display: block;
	float: left;
	width: 30px;
	height: 30px;
	background-color: gray;
	margin-top: 8px;
}
.table-operate-tr td{
	height: 25px;
	line-height: 25px;
}
/* 描述内容 内容较长，左对齐 */
.table-operate-tr td:nth-child(4) {
    text-align: left;
    text-indent: 15px;
}

/* 合计 - 位置 */
.total-info{
	width: 1006px;
	height: 46px;
	line-height: 46px;
	/* text-indent: 755px; */
	text-align: right;
	font-size: 15px;
	font-weight: bold;
	color: #424242;
}
.total-info .total-num{
	display: inline-block;
	width: 7%;
	text-align: center;
}
.total-info .total-count{
	display: inline-block;
	width: 12%;
	text-align: center;
}
</style>
