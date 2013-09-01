/// <reference path="~/JS/NoUse/JScript.js" />
var bonusStopAry = [];
var shouldBonusStopAry = [];
var labelBonusStopAry = [];
var labelShouldBonusStopAry = [];
var containerBonusStop = null;
var containerShouldBonusStop = null;
var thisLotteryType = TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCCQSSC;

var EmptyOnmouseoverText = "<p>正在从服务器获取详细数据……</p>";
var PickErrorText = "此选号方式与当前玩法不匹配";
var TextTitle = {
    YiLou: "查看当前遗漏",
    LengRe: "查看近10期号码出现次数",
    ReXuan: "当前期投注会员的选号情况统计"
}
///10期走势排序用
var iframeBonusOrder = true;
var orderDesc = false;
var TextOrderCharactor = {
    Desc: "↓",
    Asc: "↑",
    Desc_Title: "点击排序↑",
    Asc_Title: "点击排序↓"
}

function SetCurrentSelectIssue(_listBetIssue, _selectObj, _listParentAllIssue) {
    _selectObj.innerHTML = "";
    if (_listParentAllIssue != null) { _listParentAllIssue.length = 0; }
    for (var i = 0; i < _listBetIssue.length; i++) {
        var o = new Option();
        o.text = "[" + (i + 1) + "] " + (i == 0 ? _listBetIssue[i].Issue.substr(4) + "(当前期)" : _listBetIssue[i].Issue.substr(0) + "期");
        o.value = _listBetIssue[i].Issue;
        _selectObj.options.add(o);
        if (_listParentAllIssue != null) {
            _listParentAllIssue.push(o.value);
        }
    }
    if (_selectObj == betList.ModelIssue.Object.Select) {
        SetCurrentBetIssueText(_listBetIssue[0].Issue);
    }
}

TKCPCEO.Lottery.FCCQSSC.BetMenu = function() {
    ///<summary>重庆时时彩菜单类</summary>
    ///<field name="ChildMenu">子菜单选项集合对象</field>
    ///<field name="ChildMenu.Title">菜单显示当前玩法名称对象</field>
    ///<field name="ChildMenu.Normal">常规选号菜单对象</field>
    ///<field name="ChildMenu.Trend">走势选号菜单对象</field>
    ///<field name="ChildMenu.File">文件选号菜单对象</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.BetMenu.prototype = {
    ContainerIframes: null,
    ListMenus: new Array(),
    CurrentObj: {
        Menu: null
    },
    ChildMenu: {
        Title: null,
        Q: null,
        Normal: null,
        Trend: null,
        File: null,
        Special: null
    },
    reSetChildMenu: function() {
        ///<summary>设置子菜单及当前信息</summary>
        switch (this.CurrentObj.Menu.innerHTML.toLowerCase().replace("<span>", "").replace("</span>", "")) {
            case "组选六":
                this.CurrentObj.Menu.className = "tr active";
                this.CurrentObj.Menu.style.marginLeft = "33px";
                break;
            default:
                this.CurrentObj.Menu.className = "active";
                break;
        }
        this.ChildMenu.Title.innerHTML = this.CurrentObj.Menu.getAttribute("ptcn");
        switch (parseInt(this.CurrentObj.Menu.getAttribute("index"), 10)) {
            case 1:
                this.ChildMenu.Normal.className = null;
                this.ChildMenu.Trend.className = "active";
                this.ChildMenu.File.className = null;
                this.ChildMenu.Special.className = null;
                break;
            case 2:
                this.ChildMenu.Normal.className = null;
                this.ChildMenu.Trend.className = null;
                this.ChildMenu.File.className = "active";
                this.ChildMenu.Special.className = null;
                break;
            case 3:
                this.ChildMenu.Normal.className = null;
                this.ChildMenu.Trend.className = null;
                this.ChildMenu.File.className = null;
                this.ChildMenu.Special.className = "active";
                break;
            default:
                this.ChildMenu.Normal.className = "active";
                this.ChildMenu.Trend.className = null;
                this.ChildMenu.File.className = null;
                this.ChildMenu.Special.className = null;
                break;
        }
        switch (this.CurrentObj.Menu.childMenus.length) {
            case 3:
                this.ChildMenu.Normal.style.display = "";
                this.ChildMenu.Trend.style.display = "none";
                this.ChildMenu.File.style.display = "";
                this.ChildMenu.Special.style.display = "none";
                break;
            case 1:
                this.ChildMenu.Normal.style.display = "";
                this.ChildMenu.Trend.style.display = "none";
                this.ChildMenu.File.style.display = "none";
                this.ChildMenu.Special.style.display = "none";
                break;
            case 4:
                this.ChildMenu.Normal.style.display = "";
                this.ChildMenu.Trend.style.display = "none";
                this.ChildMenu.File.style.display = "";
                this.ChildMenu.Special.style.display = "";
                break;
            default:
                this.ChildMenu.Normal.style.display = "";
                this.ChildMenu.Trend.style.display = "none";
                this.ChildMenu.File.style.display = "none";
                this.ChildMenu.Special.style.display = "none";
                break;
        }
        this.CurrentObj.Menu.childMenus[parseInt(this.CurrentObj.Menu.getAttribute("index"), 10)].Iframe.style.display = "";
        //        return;
        this.ChildMenu.Q.innerHTML = this.CurrentObj.Menu.childMenus[0].Q;
        var _indexChildMenu = this.CurrentObj.Menu.childMenus[parseInt(this.CurrentObj.Menu.getAttribute("index"), 10)];
        if (_indexChildMenu.Iframe.src == "about:blank") {
            _indexChildMenu.Iframe.src = _indexChildMenu.Src;
            if (Broswer.ie != "0") {
                _indexChildMenu.Iframe.attachEvent("onload", function() {
                    //GetDataYiLou();
                    GetDataYiLouBack(TotalLoadData.YiLou, TotalLoadData.TotalBonusCount, true);
                    //                _indexChildMenu.Iframe.contentWindow.Event_UpdateData_YiLou();
                    _indexChildMenu.Iframe.contentWindow.Event_UpdateData_Bonus();
                    _indexChildMenu.Iframe.contentWindow.Event_UpdateData_LengRe();
                    iframeLoaded = true;
                    InitIframeHeight(_indexChildMenu.Iframe);
                });
            } else {
                _indexChildMenu.Iframe.addEventListener("load", function() {
                    //GetDataYiLou();
                    GetDataYiLouBack(TotalLoadData.YiLou, TotalLoadData.TotalBonusCount, true);
                    //                _indexChildMenu.Iframe.contentWindow.Event_UpdateData_YiLou();
                    _indexChildMenu.Iframe.contentWindow.Event_UpdateData_Bonus();
                    _indexChildMenu.Iframe.contentWindow.Event_UpdateData_LengRe();
                    iframeLoaded = true;
                    InitIframeHeight(_indexChildMenu.Iframe);
                }, false);
            }
        } else {
            if (TotalLoadData != null) {
                //GetDataYiLou();
                GetDataYiLouBack(TotalLoadData.YiLou, TotalLoadData.TotalBonusCount, true);
                //                _indexChildMenu.Iframe.contentWindow.Event_UpdateData_YiLou();
                _indexChildMenu.Iframe.contentWindow.Event_UpdateData_Bonus();
                _indexChildMenu.Iframe.contentWindow.Event_UpdateData_LengRe();
            }
        }
    },
    createIframe: function(_indexChildMenu) {
        ///<summary>创建相关的iframe对象</summary>
        _indexChildMenu.Iframe = document.createElement("iframe");
        _indexChildMenu.Iframe.frameBorder = 0;
        if (_indexChildMenu.Menu == "走势选号") {
            _indexChildMenu.Iframe.style.marginLeft = "-12px";
            _indexChildMenu.Iframe.style.width = "980px";
        } else {
            _indexChildMenu.Iframe.style.width = "99.5%";
        }
        _indexChildMenu.Iframe.src = "about:blank";
        _indexChildMenu.Iframe.scrolling = "no";
        _indexChildMenu.Iframe.allowTransparency = true;
        if (Broswer.ie != "0") {
            _indexChildMenu.Iframe.attachEvent("onload", function() {
                try {
                    _indexChildMenu.Iframe.contentWindow.document.body.style.backgroundColor = "#474747";
                } catch (e) { }
            });
        } else {
            _indexChildMenu.Iframe.addEventListener("load", function() {
                _indexChildMenu.Iframe.contentWindow.document.body.style.backgroundColor = "#474747";
            }, false);
        }
        this.ContainerIframes.appendChild(_indexChildMenu.Iframe);
    },
    setChildMenu: function(_index) {
        ///<summary>设置子菜单</summary>
        ///<param name="_index">子菜单索引值</param>
        this.CurrentObj.Menu.childMenus[parseInt(this.CurrentObj.Menu.getAttribute("index"), 10)].Iframe.style.display = "none";
        this.CurrentObj.Menu.setAttribute("index", _index.toString());
        if (this.CurrentObj.Menu.childMenus[_index].Iframe == null) {
            this.createIframe(this.CurrentObj.Menu.childMenus[parseInt(this.CurrentObj.Menu.getAttribute("index"), 10)]);
        }
        this.reSetChildMenu();
    },
    setMenu: function(_linkMenu, _noHash) {
        ///<summary>设置大菜单</summary>
        ///<param name="_linkMenu">当前点击的菜单超链接对象</param>
        if (this.CurrentObj.Menu != null) {
            switch (this.CurrentObj.Menu.innerHTML.toLowerCase().replace("<span>", "").replace("</span>", "")) {
                case "组选六":
                    this.CurrentObj.Menu.className = "tr";
                    this.CurrentObj.Menu.style.marginLeft = "28px";
                    break;
                default:
                    this.CurrentObj.Menu.className = null;
                    break;
            }
            this.CurrentObj.Menu.childMenus[parseInt(this.CurrentObj.Menu.getAttribute("index"), 10)].Iframe.style.display = "none";
        }
        this.CurrentObj.Menu = _linkMenu;



        this.CurrentObj.Menu.setAttribute("index", "0");  ///子菜单复位
        var indexChildMenu = this.CurrentObj.Menu.childMenus[parseInt(this.CurrentObj.Menu.getAttribute("index"), 10)];

        if (indexChildMenu.Iframe == null) {
            this.createIframe(indexChildMenu);
        }

        this.reSetChildMenu();
        //        if (_noHash != true) {
        //            window.location.hash = "jumpmenuselect";
        //        }
        var menus = $("ContainerBetMenuWrap").getElementsByTagName("ul")[0].getElementsByTagName("a");
        for (var i = 0; i < menus.length; i++) {
            if (menus[i] == _linkMenu) {
                setBetLotteryTypeWithPlayType(thisLotteryType, i);
                break;
            }
        }
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.ChildMenu.Normal == null || this.ChildMenu.Trend == null || this.ChildMenu.File == null) {
            alert("请先配置相关菜单对象");
            return;
        }
        this.ChildMenu.Normal.onclick = this.setChildMenu.bind(this, 0);
        this.ChildMenu.Trend.onclick = this.setChildMenu.bind(this, 1);
        this.ChildMenu.File.onclick = this.setChildMenu.bind(this, 2);
        this.ChildMenu.Special.onclick = this.setChildMenu.bind(this, 3);

        var menus = $("ContainerBetMenuWrap").getElementsByTagName("ul")[0].getElementsByTagName("a");
        for (var i = 0; i < menus.length; i++) {
            var _linkMenu = menus[i];
            this.ListMenus.push(_linkMenu);
            _linkMenu.childMenus = [];
            if (_linkMenu.getAttribute("index") == null) { _linkMenu.setAttribute("index", "0"); }
            switch (_linkMenu.getAttribute("pt")) {
                case "standard_star_1":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "StandardStar1_Normal.aspx", Q: "竞猜开奖号码的最后一位，选择1个或多个号码投注，奖金<b style=\"color:#f00;\">10</b>元", YiLou: [1, 101, 102, 104, 106, 108] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;
                case "standard_star_2":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "StandardStar2_Normal.aspx", Q: "竞猜开奖号码的最后两位，分别选择十位和个位的1个或多个号码投注，奖金<b style=\"color:#f00;\"/>100</b>元", YiLou: [1, 2, 201, 202, 204, 205, 206, 210, 211, 212, 213] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" },
                        { Menu: "文件选号", Iframe: null, Src: "StandardStar2_File.aspx", Q: "" }
                    ];
                    break;
                case "standard_star_3":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "StandardStar3_Normal.aspx", Q: "竞猜开奖号码的后面三位，分别选择百位、十位和个位的1个或多个号码投注，奖金<b style=\"color:#f00;\"/>1000</b>元", YiLou: [1, 2, 3, 301, 302, 303, 305, 307, 309, 314, 315, 316, 318, 319, 320, 321] },
                        { Menu: "和值选号", Iframe: null, Src: "StandardStar3_Sum.aspx", Q: "" },
                        { Menu: "文件选号", Iframe: null, Src: "StandardStar3_File.aspx", Q: "" },
                        { Menu: "和值", Iframe: null, Src: "StandardStar3_Sum.aspx", Q: "一个和值号码包含对应注数的所有单式号码，奖金<b style=\"color:#f00;\"/>1000</b>元" }
                    ];
                    break;
                case "standard_star_5":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "StandardStar5_Normal.aspx", Q: "竞猜开奖号码的全部五位，分别选择每位的1个或多个号码投注，奖金<b style=\"color:#f00;\"/>100000</b>元", YiLou: [1, 2, 3, 4, 5, 201, 301, 601, 701, 801] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" },
                        { Menu: "文件选号", Iframe: null, Src: "StandardStar5_File.aspx", Q: "" }
                    ];
                    break;


                case "sum_star_2":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "SumStar2_Normal.aspx", Q: "竞猜开奖号码最后两位的数字相加之和，选择1个或多个和值号码投注，奖金<b style=\"color:#f00;\"/>100</b>元", YiLou: [240, 241, 242, 243] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;
                case "sum_star_3":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "SumStar3_Normal.aspx", Q: "竞猜开奖号码后面三位的数字相加之和，选择1个或多个和值号码投注，奖金<b style=\"color:#f00;\"/>1000</b>元", YiLou: [350, 351, 352, 353] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;


                case "dxds":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "DXDS_Normal.aspx", Q: "竞猜开奖号码最后两位的大小单双，分别选择十位、个位投注，全部猜中则中奖，奖金<b style=\"color:#f00;\">4</b>元", YiLou: [10, 20, 291] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;


                case "zuxuan_star_2":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "ZuXuanStar2_Normal.aspx", Q: "竞猜开奖号码的最后两位，选择2个或以上号码投注，奖金<b style=\"color:#f00;\">50</b>元<b style=\"color:#f00;\">(开出对子不算中奖)</b>", YiLou: [204, 205, 270, 272] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" },
                        { Menu: "文件选号", Iframe: null, Src: "ZuXuanStar2_File.aspx", Q: "" }
                    ];
                    break;
                case "fenwei_star_2":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "FenWeiStar2_Normal.aspx", Q: "竞猜开奖号码的最后两位，分别选择每位的个或以上号码投注，奖金<b style=\"color:#f00;\">50</b>元", YiLou: [1, 2, 202, 204, 205, 270] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    //                        { Menu: "文件选号", Iframe: null, Src: "FenWeiStar2_File.aspx", Q: "" }
                    ];
                    break;
                case "baodian_star_2":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "BaoDianStar2_Normal.aspx", Q: "竞猜开奖号码后面两位的数字相加之和，开奖号码为对子奖金<b style=\"color:#f00;\"/>100</b>元;非对子奖金<b style=\"color:#f00;\"/>50</b>元", YiLou: [240, 241, 242, 243] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;
                case "baodan_star_2":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "BaoDanStar2_Normal.aspx", Q: "竞猜开奖号码的后二位的胆码，任意一位开出即中奖，1个胆码包含10注；开奖号码为对子奖金<b style=\"color:#f00;\"/>100</b>元;非对子奖金<b style=\"color:#f00;\"/>50</b>元", YiLou: [202, 204, 205, 270, 271, 272] }
                    //                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;


                case "zuxuan3_star_3":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "ZuXuan3Star3_Normal.aspx", Q: "竞猜开奖号码后三位，选择2个或以上号码投注，奖金<b style=\"color:#f00;\">320</b>元 <a style=\"font-size: 9pt;\" target=\"_blank\" href=\"/Help/Details.aspx?id=128\">什么是组选3？</a>", YiLou: [382, 318, 319, 320, 321, 370, 372, 378] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" },
                        { Menu: "文件选号", Iframe: null, Src: "ZuXuan3Star3_File.aspx", Q: "" },
                        { Menu: "和值", Iframe: null, Src: "ZuXuan3Star3_Sum.aspx", Q: "一个和值号码包含对应注数的所有单式号码，奖金<b style=\"color:#f00;\"/>320</b>元" }
                    ];
                    break;
                case "zuxuan6_star_3":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "ZuXuan6Star3_Normal.aspx", Q: "竞猜开奖号码后三位，选择3个或以上号码投注，奖金<b style=\"color:#f00;\">160</b>元 <a style=\"font-size: 9pt;\" target=\"_blank\" href=\"/Help/Details.aspx?id=128\">什么是组选6？</a>", YiLou: [383, 318, 319, 320, 321, 370, 372] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" },
                        { Menu: "文件选号", Iframe: null, Src: "ZuXuan6Star3_File.aspx", Q: "" },
                        { Menu: "和值", Iframe: null, Src: "ZuXuan6Star3_Sum.aspx", Q: "一个和值号码包含对应注数的所有单式号码，奖金<b style=\"color:#f00;\"/>160</b>元" }
                    ];
                    break;
                case "baodian_star_3":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "BaoDianStar3_Normal.aspx", Q: "竞猜开奖号码后面三位的数字相加之和，开奖号码为豹子形态奖金<b style=\"color:#f00;\"/>1000</b>元;组3形态奖金<b style=\"color:#f00;\"/>320</b>元;组6形态奖金<b style=\"color:#f00;\"/>160</b>元", YiLou: [350, 351, 352, 353] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;
                case "baodan_star_3":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "BaoDanStar3_Normal.aspx", Q: "竞猜开奖号码的后三位的胆码，任意一位开出即中奖，1个胆码包含55注；开奖号码为豹子形态奖金<b style=\"color:#f00;\"/>1000</b>元;组三形态奖金<b style=\"color:#f00;\"/>320</b>元;组六形态奖金<b style=\"color:#f00;\"/>160</b>元", YiLou: [302, 382, 382, 318, 319, 320, 321, 370, 371, 372, 373, 378] }
                    //                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    ];
                    break;
                case "zhixuanzuhe_star_3":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "ZhiXuanZuHeStar3_Normal.aspx", Q: "竞猜开奖号码后三位，选择3个或以上号码投注，开奖号码为组六形态则中奖，奖金<b style=\"color:#f00;\">1000</b>元 <a style=\"font-size: 9pt;\" target=\"_blank\" href=\"/Help/Details.aspx?id=128\">什么是组选6？</a>", YiLou: [302, 382, 383, 320, 321, 370, 371, 372, 373, 318, 319] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" }
                    //                        { Menu: "文件选号", Iframe: null, Src: "ZhiXuanZuHeStar3_File.aspx", Q: "" }
                    ];
                    break;

                case "tongxuan_star_5":
                    _linkMenu.childMenus = [
                        { Menu: "常规选号", Iframe: null, Src: "TongXuanStar5_Normal.aspx", Q: "竞猜开奖号码的全部五位，全部猜中奖金<b style=\"color:#f00;\"/>20000</b>元；猜中前三或后三奖金<b style=\"color:#f00;\"/>200</b>元；猜中前二或后二奖金<b style=\"color:#f00;\"/>20</b>元", YiLou: [1, 2, 3, 4, 5, 201, 301, 601, 701, 801] },
                        { Menu: "走势选号", Iframe: null, Src: "TrendIframe.aspx?pl=" + _linkMenu.getAttribute("pt"), Q: "" },
                        { Menu: "文件选号", Iframe: null, Src: "TongXuanStar5_File.aspx", Q: "" }
                    ];
                    break;
            }
            _linkMenu.setAttribute("index", "0");  ///子菜单复位
            var indexChildMenu = _linkMenu.childMenus[0];
            if (indexChildMenu.Iframe == null) {
                this.createIframe(indexChildMenu);
                indexChildMenu.Iframe.style.display = "none";
            }
        }
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.ListPlayType = [];
        this.ListIframes = [];
    }
}
var BetMenu = new TKCPCEO.Lottery.FCCQSSC.BetMenu();

