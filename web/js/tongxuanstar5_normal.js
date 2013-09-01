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
    PickClass100: null,
    PickClass1000: null,
    PickClass10000: null,
    PerMoney: 2,
    BetCount: 0,
    BetMoney: 0,
    PickInfo: {
        BetCount: null,
        BetMoney: null
    },
    setRemarkValue: function(_Value) {
        ///<summary>设置球的备注值（冷热、遗漏、当期热选等）</summary>
        if (cbRadio.CheckedRadio == $("cbRadioYiLou")) {
            this.PickClass10000.ObjRemark.innerHTML = "遗漏";
            this.PickClass1000.ObjRemark.innerHTML = "遗漏";
            this.PickClass100.ObjRemark.innerHTML = "遗漏";
            this.PickClass10.ObjRemark.innerHTML = "遗漏";
            this.PickClass1.ObjRemark.innerHTML = "遗漏";
        } else if (cbRadio.CheckedRadio == $("cbRadioLengRe")) {
            this.PickClass10000.ObjRemark.innerHTML = "冷热";
            this.PickClass1000.ObjRemark.innerHTML = "冷热";
            this.PickClass100.ObjRemark.innerHTML = "冷热";
            this.PickClass10.ObjRemark.innerHTML = "冷热";
            this.PickClass1.ObjRemark.innerHTML = "冷热";
        } else {
            this.PickClass10000.ObjRemark.innerHTML = "";
            this.PickClass1000.ObjRemark.innerHTML = "";
            this.PickClass100.ObjRemark.innerHTML = "";
            this.PickClass10.ObjRemark.innerHTML = "";
            this.PickClass1.ObjRemark.innerHTML = "";
        }
        var IsEmpty = _Value == null;
        var _arrayListValue = new Array();
        if (IsEmpty == true) {
            _arrayListValue = ["", "", "", "", "", "", "", "", "", ""];
        } else {
            _arrayListValue = _Value.split(",");
        }
        if (_arrayListValue.length != 10) { _arrayListValue = ["&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;", "&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;"]; }
        var maxIndex = [-1, -1, -1, -1, -1];
        var maxValue = [0, 0, 0, 0, 0];
        for (var i = 0; i < _arrayListValue.length; i++) {
            var fenweiAry = _arrayListValue[i].split("|");
            //最大值
            for (var x = 4; x >= 0; x--) {
                var regExp = new RegExp(/\d+/);
                if (regExp.test(fenweiAry[x])) {
                    if (parseInt(fenweiAry[x], 10) > maxValue[4 - x]) {
                        maxValue[4 - x] = parseInt(fenweiAry[x], 10);
                        maxIndex[4 - x] = i;
                    }
                }
            }
            //最大值
            this.PickClass1.ListBalls[i].p.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[4];
            this.PickClass10.ListBalls[i].p.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[3];
            this.PickClass100.ListBalls[i].p.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[2];
            this.PickClass1000.ListBalls[i].p.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[1];
            this.PickClass10000.ListBalls[i].p.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[0];
        }
        for (var i = 0; i < maxIndex.length; i++) {
            var pc = null;
            switch (i) {
                case 1:
                    pc = this.PickClass10;
                    break;
                case 2:
                    pc = this.PickClass100;
                    break;
                case 3:
                    pc = this.PickClass1000;
                    break;
                case 4:
                    pc = this.PickClass10000;
                    break;
                default:
                    pc = this.PickClass1;
                    break;
            }
            if (maxIndex[i] != -1) {
                pc.ListBalls[maxIndex[i]].p.innerHTML = "<b style=\"color:#EBAB00;font-weight:bold;\">" + pc.ListBalls[maxIndex[i]].p.innerHTML + "</b>";
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
        this.BetCount = TKCPCEO.Math.C(1, this.PickClass1.SelectBalls.length) * TKCPCEO.Math.C(1, this.PickClass10.SelectBalls.length) * TKCPCEO.Math.C(1, this.PickClass100.SelectBalls.length) * TKCPCEO.Math.C(1, this.PickClass1000.SelectBalls.length) * TKCPCEO.Math.C(1, this.PickClass10000.SelectBalls.length);
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
    ObjRemark: null,
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
            var betCount = TKCPCEO.Math.C(1, PickR.PickClass1.SelectBalls.length) * TKCPCEO.Math.C(1, PickR.PickClass10.SelectBalls.length) * TKCPCEO.Math.C(1, PickR.PickClass100.SelectBalls.length) * TKCPCEO.Math.C(1, PickR.PickClass1000.SelectBalls.length) * TKCPCEO.Math.C(1, PickR.PickClass10000.SelectBalls.length);
            if (betCount > 250) {
                alert("超过此玩法复式最多限制注数!");
                this.clickBall(_ballItem, _isCompute, _isClear);
                return;
            }
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
        this.ObjRemark = document.createElement("p");
        liHead.appendChild(emTitle);
        liHead.appendChild(this.ObjRemark);

        oFragment.appendChild(liHead);

        for (var i = 0; i < this.ListData.length; i++) {
            var li = document.createElement("li");
            var span = document.createElement("span");
            span.setAttribute("unselectable", "on");
            span.appendChild(document.createTextNode(this.ListData[i].Text));
            span.setAttribute("value", this.ListData[i].Value);
            var p = document.createElement("p");
            p.innerHTML = "&nbsp;";

            li.span = span;
            li.p = p;
            li.appendChild(span);
            li.appendChild(p);
            oFragment.appendChild(li);

            span.onclick = this.clickBall.bind(this, li, true, false);

            this.ListBalls.push(li);
        }
        //        var liHelp = document.createElement("li");
        //        liHelp.className = this.CssClass.HelpLi;
        //        var ulHelp = document.createElement("ul");
        //        ulHelp.className = this.CssClass.HelpUl;
        //        for (var i = 0; i < this.ListHelpBtn.length; i++) {
        //            var li = document.createElement("li");
        //            li.appendChild(document.createTextNode(this.ListHelpBtn[i]));
        //            li.onclick = this.exeCommand.bind(this, this.ListHelpBtn[i], true);
        //            ulHelp.appendChild(li);
        //        }
        //        liHelp.ul = ulHelp;
        //        liHelp.onmouseover = function() {
        //            this.ul.style.display = "block";
        //        }
        //        ulHelp.onmouseout = function() {
        //            this.style.display = "none";
        //        }
        //        liHelp.appendChild(ulHelp);
        //        oFragment.appendChild(liHelp);
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
        this.ListHelpBtn = [];
        this.ListBalls = [];
        this.SelectBalls = [];
    }
}

TKCPCEO.Lottery.FCCQSSC.Filter = function() {
    ///<summary>选号过滤</summary>
    ///<param name="Enable">是否启用过滤</param>
    ///<param name="ActiveFilter">是否启用时事过滤</param>
    ///<param name="CurrentFilterMenu">当前选择过滤项菜单对象</param>
    ///<param name="Container">容器集合对象</param>
    ///<param name="Container.Menu">过滤菜单容器</param>
    ///<param name="Container.PickInfo">显示选号信息的容器对象</param>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.Filter.prototype = {
    Enable: false,
    ActiveFilter: false,
    CurrentFilterMenu: null,
    Container: {
        Wrap: null,
        Menu: null,
        PickInfo: null
    },
    PlayType: -1,
    BtnSubmitTicket: null,
    ListBonus: new Array(),
    ListClientBouns: new Array(),
    ListBetCount: new Array(),
    ListItems: new Array(),
    ListCondition: new Array(),
    filter: function(_checkbox, _listBonus) {
        ///<summary>每个号码根据条件过滤结果</summary>
        var isDel = false;

        return isDel;
    },
    getFilterBonusList: function() {
        ///<summary>计算当前过滤所需的号码组合</summary>
        if (pickClass1.SelectBalls.length < 1 || pickClass10.SelectBalls.length < 1 || pickClass100.SelectBalls.length < 1 || pickClass1000.SelectBalls.length < 1 || pickClass10000.SelectBalls.length < 1) {
            alert("请先正确选择号码");
            return false;
        }
        this.ListBonus.clear();
        this.ListClientBouns.clear();
        this.ListBetCount.clear();
        if (this.Enable == true) {
            this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan;
            ///SilverLight过滤
        } else {
            this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan;
            var ball10000 = [];
            for (var i = 0; i < pickClass10000.SelectBalls.length; i++) {
                ball10000.push(pickClass10000.SelectBalls[i].span.getAttribute("value"));
            }
            if (pickClass10000.SelectBalls.length > 1) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan;
            }

            var ball1000 = [];
            for (var i = 0; i < pickClass1000.SelectBalls.length; i++) {
                ball1000.push(pickClass1000.SelectBalls[i].span.getAttribute("value"));
            }
            if (pickClass1000.SelectBalls.length > 1) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan;
            }

            var ball100 = [];
            for (var i = 0; i < pickClass100.SelectBalls.length; i++) {
                ball100.push(pickClass100.SelectBalls[i].span.getAttribute("value"));
            }
            if (pickClass100.SelectBalls.length > 1) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan;
            }

            var ball10 = [];
            for (var i = 0; i < pickClass10.SelectBalls.length; i++) {
                ball10.push(pickClass10.SelectBalls[i].span.getAttribute("value"));
            }
            if (pickClass10.SelectBalls.length > 1) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan;
            }

            var ball1 = [];
            for (var j = 0; j < pickClass1.SelectBalls.length; j++) {
                ball1.push(pickClass1.SelectBalls[j].span.getAttribute("value"));
            }
            if (pickClass1.SelectBalls.length > 1) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan;
            }
            for (var i5 = 0; i5 < pickClass10000.SelectBalls.length; i5++) {
                for (var i4 = 0; i4 < pickClass1000.SelectBalls.length; i4++) {
                    for (var i3 = 0; i3 < pickClass100.SelectBalls.length; i3++) {
                        for (var i2 = 0; i2 < pickClass10.SelectBalls.length; i2++) {
                            for (var i1 = 0; i1 < pickClass1.SelectBalls.length; i1++) {
                                this.ListBonus.push(ball10000[i5] + "," + ball1000[i4] + "," + ball100[i3] + "," + ball10[i2] + "," + ball1[i1]);
                                this.ListClientBouns.push(ball10000[i5] + "," + ball1000[i4] + "," + ball100[i3] + "," + ball10[i2] + "," + ball1[i1]);
                                this.ListBetCount.push(1);
                            }
                        }
                    }
                }
            }
            //            this.ListBonus.push(ball10000 + "," + ball1000 + "," + ball100 + "," + ball10 + "," + ball1);
            //            this.ListClientBouns.push(ball10000 + "," + ball1000 + "," + ball100 + "," + ball10 + "," + ball1);
            //            this.ListBetCount.push(pickClass10000.SelectBalls.length * pickClass1000.SelectBalls.length * pickClass100.SelectBalls.length * pickClass10.SelectBalls.length * pickClass1.SelectBalls.length);
        }
        return true;
    },
    setCurrentMenu: function(_menu) {
        ///<summary>选中过滤菜单</summary>
        if (this.Enable == true) {
            if (this.CurrentFilterMenu != null) {
                this.CurrentFilterMenu.className = null;
                this.CurrentFilterMenu.menuBox.style.display = "none";
            }
            this.CurrentFilterMenu = _menu;
            this.CurrentFilterMenu.className = "active";
            if (this.CurrentFilterMenu.menuBox == null) {
                this.CurrentFilterMenu.menuBox = this.ListItems[parseInt(this.CurrentFilterMenu.getAttribute("index"), 10)];
            }
            this.CurrentFilterMenu.menuBox.style.display = "";
            this.ListCondition.clear();
        }
        parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
    },
    setEnabled: function(_checkBox) {
        ///<summary>可选缩水工具复选框点击事件</summary>
        if (_checkBox.checked == true) {
            this.Enable = true;
            this.Container.PickInfo.style.display = "none";
            if (this.CurrentFilterMenu == null) {
                this.CurrentFilterMenu = this.Container.Menu.getElementsByTagName("a")[0];
            }
            this.CurrentFilterMenu.className = "active";
            this.CurrentFilterMenu.menuBox = this.ListItems[parseInt(this.CurrentFilterMenu.getAttribute("index"), 10)];
            this.CurrentFilterMenu.menuBox.style.display = "";
            this.Container.Menu.style.display = "";
        } else {
            this.Enable = false;
            this.Container.PickInfo.style.display = "";
            this.CurrentFilterMenu.className = null;
            this.CurrentFilterMenu.menuBox.style.display = "none";
            this.Container.Menu.style.display = "none";
        }
        parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
    },
    setFilterCondition: function(_checkBox) {
        ///<summary>条件过滤条件设置</summary>
        if (this.ActiveFilter == false) {
            this.ListCondition.push(_checkBox);
        }
    },
    submitTicket: function() {
        ///<summary>放入投注单</summary>
        if (this.ActiveFilter == false) {
            if (this.getFilterBonusList() == false) { return; }
            var betList = parent.betList;
            for (var i = 0; i < this.ListBonus.length; i++) {
                betList.addItem(parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.BetMethod.Standard, this.PlayType, this.ListBonus[i], this.ListClientBouns[i], this.ListBetCount[i]);
            }
        }
        pickClass10000.exeCommand("清");
        pickClass1000.exeCommand("清");
        pickClass100.exeCommand("清");
        pickClass10.exeCommand("清");
        pickClass1.exeCommand("清");
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.Container.Menu == null || this.Container.Wrap == null || this.Container.PickInfo == null) {
            alert("请先初始化相关信息");
            return;
        }
        this.ListItems = this.Container.Wrap.getElementsByTagName("dl");
        for (var i = 0; i < this.ListItems.length; i++) {
            var checkboxList = this.ListItems[i].getElementsByTagName("input");
            for (var j = 0; j < checkboxList.length; j++) {
                checkboxList[j].onclick = this.setFilterCondition.bind(this, checkboxList[j]);
            }
        }
        this.BtnSubmitTicket.onclick = this.submitTicket.bind(this);
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.Enable = false;
        this.ActiveFilter = false;
        this.CurrentFilterMenu = null;
        this.Container.Wrap = null;
        this.Container.Menu = null;
        this.Container.PickInfo = null;
        this.ListBonus = [];
        this.ListClientBouns = [];
        this.ListBetCount = [];
        this.ListItems = [];
        this.ListCondition = [];
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
        UpdateDataFenWeiYiLou: null,
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
        this.Container.UpdateDataFenWeiYiLou = $("ContainerFenWeiYiLou");
        this.Container.UpdateDataXingTaiYiLou = $("ContainerXingTaiYiLou");

        var menus = this.Container.UpdateDataMenu.getElementsByTagName("li");
        menus[0].wrap = this.Container.UpdateDataNormalYiLou.parentNode;
        menus[1].wrap = this.Container.UpdateDataFenWeiYiLou;
        menus[2].wrap = this.Container.UpdateDataXingTaiYiLou;
        menus[3].wrap = this.Container.UpdateData10Trend.parentNode;
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
    var chs = 0;

    var lastBonusAry = _bonusNumber2.split("");

    for (var i = 1; i <= 5; i++) {
        var No = eval("ball" + i);
        dxb[No >= 5 ? 0 : 1] += 1;
        job[No % 2 == 1 ? 0 : 1] += 1;
        zhb[PrimeArray.exists(No) ? 0 : 1] += 1;
        c3ysb[No % 3] += 1;
        chs += lastBonusAry.exists(No.toString()) ? 1 : 0;
    }

    listR.push(dxb.join(":"));
    listR.push(job.join(":"));
    listR.push(zhb.join(":"));
    listR.push(c3ysb.join(":"));
    listR.push(chs);
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
        var intValue = parseInt(_value, 10);
        var xintTai = _ballValue.split(",");
        switch (_typeYiLou) {
            case "601": ///前两位遗漏
                isValidate = xintTai[_indexBall] != null && xintTai[_indexBall] == _value;
                break;
            case "201": ///后两位遗漏
                _indexBall = _indexBall - 3;
                isValidate = xintTai[_indexBall] != null && xintTai[_indexBall] == _value;
                break;
            case "701": ///前三位遗漏
                isValidate = xintTai[_indexBall] != null && xintTai[_indexBall] == _value;
                break;
            case "801": ///中三位遗漏
                _indexBall = _indexBall - 1;
                isValidate = xintTai[_indexBall] != null && xintTai[_indexBall] == _value;
                break;
            case "301": ///后三位遗漏
                _indexBall = _indexBall - 2;
                isValidate = xintTai[_indexBall] != null && xintTai[_indexBall] == _value;
                break;
            default: ///数字直接选号"13"
                if (parseInt(_ballValue, 10) == parseInt(_value, 10)) {
                    isValidate = true;
                }
                break;
        }
        return isValidate;
    }
    PickR.PickClass1.exeCommand("清");
    PickR.PickClass10.exeCommand("清");
    PickR.PickClass100.exeCommand("清");
    PickR.PickClass1000.exeCommand("清");
    PickR.PickClass10000.exeCommand("清");
    var ball = _key;
    for (var i = 0; i < PickR.PickClass1.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass1.ListBalls[i].span.getAttribute("value"), 10);
        if (checkBallCondition(value, ball, 4) == true) {
            PickR.PickClass1.ListBalls[i].span.onclick();
        }
    }
    for (var i = 0; i < PickR.PickClass10.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass10.ListBalls[i].span.getAttribute("value"), 10);

        if (checkBallCondition(value, ball, 3) == true) {
            PickR.PickClass10.ListBalls[i].span.onclick();
        }
    }
    for (var i = 0; i < PickR.PickClass100.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass100.ListBalls[i].span.getAttribute("value"), 10);

        if (checkBallCondition(value, ball, 2) == true) {
            PickR.PickClass100.ListBalls[i].span.onclick();
        }
    }
    for (var i = 0; i < PickR.PickClass1000.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass1000.ListBalls[i].span.getAttribute("value"), 10);

        if (checkBallCondition(value, ball, 1) == true) {
            PickR.PickClass1000.ListBalls[i].span.onclick();
        }
    }
    for (var i = 0; i < PickR.PickClass10000.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass10000.ListBalls[i].span.getAttribute("value"), 10);

        if (checkBallCondition(value, ball, 0) == true) {
            PickR.PickClass10000.ListBalls[i].span.onclick();
        }
    }
}

