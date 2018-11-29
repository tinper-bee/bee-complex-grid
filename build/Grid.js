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

var _sum2 = require("bee-table/build/lib/sum");

var _sum3 = _interopRequireDefault(_sum2);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeCheckbox = require("bee-checkbox");

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _beePopover = require("bee-popover");

var _beePopover2 = _interopRequireDefault(_beePopover);

var _beePagination = require("bee-pagination");

var _beePagination2 = _interopRequireDefault(_beePagination);

var _beeMenus = require("bee-menus");

var _beeMenus2 = _interopRequireDefault(_beeMenus);

var _beeDropdown = require("bee-dropdown");

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _ExportExcel = require("./ExportExcel");

var _ExportExcel2 = _interopRequireDefault(_ExportExcel);

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
  sheetIsRowFilter: _propTypes2["default"].bool
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
  locale: {},
  paginationObj: {},
  sheetName: "sheet", //导出表格的name
  sheetIsRowFilter: false, //是否要设置行样式，是否遍历
  columnFilterAble: true
};
var Item = _beeMenus2["default"].Item;


var ComplexTable = _beeTable2["default"];
var defualtPaginationParam = { dataNumSelect: ['5', '10', '15', '20', '25', '50', 'All'] };

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.local = (0, _tool.getComponentLocale)(_this.props, _this.context, 'Grid', function () {
      return _i18n2["default"];
    });
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
      dataNum: paginationObj.dataNum
      // columns: props.columns.slice()
    };
    //后端回调方法，用户的sortFun和Grid的有时有冲突，所以重新定义了一个sort，传给Table
    if (sortObj) {
      sortObj.originSortFun = sortObj.originSortFun ? sortObj.originSortFun : sortObj.sortFun;
      sortObj.sortFun = _this.sortFun;
      _this.sort = sortObj;
    }
    //根据条件生成Grid
    ComplexTable = (0, _sort2["default"])(_beeTable2["default"], _beeIcon2["default"]);
    if (props.canSum) {
      ComplexTable = (0, _sum3["default"])(ComplexTable);
    }
    if (props.multiSelect !== false) {
      ComplexTable = (0, _multiSelect2["default"])(ComplexTable, _beeCheckbox2["default"]);
    }
    if (props.draggable) {
      ComplexTable = (0, _dragColumn2["default"])(ComplexTable);
    }
    if (props.columnFilterAble) {
      ComplexTable = (0, _filterColumn2["default"])(ComplexTable, _beePopover2["default"]);
    }
    return _this;
  }
  // columns = this.props.columns.slice();


  Grid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var renderFlag = this.state.renderFlag;
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
              newItem.width = item.width;
              newItem.hasHeaderMenu = false; //重置后的都需要重新渲染表头菜单
            }
          });
          if (newItem.fixed == 'left') {
            leftColumns.push(newItem);
          } else if (newItem.fixed == 'right') {
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
    var local = this.local;

    return columns.map(function (originColumn, index) {
      var column = _extends({}, originColumn);
      var menuInfo = [],
          fixTitle = local['fixTitle'],
          showTitle = local['hideTitle'];
      if (originColumn.fixed) {
        fixTitle = local['noFixTitle'];
      }
      menuInfo.push({
        info: fixTitle,
        key: "fix",
        fieldKey: originColumn.key,
        index: 0
      });
      //非固定列添加是否显示菜单item
      if (!originColumn.fixed) {
        menuInfo.push({
          info: showTitle,
          key: "show",
          fieldKey: originColumn.key,
          checked: originColumn.checked,
          index: 1
        });
      }
      //是否行过滤菜单item
      if (_this3.props.showFilterMenu) {
        menuInfo.push({
          info: local['rowFilter'],
          key: "rowFilter",
          fieldKey: originColumn.key,
          index: 3
        });
      }
      var menu = _react2["default"].createElement(
        _beeMenus2["default"],
        { onSelect: _this3.onMenuSelect, selectedKeys: [] },
        menuInfo.map(function (da) {
          return _react2["default"].createElement(
            Item,
            { key: da.key, index: da.index, data: da },
            da.info
          );
        })
      );
      column.hasHeaderMenu = true;
      column.title = _react2["default"].createElement(
        "span",
        { className: "title-con drop-menu" },
        column.title,
        _react2["default"].createElement(
          _beeDropdown2["default"],
          { trigger: ["click"], overlay: menu, animation: "slide-up" },
          _react2["default"].createElement(_beeIcon2["default"], { type: icon })
        )
      );
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
    var _props$sort = props.sort,
        sort = _props$sort === undefined ? {} : _props$sort,
        paginationObj = props.paginationObj;

    var paginationParam = _extends({}, defualtPaginationParam, paginationObj);
    //默认固定表头
    var scroll = _extends({}, { y: true }, props.scroll);
    delete paginationParam.freshData;

    var filterable = this.state.filterable;

    var columns = this.columns.slice();
    //是否显示表头菜单、已经显示过的不再显示
    if (props.showHeaderMenu) {
      columns = this.renderColumnsDropdown(columns);
    }

    return _react2["default"].createElement(
      "div",
      { className: (0, _classnames2["default"])("u-grid", props.className) },
      _react2["default"].createElement(_beePagination2["default"], _extends({}, paginationParam, {
        first: true,
        last: true,
        prev: true,
        next: true,
        maxButtons: 5,
        boundaryLinks: true,
        activePage: this.state.activePage,
        onSelect: this.handleSelectPage,
        showJump: true,
        items: this.state.pageItems,
        total: this.state.total
      })),
      _react2["default"].createElement(ComplexTable, _extends({
        headerScroll: true
      }, props, {
        scroll: scroll,
        columns: columns,
        afterFilter: this.afterFilter,
        sort: this.sort,
        onDrop: this.dragDrop,
        afterDragColWidth: this.afterDragColWidth,
        filterable: filterable
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
    if (key == "fix") {
      _this4.columns = _this4.optFixCols(_this4.columns, fieldKey);
      // this.setState({
      //   columns
      // });
      _this4.setState({
        renderFlag: !renderFlag
      });
    } else if (key == "show") {
      //显示原则跟table组件同步，至少有一个非固定列显示
      var _sum = 0;
      _this4.columns.forEach(function (da) {
        !da.fixed && da.checked ? _sum++ : "";
      });
      if ((_sum < checkMinSize || _sum <= 1) && item.props.data.checked) {
        return;
      }
      _this4.columns = _this4.optShowCols(_this4.columns, fieldKey);
      _this4.setState({
        renderFlag: !renderFlag
      });
    } else {
      if (typeof _this4.props.afterRowFilter == 'function') {
        _this4.props.afterRowFilter(!filterable);
      }
      _this4.setState({ filterable: !filterable });
    }
  };

  this.afterFilter = function (optData, columns) {
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
  };

  this.sortFun = function (sortParam) {
    var sortObj = {};
    sortParam.forEach(function (item) {
      sortObj[item.field] = item;
    });
    ;
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
    var originColumns = _this4.props.columns;
    var columns = _this4.columns.slice();
    // //修改模板的title
    // columns.forEach(item=>{
    //   originColumns.some(originItem=>{
    //     if(originItem.dataIndex == item.dataIndex){
    //       item.title = originItem.title;
    //       return true;
    //     }
    //   })
    // })
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
    debugger;
    data.forEach(function (da) {
      var item = _this4.getItem(da);
      if (item) {
        rowAttr.push(item);
      }
    });
    return rowAttr;
  };

  this.exportExcel = function () {
    var _props = _this4.props,
        sheetIsRowFilter = _props.sheetIsRowFilter,
        sheetName = _props.sheetName,
        _sheetHeader = _props.sheetHeader;

    var colsAndTablePros = _this4.getColumnsAndTablePros();
    var sheetHeader = [],
        columnAttr = [],
        rowAttr = [],
        sheetFilter = [];
    colsAndTablePros.columns.forEach(function (column) {
      sheetHeader.push(column.title);
      columnAttr.push({ wpx: column.width, hidden: column.ifshow === false ? true : false });
      sheetFilter.push(column.dataIndex);
    });
    if (_sheetHeader) {
      rowAttr.push(_this4.getItem(_sheetHeader));
    }
    if (sheetIsRowFilter) {
      _this4.getRowList(colsAndTablePros.tablePros.data);
    }
    var option = {
      datas: [{
        sheetData: _this4.props.data,
        sheetName: sheetName,
        sheetFilter: sheetFilter,
        sheetHeader: sheetHeader,
        columnAttr: columnAttr,
        rowAttr: rowAttr
      }]
    };
    var toExcel = new _ExportExcel2["default"](option);
    toExcel.saveExcel();
  };

  this.afterDragColWidth = function (colData) {

    // const {renderFlag} = this.state

    // this.columns.forEach(item=>{
    //   colData.find(paramItem=>{
    //     if (item.dataIndex == paramItem.dataindex) {
    //       item.width = paramItem.width
    //     }
    //   })
    // })

    // this.setState({
    //   renderFlag:!renderFlag
    // });
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
exports["default"] = Grid;
module.exports = exports["default"];