"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ExportExcel = require("./ExportExcel");

var _ExportExcel2 = _interopRequireDefault(_ExportExcel);

var _ColumnsDropdown = require("./ColumnsDropdown");

var _ColumnsDropdown2 = _interopRequireDefault(_ColumnsDropdown);

var _beeTable = require("bee-table");

var _beeTable2 = _interopRequireDefault(_beeTable);

var _multiSelect = require("bee-table/build/lib/multiSelect");

var _multiSelect2 = _interopRequireDefault(_multiSelect);

var _filterColumn = require("bee-table/build/lib/filterColumn");

var _filterColumn2 = _interopRequireDefault(_filterColumn);

var _dragColumn = require("bee-table/build/lib/dragColumn");

var _dragColumn2 = _interopRequireDefault(_dragColumn);

var _sort = require("bee-table/build/lib/sort");

var _sort2 = _interopRequireDefault(_sort);

var _sum = require("bee-table/build/lib/sum");

var _sum2 = _interopRequireDefault(_sum);

var _bigData = require("bee-table/build/lib/bigData");

var _bigData2 = _interopRequireDefault(_bigData);

var _singleSelect = require("bee-table/build/lib/singleSelect");

var _singleSelect2 = _interopRequireDefault(_singleSelect);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeCheckbox = require("bee-checkbox");

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _beePopover = require("bee-popover");

var _beePopover2 = _interopRequireDefault(_beePopover);

var _beePagination = require("bee-pagination");

var _beePagination2 = _interopRequireDefault(_beePagination);

var _beeRadio = require("bee-radio");

var _beeRadio2 = _interopRequireDefault(_beeRadio);

var _i18n = require("./i18n");

var _i18n2 = _interopRequireDefault(_i18n);

var _tool = require("bee-locale/build/tool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  showHeaderMenu: _propTypes2["default"].bool,
  sheetName: _propTypes2["default"].string,
  sheetIsRowFilter: _propTypes2["default"].bool,
  exportData: _propTypes2["default"].array
};
var defaultProps = {
  scroll: {
    y: true
  },
  bordered: true,
  multiSelect: { type: "checkbox" },
  draggable: true,
  dragborder: true,
  showHeaderMenu: true,
  data: [],
  exportData: [],
  locale: {},
  paginationObj: {},
  sheetName: "sheet", //导出表格的name
  sheetIsRowFilter: false, //是否要设置行样式，是否遍历
  columnFilterAble: true
};

