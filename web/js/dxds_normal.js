/// <reference path="~/JS/NoUse/JScript.js" />

TKCPCEO.Lottery.FCCQSSC.Pick = function() {
    ///<summary>选号类</summary>
    ///<field name="Container">选号球对象集合容器</field>
    ///<field name="ObjRemark">标注Title显示对象</field>
    ///<field name="ListData">初始化选球对象集合数据，包含Text,Value</field>
    ///<field name="ListHelpBtn">帮助按钮集合对象文本</field>
    ///<field name="ListBalls">当前生成的所有选号球对象集合</field>
    ///<field name="SelectBalls">当前选中的所有选好球对象集合</field>
    ///<field name="PrimeArray">质数集合</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.Pick.Result = function() {
    ///<summary>投注选号结果类</summary>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.Pick.Result.prototype = {
    ListBetList: new Array(),
    PickClass1: null,
    PickClass10: null,
    PerMoney: 2,
    BetCount: 0,
    BetMoney: 0,
    PickInfo: {
        BetCount: null,
        BetMoney: null
    },
    setRemarkValue: function(_Value, _isLengRe) {
        ///<summary>设置球的备注值（冷热、遗漏、当期热选等）</summary>
        var IsEmpty = _Value == null;
        var _arrayListValue = new Array();
        if (IsEmpty == true) {
            _arrayListValue = ["", "", "", ""];
        } else {
            _arrayListValue = _Value.split(",");
        }
        if (_arrayListValue.length != 4) { _arrayListValue = ["&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;"]; }
        var maxIndex = [-1, -1];
        var maxValue = [0, 0];
        for (var i = 0; i < _arrayListValue.length; i++) {
            var fenweiAry = _arrayListValue[i].split("|");
            //最大值
            for (var x = 1; x >= 0; x--) {
                var regExp = new RegExp(/\d+/);
                if (regExp.test(fenweiAry[x])) {
                    if (parseInt(fenweiAry[x], 10) > maxValue[1 - x]) {
                        maxValue[1 - x] = parseInt(fenweiAry[x], 10);
                        maxIndex[1 - x] = i;
                    }
                }
            }
            //最大值
            if (_isLengRe != true) {
                this.PickClass1.ListBalls[i].pYiLou.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[1];
                this.PickClass10.ListBalls[i].pYiLou.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[0];
            } else {
                this.PickClass1.ListBalls[i].pLengRe.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[1];
                this.PickClass10.ListBalls[i].pLengRe.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[0];
            }
        }
        for (var i = 0; i < maxIndex.length; i++) {
            var pc = null;
            switch (i) {
                case 1:
                    pc = this.PickClass10;
                    break;
                default:
                    pc = this.PickClass1;
                    break;
            }
            var pcP = _isLengRe != true ? pc.ListBalls[maxIndex[i]].pYiLou : pc.ListBalls[maxIndex[i]].pLengRe;
            if (maxIndex[i] != -1) {
                pcP.innerHTML = "<b style=\"color:#EBAB00;font-weight:bold;\">" + pcP.innerHTML + "</b>";
            }
        }
    },
    compute: function() {
        ///<summary>计算选号结果</summary>
        this.BetCount = TKCPCEO.Math.C(1, this.PickClass1.SelectBalls.length) * TKCPCEO.Math.C(1, this.PickClass10.SelectBalls.length);
        this.BetMoney = this.BetCount * this.PerMoney;

        this.PickInfo.BetCount.innerHTML = this.BetCount.toString();
        this.PickInfo.BetMoney.innerHTML = this.BetMoney.toString().toMoney();
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.PickClass1 == null || this.PickClass10 == null) {
            alert("初始化前请先做好准备工作");
            return;
        }
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.PerMoney = 2;
        this.BetCount = 0;
        this.BetMoney = 0;
    }
}
var PickR = new TKCPCEO.Lottery.FCCQSSC.Pick.Result();
TKCPCEO.Lottery.FCCQSSC.Pick.prototype = {
    Container: null,
    ObjRemarkYiLou: null,
    ObjRemarkLengRe: null,
    ListData: new Array(),
    ListHelpBtn: new Array(),
    ListBalls: new Array(),
    SelectBalls: new Array(),
    CssClass: {
        HeadLi: ""
    },
    Text: {
        HeadTitle: ""
    },
    selectedChange: function() {
        ///<summary>选球变更事件</summary>
    },
    clickBall: function(_ballItem, _isCompute, _isClear) {
        ///<summary>选号球点击事件</summary>
        if (_isClear == true) {
            this.exeCommand("清");
        }
        if (this.SelectBalls.exists(_ballItem)) {
            _ballItem.span.className = null;
            this.SelectBalls.remove(_ballItem);
        } else {
            _ballItem.span.className = "active";
            this.SelectBalls.push(_ballItem);
        }
        if (_isCompute == true) {
            PickR.compute();
        }
        this.selectedChange();
    },
    exeCommand: function(_cmdText) {
        ///<summary>帮助按钮执行操作</summary>
        ///<param name="_cmdText">操作命令内容</param>
        for (var i = 0; i < this.ListBalls.length; i++) {
            var _objBall = this.ListBalls[i];
            switch (_cmdText) {
                case "清":
                    if (this.SelectBalls.exists(_objBall)) {
                        this.clickBall(_objBall, false);
                    }
                    break;
            }
        }
        PickR.compute();
    },
    createBalls: function() {
        ///<summary>初始创建选号球</summary>
        var oFragment = document.createDocumentFragment();
        var liHead = document.createElement("li");
        liHead.className = this.CssClass.HeadLi;
        var emTitle = document.createElement("em");
        emTitle.appendChild(document.createTextNode(this.Text.HeadTitle));
        this.ObjRemarkYiLou = document.createElement("p");
        this.ObjRemarkYiLou.appendChild(document.createTextNode("遗漏"));
        this.ObjRemarkLengRe = document.createElement("p");
        this.ObjRemarkLengRe.appendChild(document.createTextNode("冷热"));
        liHead.appendChild(emTitle);
        liHead.appendChild(this.ObjRemarkYiLou);
        liHead.appendChild(this.ObjRemarkLengRe);

        oFragment.appendChild(liHead);

        for (var i = 0; i < this.ListData.length; i++) {
            var li = document.createElement("li");
            var span = document.createElement("span");
            span.setAttribute("unselectable", "on");
            span.appendChild(document.createTextNode(this.ListData[i].Text));
            span.setAttribute("value", this.ListData[i].Value);
            var pYiLou = document.createElement("p");
            pYiLou.innerHTML = "&nbsp;";
            var pLengRe = document.createElement("p");
            pLengRe.innerHTML = "&nbsp;";

            li.span = span;
            li.pYiLou = pYiLou;
            li.pLengRe = pLengRe;
            li.appendChild(span);
            li.appendChild(pYiLou);
            li.appendChild(pLengRe);
            oFragment.appendChild(li);

            span.onclick = this.clickBall.bind(this, li, true, true);

            this.ListBalls.push(li);
        }
        this.Container.appendChild(oFragment);
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.ListData.length == 0) {
            alert("请先设置选号对象集合\nText,Value");
            return;
        }
        if (this.Container == null) {
            alert("初始化前请先做好准备工作");
            return;
        }
        this.createBalls();
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.Container = null;
        this.ObjRemark = null;
        this.ListData = [];
        this.ListBalls = [];
        this.SelectBalls = [];
    }
}