TKCPCEO.Lottery.FCCQSSC.BetList = function() {
    ///<summary>时时彩投注单</summary>
    ///<field name="ContainerWrap">投注项容集合器对象</field>
    ///<field name="JsonCmdProject">投注方案实例TKCPCEO.Bet.JsonCmdProject</field>
    ///<field name="TotalBetMoney">总投注单金额(非方案总金额)</field>
    ///<field name="PerMoney">每注金额</field>
    ///<field name="IndexCount">当前投注项的历史索引+1值</field>
    ///<field name="ListItems">投注项列表集合数组</field>
    ///<field name="ObjEmptyItem">当没有投注项时的空项对象</field>
    ///<field name="IsMutiplyTool">是否是倍投工具</field>
    ///<field name="EnableComputeMoney">是否计算奖金相关</field>
    ///<field name="ModelIssue">期号倍数模型实例</field>
    ///<field name="ModelMutiply">倍投工具模型实例</field>
    ///<field name="ListBetIssue">当前可投注期号数组</field>
    ///<field name="CommonSpeedInfo">通用全局信息</field>
    ///<field name="CommonSpeedInfo.DateTime_StartTime">每天第一期开奖时间</field>
    ///<field name="CommonSpeedInfo.Seconds_BetEndTime">投注提前截至时间(单位:秒)</field>
    ///<field name="CommonSpeedInfo.Minutes_IntervalTime">每期间隔时间(单位:分)</field>
    ///<field name="CommonSpeedInfo.Count_EveryDay">每天总投注期数</field>
    ///<field name="CommonSpeedInfo.SplitString_Issue">可投注信息（待拆分）</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}

TKCPCEO.Lottery.FCCQSSC.BetList.Issue = function() {
    ///<summary>期号倍数相关设置</summary>
    ///<field name="Container">容器对象集合</field>
    ///<field name="Container.Wrap">外部容器对象</field>
    ///<field name="Container.Menu">日期菜单容器对象</field>
    ///<field name="Container.Issue">期号菜单容器对象</field>
    ///<field name="Parent">BetList实例对象</field>
    ///<field name="ListIssues">TKCPCEO.Bet.Issues集合</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.BetList.Issue.prototype = {
    Container: {
        Wrap: null,
        Issue: null
    },
    Object: {
        TextInput: null,
        CheckBox: null,
        Select: null,
        ObjectMultiple0: null,
        cnn: null
    },
    Parent: null,
    Current: {
        Menu: null,
        Issue: null
    },
    ListIssues: new Array(),
    ListMenu: new Array(),
    ListItemsIssues: new Array(),
    ListSelectedItemsIssues: new Array(),
    TextBox_Event: new TextBox_Event(),
    IsChase: true,
    IsChase2: true,
    ChaseChanged: false,
    CostMoney: 0,
    refresh: function() {
        ///<summary>刷新每期相关信息</summary>
        for (var i = 0; i < this.ListItemsIssues.length; i++) {
            if (this.ListItemsIssues[i].checkbox.checked == true) {
                this.ListItemsIssues[i].currentCost.setAttribute("value", this.Parent.TotalBetMoney * parseInt(this.ListItemsIssues[i].mutiply.value, 10));
                this.ListItemsIssues[i].currentCost.innerHTML = this.ListItemsIssues[i].currentCost.getAttribute("value").toString().toMoney();
            }
            var cc = parseInt(this.ListItemsIssues[i].currentCost.getAttribute("value"), 10);
            var la = 0;
            if (i > 0) { la = parseInt(this.ListItemsIssues[i - 1].addCost.getAttribute("value"), 10); }
            this.ListItemsIssues[i].addCost.setAttribute("value", cc + la);
            if (this.ListItemsIssues[i].checkbox.checked == true) {
                this.ListItemsIssues[i].addCost.innerHTML = this.ListItemsIssues[i].addCost.getAttribute("value").toString().toMoney();
            } else {
                this.ListItemsIssues[i].addCost.innerHTML = "&nbsp;";
            }
            if (this.Parent.EnableComputeMoney == true && this.ListItemsIssues[i].checkbox.checked == true) {
                this.ListItemsIssues[i].currentBouns.setAttribute("value", this.Parent.BonusMoney * parseInt(this.ListItemsIssues[i].mutiply.value, 10));
                this.ListItemsIssues[i].currentBouns.innerHTML = this.ListItemsIssues[i].currentBouns.getAttribute("value").toString().toMoney();
                var profit = parseInt(this.ListItemsIssues[i].currentBouns.getAttribute("value"), 10) - parseInt(this.ListItemsIssues[i].addCost.getAttribute("value"), 10);
                var profitHtml = profit.toString().toMoney();
                if (profit != 0) {
                    profitHtml = profit > 0 ? "<i style=\"color:#c40000;\">" + profit.toString().toMoney() + "</i>" : "<i style=\"color:#347729;\">" + profit.toString().toMoney() + "</i>";
                }
                this.ListItemsIssues[i].totalProfit.innerHTML = profitHtml;
            } else {
                if (this.ListItemsIssues[i].checkbox.checked == true) {
                    this.ListItemsIssues[i].currentBouns.innerHTML = "--";
                    this.ListItemsIssues[i].totalProfit.innerHTML = "--";
                } else {
                    this.ListItemsIssues[i].currentBouns.innerHTML = "&nbsp;";
                    this.ListItemsIssues[i].totalProfit.innerHTML = "&nbsp;";
                }
            }
            if (i == this.ListItemsIssues.length - 1) {
                this.CostMoney = la + cc;
                this.Parent.updateTotalInfo();
            }
        }
    },
    refreshOnCurrent: function(_liIssue) {
        ///<summary>刷新当前期及以后的相关信息</summary>
        ///<param name="_liIssue">当前期号、倍数项的dom对象</param>
        var isCurrent = false;
        for (var i = 0; i < this.ListItemsIssues.length; i++) {
            if (this.ListItemsIssues[i] == _liIssue) {
                isCurrent = true;
            }
            if (isCurrent == true) {
                var cc = 0;
                var la = 0;
                if (i > 0) { la = parseInt(this.ListItemsIssues[i - 1].addCost.getAttribute("value"), 10); }
                if (this.ListItemsIssues[i].checkbox.checked == true) {
                    cc = this.Parent.TotalBetMoney * parseInt(this.ListItemsIssues[i].mutiply.value, 10);
                    this.ListItemsIssues[i].currentCost.setAttribute("value", cc);
                    this.ListItemsIssues[i].currentCost.innerHTML = this.ListItemsIssues[i].currentCost.getAttribute("value").toString().toMoney();

                    //cc = parseInt(this.ListItemsIssues[i].currentCost.getAttribute("value"), 10);
                    this.ListItemsIssues[i].addCost.setAttribute("value", cc + la);
                    this.ListItemsIssues[i].addCost.innerHTML = (cc + la).toString().toMoney();
                } else {
                    this.ListItemsIssues[i].currentCost.setAttribute("value", 0);
                    this.ListItemsIssues[i].currentCost.innerHTML = "";

                    cc = parseInt(this.ListItemsIssues[i].currentCost.getAttribute("value"), 10);
                    this.ListItemsIssues[i].addCost.setAttribute("value", cc + la);
                    this.ListItemsIssues[i].addCost.innerHTML = "&nbsp;";
                }
                if (this.Parent.EnableComputeMoney == true && this.ListItemsIssues[i].checkbox.checked == true) {
                    this.ListItemsIssues[i].currentBouns.setAttribute("value", this.Parent.BonusMoney * parseInt(this.ListItemsIssues[i].mutiply.value, 10));
                    this.ListItemsIssues[i].currentBouns.innerHTML = this.ListItemsIssues[i].currentBouns.getAttribute("value").toString().toMoney();
                    var profit = parseInt(this.ListItemsIssues[i].currentBouns.getAttribute("value"), 10) - parseInt(this.ListItemsIssues[i].addCost.getAttribute("value"), 10);
                    var profitHtml = profit.toString().toMoney();
                    if (profit != 0) {
                        profitHtml = profit > 0 ? "<i style=\"color:#c40000;\">" + profit.toString().toMoney() + "</i>" : "<i style=\"color:#347729;\">" + profit.toString().toMoney() + "</i>";
                    }
                    this.ListItemsIssues[i].totalProfit.innerHTML = profitHtml;
                } else {
                    if (this.ListItemsIssues[i].checkbox.checked == true) {
                        this.ListItemsIssues[i].currentBouns.innerHTML = "--";
                        this.ListItemsIssues[i].totalProfit.innerHTML = "--";
                    } else {
                        this.ListItemsIssues[i].currentBouns.innerHTML = "&nbsp;";
                        this.ListItemsIssues[i].totalProfit.innerHTML = "&nbsp;";
                    }
                }
                if (i == this.ListItemsIssues.length - 1) {
                    this.CostMoney = la + cc;
                    this.Parent.updateTotalInfo();
                }
            }
        }
        this.Object.TextInput.value = this.ListIssues.length;
    },
    mutiplyChanged: function(_liIssue) {
        ///<summary>倍数值改变事件</summary>
        ///<param name="_liIssue">倍数文本输入框对应的期号倍数项dom对象</param>
        if (_liIssue.mutiply.value == "") {
            return;
        }
        var isChange = false;
        _liIssue.issue.Multiply = parseInt(_liIssue.mutiply.value, 10);
        for (var i = 0; i < this.ListItemsIssues.length; i++) {
            if (isChange == true) {
                this.ListItemsIssues[i].mutiply.value = _liIssue.mutiply.value;
                this.ListItemsIssues[i].issue.Multiply = parseInt(_liIssue.mutiply.value, 10);
            }
            if (this.ListItemsIssues[i] == _liIssue) {
                isChange = true;
            }
        }
        this.refreshOnCurrent(_liIssue);
    },
    clickIssue: function(_liIssue, _isNoRefresh) {
        ///<summary>期号复选框点击事件</summary>
        ///<param name="_liIssue">当前点击的复选框对应的期号项对象</param>
        ///<param name="_isNoRefresh">是否不进行计算，如果为true时则进行相应的投入、累计投入、奖金等计算</param>
        if ((_liIssue.checkbox.checked == true && this.ListSelectedItemsIssues.exists(_liIssue)) || (_liIssue.checkbox.checked != true && !this.ListSelectedItemsIssues.exists(_liIssue))) {
            return;
        }
        if (_liIssue.checkbox.checked == true) {
            this.ListIssues.push(_liIssue.issue);
            this.ListSelectedItemsIssues.push(_liIssue);
            _liIssue.className = "selected";
            _liIssue.mutiply.style.visibility = "visible";
        } else {
            this.ListIssues.remove(_liIssue.issue);
            this.ListSelectedItemsIssues.remove(_liIssue);
            _liIssue.className = null;
            _liIssue.mutiply.style.visibility = "hidden";
        }
        if (_isNoRefresh != true) {
            var func = function(_liIssue) {
                return function() { betList.ModelIssue.refreshOnCurrent(_liIssue); }
            } (_liIssue);
            setTimeout(func, 1);
            //            this.refreshOnCurrent(_liIssue);
        }
        if (this.ChaseChanged == false) {
            this.Parent.ObjectChase.checked = this.IsChase;
            this.Parent.JsonCmdProject.BonusStop = this.Parent.ObjectChase.checked;
        }
        betList.chaseDispaly();
    },
    clickCheckAllBox: function() {
        ///<summary>全选/取消复选框点击事件</summary>
        var listLi = this.ListItemsIssues;
        for (var i = listLi.length - 1; i >= 0; i--) {
            if (listLi[i].checkbox.checked != this.Object.CheckBox.checked) {
                listLi[i].checkbox.checked = !listLi[i].checkbox.checked;
                this.clickIssue(listLi[i], true);
            }
        }
        var func = function(_liIssue) {
            return function() { betList.ModelIssue.refreshOnCurrent(_liIssue); }
        } (listLi[0]);
        setTimeout(func, 1);
        //        this.clickIssue(listLi[0]);
    },
    clearAll: function() {
        ///<summary>归零复位</summary>
        for (var i = this.ListItemsIssues.length - 1; i >= 0; i--) {
            if (this.ListItemsIssues[i].checkbox.checked == true) {
                this.ListItemsIssues[i].checkbox.checked = false;
                this.clickIssue(this.ListItemsIssues[i], true);
            }
        }
        var func = function(_liIssue) {
            return function() { betList.ModelIssue.refreshOnCurrent(_liIssue); }
        } (this.ListItemsIssues[0]);
        setTimeout(func, 1);
        this.ListItemsIssues.length = 0;
        this.Container.Issue.innerHTML = "";
    },
    addIssues: function(_start, _count, _appendContainer) {
        ///<summary>添加期号倍数</summary>
        var _objBetIssue = this.Parent.ListBetIssue;
        for (var i = _start; i < _count + _start; i++) {
            if (_objBetIssue[i] == null) {///数量不足跳出
                break;
            }
            var issue = new TKCPCEO.Bet.Issues();
            issue.IssueNumber = _objBetIssue[i].Issue;
            issue.Multiply = 1;

            var liIssue = document.createElement("li");
            liIssue.issue = issue;

            var span1 = document.createElement("span");
            span1.className = "i1";
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.onclick = this.clickIssue.bind(this, liIssue);
            span1.appendChild(checkbox);

            var span2 = document.createElement("span");
            span2.className = "i2";
            span2.innerHTML = issue.IssueNumber;
            span2.title = "开奖时间：" + _objBetIssue[i].BonusDate;

            var span3 = document.createElement("span");
            span3.className = "i3";
            var mutiply = document.createElement("input");
            mutiply.type = "text";
            mutiply.value = issue.Multiply;
            mutiply.style.visibility = "hidden";
            mutiply.onfocus = function() { this.select(); }
            mutiply.onkeydown = this.TextBox_Event.keyDownIntOnly.bind(this.TextBox_Event);
            mutiply.onkeyup = this.TextBox_Event.keyUpIntOnly.bind(this.TextBox_Event, 1, 9999999);
            mutiply.onchange = this.TextBox_Event.keyChangeIntOnly.bind(this.TextBox_Event, 1, 9999999);
            if (Broswer.ie != "0") {
                mutiply.attachEvent("onkeyup", this.mutiplyChanged.bind(this, liIssue));
                mutiply.attachEvent("onchange", this.mutiplyChanged.bind(this, liIssue));
            } else {
                mutiply.addEventListener("keyup", this.mutiplyChanged.bind(this, liIssue), false);
                mutiply.addEventListener("change", this.mutiplyChanged.bind(this, liIssue), false);
            }
            span3.appendChild(mutiply);

            var span4 = document.createElement("span");
            span4.className = "i4";
            span4.innerHTML = "&nbsp;";
            span4.setAttribute("value", 0);

            var span5 = document.createElement("span");
            span5.className = "i5";
            span5.innerHTML = "&nbsp;";
            span5.setAttribute("value", 0);

            var span6 = document.createElement("span");
            span6.className = "i6";
            span6.innerHTML = "&nbsp;";

            var span7 = document.createElement("span");
            span7.className = "i7";
            span7.innerHTML = "&nbsp;";

            liIssue.checkbox = checkbox;
            liIssue.span2 = span2;
            liIssue.mutiply = mutiply;
            liIssue.currentCost = span4;
            liIssue.addCost = span5;
            liIssue.currentBouns = span6;
            liIssue.totalProfit = span7;

            liIssue.appendChild(span1);
            liIssue.appendChild(span2);
            liIssue.appendChild(span3);
            liIssue.appendChild(span4);
            liIssue.appendChild(span5);
            liIssue.appendChild(span6);
            liIssue.appendChild(span7);

            _appendContainer.appendChild(liIssue);
            this.ListItemsIssues.push(liIssue);

            liIssue.checkbox.checked = true;
            this.clickIssue(liIssue, true);
        }
    },
    createIssues: function(_createCount) {
        ///<summary>创建期号倍数项</summary>
        this.clearAll();
        var _objBetIssue = this.Parent.ListBetIssue;
        _createCount = _objBetIssue.length < _createCount ? _objBetIssue.length : _createCount;
        //        var oFragment = document.createDocumentFragment();

        var _startIndex = 0;
        for (var i = 0; i < this.Parent.ListBetIssue.length; i++) {
            if (this.Object.Select.value == this.Parent.ListBetIssue[i].Issue) {
                _startIndex = i;
                break;
            }
        }

        this.addIssues(_startIndex, _createCount, this.Container.Issue);
        var func = function(_liIssue) {
            return function() { betList.ModelIssue.refreshOnCurrent(_liIssue); }
        } (this.ListItemsIssues[0]);
        setTimeout(func, 1);
        //        this.Container.Issue.appendChild(oFragment);
        this.Object.CheckBox.checked = true;
        this.Object.CheckBox.onclick = function() {
            setTimeout(function() {
                betList.ModelIssue.clickCheckAllBox();
            }, 1);
        }
        GetCurrentBetIssueBack(this.Parent.ListIssueString, this.Parent.ListBetIssue[0].BonusDate.toString().split(" ")[1].split(":")[0] + ":" + this.Parent.ListBetIssue[0].BonusDate.toString().split(" ")[1].split(":")[1], true);
    },
    textInputValueChanged: function() {
        var ic = 1;
        try {
            ic = parseInt(this.Object.TextInput.value, 10);
        } catch (e) { ic = -1; }
        if (ic > 0) {
            this.createIssues(ic);
        }
    },
    bindTextInputEvent: function() {
        this.Object.TextInput.onkeydown = this.TextBox_Event.keyDownIntOnly.bind(this.TextBox_Event);
        this.Object.TextInput.onkeyup = this.TextBox_Event.keyUpIntOnly.bind(this.TextBox_Event, 1, this.Parent.ListBetIssue);
        this.Object.TextInput.onchange = this.TextBox_Event.keyChangeIntOnly.bind(this.TextBox_Event, 1, this.Parent.ListBetIssue);
        this.Object.TextInput.onfocus = this.Object.TextInput.select;
        function textChanged() {
            if (this.Object.TextInput.value == "1") {
                this.textInputValueChanged();
            }
        }
        if (Broswer.ie != "0") {
            this.Object.TextInput.attachEvent("onkeyup", this.textInputValueChanged.bind(this));
            this.Object.TextInput.attachEvent("onchange", textChanged.bind(this));
        } else {
            this.Object.TextInput.addEventListener("keyup", this.textInputValueChanged.bind(this), false);
            this.Object.TextInput.addEventListener("change", textChanged.bind(this), false);
        }
        this.Object.Select.onchange = this.textInputValueChanged.bind(this);
    },
    tongbu: function() {
        this.ListItemsIssues[0].mutiply.value = this.Object.ObjectMultiple0.value;
        this.mutiplyChanged(this.ListItemsIssues[0]);
    },
    cnnEvent: function() {
        if (this.Object.cnn.checked) {
            $("ContainerMultipleMost").style.display = "";
            $("ContainerMultipleSimple").style.display = "none";
        } else {
            var tempMultiple = this.ListItemsIssues[0].mutiply.value;
            this.Object.Select.options[0].selected = true;
            this.textInputValueChanged();
            this.createIssues(1);
            this.Object.ObjectMultiple0.value = tempMultiple;
            this.tongbu();
            $("ContainerMultipleMost").style.display = "none";
            $("ContainerMultipleSimple").style.display = "";
            $("MenuMutiply1").click();
        }
        Cookie.setCookie("bet" + betList.JsonCmdProject.LotteryType.toString() + "_issue", this.Object.cnn.checked.toString());
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.Container.Wrap == null || this.Container.Issue == null || this.Object.TextInput == null || this.Object.CheckBox == null || this.Parent == null) {
            alert("未初始化");
            return;
        }
        SetCurrentSelectIssue(this.Parent.ListBetIssue, this.Object.Select);
        this.createIssues(1);
        this.bindTextInputEvent();

        this.Object.ObjectMultiple0 = $("ObjectMultiple0");
        this.Object.ObjectMultiple0.onkeydown = this.TextBox_Event.keyDownIntOnly.bind(this.TextBox_Event);
        this.Object.ObjectMultiple0.onkeyup = this.TextBox_Event.keyUpIntOnly.bind(this.TextBox_Event, 1, this.Parent.ListBetIssue);
        this.Object.ObjectMultiple0.onchange = this.tongbu.bind(this);
        this.Object.ObjectMultiple0.onfocus = function() { this.select(); };
        if (Broswer.ie != "0") {
            this.Object.ObjectMultiple0.attachEvent("onkeyup", this.tongbu.bind(this));
        } else {
            this.Object.ObjectMultiple0.addEventListener("keyup", this.tongbu.bind(this), false);
        }

        this.Object.cnn = $("cnn");
        var cookieConfig = Cookie.getCookie("bet" + betList.JsonCmdProject.LotteryType.toString() + "_issue");
        if (cookieConfig != null) {
            this.Object.cnn.checked = cookieConfig == "true";
        }
        this.Object.cnn.onclick = this.cnnEvent.bind(this);
        this.cnnEvent();
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.Container.Wrap = null;
        this.Container.Menu = null;
        this.Container.Issue = null;
        this.Object.TextInput = null;
        this.Object.CheckBox = null;
        this.ListIssueMutiply = [];
        this.ListIssues = [];
        this.ListItemsIssues = [];
        this.TextBox_Event = new TextBox_Event();
        this.IsChase = true;
        this.ChaseChanged = false;
        this.CostMoney = 0;
    }
}

