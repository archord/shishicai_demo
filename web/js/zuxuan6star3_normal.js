/// <reference path="~/JS/NoUse/JScript.js" />

TKCPCEO.Lottery.FCCQSSC.Pick = function() {
    ///<summary>选号类</summary>
    ///<field name="Container">选号球对象集合容器</field>
    ///<field name="ObjRemarkYiLou">标注Title显示对象</field>
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
    PickClass: null,
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
        if (_arrayListValue.length != 10) { _arrayListValue = ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"]; }
        var maxIndex = -1;
        var maxValue = 0;
        for (var i = 0; i < _arrayListValue.length; i++) {
            var fenweiAry = _arrayListValue[i];
            //最大值
            var regExp = new RegExp(/\d+/);
            if (regExp.test(fenweiAry)) {
                if (parseInt(fenweiAry, 10) > maxValue) {
                    maxValue = parseInt(fenweiAry, 10);
                    maxIndex = i;
                }
            }
            //最大值
            if (_isLengRe != true) {
                this.PickClass.ListBalls[i].pYiLou.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry;
            } else {
                this.PickClass.ListBalls[i].pLengRe.innerHTML = IsEmpty ? "&nbsp;" : fenweiAry;
            }
        }
        if (maxIndex != -1) {
            var pc = _isLengRe != true ? this.PickClass.ListBalls[maxIndex].pYiLou : this.PickClass.ListBalls[maxIndex].pLengRe;
            pc.innerHTML = "<b style=\"color:#EBAB00;font-weight:bold;\">" + pc.innerHTML + "</b>";
        }
    },
    compute: function() {
        ///<summary>计算选号结果</summary>
        this.BetCount = TKCPCEO.Math.C(3, this.PickClass.SelectBalls.length);
        this.BetMoney = this.BetCount * this.PerMoney;

        this.PickInfo.BetCount.innerHTML = this.BetCount.toString();
        this.PickInfo.BetMoney.innerHTML = this.BetMoney.toString().toMoney();
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.PickInfo.BetCount == null || this.PickInfo.BetMoney == null || this.PickClass == null) {
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
        emTitle.innerHTML = this.Text.HeadTitle;
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
        if (pickClass.SelectBalls.length < 3) {
            alert("三星组六至少需要选择3个号码");
            return false;
        }
        this.ListBonus.clear();
        this.ListClientBouns.clear();
        this.ListBetCount.clear();
        if (this.Enable == true) {
            this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3Zu6DanShi;
            //            for (var i = 0; i < pickClass10.SelectBalls.length; i++) {
            //                for (var j = 0; j < pickClass1.SelectBalls.length; j++) {
            //                    var bl = [parseInt(pickClass1.SelectBalls[j].span.getAttribute("value"), 10), parseInt(pickClass10.SelectBalls[i].span.getAttribute("value"), 10)];
            //                    for (var x = 0; x < this.ListCondition.length; x++) {
            //                        if (this.filter(this.ListCondition[x], bl) != true) {
            //                            this.ListBonus.push("_,_,_," + bl[1] + "," + bl[0]);
            //                            this.ListClientBouns.push(bl[1] + "," + bl[0]);
            //                            this.ListBetCount.push(1);
            //                            if (this.ListCondition[x].getAttribute("index") == 6) {
            //                                break;
            //                            }
            //                        }
            //                    }
            //                }
            //            }
        } else {
            this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3Zu6DanShi;
            var ball = "";
            for (var i = 0; i < pickClass.SelectBalls.length; i++) {
                ball += pickClass.SelectBalls[i].span.getAttribute("value");
            }
            if (pickClass.SelectBalls.length > 3) {
                this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3Zu6FuShi;
                this.ListBonus.push(ball.split("").join(","));
            } else {
                this.ListBonus.push("_,_," + ball.split("").join(","));
            }
            this.ListClientBouns.push(ball.split("").join(","));
            this.ListBetCount.push(TKCPCEO.Math.C(3, pickClass.SelectBalls.length));
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
        pickClass.exeCommand("清");
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
        UpdateDataYiLou: null,
        UpdateDataWanNengFuShi: null
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
        this.Container.UpdateDataWanNengFuShi = $("ContainerWanNengFuShiLou");

        var menus = this.Container.UpdateDataMenu.getElementsByTagName("li");
        menus[0].wrap = this.Container.UpdateDataNormalYiLou.parentNode;
        menus[1].wrap = this.Container.UpdateDataYiLou;
        menus[2].wrap = this.Container.UpdateDataWanNengFuShi;
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
    var zs = "";
    var zn = "";
    var cm = [];

    var lastBonusAry = _bonusNumber2.split("");

    for (var i = 1; i <= 3; i++) {
        var No = eval("ball" + i);
        dxb[No >= 5 ? 0 : 1] += 1;
        job[No % 2 == 1 ? 0 : 1] += 1;
        zhb[PrimeArray.exists(No) ? 0 : 1] += 1;
        c3ysb[No % 3] += 1;
    }

    if (ball3 != ball2 && ball3 != ball1 && ball2 != ball1) {
        zs = "&nbsp;";
        zn = "<b>√</b>";
    } else if (ball1 == ball2 && ball1 == ball3) {
        zs = "&nbsp;";
        zn = "&nbsp;";
    } else {
        zs = "<b>√</b>";
        zn = "&nbsp;";
    }
    if (lastBonusAry[4] == ball1) {
        cm.push(ball1);
    }
    if (lastBonusAry[4] == ball2) {
        cm.push(ball2);
    }
    if (lastBonusAry[4] == ball3) {
        cm.push(ball3);
    }

    if (lastBonusAry[3] == ball1) {
        cm.push(ball1);
    }
    if (lastBonusAry[3] == ball2) {
        cm.push(ball2);
    }
    if (lastBonusAry[3] == ball3) {
        cm.push(ball3);
    }

    if (lastBonusAry[2] == ball1) {
        cm.push(ball1);
    }
    if (lastBonusAry[2] == ball2) {
        cm.push(ball2);
    }
    if (lastBonusAry[2] == ball3) {
        cm.push(ball3);
    }

    listR.push(dxb.join(":"));
    listR.push(job.join(":"));
    listR.push(zhb.join(":"));
    listR.push(c3ysb.join(":"));
    listR.push(zs);
    listR.push(zn);
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
    if (_typeYiLou != "370" && _typeYiLou != "383" && _typeYiLou != "318" && _typeYiLou != "319" && _typeYiLou != "320" && _typeYiLou != "321") {
        alert(parent.PickErrorText);
        return;
    }
    function checkBallCondition(_value, _ballValue) {
        var isValidate = false;
        switch (_typeYiLou) {
            default: ///数字直接选号"13"
                var valueAry = _ballValue.split(",");
                if (_typeYiLou != "383" || _typeYiLou != "370") {
                    valueAry = _ballValue.split("");
                }
                for (var i = 0; i < valueAry.length; i++) {
                    if (parseInt(valueAry[i], 10) == parseInt(_value, 10)) {
                        isValidate = true;
                        break;
                    }
                }
                break;
        }
        return isValidate;
    }
    PickR.PickClass.exeCommand("清");
    var ball = _key;
    if (_typeYiLou == "370") {
        var v = ball.toString().split(",");
        if (v[0] == v[1] || v[0] == v[2] || v[1] == v[2]) {
            alert(parent.PickErrorText);
            return;
        }
    }
    for (var i = 0; i < PickR.PickClass.ListBalls.length; i++) {
        var value = parseInt(PickR.PickClass.ListBalls[i].span.getAttribute("value"), 10);
        if (checkBallCondition(value, ball) == true) {
            PickR.PickClass.ListBalls[i].span.onclick();
        }
    }
}

function Event_UpdateData_YiLou() {
    ///<summary>更新遗漏数据</summary>
    var htmlStandard = new Array(); ///标准遗漏
    var htmlWanNengFuShi = new Array(); ///万能复式遗漏
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

    function fillFenWeiYiLou(_dataYiLouItem) {
        for (var i = 0; i < _dataYiLouItem.MissValue.length; i++) {
            fenWeiYiLou[parseInt(_dataYiLouItem.MissValue[i].MissKey.substr(0, 1), 10)] = parseInt(_dataYiLouItem.MissValue[i].MissValue, 10);
        }
    }

    var fenWeiYiLou = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < parent.TotalLoadData.YiLou.length; i++) {
        ///遗漏
        if (dataYiLou[i].MissKey == "370") {
            outHtml(dataYiLou[i], "三组遗漏", "三星组选（百、十、个位不排序）遗漏。", "Trend.aspx?tid=j18", 0, htmlStandard);
        }
        //        if (dataYiLou[i].MissKey == "302") {
        //            outHtml(dataYiLou[i], "三组豹子遗漏", "三星的豹子号（百、十、个位相同）遗漏", "", 1, htmlStandard);
        //        }
        //        if (dataYiLou[i].MissKey == "303") {
        //            outHtml(dataYiLou[i], "组三遗漏", "三星的组三号码（包含对子的号码，百、十、个位不排序）遗漏", "", 2, htmlStandard);
        //        }
        if (dataYiLou[i].MissKey == "383") {
            outHtml(dataYiLou[i], "组六遗漏(不定位)", "三星的组六号码（除去豹子和组三的号码，百、十、个位不排序）遗漏", "Trend.aspx?tid=j25", 3, htmlStandard);
        }
        //        if (dataYiLou[i].MissKey == "371") {
        //            outHtml(dataYiLou[i], "三组单胆遗漏", "三星组选的单胆（定一胆，其它位全包，百、十、个位不排序）遗漏", "", 4, htmlStandard);
        //        }
        //        if (dataYiLou[i].MissKey == "373") {
        //            outHtml(dataYiLou[i], "三组双胆遗漏", "三星组选的双胆（定两胆，其它位全包，百、十、个位不排序）遗漏", "", 5, htmlStandard);
        //        }

        ///万能复式遗漏
        if (dataYiLou[i].MissKey == "318") {
            outHtml(dataYiLou[i], "四码遗漏", "三星（百、十、个位）的万能四码（4个号码为一组，共30组）遗漏", "Trend.aspx?tid=e16", 0, htmlWanNengFuShi, 0);
        }
        if (dataYiLou[i].MissKey == "319") {
            outHtml(dataYiLou[i], "五码遗漏", "三星（百、十、个位）的万能五码（5个号码为一组，共17组）遗漏", "Trend.aspx?tid=e17", 1, htmlWanNengFuShi, 0);
        }
        if (dataYiLou[i].MissKey == "320") {
            outHtml(dataYiLou[i], "六码遗漏", "三星（百、十、个位）的万能六码（6个号码为一组，共10组）遗漏", "Trend.aspx?tid=e18", 2, htmlWanNengFuShi, 0);
        }
        if (dataYiLou[i].MissKey == "321") {
            outHtml(dataYiLou[i], "七码遗漏", "三星（百、十、个位）的万能七码（7个号码为一组，共6组）遗漏", "Trend.aspx?tid=e19", 3, htmlWanNengFuShi, 0);
        }

        ///分位遗漏
        if (dataYiLou[i].MissKey == "372") {///胆码形态排序
            fillFenWeiYiLou(dataYiLou[i]);
        }
    }
    PickR.setRemarkValue(fenWeiYiLou.join(","));
    htmlStandard.push("<i class=\"shadowBottom\"><i class=\"shadowBottomL\"></i></i>");
    htmlWanNengFuShi.push("<i class=\"shadowBottom\"><i class=\"shadowBottomL\"></i></i>");
    $("ContainerYiLou").innerHTML = htmlStandard.join("\r\n");
    $("ContainerWanNengFuShiLou").innerHTML = htmlWanNengFuShi.join("\r\n");
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
    html += ">期号" + (orderDesc ? parent.TextOrderCharactor.Desc : parent.TextOrderCharactor.Asc) + "</th><th>开奖号码</th><th>大小比</th><th>奇偶比</th><th>质合比</th><th>012路比</th><th>组三</th><th>组六</th><th>重码</th></tr>";
    var htmlSort = "";
    for (var i = 0; i < bonusStrAry.length - 2; i++) {
        var issue = bonusStrAry[i].split("|")[0];
        var listR = getBonusResultList(bonusStrAry[i].split("|")[1].toString(), bonusStrAry[i + 1].split("|")[1].toString());
        var bonus5 = bonusStrAry[i].split("|")[1].toString().substr(0, 1);
        var bonus4 = bonusStrAry[i].split("|")[1].toString().substr(1, 1);
        var bonus3 = bonusStrAry[i].split("|")[1].toString().substr(2, 1);
        var bonus2 = bonusStrAry[i].split("|")[1].toString().substr(3, 1);
        var bonus1 = bonusStrAry[i].split("|")[1].toString().substr(4, 1);
        var addString = "<tr><td>" + issue.split("-")[1] + "期</td><td class=\"n\">" + bonus5 + bonus4 + "<strong>" + bonus3 + bonus2 + bonus1 + "</strong>" + "</td><td>" + listR[0] + "</td><td>" + listR[1] + "</td><td>" + listR[2] + "</td><td>" + listR[3] + "</td><td>" + listR[4] + "</td><td>" + listR[5] + "</td><td>" + listR[6] + "</td></tr>";
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
    var fenWeiLengRe = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < lengReAry.length; i++) {
        if (i >= 2 && i <= 4) {
            for (var j = 0; j < lengReAry[i].length; j++) {
                fenWeiLengRe[j] += lengReAry[i][j];
            }
        }
    }
    ///分为冷热
    PickR.setRemarkValue(fenWeiLengRe.toString(), true);
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}