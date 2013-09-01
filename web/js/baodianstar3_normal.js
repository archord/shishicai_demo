/// <reference path="~/JS/NoUse/JScript.js" />

TKCPCEO.Lottery.FCCQSSC.Pick = function() {
    ///<summary>选号类</summary>
    ///<field name="Container">选号球容器对象</field>
    ///<field name="ListBalls">选号球容dom对象数组</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.FCCQSSC.Pick.prototype = {
    Container: null,
    ListBalls: new Array(),
    SelectBalls: new Array(),
    PlayType: -1,
    SubmitTicket: null,
    BetCount: 0,
    BetMoney: 0,
    PerMoney: 2,
    clear: function() {
        ///<summary>清空选择的球</summary>
        var sCount = this.SelectBalls.length;
        for (var i = 0; i < sCount; i++) {
            this.SelectBalls[0].onclick();
        }
    },
    selectedChange: function() {
        ///<summary>选球变更事件</summary>
    },
    compute: function() {
        ///<summary>计算选号结果</summary>
        this.BetCount = 0;
        for (var i = 0; i < this.SelectBalls.length; i++) {
            this.BetCount += parseInt(this.SelectBalls[i].getAttribute("betCount"), 10);
        }
        this.BetMoney = this.BetCount * this.PerMoney;

        $("PickBetCount").innerHTML = this.BetCount.toString();
        $("PickBetMoney").innerHTML = this.BetMoney.toString().toMoney();
    },
    clickBall: function(_ballItem) {
        ///<summary>选号球点击事件</summary>
        if (this.SelectBalls.exists(_ballItem)) {
            _ballItem.className = "num";
            this.SelectBalls.remove(_ballItem);
        } else {
            _ballItem.className = "num num_on";
            this.SelectBalls.push(_ballItem);
        }
        this.compute();
        this.selectedChange();
    },
    submitTicket: function() {
        ///<summary>放入投注单</summary>
        if (this.SelectBalls.length == 0) {
            alert("请先正确选择号码");
            return;
        }
        this.PlayType = parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3ZuXuanBaoDian;
        var betList = parent.betList;
        for (var i = 0; i < this.SelectBalls.length; i++) {
            var bonus = this.SelectBalls[i].getAttribute("value");
            var betCount = this.SelectBalls[i].getAttribute("betCount");
            betList.addItem(parent.TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.BetMethod.Standard, this.PlayType, bonus, bonus, betCount);
        }
        this.clear();
    },
    initialize: function() {
        ///<summary>初始化</summary>
        if (this.Container == null || this.SubmitTicket == null) {
            alert("未配置初始化");
            return;
        }
        this.ListBalls = this.Container.getElementsByTagName("span");
        for (var i = 0; i < this.ListBalls.length; i++) {
            this.ListBalls[i].onclick = this.clickBall.bind(this, this.ListBalls[i]);
        }
        this.SubmitTicket.onclick = this.submitTicket.bind(this);
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.Container = null;
        this.ListBalls = [];
        this.SelectBalls = [];
        this.PlayType = -1;
    }
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
    function checkBallCondition(_value, _ballValue) {
        var isValidate = false;
        switch (_typeYiLou) {
            //var partSumAry = [[0, 6], [7, 9], [9, 11], [12, 18]];
            case "352": ///和值尾
                if (parseInt(_ballValue, 10) == (parseInt(_value, 10) % 10)) {
                    isValidate = true;
                }
                break;
            case "353": ///和值段遗漏
                var max = parseInt(_ballValue.split("-")[1], 10);
                var min = parseInt(_ballValue.split("-")[0], 10);
                var val = parseInt(_value, 10);
                isValidate = val <= max && val >= min;
                break;
            default: ///数字直接选号"13"
                if (parseInt(_ballValue, 10) == parseInt(_value, 10)) {
                    isValidate = true;
                }
                break;
        }
        return isValidate;
    }
    pickClass.clear();
    var ball = _key;
    for (var i = 0; i < pickClass.ListBalls.length; i++) {
        var value = parseInt(pickClass.ListBalls[i].getAttribute("value"), 10);
        if (checkBallCondition(value, ball) == true) {
            pickClass.ListBalls[i].onclick();
        }
    }
}