TKCPCEO.Lottery.FCCQSSC.BetList.Mutiply = function() {
    ///<summary>倍投工具相关设置</summary>
    ///<field name="Container">容器对象集合</field>
    ///<field name="Container.Wrap">外部容器对象</field>
    ///<field name="Parent">BetList实例对象</field>
    ///<field name="ListIssues">TKCPCEO.Bet.Issues集合</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.BetList.Mutiply.prototype = {
    Container: {
        Wrap: null,
        Issue: null
    },
    Object: {
        Select: null,
        TextInput: null,
        StartMutiply: null,
        AllIssueCount: null,
        AllProfitsRate: null,
        AllProfitsMoney: null,
        SplitIssueCount2: null,
        SplitIssueCount4: null,
        ForepartProfitsRate: null,
        AfterpartProfitsRate: null,
        ForepartProfitsMoney: null,
        AfterpartProfitsMoney: null
    },
    Parent: null,
    ListIssues: new Array(),
    ListParentAllIssues: new Array(),
    ModelTool: new TKCPCEO.Lottery.Speed.SerialBetTool(),
    IsChase: true,
    IsChase2: true,
    TextBox_Event: new TextBox_Event(),
    CostMoney: 0,
    setProjectType: function(_radioValue) {
        ///<summary>设置倍投工具方案类型</summary>
        this.ModelTool.ProjectType = parseInt(_radioValue, 10);
    },
    createList: function() {
        ///<summary>生成投资计划表</summary>
        var inputs = document.getElementsByName("ObjectMutiplayRadioType");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].checked == true) {
                this.ModelTool.ProjectType = parseInt(inputs[i].value, 10);
                break;
            }
        }
        this.ListIssues = [];
        this.ModelTool.TicketBuyMoney = this.Parent.TotalBetMoney;
        this.ModelTool.OriginalMultiple = parseInt(this.Object.StartMutiply.value, 10);
        this.ModelTool.BonusMoney = this.Parent.BonusMoney;
        this.ModelTool.AllProfitsRate = parseFloat(this.Object.AllProfitsRate.value, 10) / 100;
        this.ModelTool.AllProfitsMoney = parseInt(this.Object.AllProfitsMoney.value, 10);
        this.ModelTool.AllIssueCount = parseInt(this.Object.TextInput.value, 10);
        this.ModelTool.SplitIssueCount = this.ModelTool.ProjectType == 2 ? parseInt(this.Object.SplitIssueCount2.value, 10) : parseInt(this.Object.SplitIssueCount4.value, 10);
        this.ModelTool.ForepartProfitsRate = parseFloat(this.Object.ForepartProfitsRate.value, 10) / 100;
        this.ModelTool.AfterpartProfitsRate = parseFloat(this.Object.AfterpartProfitsRate.value, 10) / 100;
        this.ModelTool.ForepartProfitsMoney = parseInt(this.Object.ForepartProfitsMoney.value, 10);
        this.ModelTool.AfterpartProfitsMoney = parseInt(this.Object.AfterpartProfitsMoney.value, 10);

        var listResult = [new TKCPCEO.Lottery.Speed.SerialBetModel()];
        listResult = this.ModelTool.Count();
        var html = "";
        if (listResult != null) {
            var sIssueIndex = this.ListParentAllIssues.indexOf(this.Object.Select.value);
            for (var i = 0; i < listResult.length; i++) {
                var iIssue = this.ListParentAllIssues[sIssueIndex + i];
                html += "<li><span class=\"i1\">" + iIssue + "</span><span class=\"i2\">" + listResult[i].Multiple + "</span><span class=\"i3\">" + listResult[i].CurrentBuyMoney + "</span><span class=\"i4\">" + listResult[i].AllBuyMoney + "</span><span class=\"i5\">" + listResult[i].BonusMoney + "</span><span class=\"i6\">" + listResult[i].ProfitsMoney + "</span><span class=\"i7\">" + parseInt(listResult[i].ProfitsRate * 100, 10) + "%</span></li>";
                var mIssue = new TKCPCEO.Bet.Issues();
                mIssue.IssueNumber = iIssue;
                mIssue.Multiply = listResult[i].Multiple;
                this.ListIssues.push(mIssue);
                if (i == listResult.length - 1) {
                    this.CostMoney = listResult[i].AllBuyMoney;
                }
            }
        } else {
            if (this.Object.cnn.checked && betList.IsMutiplyTool) {
                alert(this.ModelTool.ErrorMessage);
            }
        }
        this.Container.Issue.innerHTML = html;
        this.Parent.updateTotalInfo();
    },
    bindEvent: function() {
        ///<summary>绑定事件</summayr>
        this.Object.AllIssueCount.onkeydown = this.TextBox_Event.keyDownIntOnly.bind(this.TextBox_Event);
        this.Object.AllIssueCount.onkeyup = this.TextBox_Event.keyUpIntOnly.bind(this.TextBox_Event, 1, 500);
        this.Object.AllIssueCount.onchange = this.TextBox_Event.keyChangeIntOnly.bind(this.TextBox_Event, 1, 500);

        this.Object.AllIssueCount.onfocus = this.Object.AllIssueCount.select;
        this.Object.AllProfitsRate.onfocus = this.Object.AllIssueCount.select;

        this.Object.AllProfitsRate.onkeydown = this.TextBox_Event.keyDownIntOnly.bind(this.TextBox_Event);
        this.Object.AllProfitsRate.onkeyup = this.TextBox_Event.keyUpIntOnly.bind(this.TextBox_Event, 1, 9999999);
        this.Object.AllProfitsRate.onchange = this.TextBox_Event.keyUpIntOnly.bind(this.TextBox_Event, 1, 9999999);
    },
    clearAll: function() {
        ///<summary>归零复位</summary>
        this.Container.Issue.innerHTML = "";
        this.ListIssues = [];
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.Container.Wrap == null || this.Parent == null) {
            alert("未初始化");
            return;
        }
        SetCurrentSelectIssue(this.Parent.ListBetIssue, this.Object.Select, this.ListParentAllIssues);
        this.setProjectType(1);

        this.bindEvent();
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.Container.Wrap = null;
        this.ListIssues = [];
        this.ModelTool = new TKCPCEO.Lottery.Speed.SerialBetTool();
        this.Object.AllIssueCount = null;
        this.Object.AllProfitsRate = null;
        this.Object.AllProfitsMoney = null;
        this.Object.SplitIssueCount2 = null;
        this.Object.SplitIssueCount4 = null;
        this.Object.ForepartProfitsRate = null;
        this.Object.AfterpartProfitsRate = null;
        this.Object.ForepartProfitsMoney = null;
        this.Object.AfterpartProfitsMoney = null;
        this.TextBox_Event = new TextBox_Event();
        this.CostMoney = 0;
    }
}

