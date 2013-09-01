/// <reference path="~/JS/NoUse/JScript.js" />
TKCPCEO.Math = {
    C: function (r, n) {
        ///<summary>取C值</summary>
        ///<param name="r">上角标</param>
        ///<param name="n">下角标</param>
        if (n == 0 || r == 0) return 0;
        if (r > n) return 0;
        var iUp = 1;
        for (var i = 1; i <= n; i++) { iUp = i * iUp; }
        var iDown = 1;
        for (var i = 1; i <= r; i++) { iDown = i * iDown; }
        for (var i = 1; i <= (n - r); i++) { iDown = i * iDown; }
        var iRet = iUp / iDown;
        return Math.round(iRet);
    },
    P: function (r, n) {//取P值
        if (n == 0 || r == 0) return 0;
        var iUp = 1;
        for (var i = 1; i <= n; i++) { iUp = i * iUp; }
        var iDown = 1;
        for (var i = 1; i <= (n - r); i++) { iDown = i * iDown; }
        var iRet = iUp / iDown;
        return iRet;
    },
    listC: function (arr, num) {
        ///<summary>组合数组</summary>
        ///<param name="arr">数组</param>
        ///<param name="num">组合数量</param>
        var r = [];
        (function f(t, a, n) {
            if (n == 0) return r.push(t);
            for (var i = 0, l = a.length; i <= l - n; i++) {
                f(t.concat(a[i]), a.slice(i + 1), n - 1);
            }
        })([], arr, num);
        return r;
    }
}



TKCPCEO.Bet.Tickets = function () {
    ///<summary>
    ///票数据
    ///</summary>
    ///<field name="PlayType">玩法</field>
    ///<field name="AnteCode">投注号码</field>
    ///<field name="Money">票金额</field>
    ///<field name="BetMethod">选号方式</field>
}
TKCPCEO.Bet.Tickets.prototype = {
    PlayType: -1,
    AnteCode: "",
    Money: 0,
    BetMethod: -1
}


TKCPCEO.Bet.Issues = function () {
    ///<summary>
    ///期号列表
    ///</summary>
    ///<field name="IssueNumber">期号</field>
    ///<field name="Multiply">倍数</field>
}
TKCPCEO.Bet.Issues.prototype = {
    IssueNumber: "",
    Multiply: 0
}


TKCPCEO.Bet.UninProject = function () {
    ///<summary>
    ///合买方案信息
    ///</summary>
    ///<field name="MyMoney">我入股的金额</field>
    ///<field name="BookMoney">保底金额</field>
    ///<field name="BonusCommision">盈利佣金百分比</field>
    ///<field name="PublicType">公开内容</field>
    ///<field name="JoinPassword">入股口令</field>
}
TKCPCEO.Bet.UninProject.prototype = {
    MyMoney: 0,
    BookMoney: 0,
    BonusCommision: 0,
    PublicType: -1,
    JoinPassword: ""
}


TKCPCEO.Bet.JsonCmdProject = function () {
    ///<summary>
    ///投注方案信息
    ///</summary>
    ///<field name="LotteryType">彩种</field>
    ///<field name="TicketList">票数据列表</field>
    ///<field name="Filters">过滤条件 各个彩种的FilterType枚举,多个条件逗号隔开,例:1,2,3</field>
    ///<field name="IssueList">期号列表</field>
    ///<field name="ProScheme">方案类型:ProjectScheme枚举</field>
    ///<field name="UninPro">合买方案信息</field>
    ///<field name="TotalMoney">方案总金额</field>
    ///<field name="TotalBetCount">方案总注数</field>
    ///<field name="BonusStop">是否中奖即停止</field>
    this.LotteryType = -1;
    this.TicketList = [];
    this.Filters = "";
    this.IssueList = [];
    this.ProScheme = -1;
    this.UninPro = new TKCPCEO.Bet.UninProject();
    this.TotalMoney = 0;
    this.TotalBetCount = 0;
    this.BonusStop = false;
    this.ShouldBonusStop = true;
}
TKCPCEO.Bet.JsonCmdProject.prototype = {
    LotteryType: -1,
    TicketList: [],
    Filters: "",
    IssueList: [],
    ProScheme: -1,
    UninPro: new TKCPCEO.Bet.UninProject(),
    TotalMoney: 0,
    TotalBetCount: 0,
    BonusStop: false,
    ShouldBonusStop: true,
    toString: function () {
        ///<summary>JSON序列化</summary>
        return JSON.stringify(this);
    }
}

