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
    setRemarkValue: function(_Value) {
        ///<summary>设置球的备注值（冷热、遗漏、当期热选等）</summary>
        if (cbRadio.CheckedRadio == $("cbRadioYiLou")) {
            this.PickClass10.ObjRemark.innerHTML = "遗漏";
            this.PickClass1.ObjRemark.innerHTML = "遗漏";
        } else if (cbRadio.CheckedRadio == $("cbRadioLengRe")) {
            this.PickClass10.ObjRemark.innerHTML = "冷热";
            this.PickClass1.ObjRemark.innerHTML = "冷热";
        } else {
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
            this.PickClass1.ListBalls[i].p.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[4];
            this.PickClass10.ListBalls[i].p.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry[3];
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
        switch (_checkbox.parentNode.parentNode.getAttribute("dt")) {
            case "类型排除":
                switch (_checkbox.value) {
                    case "对子":
                        isDel = _listBonus[0] == _listBonus[1];
                        break;
                    case "非对子":
                        isDel = _listBonus[0] != _listBonus[1];
                        break;
                    case "连号":
                        isDel = _listBonus[0] == _listBonus[1] + 1 || _listBonus[0] == _listBonus[1] - 1;
                        break;
                    case "间隔":
                        isDel = _listBonus[0] == _listBonus[1] + 2 || _listBonus[0] == _listBonus[1] - 2;
                        break;
                    case "全0路":
                        isDel = _listBonus[0] % 3 == 0 && _listBonus[1] % 3 == 0;
                        break;
                    case "全1路":
                        isDel = _listBonus[0] % 3 == 1 && _listBonus[1] % 3 == 1;
                        break;
                    case "全2路":
                        isDel = _listBonus[0] % 3 == 2 && _listBonus[1] % 3 == 2;
                        break;
                    case "全大":
                        isDel = _listBonus[0] >= 5 && _listBonus[1] >= 5;
                        break;
                    case "全小":
                        isDel = _listBonus[0] < 5 && _listBonus[1] < 5;
                        break;
                    case "全奇":
                        isDel = _listBonus[0] % 2 == 1 && _listBonus[1] % 2 == 1;
                        break;
                    case "全偶":
                        isDel = _listBonus[0] % 2 == 0 && _listBonus[1] % 2 == 0;
                        break;
                    case "全质":
                        isDel = PrimeArray.exists(_listBonus[0]) && PrimeArray.exists(_listBonus[1]);
                        break;
                    case "全合":
                        isDel = !PrimeArray.exists(_listBonus[0]) && !PrimeArray.exists(_listBonus[1]);
                        break;
                }
                break;
            case "传号个数":
                switch (_checkbox.value) {
                    case "1个":
                        break;
                    case "2个":
                        break;
                }
                break;
            case "大小排除":
                switch (_checkbox.value) {
                    case "大大":
                        isDel = _listBonus[1] >= 5 && _listBonus[0] >= 5;
                        break;
                    case "大小":
                        isDel = _listBonus[1] >= 5 && _listBonus[0] < 5;
                        break;
                    case "小大":
                        isDel = _listBonus[1] < 5 && _listBonus[0] >= 5;
                        break;
                    case "小小":
                        isDel = _listBonus[1] < 5 && _listBonus[0] < 5;
                        break;
                }
                break;
            case "奇偶排除":
                switch (_checkbox.value) {
                    case "奇奇":
                        isDel = _listBonus[1] % 2 == 1 && _listBonus[0] % 2 == 1;
                        break;
                    case "奇偶":
                        isDel = _listBonus[1] % 2 == 1 && _listBonus[0] % 2 == 0;
                        break;
                    case "偶奇":
                        isDel = _listBonus[1] % 2 == 0 && _listBonus[0] % 2 == 1;
                        break;
                    case "偶偶":
                        isDel = _listBonus[1] % 2 == 0 && _listBonus[0] % 2 == 0;
                        break;
                }
                break;
            case "质合排除":
                switch (_checkbox.value) {
                    case "质质":
                        isDel = PrimeArray.exists(_listBonus[1]) && PrimeArray.exists(_listBonus[0]);
                        break;
                    case "质合":
                        isDel = PrimeArray.exists(_listBonus[1]) && !PrimeArray.exists(_listBonus[0]);
                        break;
                    case "合质":
                        isDel = !PrimeArray.exists(_listBonus[1]) && PrimeArray.exists(_listBonus[0]);
                        break;
                    case "合合":
                        isDel = !PrimeArray.exists(_listBonus[1]) && !PrimeArray.exists(_listBonus[0]);
                        break;
                }
                break;
            case "012路排除":
                switch (_checkbox.value) {
                    case "00":
                        isDel = _listBonus[1] % 3 == 0 && _listBonus[0] % 3 == 0;
                        break;
                    case "01":
                        isDel = _listBonus[1] % 3 == 0 && _listBonus[0] % 3 == 1;
                        break;
                    case "02":
                        isDel = _listBonus[1] % 3 == 0 && _listBonus[0] % 3 == 2;
                        break;
                    case "10":
                        isDel = _listBonus[1] % 3 == 1 && _listBonus[0] % 3 == 0;
                        break;
                    case "11":
                        isDel = _listBonus[1] % 3 == 1 && _listBonus[0] % 3 == 1;
                        break;
                    case "12":
                        isDel = _listBonus[1] % 3 == 1 && _listBonus[0] % 3 == 2;
                        break;
                    case "20":
                        isDel = _listBonus[1] % 3 == 2 && _listBonus[0] % 3 == 0;
                        break;
                    case "21":
                        isDel = _listBonus[1] % 3 == 2 && _listBonus[0] % 3 == 1;
                        break;
                    case "22":
                        isDel = _listBonus[1] % 3 == 2 && _listBonus[0] % 3 == 2;
                        break;
                }
                break;
            case "和值排除":
                switch (_checkbox.value) {
                    case "0":
                        isDel = _listBonus[1] + _listBonus[0] == 0;
                        break;
                    case "1":
                        isDel = _listBonus[1] + _listBonus[0] == 1;
                        break;
                    case "2":
                        isDel = _listBonus[1] + _listBonus[0] == 2;
                        break;
                    case "3":
                        isDel = _listBonus[1] + _listBonus[0] == 3;
                        break;
                    case "4":
                        isDel = _listBonus[1] + _listBonus[0] == 4;
                        break;
                    case "5":
                        isDel = _listBonus[1] + _listBonus[0] == 5;
                        break;
                    case "6":
                        isDel = _listBonus[1] + _listBonus[0] == 6;
                        break;
                    case "7":
                        isDel = _listBonus[1] + _listBonus[0] == 7;
                        break;
                    case "8":
                        isDel = _listBonus[1] + _listBonus[0] == 8;
                        break;
                    case "9":
                        isDel = _listBonus[1] + _listBonus[0] == 9;
                        break;
                    case "10":
                        isDel = _listBonus[1] + _listBonus[0] == 10;
                        break;
                    case "11":
                        isDel = _listBonus[1] + _listBonus[0] == 11;
                        break;
                    case "12":
                        isDel = _listBonus[1] + _listBonus[0] == 12;
                        break;
                    case "13":
                        isDel = _listBonus[1] + _listBonus[0] == 13;
                        break;
                    case "14":
                        isDel = _listBonus[1] + _listBonus[0] == 14;
                        break;
                    case "15":
                        isDel = _listBonus[1] + _listBonus[0] == 15;
                        break;
                    case "16":
                        isDel = _listBonus[1] + _listBonus[0] == 16;
                        break;
                    case "17":
                        isDel = _listBonus[1] + _listBonus[0] == 17;
                        break;
                    case "18":
                        isDel = _listBonus[1] + _listBonus[0] == 18;
                        break;
                }
                break;
            case "定胆":
                switch (_checkbox.value) {
                    case "0":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 0;
                        break;
                    case "1":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 1;
                        break;
                    case "2":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 2;
                        break;
                    case "3":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 3;
                        break;
                    case "4":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 4;
                        break;
                    case "5":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 5;
                        break;
                    case "6":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 6;
                        break;
                    case "7":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 7;
                        break;
                    case "8":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 8;
                        break;
                    case "9":
                        isDel = _listBonus[1] != 0 && _listBonus[0] != 9;
                        break;
                }
                break;
        }
        return isDel;
    },
    getFilterBonusList: function() {
        ///<summary>计算当前过滤所需的号码组合</summary>
        if (pickClass1.SelectBalls.length < 1 || pickClass10.SelectBalls.length < 1) {
            alert("请先正确选择号码");
            return false;
        }
        this.ListBonus.clear();
        this.ListClientBouns.clear();
        this.ListBetCount.clear();
        if (this.Enable == true) {
            this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2DanShi;
            for (var i = 0; i < pickClass10.SelectBalls.length; i++) {
                for (var j = 0; j < pickClass1.SelectBalls.length; j++) {
                    var bl = [parseInt(pickClass1.SelectBalls[j].span.getAttribute("value"), 10), parseInt(pickClass10.SelectBalls[i].span.getAttribute("value"), 10)];
                    for (var x = 0; x < this.ListCondition.length; x++) {
                        if (this.filter(this.ListCondition[x], bl) != true) {
                            this.ListBonus.push("_,_,_," + bl[1] + "," + bl[0]);
                            this.ListClientBouns.push(bl[1] + "," + bl[0]);
                            this.ListBetCount.push(1);
                            if (this.ListCondition[x].getAttribute("index") == 6) {
                                break;
                            }
                        }
                    }
                }
            }
        } else {
            this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2DanShi;
            var ball10 = "";
            for (var i = 0; i < pickClass10.SelectBalls.length; i++) {
                ball10 += pickClass10.SelectBalls[i].span.getAttribute("value");
            }
            if (pickClass10.SelectBalls.length > 1) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuHe;
            }
            var ball1 = "";
            for (var j = 0; j < pickClass1.SelectBalls.length; j++) {
                ball1 += pickClass1.SelectBalls[j].span.getAttribute("value");
            }
            if (pickClass1.SelectBalls.length > 1) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuHe;
            }
            this.ListBonus.push("_,_,_," + ball10 + "," + ball1);
            this.ListClientBouns.push(ball10 + "," + ball1);
            this.ListBetCount.push(pickClass10.SelectBalls.length * pickClass1.SelectBalls.length);
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
        UpdateDataStandardYiLou: null,
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
        this.Container.UpdateDataStandardYiLou = $("ContainerStandardYiLou");
        this.Container.UpdateDataXingTaiYiLou = $("ContainerXingTaiYiLou");

        var menus = this.Container.UpdateDataMenu.getElementsByTagName("li");
        menus[0].wrap = this.Container.UpdateDataNormalYiLou.parentNode;
        menus[1].wrap = this.Container.UpdateDataStandardYiLou;
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

function getBonusResultList(_bonusNumber) {
    ///<summary>根据开奖号码获取形态</summary>
    _bonusNumber = _bonusNumber.toString();
    var listR = new Array();
    var ball1 = parseInt(_bonusNumber.substr(4, 1), 10);
    var ball2 = parseInt(_bonusNumber.substr(3, 1), 10);
    var ball3 = parseInt(_bonusNumber.substr(2, 1), 10);
    var ball4 = parseInt(_bonusNumber.substr(1, 1), 10);
    var ball5 = parseInt(_bonusNumber.substr(0, 1), 10);
    var dx = (ball2 >= 5 ? "大" : "小") + (ball1 >= 5 ? "大" : "小");
    var jo = (ball2 % 2 == 1 ? "奇" : "偶") + (ball1 % 2 == 1 ? "奇" : "偶");
    var zh = (PrimeArray.exists(ball2) ? "质" : "合") + (PrimeArray.exists(ball1) ? "质" : "合");
    var c3ys = ball2 % 3 + "" + ball1 % 3;
    var dz = ball2 == ball1 ? "<b>√</b>" : "&nbsp;";
    var lh = ball1 + 1 == ball2 || ball1 - 1 == ball2 ? "<b>√</b>" : "&nbsp;";
    var jg = ball1 + 2 == ball2 || ball1 - 2 == ball2 ? "<b>√</b>" : "&nbsp;";
    listR.push(dx);
    listR.push(jo);
    listR.push(zh);
    listR.push(c3ys);
    listR.push(dz);
    listR.push(lh);
    listR.push(jg);
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
        switch (_typeYiLou) {
            case "206": ///胆码遗漏"8,_"或者"_,1"
                var dan = _ballValue.split(",");
                if ((dan[0] == "_" && _indexBall == 0) || (dan[1] == "_" && _indexBall == 1) || (dan[0] == _value) || (dan[1] == _value)) {
                    isValidate = true;
                }
                break;
            case "210": ///大小奇偶遗漏
                var xingTai = _ballValue.split(",")[_indexBall];
                switch (xingTai) {
                    case "大奇":
                        isValidate = intValue >= 5 && intValue % 2 == 1;
                        break;
                    case "大偶":
                        isValidate = intValue >= 5 && intValue % 2 == 0;
                        break;
                    case "小奇":
                        isValidate = intValue < 5 && intValue % 2 == 1;
                        break;
                    case "小偶":
                        isValidate = intValue < 5 && intValue % 2 == 0;
                        break;
                }
                break;
            case "212": ///奇偶质合遗漏
                var xingTai = _ballValue.split(",")[_indexBall];
                switch (xingTai) {
                    case "奇质":
                        isValidate = intValue % 2 == 1 && PrimeArray.exists(intValue);
                        break;
                    case "奇合":
                        isValidate = intValue % 2 == 1 && !PrimeArray.exists(intValue);
                        break;
                    case "偶质":
                        isValidate = intValue % 2 == 0 && PrimeArray.exists(intValue);
                        break;
                    case "偶合":
                        isValidate = intValue % 2 == 0 && !PrimeArray.exists(intValue);
                        break;
                }
                break;
            case "211": ///大小质合遗漏
                var xintTai = _ballValue.split(",")[_indexBall];
                switch (xintTai) {
                    case "大质":
                        isValidate = intValue >= 5 && PrimeArray.exists(intValue);
                        break;
                    case "大合":
                        isValidate = intValue >= 5 && !PrimeArray.exists(intValue);
                        break;
                    case "小质":
                        isValidate = intValue < 5 && PrimeArray.exists(intValue);
                        break;
                    case "小合":
                        isValidate = intValue < 5 && !PrimeArray.exists(intValue);
                        break;
                }
                break;
            case "213": ///012路遗漏"21"
                var xintTai = _ballValue.split(",")[_indexBall];
                isValidate = intValue % 3 == parseInt(xintTai, 10);
                break;
            default: ///数字直接选号"13"
                var xintTai = _ballValue.split(",")[_indexBall];
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
    var htmlXingTai = new Array(); ///形态遗漏
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
        ///标准遗漏
        if (dataYiLou[i].MissKey == "201") {
            outHtml(dataYiLou[i], "二星(定位)遗漏", "二星（十位、个位）遗漏", "Trend.aspx?tid=d10", 0, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "202") {
            outHtml(dataYiLou[i], "二星对子遗漏", "二星的对子号（十、个位相同）遗漏", "Trend.aspx?tid=d11", 1, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "206") {
            outHtml(dataYiLou[i], "二星胆码遗漏", "二星的胆码（定一胆，另一位全包）遗漏", "", 2, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "204") {
            outHtml(dataYiLou[i], "二星连号遗漏", "二星的连号（十位和个位的正差值为1）遗漏", "", 3, htmlStandard);
        }
        if (dataYiLou[i].MissKey == "205") {
            outHtml(dataYiLou[i], "二星间隔遗漏", "二星的间隔（十位和个位的正差值为2）遗漏", "", 4, htmlStandard);
        }

        ///形态遗漏
        if (dataYiLou[i].MissKey == "210") {
            outHtml(dataYiLou[i], "二星大小奇偶遗漏", "二星（十位、个位）的大小奇偶形态遗漏", "", 0, htmlXingTai);
        }
        if (dataYiLou[i].MissKey == "212") {
            outHtml(dataYiLou[i], "二星奇偶质合遗漏", "二星（十位、个位）的奇偶质合形态遗漏", "", 1, htmlXingTai);
        }
        if (dataYiLou[i].MissKey == "211") {
            outHtml(dataYiLou[i], "二星大小质合遗漏", "二星（十位、个位）的大小质合形态遗漏", "", 2, htmlXingTai);
        }
        if (dataYiLou[i].MissKey == "213") {
            outHtml(dataYiLou[i], "二星012路遗漏", "二星（十位、个位）的012路形态遗漏", "", 3, htmlXingTai);
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
    PickR.setRadioCheckBoxRemarkValue($("cbRadioYiLou"), fenWeiYiLouStr);
    htmlStandard.push("<i class=\"shadowBottom\"><i class=\"shadowBottomL\"></i></i>");
    htmlXingTai.push("<i class=\"shadowBottom\"><i class=\"shadowBottomL\"></i></i>");
    $("ContainerStandardYiLou").innerHTML = htmlStandard.join("\r\n");
    $("ContainerXingTaiYiLou").innerHTML = htmlXingTai.join("\r\n");
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
    html += ">期号" + (orderDesc ? parent.TextOrderCharactor.Desc : parent.TextOrderCharactor.Asc) + "</th><th>开奖号码</th><th>大小</th><th>奇偶</th><th>质合</th><th>012路</th><th>对子</th><th>连号</th><th>间隔</th></tr>";
    var htmlSort = "";
    for (var i = 0; i < bonusStrAry.length - 2; i++) {
        var issue = bonusStrAry[i].split("|")[0];
        var listR = getBonusResultList(bonusStrAry[i].split("|")[1].toString());
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
    PickR.setRadioCheckBoxRemarkValue($("cbRadioLengRe"), fenWeiLengRe.toString());
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}