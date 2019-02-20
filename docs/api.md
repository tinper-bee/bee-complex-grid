# Grid
## 代码演示
## API
table相关API参考[这里](http://bee.tinper.org/bee-table#bee-table),下面是Grid扩充的API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|paginationObj|表格分页，具体参考[分页API](http://bee.tinper.org/bee-pagination#bee-pagination)|Object|{activePage: 1, total: 0,items:1}horizontalPosition:分页条的对齐方式是left可以为center、right。verticalPosition为bottom或者top,当值为'none'时不显示分页|
|showHeaderMenu|是否显示表头菜单(动态设置显示隐藏、锁定解锁)|boolean|true|
|multiSelect|是否含有多选框，multiSelect={false}时为每行不含有Checkbox|Object|{}|
|showFilterMenu|是否显示行过滤菜单|boolean|false|
|columnFilterAble|是否显示列过滤功能|boolean|true|
|sheetName【excel】| 设置导出excel 的sheet的名称 | string | -- |
|sheetIsRowFilter【excel】| 是否要设置数据的行高 | boolean | false |
|sheetHeader【excel】| 设置导出excel 的Head的高度 | Object | eg:height:30, //设置高度ifshow:false //是否显示 |
|resetColumns|重置columns|function|this.refs.grid.resetColumns(columns)|
|exportData|要导出的数据源|array	|-|
|afterRowFilter|行过滤菜单显示隐藏时的回调函数，第一个参数会返回当前行过滤展开关闭状态|Function	|-|
|noReplaceColumns|重置column内容|boolean	|false|


### Column(新增)

|参数|说明|类型|默认值|
|:--|:---|:--|:---| 
|exportHidden|是否在导出中隐藏此列|boolean	|false|
|exportKey|单独设置当前列的key[eg:性别 返回字段中 table 使用 id ，而导出中使用 name ]|string	|-|


####  导出excel 使用

```js
  exportExcel=()=>{
    this.refs.grid.exportExcel();
  }

  
```


