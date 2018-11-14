import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Table from "bee-table";
import multiSelect from "bee-table/build/lib/newMultiSelect";
import filterColumn from "bee-table/build/lib/filterColumn";
import dragColumn from "bee-table/build/lib/dragColumn";
import sort from "bee-table/build/lib/sort";
import sum from "bee-table/build/lib/sum";
import Icon from "bee-icon";
import Checkbox from "bee-checkbox";
import Popover from "bee-popover";
import Pagination from "bee-pagination";
import Menu from "bee-menus";
import Dropdown from "bee-dropdown";
import ExportJsonExcel from "./ExportExcel";

import i18n from './i18n';
import {getComponentLocale} from 'bee-locale/build/tool';

const propTypes = {
  showHeaderMenu: PropTypes.bool,
  sheetName:PropTypes.string,
  sheetIsRowFilter:PropTypes.bool
};
const defaultProps = {
  scroll: {
    y: true
  },
  bordered: true,
  multiSelect: { type: "checkbox" },
  showHeaderMenu: false,
  data: [],
  locale: {},
  paginationObj:{},
  sheetName:"sheet", //导出表格的name
  sheetIsRowFilter:false //是否要设置行样式，是否遍历
};
const { Item } = Menu;

let ComplexTable = Table;
const defualtPaginationParam = {dataNumSelect : ['5','10','15','20','25','50','All']};
class Grid extends Component {
  constructor(props) {
    super(props);
    this.local = getComponentLocale(this.props, this.context, 'Grid', () => i18n);
    let { paginationObj,sort: sortObj, filterable } = props;
    //一些属性需要内部控制，放在state中
    this.state = {
      filterable,
      renderFlag:false,//这个只是一个标记量，用于控制组件是否需要渲染
      activePage: paginationObj.activePage,
      total: paginationObj.total,
      pageItems: paginationObj.items,
      dataNum: paginationObj.dataNum,
      // columns: props.columns.slice()
    };
    //后端回调方法，用户的sortFun和Grid的有时有冲突，所以重新定义了一个sort，传给Table
    if (sortObj) {
      sortObj.originSortFun = sortObj.originSortFun
        ? sortObj.originSortFun
        : sortObj.sortFun;
      sortObj.sortFun = this.sortFun;
      this.sort = sortObj;
    }
    //根据条件生成Grid
    ComplexTable = sort(Table, Icon);
    if (props.canSum) {
      ComplexTable = sum(ComplexTable);
    }
    if (props.multiSelect !== false) {
      ComplexTable = multiSelect(ComplexTable, Checkbox);
    }
    ComplexTable = filterColumn(dragColumn(ComplexTable), Popover);
  }
  columns = this.props.columns.slice();
  componentWillReceiveProps(nextProps) {
    const {renderFlag} = this.state;
    //分页
    if (nextProps.paginationObj) {
      this.setState({
        activePage: nextProps.paginationObj.activePage,
        total: nextProps.paginationObj.total,
        pageItems: nextProps.paginationObj.items,
        dataNum: nextProps.paginationObj.dataNum
      });
    }
    if (nextProps.columns && nextProps.columns !== this.columns) {
      let newColumns = [],leftColumns=[],rightColumns=[],centerColumns=[];
      if (nextProps.noReplaceColumns) {
        newColumns = nextProps.columns.slice();
      } else {
        //先检查nextProps.columns的顺序与this.columns的顺序是否一致，不一致按照this.columns的顺序调整，（主要交换列时当前column会保存列的顺序，而props的顺序还是之前的）
        this.columns.forEach((item,index)=>{
        
          if(nextProps.columns[index].dataIndex !== item.dataIndex ){
              let curIndex = -1;
              for(let nextIndex=0;nextIndex<nextProps.columns.length;nextIndex++){
                if(nextProps.columns[nextIndex].dataIndex == item.dataIndex){
                  curIndex = nextIndex;
                  break; 
                }
              }
              nextProps.columns.splice(index, 0,nextProps.columns.splice(curIndex, 1)[0] )
          }
        })
        //将sort、过滤等在组件中维护的状态和传入column合并

        nextProps.columns.forEach((nextItem, index) => {
          let newItem = {};

          this.columns.forEach(item=>{
            if(nextItem.dataIndex == item.dataIndex){
              newItem = { ...item, ...nextItem };
              newItem.hasHeaderMenu = false;//重置后的都需要重新渲染表头菜单
            }
          })
          if(newItem.fixed == 'left'){
            leftColumns.push(newItem);
          }else if(newItem.fixed == 'right'){
            rightColumns.push(newItem);
          }else{
            centerColumns.push(newItem);
          }
        });
        newColumns = [...leftColumns,...centerColumns,...rightColumns];
      }

      this.columns = newColumns,
      this.setState({
        renderFlag: !renderFlag,
        filterable: nextProps.filterable
      });

    }
  }
  /**
   * 点击分页回调函数
   */
  handleSelectPage = eventKey => {
    let { paginationObj = {} } = this.props;
    this.setState({
      activePage: eventKey
    });
    paginationObj.freshData && paginationObj.freshData(eventKey);
  };