function JsonCmdProjectFilter(jsonCmdProject) {
    ///<summary>投注内容过滤【重庆时时彩一星、十一运夺金任选一“复式”实用倍投工具、计算利润、金额的问题】</summary>
    var out = new TKCPCEO.Bet.JsonCmdProject();
    out.LotteryType = jsonCmdProject.LotteryType;
    out.Filters = jsonCmdProject.Filters;
    out.ProScheme = jsonCmdProject.ProScheme;
    out.TotalMoney = jsonCmdProject.TotalMoney;
    out.TotalBetCount = jsonCmdProject.TotalBetCount;
    out.BonusStop = jsonCmdProject.BonusStop;
    out.ShouldBonusStop = jsonCmdProject.ShouldBonusStop;
    out.UninPro.MyMoney = jsonCmdProject.UninPro.MyMoney;
    out.UninPro.BookMoney = jsonCmdProject.UninPro.BookMoney;
    out.UninPro.BonusCommision = jsonCmdProject.UninPro.BonusCommision;
    out.UninPro.PublicType = jsonCmdProject.UninPro.PublicType;
    out.UninPro.JoinPassword = jsonCmdProject.UninPro.JoinPassword;
    for (var i = 0; i < jsonCmdProject.IssueList.length; i++) {
        var issue = new TKCPCEO.Bet.Issues();
        issue.IssueNumber = jsonCmdProject.IssueList[i].IssueNumber;
        issue.Multiply = jsonCmdProject.IssueList[i].Multiply;
        out.IssueList.push(issue);
    }
    for (var i = 0; i < jsonCmdProject.TicketList.length; i++) {
        ///十一运夺金任选一复式
        //#region
        if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TC11C5 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan1) {///十一运夺金任选一复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.split(",");
            var money = jsonCmdProject.TicketList[i].Money / anteAry.length;
            for (var j = 0; j < anteAry.length; j++) {
                var ticket = new TKCPCEO.Bet.Tickets();
                ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                ticket.AnteCode = anteAry[j];
                ticket.Money = money;
                ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                out.TicketList.push(ticket);
            }
            //#endregion
            ///十一运夺金前三直选复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TC11C5 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.ZhiXuanFront3) {///十一运夺金前三直选复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.split("|");
            var ante0 = anteAry[0].split(",");
            var ante1 = anteAry[1].split(",");
            var ante2 = anteAry[2].split(",");
            for (var x = 0; x < ante0.length; x++) {
                for (var y = 0; y < ante1.length; y++) {
                    for (var z = 0; z < ante2.length; z++) {
                        if (ante0[x] == ante1[y] || ante0[x] == ante2[z] || ante1[y] == ante2[z]) {
                            continue;
                        } else {
                            var ticket = new TKCPCEO.Bet.Tickets();
                            ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                            ticket.AnteCode = ante0[x] + "|" + ante1[y] + "|" + ante2[z];
                            ticket.Money = 2;
                            ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                            //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                            out.TicketList.push(ticket);
                        }
                    }
                }
            }
            //#endregion
            ///江西11选5前三直选复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCDLC && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront3_DWFS) {///江西11选5前三直选复式
            var frontPL = jsonCmdProject.TicketList[i].AnteCode.toString().split("|")[0];
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.toString().split("|")[1].split(",");
            var ante0 = anteAry[0].split(" ");
            var ante1 = anteAry[1].split(" ");
            var ante2 = anteAry[2].split(" ");
            if (ante0.concat(ante1, ante2).hasRepeat()) {
                for (var x = 0; x < ante0.length; x++) {
                    for (var y = 0; y < ante1.length; y++) {
                        for (var z = 0; z < ante2.length; z++) {
                            if (ante0[x] == ante1[y] || ante0[x] == ante2[z] || ante1[y] == ante2[z]) {
                                continue;
                            } else {
                                var ticket = new TKCPCEO.Bet.Tickets();
                                ticket.PlayType = TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront3_DS;
                                ticket.AnteCode = frontPL + "|" + ante0[x] + "," + ante1[y] + "," + ante2[z];
                                ticket.Money = 2;
                                ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                                //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                                out.TicketList.push(ticket);
                            }
                        }
                    }
                }
            } else {
                out.TicketList.push(jsonCmdProject.TicketList[i]);
            }
            //#endregion
            ///广东11选5前三直选复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCGD11 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront3_DWFS && jsonCmdProject.TicketList[i].Money == 2) {///广东11选5前三直选复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.toString().split("|");
            var ante0 = anteAry[0].split(",");
            var ante1 = anteAry[1].split(",");
            var ante2 = anteAry[2].split(",");
            if (ante0.concat(ante1, ante2).hasRepeat()) {
                for (var x = 0; x < ante0.length; x++) {
                    for (var y = 0; y < ante1.length; y++) {
                        for (var z = 0; z < ante2.length; z++) {
                            if (ante0[x] == ante1[y] || ante0[x] == ante2[z] || ante1[y] == ante2[z]) {
                                continue;
                            } else {
                                var ticket = new TKCPCEO.Bet.Tickets();
                                ticket.PlayType = TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront3_DS;
                                ticket.AnteCode = ante0[x] + "|" + ante1[y] + "|" + ante2[z];
                                ticket.Money = 2;
                                ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                                //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                                out.TicketList.push(ticket);
                            }
                        }
                    }
                }
            } else {
                out.TicketList.push(jsonCmdProject.TicketList[i]);
            }
            //#endregion
            ///广东快乐十分选三前直复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCGDKL10 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.FCGDKL10.PlayType.X3_QianZhi_FS) {///广东快乐十分选三前直复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.toString().split("|");
            var ante0 = anteAry[0].split(",");
            var ante1 = anteAry[1].split(",");
            var ante2 = anteAry[2].split(",");
            for (var x = 0; x < ante0.length; x++) {
                for (var y = 0; y < ante1.length; y++) {
                    for (var z = 0; z < ante2.length; z++) {
                        if (ante0[x] == ante1[y] || ante0[x] == ante2[z] || ante1[y] == ante2[z]) {
                            continue;
                        } else {
                            var ticket = new TKCPCEO.Bet.Tickets();
                            ticket.PlayType = TKCPCEO.Enum.prototype.Lottery.Speed.FCGDKL10.PlayType.X3_QianZhi_DS;
                            ticket.AnteCode = ante0[x] + "," + ante1[y] + "," + ante2[z];
                            ticket.Money = 2;
                            ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                            //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                            out.TicketList.push(ticket);
                        }
                    }
                }
            }
            //#endregion
            ///十一运夺金前二直选复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TC11C5 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.ZhiXuanFront2) {///十一运夺金前二直选复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.split("|");
            var ante0 = anteAry[0].split(",");
            var ante1 = anteAry[1].split(",");
            for (var x = 0; x < ante0.length; x++) {
                for (var y = 0; y < ante1.length; y++) {
                    if (ante0[x] == ante1[y]) {
                        continue;
                    } else {
                        var ticket = new TKCPCEO.Bet.Tickets();
                        ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                        ticket.AnteCode = ante0[x] + "|" + ante1[y];
                        ticket.Money = 2;
                        ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                        //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                        out.TicketList.push(ticket);
                    }
                }
            }
            //#endregion
            ///江西11选5前二直选复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCDLC && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront2_DWFS) {///江西11选5前二直选复式
            var frontPL = jsonCmdProject.TicketList[i].AnteCode.toString().split("|")[0];
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.toString().split("|")[1].split(",");
            var ante0 = anteAry[0].split(" ");
            var ante1 = anteAry[1].split(" ");
            if (ante0.concat(ante1).hasRepeat()) {
                for (var x = 0; x < ante0.length; x++) {
                    for (var y = 0; y < ante1.length; y++) {
                        if (ante0[x] == ante1[y]) {
                            continue;
                        } else {
                            var ticket = new TKCPCEO.Bet.Tickets();
                            ticket.PlayType = TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront2_DS;
                            ticket.AnteCode = frontPL + "|" + ante0[x] + "," + ante1[y];
                            ticket.Money = 2;
                            ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                            //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                            out.TicketList.push(ticket);
                        }
                    }
                }
            } else {
                out.TicketList.push(jsonCmdProject.TicketList[i]);
            }
            //#endregion
            ///广东11选5前二直选复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCGD11 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront2_DWFS && jsonCmdProject.TicketList[i].Money == 2) {///广东11选5前二直选复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.toString().split("|");
            var ante0 = anteAry[0].split(",");
            var ante1 = anteAry[1].split(",");
            if (ante0.concat(ante1).hasRepeat()) {
                for (var x = 0; x < ante0.length; x++) {
                    for (var y = 0; y < ante1.length; y++) {
                        if (ante0[x] == ante1[y]) {
                            continue;
                        } else {
                            var ticket = new TKCPCEO.Bet.Tickets();
                            ticket.PlayType = TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront2_DS;
                            ticket.AnteCode = ante0[x] + "|" + ante1[y];
                            ticket.Money = 2;
                            ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                            //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                            out.TicketList.push(ticket);
                        }
                    }
                }
            } else {
                out.TicketList.push(jsonCmdProject.TicketList[i]);
            }
            //#endregion
            ///广东快乐十分选二连直复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCGDKL10 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.FCGDKL10.PlayType.X2_LianZhi_FS) {///广东11选5前二直选复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.toString().split("|");
            var ante0 = anteAry[0].split(",");
            var ante1 = anteAry[1].split(",");
            for (var x = 0; x < ante0.length; x++) {
                for (var y = 0; y < ante1.length; y++) {
                    if (ante0[x] == ante1[y]) {
                        continue;
                    } else {
                        var ticket = new TKCPCEO.Bet.Tickets();
                        ticket.PlayType = TKCPCEO.Enum.prototype.Lottery.Speed.FCGDKL10.PlayType.X2_LianZhi_DS;
                        ticket.AnteCode = ante0[x] + "," + ante1[y];
                        ticket.Money = 2;
                        ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                        //                            alert(ticket.PlayType + "\n" + ticket.AnteCode + "\n" + ticket.BetMethod);
                        out.TicketList.push(ticket);
                    }
                }
            }
            //#endregion
            ///广西快乐十分好运特复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCGXKL10 && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.FCGXKL10.PlayType.ZhiXuan_HY_T_DS) {///广西快乐十分好运特复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.split(",");
            var money = jsonCmdProject.TicketList[i].Money / anteAry.length;
            for (var j = 0; j < anteAry.length; j++) {
                var ticket = new TKCPCEO.Bet.Tickets();
                ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                ticket.AnteCode = anteAry[j];
                ticket.Money = money;
                ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                out.TicketList.push(ticket);
            }
            //#endregion
            ///时时彩一星复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCCQSSC && jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s1DanShi) {///时时彩一星复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.split(",");
            var money = jsonCmdProject.TicketList[i].Money / anteAry.length;
            for (var j = 0; j < anteAry.length; j++) {
                var ticket = new TKCPCEO.Bet.Tickets();
                ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                ticket.AnteCode = "_,_,_,_," + anteAry[j];
                ticket.Money = money;
                ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                out.TicketList.push(ticket);
            }
            //#endregion
            ///时时乐组3组6复式
            //#region
        } else if (out.LotteryType == TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCSHSSL && ((jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.FCSHSSL.PlayType.zuxuan3 && jsonCmdProject.TicketList[i].AnteCode.split(",").length >= 2) || (jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.FCSHSSL.PlayType.zuxuan6 && jsonCmdProject.TicketList[i].AnteCode.split(",").length > 3))) {///时时乐组3组6复式
            var anteAry = jsonCmdProject.TicketList[i].AnteCode.split(",");
            var money = jsonCmdProject.TicketList[i].Money;
            var newAnteAry = new Array();
            if (jsonCmdProject.TicketList[i].PlayType == TKCPCEO.Enum.prototype.Lottery.Speed.FCSHSSL.PlayType.zuxuan3) {
                if (anteAry.length == 3 && (anteAry[0] == anteAry[1] || anteAry[0] == anteAry[2] || anteAry[1] == anteAry[2])) {
                    var ticket = new TKCPCEO.Bet.Tickets();
                    ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                    ticket.AnteCode = jsonCmdProject.TicketList[i].AnteCode;
                    ticket.Money = jsonCmdProject.TicketList[i].Money;
                    ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                    out.TicketList.push(ticket);
                } else {
                    money = money / (TKCPCEO.Math.C(1, anteAry.length) * (anteAry.length - 1));
                    newAnteAry = TKCPCEO.Math.listC(anteAry, 2);
                    for (var j = 0; j < newAnteAry.length; j++) {
                        for (var x = 0; x < 2; x++) {
                            var ticket = new TKCPCEO.Bet.Tickets();
                            ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                            ticket.AnteCode = newAnteAry[j][x].toString() + "," + newAnteAry[j][x].toString() + "," + newAnteAry[j][1 - x].toString();
                            ticket.Money = money;
                            ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                            out.TicketList.push(ticket);
                        }
                    }
                }
            } else {
                money = money / TKCPCEO.Math.C(3, anteAry.length);
                newAnteAry = TKCPCEO.Math.listC(anteAry, 3);
                for (var j = 0; j < newAnteAry.length; j++) {
                    var ticket = new TKCPCEO.Bet.Tickets();
                    ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
                    ticket.AnteCode = newAnteAry[j].toString();
                    ticket.Money = money;
                    ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
                    out.TicketList.push(ticket);
                }
            }
            //#endregion
        } else {
            var ticket = new TKCPCEO.Bet.Tickets();
            ticket.PlayType = jsonCmdProject.TicketList[i].PlayType;
            ticket.AnteCode = jsonCmdProject.TicketList[i].AnteCode;
            ticket.Money = jsonCmdProject.TicketList[i].Money;
            ticket.BetMethod = jsonCmdProject.TicketList[i].BetMethod;
            out.TicketList.push(ticket);
        }
    }
    return out;
}


