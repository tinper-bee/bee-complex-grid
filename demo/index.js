
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '../src';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 基础grid","code":"/**\n *\n * @title 基础grid\n * @description 全选、分页、过滤功能、交换\n *\n */\nimport React, { Component } from \"react\";\nimport { Grid } from 'tinper-bee';\nconst column = [\n  {\n    title: \"序号\",\n    dataIndex: \"index\",\n    key: \"index\",\n    width: 100\n  },\n  {\n    title: \"订单编号\",\n    dataIndex: \"orderCode\",\n    key: \"orderCode\",\n    width: 100\n  },\n  {\n    title: \"供应商名称\",\n    dataIndex: \"supplierName\",\n    key: \"supplierName\",\n    width: 100\n  },\n  {\n    title: \"类型\",\n    dataIndex: \"type_name\",\n    key: \"type_name\",\n    width: 100\n  },\n  {\n    title: \"采购组织\",\n    dataIndex: \"purchasing\",\n    key: \"purchasing\",\n    width: 100\n  },\n  {\n    title: \"采购组\",\n    dataIndex: \"purchasingGroup\",\n    key: \"purchasingGroup\",\n    width: 300\n  },\n  {\n    title: \"凭证日期\",\n    dataIndex: \"voucherDate\",\n    key: \"voucherDate\",\n    width: 100\n  },\n  {\n    title: \"审批状态\",\n    dataIndex: \"approvalState_name\",\n    key: \"approvalState_name\",\n    width: 100\n  },\n  {\n    title: \"确认状态\",\n    dataIndex: \"confirmState_name\",\n    key: \"confirmState_name\",\n    width: 500\n  },\n  {\n    title: \"关闭状态\",\n    dataIndex: \"closeState_name\",\n    key: \"closeState_name\",\n    width: 100\n  },\n  {\n    title: \"操作\",\n    dataIndex: \"d\",\n    key: \"d\",\n    width: 100,\n    fixed: \"right\",\n    render(text, record, index) {\n      return (\n        <div className=\"operation-btn\">\n          <a\n            href=\"#\"\n            tooltip={text}\n            onClick={() => {\n              alert(\"这是第\" + index + \"列，内容为:\" + text);\n            }}\n          >\n            一些操作\n          </a>\n        </div>\n      );\n    }\n  }\n];\nconst dataList = [\n  {\n    index: 1,\n    orderCode: \"2343\",\n    supplierName: \"xxx\",\n    type_name: \"123\",\n    purchasing: \"内行\",\n    purchasingGroup: \"323\",\n    voucherDate: \"kkkk\",\n    approvalState_name: \"vvvv\",\n    confirmState_name: \"aaaa\",\n    closeState_name: \"vnnnnn\",\n    d: \"操作\",\n    key: \"1\"\n  },\n  {\n    index: 2,\n    _checked: true,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    d: \"2操作\",\n    key: \"2\"\n  },\n  {\n    index: 3,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    _disabled: true,\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    d: \"3操作\",\n    key: \"3\"\n  },\n  {\n    index: 4,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    d: \"4操作\",\n    key: \"4\"\n  }\n];\n\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n  }\n  componentWillReceiveProps(nextProps){\n    debugger\n  }\n  //临时加个判断\n  shouldComponentUpdate(){\n    if(this.props.className =='u-panel-title'){\n      return false;\n    }\n  }\n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  getCloumnsScroll = columns => {\n    let sum = 0;\n    columns.forEach(da => {\n      sum += da.width;\n    });\n    console.log(\"sum\", sum);\n    return sum;\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshData=()=>{\n\n  }\n  render() {\n    let paginationObj = {\n      activePage: 1,//当前页\n      total:100,//总条数\n      freshData:this.freshData\n    }\n    return (\n      <Grid\n        className='gridDemo'\n        columns={column}\n        data={dataList}\n        getSelectedDataFunc={this.getSelectedDataFunc}\n        checkMinSize={7}\n        draggable={true}\n        multiSelect={{ type: \"checkbox\" }}\n        scroll={{ x: \"130%\", y: 100 }}\n        selectedRow={this.selectedRow}\n        paginationObj={paginationObj}\n      />\n    );\n  }\n}\n\n","desc":" 全选、分页、过滤功能、交换"},{"example":<Demo2 />,"title":" 排序的grid","code":"/**\n *\n * @title 排序的grid\n * @description 基础grid上添加排序功能\n *\n */\nimport React, { Component } from \"react\";\nimport { Grid } from 'tinper-bee';\nconst column = [\n    {\n      title: \"名字\",\n      dataIndex: \"a\",\n      key: \"a\",\n      className:'dfasd',\n      width: 200\n    },\n    {\n      title: \"功力指数\",\n      dataIndex: \"b\",\n      key: \"b\",\n      width: 200,\n      sumCol: true,\n      order:'ascend',\n      sorter: (a, b) => a.c - b.c,\n      sorterClick:(data,type)=>{//排序的回调函数\n        //type value is up or down\n        console.log(\"data\",data);\n      }\n    },\n    {\n      title: \"年龄\",\n      dataIndex: \"c\",\n      key: \"c\",\n      width: 200,\n      sumCol: true,\n      sorter: (a, b) => a.c - b.c,\n      sorterClick:(data,type)=>{//排序的回调函数\n        //type value is up or down\n        console.log(\"data\",data);\n      }\n    },\n    {\n      title: \"成绩\",\n      dataIndex: \"e\",\n      key: \"e\",\n      width: 200,\n      sumCol: true,\n      sorter: (a, b) => a.c - b.c,\n    },\n    {\n      title: \"武功级别\",\n      dataIndex: \"d\",\n      key: \"d\",\n      width: 200\n    }\n  ];\n  const dataList = [\n    { a: \"杨过\", b: 675, c: 30, d: \"内行\",e:100, key: \"2\" },\n    { a: \"令狐冲\", b: 43, c: 41, d: \"大侠\",e:90, key: \"1\" },\n    { a: \"令狐冲1\", b: 43, c: 81, d: \"大侠\", e:120,key: \"4\" },\n    { a: \"令狐冲2\", b: 43, c: 81, d: \"大侠\", e:130,key: \"5\" },\n    { a: \"郭靖\", b: 153, c: 25, d: \"大侠\",e:90, key: \"3\" }\n  ];\n\nclass Demo2 extends Component {\n  constructor(props) {\n    super(props);\n  }\n  componentWillReceiveProps(nextProps){\n    debugger\n  }\n  //临时加个判断\n  shouldComponentUpdate(){\n    if(this.props.className =='u-panel-title'){\n      return false;\n    }\n  }\n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  getCloumnsScroll = columns => {\n    let sum = 0;\n    columns.forEach(da => {\n      sum += da.width;\n    });\n    console.log(\"sum\", sum);\n    return sum;\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshData=()=>{\n\n  }\n  render() {\n    let paginationObj = {\n      activePage: 1,//当前页\n      total:100,//总条数\n      freshData:this.freshData\n    }\n    let sortObj = {\n        mode:'multiple'\n      }\n    return (\n      <Grid\n        className='gridDemo'\n        columns={column}\n        data={dataList}\n        getSelectedDataFunc={this.getSelectedDataFunc}\n        selectedRow={this.selectedRow}\n        sort={sortObj}\n        paginationObj={paginationObj}\n      />\n    );\n  }\n}\n\n","desc":" 基础grid上添加排序功能"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
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
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