  /**
   * 设置相关固定Cols
   */
  optFixCols = (columns, key) => {
    let fixedLeftCols = [];
    let fixedRightCols = [];
    let nonColums = [];

    columns.find(da => {
      if (da.key == key) {
        da.fixed ? delete da.fixed : (da.fixed = "left");
      }
      if (da.fixed == "left") {
        fixedLeftCols.push(da);
      } else if (da.fixed == "right") {
        fixedRightCols.push(da);
      } else {
        nonColums.push(da);
      }
    });

    columns = [...fixedLeftCols, ...nonColums, ...fixedRightCols];
    return columns;
  };
  /**
   * 设置隐藏显示Cols
   */
  optShowCols = (columns, key) => {
    columns.forEach((item, index) => {
      if (item.key == key) {
        item.ifshow = false;
        return;
      }
    });
    return columns;
  };

  /**
   * header菜单点击操作
   */
  onMenuSelect = ({ key, item }) => {
    let { filterable, renderFlag} = this.state;
    
    const fieldKey = item.props.data.fieldKey;
    if (key == "fix") {
      this.columns = this.optFixCols(this.columns, fieldKey);
      // this.setState({
      //   columns
      // });
      this.setState({
        renderFlag: !renderFlag
      });
    } else if (key == "show") {
      this.columns = this.optShowCols(this.columns, fieldKey);
      this.setState({
        renderFlag: !renderFlag
      });
    } else {
      if(typeof this.props.afterRowFilter == 'function'){
        this.props.afterRowFilter(!filterable);
      }
      this.setState({ filterable: !filterable });
    }
  };

  /**
   * 渲染表头下拉菜单（过滤、隐藏）
   * @param {Array} columns 表格列数组
   */
  renderColumnsDropdown(columns) {
    const icon = "uf-arrow-down";
    const {local} = this;
    return columns.map((originColumn, index) => {
      let column = Object.assign({}, originColumn);
      let menuInfo = [],
        fixTitle =  local['fixTitle'],
        showTitle = local['hideTitle'];
      if (originColumn.fixed) {
        fixTitle = local['noFixTitle'];
      }
      menuInfo.push({
        info: fixTitle,
        key: `fix`,
        fieldKey: originColumn.key,
        index: 0
      });
      //非固定列添加是否显示菜单item
      if (!originColumn.fixed) {
        menuInfo.push({
          info: showTitle,
          key: `show`,
          fieldKey: originColumn.key,
          index: 1
        });
      }
      //是否行过滤菜单item
      if (this.props.showFilterMenu) {
        menuInfo.push({
          info: local['rowFilter'],
          key: "rowFilter",
          fieldKey: originColumn.key,
          index: 3
        });
      }
      const menu = (
        <Menu onSelect={this.onMenuSelect} selectedKeys={[]}>
          {menuInfo.map(da => {
            return (
              <Item key={da.key} index={da.index} data={da}>
                {da.info}
              </Item>
            );
          })}
        </Menu>
      );
      column.hasHeaderMenu = true;
      column.title = (
        <span className="title-con drop-menu">
          {column.title}
          <Dropdown trigger={["click"]} overlay={menu} animation="slide-up">
            <Icon type={icon} />
          </Dropdown>
        </span>
      );
      return column;
    });
  }

  /**
   * 表头menu和表格整体过滤时有冲突，因此添加了回调函数
   */
  afterFilter = (optData, columns) => {
    if(Array.isArray(optData)){
      this.columns.forEach(da => {
        optData.forEach(optItem=>{
          if(da.key == optItem.key){
            da.ifshow = optItem.ifshow;
            return true;
          }
        })
      });
    }else{
      this.columns.find(da => {
        if (da.key == optData.key) {
          da.ifshow = optData.ifshow;
        }
      });
    }
    
    if (typeof this.props.afterFilter == "function") {
      this.props.afterFilter(optData, this.columns);
    }
  };

