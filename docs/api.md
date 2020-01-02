# 复杂表格 Grid

## Grid 功能演示系统
- [这里有最全的 Grid 功能介绍，可帮助你快速了解 Grid 组件所具有的能力特性，并助力开发者快速复现问题。](http://grid.yanshi.app.yyuap.com/)

## 何时使用
当需要复杂表格展示数据的时候

## 如何使用

```

import Grid, {EditGrid} from 'bee-complex-grid';
import 'bee-complex-grid/build/Grid.css';

```

## 代码演示

## API
[Table 基础 API 参考](http://bee.tinper.org/tinper-bee/bee-table#Table%20props)，下面是 Grid 扩展的 API ：

### Grid 

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|paginationObj|表格分页，具体参考[分页API](http://bee.tinper.org/bee-pagination#bee-pagination)|Object|{activePage: 1, total: 0,items:1} <br/> `horizontalPosition` : 分页组件的对齐方式。默认值是 `left` ，可以设置为 `center`、`right`。 <br/> `verticalPosition` ：分页组件位于表格上方还是下方。默认值是 `bottom` ，可以设置为 `top`, 当值为 `none` 时不显示分页|
|multiSelect|是否开启多选功能或单选功能。`multiSelect={{ type:"radio" }}` 时为单选表格，`multiSelect={{ type:"checkbox" }}` 时为多选表格，传其他值时均为普通表格|Object|{ type:"checkbox" }|
|showHeaderMenu|设置为 `false` 时，会隐藏表头的下拉菜单和右上角的列过滤面板。默认显示。|boolean|true|
|showFilterMenu|设置为 `true` 时，表头下拉菜单中会显示 “打开/关闭行过滤” 的选项。行过滤：即按条件或值筛选行数据源`data`的功能。（备注：在 showHeaderMenu 值为 true 时有效）|boolean|false|
|columnFilterAble|设置为 `false` 时，会隐藏右上角的列过滤面板，并且非固定列的表头的下拉菜单中不会显示“隐藏”选项。隐藏：即动态隐藏选中的非固定列。|boolean|true|
|exportFileName【excel】| 设置导出excel 的文件名称 | string | -- |
|sheetName【excel】| 设置导出excel 的sheet的名称 | string | -- |
|sheetIsRowFilter【excel】| 是否要设置数据的行高 | boolean | false |
|sheetHeader【excel】| 设置导出excel 的Head的高度 | Object | eg:height:30, //设置高度ifshow:false //是否显示 |
|resetColumns|重置columns|function|this.refs.grid.resetColumns(columns)|
|exportData|要导出的数据源|array	|-|
|afterRowFilter|行过滤菜单显示隐藏时的回调函数，第一个参数会返回当前行过滤展开关闭状态|Function	|-|
|noReplaceColumns|重置column内容|boolean	|false|
|canSum |是否开启合计功能|boolean	|false|

### EditGrid 编辑表格

|参数|说明|类型|默认值|版本|
|:---|:-----|:----|:------|:----|
|onChange|数据改变、选中时的回调|function|-| bee-complex-grid@2.0.28 新增 |
|disabled|是否可编辑|bool|-| bee-complex-grid@2.0.28 新增 |

### Column 列属性

使用  `<Grid /> ` 请参考 ：

|参数|说明|类型|默认值|
|:--|:---|:--|:---| 
|exportHidden|是否在导出中隐藏此列|boolean	|false|
|exportKey|单独设置当前列的key[eg:性别 返回字段中 table 使用 id ，而导出中使用 name ]|string	|-|
|width|如果设置为百分比，导出的时候默认宽度为 100px | %	| 百分比 |

使用  `<EditGrid /> ` 请参考 ：

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|renderType|表单类型|目前支持 `input/inputNumber/select/datepicker/year`，正在继续完善，不写则不render成表单|-|
|customizeRender|自定义render表单元素，此组件封装要遵循的规则较多，目前已封装`ac-grids-refer-field` mdf-refer参照使用的render，[组件参考地址](https://github.com/tinper-acs/ac-grids-refer-field)，文档持续完善|node|-|
|validate|是否校验|bool|-|
|required|是否必填|bool|-|
|message|必填校验失败错误信息|string|-|
|pattern|校验正则|RegExp|-|
|patternMessage|正则校验错误信息|string|-|
|filedProps|传给`field`的属性，`field` 这里代表渲染出来的表单组件。例如：`type:"input"`，则 FormControl 即为 `field` ，具体的 API 说明参考下表|string|-|

### Column.filedProps 

使用  `<EditGrid /> ` 有效 ：

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|defaultValue|新增时默认值|string|-|
|disabled|字段是否禁止输入|bool|-|
|maxLength|最大长度，type=`input`时生效|string|-|
|placeholder|输入框的提示信息，type=`input`时生效|string|-|
|options|type=`select` 时的下拉内容|bool|-|
|precision|小数点后保留几位小数，type=`inputNumber`生效|number|-|
|max|最大值，type=`inputNumber`生效|number|-|
|min|最小值，type=`inputNumber`生效|number|-|
|step|步进值，type=`inputNumber`生效|number|-|

### GridToolbar 操作栏

|参数|说明|类型|默认值|
|:--|:---|:--|:---| 
|toolBtns|按钮组,数组元素中单个按钮属性可以参考[button](http://bee.tinper.org/tinper-bee/bee-button)当按钮属性中含有children属性，会自动解析成dropdown按钮。|array	|[]|
|btnSize|按钮的尺寸,默认是小尺寸行高为26px（sm、lg、xg）|string	|'sm'|

###  导出 Excel 使用方法

```js
  exportExcel=()=>{
    this.refs.grid.exportExcel();
  }
  
```

## 注意事项

 - `EditGrid` 在使用 `renderType` 时，不支持自定义行列合并

## 更新日志
