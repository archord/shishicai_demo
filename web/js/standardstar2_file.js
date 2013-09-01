/// <reference path="~/JS/NoUse/JScript.js" />

TKCPCEO.Lottery.FCCQSSC.File = function() {
    ///<summary>文件投注</summary>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}

TKCPCEO.Lottery.FCCQSSC.File.prototype = {
    TextArea: null,
    PlayType: -1,
    BtnSubmitTicket: null,
    ListInputValue: new Array(),
    ListErrorValue: new Array(),
    ListOKValue: new Array(),
    ListBonus: new Array(),
    ListClientBouns: new Array(),
    ListBetCount: new Array(),
    check: function(_rowItem) {
        ///<summary>验证格式</summary>
        var IR = false;
        var regExp = /^([0-9]\s)([0-9])$/;
        if (regExp.test(_rowItem)) {
//            var listR = _rowItem.split(" ");
//            if (!listR.hasRepeat()) {
                IR = true;
//            }
        }
        return IR;
    },
    filterFormat: function() {
        ///<summary>初始格式化</summary>
        this.ListBonus = [];
        this.ListClientBouns = [];
        this.ListBetCount = [];
        this.ListInputValue = [];
        this.ListOKValue = [];
        this.ListErrorValue = [];
        var textValue = this.TextArea.value.replace(/\s+/g, "\n");
        this.ListInputValue = textValue.split("\n");
        var regExp = "";
        for (var i = 0; i < this.ListInputValue.length; i++) {
            this.ListInputValue[i] = parent.LotteryAnteCodeClientInputFormat(this.ListInputValue[i]);
            this.ListInputValue[i] = this.ListInputValue[i].split("").join(" ");
            regExp = /\,+/g;
            this.ListInputValue[i] = this.ListInputValue[i].replace(regExp, " ");
            regExp = /\.+/g;
            this.ListInputValue[i] = this.ListInputValue[i].replace(regExp, " ");
            regExp = /\++/g;
            this.ListInputValue[i] = this.ListInputValue[i].replace(regExp, " ");
            regExp = /\s+/g;
            this.ListInputValue[i] = this.ListInputValue[i].replace(regExp, " ");

            if (this.check(this.ListInputValue[i])) {
                this.ListOKValue.push(this.ListInputValue[i]);
            } else {
                this.ListErrorValue.push(this.ListInputValue[i]);
            }
        }
        for (var i = 0; i < this.ListOKValue.length; i++) {
            var ball = this.ListOKValue[i].split(" ");
            this.ListBonus.push("_,_,_," + ball[0] + "," + ball[1]);
            this.ListClientBouns.push(ball[0] + "," + ball[1]);
            this.ListBetCount.push(1);
        }
    },
    submitTicket: function() {
        ///<summary>放入投注单</summary>
        this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2DanShi;
        this.filterFormat();
        var betList = parent.betList;
        for (var i = 0; i < this.ListBonus.length; i++) {
            betList.addItem(parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.BetMethod.File, this.PlayType, this.ListBonus[i], this.ListClientBouns[i], this.ListBetCount[i]);
        }
        this.TextArea.value = "";
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.BtnSubmitTicket == null || this.TextArea == null) {
            alert("未初始化");
            return;
        }
        this.BtnSubmitTicket.onclick = this.submitTicket.bind(this);
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.PlayType = -1;
        this.BtnSubmitTicket = null;
        this.ListInputValue = [];
        this.ListErrorValue = [];
        this.ListOKValue = [];
        this.ListBonus = [];
        this.ListBetCount = [];
        this.ListClientBouns = [];
    }
}

function Event_UpdateData_Bonus() { }
function Event_UpdateData_YiLou() { }
function Event_UpdateData_LengRe() { }