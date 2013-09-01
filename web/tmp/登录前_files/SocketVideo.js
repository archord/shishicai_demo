function checkFlashVersion() {
    var n = navigator;
    var fv = "";
    if (n.plugins && n.mimeTypes.length) {
        var j = n.plugins["Shockwave Flash"];
        if (j && j.description) {
            fv = parseInt(j.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".")) + ".0"
        }
    } else {
        if (window.ActiveXObject) {
            var l = 0;
            for (var k = 10; k >= 2; k--) {
                try {
                    var o = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + k);
                    if (o) {
                        l = k + ".0";
                        break
                    }
                } catch (m) { }
            }
            fv = parseInt(l) + ".0"
        }
    }
    return fv;
}
try {
    if (parseInt(checkFlashVersion(), 10) < 10) {
        if (!(Cookie.getCookie("fvlowSubmit") != null && eval(Cookie.getCookie("fvlowSubmit")) == false)) {
            var checkFlashVersionDiv = document.createElement("div");
            checkFlashVersionDiv.style.cssText = "background-color:yellow;color:red;text-align:center;";
            checkFlashVersionDiv.innerHTML = "友情提示：您的Flash播放器不是最新版本，可能无法正常观看开奖视频，请下载安装版本10.0及以上的Flash播放器&nbsp;&nbsp;<a href=\"http://get.adobe.com/cn/flashplayer/\" target=\"_blank\">立即下载</a>&nbsp;&nbsp;<a href=\"javascript:void(0)\" onclick=\"this.parentNode.style.display='none';Cookie.setCookie('fvlowSubmit', 'false');\">[关闭，以后不再提示]</a>";
            window.onload = function() {
                document.body.insertBefore(checkFlashVersionDiv, document.body.childNodes[0]);
            }
        }
    }
} catch (e) { alert(e.message); }
/// <reference path="~/JS/NoUse/JScript.js" />
TKCPCEO.FlashVideo = function() {
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}