function AddSuggestionButton() {
    try {
        var cnn = $("cnn");
        var container = cnn.parentNode.parentNode.parentNode;
        var span = document.createElement("span");
        span.className = "advice";
        var suggestionLink = document.createElement("a");
        suggestionLink.href = "/Help/GuestFeedBack.aspx";
        suggestionLink.target = "_blank";
        suggestionLink.innerHTML = "我要提建议";
        span.appendChild(suggestionLink);
        container.appendChild(span);
    } catch (e) { }
}
if (document.all) {
    window.attachEvent("onload", AddSuggestionButton);
} else {
    window.addEventListener("load", AddSuggestionButton, false);
}


function TryPlayMaskShowDisplay(lotteryTypeString) {
    try {
        var MaskContainer = $("MaskContainer");
        var TipMessageContainer = $("TipMessageContainer");
        if (MaskContainer == null) {
            MaskContainer = document.createElement("div");
            MaskContainer.className = "promptDiv";
            MaskContainer.style.display = "none";
            MaskContainer.id = "MaskContainer";

            MaskContainer.style.cssText = "position:fixed!important;position:absolute;width:100%;height:100%;_height:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight);text-align:center;top:0;*top:0;_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? document.documentElement.scrollTop : document.body.scrollTop);z-index:11111;background-color:#000;/*efe*/filter:alpha(opacity=90);/*IE*/opacity:0.8;/*FF*/ display:none; ";
            document.body.appendChild(MaskContainer);

            TipMessageContainer = document.createElement("div");
            TipMessageContainer.className = "popout";
            TipMessageContainer.id = "TipMessageContainer";
            TipMessageContainer.style.cssText = "filter:alpha(opacity=100);/*IE*/opacity:1.0;/*FF*/position:fixed!important;position:absolute;z-index:99999;;text-align:center;top:250px;*top:250px;_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? document.documentElement.scrollTop + 250 : document.body.scrollTop + 250);left:50%;margin-left:-234px;display:inline;float:left;width:465px;background:#fff;border:12px solid #ffee31;color:#333; display:none;";
            TipMessageContainer.innerHTML = "<div class=\"popin\" style=\" padding:15px 0;\"><div class=\"thead\" style=\"display:inline;float:left;width:100%;margin-bottom:15px;padding-bottom:4px;border-bottom:1px solid #ffe3a6;font-size:14px;font-weight:bold;\">" + lotteryTypeString + "试运行</div><div><div class=\"ins\"><p>时时彩网会员使用" + lotteryTypeString + "投注服务须先提交申请</p><p style=\"text-align:center;\"><a href=\"/play/vip.aspx\" style=\"color:#f00;\">点击申请</a></p></div></div></div>";
            document.body.appendChild(TipMessageContainer);
        }
        MaskContainer.style.display = MaskContainer.style.display == "none" ? "" : "none";
        TipMessageContainer.style.display = TipMessageContainer.style.display == "none" ? "" : "none";
    }
    catch (e) { }
}


