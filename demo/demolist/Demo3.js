/**
 *
 * @title 基础grid
 * @description 全选、分页、过滤功能、交换
 *
 */
import React, { Component } from "react";
import Grid from "../../src";
import ZhTW from "bee-locale/build/zh_TW";
const column = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 100,
    fixed:'left'
  },
  {
    title: "订单编号",
    dataIndex: "orderCode",
    key: "orderCode",
    width: 115
  },
  {
    title: "供应商名称",
    dataIndex: "supplierName",
    key: "supplierName",
    width: 125
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
    width: 110
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
    width: 110
  },
  {
    title: "审批状态",
    dataIndex: "approvalState_name",
    key: "approvalState_name",
    width: 110
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
    width: 110
  },
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    width: 100,
    fixed: "right",
    render(text, record, index) {
      return (
        <div className="operation-btn">
          <a
            href="#"
            tooltip={text}
            onClick={() => {
              alert("这是第" + index + "列，内容为:" + text);
            }}
          >
            一些操作
          </a>
        </div>
      );
    }
  }
];
const dataList = [
  {
    index: 1,
    orderCode: "2343",
    supplierName: "xxx",
    type_name: "123",
    purchasing: "内行",
    purchasingGroup: "323",
    voucherDate: "kkkk",
    approvalState_name: "vvvv",
    confirmState_name: "aaaa",
    closeState_name: "vnnnnn",
    d: "操作",
    key: "1"
  },
  {
    index: 2,
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
    d: "2操作",
    key: "2"
  },
  {
    index: 3,
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
    d: "3操作",
    key: "3"
  },
  {
    index: 4,
    orderCode: "222",
    supplierName: "22xxx",
    type_name: "1223",
    purchasing: "内行2",
    purchasingGroup: "3223",
    voucherDate: "222kk",
    approvalState_name: "22vvvv",
    confirmState_name: "2aaaa",
    closeState_name: "2vnnnnn",
    d: "4操作",
    key: "4"
  }
];

class Demo3 extends Component {
  constructor(props) {
    super(props);
  }

  //临时加个判断
  shouldComponentUpdate(){
    if(this.props.className =='u-panel-title'){
      return false;
    }
  }

  getCloumnsScroll = columns => {
    let sum = 0;
    columns.forEach(da => {
      sum += da.width;
    });
    console.log("sum", sum);
    return sum;
  };
  getSelectedDataFunc = data => {
    console.log("data", data);
  };
  selectedRow = (record, index) => {};
  /**
   * 请求页面数据
   */
  freshData=()=>{

  }
  render() {
    let paginationObj = {
      activePage: 1,//当前页
      items:10,
      freshData:this.freshData
    }
    return (
      <Grid
        className='gridDemo'
        columns={column}
        data={dataList}
        draggable={true}
        ref='grid'
        getSelectedDataFunc={this.getSelectedDataFunc}
        scroll={{ x: "130%", y: 100 }}
        selectedRow={this.selectedRow}
        showHeaderMenu={true}
        locale={ZhTW.Grid}
        paginationObj={paginationObj}
      />
    );
  }
}
export default Demo3;
