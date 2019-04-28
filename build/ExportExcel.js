"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require("script-loader!file-saver");
require("script-loader!xlsx/dist/xlsx.core.min");
require("script-loader!blob.js/Blob");

/**
 * josn导出excel
 */
var changeData = function changeData(data, filter) {
  var sj = data,
      f = filter,
      re = [];
  Array.isArray(data) ? function () {
    //对象
    f ? function () {
      //存在过滤
      sj.forEach(function (obj) {
        var one = [];
        filter.forEach(function (no) {
          one.push(obj[no]);
        });
        re.push(one);
      });
    }() : function () {
      //不存在过滤
      sj.forEach(function (obj) {
        var col = Object.keys(obj);
        var one = [];
        col.forEach(function (no) {
          one.push(obj[no]);
        });
        re.push(one);
      });
    }();
  }() : function () {
    re = sj;
  }();
  return re;
};

// 转换数据
var sheetChangeData = function sheetChangeData(data) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === "number") cell.t = "n";else if (typeof cell.v === "boolean") cell.t = "b";else if (cell.v instanceof Date) {
        cell.t = "n";
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = "s";
      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);
  return ws;
};

var s2ab = function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff;
  }return buf;
};
var datenum = function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

var dataNormalization = function dataNormalization(dataArray, cloum) {
  var array = [];
  _extends(array, dataArray);
  var _max = 18,
      _min = 6,
      newArray = array.sort();
  var _dataMax = Number(newArray[newArray.length - 1]); //数据中最大值
  var _dataMin = Number(newArray[0]); //数据中最小值
  newArray = [];
  dataArray.map(function (da, index) {
    var _value = Number(da);
    var newValue = void 0;
    if (_dataMax == _dataMin) {
      newValue = _max;
    } else {
      newValue = _min + (_value - _dataMin) * ((_max - _min) / (_dataMax - _dataMin));
    }
    newArray.push(newValue);
  });
  //  console.log("OOOOO",newArray);
  return newArray;
};

//array 数据对象排序
var sortObjArray = function sortObjArray(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x - y;
    //或者 return x > y ? 1 : (x < y ? -1 : 0);
  });
};

var exportExcel = function exportExcel(options, fileName) {
  var _options = {
    // fileName: options.fileName || "download",
    fileName: fileName ? fileName : "download",
    datas: options.datas,
    workbook: {
      SheetNames: [],
      Sheets: {}
    }
  };

  var instance = {
    saveExcel: function saveExcel() {
      var wb = _options.workbook;
      _options.datas.forEach(function (data, index) {
        var sheetHeader = data.sheetHeader || null;
        var sheetData = data.sheetData;
        var sheetName = data.sheetName || "sheet" + (index + 1);
        var sheetFilter = data.sheetFilter || null;
        var columnAttr = data.columnAttr || [];
        var rowAttr = data.rowAttr || [];

        sheetData = changeData(sheetData, sheetFilter);

        if (sheetHeader) {
          sheetData.unshift(sheetHeader);
        }

        var ws = sheetChangeData(sheetData);

        ws["!merges"] = [];
        ws["!cols"] = columnAttr;
        ws['!rows'] = rowAttr;
        // console.log("ws : ",ws);
        wb.SheetNames.push(sheetName);
        wb.Sheets[sheetName] = ws;
      });

      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: false,
        type: "binary"
      });
      saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
      }), _options.fileName + ".xlsx");
    }
  };

  return instance;
};

module.exports = exportExcel;