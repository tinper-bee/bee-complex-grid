/**
 * @title 高级表格(单选)应用
 * @description 单选、分页、过滤功能、交换。设置 `multiSelect = {{ type:"radio" }}`，即可使用表格单选功能。
 *
 */
import React, { Component } from "react";
import Grid from "../../src";

function fmoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
  t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
  }
  
const column = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 100
  },
  {
    title: "订单编号",
    dataIndex: "orderCode",
    key: "orderCode",
    width: 150
  },
  {
    title: "金额",
    dataIndex: "money",
    key: "money",
    width: 160,
    textAlign:'right',
    sumCol: true,
    render(text, record, index) {
       let money = fmoney(text,2);
       return (<span>{money}</span>)
    }
  },
  {
    title: "类型",
    dataIndex: "type_name",
    key: "type_name",
    width: 100
  },
  {
    title: "采购组织",
    dataIndex: "purchasing",
    key: "purchasing",
    width: 150
  },
  {
    title: "采购组",
    dataIndex: "purchasingGroup",
    key: "purchasingGroup",
    width: 300
  },
  {
    title: "凭证日期",
    dataIndex: "voucherDate",
    key: "voucherDate",
    width: 150
  },
  {
    title: "审批状态",
    dataIndex: "approvalState_name",
    key: "approvalState_name",
    width: 150
  },
  {
    title: "确认状态",
    dataIndex: "confirmState_name",
    key: "confirmState_name",
    width: 500
  },
  {
    title: "关闭状态",
    dataIndex: "closeState_name",
    key: "closeState_name",
    width: 150
  }
];
const dataList = [
  {
    index: 0,
    orderCode: "2343",
    supplierName: "xxx",
    type_name: "123",
    purchasing: "内行",
    purchasingGroup: "323",
    voucherDate: "kkkk",
    approvalState_name: "vvvv",
    confirmState_name: "aaaa",
    closeState_name: "vnnnnn",
    money:'1232.56',
    d: "操作",
    key: "1"
  },
  {
    index: 1,
    _checked: true,
    orderCode: "222",
    supplierName: "22xxx",
    type_name: "1223",
    purchasing: "内行2",
    purchasingGroup: "3223",
    voucherDate: "222kk",
    approvalState_name: "22vvvv",
    confirmState_name: "2aaaa",
    closeState_name: "2vnnnnn",
    money:'2341232.56',
    d: "2操作",
    key: "2"
  },
  {
    index: 2,
    orderCode: "222",
    supplierName: "22xxx",
    _disabled: true,
    type_name: "1223",
    purchasing: "内行2",
    purchasingGroup: "3223",
    voucherDate: "222kk",
    approvalState_name: "22vvvv",
    confirmState_name: "2aaaa",
    closeState_name: "2vnnnnn",
    money:'122368732.56',
    d: "3操作",
    key: "3"
  },
  {
    index: 3,
    orderCode: "222",
    supplierName: "22xxx",
    type_name: "1223",
    purchasing: "内行2",
    purchasingGroup: "3223",
    voucherDate: "222kk",
    approvalState_name: "22vvvv",
    confirmState_name: "2aaaa",
    closeState_name: "2vnnnnn",
    money:'18765232.56',
    d: "4操作",
    key: "4"
  }
];

class Demo7 extends Component {
  constructor(props) {
    super(props);
  }
  //临时加个判断
  shouldComponentUpdate(){
    if(this.props.className =='u-panel-title'){
      return false;
    }
  }
  getSelectedDataFunc = data => {
    console.log("data", data);
  };

  selectedRow = (record, index) => {};
  /**
   * 请求页面数据
   */
  freshata=()=>{

  }
  onDataNumSelect=()=>{
    console.log('选择每页多少条的回调函数');
  }
  render() {
    let paginationObj = {
      items:10,//一页显示多少条
      total:100,//总共多少条、
      freshData:this.freshData,//点击下一页刷新的数据
      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
      showJump:false,
      noBorder:true
    }
    return (
      <Grid
        className="demo"
        columns={column}
        data={dataList}
        paginationObj={paginationObj}
        canSum={true} 
        multiSelect={{ type:"radio" }}
        getSelectedDataFunc={this.getSelectedDataFunc}
      />
    );
  }
}
export default Demo7;