TKCPCEO.Lottery.FCCQSSC.BetList.prototype = {
    ContainerWrap: null,
    JsonCmdProject: new TKCPCEO.Bet.JsonCmdProject(),
    TotalBetMoney: 0,
    PerMoney: 2,
    IndexCount: 0,
    ListItems: new Array(),
    ObjEmptyItem: null,
    ObjShowBetListCount: null,
    ObjBetListDelete: null,

    IsMutiplyTool: false,
    EnableComputeMoney: false,
    BonusMoney: 0,
    ModelIssue: new TKCPCEO.Lottery.FCCQSSC.BetList.Issue(),
    ModelMutiply: new TKCPCEO.Lottery.FCCQSSC.BetList.Mutiply(),
    CurrentIssue: "",

    ContainerChase: null,
    ObjectChase: null,
    ObjectChase2: null,

    ListBetIssue: new Array(),
    ListBonusMoney: new Array(),

    CommonSpeedInfo: {
        DateTime_StartTime: "",
        Seconds_BetEndTime: 0,
        Minutes_IntervalTime: 0,
        Count_EveryDay: 0,
        SplitString_Issue: ""
    },

    ChaseChanged: function(_obj) {
        ///<summary>追号停止点击事件</summary>
        if (this.IsMutiplyTool == true) {
            if (_obj == this.ObjectChase2 && this.ObjectChase2.checked == true) {
                this.ObjectChase.checked = this.ObjectChase2.checked;
            }
            else if (_obj == this.ObjectChase && this.ObjectChase.checked == false) {
                this.ObjectChase2.checked = this.ObjectChase.checked;
            }
            this.ModelMutiply.IsChase = this.ObjectChase.checked;
            this.ModelMutiply.IsChase2 = this.ObjectChase2.checked;
        } else {
            if (_obj == this.ObjectChase2 && this.ObjectChase2.checked == true) {
                this.ObjectChase.checked = this.ObjectChase2.checked;
            }
            else if (_obj == this.ObjectChase && this.ObjectChase.checked == false) {
                this.ObjectChase2.checked = this.ObjectChase.checked;
            }
            this.ModelIssue.IsChase = this.ObjectChase.checked;
            this.ModelIssue.IsChase2 = this.ObjectChase2.checked;
            this.ModelIssue.ChaseChanged = true;
        }
        this.JsonCmdProject.BonusStop = this.ObjectChase.checked;
        this.JsonCmdProject.ShouldBonusStop = this.ObjectChase2.checked;
    },
    updateTotalInfo: function() {
        ///<summary>更新总信息</summary>
        this.JsonCmdProject.TotalMoney = this.IsMutiplyTool == true ? this.ModelMutiply.CostMoney : this.ModelIssue.CostMoney;
        $("ObjectBetCount").innerHTML = this.JsonCmdProject.TotalBetCount;
        $("ObjectIssueCount").innerHTML = this.IsMutiplyTool == true ? this.ModelMutiply.ListIssues.length : this.ModelIssue.ListIssues.length;
        $("ObjectBetMoney").innerHTML = this.JsonCmdProject.TotalMoney.toString().toMoney();

        $("ObjectBetCount0").innerHTML = $("ObjectBetCount").innerHTML;
        $("ObjectBetMoney0").innerHTML = $("ObjectBetMoney").innerHTML;
    },
    getBonusTime: function(_issue) {
        ///<summary>根据期号数获取开奖时间</summary>
        ///<param name="_issueIndex">当天的前天期号(整型)</param>
        ///<param name="_issueDate">当天的前天期号日期</param>
        var year = _issue.toString().substr(0, 4);
        var month = _issue.toString().substr(4, 2);
        var day = _issue.toString().substr(6, 2);
        var hour = this.CommonSpeedInfo.DateTime_StartTime.split(":")[0];
        var minute = this.CommonSpeedInfo.DateTime_StartTime.split(":")[1];
        var second = this.CommonSpeedInfo.DateTime_StartTime.split(":")[2];
        var firstBounsTime = new Date(year, month - 1, day, hour, minute, second);

        var issueIndex = parseInt(_issue.split("-")[1], 10);

        var bonusTime = "";
        if (issueIndex < 24) {
            bonusTime = new Date(year, month - 1, day, 0, 5, 0).addMinutes((issueIndex - 1) * 5);
        } else if (issueIndex < 97) {
            bonusTime = new Date(year, month - 1, day, 10, 0, 0).addMinutes((issueIndex - 24) * 10);
        } else {
            bonusTime = new Date(year, month - 1, day, 22, 5, 0).addMinutes((issueIndex - 97) * 5);
        }
        var betEndTime = bonusTime.addMinutes(-1 * this.CommonSpeedInfo.Seconds_BetEndTime / 60);
        return [betEndTime.toStandardString("yyyy-MM-dd hh:mm:ss"), bonusTime.toStandardString("yyyy-MM-dd hh:mm:ss")];
    },
    setCurrentIssue: function(_listBetIssue, _justUpdateContainer) {
        ///<summary>设置期号倍数当前可投注期号并删除已过期的期号</summary>
        ///<param name="_listBetIssue">当前可投注期号列表</param>
        if (_justUpdateContainer != true) {
            this.ListIssueString = _listBetIssue;
            var tmpListBetIssue = new Array();
            for (var i = 0; i < _listBetIssue.length; i++) {
                var objectIssue = this.getBonusTime(_listBetIssue[i]);
                tmpListBetIssue.push({ Issue: _listBetIssue[i], BetEndDate: objectIssue[0], BonusDate: objectIssue[1] });
            }
            this.CurrentIssue = tmpListBetIssue[0].Issue;

            this.ListBetIssue = tmpListBetIssue;

            var curIssueListIndex = -1;
            var isCheckIssue = false; ///第一期是否选中
            var curMutiply = 1;
            var beDeletedCount = 0;
            for (var i = 0; i < this.ModelIssue.ListItemsIssues.length; i++) {
                if (this.ModelIssue.ListItemsIssues[i].issue.IssueNumber == tmpListBetIssue[0].Issue) {///查找当前期号集中的当前期在当前列表中的位置
                    curIssueListIndex = i;
                    break;
                }
            }
            var issueSelectedIndex = this.ModelIssue.Object.Select.selectedIndex;
            var issueSelectedValue = this.ModelIssue.Object.Select.value;
            if (curIssueListIndex == -1 && this.ModelIssue.ListItemsIssues[0].issue.IssueNumber < tmpListBetIssue[0].Issue) {
                this.ModelIssue.addIssues(0 + issueSelectedIndex, this.ModelIssue.ListItemsIssues.length, this.ModelIssue.Container.Issue);
                curIssueListIndex = this.ModelIssue.ListItemsIssues.length / 2;
                for (var i = this.ModelIssue.ListItemsIssues.length - 1; i >= 0; i--) {
                    if (i >= curIssueListIndex) {
                        this.ModelIssue.ListItemsIssues[i].checkbox.checked = this.ModelIssue.ListItemsIssues[i - curIssueListIndex].checkbox.checked;
                        this.ModelIssue.clickIssue(this.ModelIssue.ListItemsIssues[i], true);
                        this.ModelIssue.ListItemsIssues[i].mutiply.value = this.ModelIssue.ListItemsIssues[i - curIssueListIndex].mutiply.value;
                    } else {
                        this.ModelIssue.ListItemsIssues[i].checkbox.checked = false;
                        this.ModelIssue.clickIssue(this.ModelIssue.ListItemsIssues[i], true);
                        this.ModelIssue.Container.Issue.removeChild(this.ModelIssue.ListItemsIssues[i]);
                        this.ModelIssue.ListItemsIssues.removeAt(i);
                    }
                }
                this.ModelIssue.refreshOnCurrent(this.ModelIssue.ListItemsIssues[0]);
            } else if (curIssueListIndex > 0) {///需要删除列表，并补位
                this.ModelIssue.addIssues(this.ModelIssue.ListItemsIssues.length - curIssueListIndex, curIssueListIndex + issueSelectedIndex, this.ModelIssue.Container.Issue);
                for (var i = this.ModelIssue.ListItemsIssues.length - 1; i >= 0; i--) {
                    if (i >= curIssueListIndex + issueSelectedIndex) {
                        this.ModelIssue.ListItemsIssues[i].checkbox.checked = this.ModelIssue.ListItemsIssues[i - curIssueListIndex].checkbox.checked;
                        this.ModelIssue.clickIssue(this.ModelIssue.ListItemsIssues[i], true);
                        this.ModelIssue.ListItemsIssues[i].mutiply.value = this.ModelIssue.ListItemsIssues[i - curIssueListIndex].mutiply.value;
                    } else {
                        this.ModelIssue.ListItemsIssues[i].checkbox.checked = false;
                        this.ModelIssue.clickIssue(this.ModelIssue.ListItemsIssues[i], true);
                        this.ModelIssue.Container.Issue.removeChild(this.ModelIssue.ListItemsIssues[i]);
                        this.ModelIssue.ListItemsIssues.removeAt(i);
                    }
                }
                this.ModelIssue.refreshOnCurrent(this.ModelIssue.ListItemsIssues[0]);
            }

            SetCurrentSelectIssue(tmpListBetIssue, this.ModelIssue.Object.Select);
            var multiplySelectIndex = this.ModelMutiply.Object.Select.selectedIndex;
            var multiplySelectValue = this.ModelMutiply.Object.Select.options[this.ModelMutiply.Object.Select.selectedIndex].value;
            SetCurrentSelectIssue(tmpListBetIssue, this.ModelMutiply.Object.Select, this.ModelMutiply.ListParentAllIssues);
            if (curIssueListIndex > 0) {
                this.ModelIssue.Object.Select.options[issueSelectedIndex].selected = true;
            } else {
                this.ModelIssue.Object.Select.value = issueSelectedValue;
            }
            //            SetCurrentSelectIssue(this.ModelMutiply.ListParentAllIssues, this.ModelMutiply.Object.Select, this.ModelMutiply.ListParentAllIssues);
            //            this.EnableComputeMoney = false;
            //            this.setMutiplyIssueType(false, $("MenuMutiply1"), $("MenuMutiply2"));
            //            $("MenuIssue2").disabled = true;
            if (multiplySelectIndex == 0) {
                this.ModelMutiply.createList();
            } else {
                this.ModelMutiply.Object.Select.value = multiplySelectValue;
            }
            //删除已过期的期号
        }
        if (this.ModelIssue.ListItemsIssues[0].issue.IssueNumber == _listBetIssue[0]) {
            this.ModelIssue.ListItemsIssues[0].span2.innerHTML = this.ModelIssue.ListItemsIssues[0].issue.IssueNumber.substr(9) + "(当前期)";
            //            this.ModelIssue.ListItemsIssues[0].span2.style.cssText = "color:#f00;font-weight:bold;";
            //            this.ModelIssue.ListItemsIssues[0].span2.title = "当前期-" + this.ModelIssue.ListItemsIssues[0].span2.title;
            this.ModelIssue.Current.Issue = this.ModelIssue.ListItemsIssues[0];
        } else {
            this.ModelIssue.Current.Issue = null;
        }
        $("CountIssue1").innerHTML = this.ListBetIssue.length;
        $("CountIssue2").innerHTML = this.ListBetIssue.length;
        try {
            this.ModelIssue.mutiplyChanged(this.ModelIssue.ListItemsIssues[0]);
        } catch (e) { }
    },
    checkComputeEnabled: function() {
        ///<summary>检测是否可以计算奖金相关信息</summary>
        var obj = checkComputeEnabledByLottery(thisLotteryType, this.JsonCmdProject.TicketList);
        this.EnableComputeMoney = obj.EnableComputeMoney;
        this.BonusMoney = obj.BonusMoney;
    },
    chaseDispaly: function() {
        ///<summary>追号部分显示隐藏方法</summary>
        if (this.ModelIssue.ListIssues.length > 1 || (this.ModelIssue.ListIssues.length > 0 && !(this.ModelIssue.ListIssues.length == 1 && this.ModelIssue.ListIssues[0].IssueNumber == this.CurrentIssue))) {
            this.ContainerChase.style.display = "";
            if (this.ModelIssue.ListIssues.length > 1) {
                this.ObjectChase.parentNode.style.display = "";
            } else {
                this.ObjectChase.parentNode.style.display = "none";
            }
            if (this.ModelIssue.ListIssues.length > 0 && !(this.ModelIssue.ListIssues.length == 1 && this.ModelIssue.ListIssues[0].IssueNumber == this.CurrentIssue)) {
                this.ObjectChase2.parentNode.style.display = "";
            } else {
                this.ObjectChase2.parentNode.style.display = "none";
            }
            if (this.ModelIssue.ListIssues.length > 1 && this.ModelIssue.ListIssues.length > 0 && !(this.ModelIssue.ListIssues.length == 1 && this.ModelIssue.ListIssues[0].IssueNumber == this.CurrentIssue)) {
                this.ContainerChase.getElementsByTagName("span")[0].style.marginTop = "15px";
            } else {
                this.ContainerChase.getElementsByTagName("span")[0].style.marginTop = "0px";
            }
        } else {
            this.ContainerChase.style.display = "none";
        }
    },
    setMutiplyIssueType: function(_isMutiplyTool, _radio, _radio2) {
        ///<summary>设置自定义/倍投工具</summary>
        ///<param name="_isMutiplyTool">是否启用倍投工具</param>
        ///<param name="_radio">所点击的单选按钮</param>
        ///<param name="_radio2">与所点击的单选按钮name相同的另一个按钮</param>    
        this.IsMutiplyTool = _isMutiplyTool;
        if (this.IsMutiplyTool == true) {
            this.ModelIssue.Container.Wrap.style.display = "none";
            this.ModelMutiply.Container.Wrap.style.display = "";
            this.ContainerChase.style.display = "";
            this.ObjectChase.checked = this.ModelMutiply.IsChase;
            this.JsonCmdProject.BonusStop = this.ObjectChase.checked;
            this.ObjectChase2.checked = this.ModelMutiply.IsChase2;
            this.JsonCmdProject.ShouldBonusStop = this.ObjectChase2.checked;
        } else {
            this.ModelIssue.Container.Wrap.style.display = "";
            this.ModelMutiply.Container.Wrap.style.display = "none";
            this.chaseDispaly();
            this.ObjectChase.checked = this.ModelIssue.IsChase;
            this.JsonCmdProject.BonusStop = this.ObjectChase.checked;
            this.ObjectChase2.checked = this.ModelIssue.IsChase2;
            this.JsonCmdProject.ShouldBonusStop = this.ObjectChase2.checked;
        }

        if (_radio != null && _radio2 != null) {
            _radio.checked = false;
            _radio2.checked = true;
        }
        this.updateTotalInfo();
    },
    itemChanged: function(_isAdd, _li, _noUpdate) {
        ///<summary>投注项变化时触发</summary>
        ///<param name="_isAdd">投注项变化状态，1:添加;2:删除</param>
        ///<param name="_li">变化的投注项对象</param>
        switch (_isAdd) {
            case 1: ///添加
                this.JsonCmdProject.TicketList.push(_li.ticket);
                this.JsonCmdProject.TotalBetCount += _li.betCount;
                this.TotalBetMoney += _li.betCount * this.PerMoney;
                break;
            case -1: ///删除
                this.JsonCmdProject.TicketList.remove(_li.ticket);
                this.JsonCmdProject.TotalBetCount -= _li.betCount;
                this.TotalBetMoney -= _li.betCount * this.PerMoney;
                break;
        }
        this.checkComputeEnabled();
        if (this.EnableComputeMoney == false) {
            this.setMutiplyIssueType(false, $("MenuMutiply1"), $("MenuMutiply2"));
            $("MenuIssue2").disabled = true;
            this.ModelMutiply.clearAll();
            $("MenuIssue2").parentNode.className = null;
            $("MenuIssue2").parentNode.onclick = function() { alert(this.getAttribute("toolTip")); }
        } else {
            $("MenuIssue2").disabled = false;
            $("MenuIssue2").parentNode.className = "active";
            $("MenuIssue2").parentNode.onclick = null;
        }
        if (_noUpdate != true) {
            setTimeout(function() {
                betList.ModelIssue.refresh();
                betList.updateTotalInfo();
            }, 1);
        }
        this.ObjShowBetListCount.innerHTML = this.ListItems.length.toString();
        var minIndex = 9;
        var indexAry = [];
        for (var i = 0; i < this.JsonCmdProject.TicketList.length; i++) {
            switch (this.JsonCmdProject.TicketList[i].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5TongXuan:
                    minIndex = 2;
                    indexAry.push(2);
                    indexAry.push(3);
                    indexAry.push(5);
                    break;
            }
        }
        if (minIndex < 9) {
            containerBonusStop.style.display = "";
            containerShouldBonusStop.style.display = "";
            var isBonusChoosed = false;
            var isShouldBonusChoosed = false;
            for (var i = 2; i <= 5; i++) {
                if (bonusStopAry[i] == null) { continue; };
                bonusStopAry[i].style.display = indexAry.exists(i) ? "" : "none";
                labelBonusStopAry[i].style.display = bonusStopAry[i].style.display;
                shouldBonusStopAry[i].style.display = bonusStopAry[i].style.display;
                labelShouldBonusStopAry[i].style.display = shouldBonusStopAry[i].style.display;
                if (indexAry.exists(i)) {
                    if (!isBonusChoosed && bonusStopAry[i].checked) {
                        isBonusChoosed = true;
                    }
                    if (!isShouldBonusChoosed && shouldBonusStopAry[i].checked) {
                        isShouldBonusChoosed = true;
                    }
                }
            }
            if (!isBonusChoosed) {
                bonusStopAry[minIndex].checked = true;
            }
            if (!isShouldBonusChoosed) {
                shouldBonusStopAry[minIndex].checked = true;
            }
        } else {
            containerBonusStop.style.display = "none";
            containerShouldBonusStop.style.display = "none";
        }
    },
    delItem: function(_item) {
        ///<summary>删除投注项</summary>
        ///<param name="_item">需要删除的投注项</param>
        this.ListItems.remove(_item);
        this.itemChanged(-1, _item);
        this.ContainerWrap.removeChild(_item);
        if (this.ListItems.length == 0) {
            this.ObjEmptyItem.style.display = "";
        }
    },
    delAllItem: function() {
        ///<summary></summary>
        var allCount = this.ListItems.length;
        for (var i = 0; i < allCount; i++) {
            this.delItem(this.ListItems[0], i == allCount - 1);
        }
    },
    addItem: function(_betMethod, _playType, _bouns, _clientBouns, _betCount) {
        ///<summary>增加投注项</summary>
        ///<param name="_betMethod">选号方式</param>
        ///<param name="_playType">玩法值</param>
        ///<param name="_bouns">投注号码</param>
        ///<param name="_clientBouns">客户端显示投注号码</param>
        ///<param name="_betCount">投注注数</param>
        var ticket = new TKCPCEO.Bet.Tickets();
        ticket.AnteCode = _bouns;
        ticket.BetMethod = _betMethod;
        ticket.PlayType = _playType;
        ticket.Money = parseInt(_betCount, 10) * this.PerMoney;

        this.IndexCount += 1;
        var oFragment = document.createDocumentFragment();
        var li = document.createElement("li");
        li.ticket = ticket;
        li.betCount = parseInt(_betCount, 10);

        var span1 = document.createElement("span");
        span1.className = "c1";
        //        span1.appendChild(document.createTextNode(this.IndexCount.toString() + "." + BetMenu.CurrentObj.Menu.getAttribute("ptcn")));
        span1.appendChild(document.createTextNode(this.IndexCount.toString() + "." + TKCPCEO.Enum.prototype.getChn(ticket.PlayType, ticket.AnteCode)));

        var span2 = document.createElement("span");
        span2.className = "c2";
        span2.appendChild(document.createTextNode(_clientBouns));

        var span3 = document.createElement("span");
        span3.className = "c3";
        span3.appendChild(document.createTextNode(_betCount + "注"));

        var span4 = document.createElement("span");
        span4.className = "c4";
        span4.appendChild(document.createTextNode(ticket.Money.toString().toMoney()));

        var span5 = document.createElement("span");
        span5.className = "c5";
        span5.appendChild(document.createTextNode("×"));
        span5.title = "删除";
        span5.onclick = this.delItem.bind(this, li);

        li.appendChild(span1);
        li.appendChild(span2);
        li.appendChild(span3);
        li.appendChild(span4);
        li.appendChild(span5);
        oFragment.appendChild(li);
        if (this.ListItems.length > 0) {
            this.ContainerWrap.insertBefore(oFragment, this.ListItems[this.ListItems.length - 1]);
        } else {
            this.ContainerWrap.appendChild(oFragment);
        }
        this.ListItems.push(li);
        this.ObjEmptyItem.style.display = "none";

        this.itemChanged(1, li);
    },
    initBetIssue: function() {
        ///<summary>初始化可投注期数</summary>
        function ObjectBetIssue() {
            ///<summary>投注期号对象</summary>
            ///<field name="Issue">期号</field>
            ///<field name="BetEndDate">投注截至时间</field>
            ///<field name="BonusDate">开奖时间</field>
            this.construct.apply(this, arguments);
            this.construct.bind(this);
        }
        ObjectBetIssue.prototype = {
            Issue: "",
            BetEndDate: "",
            BonusDate: "",
            construct: function() {
                ///<summary>构造函数</summary>
                this.Issue = "";
                this.BetEndDate = "";
                this.BonusDate = "";
            }
        }

        var bonusTime = "";
        this.ListIssueString = this.CommonSpeedInfo.SplitString_Issue.split(",");
        for (var i = 0; i < this.ListIssueString.length; i++) {
            var tempObj = this.getBonusTime(this.ListIssueString[i]);
            var obi = new ObjectBetIssue();
            obi.Issue = this.ListIssueString[i];
            obi.BetEndDate = tempObj[0].toString();
            obi.BonusDate = tempObj[1].toString();
            this.ListBetIssue.push(obi);
            if (i == 0) {
                this.CurrentIssue = obi.Issue;
                bonusTime = obi.BonusDate;
            }
        }

        this.ModelIssue.initialize();
        this.ModelMutiply.initialize();
        //        this.setCurrentIssue(this.CurrentIssue);
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.ContainerWrap == null || this.CommonSpeedInfo.Count_EveryDay == 0 || this.ContainerChase == null || this.ObjectChase == null) {
            alert("请先配置相关信息");
            return;
        }
        this.ObjEmptyItem = document.createElement("li");
        this.ObjEmptyItem.className = "empty";
        this.ObjEmptyItem.appendChild(document.createTextNode("暂无投注项"));
        this.ContainerWrap.appendChild(this.ObjEmptyItem);
        this.ObjBetListDelete.onclick = this.delAllItem.bind(this);

        this.initBetIssue();
    },
    clearAll: function() {
        ///<summary>全部复位</summary>
        var tmpLen = this.ListItems.length;
        for (var i = 0; i < tmpLen; i++) {
            this.delItem(this.ListItems[0]);
        }
        this.ModelIssue.clearAll();
        this.ModelMutiply.clearAll();
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.ContainerWrap = null;
        this.JsonCmdProject = new TKCPCEO.Bet.JsonCmdProject();
        this.JsonCmdProject.LotteryType = thisLotteryType;
        this.JsonCmdProject.ProScheme = TKCPCEO.Enum.prototype.Lottery.Lottery.ProjectType.BetSelf;
        this.TotalBetMoney = 0;
        this.PerMoney = 2;
        this.IndexCount = 0;
        this.ListItems = [];

        this.IsMutiplyTool = false;
        this.EnableComputeMoney = false;
        this.BonusMoney = 0;
        this.ModelIssue = new TKCPCEO.Lottery.FCCQSSC.BetList.Issue();
        this.ModelMutiply = new TKCPCEO.Lottery.FCCQSSC.BetList.Mutiply();

        this.ListBetIssue = [];
        this.ListBonusMoney = [];

        this.ContainerChase = null;
        this.ObjectChase = null;
    }
}

