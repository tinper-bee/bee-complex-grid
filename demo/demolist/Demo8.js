/**
 * @title EditGrid 编辑表格
 * @description disabled 参数控制是否可编辑，onChange 方法是表格数据更改后的回调函数，onValidate 方法用于提交前的数据校验。
 *
 */
import React, { Component } from "react";
import Grid from '../../src';
import Button from 'bee-button'

const EditGrid = Grid.EditGrid;

const column = [
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 150,
        renderType: 'input',
        required: true,
        validate: true,
        pattern: /^2$/,
        patternMessage: '格式错误',
        filedProps: {
            maxLength: '9'
        }
    },
    {
        title: "金额",
        dataIndex: "money",
        key: "money",
        width: 160,
        textAlign: 'right',
        renderType: 'inputNumber',
        required: true,
        validate: true,
        filedProps: {
            precision: 0
        }
    },
    {
        title: "类型",
        dataIndex: "type_name",
        key: "type_name",
        width: 100,
        renderType: 'select',
        required: true,
        validate: true,
        filedProps: {
            options: [
                {
                    key: '类型1', value: '1'
                },
                {
                    key: '类型2', value: '2'
                },
                {
                    key: '类型3', value: '3'
                },
            ]
        }
    },
    {
        title: "采购组织",
        dataIndex: "purchasing",
        key: "purchasing",
        width: 150
    },
    {
        title: "采购组",
        dataIndex: "purchasingGroup",
        key: "purchasingGroup",
        width: 300
    },
    {
        title: "凭证日期",
        dataIndex: "voucherDate",
        key: "voucherDate",
        width: 150
    },
    {
        title: "审批状态",
        dataIndex: "approvalState_name",
        key: "approvalState_name",
        width: 150
    },
    {
        title: "确认状态",
        dataIndex: "confirmState_name",
        key: "confirmState_name",
        width: 500
    },
    {
        title: "关闭状态",
        dataIndex: "closeState_name",
        key: "closeState_name",
        width: 150
    }
];
const dataList = [
    {
        orderCode: "11",
        supplierName: "xxx",
        type_name: "1",
        purchasing: "内行",
        purchasingGroup: "323",
        voucherDate: "kkkk",
        approvalState_name: "vvvv",
        confirmState_name: "aaaa",
        closeState_name: "vnnnnn",
        money: '1232.56',
        d: "操作",
        key: "1"
    },
    {
        orderCode: "22",
        supplierName: "22xxx",
        type_name: "2",
        purchasing: "内行2",
        purchasingGroup: "3223",
        voucherDate: "222kk",
        approvalState_name: "22vvvv",
        confirmState_name: "2aaaa",
        closeState_name: "2vnnnnn",
        money: '2341232.56',
        d: "2操作",
        key: "2"
    },
    {
        orderCode: "33",
        supplierName: "22xxx",
        type_name: "3",
        purchasing: "内行2",
        purchasingGroup: "3223",
        voucherDate: "222kk",
        approvalState_name: "22vvvv",
        confirmState_name: "2aaaa",
        closeState_name: "2vnnnnn",
        money: '122368732.56',
        d: "3操作",
        key: "3"
    },
    {
        orderCode: "44",
        supplierName: "22xxx",
        type_name: "3",
        purchasing: "内行2",
        purchasingGroup: "3223",
        voucherDate: "222kk",
        approvalState_name: "22vvvv",
        confirmState_name: "2aaaa",
        closeState_name: "2vnnnnn",
        money: '18765232.56',
        d: "4操作",
        key: "4"
    }
];

class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    onChange = (data) => {
        console.log('table的数据如下')
        console.log(data)
    }
    onDel = (data) => {
        console.log('删除的数据如下')
        console.log(data)
    }
    click = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    freshData = (pageIndex) => {
        console.log('跳转至第 ', pageIndex, ' 页');
    }

    onDataNumSelect = (index, value) => {
        console.log('index：', index, ' value：', value);
    }
    // {
    //   0:{
    //     key1:'errorMessage1',
    //     key2:'errorMessage',
    //   },
    //   1:{
    //     key1:'errorMessage'
    //   },
    // }
    onValidate=()=>{
        let errors = this.editGrid.validate();

        if(errors){
        console.log('有错误，错误信息如下');
        let errorMessage = '';
        Object.keys(errors).forEach(item=>{
            let current = errors[item];
            Object.keys(current).forEach(it=>{
            errorMessage+=`第${Number(item)+1}行的${it}校验失败，错误原因是：${current[it]};`
            })
        })
        console.log(errorMessage)
        }else{
        console.log('没有错误')
        }
    }

    render () {
        let paginationObj = {
            items: 10,
            total: 20,//总共多少条
            freshData: this.freshData,//点击下一页刷新的数据
            onDataNumSelect: this.onDataNumSelect, //每页大小改变触发的事件
            showJump: true,
            horizontalPosition: 'center'
        }
        return (
            <div className='edit-grid-demo'>
                <Button onClick={this.click} style={{ 'marginBottom': '20px' }} colors='primary'>
                    {this.state.disabled ? '设置可编辑' : '设置不可编辑'}
                </Button>
                <Button onClick={this.onValidate} style={{'marginBottom':'20px','marginLeft':'20px'}} colors='primary'>点我校验</Button>
                <EditGrid
                    columns={column}
                    data={dataList}
                    paginationObj={paginationObj}
                    multiSelect={true}
                    onChange={this.onChange}
                    disabled={this.state.disabled}
                    ref ={editGrid => this.editGrid = editGrid } 
                />
            </div>

        );
    }
}


export default Demo1;