TKCPCEO.FlashVideo.prototype = {
    //prototype
    //#region
    Command: new JSONCommand(),
    Object: {
        GetBonusNumber: null
    },
    Delay: {
        InitTime: 5,
        Frequency: 5
    },
    Count: {
        GetBonusNumberErr: 1
    },
    BetFlash: {
        Status: -1,
        DataModel: {
            BetIssue: "",
            BetLeaveTime: -1,
            TrueIssue: "",
            DrawLeaveTime: -1,
            BonusIssue: "",
            BonusNumber: ""
        },
        BonusInfo: new Array()
    },
    DateTime: {
        BetIssue: null,
        Bonus: null
    },
    Clock: false,
    AlertMsg: false,
    GetDataTimeOut: 5000,
    //#endregion
    //投注倒计时完毕
    //#region
    flash_BetEnd: function () {
        this.getDataModelBack({
            BetIssue: this.BetFlash.DataModel.BetIssue,
            BetLeaveTime: this.BetFlash.DataModel.BetLeaveTime,
            TrueIssue: this.BetFlash.DataModel.TrueIssue,
            //DrawLeaveTime: this.BetFlash.DataModel.DrawLeaveTime - this.BetFlash.DataModel.BetLeaveTime,
            DrawLeaveTime: -99999,
            BonusIssue: this.BetFlash.DataModel.BonusIssue,
            BonusNumber: this.BetFlash.DataModel.BonusNumber
        }, "1", 1);
        if (this.AlertMsg) {
            alert("投注截至");
        }
        this.countDownOver(true);
    },
    //#endregion
    //开奖倒计时完毕
    //#region
    flash_BonusEnd: function () {
        this.getDataModelBack({
            BetIssue: this.BetFlash.DataModel.BetIssue,
            //BetLeaveTime: this.BetFlash.DataModel.BetLeaveTime - this.BetFlash.DataModel.DrawLeaveTime,
            BetLeaveTime: -99999,
            TrueIssue: this.BetFlash.DataModel.TrueIssue,
            DrawLeaveTime: this.BetFlash.DataModel.DrawLeaveTime,
            BonusIssue: this.BetFlash.DataModel.TrueIssue,
            BonusNumber: ""
        }, "3", 0);
        if (this.AlertMsg) {
            alert("开奖中……");
        }
        this.countDownOver(false);
    },
    //#endregion
    //得到开奖号码
    //#region
    flash_BonusOK: function () {
        if (this.AlertMsg) {
            alert("得到开奖号码");
        }
    },
    //#endregion
    getDataModel: function (par2) {
        ///<summary>获取数据</summary>
        //flashServer.send(JSON.stringify({ c: "3" }));
    },
    countDownOver: function (_isBetIssue) {
        try {
            if (_isBetIssue == false) {
                setTimeout(function () { Event_BonusStart(); }, 1000);
            } else {
                setTimeout(function () { Event_BetEnded(); }, 1000);
            }
        } catch (e) {
            alert(e.message);
        }
        var func = function (_this) {
            return function () { _this.getDataModel(); }
        } (this);
        setTimeout(func, this.Delay.InitTime * 1000);
    },
    //生成号码形态
    //#region
    getActString: function (num, type) {
        var r = "";
        var listType = new Array();
        switch (type) {
            case "三星形态":
                r = num.charAt(0) == num.charAt(1) && num.charAt(0) == num.charAt(2) ? "豹子" : (num.charAt(0) == num.charAt(1) || num.charAt(0) == num.charAt(2) || num.charAt(1) == num.charAt(2) ? "组3" : "组6");
                break;
            case "二星和值":
                r = parseInt(num.charAt(0), 10) + parseInt(num.charAt(1), 10);
                break;
            case "三星和值":
                r = parseInt(num.charAt(0), 10) + parseInt(num.charAt(1), 10) + parseInt(num.charAt(2), 10);
                break;
            case "大小单双":
                listType.push([parseInt(num.charAt(0), 10) > 4 ? "大" : "小", parseInt(num.charAt(0), 10) % 2 == 1 ? "单" : "双"]);
                listType.push([parseInt(num.charAt(1), 10) > 4 ? "大" : "小", parseInt(num.charAt(1), 10) % 2 == 1 ? "单" : "双"]);
                var danStr = "";
                for (var i = 0; i < listType[0].length; i++) {
                    r += i == 0 ? "" : " ";
                    danStr = listType[0][i];
                    for (var j = 0; j < listType[1].length; j++) {
                        r += j == 0 ? "" : " ";
                        r += danStr + listType[1][j];
                    }
                }
                break;
            case "小区":
                for (var i = 0; i < num.length; i++) {
                    if (parseInt(num[i], 10) < 11) {
                        listType.push(num[i]);
                    }
                }
                r = listType.toString();
                break;
            case "中区":
                for (var i = 0; i < num.length; i++) {
                    if (parseInt(num[i], 10) > 10 && parseInt(num[i], 10) < 21) {
                        listType.push(num[i]);
                    }
                }
                r = listType.toString();
                break;
            case "大区":
                for (var i = 0; i < num.length; i++) {
                    if (parseInt(num[i], 10) > 20) {
                        listType.push(num[i]);
                    }
                }
                r = listType.toString();
                break;
        }
        return r.toString() == "" ? "-" : r.toString();
    },
    //#endregion
    //开奖结果信息
    //#region
    setBonusInfo: function () {
        if (this.BetFlash.DataModel.BonusNumber != "") {
            this.BetFlash.BonusInfo = new Array();
            var num = this.BetFlash.DataModel.BonusNumber.toString();
            switch (this.Command.Parameters[0]) {
                case 4: //重庆时时彩
                case 5: //江西时时彩
                case 21: //黑龙江时时彩
                case 17: //新疆江时时彩
                case 27: //天津时时彩
                    this.BetFlash.BonusInfo.push({ Name: "三星形态", Value: this.getActString(num.substr(2), "三星形态") });
                    this.BetFlash.BonusInfo.push({ Name: "二星和值", Value: this.getActString(num.substr(3), "二星和值") });
                    this.BetFlash.BonusInfo.push({ Name: "三星和值", Value: this.getActString(num.substr(2), "三星和值") });
                    this.BetFlash.BonusInfo.push({ Name: "大小单双", Value: this.getActString(num.substr(3), "大小单双") });
                    break;
                case 16: //山东11选5
                case 23: //江西11选5
                case 24: //广东11选5
                case 36: //重庆11选5
                case 26: //即乐彩
                    num = num.split(",");
                    this.BetFlash.BonusInfo.push({ Name: "任选一", Value: num[0] });
                    this.BetFlash.BonusInfo.push({ Name: "前二位", Value: num[0] + "," + num[1] });
                    this.BetFlash.BonusInfo.push({ Name: "前三位", Value: num[0] + "," + num[1] + "," + num[2] });
                    break;
                case 18: //快乐123
                    num = num.split(",");
                    this.BetFlash.BonusInfo.push({ Name: "小区", Value: this.getActString(num, "小区") });
                    this.BetFlash.BonusInfo.push({ Name: "中区", Value: this.getActString(num, "中区") });
                    this.BetFlash.BonusInfo.push({ Name: "大区", Value: this.getActString(num, "大区") });
                    break;
                case 22: //广东快乐十分
                    num = num.split(",");
                    this.BetFlash.BonusInfo.push({ Name: "开奖号码排序", Value: num.sort().toString() });
                    break;
                case 34: //广西快乐十分
                    num = num.split(",");
                    this.BetFlash.BonusInfo.push({ Name: "好运特", Value: num[num.length - 1].toString() });
                    break;
                case 6: //上海时时乐
                    this.BetFlash.BonusInfo.push({ Name: "开奖号码形态", Value: this.getActString(num, "三星形态") });
                    break;
            }
        } else {
            for (var i = 0; i < this.BetFlash.BonusInfo.length; i++) {
                this.BetFlash.BonusInfo[i].Value = "-";
            }
        }
    },
    //#endregion
    getDataModelBack: function (dm, par2, status, noTime) {
        ///<summary>获取数据返回处理</summary>
        if (typeof (dm) == "string") {
            var ds = dm.split(";");
            dm = { BetIssue: ds[0], BetLeaveTime: ds[1], TrueIssue: ds[2], DrawLeaveTime: ds[3], BonusIssue: ds[4], BonusNumber: ds[5] }
        }
        this.BetFlash.Status = status == null ? (dm.BetIssue == dm.TrueIssue ? 0 : 1) : status;
        this.BetFlash.DataModel.BetIssue = dm.BetIssue;
        this.BetFlash.DataModel.BetLeaveTime = dm.BetLeaveTime;
        this.BetFlash.DataModel.TrueIssue = dm.TrueIssue;
        this.BetFlash.DataModel.DrawLeaveTime = dm.DrawLeaveTime;
        if (par2 == "2" || par2 == "3") {
            this.BetFlash.DataModel.BonusIssue = dm.BonusIssue;
            this.BetFlash.DataModel.BonusNumber = dm.BonusNumber;
        }
        this.setBonusInfo();
        try {
            setSubmitButtonStatus(this.BetFlash.Status == 0);
            var funSetYiLouStatus = function (_thisStatus, _thisBonusNumber) {
                return function () { Status_GetYiLou = _thisStatus == 0 && _thisBonusNumber != ""; }
            } (this.BetFlash.Status, this.BetFlash.DataModel.BonusNumber);
            setTimeout(funSetYiLouStatus, this.GetDataTimeOut);
            if (this.GetDataTimeOut > 0) {
                this.GetDataTimeOut -= this.GetDataTimeOut;
            }
        } catch (e) { }
        try {
            var func = function (_this) {
                return function () {
                    var bf = new Object();
                    bf.Status = noTime ? 0 : _this.BetFlash.Status;
                    bf.DataModel = new Object();
                    bf.DataModel.BetIssue = _this.BetFlash.DataModel.BetIssue;
                    bf.DataModel.BetLeaveTime = noTime ? -99999 : _this.BetFlash.DataModel.BetLeaveTime;
                    bf.DataModel.TrueIssue = _this.BetFlash.DataModel.TrueIssue;
                    bf.DataModel.DrawLeaveTime = noTime ? -99999 : _this.BetFlash.DataModel.DrawLeaveTime;
                    bf.DataModel.BonusIssue = _this.BetFlash.DataModel.BonusIssue;
                    bf.DataModel.BonusNumber = _this.BetFlash.DataModel.BonusNumber;
                    bf.BonusInfo = _this.BetFlash.BonusInfo;
                    if (isTestView) {
                        //alert(JSON.stringify(bf) + "\n\n" + JSON.stringify(_this.BetFlash));
                    }
                    $("BetFlash").BetFlash(bf);
                    //testObj.innerHTML = new Date().getHours().toString() + ":" + new Date().getMinutes().toString() + ":" + new Date().getSeconds().toString() + ":" + JSON.stringify(_this.BetFlash);
                }
            } (this);
            setTimeout(func, 1000);
        } catch (e) {
            alert($("BetFlash").tagName + "\n" + e.message + "\r" + JSON.stringify(this.BetFlash));
        }
        //js倒计时
        //#region
        if (this.Clock) {
            if (this.BetFlash.DataModel.BetLeaveTime > -1) {
                if (this.DateTime.BetIssue != null) {
                    this.DateTime.BetIssue.dispose();
                }
                this.DateTime.BetIssue = new DateTime();
                this.DateTime.BetIssue.IsBackground = false;
                this.DateTime.BetIssue.ObjShowTime = $("bet");
                this.DateTime.BetIssue.IsCountDown = true;
                this.DateTime.BetIssue.ServerDateTime = new Date();
                this.DateTime.BetIssue.EndDateTime = this.DateTime.BetIssue.ServerDateTime.addSeconds(this.BetFlash.DataModel.BetLeaveTime);
                this.DateTime.BetIssue.countDownOver = this.countDownOver.bind(this, true);
                this.DateTime.BetIssue.start();
            }
            if (this.BetFlash.DataModel.DrawLeaveTime > -1) {
                if (this.DateTime.Bonus != null) {
                    this.DateTime.Bonus.dispose();
                }
                this.DateTime.Bonus = new DateTime();
                this.DateTime.Bonus.IsBackground = false;
                this.DateTime.Bonus.ObjShowTime = $("bonus");
                this.DateTime.Bonus.IsCountDown = true;
                this.DateTime.Bonus.ServerDateTime = new Date();
                this.DateTime.Bonus.EndDateTime = this.DateTime.BetIssue.ServerDateTime.addSeconds(this.BetFlash.DataModel.DrawLeaveTime);
                this.DateTime.Bonus.countDownOver = this.countDownOver.bind(this, false);
                this.DateTime.Bonus.start();
            }
        }
        //#endregion
        //正在开奖……
        //#region
        if ((par2 == "2" || par2 == "3") && status == null) {//正在开奖……
            if (this.BetFlash.DataModel.BonusNumber == "") {
                var func = function (_this) {
                    return function () { _this.getDataModel(); }
                } (this);
                this.Count.GetBonusNumberErr += 1; //计数器，获取开奖号码次数，每5次增加一秒获取频率
                clearTimeout(this.Object.GetBonusNumber);
                this.Object.GetBonusNumber = setTimeout(func, (this.Delay.Frequency + this.Count.GetBonusNumberErr / 5) * 1000);
            } else {
                clearTimeout(this.Object.GetBonusNumber);
                this.Count.GetBonusNumberErr = 1; //计数器清零
                try {
                    var func = function (_this) {
                        return function () { Event_BonusEnded(_this.BetFlash.DataModel.BonusIssue, _this.BetFlash.DataModel.BonusNumber); }
                    } (this);
                    setTimeout(func, 5000);
                } catch (e) {
                    alert(e.message);
                }
            }
        }
        //#endregion
    },
    wait: function () {
        var func = function (_this) {
            return function () {
                _this.wait();
            }
        } (this);
        var delay = 200;
        if ($("BetFlash") == null) {
            setTimeout(func, delay);
            return;
        }
        if (typeof ($("BetFlash").BetFlash) != "function") {
            setTimeout(func, delay);
            testInnerHTML.push(new Date().toStandardString() + "|未找到BetFlash方法");
            return;
        }
        if (!flashServer.ConnectStatus) {
            setTimeout(func, delay);
            return;
        }
        flashServer.initLotteryType();
        //this.getDataModel();
    },
    initialize: function (lotteryType) {
        ///<summary>初始化</summary>
        ///<field name="lotteryType">彩种枚举值</field>
        switch (lotteryType) {
            case 4: //重庆时时彩
                this.Delay.InitTime = 15;
                break;
            case 5: //江西时时彩
                this.Delay.InitTime = 170;
                break;
            case 16: //山东11选5
                this.Delay.InitTime = 15;
                break;
        }
        this.Command.Parameters[0] = lotteryType;
        if (isTestView) {
            window.onload = function () {
                document.body.appendChild(testObj);
                document.body.appendChild(testBtn);
            }
        }
    },
    construct: function () {
        this.Command = new JSONCommand();
        this.Command.CommandName = "flash";
        this.Command.Parameters = [-1, ""];
    }
}
var fvClass = new TKCPCEO.FlashVideo();