function checkComputeEnabledByLottery(lotteryType, ticketList) {
    var retR = { EnableComputeMoney: true, BonusMoney: 0 };
    var selectedBallCount = 0;
    switch (lotteryType) {
        //#region   重庆时时彩       
        case TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCCQSSC:
            if (ticketList.length != 1) {
                retR.EnableComputeMoney = false;
                return retR;
            }
            switch (ticketList[0].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s1DanShi:
                    retR.BonusMoney = 10;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuHe:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2HeZhi:
                    retR.BonusMoney = 100;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3ZuHe:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3HeZhi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3ZhiXuanZuHeFuShi:
                    retR.BonusMoney = 1000;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s5ZuHe:
                    retR.BonusMoney = 100000;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.sDXDS:
                    retR.BonusMoney = 4;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuXuanDanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuXuanFuShi:
                    retR.BonusMoney = 50;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3Zu3DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3Zu3FuShi:
                    retR.BonusMoney = 320;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3Zu6DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3Zu6FuShi:
                    retR.BonusMoney = 160;
                    break;
                //#region       
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3ZuXuanBaoDan:
                    retR.BonusMoney = 160;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s3ZuXuanBaoDian:
                    retR.BonusMoney = 160;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuXuanBaoDan:
                    retR.BonusMoney = 50;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.s2ZuXuanHeZhi:
                    retR.BonusMoney = 50;
                    break;
                //#endregion         
                default:
                    retR.EnableComputeMoney = false;
                    break;
            }
            break;
        //#endregion        

        //#region   江西时时彩      
        case TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCJXSSC:
            if (ticketList.length != 1) {
                retR.EnableComputeMoney = false;
                return retR;
            }
            switch (ticketList[0].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s1DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s1ZuHe:
                    retR.BonusMoney = 11;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s2DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s2ZuHe:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s2HeZhi:
                    retR.BonusMoney = 116
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s3DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s3ZuHe:
                    retR.BonusMoney = 1160;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s5DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s5ZuHe:
                    retR.BonusMoney = 116000;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.sDXDS:
                    retR.BonusMoney = 4;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s2ZuXuanDanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s2ZuXuanFuShi:
                    retR.BonusMoney = 58;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s4DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s4ZuHe:
                    retR.BonusMoney = 10000;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan1_gewei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan1_shiwei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan1_baiwei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan1_qianwei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan1_wanwei:
                    retR.BonusMoney = 11;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s3Zu3DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s3Zu3FuShi:
                    retR.BonusMoney = 385;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s3Zu6DanShi:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s3Zu6FuShi:
                    retR.BonusMoney = 190;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_34wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_24wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_14wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_04wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_23wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_13wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_03wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_12wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_02wei:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.renxuan2_01wei:
                    retR.BonusMoney = 116;
                    break;
                //#region      
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s2ZuXuanHeZhi:
                    retR.BonusMoney = 58;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCJXSSC.PlayType.s2ZuXuanBaoDan:
                    retR.BonusMoney = 58;
                    break;
                //#endregion       
                default:
                    retR.EnableComputeMoney = false;
                    break;
            }
            break;
        //#endregion         

        //#region   天津时时彩      
        case TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCTJSSC:
            if (ticketList.length != 1) {
                retR.EnableComputeMoney = false;
                return retR;
            }
            switch (ticketList[0].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.dxds:
                    retR.BonusMoney = 4;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing1:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.renxuan1:
                    retR.BonusMoney = 10;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing2:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.renxuan2:
                    retR.BonusMoney = 98;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing3:
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.renxuan3:
                    retR.BonusMoney = 980;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing4:
                    retR.BonusMoney = 9800;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing5:
                    retR.BonusMoney = 98000;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing2_fuxuan:
                    retR.BonusMoney = 98 + 10;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing3_fuxuan:
                    retR.BonusMoney = 980 + 98 + 10;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing4_fuxuan:
                    retR.BonusMoney = 9800 + 980 + 98 + 10;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing5_fuxuan:
                    retR.BonusMoney = 98000 + 9800 + 980 + 98 + 10;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing5_tongxuan:
                    retR.BonusMoney = 20000;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing2_zuxuan:
                    retR.BonusMoney = 48;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing2_quwei:
                    retR.BonusMoney = 180;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing2_qujian:
                    retR.BonusMoney = 480;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing3_zu3:
                    retR.BonusMoney = 320;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.FCTJSSC.PlayType.xing3_zu6:
                    retR.BonusMoney = 160;
                    break;
                default:
                    retR.EnableComputeMoney = false;
                    break;
            }
            break;
        //#endregion      

        //#region   山东11选5       
        case TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TC11C5:
            if (ticketList.length != 1) {
                retR.EnableComputeMoney = false;
                return retR;
            }
            selectedBallCount = ticketList[0].AnteCode.split(",").length;
            switch (ticketList[0].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan1:
                    retR.BonusMoney = 13;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan2:
                    retR.BonusMoney = 6;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan3:
                    retR.BonusMoney = 19;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan4:
                    retR.BonusMoney = 78;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan5:
                    retR.BonusMoney = 540;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan6:
                    retR.BonusMoney = 90;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((6 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan7:
                    retR.BonusMoney = 26;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((7 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.RenXuan8:
                    retR.BonusMoney = 9;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((8 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.ZhiXuanFront2:
                    retR.BonusMoney = 130;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.ZhiXuanFront3:
                    retR.BonusMoney = 1170;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.ZuXuanFront2:
                    retR.BonusMoney = 65;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCD11.PlayType.ZuXuanFront3:
                    retR.BonusMoney = 195;
                    break;
                default:
                    retR.EnableComputeMoney = false;
                    break;
            }
            break;
        //#endregion        

        //#region   江西11选5      
        case TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCDLC:
            if (ticketList.length != 1) {
                retR.EnableComputeMoney = false;
                return retR;
            }
            selectedBallCount = ticketList[0].AnteCode.split("|")[1].split(" ").length;
            switch (ticketList[0].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan1_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan1_FS:
                    retR.BonusMoney = 13;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan2_FS:
                    retR.BonusMoney = 6;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan3_FS:
                    retR.BonusMoney = 19;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan4_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan4_FS:
                    retR.BonusMoney = 78;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan5_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan5_FS:
                    retR.BonusMoney = 540;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan6_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan6_FS:
                    retR.BonusMoney = 90;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((6 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan7_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan7_FS:
                    retR.BonusMoney = 26;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((7 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan8_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.RenXuan8_FS:
                    retR.BonusMoney = 9;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((8 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront2_DWFS:
                    retR.BonusMoney = 130;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZhiXuanFront3_DWFS:
                    retR.BonusMoney = 1170;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZuXuanFront2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZuXuanFront2_FS:
                    retR.BonusMoney = 65;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZuXuanFront3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCDLC.PlayType.ZuXuanFront3_FS:
                    retR.BonusMoney = 195;
                    break;
                default:
                    retR.EnableComputeMoney = false;
                    break;
            }
            break;
        //#endregion         

        //#region   广东11选5      
        case TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCGD11:
            if (ticketList.length != 1) {
                retR.EnableComputeMoney = false;
                return retR;
            }
            selectedBallCount = ticketList[0].AnteCode.split(",").length;
            switch (ticketList[0].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan1_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan1_FS:
                    retR.BonusMoney = 13;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan2_FS:
                    retR.BonusMoney = 6;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan3_FS:
                    retR.BonusMoney = 19;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan4_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan4_FS:
                    retR.BonusMoney = 78;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan5_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan5_FS:
                    retR.BonusMoney = 540;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan6_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan6_FS:
                    retR.BonusMoney = 90;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((6 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan7_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan7_FS:
                    retR.BonusMoney = 26;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((7 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan8_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.RenXuan8_FS:
                    retR.BonusMoney = 9;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((8 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront2_DWFS:
                    retR.BonusMoney = 130;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZhiXuanFront3_DWFS:
                    retR.BonusMoney = 1170;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZuXuanFront2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZuXuanFront2_FS:
                    retR.BonusMoney = 65;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZuXuanFront3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCGD11.PlayType.ZuXuanFront3_FS:
                    retR.BonusMoney = 195;
                    break;
                default:
                    retR.EnableComputeMoney = false;
                    break;
            }
            break;
        //#endregion        

        //#region   重庆11选5       
        case TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCCQ11:
            if (ticketList.length != 1) {
                retR.EnableComputeMoney = false;
                return retR;
            }
            selectedBallCount = ticketList[0].AnteCode.split(",").length;
            switch (ticketList[0].PlayType) {
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan1_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan1_FS:
                    retR.BonusMoney = 13;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan2_FS:
                    retR.BonusMoney = 6;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan3_FS:
                    retR.BonusMoney = 19;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan4_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan4_FS:
                    retR.BonusMoney = 78;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan5_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan5_FS:
                    retR.BonusMoney = 540;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan6_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan6_FS:
                    retR.BonusMoney = 90;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((6 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan7_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan7_FS:
                    retR.BonusMoney = 26;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((7 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan8_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.RenXuan8_FS:
                    retR.BonusMoney = 9;
                    retR.BonusMoney = retR.BonusMoney * TKCPCEO.Math.C((8 - 5), (selectedBallCount - 5));
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZhiXuanFront2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZhiXuanFront2_DWFS:
                    retR.BonusMoney = 130;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZhiXuanFront3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZhiXuanFront3_DWFS:
                    retR.BonusMoney = 1170;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZuXuanFront2_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZuXuanFront2_FS:
                    retR.BonusMoney = 65;
                    break;
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZuXuanFront3_DS:
                case TKCPCEO.Enum.prototype.Lottery.Speed.TCCQ11.PlayType.ZuXuanFront3_FS:
                    retR.BonusMoney = 195;
                    break;
                default:
                    retR.EnableComputeMoney = false;
                    break;
            }
            break;
        //#endregion       
    }
    return retR;
}