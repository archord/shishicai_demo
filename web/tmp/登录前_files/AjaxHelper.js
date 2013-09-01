/// <reference path="~/JS/NoUse/JScript.js" />
function GetAjaxComm() { return { "CommandName": "", "Parameters": [] }; }
function AjaxThread() {
    this.Request = false;
    this.Url = "/KAjax.ashx";
    this.Action = "";
    this.Data = "";
    this.ErrorMethod = "alert('网络故障，请刷新整个页面');";
    this.Init();
}

AjaxThread.prototype.Init = function () {
    try { this.Request = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (e) {
        try { this.Request = new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (e2) { this.Request = false; }
    }

    if (!this.Request && typeof XMLHttpRequest != 'undefined')
    { this.Request = new XMLHttpRequest(); }
}

AjaxThread.prototype.Send = function (ms) {
    var method = "NoName";
    try {
        method = "";
        var arySplit = unescape(this.Data).split("CommandName");
        for (var i = 1; i < arySplit.length; i++) {
            var regExp = /(.*)CommandName[\\]{0,1}\"\:[\\]{0,1}\"([^\\\"|^\"]*)[\\]{0,1}\"(.*)/g;
            method += i == 1 ? "" : "_";
            //            alert(unescape(this.Data) + "\n\n" + arySplit[i] + "\n" + ("CommandName" + arySplit[i]).replace(regExp, "$2"))
            method += ("CommandName" + arySplit[i]).replace(regExp, "$2");
        }
    } catch (e) { method = "NoName"; }
    this.Url += "?method=" + method + "&randomStr=" + (new Date().getHours()) + "" + (new Date().getMinutes()) + "" + (new Date().getSeconds()) + (ms == null ? "" : "&" + this.Data);
    var e = this.Request;
    var obj = this;
    var errMethod = this.ErrorMethod;
    this.Request.open(ms == null ? "POST" : ms, this.Url, true);
    this.Request.onreadystatechange = function () {
        if (e.readyState != 4) { return; }
        if (e.status != 200) {
            //            alert("网络故障，请刷新整个页面");
            //            document.write(e.responseText);
            //            alert(e.responseText);
            return;
        }
        try { eval(e.responseText); e = null; obj = null; }
        catch (err) {
            e = null; obj = null;
        }
    }
    this.Request.setRequestHeader("content-length", this.Data.length);
    this.Request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    this.Request.send(ms == null ? this.Data : null);
}

function SendToServer(data, sendUrl, ms, arg) {
    var ajax = new AjaxThread();
    if (sendUrl != null) {
        ajax.Url = sendUrl;
    }
    ajax.Data = (arg != null ? arg : "data") + "=" + escape(data);
    ajax.Send(ms);
}

function BetToServer(data, errorMethod, ms) {
    SendToServer(data, "/BetAjax.aspx", ms);
}

function JSONCommand() {
    ///<summary>JSONCommand对象</summary>
    ///<field name="CommandName">命令名称</field>
    ///<field name="Parameters">参数数组集合</field>
    this.CommandName = "";
    this.Parameters = [];
}
JSONCommand.prototype = {
    CommandName: "",
    Parameters: [],
    toString: function () {
        ///<summary>JSON序列化</summary>
        return JSON.stringify(this);
    }
}

function GetAjaxReturnByCode(_code, _str) {
    ///<summary>根据系统返回的相应状态码获取对应的解释</summary>
    ///<param name="_code">Ajax返回的状态相应码</param>
    var IR = "未知的异常错误";
    switch (_code) {
        case 8888:
            IR = "操作成功";
            break;
        case 9999:
            IR = "系统异常";
            break;
        case 1001:
            IR = "玩法不存在";
            break;
        case 1002:
            IR = "奖期不存在,可能是由于您网络问题导致,建议刷新页面重试 ";
            try {
                var splitEnter = "\r\n\r\n";
                var htmlErr = "用户本地时间：" + new Date().toString() + splitEnter + "彩种:" + betList.JsonCmdProject.LotteryType.toString();
                htmlErr += splitEnter + "当前期:" + $("ContainerCurrentBetIssue").innerHTML;
                htmlErr += splitEnter + "ListIssueString:" + betList.ListIssueString.toString();
                htmlErr += splitEnter + "ModelMutiply:" + JSON.stringify(betList.ModelMutiply.ListIssues);
                htmlErr += splitEnter + "ModelIssue:" + JSON.stringify(betList.ModelIssue.ListIssues);
                htmlErr += splitEnter + splitEnter + "ProjectString:" + JSON.stringify(betList.JsonCmdProject);
                SendToServer(htmlErr, "/Test.aspx");
            } catch (e) { }
            break;
        case 1003:
            IR = "奖期非投注状态";
            break;
        case 1004:
            IR = "期号不能为空";
            break;
        case 2001:
            IR = "票金额不相符";
            break;
        case 2002:
            IR = "投注号码格式错误";
            break;
        case 2003:
            IR = "方案总金额不相符";
            break;
        case 2004:
            IR = "票数据不能为空";
            break;
        case 2005:
            IR = "数据不一致";
            break;
        case 2006:
            IR = "数据有冲突";
            break;
        case 2007:
            IR = "网络异常，请重新点击“确认投注”";
            break;
        case 2008:
            IR = "倍数不正确";
            break;
        case 3001:
            IR = "用户未登录";
            break;
        case 3002:
            IR = "用户账户不存在";
            break;
        case 3003:
            IR = "用户账户可用余额不足";
            break;
        case 3004:
            IR = "用户账户异常";
            break;
        case 4001:
            IR = _str ? _str : "此彩种暂时停售";
            break;
        case 0:
            IR = "当前您使用的是游客账户，要使用此功能请注册您自己的账户!";
            break;
        case 2009:
            IR = "单张票金额不能超过2万元\n您可以尝试分成多次选号从而变成多张票来投注!";
            break;
    }
    return IR;
}


TKCPCEO.Cuser = function () {
    ///<summary>用户操作类</summary>
    ///<field name="Command">JSONCommand对象实例</field>
    ///<field name="HasLogin">用户登录状态</field>
    ///<field name="ButtonLogin">登录按钮对象</field>
    ///<field name="ModalDialog">遮罩类实例</field>
    ///<field name="UserInfo">用户信息集合</field>
    ///<field name="UserInfo.UserName">用户名</field>
    ///<field name="UserInfo.Balance">当前彩钟帐户余额</field>
    ///<field name="UserInfo.UnFetchMoney">彩金</field>
    ///<field name="UserInfo.CurrentLotteryType">当前彩种（打开页面赋值）</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Cuser.prototype = {
    Command: new JSONCommand(),
    HasLogin: false,
    ButtonLogin: null,
    ModalDialog: null,
    UserInfo: {
        UserId: 0,
        UserName: "",
        ListAccount: new Array(),
        TotalBalance: 0,
        Message: 0,
        Balance: -1,
        UnFetchMoney: 0,
        CurrentLotteryType: -1,
        SessinCode: "",
        UrlLoginBack: "",
        Point: 0,
        UserPhoneBinded: false,
        VIP: false
    },
    ObjUserInfo: {
        ObjUserName: null,
        ObjVIP: null,
        ObjPhone: null,
        ObjMoney: null,
        IdUserName: "UserInfo_UserName",
        IdVIP: "UserInfo_VIP",
        IdPhone: "UserInfo_Phone",
        IdMoney: "UserInfo_Money",
        BtnRefresh: null
    },
    refreshBalanceUpdate: function () {
        if (this.ObjUserInfo.BtnRefresh.getAttribute("status") == "0") {
            this.ObjUserInfo.BtnRefresh.style.color = "#aaa";
            this.ObjUserInfo.BtnRefresh.setAttribute("status", "1");
            this.getNewUserInfo();
        }
    },
    refreshBalanceUpdateBack: function () {
        this.ObjUserInfo.BtnRefresh.style.color = "#ff6c16";
        this.ObjUserInfo.BtnRefresh.setAttribute("status", "0");
    },
    appendBtnRefreshBalance: function () {
        try {
            if (this.HasLogin) {
                var UserInfo_MoneyBox = $("UserInfo_MoneyBox");
                var items = UserInfo_MoneyBox.getElementsByTagName("li");
                items[items.length - 1].appendChild(this.ObjUserInfo.BtnRefresh);
            }
        } catch (e1) {
            try {
                //                var logined_Money_Parent = $("logined_Money").parentNode;
                //                logined_Money_Parent.insertBefore(this.ObjUserInfo.BtnRefresh, logined_Money_Parent.getElementsByTagName("a")[0]);
            } catch (e2) { }
        }
    },
    login: function (_objUser, _objPwd, _objSession, eve) {
        ///<summary>用户登录操作</summary>
        ///<param name="_user">用户名</param>
        ///<param name="_pwd">密码</param>
        try {
            eve = window.event || eve;
            this.ButtonLogin = eve.target || eve.srcElement;
            this.ButtonLogin.disabled = true;
        } catch (e) {
            this.ButtonLogin = eve;
            this.ButtonLogin.disabled = true;
        }
        this.Command.Parameters = [];
        this.Command.Parameters.push(_objUser.value.trim());
        this.Command.Parameters.push(_objPwd.value);
        this.Command.Parameters.push(_objSession.value.trim());
        this.Command.Parameters.push(this.UserInfo.CurrentLotteryType);
        //        alert(this.Command.toString());
        SendToServer(this.Command.toString());
    },
    loginMoNi: function (_MoNiUserName, eve) {
        try {
            eve = window.event || eve;
            this.ButtonLogin = eve.target || eve.srcElement;
            this.ButtonLogin.disabled = true;
        } catch (e) {
            this.ButtonLogin = eve;
            this.ButtonLogin.disabled = true;
        }
        this.Command.Parameters = [];
        this.Command.Parameters.push(_MoNiUserName);
        this.Command.Parameters.push("");
        this.Command.Parameters.push("");
        this.Command.Parameters.push(this.UserInfo.CurrentLotteryType);
        //        alert(this.Command.toString());
        SendToServer(this.Command.toString());
    },
    refreshUserInfo: function () {
        ///<summary>局部刷新用户信息</summary>
        if (this.ObjUserInfo.ObjUserName == null) {
            try {
                this.ObjUserInfo.ObjUserName = $(this.ObjUserInfo.IdUserName);
                this.ObjUserInfo.ObjMoney = $(this.ObjUserInfo.IdMoney);
                this.ObjUserInfo.ObjVIP = $(this.ObjUserInfo.IdVIP);
                this.ObjUserInfo.ObjPhone = $(this.ObjUserInfo.IdPhone);
            } catch (e) {
                this.ObjUserInfo.ObjUserName = null;
                this.ObjUserInfo.ObjMoney = null;
                this.ObjUserInfo.ObjVIP = null;
                this.ObjUserInfo.ObjPhone = null;
            }
        }
        if (this.ObjUserInfo.ObjUserName != null) {
            try {
                this.ObjUserInfo.ObjUserName.innerHTML = this.UserInfo.UserName;
                this.ObjUserInfo.ObjVIP.style.display = this.UserInfo.VIP ? "" : "none";
                this.ObjUserInfo.ObjPhone.style.display = this.UserInfo.UserPhoneBinded ? "" : "none";
            } catch (e) { }
        }
        this.ObjUserInfo.ObjMoney = this.ObjUserInfo.ObjMoney || $("logined_Money");
        if (this.ObjUserInfo.ObjMoney != null) {
            this.ObjUserInfo.ObjMoney.innerHTML = parseFloat(this.UserInfo.Balance, 10).toString().toMoney().replace("￥", "");
        }
        try {
            $("UserInfo_AccountTotal").innerHTML = this.UserInfo.TotalBalance.toString().toMoney();
            for (var i = 0; i < this.UserInfo.ListAccount.length; i++) {
                if (this.UserInfo.ListAccount[i].CommandName == "0") {
                    if ($("UserInfo_Account" + this.UserInfo.ListAccount[i].CommandName) == null) {
                        var li = document.createElement("li");
                        li.innerHTML = this.UserInfo.ListAccount[i].Parameters[1].replace("网站代管账户", "网站账户") + "：" + "<em id=\"UserInfo_Account" + this.UserInfo.ListAccount[i].CommandName + "\">" + this.UserInfo.ListAccount[i].Parameters[0].toString().toMoney() + "</em>";
                        $("UserInfo_AccountTotal").parentNode.parentNode.appendChild(li);
                    } else {
                        $("UserInfo_Account" + this.UserInfo.ListAccount[i].CommandName).innerHTML = this.UserInfo.ListAccount[i].Parameters[0].toString().toMoney();
                    }
                    this.appendBtnRefreshBalance();
                }
            }
            if (parseInt(this.UserInfo.Message.toString().replace("(", "").replace(")", ""), 10) > 0) {
                $("UserInfo_Message").className = "msg msg_on";
            }
            $("UserInfo_Message").innerHTML = this.UserInfo.Message.toString();
            $("usercenterMoney").innerHTML = this.UserInfo.TotalBalance.toString().toMoney();
        } catch (e) { }
    },
    setUserInfo: function (_userName, _balance, _unFetchMoney, _currentLotteryType) {
        ///<summary>设置已经登录用户信息</summary>
        this.UserInfo.UserName = _userName;
        this.UserInfo.Balance = _balance;
        this.UserInfo.UnFetchMoney = _unFetchMoney;
        this.UserInfo.CurrentLotteryType = _currentLotteryType;
        this.refreshUserInfo();
    },
    getNewUserInfo: function () {
        ///<summary>获取最新帐户信息</summary>
        var jsonCmd = new JSONCommand();
        jsonCmd.CommandName = "UserCenter";
        var tempJson = new JSONCommand();
        tempJson.CommandName = "GetUserCommon";
        tempJson.Parameters.push(this.UserInfo.CurrentLotteryType);
        jsonCmd.Parameters.push(tempJson.toString());
        SendToServer(jsonCmd.toString());
    },
    getNewUserInfoBack: function (jsonObj) {
        ///<summary>获取最新帐户信息反馈信息</summary>
        var pLen = jsonObj.Parameters.length;
        for (var i = 0; i < pLen - 3; i++) {
            this.UserInfo.ListAccount.push(eval("(" + jsonObj.Parameters[i] + ")"));
        }
        this.UserInfo.TotalBalance = eval("(" + jsonObj.Parameters[pLen - 3] + ")").Parameters[0];
        this.UserInfo.Balance = jsonObj.Parameters[pLen - 2].toString();
        this.UserInfo.Message = jsonObj.Parameters[pLen - 1].toString();
        try {
            window.opener.cuser.getNewUserInfo();
        } catch (e) { }
        try {
            this.setUserInfo(this.UserInfo.UserName, this.UserInfo.Balance, this.UserInfo.UnFetchMoney, this.UserInfo.CurrentLotteryType);
            this.ModalDialog.hide();
        } catch (e) { }
        try {
            this.refreshBalanceUpdateBack();
        } catch (e) { }
    },
    loginedEventHandler: function () {
        ///<summary>登录成功触发事件</summary>
    },
    loginedEventHandler_Default: function () {

    },
    loginedFailEventHandler: function () {
        ///<summary>登录失败触发事件</summary>
    },
    loginBack: function (_jsonCmd) {
        ///<summary>登录反馈信息</summary>
        //        alert(JSON.stringify(_jsonCmd));
        if (_jsonCmd.CommandName == "true") {//登录成功
            var pLen = _jsonCmd.Parameters.length;
            this.UserInfo.UserId = _jsonCmd.Parameters[0];
            this.UserInfo.UserName = _jsonCmd.Parameters[1];
            this.UserInfo.Balance = parseFloat(_jsonCmd.Parameters[2]);
            var jsonBalance = new JSONCommand();
            jsonBalance.CommandName = "0";
            jsonBalance.Parameters.push(this.UserInfo.Balance);
            jsonBalance.Parameters.push("网站账户");
            this.UserInfo.ListAccount.push(jsonBalance);
            this.UserInfo.ListAccount.push(this.UserInfo.Balance);
            this.UserInfo.Message = parseInt(_jsonCmd.Parameters[3], 10);
            this.UserInfo.Point = parseInt(_jsonCmd.Parameters[4], 10);
            this.UserInfo.VIP = eval(_jsonCmd.Parameters[5]);
            this.UserInfo.UserPhoneBinded = eval(_jsonCmd.Parameters[6]);
            this.UserInfo.UrlLoginBack = _jsonCmd.Parameters[7];
            this.HasLogin = true;
            this.refreshUserInfo();
            this.loginedEventHandler_Default();
            this.loginedEventHandler();
            try {
                $("IconImage").src = $("IconImage").src.replace("UserName=", "UserName=" + escape(this.UserInfo.UserName)).replace("UserId=0", "UserId=" + escape(this.UserInfo.UserId));
            } catch (e) {
                //alert(e.message);
            }
        } else {
            var Err = "";
            switch (_jsonCmd.Parameters[0]) {
                case "2": //密码错误
                    Err = "用户名或密码错误";
                    break;
                case "3": //用户不存在
                    Err = "用户名或密码错误";
                    break;
                case "4": //用户不允许登录
                    Err = "该账户已被锁定，不允许登录";
                    break;
                default: //验证码错误
                    Err = "验证码错误";
                    break;
            }
            alert(Err);
            try {
                this.ButtonLogin.disabled = false;
            } catch (e) { }
            try {
                showSessionImg(Login_Img_Loading, Login_Img);
            } catch (e) { }
            try {
                reLoadSessionCode();
            } catch (e) { };
            if (_jsonCmd.Parameters[0] != "1") {
                try {
                    //Login_SCBox.style.display = "none";
                    Login_UserName.focus();
                } catch (e) { }
            } else {
                try {
                    //                    alert(_jsonCmd.Parameters[1] + "\n" + _jsonCmd.Parameters[2]);
                    Login_SessinCode.focus();
                } catch (e) { }
            }
            try {
                if (_jsonCmd.Parameters[1] == "true") {
                    Login_SessinCode.parentNode.parentNode.style.display = "";
                }
            } catch (e) { }
            this.HasLogin = false;
            this.loginedFailEventHandler();
        }
    },
    construct: function () {
        ///<summary>构造函数</summary>
        this.Command.CommandName = "UserLogin";
        this.UserInfo.ListAccount = [];

        this.ObjUserInfo.BtnRefresh = document.createElement("a");
        this.ObjUserInfo.BtnRefresh.href = "javascript:void(0)";
        this.ObjUserInfo.BtnRefresh.innerHTML = "[刷新]";
        this.ObjUserInfo.BtnRefresh.title = "点击更新网站余额";
        this.ObjUserInfo.BtnRefresh.onclick = this.refreshBalanceUpdate.bind(this);
        this.refreshBalanceUpdateBack();
        try {
            attachEvent("onload", this.appendBtnRefreshBalance.bind(this));
        } catch (e1) {
            try {
                addEventListener("load", this.appendBtnRefreshBalance.bind(this), false);
            } catch (e2) { }
        }
    }
}
var cuser = new TKCPCEO.Cuser();