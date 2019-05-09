/**
 * @title 高级表格的基础应用(基本示例3)
 * @description 全选、分页、过滤。功能、交换
 *
 */
import React, { Component } from "react";
import Button from 'bee-button';
import Grid from "../../src";
const columns = [
    {
        title:'序号',
        dataIndex:'index',
        width:'80',
        render:(text,record,index)=>{
            return index
        },
        fixed:'left'
    },
    {
    title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName",
  },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 80},
  { title: "年龄", dataIndex: "c", key: "c", width: 200 }
];

const data = [ ...new Array(10000) ].map((e, i) => {
    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
    if(i%3==0){
        rs.b = '女';
    }
    return rs;
   })

class Demo4 extends Component {
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
  freshata = () => {

  }
  onDataNumSelect = () => {
    console.log('选择每页多少条的回调函数');
  }
  onRowHover = (index,record) => {
    this.currentIndex = index;
    this.currentRecord = record;
  }
  handleClick = () => {
    alert('这是第' + this.currentIndex + '列，用户名为:' + this.currentRecord.a);
  }

  getHoverContent=()=>{
    return <div className="opt-btns"><Button size="sm" onClick={this.handleClick}>一些操作</Button> </div>
  }
  render() {
    let paginationObj = {
      items:10,//一页显示多少条
      total:100,//总共多少条
      freshData:this.freshData,//点击下一页刷新的数据
      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
      noBorder:true
    }
    return (
      <Grid
        className="demo"
        columns={columns}
        data={data}
        getSelectedDataFunc={this.getSelectedDataFunc}
        paginationObj={paginationObj}
        loadLazy={true}
        heigth={40}
        scroll = {{y:300}}
        hoverContent={this.getHoverContent}
        onRowHover={this.onRowHover}
      />
    );
  }
}
export default Demo4;