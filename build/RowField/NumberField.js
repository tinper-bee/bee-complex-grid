'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeInputNumber = require('bee-input-number');

var _beeInputNumber2 = _interopRequireDefault(_beeInputNumber);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _FieldWrap = require('./FieldWrap');

var _FieldWrap2 = _interopRequireDefault(_FieldWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } //React导入

//类型校验

//验证组件 https://www.npmjs.com/package/async-validator


//数值组件


//类型校验
var propTypes = {
    value: _propTypes2["default"].any,
    onChange: _propTypes2["default"].func,
    className: _propTypes2["default"].string,
    field: _propTypes2["default"].string,
    index: _propTypes2["default"].number,
    message: _propTypes2["default"].string,
    data: _propTypes2["default"].array,
    required: _propTypes2["default"].bool,
    onValidate: _propTypes2["default"].func,
    isFlag: _propTypes2["default"].bool,
    validate: _propTypes2["default"].bool,
    iconStyle: _propTypes2["default"].string,
    max: _propTypes2["default"].number,
    min: _propTypes2["default"].number,
    step: _propTypes2["default"].number
};

//默认参数值
var defaultProps = {
    field: '',
    index: '',
    message: '请输入此字段',
    data: [],
    required: false,
    isFlag: false,
    validate: false
};

var NumberField = function (_Component) {
    _inherits(NumberField, _Component);

    /**
     * Creates an instance of NumberField.
     * @param {*} props
     * @memberof NumberField
     */
    function NumberField(props) {
        _classCallCheck(this, NumberField);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.handlerChange = function (value) {
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                field = _this$props.field,
                index = _this$props.index,
                status = _this$props.status,
                max = _this$props.max,
                min = _this$props.min;
            //处理是否有修改状态改变、状态同步之后校验输入是否正确

            _this.setState({ value: value, flag: status == 'edit' }, function () {
                _this.validate();
            });
            value = parseFloat(value) ? parseFloat(value) : value;
            if (value > max || value < 0) {
                _this.setState({
                    required: true
                }, function () {
                    _this.onChangeValidate();
                });
            } else {
                _this.setState({
                    message: "",
                    error: false,
                    required: false
                });
                _this._value = value;
                //回调外部函数
                onChange && onChange(field, value == null ? '' : value, index);
            }
        };

        _this.onChangeValidate = function () {
            var _this$props2 = _this.props,
                field = _this$props2.field,
                index = _this$props2.index,
                onValidate = _this$props2.onValidate,
                max = _this$props2.max,
                min = _this$props2.min;
            var _this$state = _this.state,
                value = _this$state.value,
                required = _this$state.required,
                error = _this$state.error;
            //设置校验规则

            var descriptor = _defineProperty({}, field, { type: "number", required: "false" });
            var validator = new _asyncValidator2["default"](descriptor);
            validator.validate(_defineProperty({}, field, value), function (errors, fields) {
                _this.setState({
                    error: true,
                    message: "输入值,最大值为 " + max + " ,最小为 " + min
                });
            });
        };

        _this.validate = function () {
            // return null;
            var _this$props3 = _this.props,
                field = _this$props3.field,
                index = _this$props3.index,
                onValidate = _this$props3.onValidate,
                max = _this$props3.max;
            var _this$state2 = _this.state,
                value = _this$state2.value,
                required = _this$state2.required;
            //设置校验规则

            var descriptor = _defineProperty({}, field, { type: "number", required: required });
            value = parseFloat(value);
            var validator = new _asyncValidator2["default"](descriptor);
            validator.validate(_defineProperty({}, field, value), function (errors, fields) {
                if (errors || value > max) {
                    _this.setState({
                        error: true
                    });
                } else {
                    _this.setState({
                        error: false
                    });
                }
                onValidate && onValidate(errors, field, fields, index);
            });
        };

        _this.state = {
            value: props.value, //组件的值
            flag: false, //是否编辑过
            error: false, //校验是否有错误
            message: props.message,
            required: props.required
        };
        _this._value = props.value;
        return _this;
    }

    /**
     *  参数发生变化回调
     *
     * @param {object} nextProps 即将更新Props
     * @param {object} nextState 即将更新State
     * @memberof NumberField
     */


    NumberField.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        //当校验外部发生变化，主动校验函数
        if (nextProps.validate == true) {
            this.validate();
        }
    };

    /**
     * 有输入值改变的回调
     *
     * @param {string} value
     */


    /**
     * 校验方法
     *
     */


    /**
     * 校验方法
     *
     */


    NumberField.prototype.render = function render() {
        var _state = this.state,
            value = _state.value,
            error = _state.error,
            flag = _state.flag,
            required = _state.required,
            message = _state.message;
        var _props = this.props,
            className = _props.className,
            iconStyle = _props.iconStyle,
            max = _props.max,
            min = _props.min,
            step = _props.step,
            precision = _props.precision,
            onBlur = _props.onBlur,
            disabled = _props.disabled;


        return _react2["default"].createElement(
            _FieldWrap2["default"],
            {
                required: required,
                error: error,
                message: message,
                flag: flag
            },
            _react2["default"].createElement(_beeInputNumber2["default"], {
                prefixCls: 'ac-input-number',
                className: className,
                value: value,
                onChange: this.handlerChange,
                iconStyle: iconStyle,
                step: step,
                max: max,
                min: min,
                precision: precision,
                onBlur: onBlur,
                autoFocus: true,
                disabled: disabled
            })
        );
    };

    return NumberField;
}(_react.Component);

NumberField.propTypes = propTypes;
NumberField.defaultProps = defaultProps;
exports["default"] = NumberField;
module.exports = exports['default'];