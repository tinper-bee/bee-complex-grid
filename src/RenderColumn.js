
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './RowField/TextField';
import NumberField from './RowField/NumberField';
import SelectField from './RowField/SelectField';
import DateField from './RowField/DateField';
import YearField from './RowField/YearField';
import RenderCell from './RenderCell';
// import ToolTip from 'bee-tooltip';
import { Tooltip } from '@tinper/next-ui'
const prefix = 'wui'

const propTypes = {
    onChange: PropTypes.func,
    filedProps: PropTypes.object,//filed属性
    
}

const defaultProps = {
    onChange: () => { },
    filedProps: {}
}

class RenderColumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    getValue = (text) => {
        let { type, filedProps } = this.props;
        let { options = [], defaultValue } = filedProps;
        let value = defaultValue != undefined ? defaultValue : '';
        if (type && type == 'select') {
            options.forEach(item => {
                if (item.value == text) {
                    value = item.key
                }
            });
        } else {
            value = text;
        }
        return value;
    }

    onChange = (index, dataIndex, value) => {
        this.getValue(value);
        this.props.onChange(index, dataIndex, value);
    }
    onRef=(ref)=>{
        this.customizeRender = ref
    }
    /**
     * 渲染组件函数
     * @returns JSX
     */
    renderComp = () => {
        let { type, value, index, dataIndex,
            textAlign, validate, disabled,
            required, pattern, patternMessage,
            customizeRender, valueField,
            filedProps,onValidate,defaultValue,record,forceRenderColumn,fieldid
        } = this.props;
        let placement = 'left';
        if (textAlign) placement = textAlign == 'center' ? 'bottom' : textAlign;
        if (customizeRender) {
            let customizeRenderText = this.customizeRender&&this.customizeRender.customizeRenderText;
            let customText = customizeRenderText&&customizeRenderText({
                ...filedProps,
                value,
                field: dataIndex,
                record,
                index
            });
            let text = value,overlay = value;
            if(customText){
                if(Object.prototype.toString.call(customText)=='[object Object]'){
                    overlay = customText.overlay;
                    text = customText.text;
                }else if(Object.prototype.toString.call(customText)=='[object String]'){
                    text = customText;
                    overlay = customText;
                }
            }
            return (
                <div>
                    {
                        forceRenderColumn?<span style={{'display':'none'}}>
                        {
                            React.cloneElement(customizeRender, {
                                valueField: valueField,
                                textAlign: textAlign,
                                field: dataIndex,
                                validate: validate,
                                required: required,
                                value: value,
                                index:index,
                                record:record,
                                onChange: (field, v) => { this.props.onChange(index, dataIndex, v) },
                                onValidate:onValidate,
                                onRef:this.onRef,
                                ...filedProps,
                            })
                        }
                        </span>:''
                    }
                    {
                        disabled ?
                            <Tooltip overlay={overlay} inverse placement={placement}>
                                <span className={`${prefix}-edit-grid-cell`}>{text}</span>
                            </Tooltip>:<RenderCell type='refer' overlay={overlay} text={text} textAlign={textAlign}>
                                {
                                    React.cloneElement(customizeRender, {
                                        valueField: valueField,
                                        textAlign: textAlign,
                                        field: dataIndex,
                                        validate: validate,
                                        required: required,
                                        value: value,
                                        index:index,
                                        record:record,
                                        onChange: (field, v) => { this.props.onChange(index, dataIndex, v) },
                                        onValidate:onValidate,
                                        onRef:this.onRef,
                                        ...filedProps,
                                    })
                                }
                            </RenderCell>
                    }
                </div>)
        } else {
            switch (type) {
                case 'inputNumber':
                    return (<div>
                        {
                            disabled ?
                                <Tooltip overlay={value} inverse placement={placement}>
                                    <span className={`${prefix}-edit-grid-cell`}>{value}</span>
                                </Tooltip>
                                : <RenderCell text={value} textAlign={textAlign}>
                                    <NumberField
                                        textAlign={textAlign}
                                        field={dataIndex}
                                        validate={validate}
                                        required={required}
                                        value={value}
                                        pattern={pattern}
                                        patternMessage={patternMessage}
                                        onChange={(field, v) => { this.props.onChange(index, dataIndex, v) }}
                                        onValidate={onValidate}
                                        index={index}
                                        {...filedProps}
                                    />
                                </RenderCell>
                        }
                    </div>);
                    break;
                case 'input':
                    return (<div>
                        {
                            disabled ?
                                <Tooltip overlay={value} inverse placement={placement}>
                                    <span className={`${prefix}-edit-grid-cell`}>{value}</span>
                                </Tooltip>
                                : <RenderCell text={value} textAlign={textAlign}>
                                    <TextField
                                        textAlign={textAlign}
                                        field={dataIndex}
                                        validate={validate}
                                        required={required}
                                        value={value}
                                        pattern={pattern}
                                        patternMessage={patternMessage}
                                        onChange={(field, v) => { this.props.onChange(index, dataIndex, v) }}
                                        onValidate={onValidate}
                                        index={index}
                                        {...filedProps}
                                    />
                                </RenderCell>
                        }
                    </div>);
                    break;
                case 'select':
                    value = value ? value : filedProps.defaultValue;
                    return (<div>
                        {
                            disabled ?
                                <Tooltip inverse placement={placement} overlay={this.getValue(value)}>
                                    <span className={`${prefix}-edit-grid-cell`}>{this.getValue(value)}</span>
                                </Tooltip>
                                : <RenderCell text={this.getValue(value)} textAlign={textAlign}>
                                    <SelectField
                                        textAlign={textAlign}
                                        data={filedProps.options || []}
                                        field={dataIndex}
                                        validate={validate}
                                        required={required}
                                        value={value}
                                        onChange={(field, v) => { this.onChange(index, dataIndex, v) }}
                                        onValidate={onValidate}
                                        index={index}
                                        {...filedProps}
                                        fieldid={fieldid ? fieldid : undefined}
                                    />
                                </RenderCell>
                        }
                    </div>
                    )
                    break;
                case 'datepicker':
                    return (<div>
                        {
                            disabled ?
                                <Tooltip overlay={value} inverse placement={placement}>
                                    <span className={`${prefix}-edit-grid-cell`}>{value}</span>
                                </Tooltip>
                                : <RenderCell text={value} textAlign={textAlign}>
                                    <DateField
                                        textAlign={textAlign}
                                        field={dataIndex}
                                        validate={validate}
                                        required={required}
                                        value={value}
                                        pattern={pattern}
                                        patternMessage={patternMessage}
                                        onChange={(field, v) => { this.props.onChange(index, dataIndex, v) }}
                                        onValidate={onValidate}
                                        index={index}
                                        {...filedProps}
                                    />
                                </RenderCell>
                        }
                    </div>);
                    break;
                case 'year':
                    return (<div>
                        {
                            disabled ?
                                <Tooltip overlay={value} inverse placement={placement}>
                                    <span className={`${prefix}-edit-grid-cell`}>{value}</span>
                                </Tooltip>
                                : <RenderCell text={value} textAlign={textAlign}>
                                    <YearField
                                        textAlign={textAlign}
                                        field={dataIndex}
                                        validate={validate}
                                        required={required}
                                        value={value}
                                        pattern={pattern}
                                        patternMessage={patternMessage}
                                        onChange={(field, v) => { this.props.onChange(index, dataIndex, v) }}
                                        onValidate={onValidate}
                                        index={index}
                                        {...filedProps}
                                    />
                                </RenderCell>
                        }
                    </div>);
                    break;
            }
        }
    }
    render () {
        return (
            <div>
                {this.renderComp()}
            </div>
        );
    }
}


RenderColumn.propTypes = propTypes;
RenderColumn.defaultProps = defaultProps;
export default RenderColumn;
