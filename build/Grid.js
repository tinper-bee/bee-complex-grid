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

var _nextUi = require("@tinper/next-ui");

var _i18n = require("./i18n");

var _i18n2 = _interopRequireDefault(_i18n);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var multiSelect = _nextUi.Table.multiSelect,
    filterColumn = _nextUi.Table.filterColumn,
    dragColumn = _nextUi.Table.dragColumn,
    sort = _nextUi.Table.sort,
    sum = _nextUi.Table.sum,
    bigData = _nextUi.Table.bigData,
    singleSelect = _nextUi.Table.singleSelect;

// import { getComponentLocale } from "bee-locale/build/tool";
// import { getComponentLocale } from "@tinper/next-ui/lib/wui-locale/src/tool"

var propTypes = {
    showHeaderMenu: _propTypes2["default"].bool,
    sheetName: _propTypes2["default"].string,
    sheetIsRowFilter: _propTypes2["default"].bool,
    exportData: _propTypes2["default"].array,
    afterRowLock: _propTypes2["default"].func
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
    locale: 'zh-cn',
    paginationObj: {},
    sheetName: "sheet", //导出表格的name
    sheetIsRowFilter: false, //是否要设置行样式，是否遍历
    columnFilterAble: true,
    afterRowLock: function afterRowLock() {} //表头锁定解锁的回调函数
};

