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
            _arrayListValue = ["", "", "", "", "", "", "", "", "", ""];
        } else {
            _arrayListValue = _Value.split(",");
        }
        if (_arrayListValue.length != 10) { _arrayListValue = ["&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;"]; }
        var maxIndex = [-1, -1];
        var maxValue = [0, 0];
        for (var i = 0; i < _arrayListValue.length; i++) {
            var fenweiAry = _arrayListValue[i].split("|");
            //最大值
            for (var x = 4; x >= 3; x--) {
                var regExp = new RegExp(/\d+/);
                if (regExp.test(fenweiAry[x])) {
                    if (parseInt(fenweiAry[x], 10) > maxValue[4 - x]) {
                        maxValue[4 - x] = parseInt(fenweiAry[x], 10);
                        maxIndex[4 - x] = i;
                    }
                }
            }
            //最大值
            if (_isLengRe != true) {
                this.PickClass1.ListBalls[i].pYiLou.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[4];
                this.PickClass10.ListBalls[i].pYiLou.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[3];
            } else {
                this.PickClass1.ListBalls[i].pLengRe.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[4];
                this.PickClass10.ListBalls[i].pLengRe.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[3];
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
    setRadioCheckBoxRemarkValue: function(_checkBox, _value) {
        ///<summary>更新分位遗漏、冷热的属性值，并更新显示</summary>
        _checkBox.setAttribute("value", _value);
        if (cbRadio.CheckedRadio == _checkBox) {
            this.setRemarkValue(_checkBox.getAttribute("value"));
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
        if (this.PickInfo.BetCount == null || this.PickInfo.BetMoney == null || this.PickClass1 == null || this.PickClass10 == null) {
            alert("初始化前请先做好准备工作");
            return;
        }
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.PerMoney = 2;
        this.BetCount = 0;
        this.BetMoney = 0;
        this.PickInfo.BetCount = null;
        this.PickInfo.BetMoney = null;
    }
}
var PickR = new TKCPCEO.Lottery.FCCQSSC.Pick.Result();
TKCPCEO.Lottery.FCCQSSC.Pick.prototype = {
    Container: null,
    ObjRemarkYiLou: null,
    ObjRemarkLengRe: null,
    CountLen: 0,
    ListData: new Array(),
    ListHelpBtn: new Array(),
    ListBalls: new Array(),
    SelectBalls: new Array(),
    PrimeArray: [1, 2, 3, 5, 7],
    CssClass: {
        HeadLi: "",
        HelpLi: "",
        HelpUl: ""
    },
    Text: {
        HeadTitle: ""
    },
    selectedChange: function() {
        ///<summary>选球变更事件</summary>
    },
    clickBall: function(_ballItem, _isCompute) {
        ///<summary>选号球点击事件</summary>
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
                case "全":
                    if (!this.SelectBalls.exists(_objBall)) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "0":
                    if (!this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 3 == 0) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 3 != 0) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "1":
                    if (!this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 3 == 1) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 3 != 1) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "2":
                    if (!this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 3 == 2) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 3 != 2) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "大":
                    if (!this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) >= this.ListBalls.length / 2) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) < this.ListBalls.length / 2) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "小":
                    if (!this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) < this.ListBalls.length / 2) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) >= this.ListBalls.length / 2) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "奇":
                    if (!this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 2 == 1) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 2 == 0) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "偶":
                    if (!this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 2 == 0) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && parseInt(_objBall.span.getAttribute("value"), 10) % 2 == 1) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "质":
                    if (!this.SelectBalls.exists(_objBall) && this.PrimeArray.exists(parseInt(_objBall.span.getAttribute("value"), 10))) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && !this.PrimeArray.exists(parseInt(_objBall.span.getAttribute("value"), 10))) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "合":
                    if (!this.SelectBalls.exists(_objBall) && !this.PrimeArray.exists(parseInt(_objBall.span.getAttribute("value"), 10))) {
                        this.clickBall(_objBall);
                    } else if (this.SelectBalls.exists(_objBall) && this.PrimeArray.exists(parseInt(_objBall.span.getAttribute("value"), 10))) {
                        this.clickBall(_objBall);
                    }
                    break;
                case "反":
                    this.clickBall(_objBall);
                    break;
                case "清":
                    if (this.SelectBalls.exists(_objBall)) {
                        this.clickBall(_objBall);
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
        this.ObjRemarkLengRe = document.createElement("p");
        this.ObjRemarkYiLou.innerHTML = "遗漏";
        this.ObjRemarkLengRe.innerHTML = "冷热";
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

            span.onclick = this.clickBall.bind(this, li, true);

            this.ListBalls.push(li);
        }
        var liHelp = document.createElement("li");
        liHelp.className = this.CssClass.HelpLi;
        var ulHelp = document.createElement("ul");
        ulHelp.className = this.CssClass.HelpUl;
        for (var i = 0; i < this.ListHelpBtn.length; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(this.ListHelpBtn[i]));
            li.onclick = this.exeCommand.bind(this, this.ListHelpBtn[i]);
            ulHelp.appendChild(li);
        }
        liHelp.ul = ulHelp;
        liHelp.onmouseover = function() {
            this.ul.style.display = "block";
        }
        ulHelp.onmouseout = function() {
            this.style.display = "none";
        }
        liHelp.appendChild(ulHelp);
        oFragment.appendChild(liHelp);
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
        this.ObjRemarkYiLou = null;
        this.ListData = [];
        this.ListHelpBtn = [];
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
        this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuXuanFenZu;
        var ball1 = "";
        for (var j = 0; j < pickClass1.SelectBalls.length; j++) {
            ball1 += pickClass1.SelectBalls[j].span.getAttribute("value");
        }
        var ball10 = "";
        for (var j = 0; j < pickClass10.SelectBalls.length; j++) {
            ball10 += pickClass10.SelectBalls[j].span.getAttribute("value");
        }
        this.ListBonus.push("_,_,_," + ball10 + "," + ball1);
        this.ListClientBouns.push(ball10 + "," + ball1);
        this.ListBetCount.push(pickClass10.SelectBalls.length * pickClass1.SelectBalls.length);
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
        UpdateDataYiLou: null
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
        this.Container.UpdateDataYiLou = $("ContainerYiLou");

        var menus = this.Container.UpdateDataMenu.getElementsByTagName("li");
        menus[0].wrap = this.Container.UpdateDataNormalYiLou.parentNode;
        menus[1].wrap = this.Container.UpdateDataYiLou;
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