// let ComplexTable = Table;
var defualtPaginationParam = { horizontalPosition: "left", verticalPosition: 'bottom', showJump: true, first: true, prev: true, last: true, next: true, maxButtons: 5 };

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var ComplexTable = _beeTable2["default"];

    var paginationObj = props.paginationObj,
        sortObj = props.sort,
        filterable = props.filterable;
    //一些属性需要内部控制，放在state中

    _this.state = {
      filterable: filterable,
      renderFlag: false, //这个只是一个标记量，用于控制组件是否需要渲染
      activePage: paginationObj.activePage,
      total: paginationObj.total,
      pageItems: paginationObj.items,
      dataNum: paginationObj.dataNum,
      showMenuKey: ''
      // columns: props.columns.slice()
    };
    if (props.loadLazy) {
      ComplexTable = (0, _bigData2["default"])(ComplexTable);
    }
    //后端回调方法，用户的sortFun和Grid的有时有冲突，所以重新定义了一个sort，传给Table
    if (sortObj) {
      sortObj.originSortFun = sortObj.originSortFun ? sortObj.originSortFun : sortObj.sortFun;
      sortObj.sortFun = _this.sortFun;
      _this.sort = sortObj;
    }
    if (props.canSum) {
      ComplexTable = (0, _sum2["default"])(ComplexTable);
    }
    //根据条件生成Grid
    ComplexTable = (0, _sort2["default"])(ComplexTable, _beeIcon2["default"]);

    // 1、type: "checkbox" 多选  2、type: "radio" 单选
    if (Object.prototype.toString.call(props.multiSelect) === '[object Object]' && 'type' in props.multiSelect) {
      if (props.multiSelect.type === "checkbox") {
        //多选
        ComplexTable = (0, _multiSelect2["default"])(ComplexTable, _beeCheckbox2["default"]);
      } else if (props.multiSelect.type === "radio") {
        //单选
        ComplexTable = (0, _singleSelect2["default"])(ComplexTable, _beeRadio2["default"]);
      }
    } else if (typeof props.multiSelect === 'boolean' && !!props.multiSelect) {
      //兼容老版本，设置 true 为多选。
      ComplexTable = (0, _multiSelect2["default"])(ComplexTable, _beeCheckbox2["default"]);
    }

    if (props.draggable) {
      ComplexTable = (0, _dragColumn2["default"])(ComplexTable);
    }

    ComplexTable = (0, _filterColumn2["default"])(ComplexTable, _beePopover2["default"]);
    _this.ComplexTable = ComplexTable;

    return _this;
  }

  // columns = this.props.columns.slice();


  Grid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var renderFlag = this.state.renderFlag;
    //分页

    if (nextProps.paginationObj && nextProps.paginationObj !== 'none') {
      this.setState({
        activePage: nextProps.paginationObj.activePage,
        total: nextProps.paginationObj.total,
        pageItems: nextProps.paginationObj.items,
        dataNum: nextProps.paginationObj.dataNum
      });
    }
    if (nextProps.columns && nextProps.columns !== this.columns) {
      var newColumns = [],
          leftColumns = [],
          rightColumns = [],
          centerColumns = [];
      if (nextProps.noReplaceColumns) {
        // newColumns = nextProps.columns.slice();
        newColumns = nextProps.columns.map(function (colItem) {
          return _extends({}, colItem);
        });
      } else {
        //先检查nextProps.columns的顺序与this.columns的顺序是否一致，不一致按照this.columns的顺序调整，（主要交换列时当前column会保存列的顺序，而props的顺序还是之前的）
        this.columns.forEach(function (item, index) {
          if (nextProps.columns[index].dataIndex !== item.dataIndex) {
            var curIndex = -1;
            for (var nextIndex = 0; nextIndex < nextProps.columns.length; nextIndex++) {
              if (nextProps.columns[nextIndex].dataIndex == item.dataIndex) {
                curIndex = nextIndex;
                break;
              }
            }
            nextProps.columns.splice(index, 0, nextProps.columns.splice(curIndex, 1)[0]);
          }
        });
        //将sort、过滤等在组件中维护的状态和传入column合并

        nextProps.columns.forEach(function (nextItem, index) {
          var newItem = {};

          _this2.columns.forEach(function (item) {
            if (nextItem.dataIndex == item.dataIndex) {
              newItem = _extends({}, item, nextItem);
              //对于解锁的列，再次传入时还是解锁状态
              if (!item.fixed) {
                newItem.fixed = '';
              }
              if (item.width && newItem.width !== item.width) {
                newItem.width = item.width;
              }
              if (item.hasOwnProperty('ifshow')) {
                newItem.ifshow = item.ifshow;
              }

              newItem.hasHeaderMenu = false; //重置后的都需要重新渲染表头菜单
            }
          });
          if (newItem.fixed == "left") {
            leftColumns.push(newItem);
          } else if (newItem.fixed == "right") {
            rightColumns.push(newItem);
          } else {
            centerColumns.push(newItem);
          }
        });
        newColumns = [].concat(leftColumns, centerColumns, rightColumns);
      }

      this.columns = newColumns, this.setState({
        renderFlag: !renderFlag,
        filterable: nextProps.filterable
      });
    }
  };
  /**
   * 点击分页回调函数
   */


  /**
   * 设置相关固定Cols
   */

  /**
   * 设置隐藏显示Cols
   */


  /**
   * header菜单点击操作
   */


  /**
   * 渲染表头下拉菜单（过滤、隐藏）
   * @param {Array} columns 表格列数组
   */
  Grid.prototype.renderColumnsDropdown = function renderColumnsDropdown(columns) {
    var _this3 = this;

    var icon = "uf-arrow-down";
    var _props = this.props,
        showFilterMenu = _props.showFilterMenu,
        columnFilterAble = _props.columnFilterAble;
    var filterable = this.state.filterable;
    // const exitNoFixedColumn = columns.find(item=> !item.fixed)

    return columns.map(function (originColumn, index, arr) {
      var column = _extends({}, originColumn);
      column.hasHeaderMenu = true;
      column.title = _react2["default"].createElement(_ColumnsDropdown2["default"], { originColumn: originColumn, local: _this3.local, showFilterMenu: showFilterMenu,
        onMenuSelect: _this3.onMenuSelect, allColumns: arr, columnFilterAble: columnFilterAble,
        filterable: filterable
      });

      return column;
    });
  };

  /**
   * 表头menu和表格整体过滤时有冲突，因此添加了回调函数
   */


  /**
   * 后端获取数据
   */

  /**
   *拖拽交互列后记录下当前columns
   */


  /**
   * 获取所有列以及table属性值
   */


  /**
   * 拖拽后计算列宽
   */


  /**
   *
   * 重置grid的columns
   */


  Grid.prototype.render = function render() {
    var props = this.props;
    var ComplexTable = this.ComplexTable;
    var _props$sort = props.sort,
        sort = _props$sort === undefined ? {} : _props$sort,
        paginationObj = props.paginationObj,
        _props$toolBar = props.toolBar,
        toolBar = _props$toolBar === undefined ? {} : _props$toolBar;

    var paginationParam = void 0,
        verticalPosition = void 0,
        horizontalPosition = void 0;
    this.local = (0, _tool.getComponentLocale)(this.props, this.context, "Grid", function () {
      return _i18n2["default"];
    });
    if (paginationObj !== 'none') {
      paginationParam = _extends({}, defualtPaginationParam, paginationObj);
      verticalPosition = paginationParam.verticalPosition;
      horizontalPosition = paginationParam.horizontalPosition;
      delete paginationParam.freshData;
      delete paginationParam.horizontalPosition;
      delete paginationParam.verticalPosition;
    }

    //默认固定表头
    var scroll = _extends({}, { y: true }, props.scroll);

    var filterable = this.state.filterable;

    var columns = this.columns.slice();
    //是否显示表头菜单、已经显示过的不再显示
    if (props.showHeaderMenu) {
      columns = this.renderColumnsDropdown(columns);
    }
    return _react2["default"].createElement(
      "div",
      { className: (0, _classnames2["default"])("u-grid", props.className) },
      verticalPosition == "top" && _react2["default"].createElement(_beePagination2["default"], _extends({}, paginationParam, {
        className: horizontalPosition,

        boundaryLinks: true,
        activePage: this.state.activePage,
        onSelect: this.handleSelectPage,
        items: this.state.pageItems,
        total: this.state.total
      })),
      _react2["default"].createElement(ComplexTable, _extends({}, props, {
        scroll: scroll,
        columns: columns,
        afterFilter: this.afterFilter,
        sort: this.sort,
        onDrop: this.dragDrop,
        afterDragColWidth: this.afterDragColWidth,
        filterable: filterable
      })),
      verticalPosition == "bottom" && _react2["default"].createElement(_beePagination2["default"], _extends({}, paginationParam, {
        className: horizontalPosition,
        boundaryLinks: true,
        activePage: this.state.activePage,
        onSelect: this.handleSelectPage,
        items: this.state.pageItems,
        total: this.state.total
      }))
    );
  };

  return Grid;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.columns = this.props.columns.map(function (colItem) {
    return _extends({}, colItem);
  });

  this.changeMenuKey = function (key) {};

  this.handleSelectPage = function (eventKey) {
    var _props$paginationObj = _this4.props.paginationObj,
        paginationObj = _props$paginationObj === undefined ? {} : _props$paginationObj;

    _this4.setState({
      activePage: eventKey
    });
    paginationObj.freshData && paginationObj.freshData(eventKey);
  };

  this.optFixCols = function (columns, key) {
    var fixedLeftCols = [];
    var fixedRightCols = [];
    var nonColums = [];

    columns.find(function (da) {
      if (da.key == key) {
        da.fixed ? delete da.fixed : da.fixed = "left";
      }
      if (da.fixed == "left") {
        fixedLeftCols.push(da);
      } else if (da.fixed == "right") {
        fixedRightCols.push(da);
      } else {
        nonColums.push(da);
      }
    });

    columns = [].concat(fixedLeftCols, nonColums, fixedRightCols);
    return columns;
  };

  this.optShowCols = function (columns, key) {
    columns.forEach(function (item, index) {
      if (item.key == key) {
        item.ifshow = false;
        return;
      }
    });
    return columns;
  };

  this.onMenuSelect = function (_ref) {
    var key = _ref.key,
        item = _ref.item;
    var _state = _this4.state,
        filterable = _state.filterable,
        renderFlag = _state.renderFlag;
    var checkMinSize = _this4.props.checkMinSize;

    var fieldKey = item.props.data.fieldKey;
    var sum = 0;
    if (key !== 'rowFilter') {
      //显示原则跟table组件同步，至少有一个非固定列显示

      _this4.columns.forEach(function (da) {
        !da.fixed && da.ifshow !== false ? sum++ : "";
      });
    }
    if (key == "fix") {
      if (sum <= 1 && !item.props.data.fixed) {
        return;
      }
      _this4.columns = _this4.optFixCols(_this4.columns, fieldKey);
      // this.setState({
      //   columns
      // });
      _this4.setState({
        renderFlag: !renderFlag
      });
    } else if (key == "show") {
      if (sum < checkMinSize || sum <= 1) {
        return;
      }
      _this4.columns = _this4.optShowCols(_this4.columns, fieldKey);
      _this4.setState({
        renderFlag: !renderFlag
      });
    } else {
      if (typeof _this4.props.afterRowFilter == "function") {
        _this4.props.afterRowFilter(!filterable);
      }
      _this4.setState({ filterable: !filterable });
    }
  };

  this.afterFilter = function (optData, columns) {
    var renderFlag = _this4.state.renderFlag;

    if (Array.isArray(optData)) {
      _this4.columns.forEach(function (da) {
        optData.forEach(function (optItem) {
          if (da.key == optItem.key) {
            da.ifshow = optItem.ifshow;
            return true;
          }
        });
      });
    } else {
      _this4.columns.find(function (da) {
        if (da.key == optData.key) {
          da.ifshow = optData.ifshow;
        }
      });
    }

    if (typeof _this4.props.afterFilter == "function") {
      _this4.props.afterFilter(optData, _this4.columns);
    }
    // this.setState({
    //   renderFlag:!renderFlag
    // })
  };

  this.sortFun = function (sortParam) {
    var sortObj = {};
    sortParam.forEach(function (item) {
      sortObj[item.field] = item;
    });
    _this4.columns.forEach(function (da) {
      //保存返回的column状态，没有则终止order状态
      if (sortObj[da.dataIndex]) {
        da = _extends(da, sortObj[da.dataIndex]);
      } else {
        da.order = "flatscend";
        da.orderNum = "";
      }
    });

    //将参数传递给后端排序
    if (typeof _this4.sort.originSortFun == "function") {
      _this4.sort.originSortFun(sortParam, _this4.columns);
    }
  };

  this.dragDrop = function (event, data, columns) {
    // this.setState({
    //   columns: columns
    // });

    columns.forEach(function (item, index) {
      if (_this4.columns[index].dataIndex !== item.dataIndex) {
        var curIndex = -1;
        for (var nextIndex = 0; nextIndex < _this4.columns.length; nextIndex++) {
          if (_this4.columns[nextIndex].dataIndex == item.dataIndex) {
            curIndex = nextIndex;
            break;
          }
        }
        _this4.columns.splice(index, 0, _this4.columns.splice(curIndex, 1)[0]);
      }
    });
    if (_this4.props.onDrop) {
      _this4.props.onDrop(event, data, _this4.columns);
    }
  };

  this.getColumnsAndTablePros = function () {
    var columns = _this4.columns.slice();

    if (_this4.dragColsData) {
      var dragColsKeyArr = Object.keys(_this4.dragColsData);
      dragColsKeyArr.some(function (itemKey) {
        columns.forEach(function (col) {
          if (col.dataIndex == itemKey) {
            col.width = _this4.dragColsData[itemKey].width;
            return true;
          }
        });
      });
    }
    var rs = {
      columns: columns,
      tablePros: _this4.props
    };
    return rs;
  };

  this.getItem = function (da) {
    var obj = {};
    da.height ? obj.hpx = da.height : "";
    da.ifshow ? obj.hidden = true : false;
    da.level ? obj.level = da.level : "";
    return obj;
    // if(da.height || da.hidden || da.level){
    //   return obj;
    // }else{
    //   return null;
    // }
  };

  this.getRowList = function (data) {
    var rowAttr = [];
    data.forEach(function (da) {
      var item = _this4.getItem(da);
      if (item) {
        rowAttr.push(item);
      }
    });
    return rowAttr;
  };

  this.exportExcel = function () {
    var _props2 = _this4.props,
        sheetIsRowFilter = _props2.sheetIsRowFilter,
        sheetName = _props2.sheetName,
        _sheetHeader = _props2.sheetHeader,
        exportData = _props2.exportData,
        exportFileName = _props2.exportFileName;

    var colsAndTablePros = _this4.getColumnsAndTablePros();
    var sheetHeader = [],
        columnAttr = [],
        rowAttr = [],
        sheetFilter = [];
    // _exportHidden = false;

    // for (let index = 0; index < colsAndTablePros.columns.length; index++) {
    //   const element = colsAndTablePros.columns[index];
    //   if(element.exportHidden){
    //     _exportHidden = true;
    //     break;
    //   }
    // }
    // console.log("--_excelHidden-******--",_exportHidden);
    colsAndTablePros.columns.forEach(function (column) {

      var _show = false,
          _hidden = false;
      if (column.ifshow != undefined && column.ifshow === false) {
        _show = true;
      }
      // _hidden = _exportHidden?column.exportHidden:_show //column.exportHidden // column.excelHidden === false ? true : false
      _hidden = column.exportHidden ? true : _show;
      if (!_hidden) {
        var _width = String(column.width).indexOf("%") != -1 ? 100 : column.width;
        columnAttr.push({
          wpx: _width
        });
        var _cloum = column.exportKey ? column.exportKey : column.dataIndex;
        sheetFilter.push(_cloum);
        sheetHeader.push(column.title);
      }
    });
    if (_sheetHeader) {
      rowAttr.push(_this4.getItem(_sheetHeader));
    }
    if (sheetIsRowFilter) {
      _this4.getRowList(colsAndTablePros.tablePros.data);
    }
    var option = {
      datas: [{
        fileName: exportFileName,
        sheetData: exportData,
        sheetName: sheetName,
        sheetFilter: sheetFilter,
        sheetHeader: sheetHeader,
        columnAttr: columnAttr,
        rowAttr: rowAttr
      }]
    };
    var toExcel = new _ExportExcel2["default"](option, exportFileName);
    toExcel.saveExcel();
  };

  this.afterDragColWidth = function (colData) {
    var renderFlag = _this4.state.renderFlag;
    var rows = colData.rows,
        cols = colData.cols,
        currIndex = colData.currIndex;

    _this4.columns.forEach(function (item) {
      rows.find(function (paramItem, paramIndex) {
        if (item.dataIndex == paramItem.dataindex) {
          if (paramIndex == currIndex) {
            item.width = parseInt(cols[paramIndex].style.width);
          } else {
            item.width = paramItem.width;
          }
        }
      });
    });
    _this4.setState({
      renderFlag: !renderFlag
    });
  };

  this.resetColumns = function (newColumns) {
    var renderFlag = _this4.state.renderFlag;

    if (newColumns) {
      _this4.columns = newColumns.map(function (colItem) {
        return _extends({}, colItem);
      });
      _this4.setState({
        renderFlag: !renderFlag
      });
    }
  };
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;
Grid.contextTypes = {
  beeLocale: _propTypes2["default"].object
};

exports["default"] = Grid;
module.exports = exports["default"];