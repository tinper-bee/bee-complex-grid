'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isequal');

var _lodash4 = _interopRequireDefault(_lodash3);

var _RenderColumn = require('./RenderColumn');

var _RenderColumn2 = _interopRequireDefault(_RenderColumn);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    onChange: _propTypes2["default"].func, //数据改变回调
    clsfix: _propTypes2["default"].string,
    disabled: _propTypes2["default"].bool //是否可编辑
};

var defaultProps = {
    clsfix: 'u-edit-grid',
    data: [],
    columns: [],
    onChange: function onChange() {}
};

var EditGrid = function (_Component) {
    _inherits(EditGrid, _Component);

    function EditGrid(props) {
        _classCallCheck(this, EditGrid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onValidate = function (errors, filed, fileds, index) {
            var current = _this.errors[index] || {};
            if (errors) {
                current[filed] = errors[0].message;
            } else {
                delete current[filed];
            }
            _this.errors[index] = current;
            console.log(_this.errors);
        };

        _this.validate = function () {
            if (Object.keys(_this.errors).length) {
                return _this.errors;
            } else {
                return null;
            }
        };

        _this.setDataColumn = function (disabled, col, da) {
            var columns = (0, _lodash2["default"])(col);
            var defaultValueKeyValue = {};
            columns.forEach(function (item) {
                item.oldRender = item.render;
                if (item.renderType || item.customizeRender) {
                    // 不可编辑态，不显示必填*
                    if (disabled && item.required) {
                        item.required = false;
                    }
                    if (item.filedProps && item.filedProps.defaultValue != undefined) defaultValueKeyValue[item.dataIndex] = item.filedProps.defaultValue;
                    item.render = function (text, record, index) {
                        return _react2["default"].createElement(_RenderColumn2["default"], {
                            valueField: item.valueField,
                            config: item.config,
                            textAlign: item.textAlign,
                            type: item.renderType,
                            index: index,
                            dataIndex: item.dataIndex,
                            value: text,
                            options: item.options,
                            onChange: _this.onChange,
                            validate: item.validate,
                            required: item.required,
                            pattern: item.pattern,
                            patternMessage: item.patternMessage,
                            disabled: disabled ? true : item.disabled,
                            customizeRender: item.customizeRender,
                            onValidate: _this.onValidate,
                            filedProps: item.filedProps
                        });
                    };
                } else {
                    if (typeof item.oldRender == 'function' && (item.oldRender.toString().indexOf('colSpan') != -1 || item.oldRender.toString().indexOf('rowSpan') != -1)) {
                        item.render = item.oldRender;
                    } else {
                        item.render = function (text, record, index) {
                            var value = typeof item.oldRender == 'function' ? item.oldRender(text, record, index) : text;
                            var placement = 'left';
                            if (item.textAlign) placement = item.textAlign == 'center' ? 'bottom' : item.textAlign;
                            return _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { overlay: value, inverse: true, placement: placement },
                                _react2["default"].createElement(
                                    'span',
                                    { className: 'ac-grid-cell' },
                                    value
                                )
                            );
                        };
                    }
                }
            });
            _this.setState({
                columns: columns,
                defaultValueKeyValue: defaultValueKeyValue
            });
            //给data加index
            var data = (0, _lodash2["default"])(da);
            if (data[0] && data[0].index == 1) {} else {
                data.forEach(function (item, index) {
                    item.index = index + 1;
                });
                _this.setState({
                    data: data
                });
            }
        };

        _this.onChange = function (index, key, value) {
            //改变data
            var data = (0, _lodash2["default"])(_this.state.data);
            data[index][key] = value;
            _this.setState({
                data: data
            });
            _this.props.onChange(data);
        };

        _this.getSelectedDataFunc = function (selectData) {
            var data = _this.resetChecked(_this.state.data);
            var selectDataIds = [];
            selectData.forEach(function (item) {
                data[item.index - 1]._checked = !data[item.index - 1]._checked;
                var id = 'selectDataId' + _this.selectDataId;
                data.selectDataId = id;
                selectDataIds.push(id);
                _this.selectDataId++;
            });
            _this.setState({
                selectDataIds: selectDataIds,
                selectData: selectData,
                data: data
            });
            _this.props.onChange(data);
        };

        _this.resetChecked = function (dataValue) {
            var data = (0, _lodash2["default"])(dataValue);
            data.forEach(function (item, index) {
                item._checked = false;
                item.index = index + 1, item.key = index + 1 + '';
            });
            return data;
        };

        _this.state = {
            columns: props.columns,
            data: props.data || [],
            selectData: [], //选中的数据
            selectDataIds: [], //记录选中数据的id，id在这里生成，componentWillReceiveProps更新data时，设置选中的数据
            defaultValueKeyValue: {} //带默认值的key，value键值对
        };
        _this.selectDataId = 1;
        _this.errors = {};
        return _this;
    }

    EditGrid.prototype.componentWillMount = function componentWillMount() {
        this.setDataColumn(this.props.disabled, this.state.columns, this.state.data);
    };

    EditGrid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!(0, _lodash4["default"])(nextProps.data, this.state.data)) {
            var selectDataIds = this.state.selectDataIds;
            nextProps.data.forEach(function (item, index) {
                item.index = index + 1;
                if (selectDataIds.indexOf(item.selectDataId) != -1) item._checked = true;
            });
            this.setState({
                data: nextProps.data
            });
        }
        if ('disabled' in nextProps) {
            this.setDataColumn(nextProps.disabled, nextProps.columns, nextProps.data);
        }
    };

    //选中数据的回调


    EditGrid.prototype.render = function render() {
        var _props = this.props,
            className = _props.className,
            exportData = _props.exportData,
            cl = _props.columns,
            propsData = _props.data,
            otherProps = _objectWithoutProperties(_props, ['className', 'exportData', 'columns', 'data']);

        var _state = this.state,
            data = _state.data,
            columns = _state.columns;

        var _exportData = exportData || data;
        return _react2["default"].createElement(_Grid2["default"], _extends({
            height: 40
        }, otherProps, {
            className: (0, _classnames2["default"])("u-edit-grid", className),
            noReplaceColumns: true,
            columns: columns,
            data: data,
            exportData: _exportData,
            autoCheckedByClickRows: false,
            getSelectedDataFunc: this.getSelectedDataFunc
        }));
    };

    return EditGrid;
}(_react.Component);

EditGrid.defaultProps = defaultProps;
EditGrid.propTypes = propTypes;
exports["default"] = EditGrid;
module.exports = exports['default'];