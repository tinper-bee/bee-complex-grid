import React, { Component } from "react";
import PropTypes from "prop-types";
const propTypes = {};
const defaultProps = {
  scroll: {
    y: true
  },
  bordered: true,
  multiSelect:{type: "checkbox" }
};
import Table from "bee-table";
import multiSelect from "bee-table/build/lib/multiSelect";
import filterColumn from "bee-table/build/lib/filterColumn";
import dragColumn from "bee-table/build/lib/dragColumn";
// import sum from "bee-table/build/lib/sum";
import sort from "bee-table/build/lib/sort";
import Icon from "bee-icon";
import Checkbox from "bee-checkbox";
import Popover from "bee-popover";
import Pagination from "bee-pagination";
// const ComplexTable = filterColumn(
//   dragColumn(multiSelect(sum(sort(Table, Icon)), Checkbox)),
//   Popover
// );
const ComplexTable = filterColumn(
    dragColumn(multiSelect(sort(Table, Icon), Checkbox)),
    Popover
  );
class Grid extends Component {
  constructor(props) {
    super(props);
    let { paginationObj = {} } = props;
    this.state = {
      activePage: paginationObj.activePage ? paginationObj.activePage : 1,
      total: paginationObj.total ? paginationObj.total : 1
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.paginationObj) {
      this.setState({
        activePage: nextProps.paginationObj.activePage
          ? nextProps.paginationObj.activePage
          : 1,
        total: nextProps.paginationObj.total ? nextProps.paginationObj.total : 1
      });
    }
  }
  /**
   * 点击分页
   */
  handleSelectPage = eventKey => {
    let { paginationObj = {} } = this.props;
    this.setState({
      activePage: eventKey
    });
    paginationObj.freshData && paginationObj.freshData(eventKey);
  };
  render() {
    const props = this.props;
    //默认固定表头
    // let scroll = Object.assign({y:true},props.scroll);
    let multiSelectObj={ type: "checkbox" }
    return (
      <div className={`${props.className} u-grid`}>
        <ComplexTable {...props}  />
        <Pagination
          first
          last
          prev
          next
          maxButtons={5}
          boundaryLinks
          activePage={this.state.activePage}
          onSelect={this.handleSelectPage}
          showJump={true}
         
          total={this.state.total}
          dataNum={2}
        />
      </div>
    );
  }
}
Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;
export default Grid;
