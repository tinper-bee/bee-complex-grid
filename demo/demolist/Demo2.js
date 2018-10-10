/**
 *
 * @title 排序的grid
 * @description 基础grid上添加排序功能
 *
 */
import React, { Component } from "react";
import Grid from "../../src";
const column = [
    {
      title: "名字",
      dataIndex: "a",
      key: "a",
      className:'dfasd',
      width: 200
    },
    {
      title: "功力指数",
      dataIndex: "b",
      key: "b",
      width: 200,
      sumCol: true,
      order:'ascend',
      sorter: (a, b) => a.c - b.c,
      sorterClick:(data,type)=>{//排序的回调函数
        //type value is up or down
        console.log("data",data);
      }
    },
    {
      title: "年龄",
      dataIndex: "c",
      key: "c",
      width: 200,
      sumCol: true,
      sorter: (a, b) => a.c - b.c,
      sorterClick:(data,type)=>{//排序的回调函数
        //type value is up or down
        console.log("data",data);
      }
    },
    {
      title: "成绩",
      dataIndex: "e",
      key: "e",
      width: 200,
      sumCol: true,
      sorter: (a, b) => a.c - b.c,
    },
    {
      title: "武功级别",
      dataIndex: "d",
      key: "d",
      width: 200
    }
  ];
  const dataList = [
    { a: "杨过", b: 675, c: 30, d: "内行",e:100, key: "2" },
    { a: "令狐冲", b: 43, c: 41, d: "大侠",e:90, key: "1" },
    { a: "令狐冲1", b: 43, c: 81, d: "大侠", e:120,key: "4" },
    { a: "令狐冲2", b: 43, c: 81, d: "大侠", e:130,key: "5" },
    { a: "郭靖", b: 153, c: 25, d: "大侠",e:90, key: "3" }
  ];

class Demo2 extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps){
    debugger
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
  render() {
    let paginationObj = {
      activePage: 1,//当前页
      total:100,//总条数
      freshData:this.freshData
    }
    let sortObj = {
        mode:'multiple'
      }
    return (
      <Grid
        className='gridDemo'
        columns={column}
        data={dataList}
        getSelectedDataFunc={this.getSelectedDataFunc}
        selectedRow={this.selectedRow}
        sort={sortObj}
        paginationObj={paginationObj}
      />
    );
  }
}
export default Demo2;