  /**
   * 后端获取数据
   */
  sortFun = sortParam => {
    let sortObj = {};
    sortParam.forEach(item => {
      sortObj[item.field] = item;
    });
    ;
    this.columns.forEach(da => {
      //保存返回的column状态，没有则终止order状态
      if (sortObj[da.dataIndex]) {
        da = Object.assign(da, sortObj[da.dataIndex]);
      } else {
        da.order = "flatscend";
        da.orderNum = "";
      }
    });
    
    //将参数传递给后端排序
    if (typeof this.sort.originSortFun == "function") {
      this.sort.originSortFun(sortParam, this.columns);
    }
  };
  /**
   *拖拽交互列后记录下当前columns
   */
  dragDrop = (event, data, columns) => {
    // this.setState({
    //   columns: columns
    // });

    columns.forEach((item,index)=>{
      if(this.columns[index].dataIndex !== item.dataIndex ){
          let curIndex = -1;
          for(let nextIndex=0;nextIndex<this.columns.length;nextIndex++){
            if(this.columns[nextIndex].dataIndex == item.dataIndex){
              curIndex = nextIndex;
              break; 
            }
          }
          this.columns.splice(index, 0,this.columns.splice(curIndex, 1)[0] )
      }
    })
    if (this.props.onDrop) {
      this.props.onDrop(event, data, this.columns);
    }
  };

  /**
   * 获取所有列以及table属性值
   */
  getColumnsAndTablePros = () => {
    const originColumns = this.props.columns;
    const columns = this.columns.slice();
    // //修改模板的title
    // columns.forEach(item=>{
    //   originColumns.some(originItem=>{
    //     if(originItem.dataIndex == item.dataIndex){
    //       item.title = originItem.title;
    //       return true;
    //     }
    //   })
    // })
    if (this.dragColsData) {
      const dragColsKeyArr = Object.keys(this.dragColsData);
      dragColsKeyArr.some(itemKey => {
        columns.forEach(col => {
          if (col.dataIndex == itemKey) {
            col.width = this.dragColsData[itemKey].width;
            return true;
          }
        });
      });
    }
    const rs = {
      columns: columns,
      tablePros: this.props
    };
    return rs;
  };

  getItem = (da)=>{
      let obj = {};
      da.height?obj.hpx = da.height:"";
      da.ifshow?obj.hidden = true:false;
      da.level?obj.level = da.level:"";
      return obj;
      // if(da.height || da.hidden || da.level){
      //   return obj;
      // }else{
      //   return null;
      // }
  }

  getRowList = (data)=>{
    let rowAttr = [];
    debugger;
    data.forEach(da=>{
      let item = this.getItem(da);
      if(item){
        rowAttr.push(item);
      }
    });
    return rowAttr;
  }

  exportExcel = () => {
    let {sheetIsRowFilter,sheetName,sheetHeader:_sheetHeader} = this.props;
    let colsAndTablePros = this.getColumnsAndTablePros();
    let sheetHeader = [],columnAttr = [],rowAttr =[],sheetFilter = [];
    colsAndTablePros.columns.forEach(column=>{
      sheetHeader.push(column.title);
      columnAttr.push({wpx:column.width,hidden:column.ifshow === false?true:false});
      sheetFilter.push(column.dataIndex);
    });
    if(_sheetHeader){
      rowAttr.push(this.getItem(_sheetHeader));
    }
    if(sheetIsRowFilter){
      this.getRowList(colsAndTablePros.tablePros.data);
    }
    let option = {
      datas:[
        {
          sheetData:this.props.data,
          sheetName,
          sheetFilter,
          sheetHeader,
          columnAttr,
          rowAttr
        }
      ]
    };
    let toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }

  /**
   * 拖拽后计算列宽
   */
  afterDragColWidth = colData => {
 
    const {renderFlag} = this.state
    this.columns.find(col=>{
      if (col.dataIndex == colData.dataindex) {
        col.width = colData.width;
      }
    })
    this.setState({
      renderFlag:!renderFlag
    });
  };

  render() {
    const props = this.props;
    let { sort = {}, paginationObj } = props;
    const paginationParam = Object.assign({},defualtPaginationParam, paginationObj);
    //默认固定表头
    const scroll = Object.assign({},{y:true},props.scroll);
    delete paginationParam.freshData;

    const {filterable} = this.state;
    let columns = this.columns.slice();
    //是否显示表头菜单、已经显示过的不再显示
    if (props.showHeaderMenu) {
      columns = this.renderColumnsDropdown(columns);
    }

    return (
      <div className={classNames("u-grid", props.className)}>
        <Pagination
          {...paginationParam}
          first
          last
          prev
          next
          maxButtons={5}
          boundaryLinks
          activePage={this.state.activePage}
          onSelect={this.handleSelectPage}
          showJump={true}
          items={this.state.pageItems}
          total={this.state.total}
        />
        <ComplexTable
          headerScroll={true}
          {...props}
          scroll = {scroll}
          columns={columns}
          afterFilter={this.afterFilter}
          sort={this.sort}
          onDrop={this.dragDrop}
          afterDragColWidth={this.afterDragColWidth}
          filterable={filterable}
        />
      </div>
    );
  }
}
Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;
export default Grid;
