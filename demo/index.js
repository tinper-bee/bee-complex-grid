import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo7 = require("./demolist/Demo7");var DemoArray = [{"example":<Demo1 />,"title":" 高级表格的基础应用(基本示例2)","code":"/**\n * @title 高级表格的基础应用(基本示例2)\n * @description 全选、分页、过滤功能、交换\n *\n */\nimport React, { Component } from \"react\";\nimport { Grid } from 'tinper-bee';\n\nfunction fmoney(s, n) {\n  n = n > 0 && n <= 20 ? n : 2;\n  s = parseFloat((s + \"\").replace(/[^\\d\\.-]/g, \"\")).toFixed(n) + \"\";\n  let l = s.split(\".\")[0].split(\"\").reverse(), r = s.split(\".\")[1];\n  let t = \"\";\n  for (let i = 0; i < l.length; i++) {\n  t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? \",\" : \"\");\n  }\n  return t.split(\"\").reverse().join(\"\") + \".\" + r;\n  }\n  \nconst column = [\n  {\n    title: \"序号\",\n    dataIndex: \"index\",\n    key: \"index\",\n    width: 100\n  },\n  {\n    title: \"订单编号\",\n    dataIndex: \"orderCode\",\n    key: \"orderCode\",\n    width: 150\n  },\n  {\n    title: \"金额\",\n    dataIndex: \"money\",\n    key: \"money\",\n    width: 160,\n    textAlign:'right',\n    sumCol: true,\n    render(text, record, index) {\n       let money = fmoney(text,2);\n       return (<span>{money}</span>)\n    }\n  },\n  {\n    title: \"类型\",\n    dataIndex: \"type_name\",\n    key: \"type_name\",\n    width: 100\n  },\n  {\n    title: \"采购组织\",\n    dataIndex: \"purchasing\",\n    key: \"purchasing\",\n    width: 150\n  },\n  {\n    title: \"采购组\",\n    dataIndex: \"purchasingGroup\",\n    key: \"purchasingGroup\",\n    width: 300\n  },\n  {\n    title: \"凭证日期\",\n    dataIndex: \"voucherDate\",\n    key: \"voucherDate\",\n    width: 150\n  },\n  {\n    title: \"审批状态\",\n    dataIndex: \"approvalState_name\",\n    key: \"approvalState_name\",\n    width: 150\n  },\n  {\n    title: \"确认状态\",\n    dataIndex: \"confirmState_name\",\n    key: \"confirmState_name\",\n    width: 500\n  },\n  {\n    title: \"关闭状态\",\n    dataIndex: \"closeState_name\",\n    key: \"closeState_name\",\n    width: 150\n  }\n];\nconst dataList = [\n  {\n    index: 1,\n    orderCode: \"2343\",\n    supplierName: \"xxx\",\n    type_name: \"123\",\n    purchasing: \"内行\",\n    purchasingGroup: \"323\",\n    voucherDate: \"kkkk\",\n    approvalState_name: \"vvvv\",\n    confirmState_name: \"aaaa\",\n    closeState_name: \"vnnnnn\",\n    money:'1232.56',\n    d: \"操作\",\n    key: \"1\"\n  },\n  {\n    index: 2,\n    _checked: true,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'2341232.56',\n    d: \"2操作\",\n    key: \"2\"\n  },\n  {\n    index: 3,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    _disabled: true,\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'122368732.56',\n    d: \"3操作\",\n    key: \"3\"\n  },\n  {\n    index: 4,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'18765232.56',\n    d: \"4操作\",\n    key: \"4\"\n  }\n];\n\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n  }\n  //临时加个判断\n  shouldComponentUpdate(){\n    if(this.props.className =='u-panel-title'){\n      return false;\n    }\n  }\n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshata=()=>{\n\n  }\n  onDataNumSelect=()=>{\n    console.log('选择每页多少条的回调函数');\n  }\n  render() {\n    let paginationObj = {\n      items:10,//一页显示多少条\n      total:100,//总共多少条、\n      freshData:this.freshData,//点击下一页刷新的数据\n      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件\n      showJump:false,\n      noBorder:true\n    }\n    return (\n      <Grid\n        className=\"demo\"\n        columns={column}\n        data={dataList}\n        getSelectedDataFunc={this.getSelectedDataFunc}\n        paginationObj={paginationObj}\n        canSum={true}\n        multiSelect={true}\n      />\n    );\n  }\n}\n","desc":" 全选、分页、过滤功能、交换"},{"example":<Demo2 />,"title":" 高级表格(排序)应用","code":"/**\n *\n * @title 高级表格(排序)应用\n * @description 基础grid上添加排序功能\n *\n */\nimport React, { Component } from \"react\";\nimport { Grid } from 'tinper-bee';\nconst column = [\n    {\n      title: \"名字\",\n      dataIndex: \"a\",\n      key: \"a\",\n      className:'dfasd',\n      width: 200,\n      sorter: (pre, after) => {return pre.a.localeCompare(after.a)} ,\n      sorterClick:(data,type)=>{//排序的回调函数\n        //type value is up or down\n        console.log(\"data\",data);\n      }\n    },\n    {\n      title: \"功力指数名称长时显示省略号\",\n      dataIndex: \"b\",\n      key: \"b\",\n      width: 200,\n      sumCol: true,\n      sorter: (pre, after) => {return pre.b - after.b},\n      sorterClick:(data,type)=>{//排序的回调函数\n        //type value is up or down\n        console.log(\"data\",data);\n      }\n    },\n    {\n      title: \"年龄\",\n      dataIndex: \"c\",\n      key: \"c\",\n      width: 200,\n      sumCol: true,\n      sorter: (pre, after) => {return pre.c - after.c},\n      sorterClick:(data,type)=>{//排序的回调函数\n        //type value is up or down\n        console.log(\"data\",data);\n      }\n    },\n    {\n      title: \"成绩\",\n      dataIndex: \"e\",\n      key: \"e\",\n      width: 200,\n      sumCol: true,\n      sorter: (pre, after) => {return pre.e - after.e},\n    },\n    {\n      title: \"武功级别\",\n      dataIndex: \"d\",\n      key: \"d\",\n      width: 200\n    }\n  ];\n  const dataList = [\n    { a: \"杨过\", b: 675, c: 30, d: \"内行\",e:100, key: \"2\" },\n    { a: \"令狐冲\", b: 43, c: 41, d: \"大侠\",e:90, key: \"1\" },\n    { a: \"令狐冲1\", b: 43, c: 81, d: \"大侠\", e:120,key: \"4\" },\n    { a: \"令狐冲2\", b: 43, c: 81, d: \"大侠\", e:130,key: \"5\" },\n    { a: \"郭靖\", b: 153, c: 25, d: \"大侠\",e:90, key: \"3\" }\n  ];\n\nclass Demo2 extends Component {\n  constructor(props) {\n    super(props);\n  }\n\n  //临时加个判断\n  shouldComponentUpdate(){\n    if(this.props.className =='u-panel-title'){\n      return false;\n    }\n  }\n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  getCloumnsScroll = columns => {\n    let sum = 0;\n    columns.forEach(da => {\n      sum += da.width;\n    });\n    console.log(\"sum\", sum);\n    return sum;\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshData=()=>{\n\n  }\n  /**\n   * 后端获取数据\n   */\n  sortFun = (sortParam)=>{\n    console.info(sortParam);\n    //将参数传递给后端排序\n  }\n  render() {\n    let paginationObj = {\n      items:10,//总页数\n      freshData:this.freshData,\n      noBorder:true\n    }\n    let sortObj = {\n        mode:'multiple',\n        // backSource:true,\n        sortFun:this.sortFun\n      }\n    \n    return (\n      <div>\n        \n         <Grid\n          className=\"demo\"\n          columns={column}\n          data={dataList}\n          // multiSelect={false}\n          getSelectedDataFunc={this.getSelectedDataFunc}\n          selectedRow={this.selectedRow}\n          sort={sortObj}\n          sortFun={this.sortFun}\n          paginationObj={paginationObj}\n          showFilterMenu\n        />\n      </div>\n     \n    );\n  }\n}\n","desc":" 基础grid上添加排序功能"},{"example":<Demo4 />,"title":" 高级表格的基础应用(基本示例3)","code":"/**\n * @title 高级表格的基础应用(基本示例3)\n * @description 全选、分页、过滤。功能、交换\n *\n */\nimport React, { Component } from \"react\";\nimport { Grid, Button } from 'tinper-bee';\nconst columns = [\n    {\n        title:'序号',\n        dataIndex:'index',\n        width:'80',\n        render:(text,record,index)=>{\n            return index\n        },\n        fixed:'left'\n    },\n    {\n    title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 580, className: \"rowClassName\",\n  },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 80},\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 }\n];\n\nconst data = [ ...new Array(10000) ].map((e, i) => {\n    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };\n    if(i%3==0){\n        rs.b = '女';\n    }\n    return rs;\n   })\n\nclass Demo4 extends Component {\n  constructor(props) {\n    super(props);\n  }\n  //临时加个判断\n  shouldComponentUpdate(){\n    if(this.props.className =='u-panel-title'){\n      return false;\n    }\n  }\n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshata = () => {\n\n  }\n  onDataNumSelect = () => {\n    console.log('选择每页多少条的回调函数');\n  }\n  onRowHover = (index,record) => {\n    this.currentIndex = index;\n    this.currentRecord = record;\n  }\n  handleClick = () => {\n    alert('这是第' + this.currentIndex + '列，用户名为:' + this.currentRecord.a);\n  }\n\n  getHoverContent=()=>{\n    return <div className=\"opt-btns\"><Button size=\"sm\" onClick={this.handleClick}>一些操作</Button> </div>\n  }\n  render() {\n    let paginationObj = {\n      items:10,//一页显示多少条\n      total:100,//总共多少条\n      freshData:this.freshData,//点击下一页刷新的数据\n      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件\n      noBorder:true\n    }\n    return (\n      <Grid\n        className=\"demo\"\n        columns={columns}\n        data={data}\n        getSelectedDataFunc={this.getSelectedDataFunc}\n        paginationObj={paginationObj}\n        loadLazy={true}\n        heigth={40}\n        scroll = {{y:300}}\n        hoverContent={this.getHoverContent}\n        onRowHover={this.onRowHover}\n      />\n    );\n  }\n}\n","desc":" 全选、分页、过滤。功能、交换"},{"example":<Demo5 />,"title":" 含有ToolBar的复杂表格","code":"/**\n * @title 含有ToolBar的复杂表格\n * @description 用户可以自定表格的toolBar，其中的button 请参考bee-button中属性配置\n *\n */\nimport React, { Component } from \"react\";\nimport {  } from 'tinper-bee';\nimport  Grid,{GridToolBar} from \"../../src\";\n\n  \nconst column = [\n  {\n    title: \"序号\",\n    dataIndex: \"index\",\n    key: \"index\",\n    width: 100\n  },\n  {\n    title: \"订单编号\",\n    dataIndex: \"orderCode\",\n    key: \"orderCode\",\n    width: 150\n  },\n  {\n    title: \"类型\",\n    dataIndex: \"type_name\",\n    key: \"type_name\",\n    width: 100\n  },\n  {\n    title: \"采购组织\",\n    dataIndex: \"purchasing\",\n    key: \"purchasing\",\n    width: 150\n  },\n  {\n    title: \"采购组\",\n    dataIndex: \"purchasingGroup\",\n    key: \"purchasingGroup\",\n    width: 300\n  },\n  {\n    title: \"凭证日期\",\n    dataIndex: \"voucherDate\",\n    key: \"voucherDate\",\n    width: 150\n  },\n  {\n    title: \"审批状态\",\n    dataIndex: \"approvalState_name\",\n    key: \"approvalState_name\",\n    width: 150\n  },\n  {\n    title: \"确认状态\",\n    dataIndex: \"confirmState_name\",\n    key: \"confirmState_name\",\n    width: 500\n  },\n  {\n    title: \"关闭状态\",\n    dataIndex: \"closeState_name\",\n    key: \"closeState_name\",\n    width: 150\n  }\n];\n\n\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n        dataList: [\n            {\n              index: 1,\n              orderCode: \"2343\",\n              supplierName: \"xxx\",\n              type_name: \"123\",\n              purchasing: \"内行\",\n              purchasingGroup: \"323\",\n              voucherDate: \"kkkk\",\n              approvalState_name: \"vvvv\",\n              confirmState_name: \"aaaa\",\n              closeState_name: \"vnnnnn\",\n              money:'1232.56',\n              key: \"1\"\n            },\n            {\n              index: 2,\n              _checked: true,\n              orderCode: \"222\",\n              supplierName: \"22xxx\",\n              type_name: \"1223\",\n              purchasing: \"内行2\",\n              purchasingGroup: \"3223\",\n              voucherDate: \"222kk\",\n              approvalState_name: \"22vvvv\",\n              confirmState_name: \"2aaaa\",\n              closeState_name: \"2vnnnnn\",\n              money:'2341232.56',\n              key: \"2\"\n            },\n            {\n              index: 3,\n              orderCode: \"222\",\n              supplierName: \"22xxx\",\n              _disabled: true,\n              type_name: \"1223\",\n              purchasing: \"内行2\",\n              purchasingGroup: \"3223\",\n              voucherDate: \"222kk\",\n              approvalState_name: \"22vvvv\",\n              confirmState_name: \"2aaaa\",\n              closeState_name: \"2vnnnnn\",\n              money:'122368732.56',\n              key: \"3\"\n            },\n            {\n              index: 4,\n              orderCode: \"222\",\n              supplierName: \"22xxx\",\n              type_name: \"1223\",\n              purchasing: \"内行2\",\n              purchasingGroup: \"3223\",\n              voucherDate: \"222kk\",\n              approvalState_name: \"22vvvv\",\n              confirmState_name: \"2aaaa\",\n              closeState_name: \"2vnnnnn\",\n              money:'18765232.56',\n              key: \"4\"\n            }\n          ]\n    }\n  }\n  //临时加个判断\n//   shouldComponentUpdate(){\n    // if(this.props.className =='u-panel-title'){\n    //   return false;\n    // }\n//   }\n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshata=()=>{\n\n  }\n  onDataNumSelect=()=>{\n    console.log('选择每页多少条的回调函数');\n  }\n  addData = ()=>{\n      const dataList = this.state.dataList;\n      const currentIndex  = dataList.length + 1;\n      dataList.push({\n        index: currentIndex,\n        key: `${currentIndex}`\n      });\n      this.setState({\n          dataList\n      })\n     \n  }\n  \n      console.log('export=======');\n  }\n  /**\n   *批量修改操作\n   */\n  dispatchUpdate = ()=>{\n    console.log('--dispatch---update')\n  }\n  /**\n   *批量删除\n   */\n  dispatchDel = ()=>{\n    console.log('--dispatch---del')\n  }\n  render() {\n    let paginationObj = {\n      items:10,//一页显示多少条\n      total:100,//总共多少条、\n      freshData:this.freshData,//点击下一页刷新的数据\n      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件\n      showJump:false,\n      noBorder:true\n    }\n\n    const toolBtns = [{\n            value:'新增',\n            onClick:this.addData,\n            bordered:false,\n            colors:'primary'\n        },{\n            value:'导出',\n            iconType:'uf-search',\n            onClick:this.\n            value:'上传',\n            iconType:'uf-cloud-up',\n        },{\n            value:'批量操作',\n            onClick:this.dispatchOpt,\n            children:[\n                {\n                    value:'修改',  \n                    onClick:this.dispatchUpdate\n                },{\n                    value:'删除',  \n                    onClick:this.dispatchDel\n                }\n            ]\n        },{\n            iconType:'uf-copy',\n        }]\n    return (\n      <div>\n        <GridToolBar toolBtns={toolBtns} btnSize='sm' />\n        <Grid\n          className=\"demo\"\n          columns={column}\n          data={this.state.dataList}\n          getSelectedDataFunc={this.getSelectedDataFunc}\n          paginationObj={paginationObj}\n          canSum={true}\n        />\n      </div>\n      \n    );\n  }\n}\n","desc":" 用户可以自定表格的toolBar，其中的button 请参考bee-button中属性配置"},{"example":<Demo6 />,"title":" 高级表格(保存操作模板、导出excel)","code":"/**\n  * @title 高级表格(保存操作模板、导出excel)\n * @description 拖住表格宽度、交换列、以及导出excel功能\n *\n */\nimport React, { Component } from \"react\";\nimport { Button } from 'tinper-bee';\nimport Grid,{GridToolBar} from \"../../src\";\n\nconst column = [\n  {\n    title: \"序号\",\n    dataIndex: \"index\",\n    key: \"index\",\n    width: 100,\n    // exportHidden:true //是否在导出中隐藏此列,此属性如不设置的话，他会读取当前页面的列是否隐藏和显示\n  },\n  {\n    title: \"订单编号\",\n    dataIndex: \"orderCode\",\n    key: \"orderCode\",\n    exportKey:'supplierName',//单独设置当前列的导出的key\n    width: 130\n  },\n  {\n    title: \"供应商名称\",\n    dataIndex: \"supplierName\",\n    key: \"supplierName\",\n    width: 130\n  },\n  {\n    title: \"类型\",\n    dataIndex: \"type_name\",\n    key: \"type_name\",\n    width: 100\n  },\n  {\n    title: \"采购组织\",\n    dataIndex: \"purchasing\",\n    key: \"purchasing\",\n    width: 130,\n  },\n  {\n    title: \"采购组\",\n    dataIndex: \"purchasingGroup\",\n    key: \"purchasingGroup\",\n    width: 300\n  },\n  {\n    title: \"凭证日期\",\n    dataIndex: \"voucherDate\",\n    key: \"voucherDate\",\n    width: 130\n  },\n  {\n    title: \"审批状态\",\n    dataIndex: \"approvalState_name\",\n    key: \"approvalState_name\",\n    width: 130\n  },\n  {\n    title: \"确认状态\",\n    dataIndex: \"confirmState_name\",\n    key: \"confirmState_name\",\n    width: 500\n  },\n  {\n    title: \"关闭状态\",\n    dataIndex: \"closeState_name\",\n    key: \"closeState_name\",\n    width: 100\n  }\n];\nconst dataList = [\n  {\n    index: 1,\n    orderCode: \"2343\",\n    supplierName: \"xxx\",\n    type_name: \"123\",\n    purchasing: \"内行\",\n    purchasingGroup: \"323\",\n    voucherDate: \"kkkk\",\n    approvalState_name: \"vvvv\",\n    confirmState_name: \"aaaa\",\n    closeState_name: \"vnnnnn\",\n    d: \"操作\",\n    key: \"1\"\n  },\n  {\n    index: 2,\n    _checked: true,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    d: \"2操作\",\n    key: \"2\"\n  },\n  {\n    index: 3,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    _disabled: true,\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    d: \"3操作\",\n    key: \"3\"\n  },\n  {\n    index: 4,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    d: \"4操作\",\n    key: \"4\"\n  }\n];\n\nconst exportDataList = [\n  {\n    index: 1,\n    orderCode: \"2343\",\n    supplierName: \"xxx\",\n    type_name: \"123\",\n    purchasing: \"内行\",\n    purchasingGroup: \"323\",\n    voucherDate: \"kkkk\",\n    approvalState_name: \"vvvv\",\n    confirmState_name: \"aaaa\",\n    closeState_name: \"vnnnnn\",\n    d: \"操作\",\n    key: \"1\"\n  },\n  {\n    index: 4,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    d: \"4操作\",\n    key: \"4\"\n  }\n];\n\n\nclass Demo3 extends Component {\n  constructor(props) {\n    super(props);\n    this.state={\n      showTemTable:false\n    }\n  }\n  \n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  getCloumnsScroll = columns => {\n    let sum = 0;\n    columns.forEach(da => {\n      sum += da.width;\n    });\n    console.log(\"sum\", sum);\n    return sum;\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshData=()=>{\n\n  }\n  createTemTable=()=>{\n    const colsAndTablePros = this.refs.grid.getColumnsAndTablePros();\n    this.setState({\n      showTemTable:true,\n      tablePros:colsAndTablePros.tablePros,\n      temColumns:colsAndTablePros.columns\n    });\n  }\n\n  exportExcel = ()=>{\n    this.refs.grid.exportExcel();\n  }\n\n  onRowHover = (index,record) => {\n    this.currentIndex = index;\n    this.currentRecord = record;\n  }\n\n  handleClick = () => {\n    alert('这是第' + this.currentIndex + '列，订单编号为:' + this.currentRecord.orderCode);\n  }\n\n  getHoverContent=()=>{\n    return <div className=\"opt-btns\"><Button size=\"sm\" onClick={this.handleClick}>一些操作</Button> </div>\n  }\n\n  render() {\n    let paginationObj = {\n      items:10,//总页数\n      total:100,\n      freshData:this.freshData,\n      noBorder:true\n    }\n    const toolBtns = [{\n        value:'生成模板表格',\n        onClick:this.createTemTable,\n        bordered:false,\n        colors:'primary'\n    },{\n        value:'导出',\n        iconType:'uf-export',\n        onClick:this.exportExcel\n    }]\n    return (\n      <div>\n        <GridToolBar toolBtns={toolBtns}  />\n        <Grid\n          ref=\"grid\"\n          className='gridDemo demo'\n          exportFileName=\"bee-grid-excel\" //导出excel的文件名称设置，如果不设置为dowloand\n          columns={column}\n          data={dataList}\n          exportData={exportDataList}\n          getSelectedDataFunc={this.getSelectedDataFunc}\n          dragborder\n          multiSelect={{ type: \"checkbox\" }}\n          scroll={{ x: \"130%\" }}\n          selectedRow={this.selectedRow}\n          paginationObj={paginationObj}\n          hoverContent={this.getHoverContent}\n          onRowHover={this.onRowHover}\n        />\n        <h3>根据模板生成的表格</h3>\n        {this.state.showTemTable?\n          <Grid {...this.state.tablePros} columns={this.state.temColumns}/>\n          :\"\"}\n      </div>\n    );\n  }\n}\n","desc":" 拖住表格宽度、交换列、以及导出excel功能"},{"example":<Demo7 />,"title":" 高级表格(单选)应用","code":"/**\r\n * @title 高级表格(单选)应用\r\n * @description 单选、分页、过滤功能、交换。设置 `multiSelect = {{ type:\"radio\" }}`，即可使用表格单选功能。\r\n *\r\n */\r\nimport React, { Component } from \"react\";\r\nimport { Grid } from 'tinper-bee';\r\n\r\nfunction fmoney(s, n) {\r\n  n = n > 0 && n <= 20 ? n : 2;\r\n  s = parseFloat((s + \"\").replace(/[^\\d\\.-]/g, \"\")).toFixed(n) + \"\";\r\n  let l = s.split(\".\")[0].split(\"\").reverse(), r = s.split(\".\")[1];\r\n  let t = \"\";\r\n  for (let i = 0; i < l.length; i++) {\r\n  t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? \",\" : \"\");\r\n  }\r\n  return t.split(\"\").reverse().join(\"\") + \".\" + r;\r\n  }\r\n  \r\nconst column = [\r\n  {\r\n    title: \"序号\",\r\n    dataIndex: \"index\",\r\n    key: \"index\",\r\n    width: 100\r\n  },\r\n  {\r\n    title: \"订单编号\",\r\n    dataIndex: \"orderCode\",\r\n    key: \"orderCode\",\r\n    width: 150\r\n  },\r\n  {\r\n    title: \"金额\",\r\n    dataIndex: \"money\",\r\n    key: \"money\",\r\n    width: 160,\r\n    textAlign:'right',\r\n    sumCol: true,\r\n    render(text, record, index) {\r\n       let money = fmoney(text,2);\r\n       return (<span>{money}</span>)\r\n    }\r\n  },\r\n  {\r\n    title: \"类型\",\r\n    dataIndex: \"type_name\",\r\n    key: \"type_name\",\r\n    width: 100\r\n  },\r\n  {\r\n    title: \"采购组织\",\r\n    dataIndex: \"purchasing\",\r\n    key: \"purchasing\",\r\n    width: 150\r\n  },\r\n  {\r\n    title: \"采购组\",\r\n    dataIndex: \"purchasingGroup\",\r\n    key: \"purchasingGroup\",\r\n    width: 300\r\n  },\r\n  {\r\n    title: \"凭证日期\",\r\n    dataIndex: \"voucherDate\",\r\n    key: \"voucherDate\",\r\n    width: 150\r\n  },\r\n  {\r\n    title: \"审批状态\",\r\n    dataIndex: \"approvalState_name\",\r\n    key: \"approvalState_name\",\r\n    width: 150\r\n  },\r\n  {\r\n    title: \"确认状态\",\r\n    dataIndex: \"confirmState_name\",\r\n    key: \"confirmState_name\",\r\n    width: 500\r\n  },\r\n  {\r\n    title: \"关闭状态\",\r\n    dataIndex: \"closeState_name\",\r\n    key: \"closeState_name\",\r\n    width: 150\r\n  }\r\n];\r\nconst dataList = [\r\n  {\r\n    index: 1,\r\n    orderCode: \"2343\",\r\n    supplierName: \"xxx\",\r\n    type_name: \"123\",\r\n    purchasing: \"内行\",\r\n    purchasingGroup: \"323\",\r\n    voucherDate: \"kkkk\",\r\n    approvalState_name: \"vvvv\",\r\n    confirmState_name: \"aaaa\",\r\n    closeState_name: \"vnnnnn\",\r\n    money:'1232.56',\r\n    d: \"操作\",\r\n    key: \"1\"\r\n  },\r\n  {\r\n    index: 2,\r\n    _checked: true,\r\n    orderCode: \"222\",\r\n    supplierName: \"22xxx\",\r\n    type_name: \"1223\",\r\n    purchasing: \"内行2\",\r\n    purchasingGroup: \"3223\",\r\n    voucherDate: \"222kk\",\r\n    approvalState_name: \"22vvvv\",\r\n    confirmState_name: \"2aaaa\",\r\n    closeState_name: \"2vnnnnn\",\r\n    money:'2341232.56',\r\n    d: \"2操作\",\r\n    key: \"2\"\r\n  },\r\n  {\r\n    index: 3,\r\n    orderCode: \"222\",\r\n    supplierName: \"22xxx\",\r\n    _disabled: true,\r\n    type_name: \"1223\",\r\n    purchasing: \"内行2\",\r\n    purchasingGroup: \"3223\",\r\n    voucherDate: \"222kk\",\r\n    approvalState_name: \"22vvvv\",\r\n    confirmState_name: \"2aaaa\",\r\n    closeState_name: \"2vnnnnn\",\r\n    money:'122368732.56',\r\n    d: \"3操作\",\r\n    key: \"3\"\r\n  },\r\n  {\r\n    index: 4,\r\n    orderCode: \"222\",\r\n    supplierName: \"22xxx\",\r\n    type_name: \"1223\",\r\n    purchasing: \"内行2\",\r\n    purchasingGroup: \"3223\",\r\n    voucherDate: \"222kk\",\r\n    approvalState_name: \"22vvvv\",\r\n    confirmState_name: \"2aaaa\",\r\n    closeState_name: \"2vnnnnn\",\r\n    money:'18765232.56',\r\n    d: \"4操作\",\r\n    key: \"4\"\r\n  }\r\n];\r\n\r\nclass Demo7 extends Component {\r\n  constructor(props) {\r\n    super(props);\r\n  }\r\n  //临时加个判断\r\n  shouldComponentUpdate(){\r\n    if(this.props.className =='u-panel-title'){\r\n      return false;\r\n    }\r\n  }\r\n  getSelectedDataFunc = data => {\r\n    console.log(\"data\", data);\r\n  };\r\n\r\n  selectedRow = (record, index) => {};\r\n  /**\r\n   * 请求页面数据\r\n   */\r\n  freshata=()=>{\r\n\r\n  }\r\n  onDataNumSelect=()=>{\r\n    console.log('选择每页多少条的回调函数');\r\n  }\r\n  render() {\r\n    let paginationObj = {\r\n      items:10,//一页显示多少条\r\n      total:100,//总共多少条、\r\n      freshData:this.freshData,//点击下一页刷新的数据\r\n      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件\r\n      showJump:false,\r\n      noBorder:true\r\n    }\r\n    return (\r\n      <Grid\r\n        className=\"demo\"\r\n        columns={column}\r\n        data={dataList}\r\n        paginationObj={paginationObj}\r\n        canSum={true} \r\n        multiSelect={{ type:\"radio\" }}\r\n        getSelectedDataFunc={this.getSelectedDataFunc}\r\n      />\r\n    );\r\n  }\r\n}\r\n","desc":" 单选、分页、过滤功能、交换。设置 `multiSelect = {{ type:\"radio\" }}`，即可使用表格单选功能。"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