var testObj = document.createElement("div");
testObj.style.cssText = "position:absolute; background-color:#000; color:#fff;top:0px; z-index:99999;";
var testBtn = document.createElement("input");
testBtn.style.cssText = "position:absolute; background-color:#000; color:#fff;top:50px; z-index:99999;";
testBtn.type = "button";
var testInnerHTML = [];
testBtn.onclick = function() {
    alert(testInnerHTML.join("\n"));
    //flashServer.closeConnection();
}
var isTestView = false;

TKCPCEO.Flash = function() {
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Flash.prototype = {
    FlashObject: null,
    Server: "video.shishicai.cn",
    Port: 11236,
    ConnectStatus: false,
    AutoConnect: null,
    AutoConnectTimes: 0,
    send: function(_jsonCmd) {
        if (this.ConnectStatus != true) {
            testBtn.value = new Date().toStandardString() + "|与服务器断开";
            return;
        }
        var jStr = _jsonCmd.toString();
        jStr += ";";
        this.FlashObject.Send(jStr);
    },
    connectBack: function(_connected, _event) {
        this.ConnectStatus = _connected;
        if (this.ConnectStatus) {
            testBtn.value = new Date().toStandardString() + "|与服务器建立连接成功!";
            this.AutoConnectTimes = 0;
            clearInterval(this.AutoConnect);
            fvClass.wait();
        } else {
            //alert("未找到服务器");
        }
    },
    initLotteryType: function() {
        testBtn.value = "send c2";
        //this.send(JSON.stringify({ c: "2", p: [fvClass.Command.Parameters[0]] }));
        this.send(JSON.stringify({ c: "2" }));
    },
    connect: function() {
        testBtn.value = new Date().toStandardString() + "|连接服务器" + this.Server + ",端口：" + this.Port;
        this.AutoConnectTimes += 1;
        this.FlashObject.ConnectServer(this.Server, this.Port);
    },
    closeConnection: function() {
        this.FlashObject.CloseServer();
    },
    close: function(_connected, _event) {
        this.ConnectStatus = _connected;
        if (!this.ConnectStatus) {
            testBtn.value = new Date().toStandardString() + "|与服务器断开，请刷新";
            clearInterval(this.AutoConnect);
            this.AutoConnect = setInterval(function() { flashServer.connect(); }, 1000 * 20);
        }
    },
    securityError: function(_event) {
        //alert("securityError:" + JSON.stringify(_event));
        clearInterval(this.AutoConnect);
        this.AutoConnect = setInterval(function() { flashServer.connect(); }, 1000 * 5);
    },
    ioError: function(_event) {
        alert("ioError:" + JSON.stringify(_event));
    },
    getError: function(_event) {
        alert("getError:" + JSON.stringify(_event));
    },
    changePort: function(port) {
        var tPort = this.Port;
        this.Port = port;
        this.closeConnection();
        this.connect();
        this.Port = tPort;
    },
    getData: function(_jsonStr) {
        if (_jsonStr.toString().indexOf("changePort") >= 0) {
            this.changePort(parseInt(_jsonStr.split("|")[1], 10));
            return;
        }
        if (isTestView) {
            var t = new Date();
            testObj.innerHTML = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "|" + _jsonStr;
        }
        _jsonStr = JSON.parse(_jsonStr);
        var js = _jsonStr.p[0].split(";");
        var noTime = false;
        switch (parseInt(_jsonStr.c, 10)) {
            case 2:
                var bf = new Array();
                bf.push(fvClass.BetFlash.DataModel.BetIssue);
                bf.push(fvClass.BetFlash.DataModel.BetLeaveTime);
                bf.push(fvClass.BetFlash.DataModel.TrueIssue);
                bf.push(fvClass.BetFlash.DataModel.DrawLeaveTime);
                bf.push(js[0].split("|")[0]);
                bf.push(js[0].split("|")[1]);
                js = bf;
                noTime = true;
                break;
        }
        fvClass.getDataModelBack(js.join(";"), parseInt(_jsonStr.c, 10), null, noTime);
    },
    wait: function() {
        var func = function(_this) {
            return function() {
                _this.wait();
            }
        } (this);
        var delay = 500;
        var tmpObj = $("LinkFlash");
        if (tmpObj == null) {
            setTimeout(func, delay);
            return;
        }
        this.FlashObject = tmpObj;
        if (typeof (this.FlashObject.ConnectServer) != "function") {
            setTimeout(func, delay);
            return;
        }
        this.connect();
    },
    construct: function() {
        this.wait();
    }
}
var flashServer = new TKCPCEO.Flash();