function Event_UpdateData_YiLou() {
    ///<summary>更新遗漏数据</summary>
    if (parent.TotalLoadData == null || parent.TotalLoadData.YiLou == null) { setTimeout(function() { Event_UpdateData_YiLou(); }, 1000); return; }
    var htmlStandard = new Array(); ///标准遗漏
    var dataYiLou = parent.TotalLoadData.YiLou;

    function outHtml(_dataYiLouItem, _mainText, _mainTitle, _mainHref, _htmlIndex, html, _splitType) {
        _mainHref = "";
        var pCount = _htmlIndex % 3 + 1;
        html[_htmlIndex] = document.createElement("ul");
        html[_htmlIndex].className = "pItem";
        var ulHtml = "";
        for (var j = 0; j < _dataYiLouItem.MissValue.length; j++) {
            var key = _dataYiLouItem.MissValue[j].MissKey;
            if (_splitType != 0 && key.split(",").length <= 1) {
                key = key.split("").join(",");
            }
            ulHtml += "<li>";
            ulHtml += "<span class=\"plnum\">" + _dataYiLouItem.MissValue[j].MissValue + "</span><span onclick=\"PickBallsByYiLouData('" + _dataYiLouItem.MissKey.toString() + "', '" + key.toString() + "');\" onmouseover=\"dataYiLouOnMouseOver(this)\" onmouseout=\"dataYiLouOnMouseOut(this)\" class=\"plitem\" css=\"plitem\"><span><em>" + key + "</em></span></span>";
            ulHtml += "<div class=\"tip\" style=\"display:none;\"><div class=\"tip_in\"><div class=\"tip_inC\">" + parent.EmptyOnmouseoverText + "</div></div></div>";
            ulHtml += "</li>";
        }
        ulHtml += "<li class=\"item\"><a class=\"item\" " + (_mainHref != "" ? "target=\"_blank\" href=\"" + _mainHref + "\"" : "") + " title=\"" + _mainTitle + "\">" + _mainText + "</a></li>";
        html[_htmlIndex].innerHTML = ulHtml;
    }
    if ($("ContainerValueProbabilityWrap").cells.length > 0) {
        var trLen = $("ContainerValueProbabilityWrap").cells.length;
        for (var i = trLen - 1; i >= 0; i--) {
            $("ContainerValueProbabilityWrap").deleteCell(i);
        }
    }
    $("ContainerValueProbabilityWrap").fragMent = document.createDocumentFragment();

    var widthTh = $("ContainerPickWrap").getElementsByTagName("th")[0].offsetWidth;
    var fenWeiTh = document.createElement("th");
    fenWeiTh.title = "本次遗漏除以平均遗漏";
    //    fenWeiTh.style.width = widthTh + "px";
    fenWeiTh.innerHTML = "欲出几率：";
    $("ContainerValueProbabilityWrap").fragMent.appendChild(fenWeiTh);

    for (var i = 0; i < parent.TotalLoadData.YiLou.length; i++) {
        if (dataYiLou[i].MissKey == "350") {
            outHtml(dataYiLou[i], "三星和值遗漏", "百位、十位、个位的和值（此处统计范围为5-22共18个和值）遗漏", "Trend.aspx?tid=g6", 0, htmlStandard, 0);
        }

        if (dataYiLou[i].MissKey == "352") {
            outHtml(dataYiLou[i], "三星和值尾遗漏", "百位、十位、个位的和值尾数（0-9）遗漏", "", 1, htmlStandard, 0);
        }

        if (dataYiLou[i].MissKey == "353") {
            outHtml(dataYiLou[i], "三星和值段遗漏", "百位、十位、个位的和值段（第一段：0-8第二段：9-11第三段：12-13第四段：14-15第五段：16-18第六段：19-27）遗漏", "", 2, htmlStandard, 0);
        }

        if (dataYiLou[i].MissKey == "351") {///和值分位遗漏
            var maxPercent = 0;
            var probabilityAry = new Array();
            for (var j = 0; j < dataYiLou[i].MissValue.length; j++) {
                var yilouValue = parseInt(dataYiLou[i].MissValue[j].MissValue, 10);
                var appearCount = dataYiLou[i].MissValue[j].AppearCount == null ? j : parseInt(dataYiLou[i].MissValue[j].AppearCount, 10);
                var aveYiLouValue = Math.round((parent.TotalLoadData.TotalBonusCount - appearCount - yilouValue) / appearCount);
                probabilityAry[j] = Math.round(parseFloat((parseFloat(yilouValue) / parseFloat(aveYiLouValue)) * 100)) / 100;
                if (probabilityAry[j] > maxPercent) {
                    maxPercent = probabilityAry[j];
                }
            }
            var width = $("ContainerPickWrap").getElementsByTagName("td")[0].offsetWidth;
            for (var j = 0; j < probabilityAry.length; j++) {
                var fenWeiTd = document.createElement("td");
                fenWeiTd.className = probabilityAry[j] == maxPercent ? "lger" : null;
                fenWeiTd.innerHTML = probabilityAry[j] + "<i style=\"height:" + parseFloat(probabilityAry[j] / maxPercent) * 10000 / 100 / 2 + "px;\"><em></em></i>";
                $("ContainerValueProbabilityWrap").fragMent.appendChild(fenWeiTd);
            }
        }
    }
    var oldUlAry = $("ContainerYiLou").getElementsByTagName("ul");
    var oldUlAryLen = oldUlAry.length;
    for (var i = 0; i < oldUlAryLen; i++) {
        $("ContainerYiLou").removeChild(oldUlAry[0]);
    }
    for (var i = 0; i < htmlStandard.length; i++) {
        $("ContainerYiLou").insertBefore(htmlStandard[i], $("Container10Trend"));
    }
    $("ContainerValueProbabilityWrap").appendChild($("ContainerValueProbabilityWrap").fragMent);
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}