TKCPCEO.Lottery.FCCQSSC.ActionList = function() {
    ///<summary>时实投注/开奖列表信息</summary>
    ///<field name="Container.Menu">菜单容器对象</field>
    ///<field name="Container.BonusHead">近期开奖Head容器对象</field>
    ///<field name="Container.BonusUl">近期开奖内容容器对象</field>
    ///<field name="Container.BetRecordHead">投注记录Head容器对象</field>
    ///<field name="Container.BetRecordUl">投注记录内容容器对象</field>
    ///<field name="ListMenuLis">菜单Li列表数组</field>
    ///<field name="Time.Out">待兑奖切换到当期超时时间</field>
    ///<field name="Time.Auto">待兑奖切换到当期自动时间</field>
    ///<field name="Current.Issue">当期开奖标签对象</field>
    ///<field name="Current.LastIssue">待兑奖期开奖标签对象</field>
    ///<field name="Current.Label">当前打开标签对象</field>
    ///<field name="ClassName.CurrentIssue">当前期号标签样式</field>
    ///<field name="ClassName.CurrentLabelOld">当前选中标签原始样式</field>
    ///<field name="Object.Ticket.ListRecord">List<List<Ticket>></field>
    ///<field name="Object.Ticket.ListIssue">[12,13,14,15,16]</field>
    ///<field name="Object.Ticket.IssueIndex">当前奖期期号索引</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.ActionList.prototype = {
    Container: {
        Menu: null,
        BonusHead: null,
        BonusUl: null,
        BetRecordHead: null,
        BetRecordUl1: null,
        BetRecordUl2: null,
        BetRecordUl3: null,
        BetRecordUl4: null,
        BetRecordUl5: null
    },
    RefreshCurrent: false,
    RefreshLast: false,
    ListMenuLis: new Array(),
    ListMutilplyArgument: new Array(),
    Time: {
        Out: 300,
        Auto: 30
    },
    Current: {
        Issue: null,
        LastIssue: null,
        Label: null,
        ObjectMutilplyArgument: null,
        CaseNo: ""
    },
    ClassName: {
        CurrentIssue: "imp",
        CurrentLabelOld: "",
        NewestCaseNo_Current: "thisNew",
        NewestCaseNo_Other: "othersNew"
    },
    Object: {
        ListBonus: new Array(),
        Ticket: {
            ListRecord: new Array(),
            ListIssue: new Array(),
            IssueIndex: 0
        }
    },
    setCurrentLabel: function(_Label) {
        ///<summary>设置当前标签</summary>
        if (_Label == this.ListMenuLis[0]) {
            this.Container.BonusHead.style.display = "";
            this.Container.BetRecordHead.style.display = "none";
            $("MoreTrend").style.display = "";
            $("MoreBetRecord").style.display = "none";
        } else {
            this.Container.BonusHead.style.display = "none";
            this.Container.BetRecordHead.style.display = "";
            $("MoreTrend").style.display = "none";
            $("MoreBetRecord").style.display = "";
        }
        if (this.Current.Label != null) {
            this.Current.Label.className = this.Current.Label == this.Current.Issue ? this.ClassName.CurrentLabelOld + " " + this.ClassName.CurrentIssue : this.ClassName.CurrentLabelOld;
            this.Current.Label.contentBody.style.display = "none";
        }
        this.Current.Label = _Label;
        this.ClassName.CurrentLabelOld = this.Current.Issue == this.Current.Label ? this.Current.Label.className.replace(this.ClassName.CurrentIssue, "") : this.Current.Label.className;
        this.Current.Label.className = this.ClassName.CurrentLabelOld + " active";
        this.Current.Label.contentBody.style.display = "";
    },
    setCurrentIssue: function(_Issue) {
        ///<summary>设置当前信息期号</summary>
        //        if (this.Current.Issue != _Issue) {
        if (this.Current.Issue != null) {
            this.Current.Issue.className = this.Current.Issue == this.Current.Label ? "active" : "";
            this.Current.Issue.contentBody.style.backgroundColor = "#ddd";
            this.Current.Issue.innerHTML = "<span>" + this.Current.Issue.issue.toString().split("-")[1] + "</span>";
        }
        this.Current.Issue = _Issue;
        this.Current.Issue.className = this.Current.Issue == this.Current.Label ? "active" + this.ClassName.CurrentIssue : this.ClassName.CurrentIssue;
        this.Current.Issue.contentBody.style.backgroundColor = "#EBAB00";
        this.Current.Issue.innerHTML = "<span>" + this.Current.Issue.issue.toString().split("-")[1] + "(当前期)" + "</span>";
        //        }
        if (this.ListMenuLis[1] != this.Current.Issue) {
            for (var i = 1; i < this.ListMenuLis.length; i++) {
                if (this.ListMenuLis[i] == this.Current.Issue) {
                    this.Current.LastIssue = this.ListMenuLis[i - 1];
                    break;
                }
            }
        }
    },
    fillBonus: function(_ObjectListBonus) {
        ///<summary>填充近期开奖号码</summary>
        this.Object.ListBonus = _ObjectListBonus;
        var html = "";
        function getBonusResultList(_bonusNumber) {
            _bonusNumber = _bonusNumber.toString();
            var listR = new Array();
            var ball1 = parseInt(_bonusNumber.substr(4, 1), 10);
            var ball2 = parseInt(_bonusNumber.substr(3, 1), 10);
            var ball3 = parseInt(_bonusNumber.substr(2, 1), 10);
            var ball4 = parseInt(_bonusNumber.substr(1, 1), 10);
            var ball5 = parseInt(_bonusNumber.substr(0, 1), 10);
            var sum2Star = ball1 + ball2;
            var sum3Star = ball3 + sum2Star;
            var dxds = (ball2 >= 5 ? "大" : "小") + (ball1 >= 5 ? "大" : "小") + " " + (ball2 % 2 == 1 ? "单" : "双") + (ball1 % 2 == 1 ? "单" : "双");
            var zuxuan2Star = ball2 == ball1 ? "对子" : "非对子";
            var zuxuan3Star = ball3 == ball2 && ball3 == ball1 ? "豹子" : (ball3 != ball2 && ball3 != ball1 && ball2 != ball1 ? "组6" : "组3");
            listR.push(sum2Star);
            listR.push(sum3Star);
            listR.push(dxds);
            listR.push(zuxuan2Star);
            listR.push(zuxuan3Star);
            return listR;
        }
        for (var i = 0; i < this.Object.ListBonus.length; i++) {
            var issue = this.Object.ListBonus[i].split("|")[0];
            var bonusNumber = this.Object.ListBonus[i].split("|")[1];
            var listR = getBonusResultList(bonusNumber);
            html += "<li><span class=\"i1\">" + issue + "</span><span class=\"i2\">" + bonusNumber + "</span><span class=\"i3\">" + listR[0] + "</span><span class=\"i4\">" + listR[1] + "</span><span class=\"i5\">" + listR[2] + "</span><span class=\"i6\">" + listR[3] + "</span><span class=\"i7\">" + listR[4] + "</span></li>\r\n";
        }
        if (html == "") {
            html = "<li class=\"othersNone\" style=\"background:#474747; border-color: #474747 #474747 #474747;\"><span>暂无开奖信息</span></li>";
        }
        this.Container.BonusUl.innerHTML = html;
    },
    fillBonus2: function(_ObjectListBonus) {
        ///<summary>填充近几天开奖号码</summary>
        this.Object.ListBonus = _ObjectListBonus;
        _ObjectListBonus = [];
        for (var i = this.Object.ListBonus.length - 1; i >= 0; i--) {
            _ObjectListBonus.push(this.Object.ListBonus[i]);
        }
        var html = "";
        var rows = 20;
        if (_ObjectListBonus.length > 0) {
            var startIssue = parseInt(_ObjectListBonus[0].split("|")[0].toString().split("-")[1], 10);
            for (var i = 0; i < startIssue - 1; i++) {
                _ObjectListBonus.insertAt(i, _ObjectListBonus[i - 0].split("|")[0].toString().split("-")[0] + "-" + ((i < 9 ? "0" : "") + (i + 1).toString()) + "|--");
            }
            for (var i = startIssue; i < _ObjectListBonus.length - 1; i++) {
                var issue = parseInt(_ObjectListBonus[i].split("|")[0].toString().split("-")[1], 10);
                var next = parseInt(_ObjectListBonus[i + 1].split("|")[0].toString().split("-")[1], 10);
                if (issue + 1 != next) {
                    _ObjectListBonus.insertAt(i + 1, _ObjectListBonus[i].split("|")[0].toString().split("-")[0] + "-" + (issue + 1) + "|--");
                    continue;
                }
            }
        }
        for (var i = 0; i < _ObjectListBonus.length; i++) {
            var issue = _ObjectListBonus[i].split("|")[0];
            var bonusNumber = _ObjectListBonus[i].split("|")[1];
            if (i % rows == 0) {
                html += "<table>";
                html += "<tr>";
                html += "<th>期号</th>";
                html += "<th>开奖号</th>";
                html += "<th>后2</th>";
                html += "<th>后3</th>";
                html += "</tr>";
            }
            var xingTai = getBonusResultList2(bonusNumber);
            html += "<tr>";
            html += "<td>" + issue.toString().split("-")[1] + "</td>";
            html += "<td class=\"num\">" + bonusNumber + "</td>";
            html += "<td class=\"y1\">" + xingTai[0] + "</td>";
            html += "<td class=\"y" + (xingTai[1] == "豹子" ? "1" : (xingTai[1] == "组三" ? "2" : "3")) + "\">" + xingTai[1] + "</td>";
            html += "</tr>";
            if (i % rows == rows - 1) {
                html += "<tr class=\"last\"><td colspan=\"4\"><i class=\"shadowBottom\"><i class=\"shadowBottomL\"/></i></td></tr>";
                html += "</table>";
            }
        }
        for (var i = _ObjectListBonus.length; i < 120; i++) {
            if (i % rows == 0) {
                if (i > _ObjectListBonus.length) {
                    html += "<tr class=\"last\"><td colspan=\"4\"><i class=\"shadowBottom\"><i class=\"shadowBottomL\"/></i></td></tr>";
                    html += "</table>";
                }
                html += "<table>";
                html += "<tr>";
                html += "<th>期号</th>";
                html += "<th>开奖号</th>";
                html += "<th>后2</th>";
                html += "<th>后3</th>";
                html += "</tr>";
            }
            html += "<tr>";
            html += "<td>" + (i < 9 ? "00" : ((i + 1) < 100 ? "0" : "")) + (i + 1).toString() + "</td>";
            //            html += "<td>" + (i < 9 ? "0" : "") + (i + 1).toString() + "</td>";
            html += "<td>--</td>";
            html += "<td>--</td>";
            html += "<td>--</td>";
            html += "</tr>";
        }
        html += "<tr class=\"last\"><td colspan=\"4\"><i class=\"shadowBottom\"><i class=\"shadowBottomL\"/></i></td></tr>";
        $("ActionListContainerBonus").innerHTML = html;
    },
    getBetRecordHtml: function(_ListRecord, _isUpdateLen0) {
        ///<summary>生成投注记录Html</summary>
        ///<param name="_ListRecord">投注记录List<List<Ticket>></param>
        ///<param name="_isUpdateLen0">是否生成空投注项</param>
        var RefreshCurrent = false;
        var RefreshLast = false;
        for (var i = 0; i < _ListRecord.length; i++) {
            var html = "";
            if (_ListRecord[i].length == 0) {///当没有票数据时
                if (_isUpdateLen0 != true) {
                    var cssLi = this.ListMenuLis[i + 1] == this.Current.Issue ? "none" : "othersNone";
                    html = "<li class=\"" + cssLi + "\">" + noBetText + "</li>";
                } else {
                    continue;
                }
            } else {
                var cssLi = this.ListMenuLis[i + 1] == this.Current.Issue ? "" : "others";
                var issueStatus = this.ListMenuLis[i + 1] == this.Current.Issue ? 1 : (this.ListMenuLis[i + 1] == this.Current.LastIssue ? 0 : 2);
                for (var j = 0; j < _ListRecord[i].length; j++) {
                    var tempObj = _ListRecord[i][j];
                    var cssCurCase = tempObj.Digest == this.Current.CaseNo ? (this.ListMenuLis[i + 1] == this.Current.Issue ? this.ClassName.NewestCaseNo_Current : this.ClassName.NewestCaseNo_Other) : "";
                    cssCurCase = cssCurCase == "" ? "" : cssCurCase;
                    //                    html += "<li class=\"" + cssLi + " " + cssCurCase + "\" style=\"cursor:pointer;\" title=\"方案编号：" + tempObj.Digest + (tempObj.IPAddress == "0" ? "" : "(追号)") + "\"><a href=\"/UserCenter/ProjectDetail/FCCQSSC.aspx?id=" + tempObj.ProjectId + "\" target=\"_blank\"><span class=\"i1\">" + TKCPCEO.Enum.prototype.getChn(parseInt(tempObj.PlayType, 10), tempObj.AnteCode) + "</span><span class=\"i2\">" + TKCPCEO.Enum.prototype.getAnteText(tempObj.PlayType, tempObj.AnteCode) + "</span><span class=\"i3\">" + tempObj.Multiple + "</span><span class=\"i4\">" + tempObj.Money.toString().toMoney() + "</span><span class=\"i5\">" + tempObj.IPAddress.split("_")[0] + "</span><span class=\"i6\">" + (tempObj.BonusMoney > 0 ? tempObj.BonusMoney.toString().toMoney() : (tempObj.IPAddress == "已中奖_未返奖" ? "待派奖" : "-")) + "</span></li>";
                    var _playType = TKCPCEO.Enum.prototype.getChn(parseInt(tempObj.PlayType, 10), tempObj.AnteCode);
                    var _anteCode = TKCPCEO.Enum.prototype.getAnteText(tempObj.PlayType, tempObj.AnteCode);
                    html += "<li class=\"" + cssLi + " " + cssCurCase + "\" style=\"cursor:pointer;\" title=\"点击查看方案编号：" + tempObj.Digest + (tempObj.IPAddress == "0" ? "" : "(追号)") + "详情\"><a href=\"/UserCenter/ProjectDetail/Details.aspx?id=" + tempObj.ProjectId + "\" target=\"_blank\"><span class=\"i1\">" + _playType + "</span><span class=\"i2\">" + _anteCode + "</span><span class=\"i3\">" + tempObj.Multiple + "</span><span class=\"i4\">" + tempObj.Money.toString().toMoney() + "</span><span class=\"i5\">" + tempObj.IPAddress.split("_")[0] + "</span><span class=\"i6\">" + (tempObj.BonusMoney > 0 ? tempObj.BonusMoney.toString().toMoney() : (tempObj.IPAddress == "已中奖_未返奖" ? "待派奖" : "-")) + "</span><span class=\"i7\"><a title=\"点击撤销该票\" style=\"" + (tempObj.TicketStatus == "1" || tempObj.TicketStatus == "2" ? "display:none" : "display:none;") + "\" href=\"javascript:void(0)\" _ticketId=\"" + tempObj.Id + "\" _projectNo=\"" + tempObj.Digest + "\" _projectId=\"" + tempObj.ProjectId + "\" _playType=\"" + _playType + "\" _anteCode=\"" + _anteCode + "\" onclick=\"GiveUpTicket(this);\">撤单</a></span></a></li>";
                    if (i <= 2 && RefreshCurrent == false) {
                        RefreshCurrent = (tempObj.TicketStatus == "0" || tempObj.TicketStatus == "1" || tempObj.TicketStatus == "2" || tempObj.TicketStatus == "3");
                    }
                    if (i <= 2 && RefreshLast == false) {
                        RefreshLast = (tempObj.TicketStatus == "0" || tempObj.TicketStatus == "1" || tempObj.TicketStatus == "2" || tempObj.TicketStatus == "3" || tempObj.TicketStatus == "4") && tempObj.BonusStatus == "0";
                        try {
                            if (i == 2 && tempObj.TicketStatus == "4" && tempObj.BonusStatus == "1") {
                                cuser.getNewUserInfo();
                            }
                        } catch (e) { }
                    }
                }
            }
            this.ListMenuLis[i + 1].contentBody.innerHTML = html;
        }
        this.RefreshCurrent = RefreshCurrent;
        this.RefreshLast = RefreshLast;
        //        this.Current.CaseNo = "";
    },
    fillBetRecord: function(_ObjectTicket, _actionCode) {
        ///<summary>填充投注记录</summary>
        this.Object.Ticket.ListRecord = _ObjectTicket.ListRecord;
        if (_actionCode == 0) {
            this.Object.Ticket.ListIssue = _ObjectTicket.ListIssue;
            this.Object.Ticket.IssueIndex = _ObjectTicket.IssueIndex;
        }
        //        for (var i = 1; i < this.ListMenuLis.length; i++) {
        //            this.ListMenuLis[i].contentBody.innerHTML = "";
        //        }
        if (_actionCode == 0) {
            for (var i = 0; i < this.Object.Ticket.ListIssue.length; i++) {
                this.ListMenuLis[i + 1].issue = this.Object.Ticket.ListIssue[i];
                this.ListMenuLis[i + 1].innerHTML = "<span>" + this.Object.Ticket.ListIssue[i].toString().split("-")[1] + "期" + "</span>";
                if (i == this.Object.Ticket.IssueIndex) {
                    this.setCurrentIssue(this.ListMenuLis[i + 1]);
                }
            }
        }
        this.getBetRecordHtml(this.Object.Ticket.ListRecord);

        switch (_actionCode) {
            case 0:
                this.setCurrentLabel(this.Current.Issue); ///设置当前奖期标签
                //                if (betList.CurrentIssue != "" && betList.CurrentIssue != this.Object.Ticket.ListIssue[this.Object.Ticket.IssueIndex]) {
                //                    setSubmitButtonStatus(false, "第" + actionList.Current.Issue.issue + "期投注已结束\n请等待1分钟投注下一期。");
                //                }
                break;
            case 1:
                ///1.更新投注记录当前奖期标签(0-10分钟)
                ///2.切换内容页到待兑奖期
                ///3.(待兑奖期票状态兑奖完成后30秒) || (超时【3分钟】后) ======= 内容页切换至当前期
                if (this.Current.LastIssue != null) {
                    this.setCurrentLabel(this.Current.LastIssue);
                }
                break;
            default:
                break;
        }
    },
    setMutilplyArgumentInputs: function(_obj, _status) {
        var inputs = _obj.getElementsByTagName("input");
        for (var j = 1; j < inputs.length; j++) {
            inputs[j].disabled = _status;
        }
    },
    setMutilplyArgumentCSS: function(_obj) {
        if (this.Current.ObjectMutilplyArgument != null) {
            //            this.Current.ObjectMutilplyArgument.style.color = "#aaa";
            this.Current.ObjectMutilplyArgument.className = null;
            this.setMutilplyArgumentInputs(this.Current.ObjectMutilplyArgument, true);
        }
        this.Current.ObjectMutilplyArgument = _obj;
        //        this.Current.ObjectMutilplyArgument.style.color = null;
        this.Current.ObjectMutilplyArgument.className = "active";
        this.setMutilplyArgumentInputs(this.Current.ObjectMutilplyArgument, false);
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.Container.Menu == null || this.Container.BonusHead == null || this.Container.BonusUl == null || this.Container.BetRecordHead == null) {
            alert("未初始化顶部开奖/投注配置");
            return;
        }
        this.ListMenuLis = this.Container.Menu.getElementsByTagName("li");
        this.ListMenuLis[0].contentBody = this.Container.BonusUl;
        this.ListMenuLis[1].contentBody = this.Container.BetRecordUl1;
        this.ListMenuLis[2].contentBody = this.Container.BetRecordUl2;
        this.ListMenuLis[3].contentBody = this.Container.BetRecordUl3;
        this.ListMenuLis[4].contentBody = this.Container.BetRecordUl4;
        this.ListMenuLis[5].contentBody = this.Container.BetRecordUl5;
        for (var i = 0; i < this.ListMenuLis.length; i++) {
            this.ListMenuLis[i].onclick = this.setCurrentLabel.bind(this, this.ListMenuLis[i]);
        }

        this.ListMutilplyArgument = document.getElementsByName("ObjectMutiplayRadioType");
        for (var i = 0; i < this.ListMutilplyArgument.length; i++) {
            this.ListMutilplyArgument[i].onclick = this.setMutilplyArgumentCSS.bind(this, this.ListMutilplyArgument[i].parentNode);
            //            this.ListMutilplyArgument[i].parentNode.style.color = "#aaa";
            this.setMutilplyArgumentInputs(this.ListMutilplyArgument[i].parentNode, true);
            if (i == 0) {
                this.Current.ObjectMutilplyArgument = this.ListMutilplyArgument[0];
                this.Current.ObjectMutilplyArgument.click();
            }
        }
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.ListMenuLis = [];
        this.Time.Out = 300;
        this.Time.Auto = 30;
        this.Current.Issue = null;
        this.Current.Label = null;
        this.ClassName.CurrentIssue = "";
        this.ListMutilplyArgument = [];
    }
}

