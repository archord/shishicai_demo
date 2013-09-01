try { document.execCommand("BackgroundImageCache", false, true); }
catch (e) { }
var TKCPCEO = new Object(); ///NameSpace
TKCPCEO.Bet = new Object(); //NameSpace
TKCPCEO.Lottery = new Object(); ///NameSpace
TKCPCEO.Lottery.Speed = new Object();  ///快开型操作类
TKCPCEO.Lottery.FCSSQ = new Object();  ///双色球操作类
TKCPCEO.Lottery.FCSSQ.Trend = new Object(); //双色球走势
TKCPCEO.Lottery.FCCQSSC = new Object(); //重庆时时彩操作类
TKCPCEO.Lottery.FCJXSSC = new Object(); //江西时时彩操作类
TKCPCEO.Lottery.TCD11 = new Object(); ///体彩十一运夺金
TKCPCEO.Lottery.FCCQSSC.Trend = new Object(); //重庆时时彩走势
TKCPCEO.Lottery.FCJXSSC.Trend = new Object(); //江西时时彩走势
TKCPCEO.Lottery.TCD11.Trend = new Object(); //十一运夺金走势
TKCPCEO.Lottery.FCSHSSL = new Object(); //上海时时乐
TKCPCEO.Lottery.FCSHSSL.Trend = new Object(); //上海时时乐走势
TKCPCEO.Lottery.TCKL123 = new Object(); //重庆快乐123s
TKCPCEO.Lottery.TCKL123.Trend = new Object(); //重庆快乐123s
TKCPCEO.Lottery.FCHaoCai1 = new Object(); //好彩一
TKCPCEO.Lottery.FCGDKL10 = new Object(); //广东快乐10分
TKCPCEO.Lottery.FCGDKL10.Trend = new Object(); //广东快乐10分走势图
TKCPCEO.Lottery.FCHLJSSC = new Object(); //黑龙江时时彩操作类
TKCPCEO.Lottery.FCHLJSSC.Trend = new Object(); //黑龙江时时彩走势图
TKCPCEO.Lottery.TCDLC = new Object(); ///体彩多乐彩(江西11选5)
TKCPCEO.Lottery.TCDLC.Trend = new Object(); ///体彩多乐彩(江西11选5)走势
TKCPCEO.Lottery.TCJLC22C5 = new Object(); //即乐彩（22选5）
TKCPCEO.Lottery.TCJLC22C5.Trend = new Object(); //即乐彩（22选5）走势
TKCPCEO.Lottery.TCGD11 = new Object(); ///广东11选5
TKCPCEO.Lottery.TCGD11.Trend = new Object(); ///广东11选5走势
TKCPCEO.Lottery.FCSDQYH = new Object(); ///山东群英会
TKCPCEO.Lottery.FCSDQYH.Trend = new Object(); ///山东群英会走势
TKCPCEO.Lottery.FCCQKL10 = new Object(); //重庆快乐10分
TKCPCEO.Lottery.FCCQKL10.Trend = new Object(); //重庆快乐10分走势图
TKCPCEO.Lottery.FCGXKL10 = new Object(); //广西快乐10分
TKCPCEO.Lottery.FCGXKL10.Trend = new Object(); //广西快乐10分走势图

TKCPCEO.Lottery.FCXJSSC = new Object();     //新疆时时彩
TKCPCEO.Lottery.FCXJSSC.Trend = new Object();   //新疆时时彩走势图
TKCPCEO.Lottery.FCTJSSC = new Object();     //天津时时彩
TKCPCEO.Lottery.FCTJSSC.Trend = new Object();   //天津时时彩走势图

TKCPCEO.Lottery.FCBJKL8 = new Object(); //北京快乐8

TKCPCEO.Lottery.TCCQ11 = new Object(); //重庆11选5
TKCPCEO.Lottery.TCCQ11.Trend = new Object(); //重庆11选5走势图

TKCPCEO.UseSavePageCookie = true; ///启用Cookie保存用户访问记录

var PrimeArray = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]; ///质数

