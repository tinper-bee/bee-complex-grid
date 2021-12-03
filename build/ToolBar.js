'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nextUi = require('@tinper/next-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
// import Button from 'bee-button';
// import Icon from 'bee-icon';
// import Menu from 'bee-menus';
// import Dropdown from 'bee-dropdown';


var Item = _nextUi.Menu.Item;

var defaultProps = {
    toolBtns: [],
    btnSize: 'sm',
    btnBordered: true
};

var ToolBar = function (_Component) {
    _inherits(ToolBar, _Component);

    function ToolBar(props) {
        _classCallCheck(this, ToolBar);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onDropDownMenuSelect = function (dropItem, dropBtn) {
            var _dropBtn$children = dropBtn.children,
                dropBtnChildren = _dropBtn$children === undefined ? [] : _dropBtn$children;

            var currentKey = parseInt(dropItem.key);
            if (dropBtnChildren[currentKey]) {
                dropBtnChildren[currentKey].onClick && dropBtnChildren[currentKey].onClick();
            }
        };

        _this.getDropDownBtn = function (dropBtn) {
            var menu = void 0,
                menuOpts = [];
            menuOpts = dropBtn.children.map(function (item, index) {
                return _react2["default"].createElement(
                    Item,
                    { key: index },
                    ' ',
                    item.iconType && _react2["default"].createElement(_nextUi.Icon, { type: item.iconType }),
                    item.value
                );
            });
            menu = _react2["default"].createElement(
                _nextUi.Menu,
                {
                    onSelect: function onSelect(key) {
                        return _this.onDropDownMenuSelect(key, dropBtn);
                    } },
                menuOpts
            );
            return _react2["default"].createElement(
                'div',
                { className: 'dropdown-btn' },
                _react2["default"].createElement(
                    _nextUi.Dropdown,
                    {
                        trigger: ['hover'],
                        overlay: menu,
                        animation: 'slide-up'
                    },
                    _react2["default"].createElement(
                        _nextUi.Button,
                        {
                            bordered: _this.props.btnBordered,
                            size: _this.props.btnSize },
                        dropBtn.value,
                        _react2["default"].createElement(_nextUi.Icon, { type: 'uf-anglearrowdown' })
                    )
                )
            );
        };

        _this.getToolBtns = function () {
            var rs = [];
            var _this$props = _this.props,
                toolBtns = _this$props.toolBtns,
                btnSize = _this$props.btnSize,
                btnBordered = _this$props.btnBordered,
                contentAlign = _this$props.contentAlign;

            var className = 'grid-toolbar';
            if (contentAlign) {
                className += ' ' + contentAlign;
            }
            rs = toolBtns.map(function (item) {
                var btn = void 0,
                    className = item.className ? item.className : '';
                if (item.iconType && !item.value) {
                    className += 'toolbar-btn-icon';
                }
                if (item.children) {
                    btn = _this.getDropDownBtn(item);
                } else {
                    btn = _react2["default"].createElement(
                        _nextUi.Button,
                        _extends({ size: btnSize, bordered: btnBordered }, item, { className: className }),
                        item.iconType && _react2["default"].createElement(_nextUi.Icon, { type: item.iconType }),
                        item.value
                    );
                }
                return btn;
            });
            if (rs.length == 0) return '';else return _react2["default"].createElement(
                'div',
                { className: className },
                rs
            );
        };

        return _this;
    }

    ToolBar.prototype.render = function render() {

        return this.getToolBtns();
    };

    return ToolBar;
}(_react.Component);

ToolBar.defaultProps = defaultProps;
exports["default"] = ToolBar;
module.exports = exports['default'];