# 复杂表格 Grid

## 何时使用
当需要复杂表格展示数据的时候

## 如何使用

```

import Grid from 'bee-complex-grid';
import 'bee-complex-grid/build/Grid.css';

```

## 代码演示

## API
table相关API参考[这里](https://design.yonyoucloud.com/tinper-bee/bee-table),下面是Grid扩充的API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|paginationObj|表格分页，具体参考[分页API](http://bee.tinper.org/bee-pagination#bee-pagination)|Object|{activePage: 1, total: 0,items:1}horizontalPosition:分页条的对齐方式是left可以为center、right。verticalPosition为bottom或者top,当值为'none'时不显示分页|
|showHeaderMenu|是否显示表头菜单(动态设置显示隐藏、锁定解锁)|boolean|true|
|multiSelect|是否显示多选功能或单选功能，multiSelect={{type:"radio"}}时为单选表格，multiSelect={{type:"checkbox"}}时为多选表格，传其他值时均为普通表格|Object|{type:"checkbox"}|
|showFilterMenu|是否显示行过滤菜单|boolean|false|
|columnFilterAble|是否显示列过滤功能|boolean|true|
|exportFileName【excel】| 设置导出excel 的文件名称 | string | -- |
|sheetName【excel】| 设置导出excel 的sheet的名称 | string | -- |
|sheetIsRowFilter【excel】| 是否要设置数据的行高 | boolean | false |
|sheetHeader【excel】| 设置导出excel 的Head的高度 | Object | eg:height:30, //设置高度ifshow:false //是否显示 |
|resetColumns|重置columns|function|this.refs.grid.resetColumns(columns)|
|exportData|要导出的数据源|array	|-|
|afterRowFilter|行过滤菜单显示隐藏时的回调函数，第一个参数会返回当前行过滤展开关闭状态|Function	|-|
|noReplaceColumns|重置column内容|boolean	|false|
|canSum |是否开启合计功能|boolean	|false|



### Column(新增)

|参数|说明|类型|默认值|
|:--|:---|:--|:---| 
|exportHidden|是否在导出中隐藏此列|boolean	|false|
|exportKey|单独设置当前列的key[eg:性别 返回字段中 table 使用 id ，而导出中使用 name ]|string	|-|
|width|如果设置为百分比，导出的时候默认宽度为 100px | %	| 百分比 |


###  导出excel 使用

```js
  exportExcel=()=>{
    this.refs.grid.exportExcel();
  }

  
```

### GridToolbar操作栏
|参数|说明|类型|默认值|
|:--|:---|:--|:---| 
|toolBtns|按钮组,数组元素中单个按钮属性可以参考[button](http://bee.tinper.org/tinper-bee/bee-button)当按钮属性中含有children属性，会自动解析成dropdown按钮。|array	|[]|
|btnSize|按钮的尺寸,默认是小尺寸行高为26px（sm、lg、xg）|string	|'sm'|

## 注意事项
如果将表头的 title 设置为 Icon 图标，需要给该自定义图标传递属性： className = "custom-icon"，实现代码如下：
```
const columns = [{
                  title: <Icon className="custom-icon" type="uf-add-c-o"/>,
                  dataIndex: "orderCode",
                  key: "orderCode",
                  width: 150
                }]
```

## 更新日志
