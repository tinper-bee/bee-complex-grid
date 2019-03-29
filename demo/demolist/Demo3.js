/**
  * @title 高级表格(保存操作模板、导出excel)应用 
 * @description 拖住表格宽度、交换列、以及导出excel功能
 *
 */
import React, { Component } from "react";
import Button from 'bee-button';
import Grid from "../../src";

const column = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 100,
    // exportHidden:true //是否在导出中隐藏此列,此属性如不设置的话，他会读取当前页面的列是否隐藏和显示
  },
  {
    title: "订单编号",
    dataIndex: "orderCode",
    key: "orderCode",
    exportKey:'supplierName',//单独设置当前列的导出的key
    width: 100
  },
  {
    title: "供应商名称",
    dataIndex: "supplierName",
    key: "supplierName",
    width: 100
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
    width: 100,
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
    width: 100
  },
  {
    title: "审批状态",
    dataIndex: "approvalState_name",
    key: "approvalState_name",
    width: 100
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
    width: 100
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

const exportDataList = [
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
    this.state={
      showTemTable:false
    }
  }
  
  getSelectedDataFunc = data => {
    console.log("data", data);
  };

  getCloumnsScroll = columns => {
    let sum = 0;
    columns.forEach(da => {
      sum += da.width;
    });
    console.log("sum", sum);
    return sum;
  };

  selectedRow = (record, index) => {};
  /**
   * 请求页面数据
   */
  freshData=()=>{

  }
  createTemTable=()=>{
    const colsAndTablePros = this.refs.grid.getColumnsAndTablePros();
    this.setState({
      showTemTable:true,
      tablePros:colsAndTablePros.tablePros,
      temColumns:colsAndTablePros.columns
    });
  }

  exportExcel = ()=>{
    this.refs.grid.exportExcel();
  }

  render() {
    let paginationObj = {
      items:10,//总页数
      total:100,
      freshData:this.freshData
    }
    return (
      <div>
        <div className='btn_group'>
          <Button colors="primary" onClick={this.createTemTable}>生成模板表格</Button>
          <Button colors="primary" onClick={this.exportExcel}>导出数据</Button>
        </div>
        <Grid
          ref="grid"
          className='gridDemo demo'
          columns={column}
          data={dataList}
          exportData={exportDataList}
          getSelectedDataFunc={this.getSelectedDataFunc}
          dragborder
          multiSelect={{ type: "checkbox" }}
          scroll={{ x: "130%" }}
          selectedRow={this.selectedRow}
          paginationObj={paginationObj}
        />
        <h3>根据模板生成的表格</h3>
        {this.state.showTemTable?
          <Grid {...this.state.tablePros} columns={this.state.temColumns}/>
          :""}
      </div>
    );
  }
}
export default Demo3;