function Event_UpdateData_YiLou() {
    ///<summary>更新遗漏数据</summary>
    if (parent.TotalLoadData == null || parent.TotalLoadData.YiLou == null) { setTimeout(function() { Event_UpdateData_YiLou(); }, 1000); return; }
    var htmlStandard = new Array(); ///标准遗漏
    var htmlXingTai = new Array(); ///形态遗漏
    var htmlWanNengFuShi = new Array(); ///万能复式遗漏
    var dataYiLou = parent.TotalLoadData.YiLou;

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
//            html[_htmlIndex] += "aa";
            html[_htmlIndex] += "</li>";
        }
        html[_htmlIndex] += "<li class=\"item\"><a class=\"item\" title=\"" + _mainTitle + "\">" + _mainText + "</a></li>";
        html[_htmlIndex] += "</ul>";
    }

    function fillFenWeiYiLou(_indexFenWei, _dataYiLouItem) {
        for (var i = 0; i < _dataYiLouItem.MissValue.length; i++) {
            fenWeiYiLou[parseInt(_dataYiLouItem.MissValue[i].MissKey, 10)][_indexFenWei] = parseInt(_dataYiLouItem.MissValue[i].MissValue, 10);
        }
    }

    var fenWeiYiLou = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    for (var i = 0; i < parent.TotalLoadData.YiLou.length; i++) {
        ///分位遗漏
        if (dataYiLou[i].MissKey == "601") {
            outHtml(dataYiLou[i], "前两位遗漏", "万位+千位的遗漏", "", 0, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "201") {
            outHtml(dataYiLou[i], "后两位遗漏", "十位+个位的遗漏，即二星遗漏", "", 1, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "701") {
            outHtml(dataYiLou[i], "前三位遗漏", "万位+千位+百位的遗漏", "", 2, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "801") {
            outHtml(dataYiLou[i], "中三位遗漏", "千位+百位+十位的遗漏", "", 3, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "301") {
            outHtml(dataYiLou[i], "后三位遗漏", "百位+十位+个位的遗漏，即三星遗漏", "", 4, htmlStandard);
        }

        ///形态遗漏
        if (dataYiLou[i].MissKey == "x") {
            outHtml(dataYiLou[i], "大小遗漏", 0, htmlXingTai);
        }
        if (dataYiLou[i].MissKey == "x") {
            outHtml(dataYiLou[i], "奇偶遗漏", 1, htmlXingTai);
        }
        if (dataYiLou[i].MissKey == "x") {
            outHtml(dataYiLou[i], "质合遗漏", 2, htmlXingTai);
        }
        if (dataYiLou[i].MissKey == "x") {
            outHtml(dataYiLou[i], "012路遗漏", 3, htmlXingTai);
        }

        ///分位遗漏
        if (dataYiLou[i].MissKey == "1") {///个位
            fillFenWeiYiLou(4, dataYiLou[i]);
        }
        if (dataYiLou[i].MissKey == "2") {///十位
            fillFenWeiYiLou(3, dataYiLou[i]);
        }
        if (dataYiLou[i].MissKey == "3") {///百位
            fillFenWeiYiLou(2, dataYiLou[i]);
        }
        if (dataYiLou[i].MissKey == "4") {///千位
            fillFenWeiYiLou(1, dataYiLou[i]);
        }
        if (dataYiLou[i].MissKey == "5") {///万位
            fillFenWeiYiLou(0, dataYiLou[i]);
        }
    }
    var fenWeiYiLouStr = "";
    for (var i = 0; i < fenWeiYiLou.length; i++) {
        fenWeiYiLouStr += i == 0 ? "" : ",";
        fenWeiYiLouStr += fenWeiYiLou[i].join("|");
    }
    PickR.setRadioCheckBoxRemarkValue($("cbRadioYiLou"), fenWeiYiLouStr);
    htmlStandard.push("<i class=\"shadowBottom\"><i class=\"shadowBottomL\"></i></i>");
    htmlXingTai.push("<i class=\"shadowBottom\"><i class=\"shadowBottomL\"></i></i>");
    $("ContainerFenWeiYiLou").innerHTML = htmlStandard.join("\r\n");
    $("ContainerXingTaiYiLou").innerHTML = htmlXingTai.join("\r\n");
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
    html += ">期号" + (orderDesc ? parent.TextOrderCharactor.Desc : parent.TextOrderCharactor.Asc) + "</th><th>开奖号码</th><th>大小比</th><th>奇偶比</th><th>质合比</th><th>012路比</th><th>传号数</th></tr>";
    var htmlSort = "";
    for (var i = 0; i < bonusStrAry.length - 2; i++) {
        var issue = bonusStrAry[i].split("|")[0];
        var listR = getBonusResultList(bonusStrAry[i].split("|")[1].toString(), bonusStrAry[i + 1].split("|")[1].toString());
        var bonus5 = bonusStrAry[i].split("|")[1].toString().substr(0, 1);
        var bonus4 = bonusStrAry[i].split("|")[1].toString().substr(1, 1);
        var bonus3 = bonusStrAry[i].split("|")[1].toString().substr(2, 1);
        var bonus2 = bonusStrAry[i].split("|")[1].toString().substr(3, 1);
        var bonus1 = bonusStrAry[i].split("|")[1].toString().substr(4, 1);
        var addString = "<tr><td>" + issue.split("-")[1] + "期</td><td class=\"n\"><strong>" + bonus5 + bonus4 + +bonus3 + bonus2 + bonus1 + "</strong>" + "</td><td>" + listR[0] + "</td><td>" + listR[1] + "</td><td>" + listR[2] + "</td><td>" + listR[3] + "</td><td>" + listR[4] + "</td></tr>";
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
    if (parent.TotalLoadData == null || parent.TotalLoadData.LengRe == null) { setTimeout(function() { Event_UpdateData_LengRe(); }, 1000); return; }
    var lengReAry = parent.TotalLoadData.LengRe;
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
    PickR.setRadioCheckBoxRemarkValue($("cbRadioLengRe"), fenWeiLengRe.toString());
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}