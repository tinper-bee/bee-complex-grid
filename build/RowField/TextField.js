'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _FieldWrap = require('./FieldWrap');

var _FieldWrap2 = _interopRequireDefault(_FieldWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Text (文本输入框)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//React导入

//类型校验

//验证组件 https://www.npmjs.com/package/async-validator

//Tinper-bee


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
    validate: _propTypes2["default"].bool
};

//默认参数值
var defaultProps = {
    field: '',
    index: '',
    message: '请输入此字段',
    data: [],
    required: false,
    isFlag: false,
    validate: false,
    className: ''
};

var TextField = function (_Component) {
    _inherits(TextField, _Component);

    /**
     * Creates an instance of TextField.
     * @param {*} props
     * @memberof TextField
     */
    function TextField(props) {
        _classCallCheck(this, TextField);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.handlerChange = function (value) {
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                field = _this$props.field,
                index = _this$props.index,
                status = _this$props.status;
            //处理是否有修改状态改变、状态同步之后校验输入是否正确

            _this.setState({ value: value, flag: status == 'edit' }, function () {
                _this.validate();
            });
            //回调外部函数
            onChange && onChange(field, value, index);
        };

        _this.validate = function () {
            var _this$props2 = _this.props,
                required = _this$props2.required,
                field = _this$props2.field,
                index = _this$props2.index,
                onValidate = _this$props2.onValidate,
                pattern = _this$props2.pattern,
                patternMessage = _this$props2.patternMessage;
            var value = _this.state.value;
            //设置校验规则

            var descriptor = _defineProperty({}, field, [{ type: "string", required: required }]);
            if (pattern) {
                descriptor[field].push({
                    pattern: pattern, message: patternMessage
                });
            }
            var validator = new _asyncValidator2["default"](descriptor);
            validator.validate(_defineProperty({}, field, value), function (errors, fields) {
                if (errors) {
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
            value: props.value,
            flag: false,
            error: false
        };
        return _this;
    }
    /**
     *  参数发生变化回调
     *
     * @param {object} nextProps 即将更新Props
     * @param {object} nextState 即将更新State
     * @memberof NumberField
     */


    TextField.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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


    TextField.prototype.render = function render() {
        var _state = this.state,
            value = _state.value,
            error = _state.error,
            flag = _state.flag;
        var _props = this.props,
            className = _props.className,
            message = _props.message,
            required = _props.required,
            onBlur = _props.onBlur,
            pattern = _props.pattern,
            patternMessage = _props.patternMessage,
            maxLength = _props.maxLength,
            placeholder = _props.placeholder,
            disabled = _props.disabled;


        return _react2["default"].createElement(
            _FieldWrap2["default"],
            {
                required: required,
                error: error,
                message: pattern ? patternMessage : message,
                flag: flag
            },
            _react2["default"].createElement(_beeFormControl2["default"], {
                className: className + ' triangle-element',
                value: value,
                onChange: this.handlerChange,
                onBlur: onBlur,
                maxLength: maxLength,
                placeholder: placeholder,
                disabled: disabled
            })
        );
    };

    return TextField;
}(_react.Component);

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;
exports["default"] = TextField;
module.exports = exports['default'];