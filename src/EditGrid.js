import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from "./Grid";
import cloneDeep from 'lodash.clonedeep';
import isequal from 'lodash.isequal';
import RenderColumn from './RenderColumn';
import Tooltip from 'bee-tooltip';

const propTypes = {
    onChange: PropTypes.func,//数据改变回调
    clsfix: PropTypes.string,
    disabled: PropTypes.bool,//是否可编辑
}

const defaultProps = {
    clsfix: 'u-edit-grid',
    data: [],
    columns: [],
    onChange: () => { },
};

class EditGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            data: props.data || [],
            selectData: [],//选中的数据
            selectDataIds: [],//记录选中数据的id，id在这里生成，componentWillReceiveProps更新data时，设置选中的数据
            defaultValueKeyValue: {},//带默认值的key，value键值对
        }
        this.selectDataId = 1;
        this.errors = {};
    }

    componentWillMount () {
        this.setDataColumn(this.props.disabled, this.state.columns, this.state.data)
    }

    componentWillReceiveProps (nextProps) {
        if (!isequal(nextProps.data, this.state.data)) {
            let selectDataIds = this.state.selectDataIds;
            nextProps.data.forEach((item, index) => {
                item.index = index + 1;
                if (selectDataIds.indexOf(item.selectDataId) != -1) item._checked = true;
            })
            this.setState({
                data: nextProps.data
            })
        }
        if ('disabled' in nextProps) {
            this.setDataColumn(nextProps.disabled, nextProps.columns, nextProps.data)
        }
    }

    onValidate=(errors,filed,fileds,index)=>{
        let current = this.errors[index]||{};
        if(errors){
            current[filed] = errors[0].message;
        }else{
           delete current[filed];
        }
        this.errors[index] = current;
        console.log(this.errors)
    }
    validate = ()=>{
        if(Object.keys(this.errors).length){
            return this.errors;
        }else{
            return null;
        }
    }
    
    setDataColumn = (disabled, col, da) => {
        let columns = cloneDeep(col);
        let defaultValueKeyValue = {};
        columns.forEach(item => {
            item.oldRender = item.render;
            if (item.renderType || item.customizeRender) {
                // 不可编辑态，不显示必填*
                if (disabled && item.required) {
                    item.required = false;
                }
                if (item.filedProps && (item.filedProps.defaultValue != undefined)) defaultValueKeyValue[item.dataIndex] = item.filedProps.defaultValue;
                item.render = (text, record, index) => {
                    return <RenderColumn
                        valueField={item.valueField}
                        config={item.config}
                        textAlign={item.textAlign}
                        type={item.renderType}
                        index={index}
                        dataIndex={item.dataIndex}
                        value={text}
                        options={item.options}
                        onChange={this.onChange}
                        validate={item.validate}
                        required={item.required}
                        pattern={item.pattern}
                        patternMessage={item.patternMessage}
                        disabled={disabled ? true : item.disabled}
                        customizeRender={item.customizeRender}
                        onValidate={this.onValidate}
                        filedProps={item.filedProps}
                    />
                }
            } else {
                if(typeof item.oldRender == 'function'&&((item.oldRender.toString().indexOf('colSpan')!=-1)||(item.oldRender.toString().indexOf('rowSpan')!=-1))){
                    item.render = item.oldRender
                }else{
                    item.render = (text, record, index) => {
                        let value = typeof item.oldRender == 'function' ? item.oldRender(text, record, index) : text;
                        let placement = 'left';
                        if (item.textAlign) placement = item.textAlign == 'center' ? 'bottom' : item.textAlign;
                        return <Tooltip overlay={value} inverse placement={placement}>
                            <span className='ac-grid-cell'>{value}</span>
                        </Tooltip>
                    }
                }
                
            }
        });
        this.setState({
            columns,
            defaultValueKeyValue
        })
        //给data加index
        let data = cloneDeep(da);
        if (data[0] && data[0].index == 1) {
        } else {
            data.forEach((item, index) => {
                item.index = index + 1
            })
            this.setState({
                data
            })
        }
    }

    onChange = (index, key, value) => {
        //改变data
        let data = cloneDeep(this.state.data);
        data[index][key] = value;
        this.setState({
            data: data
        })
        this.props.onChange(data);
    }

    //选中数据的回调
    getSelectedDataFunc = (selectData) => {
        let data = this.resetChecked(this.state.data)
        let selectDataIds = []
        selectData.forEach((item) => {
            data[item.index - 1]._checked = !data[item.index - 1]._checked;
            let id = 'selectDataId' + this.selectDataId;
            data.selectDataId = id;
            selectDataIds.push(id);
            this.selectDataId++;
        })
        this.setState({
            selectDataIds,
            selectData,
            data
        })
        this.props.onChange(data);
    }

    resetChecked = (dataValue) => {
        let data = cloneDeep(dataValue);
        data.forEach((item, index) => {
            item._checked = false
            item.index = index + 1,
                item.key = index + 1 + ''
        })
        return data
    }

    render () {
        const { className, exportData, columns: cl, data: propsData, ...otherProps } = this.props;
        let { data, columns } = this.state;
        let _exportData = exportData || data;
        return (
            <Grid
                height={40}
                {...otherProps}
                className={classNames("u-edit-grid", className)}
                noReplaceColumns={true}
                columns={columns}
                data={data}
                exportData={_exportData}
                autoCheckedByClickRows={false}
                getSelectedDataFunc={this.getSelectedDataFunc}
            />
        );
    }
}

EditGrid.defaultProps = defaultProps;
EditGrid.propTypes = propTypes;
export default EditGrid;