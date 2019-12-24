'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('./RowField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _NumberField = require('./RowField/NumberField');

var _NumberField2 = _interopRequireDefault(_NumberField);

var _SelectField = require('./RowField/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _DateField = require('./RowField/DateField');

var _DateField2 = _interopRequireDefault(_DateField);

var _YearField = require('./RowField/YearField');

var _YearField2 = _interopRequireDefault(_YearField);

var _RenderCell = require('./RenderCell');

var _RenderCell2 = _interopRequireDefault(_RenderCell);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    onChange: _propTypes2["default"].func,
    filedProps: _propTypes2["default"].object //filed属性
};

var defaultProps = {
    onChange: function onChange() {},
    filedProps: {}
};

var RenderColumn = function (_Component) {
    _inherits(RenderColumn, _Component);

    function RenderColumn(props) {
        _classCallCheck(this, RenderColumn);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getValue = function (text) {
            var _this$props = _this.props,
                type = _this$props.type,
                filedProps = _this$props.filedProps;
            var _filedProps$options = filedProps.options,
                options = _filedProps$options === undefined ? [] : _filedProps$options,
                defaultValue = filedProps.defaultValue;

            var value = defaultValue != undefined ? defaultValue : '';
            if (type && type == 'select') {
                options.forEach(function (item) {
                    if (item.value == text) {
                        value = item.key;
                    }
                });
            } else {
                value = text;
            }
            return value;
        };

        _this.onChange = function (index, dataIndex, value) {
            _this.getValue(value);
            _this.props.onChange(index, dataIndex, value);
        };

        _this.renderComp = function () {
            var _this$props2 = _this.props,
                type = _this$props2.type,
                value = _this$props2.value,
                index = _this$props2.index,
                dataIndex = _this$props2.dataIndex,
                textAlign = _this$props2.textAlign,
                validate = _this$props2.validate,
                disabled = _this$props2.disabled,
                required = _this$props2.required,
                pattern = _this$props2.pattern,
                patternMessage = _this$props2.patternMessage,
                customizeRender = _this$props2.customizeRender,
                valueField = _this$props2.valueField,
                filedProps = _this$props2.filedProps,
                onValidate = _this$props2.onValidate,
                defaultValue = _this$props2.defaultValue;

            var placement = 'left';
            if (textAlign) placement = textAlign == 'center' ? 'bottom' : textAlign;
            if (customizeRender) {
                return _react2["default"].createElement(
                    'div',
                    null,
                    disabled ? _react2["default"].createElement(
                        _beeTooltip2["default"],
                        { overlay: value, inverse: true, placement: placement },
                        _react2["default"].createElement(
                            'span',
                            { className: 'u-edit-grid-cell' },
                            value
                        )
                    ) : _react2["default"].createElement(
                        _RenderCell2["default"],
                        { type: 'refer', text: value, textAlign: textAlign },
                        _react2["default"].cloneElement(customizeRender, _extends({
                            valueField: valueField,
                            textAlign: textAlign,
                            field: dataIndex,
                            validate: validate,
                            required: required,
                            value: value,
                            index: index,
                            onChange: function onChange(field, v) {
                                _this.props.onChange(index, dataIndex, v);
                            },
                            onValidate: onValidate
                        }, filedProps))
                    )
                );
            } else {
                switch (type) {
                    case 'inputNumber':
                        return _react2["default"].createElement(
                            'div',
                            null,
                            disabled ? _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { overlay: value, inverse: true, placement: placement },
                                _react2["default"].createElement(
                                    'span',
                                    { className: 'u-edit-grid-cell' },
                                    value
                                )
                            ) : _react2["default"].createElement(
                                _RenderCell2["default"],
                                { text: value, textAlign: textAlign },
                                _react2["default"].createElement(_NumberField2["default"], _extends({
                                    textAlign: textAlign,
                                    field: dataIndex,
                                    validate: validate,
                                    required: required,
                                    value: value,
                                    pattern: pattern,
                                    patternMessage: patternMessage,
                                    onChange: function onChange(field, v) {
                                        _this.props.onChange(index, dataIndex, v);
                                    },
                                    onValidate: onValidate,
                                    index: index
                                }, filedProps))
                            )
                        );
                        break;
                    case 'input':
                        return _react2["default"].createElement(
                            'div',
                            null,
                            disabled ? _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { overlay: value, inverse: true, placement: placement },
                                _react2["default"].createElement(
                                    'span',
                                    { className: 'u-edit-grid-cell' },
                                    value
                                )
                            ) : _react2["default"].createElement(
                                _RenderCell2["default"],
                                { text: value, textAlign: textAlign },
                                _react2["default"].createElement(_TextField2["default"], _extends({
                                    textAlign: textAlign,
                                    field: dataIndex,
                                    validate: validate,
                                    required: required,
                                    value: value,
                                    pattern: pattern,
                                    patternMessage: patternMessage,
                                    onChange: function onChange(field, v) {
                                        _this.props.onChange(index, dataIndex, v);
                                    },
                                    onValidate: onValidate,
                                    index: index
                                }, filedProps))
                            )
                        );
                        break;
                    case 'select':
                        value = value ? value : filedProps.defaultValue;
                        return _react2["default"].createElement(
                            'div',
                            null,
                            disabled ? _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { inverse: true, placement: placement, overlay: _this.getValue(value) },
                                _react2["default"].createElement(
                                    'span',
                                    { className: 'u-edit-grid-cell' },
                                    _this.getValue(value)
                                )
                            ) : _react2["default"].createElement(
                                _RenderCell2["default"],
                                { text: _this.getValue(value), textAlign: textAlign },
                                _react2["default"].createElement(_SelectField2["default"], _extends({
                                    textAlign: textAlign,
                                    data: filedProps.options || [],
                                    field: dataIndex,
                                    validate: validate,
                                    required: required,
                                    value: value,
                                    onChange: function onChange(field, v) {
                                        _this.onChange(index, dataIndex, v);
                                    },
                                    onValidate: onValidate,
                                    index: index
                                }, filedProps))
                            )
                        );
                        break;
                    case 'datepicker':
                        return _react2["default"].createElement(
                            'div',
                            null,
                            disabled ? _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { overlay: value, inverse: true, placement: placement },
                                _react2["default"].createElement(
                                    'span',
                                    { className: 'u-edit-grid-cell' },
                                    value
                                )
                            ) : _react2["default"].createElement(
                                _RenderCell2["default"],
                                { text: value, textAlign: textAlign },
                                _react2["default"].createElement(_DateField2["default"], _extends({
                                    textAlign: textAlign,
                                    field: dataIndex,
                                    validate: validate,
                                    required: required,
                                    value: value,
                                    pattern: pattern,
                                    patternMessage: patternMessage,
                                    onChange: function onChange(field, v) {
                                        _this.props.onChange(index, dataIndex, v);
                                    },
                                    onValidate: onValidate,
                                    index: index
                                }, filedProps))
                            )
                        );
                        break;
                    case 'year':
                        return _react2["default"].createElement(
                            'div',
                            null,
                            disabled ? _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { overlay: value, inverse: true, placement: placement },
                                _react2["default"].createElement(
                                    'span',
                                    { className: 'u-edit-grid-cell' },
                                    value
                                )
                            ) : _react2["default"].createElement(
                                _RenderCell2["default"],
                                { text: value, textAlign: textAlign },
                                _react2["default"].createElement(_YearField2["default"], _extends({
                                    textAlign: textAlign,
                                    field: dataIndex,
                                    validate: validate,
                                    required: required,
                                    value: value,
                                    pattern: pattern,
                                    patternMessage: patternMessage,
                                    onChange: function onChange(field, v) {
                                        _this.props.onChange(index, dataIndex, v);
                                    },
                                    onValidate: onValidate,
                                    index: index
                                }, filedProps))
                            )
                        );
                        break;
                }
            }
        };

        _this.state = {
            data: props.data
        };
        return _this;
    }

    /**
     * 渲染组件函数
     * @returns JSX
     */


    RenderColumn.prototype.render = function render() {
        return _react2["default"].createElement(
            'div',
            null,
            this.renderComp()
        );
    };

    return RenderColumn;
}(_react.Component);

RenderColumn.propTypes = propTypes;
RenderColumn.defaultProps = defaultProps;
exports["default"] = RenderColumn;
module.exports = exports['default'];