var Cookie = {
    setCookie: function (cName, cValue, cDate) {
        var saveDays = 360;
        var exp = new Date();
        if (cDate != null) {
            exp = cDate;
        } else {
            exp.setTime(exp.getTime() + saveDays * 24 * 60 * 60 * 1000);
        }
        document.cookie = cName + "=" + escape(cValue) + ";expires=" + exp.toUTCString();
    },
    getCookie: function (cName) {
        var arr;
        var reg = new RegExp("(^| )" + cName + "=([^;]*)(;|$)");
        arr = document.cookie.match(reg);
        if (arr != null) {
            return unescape(arr[2]);
        }
        else {
            return null;
        }
    },
    delCookie: function (cName) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
        }
    }
}

function setBetLotteryTypeWithPlayType(lotteryType, playTypeIndex) {
    Cookie.setCookie("BetLotteryTypeWithPlayType" + lotteryType.toString(), playTypeIndex.toString());
}

var Broswer = new function () {
    var ua = navigator.userAgent.toLowerCase();
    this.ie = 0;
    this.firefox = 0;
    this.chrome = 0;
    this.opera = 0;
    this.safari = 0;
    var s;

    (s = ua.match(/msie ([\d.]+)/)) ? this.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? this.firefox = s[1] :
        (s = ua.match(/minefield\/([\d.]+)/)) ? this.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? this.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? this.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? this.safari = s[1] : 0;
}

var BroswerInfo = new function () {
    this.AppName = navigator.appName; //浏览器类型
    this.AppVersion = navigator.appVersion; //浏览器版本
    this.BrowserLanguage = navigator.browserLanguage; //浏览器语言
    this.CpuClass = navigator.cpuClass; //CPU类型
    this.Platform = navigator.platform; //操作系统
    this.SystemLanguage = navigator.systemLanguage; //系统语言
    this.UserLanguage = navigator.userLanguage; //用户语言
    this.OnLine = navigator.onLine; //在线情况
    this.Screen = window.screen.width + "x" + window.screen.height; //屏幕分辨率
    this.Color = window.screen.colorDepth + "bit"; //颜色
    this.FontSmoothingEnabled = window.screen.fontSmoothingEnabled; //字体平滑
    this.AppMinorVersion = navigator.appMinorVersion; //更新版本
    this.AppCodeName = navigator.appCodeName;
    this.CookieEnabled = navigator.cookieEnabled; //cookieEnabled
    this.UserAgent = navigator.userAgent; //userAgent
    this.JavaEnabled = navigator.javaEnabled();
}

var __sto = window.setTimeout;
setTimeout2 = function (callback, timeout, param) {
    if (typeof (callback) == "function") {
        var args = Array.prototype.slice.call(arguments, 2);
        var _cb = function () {
            callback.apply(null, args);
        }
        __sto(_cb, timeout);
    }
    else {
        __sto(callback, timeout);
    }
}

var __siv = window.setInterval;
setInterval2 = function (callback, timeout, param) {
    if (typeof (callback) == "function") {
        var args = Array.prototype.slice.call(arguments, 2);
        var _cb = function () {
            callback.apply(null, args);
        }
        return __siv(_cb, timeout);
    }
    else {
        return __siv(callback, timeout);
    }
}