function setSubmitButtonStatus(_couldSubmit, _str) {
    ///<summary>设置提交投注单按钮状态</summary>
    var btnSubmit = $("BtnSubmitBetList");
    if (_couldSubmit == true) {
        //        btnSubmit.disabled = false;
        btnSubmit.className = "btn btnChartConfirm";
        btnSubmit.onclick = SumitBetList;
    } else {
        //        btnSubmit.disabled = true;
        btnSubmit.className = "btn btnChartConfirm btnChartConfirmNone";
        if (_str == null) {
            btnSubmit.onclick = null;
        } else {
            btnSubmit.onclick = function() { alert(_str) };
        }
    }
}

var UpdateTime_BetEndTime = new Date(); ///最后更新投注倒计时时间
var UpdateTime_BonusEndTime = new Date(); ///最后更新开奖倒计时时间
var SendJsonCommand = new JSONCommand(); ///Ajax提交服务器用
SendJsonCommand.CommandName = "SpeedAjax";
var ExecJsonCommand = new JSONCommand(); ///请求命令用
var Count_TotalBetIssue = 0; ///当前最多可投期号数量
var IsInterval = false;

var iframeLoaded = false;
var TotalLoadData = {///遗漏、近12期开奖、冷热数据集、总期数
    YiLou: new Array(),
    LengRe: null,
    Bonus: null,
    TotalBonusCount: null
}

