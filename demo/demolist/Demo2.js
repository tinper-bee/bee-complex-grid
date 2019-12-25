/**
 *
 * @title 高级表格(排序)应用
 * @description 基础grid上添加排序、行过滤功能
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
      width: 200,
      sorter: (pre, after) => {return pre.a.localeCompare(after.a)} ,
      sorterClick:(data,type)=>{//排序的回调函数
        //type value is up or down
        console.log("data",data);
      },
      filterType: "text"
    },
    {
      title: "年龄",
      dataIndex: "c",
      key: "c",
      width: 200,
      sumCol: true,
      sorter: (pre, after) => {return pre.c - after.c},
      sorterClick:(data,type)=>{//排序的回调函数
        //type value is up or down
        console.log("data",data);
      },
      filterType: "number"
    },
    {
      title: "成绩",
      dataIndex: "e",
      key: "e",
      width: 200,
      sumCol: true,
      sorter: (pre, after) => {return pre.e - after.e},
      filterType: "text"
    },
    {
      title: "武功级别",
      dataIndex: "d",
      key: "d",
      width: 200,
      filterType: "text"
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

  getSelectedDataFunc = (selectedList,record,index,newData) => {
    console.log("data", newData);
  };

  getCloumnsScroll = columns => {
    let sum = 0;
    columns.forEach(da => {
      sum += da.width;
    });
    console.log("sum", sum);
    return sum;
  };
  /**
   * 请求页面数据
   */
  freshData = (pageIndex) => {
    console.log('跳转至第 ', pageIndex, ' 页');
  }
  /**
   * 后端获取数据
   */
  sortFun = (sortParam)=>{
    console.info(sortParam);
    //将参数传递给后端排序
  }
  render() {
    let paginationObj = {
      items:10,//总页数
      freshData:this.freshData,
      noBorder:true,
      horizontalPosition: 'center'
    }
    let sortObj = {
        mode:'multiple',
        // backSource:true,
        sortFun:this.sortFun
    }
    
    return (
      <div>
         <Grid
          className="demo"
          columns={column}
          data={dataList}
          // multiSelect={false}
          getSelectedDataFunc={this.getSelectedDataFunc}
          selectedRow={this.selectedRow}
          sort={sortObj}
          sortFun={this.sortFun}
          paginationObj={paginationObj}
          showFilterMenu
        />
      </div>
     
    );
  }
}
export default Demo2;