"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeMenus = require("bee-menus");

var _beeMenus2 = _interopRequireDefault(_beeMenus);

var _beeDropdown = require("bee-dropdown");

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Item = _beeMenus2["default"].Item;

var ColumnsDropdown = function (_Component) {
  _inherits(ColumnsDropdown, _Component);

  function ColumnsDropdown(props) {
    _classCallCheck(this, ColumnsDropdown);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onMenuSelect = function (selectObj) {
      _this.props.onMenuSelect(selectObj);
    };

    _this.onVisibleChange = function (visiblePar) {
      var visible = _this.state.visible;

      _this.setState({
        visible: !visible
      });
    };

    _this.hideMenu = function (event) {
      console.log(event.target, event.relatedTarget, event.currentTarget, event.relatedTarget.classList);
      if (_this.state.visible !== false && !event.relatedTarget.classList.contains('u-dropdown')) {
        _this.setState({
          visible: false
        });
      }
    };

    _this.state = {
      visible: props.showMenuKey == props.originColumn.key ? true : false
    };

    return _this;
  }

  ColumnsDropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // let {visible} = this.state;
    // if(nextProps.showMenuKey !== this.props.originColumn.key && visible){
    //   this.setState({
    //     visible:false
    //   })
    // }
  };

  ColumnsDropdown.prototype.render = function render() {
    var _props = this.props,
        originColumn = _props.originColumn,
        local = _props.local,
        showFilterMenu = _props.showFilterMenu,
        allColumns = _props.allColumns,
        columnFilterAble = _props.columnFilterAble,
        filterable = _props.filterable;
    var visible = this.state.visible;

    var icon = "uf-arrow-down";
    var noFixedCount = 0; //非固定列个数
    allColumns.forEach(function (item) {
      if (!item.fixed && item.ifshow !== false) {
        noFixedCount = noFixedCount + 1;
      }
    });
    var menuInfo = [],
        fixTitle = local["fixTitle"],
        showTitle = local["hideTitle"];
    if (originColumn.fixed) {
      fixTitle = local["noFixTitle"];
    }
    menuInfo.push({
      info: fixTitle,
      key: "fix",
      fixed: originColumn.fixed,
      fieldKey: originColumn.key,
      // disabled:noFixedCount<2 && !originColumn.fixed,
      index: 0
    });
    //非固定列添加是否显示菜单item
    if (!originColumn.fixed && columnFilterAble) {
      menuInfo.push({
        info: showTitle,
        key: "show",
        fieldKey: originColumn.key,
        checked: originColumn.checked,
        // disabled:noFixedCount<2 && !originColumn.fixed,
        index: 1
      });
    }
    //是否行过滤菜单item
    if (showFilterMenu) {
      var title = filterable ? local["closeRowFilter"] : local["openRowFilter"];

      menuInfo.push({
        info: title,
        key: "rowFilter",
        fieldKey: originColumn.key,
        index: 3
      });
    }
    var menu = _react2["default"].createElement(
      _beeMenus2["default"],
      {
        onSelect: this.onMenuSelect,
        selectedKeys: [],
        "data-type": "menu11",
        className: "grid-menu"
      },
      menuInfo.map(function (da) {
        return _react2["default"].createElement(
          Item,
          { key: da.key, index: da.index, data: da, disabled: da.disabled },
          da.info
        );
      })
    );
    var className = originColumn.sorter ? "cansort title-con drop-menu" : "title-con drop-menu";

    return _react2["default"].createElement(
      "span",
      { "data-type": "menu", className: className },
      _react2["default"].createElement(
        "span",
        { className: "drop-menu-title" },
        originColumn.title
      ),
      _react2["default"].createElement(
        _beeDropdown2["default"],
        {
          trigger: ["click"]
          // onVisibleChange={this.onVisibleChange}
          // visible={visible}
          , overlay: menu,
          animation: "slide-up",
          "data-type": "menu11",
          overlayClassName: 'grid-menu',
          rootClose: true
        },
        _react2["default"].createElement(_beeIcon2["default"], { type: icon, "data-key": originColumn.key, "data-role": "menuBtn" })
      )
    );
  };

  return ColumnsDropdown;
}(_react.Component);

exports["default"] = ColumnsDropdown;
module.exports = exports["default"];