function getBonusResultList2(_bonusNumber) {
    ///<summary>解析号码形态</summary>
    _bonusNumber = _bonusNumber.toString();
    if (_bonusNumber == "--" || _bonusNumber == "") {
        return ["--", "--"];
    }
    var ball1 = parseInt(_bonusNumber.substr(4, 1), 10);
    var ball2 = parseInt(_bonusNumber.substr(3, 1), 10);
    var ball3 = parseInt(_bonusNumber.substr(2, 1), 10);
    var r1 = ball1 == ball2 ? "对子" : "";
    var r2 = ball3 == ball2 && ball3 == ball1 ? "豹子" : (ball3 != ball2 && ball3 != ball1 && ball2 != ball1 ? "组六" : "组三");
    return [r1, r2];
}

var upTabIndex = 0;
var upTabTrIndex = 1;
function UpdateNewestBonus() {
    ///<summary>更新最近一期开奖号码</summary>
    var issue = TotalLoadData.Bonus[0].split("|")[0];
    var bonus = TotalLoadData.Bonus[0].split("|")[1];
    var lastIssue = TotalLoadData.Bonus[1].split("|")[0];
    var container = $("ActionListContainerBonus");
    var tables = container.getElementsByTagName("table");
    var isOK = false;
    for (var i = upTabIndex; i < tables.length; i++) {
        if (isOK == true) { break; }
        var trAry = tables[i].getElementsByTagName("tr");
        for (var j = upTabTrIndex; j < trAry.length - 1; j++) {
            var tds = trAry[j].getElementsByTagName("td");
            //            alert(tds[0].innerHTML + "\ntableIndex:" + i + "\nrowIndex:" + j + "\nbeUpdateIssue" + issue.split("-")[1]);
            if (tds.length > 0 && tds[0].innerHTML == issue.split("-")[1]) {
                try {
                    var bonusR = getBonusResultList2(bonus);
                    tds[1].innerHTML = bonus;
                    tds[1].className = "num";
                    tds[2].innerHTML = bonusR[0];
                    tds[3].innerHTML = bonusR[1];
                    tds[2].className = "y1";
                    tds[3].className = (bonusR[1] == "豹子" ? "y1" : (bonusR[1] == "组三" ? "y2" : "y3"));
                } catch (e) { }
                isOK = true;
                if (upTabIndex != i) {
                    upTabIndex = i;
                    upTabTrIndex = 1;
                } else {
                    //                    upTabTrIndex = j;
                }
                break;
            }
        }
    }
}

function GetCurrentBetIssueBack(_listBetIssue, _bonusTime, _justUpdateContainer) {
    ///<summary>获取当前可投注期号与开奖时间反馈</summary>
    //    $("TopCurrentBetIssue").innerHTML = _listBetIssue[0];
    //    $("TopCurrentBetBonusTime").innerHTML = _bonusTime;
    betList.setCurrentIssue(_listBetIssue, _justUpdateContainer);
}
var testTemp = false;
function GetTodayBonusBack(_bonusArray) {
    ///<summary>获取当天开奖号码反馈</summary>
    actionList.fillBonus(_bonusArray);
    if (testTemp == false) {
        actionList.fillBonus2(_bonusArray);
    }
    testTemp = true;
}

function GetRecentBetRecordBack(_objectTicket, _actionCode) {
    ///<summary>获取用户近5期投注记录反馈</summary>
    actionList.fillBetRecord(_objectTicket, _actionCode);
}