function getBonusResultList(_bonusNumber, _bonusNumber2) {
    ///<summary>根据开奖号码获取形态</summary>
    _bonusNumber = _bonusNumber.toString();
    var listR = new Array();
    var ball1 = parseInt(_bonusNumber.substr(4, 1), 10);
    var ball2 = parseInt(_bonusNumber.substr(3, 1), 10);
    var ball3 = parseInt(_bonusNumber.substr(2, 1), 10);
    var ball4 = parseInt(_bonusNumber.substr(1, 1), 10);
    var ball5 = parseInt(_bonusNumber.substr(0, 1), 10);

    var dxb = [0, 0];
    var job = [0, 0];
    var zhb = [0, 0];
    var c3ysb = [0, 0, 0];
    var dz = "";
    var lh = "";
    var cm = [];

    var lastBonusAry = _bonusNumber2.split("");

    for (var i = 1; i <= 2; i++) {
        var No = eval("ball" + i);
        dxb[No >= 5 ? 0 : 1] += 1;
        job[No % 2 == 1 ? 0 : 1] += 1;
        zhb[PrimeArray.exists(No) ? 0 : 1] += 1;
        c3ysb[No % 3] += 1;
    }

    dz = ball2 == ball1 ? "<b>√</b>" : "&nbsp;";
    lh = ball1 + 1 == ball2 || ball1 - 1 == ball2 ? "<b>√</b>" : "&nbsp;";
    if (lastBonusAry[4] == ball1) {
        cm.push(ball1);
    }
    if (lastBonusAry[4] == ball2) {
        cm.push(ball2);
    }

    if (lastBonusAry[3] == ball1) {
        cm.push(ball1);
    }
    if (lastBonusAry[3] == ball2) {
        cm.push(ball2);
    }

    listR.push(dxb.join(":"));
    listR.push(job.join(":"));
    listR.push(zhb.join(":"));
    listR.push(c3ysb.join(":"));
    listR.push(dz);
    listR.push(lh);
    listR.push(cm.clearRepeat().join(","));
    return listR;
}

function dataYiLouOnMouseOver(_spanObj) {
    ///<summary>鼠标经过遗漏数据时的事件</summary>
    _spanObj.className += " active";
    return;
    var containerDiv = _spanObj.parentNode.getElementsByTagName("div")[0];
    var textDiv = containerDiv.getElementsByTagName("div")[0].getElementsByTagName("div")[0];
    containerDiv.style.display = "block";
    if (textDiv.innerHTML == parent.EmptyOnmouseoverText) {
        ///从服务器取详细遗漏
    }
}
function dataYiLouOnMouseOut(_spanObj) {
    ///<summary>鼠标移出遗漏数据时的事件</summary>
    var containerDiv = _spanObj.parentNode.getElementsByTagName("div")[0];
    var textDiv = containerDiv.getElementsByTagName("div")[0].getElementsByTagName("div")[0];
    containerDiv.style.display = "none";
    _spanObj.className = _spanObj.getAttribute("css");
}

