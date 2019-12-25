/**
 * @title 含有ToolBar的复杂表格
 * @description 用户可以自定表格的toolBar，其中的button 请参考bee-button中属性配置
 *
 */
import React, { Component } from "react";
import Grid from "../../src";

const GridToolBar = Grid.GridToolBar;

  
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


class Demo1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataList: [
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
              money:'1232.56',
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
              money:'2341232.56',
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
              money:'122368732.56',
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
              money:'18765232.56',
              key: "4"
            }
          ]
    }
  }

  getSelectedDataFunc = (selectedList,record,index,newData) => {
    console.log("data", newData);
  };

  /**
   * 请求页面数据
   */
  freshData = (pageIndex) => {
    console.log('跳转至第 ', pageIndex, ' 页');
  }
  onDataNumSelect=(index, value)=>{
    console.log('index：',index, ' value：',value);
  }
  addData = ()=>{
      const dataList = this.state.dataList;
      const currentIndex  = dataList.length + 1;
      dataList.push({
        index: currentIndex,
        key: `${currentIndex}`
      });
      this.setState({
          dataList
      })
     
  }
  export = ()=>{
      console.log('export=======');
  }
  /**
   *批量修改操作
   */
  dispatchUpdate = ()=>{
    console.log('--dispatch---update')
  }
  /**
   *批量删除
   */
  dispatchDel = ()=>{
    console.log('--dispatch---del')
  }
  render() {
    let paginationObj = {
      items:10,//一页显示多少条
      total:100,//总共多少条、
      freshData:this.freshData,//点击下一页刷新的数据
      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
      showJump:false,
      noBorder:true,
      horizontalPosition: 'center'
    }

    const toolBtns = [{
            value:'新增',
            onClick:this.addData,
            bordered:false,
            colors:'primary'
        },{
            value:'导出',
            iconType:'uf-search',
            onClick:this.export
        },{
            value:'上传',
            iconType:'uf-cloud-up',
        },{
            value:'批量操作',
            onClick:this.dispatchOpt,
            children:[
                {
                    value:'修改',  
                    onClick:this.dispatchUpdate
                },{
                    value:'删除',  
                    onClick:this.dispatchDel
                }
            ]
        },{
            iconType:'uf-copy',
        }]
    return (
      <div>
        <GridToolBar toolBtns={toolBtns} btnSize='sm' />
        <Grid
          className="demo"
          columns={column}
          data={this.state.dataList}
          getSelectedDataFunc={this.getSelectedDataFunc}
          paginationObj={paginationObj}
        />
      </div>
      
    );
  }
}
export default Demo1;