function $A(iterable) {
    var results = [];
    for (var i = 0; i < iterable.length; i++) {
        results.push(iterable[i]);
    }
    return results;
}
Function.prototype.bind = function () {
    var __method = this, args = $A(arguments), object = args.shift();
    return function () {
        return __method.apply(object, args.concat($A(arguments)));
    }
}
function $(id) {
    return document.getElementById(id);
}
function $t(tagName, obj) {
    if (!obj) {
        obj = document;
    }
    return obj.getElementsByTagName(tagName);
}
function $n(name, obj) {
    if (!obj) {
        obj = document;
    }
    return obj.getElementsByName(name);
}
function $c(className) {
    var children = document.getElementsByTagName('*') || document.all;
    var chdLen = children.length;
    var elements = new Array();
    for (var i = 0; i < chdLen; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');
        var clsnLen = classNames.length;
        for (var j = 0; j < clsnLen; j++) {
            if (classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
}
function getOffsetValue(obj) {
    var t = obj.offsetTop;
    var l = obj.offsetLeft;
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;

    while (obj = obj.offsetParent)	//获取元素相对整个浏览器画布的绝对位置
    {
        t += obj.offsetTop;
        l += obj.offsetLeft;
    }
    return {
        top: t,
        left: l,
        width: w,
        height: h
    }
}

function getOffsetParent(obj) {
    var temp = null;
    while (obj = obj.offsetParent) {
        temp = obj;
    }
    return temp;
}
function getWindowSize() {
    var winWidth = 0;
    var winHeight = 0;

    if (window.innerWidth) {
        winWidth = window.innerWidth;
    }
    else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }

    if (window.innerHeight) {
        winHeight = window.innerHeight;
    }
    else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }

    //通过深入Document内部对body进行检测，获取窗口大小

    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winWidth = document.documentElement.clientWidth;
        winHeight = document.documentElement.clientHeight;
    }

    return {
        width: winWidth,
        height: winHeight
    }
}
function getStyleValue(obj, styleName) {
    var curVal = null;
    if (obj.currentStyle) {
        curVal = obj.currentStyle[styleName];
    }
    else {
        curVal = document.defaultView.getComputedStyle(obj, null)[styleName];
    }
    return curVal;
}
function reSizeImage(obj, fitWidth, fitHeight) {
    var image = new Image();
    image.src = obj.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= fitWidth / fitHeight) {
            if (image.width > fitWidth) {
                obj.width = fitWidth;
                obj.height = (image.height * fitWidth) / image.width;
            }
            else {
                obj.width = image.width;
                obj.height = image.height;
            }
        }
        else {
            if (image.height > fitHeight) {
                obj.height = fitHeight;
                obj.width = (image.width * fitHeight) / image.height;
            }
            else {
                obj.width = image.width;
                obj.height = image.height;
            }
        }
    }
}
function createElement(parObj, oTag, oType, oName, oId) {
    var over = oTag == "input" ? "/" : "";
    var element = null;
    try {
        //ie create	避免 IE bug 导致input的radio等元素不能使用
        element = document.createElement("<" + oTag + " name=\"" + oName + "\" " + (oId != null ? "id=\"" + oId + "\" " : "") + over + ">");
    }
    catch (e) {
        element = document.createElement(oTag);
        element.name = oName;
        element.id = oId;
    }
    if (oType) {
        element.type = oType;
    }
    return parObj.appendChild(element);
}

function IsValidNumber(e) {
    e = window.event || e;
    var keyCode = e.keyCode || e.which;
    var code1 = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    var code2 = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    var k = [8];
    var value = (code1.indexOf(parseInt(keyCode, 10)) == -1) ? code2.indexOf(parseInt(keyCode, 10)) : code1.indexOf(parseInt(keyCode, 10));
    if (value == -1) {
        if (k.indexOf(parseInt(keyCode, 10)) == -1) { return false; }
    }
    return true;
}

