'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var FieldWrap = function (_Component) {
    _inherits(FieldWrap, _Component);

    function FieldWrap() {
        _classCallCheck(this, FieldWrap);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    FieldWrap.prototype.render = function render() {
        var _props = this.props,
            error = _props.error,
            message = _props.message,
            required = _props.required,
            children = _props.children,
            flag = _props.flag;

        return _react2["default"].createElement(
            'div',
            { className: 'triangle-flag' },
            required ? _react2["default"].createElement(
                'div',
                { className: 'triangle-redline' },
                ' '
            ) : null,
            children,
            error ? _react2["default"].createElement(
                'div',
                { className: 'triangle-icon' },
                _react2["default"].createElement(
                    _beeTooltip2["default"],
                    {
                        className: 'inline-edit-tooltip',
                        placement: 'bottom',
                        overlay: _react2["default"].createElement(
                            'div',
                            null,
                            _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t-o' }),
                            message
                        )
                    },
                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-t-o' })
                )
            ) : null,
            flag ? _react2["default"].createElement(
                'div',
                { className: 'triangle_border_nw', style: { "left": required ? "4px" : "0px" } },
                ' '
            ) : null
        );
    };

    return FieldWrap;
}(_react.Component);

exports["default"] = FieldWrap;
module.exports = exports['default'];