function PickBallsByYiLouData(_typeYiLou, _key) {
    ///<summary>根据遗漏数据选号</summary>
//    return;
    function checkBallCondition(_value, _ballValue, _indexBall) {
        var isValidate = false;
        var xintTai = _ballValue.split(",")[_indexBall];
        switch (_typeYiLou) {
            case "271": ///胆码遗漏
                isValidate = parseInt(_value, 10) == parseInt(_ballValue, 10);
                break;
            default: ///数字直接选号"13"
                isValidate = parseInt(xintTai, 10) == parseInt(_value, 10);
                break;
        }
        return isValidate;
    }
    PickR.PickClass1.exeCommand("清");
    PickR.PickClass10.exeCommand("清");
    var ball = _key;
    for (var i = 0; i < PickR.PickClass1.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass1.ListBalls[i].span.getAttribute("value"), 10);
        if (checkBallCondition(value, ball, 1) == true) {
            PickR.PickClass1.ListBalls[i].span.onclick();
        }
    }
    for (var i = 0; i < PickR.PickClass10.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass10.ListBalls[i].span.getAttribute("value"), 10);

        if (checkBallCondition(value, ball, 0) == true) {
            PickR.PickClass10.ListBalls[i].span.onclick();
        }
    }
}

function Event_UpdateData_YiLou() {
    ///<summary>更新遗漏数据</summary>
    var htmlStandard = new Array(); ///标准遗漏
    var dataYiLou = parent.TotalLoadData.YiLou;
    if (dataYiLou == null) { setTimeout(function() { Event_UpdateData_YiLou(); }, 1000); return; }

    function outHtml(_dataYiLouItem, _mainText, _mainTitle, _mainHref, _htmlIndex, html, _splitType) {
        _mainHref = "";
        var pCount = _htmlIndex % 3 + 1;
        html[_htmlIndex] = "<ul class=\"pItem p" + pCount.toString() + "\">";
        for (var j = 0; j < _dataYiLouItem.MissValue.length; j++) {
            var key = _dataYiLouItem.MissValue[j].MissKey;
            if (_splitType != 0 && key.split(",").length <= 1) {
                key = key.split("").join(",");
            }
            html[_htmlIndex] += "<li>";
            html[_htmlIndex] += "<span class=\"plnum\">" + _dataYiLouItem.MissValue[j].MissValue + "</span><span onclick=\"PickBallsByYiLouData('" + _dataYiLouItem.MissKey.toString() + "', '" + key.toString() + "');\" onmouseover=\"dataYiLouOnMouseOver(this)\" onmouseout=\"dataYiLouOnMouseOut(this)\" class=\"plitem\" css=\"plitem\"><span><em>" + key + "</em></span></span>";
            html[_htmlIndex] += "<div class=\"tip\" style=\"display:none;\"><div class=\"tip_in\"><div class=\"tip_inC\">" + parent.EmptyOnmouseoverText + "</div></div></div>";
            html[_htmlIndex] += "</li>";
        }
        html[_htmlIndex] += "<li class=\"item\"><a class=\"item\" " + (_mainHref != "" ? "target=\"_blank\" href=\"" + _mainHref + "\"" : "") + " title=\"" + _mainTitle + "\">" + _mainText + "</a></li>";
        html[_htmlIndex] += "</ul>";
    }

    function fillFenWeiYiLou(_indexFenWei, _dataYiLouItem) {
        for (var i = 0; i < _dataYiLouItem.MissValue.length; i++) {
            fenWeiYiLou[parseInt(_dataYiLouItem.MissValue[i].MissKey, 10)][_indexFenWei] = parseInt(_dataYiLouItem.MissValue[i].MissValue, 10);
        }
    }

    var fenWeiYiLou = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    for (var i = 0; i < parent.TotalLoadData.YiLou.length; i++) {
        ///遗漏
        if (dataYiLou[i].MissKey == "270") {
            outHtml(dataYiLou[i], "二组遗漏", "二星组选（十、个位不排序）遗漏", "Trend.aspx?tid=i14", 0, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "202") {
            outHtml(dataYiLou[i], "二组对子遗漏", "二星的对子号（十、个位相同）遗漏", "", 1, htmlStandard);
        }
//        if (dataYiLou[i].MissKey == "271") {
//            outHtml(dataYiLou[i], "二组胆码遗漏", "二星组选的胆码（定一胆，另一位全包，十、个位不排序）遗漏", "", 2, htmlStandard);
//        }
        if (dataYiLou[i].MissKey == "204") {
            outHtml(dataYiLou[i], "二组连号遗漏", "二星的连号（十位和个位的正差值为1，十、个位不排序）遗漏", "", 3, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "205") {
            outHtml(dataYiLou[i], "二组间隔遗漏", "二星的间隔（十位和个位的正差值为2，十、个位不排序）遗漏", "", 4, htmlStandard);
        }

        ///分位遗漏
        if (dataYiLou[i].MissKey == "1") {///个位
            fillFenWeiYiLou(4, dataYiLou[i]);
        }
        if (dataYiLou[i].MissKey == "2") {///十位
            fillFenWeiYiLou(3, dataYiLou[i]);
        }
    }
    var fenWeiYiLouStr = "";
    for (var i = 0; i < fenWeiYiLou.length; i++) {
        fenWeiYiLouStr += i == 0 ? "" : ",";
        fenWeiYiLouStr += fenWeiYiLou[i].join("|");
    }
    PickR.setRemarkValue(fenWeiYiLouStr);
    htmlStandard.push("<i class=\"shadowBottom\"><i class=\"shadowBottomL\"></i></i>");
    $("ContainerYiLou").innerHTML = htmlStandard.join("\r\n");
    $("ContainerNormalYiLou").innerHTML = parent.StringHtml_NormalYiLou;
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}

var orderDesc = parent.orderDesc;
function Event_UpdateData_Bonus(_actionOrder) {
    ///<summary>更新开奖数据</summary>
    var bonusStrAry = parent.TotalLoadData.Bonus;
    if (bonusStrAry == null) { setTimeout(function() { Event_UpdateData_Bonus(); }, 1000); return; }
    var html = "<table>";
    html += "<tr><th";
    orderDesc = _actionOrder == true ? !orderDesc : orderDesc;
    if (parent.iframeBonusOrder) {
        html += " onclick=\"Event_UpdateData_Bonus(true)\" style=\"cursor:pointer;\" title=\"" + (orderDesc ? parent.TextOrderCharactor.Desc_Title : parent.TextOrderCharactor.Asc_Title) + "\"";
    }
    html += ">期号" + (orderDesc ? parent.TextOrderCharactor.Desc : parent.TextOrderCharactor.Asc) + "</th><th>开奖号码</th><th>大小比</th><th>奇偶比</th><th>质合比</th><th>012路比</th><th>对子</th><th>连号</th><th>重码</th></tr>";
    var htmlSort = "";
    for (var i = 0; i < bonusStrAry.length - 2; i++) {
        var issue = bonusStrAry[i].split("|")[0];
        var listR = getBonusResultList(bonusStrAry[i].split("|")[1].toString(), bonusStrAry[i + 1].split("|")[1].toString());
        var bonus5 = bonusStrAry[i].split("|")[1].toString().substr(0, 1);
        var bonus4 = bonusStrAry[i].split("|")[1].toString().substr(1, 1);
        var bonus3 = bonusStrAry[i].split("|")[1].toString().substr(2, 1);
        var bonus2 = bonusStrAry[i].split("|")[1].toString().substr(3, 1);
        var bonus1 = bonusStrAry[i].split("|")[1].toString().substr(4, 1);
        var addString = "<tr><td>" + issue.split("-")[1] + "期</td><td class=\"n\">" + bonus5 + bonus4 + bonus3 + "<strong>" + bonus2 + bonus1 + "</strong>" + "</td><td>" + listR[0] + "</td><td>" + listR[1] + "</td><td>" + listR[2] + "</td><td>" + listR[3] + "</td><td>" + listR[4] + "</td><td>" + listR[5] + "</td><td>" + listR[6] + "</td></tr>";
        if (orderDesc) {
            html += addString;
        } else {
            htmlSort = addString + htmlSort;
        }
    }
    html += htmlSort;
    html += "</table>";
    $("Container10Trend").innerHTML = html;
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}

function Event_UpdateData_LengRe() {
    ///<summary>更新冷热数据</summary>
    var lengReAry = parent.TotalLoadData.LengRe;
    if (lengReAry == null) { setTimeout(function() { Event_UpdateData_LengRe(); }, 1000); return; }
    var fenWeiLengRe = ["", "", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < lengReAry.length; i++) {
        if (i <= 4) {
            for (var j = 0; j < lengReAry[i].length; j++) {
                fenWeiLengRe[j] += i == 0 ? "" : "|";
                fenWeiLengRe[j] += lengReAry[i][j].toString();
            }
        }
    }
    ///分为冷热
    PickR.setRemarkValue(fenWeiLengRe.join(","), true);
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}