function Event_UpdateData_Bonus() {
    ///<summary>更新开奖数据</summary>
    if (parent.TotalLoadData == null || parent.TotalLoadData.Bonus == null) { setTimeout(function() { Event_UpdateData_Bonus(); }, 1000); return; }
    var bonusStrAry = parent.TotalLoadData.Bonus;
    var html = "<table>";
    var issueAry = new Array();
    var bonus5Ary = new Array();
    var bonus4Ary = new Array();
    var bonus3Ary = new Array();
    var bonus2Ary = new Array();
    var bonus1Ary = new Array();
    var sumAry = new Array();
    var indexPartSumAry = new Array();
    var partSumAry = [[0, 8], [9, 11], [12, 13], [14, 15], [16, 18], [19, 27]];
    for (var i = 0; i < bonusStrAry.length - 2; i++) {
        issueAry.push(bonusStrAry[i].split("|")[0].split("-")[1]);
        bonus5Ary.push(parseInt(bonusStrAry[i].split("|")[1].toString().substr(0, 1), 10));
        bonus4Ary.push(parseInt(bonusStrAry[i].split("|")[1].toString().substr(1, 1), 10));
        bonus3Ary.push(parseInt(bonusStrAry[i].split("|")[1].toString().substr(2, 1), 10));
        bonus2Ary.push(parseInt(bonusStrAry[i].split("|")[1].toString().substr(3, 1), 10));
        bonus1Ary.push(parseInt(bonusStrAry[i].split("|")[1].toString().substr(4, 1), 10));
        sumAry[i] = parseInt(bonusStrAry[i].split("|")[1].toString().substr(2, 1), 10) + parseInt(bonusStrAry[i].split("|")[1].toString().substr(3, 1), 10) + parseInt(bonusStrAry[i].split("|")[1].toString().substr(4, 1), 10);
        for (var j = 0; j < partSumAry.length; j++) {
            if (sumAry[i] >= partSumAry[j][0] && sumAry[i] <= partSumAry[j][1]) {
                indexPartSumAry[i] = partSumAry[j].join("-");
                break;
            }
        }
    }
    html += "<tr><td>期号</td><td>" + issueAry[0] + "</td><td>" + issueAry[1] + "</td><td>" + issueAry[2] + "</td><td>" + issueAry[3] + "</td><td>" + issueAry[4] + "</td><td>" + issueAry[5] + "</td><td>" + issueAry[6] + "</td><td>" + issueAry[7] + "</td><td>" + issueAry[8] + "</td><td>" + issueAry[9] + "</td></tr>";
    html += "<tr><td>开奖号码</td><td>" + bonus3Ary[0] + "," + bonus2Ary[0] + "," + bonus1Ary[0] + "</td><td>" + bonus3Ary[1] + "," + bonus2Ary[1] + "," + bonus1Ary[1] + "</td><td>" + bonus3Ary[2] + "," + bonus2Ary[2] + "," + bonus1Ary[2] + "</td><td>" + bonus3Ary[3] + "," + bonus2Ary[3] + "," + bonus1Ary[3] + "</td><td>" + bonus3Ary[4] + "," + bonus2Ary[4] + "," + bonus1Ary[4] + "</td><td>" + bonus3Ary[5] + "," + bonus2Ary[5] + "," + bonus1Ary[5] + "</td><td>" + bonus3Ary[6] + "," + bonus2Ary[6] + "," + bonus1Ary[6] + "</td><td>" + bonus3Ary[7] + "," + bonus2Ary[7] + "," + bonus1Ary[7] + "</td><td>" + bonus3Ary[8] + "," + bonus2Ary[8] + "," + bonus1Ary[8] + "</td><td>" + bonus3Ary[9] + "," + bonus2Ary[9] + "," + bonus1Ary[9] + "</td></tr>";
    html += "<tr><td>和值</td><td>" + (sumAry[0]) + "</td><td>" + (sumAry[1]) + "</td><td>" + (sumAry[2]) + "</td><td>" + (sumAry[3]) + "</td><td>" + (sumAry[4]) + "</td><td>" + (sumAry[5]) + "</td><td>" + (sumAry[6]) + "</td><td>" + (sumAry[7]) + "</td><td>" + (sumAry[8]) + "</td><td>" + (sumAry[9]) + "</td></tr>";
    html += "<tr><td>和值段</td><td>" + (indexPartSumAry[0]) + "</td><td>" + (indexPartSumAry[1]) + "</td><td>" + (indexPartSumAry[2]) + "</td><td>" + (indexPartSumAry[3]) + "</td><td>" + (indexPartSumAry[4]) + "</td><td>" + (indexPartSumAry[5]) + "</td><td>" + (indexPartSumAry[6]) + "</td><td>" + (indexPartSumAry[7]) + "</td><td>" + (indexPartSumAry[8]) + "</td><td>" + (indexPartSumAry[9]) + "</td></tr>";
    html += "<tr><td>和值尾数</td><td>" + (sumAry[0] % 10) + "</td><td>" + (sumAry[1] % 10) + "</td><td>" + (sumAry[2] % 10) + "</td><td>" + (sumAry[3] % 10) + "</td><td>" + (sumAry[4] % 10) + "</td><td>" + (sumAry[5] % 10) + "</td><td>" + (sumAry[6] % 10) + "</td><td>" + (sumAry[7] % 10) + "</td><td>" + (sumAry[8] % 10) + "</td><td>" + (sumAry[9] % 10) + "</td></tr>";
    $("Container10Trend").innerHTML = html;
    parent.InitIframeHeight(parent.BetMenu.CurrentObj.Menu.childMenus[parseInt(parent.BetMenu.CurrentObj.Menu.getAttribute("index"), 10)].Iframe, 0);
}

function Event_UpdateData_LengRe() {
    ///<summary>更新冷热数据</summary>
}