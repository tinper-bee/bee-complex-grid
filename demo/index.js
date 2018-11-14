
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '../src';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo2 />,"title":" 排序的grid","code":"/**\n *\n * @title 排序的grid\n * @description 基础grid上添加排序功能\n *\n */\nimport React, { Component } from \"react\";\nimport { Grid } from 'tinper-bee';\nconst column = [\n    {\n      title: \"名字\",\n      dataIndex: \"a\",\n      key: \"a\",\n      className:'dfasd',\n      width: 200\n    },\n    {\n      title: \"功力指数\",\n      dataIndex: \"b\",\n      key: \"b\",\n      width: 200,\n      sumCol: true,\n      order:'ascend',\n      sorter: (a, b) => a.c - b.c,\n      sorterClick:(data,type)=>{//排序的回调函数\n        //type value is up or down\n        console.log(\"data\",data);\n      }\n    },\n    {\n      title: \"年龄\",\n      dataIndex: \"c\",\n      key: \"c\",\n      width: 200,\n      sumCol: true,\n      sorter: (a, b) => a.c - b.c,\n      sorterClick:(data,type)=>{//排序的回调函数\n        //type value is up or down\n        console.log(\"data\",data);\n      }\n    },\n    {\n      title: \"成绩\",\n      dataIndex: \"e\",\n      key: \"e\",\n      width: 200,\n      sumCol: true,\n      sorter: (a, b) => a.c - b.c,\n    },\n    {\n      title: \"武功级别\",\n      dataIndex: \"d\",\n      key: \"d\",\n      width: 200\n    }\n  ];\n  const dataList = [\n    { a: \"杨过\", b: 675, c: 30, d: \"内行\",e:100, key: \"2\" },\n    { a: \"令狐冲\", b: 43, c: 41, d: \"大侠\",e:90, key: \"1\" },\n    { a: \"令狐冲1\", b: 43, c: 81, d: \"大侠\", e:120,key: \"4\" },\n    { a: \"令狐冲2\", b: 43, c: 81, d: \"大侠\", e:130,key: \"5\" },\n    { a: \"郭靖\", b: 153, c: 25, d: \"大侠\",e:90, key: \"3\" }\n  ];\n\nclass Demo2 extends Component {\n  constructor(props) {\n    super(props);\n  }\n\n  //临时加个判断\n  shouldComponentUpdate(){\n    if(this.props.className =='u-panel-title'){\n      return false;\n    }\n  }\n  getSelectedDataFunc = data => {\n    console.log(\"data\", data);\n  };\n\n  getCloumnsScroll = columns => {\n    let sum = 0;\n    columns.forEach(da => {\n      sum += da.width;\n    });\n    console.log(\"sum\", sum);\n    return sum;\n  };\n\n  selectedRow = (record, index) => {};\n  /**\n   * 请求页面数据\n   */\n  freshData=()=>{\n\n  }\n  /**\n   * 后端获取数据\n   */\n  sortFun = (sortParam)=>{\n    console.info(sortParam);\n    //将参数传递给后端排序\n  }\n  render() {\n    let paginationObj = {\n      activePage: 1,//当前页\n      items:10,//总页数\n      freshData:this.freshData\n    }\n    let sortObj = {\n        mode:'multiple',\n        backSource:true,\n        sortFun:this.sortFun\n      }\n    return (\n      <Grid\n        className='gridDemo'\n        columns={column}\n        data={dataList}\n        draggable={true}\n        getSelectedDataFunc={this.getSelectedDataFunc}\n        selectedRow={this.selectedRow}\n        sort={sortObj}\n        sortFun={this.sortFun}\n        paginationObj={paginationObj}\n      />\n    );\n  }\n}\n\n","desc":" 基础grid上添加排序功能"}]


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