function GetRecentBetRecord(_actionCode) {
    ///<summary>获取用户近5期投注记录</summary>
    ExecJsonCommand.CommandName = "GetRecentBetRecord";
    ExecJsonCommand.Parameters = new Array();
    ExecJsonCommand.Parameters[0] = thisLotteryType;
    ExecJsonCommand.Parameters[1] = _actionCode;
    if (_actionCode != 0) {
        ExecJsonCommand.Parameters[2] = JSON.stringify(actionList.Object.Ticket.ListIssue);
    } else {
        ExecJsonCommand.Parameters[2] = JSON.stringify(new Array());
    }
    SendJsonCommand.Parameters[0] = ExecJsonCommand.toString();
    SendToServer(SendJsonCommand.toString());
    //    alert(ExecJsonCommand.toString());
}
var Status_GetYiLou = true;
function GetDataYiLouDelay() {
    setTimeout(function() { GetDataYiLou(); }, 15000);
}
function GetDataYiLou() {
    ///<summary>获取遗漏数据</summary>
    if (BetMenu.CurrentObj.Menu == null) {
        setTimeout(function() { GetDataYiLou(); }, 1000);
        return;
    }
    var menuObject = BetMenu.CurrentObj.Menu.childMenus[parseInt(BetMenu.CurrentObj.Menu.getAttribute("index"), 10)];
    if (menuObject.Menu == "常规选号") {
        var getYiLouTypeAry = new Array(); ///需要获取的遗漏数据数组
        var cloneMenuObjectYiLou = new Array(); ///当前选号页面的包含遗漏数据副本
        var normalYiLouAry = [101, 201, 301, 290, 240, 350, 370, 270, 318, 319, 320, 321]; ///常用遗漏

        for (var i = 0; i < menuObject.YiLou.length; i++) {
            cloneMenuObjectYiLou.push(menuObject.YiLou[i]);
        }
        //        alert(TotalLoadData.YiLou.length);
        if (TotalLoadData.YiLou.length > 0) {
            for (var i = TotalLoadData.YiLou.length - 1; i >= 0; i--) {
                for (j = cloneMenuObjectYiLou.length - 1; j >= 0; j--) {
                    if (cloneMenuObjectYiLou[j] == parseInt(TotalLoadData.YiLou[i].MissKey.toString(), 10)) {
                        if (betList.CurrentIssue.toString().trim() != TotalLoadData.YiLou[i].IssueNumber.toString().trim()) {
                            getYiLouTypeAry.push(parseInt(TotalLoadData.YiLou[i].MissKey.toString(), 10));
                        }
                        cloneMenuObjectYiLou.removeAt(j);
                        break;
                    }
                }
            }
            for (var i = 0; i < cloneMenuObjectYiLou.length; i++) {
                getYiLouTypeAry.push(cloneMenuObjectYiLou[i]);
            }
        } else {
            getYiLouTypeAry = menuObject.YiLou;
        }
        for (var i = TotalLoadData.YiLou.length - 1; i >= 0; i--) {
            for (var j = normalYiLouAry.length - 1; j >= 0; j--) {
                if (normalYiLouAry[j] == parseInt(TotalLoadData.YiLou[i].MissKey.toString(), 10)) {
                    if (betList.CurrentIssue.toString().trim() != "" && betList.CurrentIssue.toString().trim() != TotalLoadData.YiLou[i].IssueNumber.toString().trim()) {
                        getYiLouTypeAry.push(parseInt(TotalLoadData.YiLou[i].MissKey.toString(), 10));
                        //                        alert(betList.CurrentIssue.toString().trim() + "\n" + TotalLoadData.YiLou[i].IssueNumber.toString().trim());
                    }
                    normalYiLouAry.removeAt(j);
                    break;
                }
            }
        }
        getYiLouTypeAry = normalYiLouAry.concat(getYiLouTypeAry).clearRepeat();
        if (getYiLouTypeAry.length == 0) {
            GetDataYiLouBack(TotalLoadData.YiLou, TotalLoadData.TotalBonusCount, true);
            //            alert("不更新");
            return;
        }
        if (Status_GetYiLou == false) {
            return;
        }
        ExecJsonCommand.CommandName = "GetDataYiLou";
        ExecJsonCommand.Parameters = new Array();
        ExecJsonCommand.Parameters[0] = thisLotteryType;
        ExecJsonCommand.Parameters[1] = JSON.stringify(getYiLouTypeAry);
        SendJsonCommand.Parameters[0] = ExecJsonCommand.toString();
        //        alert("更新" + getYiLouTypeAry.toString());
        SendToServer(SendJsonCommand.toString());
    }
}
function GetDataYiLouBack(_objYiLou, _issueCount, _isOld) {
    ///<summary>获取遗漏数据反馈</summary>
    if (_isOld != true) {
        if (TotalLoadData.YiLou.length == 0) {
            TotalLoadData.YiLou = _objYiLou;
        } else {
            for (var i = TotalLoadData.YiLou.length - 1; i >= 0; i--) {
                for (var j = _objYiLou.length - 1; j >= 0; j--) {
                    if (TotalLoadData.YiLou[i].MissKey == _objYiLou[j].MissKey) {
                        TotalLoadData.YiLou[i] = _objYiLou[j];
                        _objYiLou.removeAt(j);
                        break;
                    }
                }
            }
            //            alert("objYiLou:" + _objYiLou.length);
            for (var i = 0; i < _objYiLou.length; i++) {
                TotalLoadData.YiLou.push(_objYiLou[i]);
            }
        }
        TotalLoadData.TotalBonusCount = _issueCount;
    }
    SetChildNormalYiLouString();
    try {
        BetMenu.CurrentObj.Menu.childMenus[parseInt(BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe.contentWindow.Event_UpdateData_YiLou();
        if (_isOld != true) {
//            GetDataYiLouDelay();
        }
    } catch (e) {
        //        GetDataYiLouDelay();
    }
}

function GetDataLengRe() {
    ///<summary>计算冷热数据</summary>
    var ball5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ball4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ball3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ball2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ball1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var dxds2 = [0, 0, 0, 0];
    ///        大  小 单 双
    var dxds1 = [0, 0, 0, 0];
    ///        大  小 单 双
    var dxdsFix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ///           大大   大小  大单  大双  小大  小小  小单 小双 单大  单小 单单  单双 双大 双小 双单 双双
    var zh = [0, 0, 0, 0];


    for (var i = 0; i < TotalLoadData.Bonus.length - 2; i++) {
        var bonus = TotalLoadData.Bonus[i].split("|")[1];
        var b5 = parseInt(bonus.substr(0, 1), 10);
        var b4 = parseInt(bonus.substr(1, 1), 10);
        var b3 = parseInt(bonus.substr(2, 1), 10);
        var b2 = parseInt(bonus.substr(3, 1), 10);
        var b1 = parseInt(bonus.substr(4, 1), 10);
        ball5[b5] += 1;
        ball4[b4] += 1;
        ball3[b3] += 1;
        ball2[b2] += 1;
        ball1[b1] += 1;
        var dxIndex2 = b2 >= 5 ? 0 : 1;
        var dxIndex1 = b1 >= 5 ? 0 : 1;
        var dsIndex2 = b2 % 2 == 1 ? 2 : 3;
        var dsIndex1 = b1 % 2 == 1 ? 2 : 3;
        dxds2[dxIndex2] += 1;
        dxds1[dxIndex1] += 1;
        dxds2[dsIndex2] += 1;
        dxds1[dsIndex1] += 1;

        dxdsFix[
            (dxIndex2 == 0 && dxIndex1 == 0) ? 0 : ///大大
            (dxIndex2 == 0 && dxIndex1 == 1) ? 1 : ///大小
            (dxIndex2 == 1 && dxIndex1 == 0) ? 4 : ///小大
            5 ///小小
        ] += 1;
        dxdsFix[
            (dxIndex2 == 0 && dsIndex1 == 2) ? 2 : ///大单
            (dxIndex2 == 0 && dsIndex1 == 3) ? 3 : ///大双
            (dxIndex2 == 1 && dsIndex1 == 2) ? 6 : ///小单
            7  ///小双
        ] += 1;
        dxdsFix[
            (dsIndex2 == 2 && dxIndex1 == 0) ? 8 : ///单大
            (dsIndex2 == 2 && dxIndex1 == 1) ? 9 : ///单小
            (dsIndex2 == 3 && dxIndex1 == 0) ? 12 : ///双大
            13  ///双小
        ] += 1;
        dxdsFix[
            (dsIndex2 == 2 && dsIndex1 == 2) ? 10 : ///单单
            (dsIndex2 == 2 && dsIndex1 == 3) ? 11 : ///单双
            (dsIndex2 == 3 && dsIndex1 == 2) ? 14 : ///双单
            15  ///双双
        ] += 1;
    }
    TotalLoadData.LengRe = [ball5, ball4, ball3, ball2, ball1, dxds2, dxds1, dxdsFix];

    try {
        BetMenu.CurrentObj.Menu.childMenus[parseInt(BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe.contentWindow.Event_UpdateData_LengRe();
    } catch (e) { }
}

function GetDataBonus() {
    ///<summary>获取近期开奖数据</summary>
    ExecJsonCommand.CommandName = "GetTop12Bonus";
    ExecJsonCommand.Parameters = new Array();
    ExecJsonCommand.Parameters[0] = thisLotteryType;
    ExecJsonCommand.Parameters[1] = 12;
    SendJsonCommand.Parameters[0] = ExecJsonCommand.toString();
    SendToServer(SendJsonCommand.toString());
}
function GetDataBonusBack(_objBonus) {
    ///<summary>获取近期开奖数据反馈</summary>
    TotalLoadData.Bonus = _objBonus;
    try {
        BetMenu.CurrentObj.Menu.childMenus[parseInt(BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe.contentWindow.Event_UpdateData_Bonus();
    } catch (e) { }
    GetDataLengRe();
    UpdateNewestBonus();
}

function GetCurrentBetIssue() {
    ///<summary>更新可投注期号</summary>
    ExecJsonCommand.CommandName = "GetCurrentBetIssue";
    ExecJsonCommand.Parameters = new Array();
    ExecJsonCommand.Parameters[0] = thisLotteryType;
    SendJsonCommand.Parameters[0] = ExecJsonCommand.toString();
    SendToServer(SendJsonCommand.toString());
}

function Event_BetEnded() {
    ///<summary>投注截至到点触发事件</summary>
    //    alert("投注截至");
    ///更新可投注期号

    GetCurrentBetIssue();
    ///不能投注

    setSubmitButtonStatus(false, "第" + actionList.Current.Issue.issue + "期投注已结束，请等待1分钟投注下一期。");
}

function Event_BonusStart() {
    ///<summary>请求服务器开奖信息到获取到最新开奖信息前触发事件</summary>
    UpdateTime_BetEndTime = new Date();
    //    alert("获取开奖信息中");
    ///启用投注功能


    setSubmitButtonStatus(true);
    SetCurrentBetIssueText(null);

    ///切换到当前期标签

    actionList.setCurrentLabel(actionList.Current.Issue);

    ///未获取到开奖号码超时操作
    if ((new Date().getTime() - UpdateTime_BonusEndTime.getTime()) > (13 * 60 * 1000)) {

        GetRecentBetRecord(0);
    }
}

function Event_BonusEnded() {
    ///<summary>获取到最新开奖信息后触发事件</summary>
    UpdateTime_BonusEndTime = new Date();
    //    alert("获取开奖信息结束");
    ///刷新遗漏【待写（子页面方法）】


    GetDataYiLouDelay();

    GetDataBonus();

    ///启用刷新待兑奖期投注记录机制
    try {
        clearInterval(checkEvent_RefreshBeBonusedRecord);
    } catch (e) { }

    checkEvent_RefreshBeBonusedRecord = setInterval(function() { Event_RefreshBeBonusedRecord(); }, 20000);

    ///刷新近期开奖号码

    ExecJsonCommand.CommandName = "GetTodayBonus";
    ExecJsonCommand.Parameters = new Array();
    ExecJsonCommand.Parameters[0] = thisLotteryType;
    SendJsonCommand.Parameters[0] = ExecJsonCommand.toString();
    SendToServer(SendJsonCommand.toString());
}

function Event_RefreshBeBonusedRecord() {
    ///<summary>刷新待兑奖期兑奖记录(独立死循环)</summary>
    IsInterval = true;
    var isBeStatus = actionList.Object.Ticket.ListIssue[2] != betList.CurrentIssue;
    if (actionList.RefreshLast == true) {
        if (isBeStatus) {
            //        alert("刷新待兑奖期投注记录");
            var status = -1;
            ///待兑奖期切换到当前奖期超时自动切换(3分钟)
            if ((new Date().getTime() - UpdateTime_BonusEndTime.getTime()) > (5 * 60 * 1000)) {
                //status = 0;
            }

            GetRecentBetRecord(status);
        }
    } else {
        if (checkEvent_RefreshBeBonusedRecord != null) {
            clearInterval(checkEvent_RefreshBeBonusedRecord);
        }
        IsInterval = false;

        setTimeout(function() { GetRecentBetRecord(0); }, 30000);
    }
}

function Event_RefreshCurrentIssueRecord() {
    ///<summary>刷新当前奖期投注记录(独立死循环)</summary>
    if (IsInterval == false) {
        if (actionList.RefreshCurrent == true) {
            //        alert("刷新当前奖期投注记录");

            GetRecentBetRecord(-1);
        }
    }
}

function Event_AllowErr() {
    ///<summary>容错机制(独立死循环)</summary>
    var overTimeBetEnd = overTimeBonusEnd = 12 * 60 * 1000;
    var nowDate = new Date();
    var reduceBetEnd = nowDate.getTime() - UpdateTime_BetEndTime.getTime();
    if (reduceBetEnd > overTimeBetEnd) {

        Event_BetEnded();
    }
    var reduceBonusEnd = nowDate.getTime() - UpdateTime_BonusEndTime.getTime();
    if (reduceBonusEnd > overTimeBonusEnd) {

        Event_BonusStart();
    }
}


var StringHtml_NormalYiLou = "";
SetChildNormalYiLouString();
function SetChildNormalYiLouString() {
    var hashTable = [
        { Head: "大小单双", Title: "&nbsp;", Href: "&nbsp;", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "一星", Title: "一星（个位）遗漏", Href: "Trend.aspx?tid=c3", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "二星和值", Title: "十位与个位的和值（此处统计范围为4-14共11个和值）遗漏", Href: "Trend.aspx?tid=g5", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "三星和值", Title: "百位、十位、个位的和值（此处统计范围为5-22共18个和值）遗漏", Href: "Trend.aspx?tid=g6", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "二星(定位)", Title: "二星（十位、个位）遗漏", Href: "Trend.aspx?tid=d10", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "二星(不定位)", Title: "二星组选（十、个位不排序）遗漏", Href: "Trend.aspx?tid=i14", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "三星(定位)", Title: "三星（百位、十位、个位）遗漏", Href: "Trend.aspx?tid=e15", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "三星(不定位)", Title: "三星组选（百、十、个位不排序）遗漏", Href: "Trend.aspx?tid=j18", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "万能四码", Title: "三星（百、十、个位）的万能四码（4个号码为一组，共30组）遗漏", Href: "Trend.aspx?tid=e16", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "万能五码", Title: "三星（百、十、个位）的万能五码（5个号码为一组，共17组）遗漏", Href: "Trend.aspx?tid=e17", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "万能六码", Title: "三星（百、十、个位）的万能六码（6个号码为一组，共10组）遗漏", Href: "Trend.aspx?tid=e18", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] },
        { Head: "万能七码", Title: "三星（百、十、个位）的万能七码（7个号码为一组，共6组）遗漏", Href: "Trend.aspx?tid=e19", Key: ["&nbsp;", "&nbsp;", "&nbsp;"], Value: ["&nbsp;", "&nbsp;", "&nbsp;"] }
    ];
    var enterStr = "\r\n";
    var outHtml = ["", "", "", "", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < TotalLoadData.YiLou.length; i++) {
        if (TotalLoadData.YiLou[i].MissKey == "290") {///大小单双
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[0].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[0].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(0);
        }

        if (TotalLoadData.YiLou[i].MissKey == "101") {///一星
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[1].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[1].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(1);
        }

        if (TotalLoadData.YiLou[i].MissKey == "240") {///二星和值
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[2].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[2].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(2);
        }

        if (TotalLoadData.YiLou[i].MissKey == "350") {///三星和值
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[3].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[3].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(3);
        }

        if (TotalLoadData.YiLou[i].MissKey == "201") {///二星(定位)
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[4].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[4].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(4);
        }

        if (TotalLoadData.YiLou[i].MissKey == "270") {///二星(不定位)
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[5].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[5].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(5);
        }

        if (TotalLoadData.YiLou[i].MissKey == "301") {///三星(定位)
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[6].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[6].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(6);
        }

        if (TotalLoadData.YiLou[i].MissKey == "370") {///三星(不定位)
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[7].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[7].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(7);
        }

        if (TotalLoadData.YiLou[i].MissKey == "318") {///万能四码
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[8].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[8].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(8);
        }

        if (TotalLoadData.YiLou[i].MissKey == "319") {///万能五码
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[9].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[9].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(9);
        }

        if (TotalLoadData.YiLou[i].MissKey == "320") {///万能六码
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[10].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[10].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(10);
        }

        if (TotalLoadData.YiLou[i].MissKey == "321") {///万能七码
            for (var j = 0; j < TotalLoadData.YiLou[i].MissValue.length; j++) {
                hashTable[11].Key[j] = TotalLoadData.YiLou[i].MissValue[j].MissKey.toString();
                hashTable[11].Value[j] = TotalLoadData.YiLou[i].MissValue[j].MissValue.toString();
            }
            getOutHtml(11);
        }
    }

    function getOutHtml(index) {
        //        StringHtml_NormalYiLou += "<tr>";

        //        StringHtml_NormalYiLou += "<th colspan=\"2\" title=\"" + hashTable[0].Title + "\">";
        //        if (hashTable[0].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "<a href=\"" + hashTable[0].Href + "\" target=\"_blank\">";
        //        }
        //        StringHtml_NormalYiLou += hashTable[0].Head;
        //        if (hashTable[0].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "</a>";
        //        }
        //        StringHtml_NormalYiLou += "</th>";


        //        StringHtml_NormalYiLou += "<th colspan=\"2\" title=\"" + hashTable[1].Title + "\" class=\"bdr\">";
        //        if (hashTable[1].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "<a href=\"" + hashTable[1].Href + "\" target=\"_blank\">";
        //        }
        //        StringHtml_NormalYiLou += hashTable[1].Head;
        //        if (hashTable[1].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "</a>";
        //        }
        //        StringHtml_NormalYiLou += "</th>";


        //        StringHtml_NormalYiLou += "<th colspan=\"2\" title=\"" + hashTable[2].Title + "\" class=\"bdr\">";
        //        if (hashTable[2].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "<a href=\"" + hashTable[2].Href + "\" target=\"_blank\">";
        //        }
        //        StringHtml_NormalYiLou += hashTable[2].Head;
        //        if (hashTable[2].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "</a>";
        //        }
        //        StringHtml_NormalYiLou += "</th>";


        //        StringHtml_NormalYiLou += "<th colspan=\"2\" title=\"" + hashTable[3].Title + "\" class=\"bdr\">";
        //        if (hashTable[3].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "<a href=\"" + hashTable[3].Href + "\" target=\"_blank\">";
        //        }
        //        StringHtml_NormalYiLou += hashTable[3].Head;
        //        if (hashTable[3].Href != "&nbsp;") {
        //            StringHtml_NormalYiLou += "</a>";
        //        }
        //        StringHtml_NormalYiLou += "</th>";
        //        
        //        StringHtml_NormalYiLou += "</tr>";

        outHtml[index] = "<table>";
        outHtml[index] += "<tr><th colspan=\"2\" title=\"" + hashTable[index].Title + "\">";
//        if (hashTable[index].Href != "&nbsp;") {
//            outHtml[index] += "<a href=\"" + hashTable[index].Href + "\" target=\"_blank\" style=\"color:#fff;\">";
//        }
        outHtml[index] += hashTable[index].Head;
//        if (hashTable[index].Href != "&nbsp;") {
//            outHtml[index] += "</a>";
//        }
        outHtml[index] += "</th></tr>";
        for (var i = 0; i < hashTable[index].Key.length; i++) {
            outHtml[index] += "<tr>";
            outHtml[index] += "<td style=\"width:60%;\" align=\"center\">" + hashTable[index].Value[i] + "期</td>";
            outHtml[index] += "<td align=\"left\">" + hashTable[index].Key[i] + "</td>";
            outHtml[index] += "</tr>";
        }
        outHtml[index] += "</table>";
    }

    for (var i = 0; i < outHtml.length; i++) {
        if (outHtml[i] == "") {
            getOutHtml(i);
        }
    }

    StringHtml_NormalYiLou = outHtml.join(enterStr);
}


function GiveUpTicket(_linkBtn) {
    if (!_linkBtn.disabled) {
        var _ticketId = _linkBtn.getAttribute("_ticketId");
        var _projectId = _linkBtn.getAttribute("_projectId");
        var _projectNo = _linkBtn.getAttribute("_projectNo");
        var _playType = _linkBtn.getAttribute("_playType");
        var _anteCode = _linkBtn.getAttribute("_anteCode");
        if (confirm("您确认撤销这张票吗？\n票编号：" + _ticketId + "\n玩法：" + _playType + "(" + _anteCode + ")")) {
            _linkBtn.disabled = true;
            _linkBtn.style.display = "none";
            ExecJsonCommand.CommandName = "GiveUpTicket";
            ExecJsonCommand.Parameters = new Array();
            ExecJsonCommand.Parameters[0] = thisLotteryType;
            ExecJsonCommand.Parameters[1] = JSON.stringify([_ticketId]);
            ExecJsonCommand.Parameters[2] = _projectId;
            ExecJsonCommand.Parameters[3] = false;
            SendJsonCommand.Parameters[0] = ExecJsonCommand.toString();
            SendToServer(SendJsonCommand.toString());
        }
    }
}
function GiveUpTicketBack(ret) {
    if (ret.CommonArrayList.length == 0) {
        GetRecentBetRecord(-1);
        cuser.getNewUserInfo();
    } else {
        alert("撤单失败");
    }
}


function SetCurrentBetIssueText(_issue) {
    var container = $("ContainerCurrentBetIssue");
    var image = $("ImageCurrentBetIssue");
    //    alert(_issue + "\n" + container.getAttribute("currentIssue"));
    if (_issue != null) {
        container.innerHTML = _issue;
        if (container.getAttribute("currentIssue") != null) {
            container.parentNode.style.color = container.getAttribute("currentIssue") != _issue ? "#ff0" : "#ccc";
            image.style.display = container.getAttribute("currentIssue") != _issue ? "" : "none";
        } else {
            container.parentNode.style.color = "#ccc";
            image.style.display = "none";
        }
        container.setAttribute("currentIssue", _issue);
    } else {
        container.parentNode.style.color = "#ccc";
        image.style.display = "none";
    }
}