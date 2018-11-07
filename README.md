# bee-complex-grid

[![npm version](https://img.shields.io/npm/v/bee-complex-grid.svg)](https://www.npmjs.com/package/bee-complex-grid)
[![Build Status](https://img.shields.io/travis/tinper-bee/bee-complex-grid/master.svg)](https://travis-ci.org/tinper-bee/bee-complex-grid)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/bee-complex-grid/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/bee-complex-grid?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/bee-complex-grid.svg)](https://david-dm.org/tinper-bee/bee-complex-grid#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/bee-complex-grid.svg?style=flat)](https://npmjs.org/package/bee-complex-grid)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/bee-complex-grid.svg)](http://isitmaintained.com/project/tinper-bee/bee-complex-grid "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/bee-complex-grid.svg)](http://isitmaintained.com/project/tinper-bee/bee-complex-grid "Percentage of issues still open")


##复杂表格

bee-complex-grid 是基于bee-table上封装，将多选、过滤、排序、分页、固定列等多功能基于一身。在使用bee-table实现复杂功能时，需要高级组件嵌套高级组件，使用起来经常有问题。有了bee-complex-grid ，用户仅需要引入Grid即可，大大减少代码量，提供代码质量。

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
import Grid from "bee-complex-grid";
const columns = [
  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
  {
    title: '操作', dataIndex: '', key: 'd', render() {
      return <a href="#">一些操作</a>;
    },
  },
];

const data = [
  { a: '令狐冲', b: '男', c: 41, key: '1' },
  { a: '杨过', b: '男', c: 67, key: '2' },
  { a: '郭靖', b: '男', c: 25, key: '3' },
];

class Demo extends Component {
    render () {
        return (
              <Grid
              columns={columns}
              data={data}
              />
        )
    }
}
```

## API
table相关API参考[这里](http://bee.tinper.org/bee-table#bee-table),下面是Grid扩充的API
|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|paginationObj|表格分页，具体参考[分页API](http://bee.tinper.org/bee-pagination#bee-pagination)|Object|{activePage: 1, total: 1,items:1}
|showHeaderMenu|是否显示表头菜单(动态设置显示隐藏、锁定解锁)|boolean|false|
|multiSelect|是否含有多选框，multiSelect={false}时为每行不含有Checkbox|Object|{}|
|sheetName【excel】| 设置导出excel 的sheet的名称 | string | -- |
|sheetIsRowFilter【excel】| 是否要设置数据的行高 | boolean | false |
|sheetHeader【excel】| 设置导出excel 的Head的高度 | Object | eg:{{height:30, //设置高度ifshow:false //是否显示}} |


####  导出excel 使用

```js
  exportExcel=()=>{
    this.refs.grid.exportExcel();
  }
```

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/bee-complex-grid
$ cd bee-complex-grid
$ npm install
$ npm run dev
```