var defualtPaginationParam = { horizontalPosition: "center", verticalPosition: 'bottom', showJump: true, first: true, prev: true, last: true, next: true, maxButtons: 5 };

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _initialiseProps.call(_this);

        var paginationObj = props.paginationObj,
            filterable = props.filterable;

        _this.state = {
            filterable: filterable, //是否默认启用“行过滤”功能，即按条件或值筛选行数据`data`的功能
            renderFlag: false, //这个只是一个标记量，用于控制组件是否需要渲染
            activePage: paginationObj.activePage,
            total: paginationObj.total,
            pageItems: paginationObj.items,
            dataNum: paginationObj.dataNum,
            showMenuKey: '',
            selectedRowIndex: props.selectedRowIndex || ''
        };
        _this.local = _i18n2["default"];
        _this.selectType = 'none'; // 标识单选/多选/无选择列
        _this.ComplexTable = _this.constructGrid(_nextUi.Table);
        return _this;
    }

    // 根据参数，组装复杂表格


    Grid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var _state = this.state,
            renderFlag = _state.renderFlag,
            selectedRowIndex = _state.selectedRowIndex;
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
                newColumns = nextProps.columns.map(function (colItem) {
                    return _extends({}, colItem);
                });
            } else {
                //先检查nextProps.columns的顺序与this.columns的顺序是否一致，不一致按照this.columns的顺序调整，（主要交换列时当前column会保存列的顺序，而props的顺序还是之前的）
                this.columns.forEach(function (item, index) {
                    if (nextProps.columns[index] && nextProps.columns[index].dataIndex !== item.dataIndex) {
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
                        if (nextItem.dataIndex == item.dataIndex || !item.dataIndex) {
                            //适配初始item内没有数据的情况
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
        // 单选行
        if ('selectedRowIndex' in nextProps && nextProps.selectedRowIndex !== selectedRowIndex) {
            this.setState({
                selectedRowIndex: nextProps.selectedRowIndex
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


    /**
     * 单选回调
     */


    /**
     * 多选回调
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
        // this.local = getComponentLocale(
        //     this.props,
        //     this.context,
        //     "Grid",
        //     () => i18n
        // );
        this.local = (0, _utils.getLangInfo)(this.props.locale, _i18n2["default"]);
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

        var _state2 = this.state,
            filterable = _state2.filterable,
            selectedRowIndex = _state2.selectedRowIndex;

        var columns = this.columns.slice();
        //是否显示表头菜单、已经显示过的不再显示
        if (props.showHeaderMenu) {
            columns = this.renderColumnsDropdown(columns);
        }
        return _react2["default"].createElement(
            "div",
            { className: (0, _classnames2["default"])("bee-complex-grid", props.className) },
            verticalPosition == "top" && _react2["default"].createElement(_nextUi.Pagination, _extends({}, paginationParam, {
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
                onDragEnd: this.dragDrop,
                afterDragColWidth: this.afterDragColWidth,
                filterable: filterable,
                selectedRowIndex: selectedRowIndex,
                getSelectedDataFunc: this.selectType === 'single' ? this.getSingleSelectedDataFunc : this.getMultiSelectedDataFunc
            })),
            verticalPosition == "bottom" && _react2["default"].createElement(_nextUi.Pagination, _extends({}, paginationParam, {
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
    var _this3 = this;

    this.constructGrid = function (basicTable) {
        var props = _this3.props;
        var sortObj = props.sort;

        var ComplexTable = basicTable;
        // 大数据渲染
        if (props.loadLazy) {
            ComplexTable = bigData(ComplexTable);
        }
        //后端回调方法，用户的sortFun和Grid的有时有冲突，所以重新定义了一个sort，传给Table
        if (sortObj) {
            sortObj.originSortFun = sortObj.originSortFun ? sortObj.originSortFun : sortObj.sortFun;
            sortObj.sortFun = _this3.sortFun;
            _this3.sort = sortObj;
        }
        // 合计
        if (props.canSum) {
            ComplexTable = sum(ComplexTable);
        }
        //根据条件生成Grid
        ComplexTable = sort(ComplexTable, _nextUi.Icon);

        // 1、type: "checkbox" 多选  2、type: "radio" 单选
        if (Object.prototype.toString.call(props.multiSelect) === '[object Object]' && 'type' in props.multiSelect) {
            if (props.multiSelect.type === "checkbox") {
                //多选
                ComplexTable = multiSelect(ComplexTable, _nextUi.Checkbox);
                _this3.selectType = "multiple";
            } else if (props.multiSelect.type === "radio") {
                //单选
                ComplexTable = singleSelect(ComplexTable, _nextUi.Radio);
                _this3.selectType = "single";
            }
        } else if (typeof props.multiSelect === 'boolean' && !!props.multiSelect) {
            //兼容老版本，设置 true 为多选。
            ComplexTable = multiSelect(ComplexTable, _nextUi.Checkbox);
        }
        // 拖拽
        if (props.draggable) {
            ComplexTable = dragColumn(ComplexTable);
        }
        // 过滤
        ComplexTable = filterColumn(ComplexTable, _nextUi.Popover);
        return ComplexTable;
    };

    this.columns = this.props.columns.map(function (colItem) {
        return _extends({}, colItem);
    });

    this.handleSelectPage = function (eventKey) {
        var _props$paginationObj = _this3.props.paginationObj,
            paginationObj = _props$paginationObj === undefined ? {} : _props$paginationObj;

        _this3.setState({
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
        var _state3 = _this3.state,
            filterable = _state3.filterable,
            renderFlag = _state3.renderFlag;
        var _props = _this3.props,
            checkMinSize = _props.checkMinSize,
            afterRowLock = _props.afterRowLock;

        var fieldKey = item.props.data.fieldKey;
        var sum = 0;
        if (key !== 'rowFilter') {
            //显示原则跟table组件同步，至少有一个非固定列显示

            _this3.columns.forEach(function (da) {
                !da.fixed && da.ifshow !== false ? sum++ : "";
            });
        }
        if (key == "fix") {
            if (sum <= 1 && !item.props.data.fixed) {
                return;
            }
            _this3.columns = _this3.optFixCols(_this3.columns, fieldKey);
            afterRowLock(fieldKey, !item.props.data.fixed, _this3.columns);
            _this3.setState({
                renderFlag: !renderFlag
            });
        } else if (key == "show") {
            if (sum < checkMinSize || sum <= 1) {
                return;
            }
            _this3.columns = _this3.optShowCols(_this3.columns, fieldKey);
            _this3.setState({
                renderFlag: !renderFlag
            });
        } else {
            if (typeof _this3.props.afterRowFilter == "function") {
                _this3.props.afterRowFilter(!filterable);
            }
            _this3.setState({ filterable: !filterable });
        }
    };

    this.renderColumnsDropdown = function (columns) {
        var icon = "uf-arrow-down";
        var _props2 = _this3.props,
            showFilterMenu = _props2.showFilterMenu,
            columnFilterAble = _props2.columnFilterAble;
        var filterable = _this3.state.filterable;

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

    this.afterFilter = function (optData, columns) {
        if (Array.isArray(optData)) {
            _this3.columns.forEach(function (da) {
                optData.forEach(function (optItem) {
                    if (da.key == optItem.key) {
                        da.ifshow = optItem.ifshow;
                        return true;
                    }
                });
            });
        } else {
            _this3.columns.find(function (da) {
                if (da.key == optData.key) {
                    da.ifshow = optData.ifshow;
                }
            });
        }

        if (typeof _this3.props.afterFilter == "function") {
            _this3.props.afterFilter(optData, _this3.columns);
        }
    };

    this.sortFun = function (sortParam, newData, oldData) {
        var sortObj = {};
        sortParam.forEach(function (item) {
            sortObj[item.field] = item;
        });
        _this3.columns.forEach(function (da) {
            //保存返回的column状态，没有则终止order状态
            if (sortObj[da.dataIndex]) {
                da = _extends(da, sortObj[da.dataIndex]);
            } else {
                da.order = "flatscend";
                da.orderNum = "";
            }
        });
        //将参数传递给后端排序
        if (typeof _this3.sort.originSortFun == "function") {
            _this3.sort.originSortFun(sortParam, _this3.columns, newData, oldData);
        }
    };

    this.dragDrop = function (event, data, columns) {
        columns.forEach(function (item, index) {
            if (_this3.columns[index].dataIndex !== item.dataIndex) {
                var curIndex = -1;
                for (var nextIndex = 0; nextIndex < _this3.columns.length; nextIndex++) {
                    if (_this3.columns[nextIndex].dataIndex == item.dataIndex) {
                        curIndex = nextIndex;
                        break;
                    }
                }
                _this3.columns.splice(index, 0, _this3.columns.splice(curIndex, 1)[0]);
            }
        });
        if (_this3.props.onDrop) {
            _this3.props.onDrop(event, data, _this3.columns);
        }
    };

    this.getColumnsAndTablePros = function () {
        var columns = _this3.columns.slice();

        if (_this3.dragColsData) {
            var dragColsKeyArr = Object.keys(_this3.dragColsData);
            dragColsKeyArr.some(function (itemKey) {
                columns.forEach(function (col) {
                    if (col.dataIndex == itemKey) {
                        col.width = _this3.dragColsData[itemKey].width;
                        return true;
                    }
                });
            });
        }
        var rs = {
            columns: columns,
            tablePros: _this3.props
        };
        return rs;
    };

    this.getItem = function (da) {
        var obj = {};
        da.height ? obj.hpx = da.height : "";
        da.ifshow ? obj.hidden = true : false;
        da.level ? obj.level = da.level : "";
        return obj;
    };

    this.getRowList = function (data) {
        var rowAttr = [];
        data.forEach(function (da) {
            var item = _this3.getItem(da);
            if (item) {
                rowAttr.push(item);
            }
        });
        return rowAttr;
    };

    this.exportExcel = function () {
        var _props3 = _this3.props,
            sheetIsRowFilter = _props3.sheetIsRowFilter,
            sheetName = _props3.sheetName,
            _sheetHeader = _props3.sheetHeader,
            exportData = _props3.exportData,
            exportFileName = _props3.exportFileName;

        var colsAndTablePros = _this3.getColumnsAndTablePros();
        var sheetHeader = [],
            columnAttr = [],
            rowAttr = [],
            sheetFilter = [];
        colsAndTablePros.columns.forEach(function (column) {

            var _show = false,
                _hidden = false;
            if (column.ifshow != undefined && column.ifshow === false) {
                _show = true;
            }
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
            rowAttr.push(_this3.getItem(_sheetHeader));
        }
        if (sheetIsRowFilter) {
            _this3.getRowList(colsAndTablePros.tablePros.data);
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
        var renderFlag = _this3.state.renderFlag;
        var rows = colData.rows,
            cols = colData.cols,
            currIndex = colData.currIndex;

        _this3.columns.forEach(function (item) {
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
        _this3.setState({
            renderFlag: !renderFlag
        });
    };

    this.resetColumns = function (newColumns) {
        var renderFlag = _this3.state.renderFlag;

        if (newColumns) {
            _this3.columns = newColumns.map(function (colItem) {
                return _extends({}, colItem);
            });
            _this3.setState({
                renderFlag: !renderFlag
            });
        }
    };

    this.getSingleSelectedDataFunc = function (record, index) {
        var getSelectedDataFunc = _this3.props.getSelectedDataFunc;

        _this3.setState({
            selectedRowIndex: index
        });
        getSelectedDataFunc && getSelectedDataFunc(record, index);
    };

    this.getMultiSelectedDataFunc = function (selectedList, record, index, newData) {
        var getSelectedDataFunc = _this3.props.getSelectedDataFunc;

        getSelectedDataFunc && getSelectedDataFunc(selectedList, record, index, newData);
    };
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;
Grid.contextTypes = {
    beeLocale: _propTypes2["default"].object
};

exports["default"] = Grid;
module.exports = exports["default"];