Array.prototype.unpush = function () {
    this.length = this.length - 1;
}
Array.prototype.indexOf = function (item, fromIndex) {
    var aryLen = this.length;
    if (!fromIndex) fromIndex = 0;
    else if (fromIndex < 0) fromIndex = Math.max(0, aryLen + fromIndex);
    for (var i = fromIndex; i < aryLen; i++) {
        if (this[i] == item) {
            return i;
        }
    }
    return -1;
}
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
    return (index > -1);
}
Array.prototype.removeAt = function (index) {
    return this.splice(index, 1);
}
Array.prototype.removeReItem = function (item) {
    var temp = {};
    var aryLen = this.length;
    for (var i = 0; i < aryLen; i++) {
        if (typeof temp[this[i]] == "undefined") {
            if (this[i] != item) {
                temp[this[i]] = 1;
            }
        }
    }
    this.length = 0;
    for (var o in temp) {
        this[this.length] = o;
    }
    return this;
}
Array.prototype.clearRepeat = function () {
    var temp = {};
    var aryLen = this.length;
    for (var i = 0; i < aryLen; i++) {
        if (typeof temp[this[i]] == "undefined") {
            temp[this[i]] = this[i];
        }
    }
    this.length = 0;
    for (var o in temp) {
        this[this.length] = o;
    }
    return this;
}
Array.prototype.hasRepeat = function () {
    var temp = {};
    var aryLen = this.length;
    for (var i = 0; i < aryLen; i++) {
        if (typeof temp[this[i]] == "undefined") {
            temp[this[i]] = this[i];
        } else {
            return true;
        }
    }
    return false;
}
Array.prototype.exists = function (item) {
    return (this.indexOf(item) != -1);
}
Array.prototype.getMax = function () {
    var aryLen = this.length;
    for (var i = 1, maxValue = this[0]; i < aryLen; i++) {
        if (maxValue < this[i]) {
            maxValue = this[i];
        }
    }
    return maxValue;
}
Array.prototype.getMin = function () {
    var aryLen = this.length;
    for (var i = 1, minValue = this[0]; i < aryLen; i++) {
        if (minValue > this[i]) {
            minValue = this[i];
        }
    }
    return minValue;
}
Array.prototype.clear = function () {
    this.length = 0;
}
Array.prototype.addArray = function (array) {
    var newLen = array.length;
    for (var i = 0; i < newLen; i++) {
        this.push(array[i]);
    }
}
Array.prototype.insertAt = function (index, item) {
    this.splice(index, 0, item);
}
Array.prototype.insertBefore = function (aryItem, item) {
    var index = this.indexOf(aryItem);
    if (index == -1) {
        this.push(item);
    }
    else {
        this.splice(index, 0, item);
    }
}
Array.prototype.getMostItems = function () {
    var temp = {}, m = 0, n = new Array();
    var aryLen = this.length;
    for (var i = 0; i < aryLen; i++) {
        temp[this[i]] ? ++temp[this[i]] : temp[this[i]] = 1;
    }
    for (var o in temp) {
        m = Math.max(m, temp[o]);
        if (m == temp[o]) {
            n[n.length] = o;
        }
    }
    return { "value": n, "times": m };
}
Array.prototype.circle = function (degressive) {
    var temp = null;
    if (degressive) {
        temp = this[0];
        this.shift();
        this.push(temp);
    }
    else {
        var aryLen = this.length;
        temp = this[aryLen - 1];
        this.length = aryLen - 1;
        this.unshift(temp);
    }
}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}
String.prototype.contains = function (charstring) {
    return (this.indexOf(charstring) > -1);
}
String.prototype.isDate = function () {
    var regExp = this.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/);
    if (regExp == null) { return false; }
    var date = new Date(regExp[1], regExp[3] - 1, regExp[4]);
    return (date.getFullYear() == regExp[1] && eval(date.getMonth() + 1) == regExp[3] && date.getDate() == regExp[4]);
}
String.prototype.toDate = function () {
    var regExp = this.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})\s(\d{1,2})(:)(\d{1,2})\6(\d{1,2})$/);
    if (regExp == null) { return false; }
    var date = new Date(regExp[1], regExp[3] - 1, regExp[4]);
    return date;
}
String.prototype.HtmlEncode = function () {
    return this.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
String.prototype.ChLen = function () {
    return this.replace(/[^\x00-\xff]/g, "aa").length;
}
String.prototype.IsChinese = function () {
    var re = /^[\u4E00-\u9FA5]*$/;
    return re.test(this);
}
String.prototype.toMoney = function () {
    ///<summary>转换成货币格式</summary>
    var ch = parseFloat(this) < 0 ? "-" : "";
    var s = Math.abs(parseFloat(this)).toString();
    if (/[^0-9\.]/.test(s)) return "invalid value";
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return "￥" + ch + s.replace(/^\./, "0.")
}
Number.prototype.toDateString = function () {
    var _seconds = this;
    var leftHours = parseInt(_seconds / (60 * 60), 10);
    var leftMinutes = parseInt(_seconds / (60), 10) - parseInt(leftHours * 60, 10);
    var leftSeconds = parseInt(_seconds, 10) - parseInt(leftHours * 60 * 60 + leftMinutes * 60, 10);
    leftSeconds = leftSeconds < 0 ? 0 : leftSeconds;
    var outPut = [];
    outPut.push(leftHours >= 0 ? (leftHours <= 9 ? "0" + leftHours : leftHours) + ":" : "");
    outPut.push(leftMinutes >= 0 ? (leftMinutes <= 9 ? "0" + leftMinutes : leftMinutes) + ":" : "");
    outPut.push(leftSeconds >= 0 ? (leftSeconds <= 9 ? "0" + leftSeconds : leftSeconds) : "");
    return outPut.join("");
}
Date.prototype.toStandardString = function (_format) {
    ///<summary>转换成xxxx年xx月xx日 xx:xx:xx格式</summary>
    var year = this.getFullYear();
    var month = parseInt(this.getMonth() + 1, 10);
    var day = this.getDate();
    var hour = this.getHours() > 9 ? this.getHours() : "0" + this.getHours();
    var minute = this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes();
    var second = this.getSeconds() > 9 ? this.getSeconds() : "0" + this.getSeconds();
    var retString = "";
    switch (_format) {
        case "yyyy-MM-dd hh:mm:ss":
            retString = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            break;
        case "yyyy-MM-dd":
            retString = year + "-" + month + "-" + day;
            break;
        default:
            retString = year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second;
            break;
    }
    return retString;
}
Date.prototype.addDays = function (days) {
    ///<summary>增加分钟</summary>
    var times = this.getTime() + (days * 24 * 60 * 60 * 1000);
    var d = new Date();
    d.setTime(times);
    return d;
}
Date.prototype.addMinutes = function (minutes) {
    ///<summary>增加分钟</summary>
    var times = this.getTime() + (minutes * 60 * 1000);
    var d = new Date();
    d.setTime(times);
    return d;
}
Date.prototype.addSeconds = function (seconds) {
    ///<summary>增加seconds秒</summary>
    var seconds = this.getTime() + (seconds * 1000);
    var d = new Date();
    d.setTime(seconds);
    return d;
}

function GetUrlKey(key) {
    /// <summary>
    /// 获取URL中传递的参数
    /// </summary>
    /// <field name="key">参数名称</field>

    if (location.href.indexOf("?") < 0) { return ""; }
    var aryParameter = location.href.split("?")[1].split("&");
    for (var i = 0; i < aryParameter.length; i++) {
        if (aryParameter[i].trim() == "") { continue; }
        var aryItem = aryParameter[i].split('=');
        if (key.toLowerCase() == aryItem[0].toLowerCase()) {
            return unescape(aryItem[1]);
        }
    }
    return "";
}

//var intervalTempNote = setInterval(function () {
//    try {
//        if (document.body.childNodes[0] != null) {
//            clearInterval(intervalTempNote);
//            tempNote();
//        }
//    } catch (e) { }
//}, 100);

//function tempNote() {
//    if (document.body.className != "frameInner") {
//        var note = document.createElement("div");
//        note.innerHTML = "公告 ：12月17日凌晨2点30分至早8点，时时彩网服务器搬迁升级，届时无法正常访问，敬请谅解！";
//        note.style.cssText = "text-align:center; background-color:yellow; color:#f00; font-size:14px; font-weight:bold;";
//        document.body.insertBefore(note, document.body.childNodes[0]);
//    }
//}

try {
window.attachEvent("onload", function () {
    var listLinks = document.getElementsByTagName("a");
    for (var i = 0; i < listLinks.length; i++) {
        listLinks[i].attachEvent("onfocus", function () {
            this.blur();
        } .bind(listLinks[i]));
    }
});
} catch (e) { }