TKCPCEO.Lottery.FCCQSSC.Filter = function() {
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.Filter.prototype = {
    BtnSubmitTicket: null,
    ListBonus: new Array(),
    ListClientBouns: new Array(),
    ListBetCount: new Array(),
    getFilterBonusList: function() {
        if (pickClass1.SelectBalls.length < 1 || pickClass10.SelectBalls.length < 1) {
            alert("请先正确选择号码");
            return false;
        }
        this.ListBonus.clear();
        this.ListClientBouns.clear();
        this.ListBetCount.clear();
        this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.sDXDS;
        var ball10 = "";
        var txtBall10 = "";
        for (var j = 0; j < pickClass10.SelectBalls.length; j++) {
            ball10 = pickClass10.SelectBalls[j].span.getAttribute("value");
            txtBall10 = pickClass10.SelectBalls[j].span.innerHTML;
        }
        var ball1 = "";
        var txtBall1 = "";
        for (var j = 0; j < pickClass1.SelectBalls.length; j++) {
            ball1 = pickClass1.SelectBalls[j].span.getAttribute("value");
            txtBall1 = pickClass1.SelectBalls[j].span.innerHTML;
        }
        this.ListBonus.push(ball10 + "," + ball1);
        this.ListClientBouns.push(txtBall10 + "," + txtBall1);
        this.ListBetCount.push(1);
        return true;
    },
    submitTicket: function() {
        ///<summary>放入投注单</summary>
        var betList = parent.betList;
        if (this.getFilterBonusList() == false) { return; }
        for (var i = 0; i < this.ListBonus.length; i++) {
            betList.addItem(parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.BetMethod.Standard, this.PlayType, this.ListBonus[i], this.ListClientBouns[i], this.ListBetCount[i]);
        }
        pickClass10.exeCommand("清");
        pickClass1.exeCommand("清");
    },
    initialize: function() {
        this.BtnSubmitTicket.onclick = this.submitTicket.bind(this);
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.ListBonus = [];
        this.ListClientBouns = [];
        this.BtnSubmitTicket = null;
    }
}

TKCPCEO.Lottery.FCCQSSC.UpdateData = function() {
    ///<summary>遗漏数据操作类</summary>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.UpdateData.prototype = {
    Container: {
        UpdateDataMenu: null,
        UpdateDataNormalYiLou: null,
        UpdateData10Trend: null,
        UpdateDataXingTaiYiLou: null
    },
    CurrrentMenu: null,
    setMenu: function(_menu) {
        ///<summary>设置当前菜单</summary>
        if (this.CurrrentMenu != null) {
            this.CurrrentMenu.className = null;
            this.CurrrentMenu.wrap.style.display = "none";
        }
        this.CurrrentMenu = _menu;
        this.CurrrentMenu.className = "active";
        this.CurrrentMenu.wrap.style.display = "";
        parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
    },
    initialize: function() {
        ///<summary>初始化</summary>
        this.Container.UpdateDataMenu = $("ContainerUpdateDataMenu");
        this.Container.UpdateDataNormalYiLou = $("ContainerNormalYiLou");
        this.Container.UpdateData10Trend = $("Container10Trend");
        this.Container.UpdateDataXingTaiYiLou = $("ContainerXingTaiYiLou");

        var menus = this.Container.UpdateDataMenu.getElementsByTagName("li");
        menus[0].wrap = this.Container.UpdateDataNormalYiLou.parentNode;
        menus[1].wrap = this.Container.UpdateDataXingTaiYiLou;
        menus[2].wrap = this.Container.UpdateData10Trend.parentNode;
        for (var i = 0; i < menus.length; i++) {
            menus[i].onclick = this.setMenu.bind(this, menus[i]);
        }
        menus[0].onclick();
    },
    construct: function() {
        ///<summary>构造函数</summary>
    }
}

function dataYiLouOnMouseOver(_spanObj) {
    ///<summary>鼠标经过遗漏数据时的事件</summary>
    _spanObj.className += " ybtn ybtn_active";
}
function dataYiLouOnMouseOut(_spanObj) {
    ///<summary>鼠标移出遗漏数据时的事件</summary>
    _spanObj.className = _spanObj.getAttribute("css");
}

function PickBallsByYiLouData(_span) {
    ///<summary>根据遗漏数据选号</summary>
    var _key = _span.innerHTML;
    function checkBallCondition(_value, _indexBall) {
        var isValidate = false;
        isValidate = _value == _key.split("")[_indexBall];
        return isValidate;
    }
    for (var i = 0; i < PickR.PickClass1.ListBalls.length; i++) {
        var value = PickR.PickClass1.ListBalls[i].span.innerHTML;
        if (checkBallCondition(value, 1) == true) {
            PickR.PickClass1.ListBalls[i].span.onclick();
        }
    }
    for (var i = 0; i < PickR.PickClass10.ListBalls.length; i++) {
        var value = PickR.PickClass10.ListBalls[i].span.innerHTML;
        if (checkBallCondition(value, 0) == true) {
            PickR.PickClass10.ListBalls[i].span.onclick();
        }
    }
}

function getBonusResultList(_bonusNumber) {
    ///<summary>根据开奖号码获取形态</summary>
    _bonusNumber = _bonusNumber.toString();
    var listR = new Array();
    var ball1 = parseInt(_bonusNumber.substr(4, 1), 10);
    var ball2 = parseInt(_bonusNumber.substr(3, 1), 10);
    var ball3 = parseInt(_bonusNumber.substr(2, 1), 10);
    var ball4 = parseInt(_bonusNumber.substr(1, 1), 10);
    var ball5 = parseInt(_bonusNumber.substr(0, 1), 10);
    var dxds2 = (ball2 >= 5 ? "大" : "小") + (ball2 % 2 == 1 ? "单" : "双");
    var dxds1 = (ball1 >= 5 ? "大" : "小") + (ball1 % 2 == 1 ? "单" : "双");
    var qd = ball2 >= 5 && ball1 >= 5 ? "<b>√</b>" : "&nbsp;";
    var qx = ball2 < 5 && ball1 < 5 ? "<b>√</b>" : "&nbsp;";
    var qdan = ball2 % 2 == 1 && ball1 % 2 == 1 ? "<b>√</b>" : "&nbsp;";
    var qs = ball2 % 2 == 0 && ball1 % 2 == 0 ? "<b>√</b>" : "&nbsp;";
    listR.push(dxds2);
    listR.push(dxds1);
    listR.push(qd);
    listR.push(qx);
    listR.push(qdan);
    listR.push(qs);
    return listR;
}

function Event_UpdateData_YiLou() {
    ///<summary>更新遗漏数据</summary>
    if (parent.TotalLoadData == null || parent.TotalLoadData.YiLou == null) { setTimeout(function() { Event_UpdateData_YiLou(); }, 1000); return; }
    var htmlXingTai = new Array();  ///形态遗漏
    var dataYiLou = parent.TotalLoadData.YiLou;

    var conxt = $("ContainerXingTaiYiLou");
    var table1 = conxt.getElementsByTagName("table")[0];
    var table2 = conxt.getElementsByTagName("table")[1];

    function fillFenWeiYiLou(_indexFenWei, _dataYiLouItem) {
        for (var i = 0; i < 4; i++) {
            var indexFirst = -1;
            switch (_dataYiLouItem.MissValue[i].MissKey) {
                case "大":
                    indexFirst = 0;
                    break;
                case "小":
                    indexFirst = 1;
                    break;
                case "单":
                    indexFirst = 2;
                    break;
                case "双":
                    indexFirst = 3;
                    break;
            }
            fenWeiYiLou[indexFirst][_indexFenWei] = parseInt(_dataYiLouItem.MissValue[i].MissValue, 10);
        }
    }

    var fenWeiYiLou = [[0, 0], [0, 0], [0, 0], [0, 0]];
    //大[十位,个位],小[十位,个位]……

    for (var i = 0; i < parent.TotalLoadData.YiLou.length; i++) {
        ///十位遗漏
        if (dataYiLou[i].MissKey == "20") {
            fillFenWeiYiLou(0, dataYiLou[i]);
        }
        ///个位遗漏
        if (dataYiLou[i].MissKey == "10") {
            fillFenWeiYiLou(1, dataYiLou[i]);
        }

        ///形态遗漏
        if (dataYiLou[i].MissKey == "291") {
            var len = dataYiLou[i].MissValue.length;
            for (var j = 0; j < len; j++) {
                var object = dataYiLou[i].MissValue[j];
                var table = j < (len / 2) ? table1 : table2;
                var yilouValue = object.MissValue;
                var appearCount = object.AppearCount == null ? j : parseInt(object.AppearCount, 10);
                var aveYiLou = Math.round((parent.TotalLoadData.TotalBonusCount - appearCount - yilouValue) / appearCount);
                table.rows[0].cells[j % (len / 2) + 1].innerHTML = "<span class=\"ybtn\" css=\"ybtn\" onclick=\"PickBallsByYiLouData(this)\" onmouseover=\"dataYiLouOnMouseOver(this)\" onmouseout=\"dataYiLouOnMouseOut(this)\">" + object.MissKey + "</span>";
                table.rows[1].cells[j % (len / 2) + 1].innerHTML = "<span>" + yilouValue + "</span>";
                table.rows[3].cells[j % (len / 2) + 1].innerHTML = "<span>" + aveYiLou.toString() + "</span>";
            }
        }
    }
    var fenWeiYiLouStr = "";
    for (var i = 0; i < fenWeiYiLou.length; i++) {
        fenWeiYiLouStr += i == 0 ? "" : ",";
        fenWeiYiLouStr += fenWeiYiLou[i].join("|");
    }
    PickR.setRemarkValue(fenWeiYiLouStr);
    $("ContainerNormalYiLou").innerHTML = parent.StringHtml_NormalYiLou;
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}

var orderDesc = parent.orderDesc;
function Event_UpdateData_Bonus(_actionOrder) {
    ///<summary>更新开奖数据</summary>
    if (parent.TotalLoadData == null || parent.TotalLoadData.Bonus == null) { setTimeout(function() { Event_UpdateData_Bonus(); }, 1000); return; }
    var bonusStrAry = parent.TotalLoadData.Bonus;
    var html = "<table>";
    html += "<tr><th";
    orderDesc = _actionOrder == true ? !orderDesc : orderDesc;
    if (parent.iframeBonusOrder) {
        html += " onclick=\"Event_UpdateData_Bonus(true)\" style=\"cursor:pointer;\" title=\"" + (orderDesc ? parent.TextOrderCharactor.Desc_Title : parent.TextOrderCharactor.Asc_Title) + "\"";
    }
    html += ">期号" + (orderDesc ? parent.TextOrderCharactor.Desc : parent.TextOrderCharactor.Asc) + "</th><th>开奖号码</th><th>十位</th><th>个位</th><th>全大</th><th>全小</th><th>全单</th><th>全双</th></tr>";
    var htmlSort = "";
    for (var i = 0; i < bonusStrAry.length - 2; i++) {
        var issue = bonusStrAry[i].split("|")[0];
        var listR = getBonusResultList(bonusStrAry[i].split("|")[1].toString());
        var bonus5 = bonusStrAry[i].split("|")[1].toString().substr(0, 1);
        var bonus4 = bonusStrAry[i].split("|")[1].toString().substr(1, 1);
        var bonus3 = bonusStrAry[i].split("|")[1].toString().substr(2, 1);
        var bonus2 = bonusStrAry[i].split("|")[1].toString().substr(3, 1);
        var bonus1 = bonusStrAry[i].split("|")[1].toString().substr(4, 1);
        var addString = "<tr><td>" + issue.split("-")[1] + "期</td><td class=\"n\">" + bonus5 + bonus4 + bonus3 + "<strong>" + bonus2 + bonus1 + "</strong>" + "</td><td>" + listR[0] + "</td><td>" + listR[1] + "</td><td>" + listR[2] + "</td><td>" + listR[3] + "</td><td>" + listR[4] + "</td><td>" + listR[5] + "</td></tr>";
        if (orderDesc) {
            html += addString;
        } else {
            htmlSort = addString + htmlSort;
        }
    }
    html += htmlSort;
    html += "</table>";
    $("Container10Trend").innerHTML = html;
//    $("Container10Trend").innerHTML = html + html.replace("<table>", "<table style=\"display:none;\">");
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}

function Event_UpdateData_LengRe() {
    ///<summary>更新冷热数据</summary>
    if (parent.TotalLoadData == null || parent.TotalLoadData.LengRe == null) { setTimeout(function() { Event_UpdateData_LengRe(); }, 1000); return; }
    var lengReAry = parent.TotalLoadData.LengRe;
    var fenWeiLengRe = ["", "", "", ""];
    for (var i = 0; i < lengReAry.length; i++) {
        if (i >= 5 && i <= 6) {///大小单双分为遗漏
            for (var j = 0; j < lengReAry[i].length; j++) {
                fenWeiLengRe[j] += i == 5 ? "" : "|";
                fenWeiLengRe[j] += lengReAry[i][j].toString();
            }
        }
        if (i == 7) {
            var conxt = $("ContainerXingTaiYiLou");
            var table1 = conxt.getElementsByTagName("table")[0];
            var table2 = conxt.getElementsByTagName("table")[1];
            for (var j = 0; j < lengReAry[i].length; j++) {
                var table = j < (lengReAry[i].length / 2) ? table1 : table2;
                table.rows[4].cells[j % (lengReAry[i].length / 2) + 1].innerHTML = lengReAry[i][j].toString();
            }
        }
    }
    ///分为冷热
    PickR.setRemarkValue(fenWeiLengRe.join(","), true);
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}