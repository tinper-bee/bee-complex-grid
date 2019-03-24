import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu from "bee-menus";
import Dropdown from "bee-dropdown";
import Icon from "bee-icon";

const { Item } = Menu;

class ColumnsDropdown extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:props.showMenuKey == props.originColumn.key?true:false
    }

  }
  componentWillReceiveProps(nextProps){
    // let {visible} = this.state;
    // if(nextProps.showMenuKey !== this.props.originColumn.key && visible){
    //   this.setState({
    //     visible:false
    //   })
    // }
  }

  onMenuSelect = selectObj => {
    this.props.onMenuSelect(selectObj);
  };

  onVisibleChange = (visiblePar) => {
    const {visible}= this.state;
    this.setState({
      visible:!visible
    })
  }

  hideMenu =(event)=>{
    console.log(event.target,event.relatedTarget,event.currentTarget,event.relatedTarget.classList);
    if(this.state.visible !== false  && !event.relatedTarget.classList.contains('u-dropdown')){
      this.setState({
        visible: false
      })
    }
   
  }

  render() {
    let { originColumn, local ,showFilterMenu,allColumns,columnFilterAble,filterable} = this.props;
    const {visible} = this.state;
    const icon = "uf-arrow-down";
    let noFixedCount =0;//非固定列个数
    allColumns.forEach(item => {
      if(!item.fixed){
        noFixedCount = noFixedCount + 1;
      }
    });
    let menuInfo = [],
      fixTitle = local["fixTitle"],
      showTitle = local["hideTitle"];
    if (originColumn.fixed) {
      fixTitle = local["noFixTitle"];
    }
    menuInfo.push({
      info: fixTitle,
      key: `fix`,
      fieldKey: originColumn.key,
      disabled:noFixedCount<2 && !originColumn.fixed,
      index: 0
    });
    //非固定列添加是否显示菜单item
    if (!originColumn.fixed && columnFilterAble) {
      menuInfo.push({
        info: showTitle,
        key: `show`,
        fieldKey: originColumn.key,
        checked: originColumn.checked,
        index: 1
      });
    }
    //是否行过滤菜单item
    if (showFilterMenu) {
      let title= filterable?local["closeRowFilter"]:local["openRowFilter"];

      menuInfo.push({
        info: title,
        key: "rowFilter",
        fieldKey: originColumn.key,
        index: 3
      });
    }
    let menu = (
      <Menu
        onSelect={this.onMenuSelect}
        selectedKeys={[]}
        data-type="menu11"
        className="grid-menu"
      >
        {menuInfo.map(da => {
          return (
            <Item key={da.key} index={da.index} data={da} disabled={da.disabled}>
              {da.info}
            </Item>
          );
        })}
      </Menu>
    );
    let className = originColumn.sorter ? "cansort title-con drop-menu":"title-con drop-menu"; 

    
    return (
      <span data-type='menu' className={className} >
        <span className='drop-menu-title'>{originColumn.title}</span>
        <Dropdown
          trigger={["click"]}
          // onVisibleChange={this.onVisibleChange}
          // visible={visible}
          overlay={menu}
          animation="slide-up"
          data-type="menu11"
          rootClose={true}
        >
          <Icon type={icon} data-key={originColumn.key} data-role="menuBtn"/>
        </Dropdown>
      </span>
    );
  }
}
export default ColumnsDropdown;
