'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RenderCell = function (_Component) {
    _inherits(RenderCell, _Component);

    function RenderCell(props) {
        _classCallCheck(this, RenderCell);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.click = function () {
            if (_this.state.visible) {
                setTimeout(function () {
                    var input = document.querySelector('.triangle-flag .u-form-control');
                    if (input) input.focus();
                }, 0);
            }
            _this.setState({
                visible: !_this.state.visible
            });
        };

        _this.onMouseEnter = function () {
            _this.setState({
                enter: true
            });
        };

        _this.onMouseLeave = function () {
            _this.setState({
                visible: true,
                enter: false
            });
        };

        _this.renderSpan = function () {
            if (_this.state.visible && !_this.state.hasError) {
                var textAlign = _this.props.textAlign;
                var placement = 'left';
                if (textAlign) placement = textAlign == 'center' ? 'bottom' : textAlign;
                return _react2["default"].createElement(
                    _beeTooltip2["default"],
                    { inverse: true, overlay: _this.props.text, placement: placement },
                    _react2["default"].createElement(
                        'span',
                        { className: 'u-edit-grid-cell ' + (_this.state.enter ? 'enter' : ''),
                            onMouseLeave: _this.onMouseLeave, onMouseEnter: _this.onMouseEnter,
                            onClick: _this.click },
                        _this.props.text
                    )
                );
            } else {
                return _react2["default"].cloneElement(_this.props.children, {
                    ref: function ref(field) {
                        return _this.field = field;
                    },
                    onBlur: function onBlur() {
                        _this.setState({
                            visible: true,
                            enter: false,
                            hasError: _this.field.state.error
                        });
                    }
                });
            }
        };

        _this.state = {
            visible: true,
            enter: false,
            hasError: false
        };
        return _this;
    }

    RenderCell.prototype.render = function render() {
        return this.renderSpan();
    };

    return RenderCell;
}(_react.Component);

exports["default"] = RenderCell;
module.exports = exports['default'];