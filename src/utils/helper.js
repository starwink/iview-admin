/**
 * @Author: damonliu
 * @Date:   2022-01-17T17:40:33+08:00
 * @Filename: helper.js
 * @Last modified by:   damonliu
 * @Last modified time: 2022-02-16T14:38:02+08:00
 */

// 工具方法
const dayjs = require('dayjs')
// import UaParser from 'ua-parser-js'
export default {
  //EXCEL导出
  exportFile: function(classArr, dowloadName) {
    // classArr表示多个table的类名
    //dowloadName 表示要下载的Excel的名字
    let html = "";
    for (var i = 0; i < classArr.length; i++) {
      html = html + document.querySelector("." + `${classArr[i]}`).outerHTML;
    }
    var htmlTemplate = `
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
    table th{
            height: 36px;
            text-align: center;
        }
        table td {
            height: 36px;
            text-align: center;
        }
    </style>
    <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name></x:Name><x:WorksheetOptions><x:Selected/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head>
    <body>
      <div class="onlyTable">
        ${html}
        </div>
    </body>
    </html>`;
    var blob = new Blob([htmlTemplate], { type: "application/octet-stream" });
    var link = document.getElementsByTagName("a")[0];
    link.href = URL.createObjectURL(blob);
    link.download = dowloadName + "类报表.xlsx";
    link.click();
  },

  exportEchart(echartInstance, title) {
    // https://echarts.apache.org/zh/api.html#echartsInstance.getDataURL
    let url = echartInstance.getDataURL({
      type: "png",
      pixelRatio: window.devicePixelRatio,
      backgroundColor: "white",
      //  可以忽略图表内一些组件
      excludeComponents: ["dataZoom"]
    })
    let alink = document.createElement("a")
    alink.href = url;
    alink.download = title
    alink.click();
  },

  /**
   * 对象值清空
   * @param {Object} data
   */
  resetForm: data => {
    Object.keys(data).map(key => {
      data[key] = "";
    });
  },
  formatDate: function() {
    Date.prototype.Format = function(fmt) {
      // author: meizz
      var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
  },
 
  extend: function() {
    var src,
      copyIsArray,
      copy,
      name,
      options,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && typeof target !== "function") {
      target = {};
    }
    if (i === length) {
      return target;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (copyIsArray = Array.isArray(copy))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src || {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  },
  replace: function() {
    var target = arguments[0] || {},
      i = 1,
      options,
      name,
      item,
      copy,
      length = arguments.length,
      deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    while (i < length) {
      options = arguments[i];
      if (options !== null && options !== undefined) {
        for (name in target) {
          item = target[name];
          copy = options[name];
          if (target === copy) continue;
          if (
            deep &&
            item &&
            typeof item === "object" &&
            !Array.isArray(item)
          ) {
            target[name] = this.replace(deep, item, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
      i++;
    }
    return target;
  },
  /**
   * 获取URL中参数
   * @param     {[type]}    url [description]
   * @return    {[type]}        [description]
   */
  getRequestParam: function(url) {
    var data = {},
      index,
      len,
      param;
    url = decodeURI(url || location.href);
    index = url.indexOf("?");
    if (index === -1) return data;
    url = url.substr(index + 1);
    url = url.slice(0, url.indexOf("#")).split("&");
    index = 0;
    len = url.length;
    while (index < len) {
      param = url[index].split("=");
      if (param.length > 0) {
        data[param[0]] = param[1];
      }
      index++;
    }
    return data;
  },
  /**
   * 返回对象数组里某个key的所有值
   * @param     {[Array]}    data     [description]
   * @param     {[string]}    key      [description]
   * @param     {Boolean||function}   isfilter [description]
   * @return    {[Array]}             [返回对象数组里某个key的所有值]
   */
  getArrayKeys: function(data, key, callback) {
    var k = 0,
      len = data.length,
      item,
      value,
      res,
      arr = [];
    if (Array.isArray(data) && typeof key === "string") {
      len = data.length;
      while (k < len) {
        item = data[k];
        value = item[key];
        if (
          callback === true &&
          value !== null &&
          value !== undefined &&
          value !== ""
        ) {
          arr.push(value);
        } else if (typeof callback === "function") {
          res = callback.call(item, value, k);
          if (res === false) return arr;
          arr.push(res || value);
        } else {
          arr.push(value);
        }
        k++;
      }
    }
    return arr;
  },
  getObjectKeys: function(items) {
    var k,
      len,
      item,
      data,
      args,
      arr = [];
    if (Array.isArray(items)) {
      args = Array.prototype.slice.call(arguments, 1);
      k = 0;
      len = items.length;
      while (k < len) {
        item = items[k];
        data = {};
        args.map(function(value) {
          data[value] = item[value];
        });
        arr.push(data);
        k++;
      }
    }
    return arr;
  },
  /**
   * 数字转千分位
   * num 需要转换的数字 fixed 小数点保留几位
   */
  thousands: function(num, fixed) {
    if (!fixed) fixed = 2;
    if (typeof num !== "number") num = Number(num);
    if (isNaN(num)) return "";
    num = num.toFixed(fixed).split(".");
    return [num[0].replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,"), num[1]].join(".");
  },
  /**
   * 排序
   * @param {[string]} key
   */
  keysort: function(key) {
    return function(a, b) {
      return Number(b[key] - a[key]);
    };
  },
  //导出表格以流的形式导出处理
  exportForm: function(res, name) {
    const link = document.createElement("a");
    let blob = new Blob([res], { type: "application/vnd.ms-excel" });
    link.style.display = "none";
    link.href = URL.createObjectURL(blob);
    link.download = `${name}` + ".xlsx"; //下载的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  flatten: function(arr) {
    while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
    }
    return arr;
  },
  getNumber: function(value) {
    return typeof value === "number" && !isNaN(value);
  },
  /**
   * 根据类型返回正则
   * @param str{string}: 检测的内容
   * @param type{string}: 检测类型
   */
  checkType: function (str, type) {
    const regexp = {
      'ip': /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/.test(str),
      'port': /^(\d|[1-5]\d{4}|6[1-4]\d{3}|65[1-4]\d{2}|655[1-2]\d|6553[1-5])$/.test(str),
      'phone': /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str), //手机号
      'number': /^[0-9]+$/.test(str), //是否全数字,
      'email': /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str),
      'IDCard': /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str),
      'url': /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str)
    };
    return regexp[type];
  },
  /**
  * 防抖
  * @param func {*}  执行函数
  * @param wait {*}  节流时间,毫秒
  */
 debounce: (func, wait) => {
   let timeout;
   return function () {
     let context = this;
     let args = arguments;

     if (timeout) clearTimeout(timeout);

     timeout = setTimeout(() => {
       func.apply(context, args)
     }, wait);
   }
 },

 /**
  * 节流
  * @param func {*}  执行函数
  * @param wait {*}  节流时间,毫秒
  */
 throttle: (func, wait) => {
   let previous = 0;
   return function () {
     let now = Date.now();
     let context = this;
     if (now - previous > wait) {
       func.apply(context, arguments);
       previous = now;
     }
   }
 },
 /**
  * [description] localStorage 本地存储
  * @param  {[type]} name [description]
  * @return {[type]}      [description]
  */
 getlocalStorage: function (name) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  setlocalStorage: function (name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  deletelocalStorage: function (name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
    getDate:(str,format='YYYY-MM-DD HH:mm:ss')=>{
        if (!str) {
            str =  dayjs().format(format)
        } else {
            str = dayjs(str).format(format)
        }
        return str;
    },
    getDateParams:(str,format='YYYY-MM-DD')=>{
        if (!str || str == 'Invalid date') {
            str = ''
        } else {
            str = dayjs(str).format(format)
        }
        return str;
    },
    getDateTimeWeek(val){
        let str='';
        if(val){
            str=dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        }else{
            str=dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        return `${str}  ${this.getCnWeek(val)}`;
    },
    getCnWeek(val){
        let map=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        let week=0;
        if(val){
            week=dayjs(val).format('d')
        }else{
            week=dayjs().format('d')
        }
        return map[week];
    },
    //TODO 非标准四舍五入
    /** 百分比数值格式化
     *
     * @num  参数值
     * @fixed 保留几位小数
     * @multiple 倍率
     */
    getReat: function(num, fixed=2,multiple=1) {
        // if (!fixed) fixed = 2;
        if (typeof num !== "number") num = Number(num);
        if (isNaN(num)) return "0";
        num=multiple*num;
        if(num!=0 && num!=100){
            num=Math.round(num * Math.pow(10,fixed))/Math.pow(10,fixed)
            // num = num.toFixed(fixed);
        }
        return num.toString();
    },
    getReatToNubmer: function(num, fixed=2,multiple=1) {
        // if (!fixed) fixed = 2;
        if (typeof num !== "number") num = Number(num);
        if (isNaN(num)) return 0;
        num=multiple*num;
        if(num!=0 && num!=100){
            num=Math.round(num * Math.pow(10,fixed))/Math.pow(10,fixed)
            // num = num.toFixed(fixed);
        }
        return Number(num);
    },
    getReatToFormatMinimumText(num, fixed=2,multiple=1){
        if (typeof num !== "number") num = Number(num);
        if (isNaN(num)) return "0";
        if(num>0 && num<0.01){
            return '小于1%'
        }else{
            return this.getReat(num,fixed,multiple)+'%';
        }
    },
    getCache(name){
        return sessionStorage.getItem(name)
    },
    setCache(name,val){
        sessionStorage.setItem(name)
    },
    deleteCache(name){
        localStorage.removeItem(name);
    },
    removeCache(){
        localStorage.clear();
    },
    //参数中科室no过滤成病区no
    createParmasDsetNoFilterWardNo(params){
        let p=JSON.parse(JSON.stringify(params));
        if(p.deskNo){
            if(this.ownRoleId('130101')){
                p.wardNo=p.deskNo;
                delete p.deskNo;
            }else if(p.deskNo.length>5){
                p.wardNo=p.deskNo;
                delete p.deskNo;
            }
        }
        return p;

    },
    createWhereJson(params) {
        let where = [];
        if (params.deskNo != void 0 &&  params.deskNo != "" && !Array.isArray(params.deskNo)) {
            if(this.ownRoleId('130101')){
                where.push(`inner.wardNo=${params.deskNo}`);
            }else if(params.deskNo.length>5){
                where.push(`inner.wardNo=${params.deskNo}`);
            }else{
                where.push(`inner.deskNo=${params.deskNo}`);
            }
        } else if(params.deskNo != void 0 &&  params.deskNo != "" && Array.isArray(params.deskNo)){ // 选择多个病区
            if(this.ownRoleId('130101')){
                where.push(`inner.wardNo=${params.deskNo.toString()}`);
            }else if(params.deskNo.length>5){
                where.push(`inner.wardNo=${params.deskNo.toString()}`);
            }else{
                where.push(`inner.deskNo=${params.deskNo.toString()}`);
            }
        } 
        //填报员
        if(this.ownRoleId('13010101')){
            where.push(`inner.loginName=${this.getLoginName()}`)
        }
        if (params.desk != void 0 &&  params.desk != "") {
            where.push(`inner.desk=${params.desk}`);
        }

        if (params.chargePersonName != void 0 &&  params.chargePersonName != "") {
            where.push(`inner.chargePersonName=${params.chargePersonName}`);
        }
        //diseaseTypes 就是diseaseType,主要是一些参数是要放在whereJson外
        if (params.diseaseTypes != void 0 &&  params.diseaseTypes != "") {
            where.push(`diseaseTypes=${params.diseaseTypes}`);
        }
        //diseaseTypeLitt 疾病类型多选
        if (params.diseaseTypeList != void 0  &&  params.diseaseTypeList.length>0) {
            where.push(`diseaseTypes=${params.diseaseTypeList.toString()}`);
        }
        

        if (params.innerStatusList != void 0 &&  params.innerStatusList.length>0) {
            where.push(`innerStatus=${params.innerStatusList.toString()}`);
        }
        if(params.analyseStatusList!=void 0 ) {
            if( params.analyseStatusList.length>0){
                where.push(`innerStatus=${params.analyseStatusList.toString()}`);
            }else{
                where.push(`innerStatus=${[4,5,6].toString()}`);
            }
        }

        //出院时间
        if (params.leaveHosTime != void 0 && params.leaveHosTime[0] != void 0 && params.leaveHosTime[0]!='') {
            where.push(`leaveHosTime>=${this.getDateParams(params.leaveHosTime[0])}`);
        }
        if (params.leaveHosTime != void 0 && params.leaveHosTime[1] != void 0 && params.leaveHosTime[1]!='') {
            where.push(`leaveHosTime<=${this.getDateParams(params.leaveHosTime[1])}`);
        }
        //采集时间
        if (params.reportTime != void 0 && params.reportTime[0] != void 0 && params.reportTime[0]!='') {
            where.push(`reportTime>=${this.getDateParams(params.reportTime[0])}`);
        }
        if (params.reportTime != void 0 && params.reportTime[1] != void 0 && params.reportTime[1]!='') {
            where.push(`reportTime<=${this.getDateParams(params.reportTime[1])}`);
        }
        //上报时间
        if (params.uploadTime != void 0 && params.uploadTime[0] != void 0 && params.uploadTime[0]!='') {
            where.push(`uploadBeginTime>=${this.getDateParams(params.uploadTime[0])}`);
        }
        if (params.uploadTime != void 0 && params.uploadTime[1] != void 0 && params.uploadTime[1]!='') {
            where.push(`uploadBeginTime<=${this.getDateParams(params.uploadTime[1])}`);
        }
        //填报完成时间
        if (params.auditTime != void 0 && params.auditTime[0] != void 0 && params.auditTime[0]!='') {
            where.push(`auditTime>=${this.getDateParams(params.auditTime[0])}`);
        }
        if (params.auditTime != void 0 && params.auditTime[1] != void 0 && params.auditTime[1]!='') {
            where.push(`auditTime<=${this.getDateParams(params.auditTime[1])}`);
        }

        if (where.length > 0) {
            return JSON.stringify(where);
        } else {
            return "";
        }
    },
    createWhereExcelFileName(params,title="导出数据"){
        let deskName='',leaveHosTimeName='',reportTimeName='',uploadTimeName='';
        let fileName;
        if (params.leaveHosTime != void 0 && params.leaveHosTime[0] != void 0 && params.leaveHosTime[0]!=''  && params.leaveHosTime[1] != void 0 && params.leaveHosTime[1]!='') {
            leaveHosTimeName=`出院时间${this.getDateParams(params.leaveHosTime[0])}至${this.getDateParams(params.leaveHosTime[1])}`
        }
        if (params.reportTime != void 0 && params.reportTime[0] != void 0 && params.reportTime[0]!=''  && params.reportTime[1] != void 0 && params.reportTime[1]!='') {
            if(leaveHosTimeName!=''){
                reportTimeName='&';
            }
            reportTimeName+=`采集时间${this.getDateParams(params.reportTime[0])}至${this.getDateParams(params.reportTime[1])}`
        }
        if (params.uploadTime != void 0 && params.uploadTime[0] != void 0 && params.uploadTime[0]!=''  && params.uploadTime[1] != void 0 && params.uploadTime[1]!='') {
            if(leaveHosTimeName!='' || reportTimeName!=''){
                uploadTimeName='&';
            }
            uploadTimeName+=`上报时间${this.getDateParams(params.uploadTime[0])}至${this.getDateParams(params.uploadTime[1])}`
        }
    
        fileName=`${deskName}${title}${leaveHosTimeName}${reportTimeName}${uploadTimeName}`
        return fileName;
    },
    createWhereExcelFileNameObj(params,title="导出数据"){
        let deskName='',leaveHosTimeName='',reportTimeName='',uploadTimeName='';
        let fileName;
        if (params.leaveHosTime != void 0 && params.leaveHosTime[0] != void 0 && params.leaveHosTime[0]!=''  && params.leaveHosTime[1] != void 0 && params.leaveHosTime[1]!='') {
            leaveHosTimeName=`出院时间${this.getDateParams(params.leaveHosTime[0])}至${this.getDateParams(params.leaveHosTime[1])}`
        }
        if (params.reportTime != void 0 && params.reportTime[0] != void 0 && params.reportTime[0]!=''  && params.reportTime[1] != void 0 && params.reportTime[1]!='') {
            if(leaveHosTimeName!=''){
                reportTimeName='&';
            }
            reportTimeName+=`采集时间${this.getDateParams(params.reportTime[0])}至${this.getDateParams(params.reportTime[1])}`
        }
        if (params.uploadTime != void 0 && params.uploadTime[0] != void 0 && params.uploadTime[0]!=''  && params.uploadTime[1] != void 0 && params.uploadTime[1]!='') {
            if(leaveHosTimeName!='' || reportTimeName!=''){
                uploadTimeName='&';
            }
            uploadTimeName+=`上报时间${this.getDateParams(params.uploadTime[0])}至${this.getDateParams(params.uploadTime[1])}`
        }
    
        fileName=`${deskName}${title}${leaveHosTimeName}${reportTimeName}${uploadTimeName}`
        let tableName=`${title}`;
        let subTitle=`${deskName}${leaveHosTimeName}${reportTimeName}${uploadTimeName}`
        return {fileName,tableName,subTitle};
    },
    //创建科研图表全局变量
    createGlobalVal(params){
        let globalVal=[]
        if(params.diseaseType != void 0 &&  params.diseaseType != ""){
            globalVal.push({
                dataType: "1",
                fieldId: "diseaseType",
                fieldName: "diseaseTypes.keyword",
                ruleList: [{operator: "eq", value:params.diseaseType, varType: "3"}],
                values: []
            })
        }
        if (params.deskNo != void 0 &&  params.deskNo != "") {
            if(this.ownRoleId('130101')){
                globalVal.push(
                    {
                        "fieldId": "wardNo",
                        "fieldName": "inner.wardNo.keyword",
                        "dataType": "1",
                        "ruleList": [
                            {
                                "operator": "eq",
                                "value": params.deskNo,
                                "varType": "3"
                            }
                        ],
                        "values": []
                    }
                )
            }else{
                globalVal.push({
                    "fieldId": "deskNo",
                    "fieldName": "inner.deskNo.keyword",
                    "dataType": "1",
                    "ruleList": [
                        {
                            "operator": "eq",
                            "value": params.deskNo,
                            "varType": "3"
                        }
                    ],
                    "values": []
                })
            }
        }
        if (params.leaveHosTime != void 0 && params.leaveHosTime[0] != void 0 && params.leaveHosTime[0]!='') {
            globalVal.push({
                dataType: "1",
                fieldId: "startTime",
                fieldName: "leaveHosTime",
                ruleList: [{operator: "gte", value: this.getDateParams(params.leaveHosTime[0]), varType: "3"}],
                values: []
            })
        }
        if (params.leaveHosTime != void 0 && params.leaveHosTime[1] != void 0 && params.leaveHosTime[1]!='') {
            globalVal.push({
                dataType: "1",
                fieldId: "endTime",
                fieldName: "leaveHosTime",
                ruleList: [{operator: "lte", value: this.getDateParams(params.leaveHosTime[1]), varType: "3"}],
                values: []
            })
        }

        return globalVal;
    },
    isNullData(data){
        if(data==void 0 || data==='undefined' || data==='' || data===null ){
            return true;
        }else{
            return false;
        }

    },
    /**
     * 数组转树
     * 递归求解
     * list
     */
    toTree(list,parId){
    	let len = list.length
    	function loop(parId){
    		let res = [];
    		for(let i = 0; i < len; i++){
    			let item = list[i]
    			if(item.pcode === parId){
    				item.children = loop(item.code)
    				res.push(item)
    			}
    		}
    		return res
    	}
    	return loop(parId)
    },
    
    /**
     * [jsonToTree description]简单的数组对象转为树结构
     * @param  {[Array]} jsonData [description] list
     * @param  {[String]} id       [description]子节点code
     * @param  {[String]} pid      [description] 父节点code
     * @return {[Array]}          [description] 树结构数据
     */
    jsonToTree(jsonData, id, pid) {
         let result = [],
           temp = {};
         for (let i = 0; i < jsonData.length; i++) {
           temp[jsonData[i][id]] = jsonData[i]; // 以id作为索引存储元素，可以无需遍历直接定位元素
         }
         for (let j = 0; j < jsonData.length; j++) {
           let currentElement = jsonData[j];
           let tempCurrentElementParent = temp[currentElement[pid]]; // 临时变量里面的当前元素的父元素
           if (tempCurrentElementParent) {
             // 如果存在父元素
             if (!tempCurrentElementParent["children"]) {
               // 如果父元素没有chindren键
               tempCurrentElementParent["children"] = []; // 设上父元素的children键
             }
             tempCurrentElementParent["children"].push(currentElement); // 给父元素加上当前元素作为子元素
           } else {
             // 不存在父元素，意味着当前元素是一级元素
             result.push(currentElement);
           }
         }
         return result;
    },
    /**
     * [getNamesByIds description] 通过ID集合去获取数组对象中对应项的某个字段的值的集合
     * @param  {[Array]} data   [description]数组对象
     * @param  {[Array]} idList [description]ID集合
     * @param  {[String]} key [description]对应的ID的想要获取的集合的字段名称'name'
     * @return {[Array]} list       [对应ID获取到的所有项目的key的值的集合]
     */
    getNamesByIds(data,idList,key) {
          let list = data.filter((items) =>
              idList.filter((id) => id === items.code).length > 0
          );
          return this.getArrayKeys(list,key);
    },
    ownRoleId(roleId){
        let type=false;
        let userInfo=sessionStorage.getItem("user");
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            if(userInfo && userInfo.roleId==roleId){
                type=true;
            }
        }
        return type;
    },
    getLoginName(){
        let loginName='';
        let userInfo=sessionStorage.getItem("user");
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            if(userInfo ){
                loginName=userInfo.loginName || '';
            }
        }
        return loginName;
    },
    /**
     * [getNamesByIds description] 通过ID集合去获取数组对象中对应项的集合
     * @param  {[Array]} data   [description]数组对象
     * @param  {[Array]} idList [description]ID集合
     * @return {[Array]} list       [对应ID获取到的所有项目项的集合]
     */
    getListByIds(data,idList) {
          let list = data.filter((items) =>
              idList.filter((id) => id === items.code).length > 0
          );
          return list;
    },
   
    //是否是推荐浏览器
    isRecBrowser(){
        let type = true;
        this.os = new UaParser().getBrowser();
        if (this.os.name == 'Chrome') {
            if (this.os.major * 1 < 47) {
                type = false;
            }
        } else {
            type = false;
        }
        return type;
    },
    getAvg(arr){
        var sum=0,avg=0;
        if(arr && arr.length>0){
            for (var i = 0; i < arr.length; i++) {
                sum+=parseInt(arr[i]);
            };
            avg=Math.ceil(sum/arr.length);
        }

        return avg
    },
    getDiseaseName(type) {
        let json=JSON.parse(sessionStorage.getItem('allType'));
        let name='',obj={};
        obj=json.find(res=>{
            return res.diseaseType==type
        })
        if(obj){
            name=obj.diseaseDescription;
        }
        return name
    },
    // 求和
    plus(num1, num2){
        const coefficient=function(num){
            num += "";
            let [, char = ""] = num.split("."),
                len = char.length;
            return Math.pow(10, len);
        }
        num1 = +num1
        num2 = +num2
        if(isNaN(num1)||isNaN(num2)) return NaN;
        let coeffic = Math.max(coefficient(num1),coefficient(num2));
        return (num1 * coeffic + num2 * coeffic) / coeffic;
    },
    /**
   * 生成随机id
   * @param  {[type]} len   [长度 可选]
   * @param  {[type]} radix [基数]
   * @return {[type]}       [description]
   */
  uuid: function(len, radix) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    var uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join("");
  },

  // 根据条件获取数组对象里匹配的对象
  getArrayItem: function(items, callback, value) {
    let k = 0;
    let item;
    const len = items.length;
    while (k < len) {
      item = items[k];
      if (typeof callback === "function") {
        if (callback(item, k)) {
          return item;
        }
      } else if (typeof callback === "string") {
        if (Object.prototype.hasOwnProperty.call(item, callback) && item[callback] === value) {
          return item;
        }
      }
      k++;
    }
  },
  createGetParams(obj){
    let params='';
    if(typeof obj =='object' && obj!=null){
        for(let key of Object.keys(obj)){
            params+=`&${key}=${obj[key]}`
        }
    }
    return params
  },
  excelFormatSpecialStr(arr){
    let list=[];
    if(arr){
        arr.map(res=>{
            list.push(res.replace(/&#46;/g,"."))
        })
    }
    return list;
  },
  inCompany(){
    let comDomainList=[
        'localhost',
        '192.168.150.163',
        '192.168.140.20',
    ]
    let domain=document.domain;
    return comDomainList.includes(domain);
  },
  getJsonFile(url,fun) {
    console.log('getJsonFile',url)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    //设置响应类型为 blob
    xhr.send()
    // xhr.responseType = 'json'
    //关键部分
    xhr.onload = function(...e) {
      //如果请求执行成功
      if (this.status == 200) {
        fun(this.response)
      }
    }
  },
  isJSON(str){
    if(!str){
        return false;
    }
    if(typeof str =='object'){
      return str;
    }
    try{
        JSON.parse(str);
        return true;
    }catch(e){
        return false;
    }
  },
  getJSONByStr(str){
    let obj={}
    if(this.isJSON(str)){
        obj=JSON.parse(str)
    }
    return obj;
  },
  getWhereDeptTree(){
    let tree=[];
    let data=sessionStorage.getItem('deptTree');
    if(this.isJSON(data)){
      tree=JSON.parse(data);
    }
    return tree
  },
  getWhereDeptList(){
    let list=[];
    let data=sessionStorage.getItem('deptList');
    if(this.isJSON(data)){
      list=JSON.parse(data);
    }
    return list
  },
 
  //获取object最深层次数 从1开始
  getObjectLv(params) {
    let res = 1;
    let loopGetLevel = (obj, level) => {
      var level = level ? level : 1;
      //console.log(obj,typeof obj)
      if (typeof obj === 'object') {
        for (var key in obj) {
          if (typeof obj[key] === 'object') {
            loopGetLevel(obj[key], level + 1);
          } else {
            res = level + 1 > res ? level + 1 : res;
          }
        }
      } else {
        res = level > res ? level : res;
      }
    }
    loopGetLevel(params)
    return res;
  }

};
