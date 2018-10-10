"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeCheckbox = require("bee-checkbox");

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _beePopover = require("bee-popover");

var _beePopover2 = _interopRequireDefault(_beePopover);

var _beePagination = require("bee-pagination");

var _beePagination2 = _interopRequireDefault(_beePagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {};
var defaultProps = {
  scroll: {
    y: true
  },
  bordered: true,
  multiSelect: { type: "checkbox" }
};
// import sum from "bee-table/build/lib/sum";

// const ComplexTable = filterColumn(
//   dragColumn(multiSelect(sum(sort(Table, Icon)), Checkbox)),
//   Popover
// );
var ComplexTable = (0, _filterColumn2["default"])((0, _dragColumn2["default"])((0, _multiSelect2["default"])((0, _sort2["default"])(_beeTable2["default"], _beeIcon2["default"]), _beeCheckbox2["default"])), _beePopover2["default"]);

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var _props$paginationObj = props.paginationObj,
        paginationObj = _props$paginationObj === undefined ? {} : _props$paginationObj;

    _this.state = {
      activePage: paginationObj.activePage ? paginationObj.activePage : 1,
      total: paginationObj.total ? paginationObj.total : 1
    };
    return _this;
  }

  Grid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.paginationObj) {
      this.setState({
        activePage: nextProps.paginationObj.activePage ? nextProps.paginationObj.activePage : 1,
        total: nextProps.paginationObj.total ? nextProps.paginationObj.total : 1
      });
    }
  };
  /**
   * 点击分页
   */


  Grid.prototype.render = function render() {
    var props = this.props;
    //默认固定表头
    // let scroll = Object.assign({y:true},props.scroll);
    var multiSelectObj = { type: "checkbox" };
    return _react2["default"].createElement(
      "div",
      { className: props.className + " u-grid" },
      _react2["default"].createElement(ComplexTable, props),
      _react2["default"].createElement(_beePagination2["default"], {
        first: true,
        last: true,
        prev: true,
        next: true,
        maxButtons: 5,
        boundaryLinks: true,
        activePage: this.state.activePage,
        onSelect: this.handleSelectPage,
        showJump: true,

        total: this.state.total,
        dataNum: 2
      })
    );
  };

  return Grid;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleSelectPage = function (eventKey) {
    var _props$paginationObj2 = _this2.props.paginationObj,
        paginationObj = _props$paginationObj2 === undefined ? {} : _props$paginationObj2;

    _this2.setState({
      activePage: eventKey
    });
    paginationObj.freshData && paginationObj.freshData(eventKey);
  };
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;
exports["default"] = Grid;
module.exports = exports["default"];