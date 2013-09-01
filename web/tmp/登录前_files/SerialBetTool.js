/// <reference path="~/JS/NoUse/JScript.js" />
//**********************以为下为调用示例**********************
//var tool = new TKCPCEO.Lottery.Speed.SerialBetTool();
//tool.TicketBuyMoney = 2; //票购买金额
//tool.OriginalMultiple = 1; //起始倍数
//tool.BonusMoney = 1000; //单票中奖金额
//tool.ProjectType = 1; //方案类型：1=全程利润比率；2=两步利利润比率；3=全程利润金额；4=两步利润金额；
//tool.AllProfitsRate = 0.5; //全程利润比率
//tool.AllProfitsMoney = 100; //全程利润金额
//tool.AllIssueCount = 20; //总投注期数
//tool.SplitIssueCount = 10; //分隔投注期数
//tool.ForepartProfitsRate = 0.5; //前面部分利润比率
//tool.AfterpartProfitsRate = 0.6; //后面部分利润比率
//tool.ForepartProfitsMoney = 1000; //前面部分利润金额
//tool.AfterpartProfitsMoney = 3000; //后面部分利润金额
//var listResult = [new TKCPCEO.Lottery.Speed.SerialBetModel()];
//listResult = tool.Count();
//var html = "";
//if (listResult != null) {
//    html += "<table border=\"1\" bordercolor=\"#808080\"><tr><td>索引</td><td>倍数</td><td>当期购买</td><td>累计投入</td><td>当期奖金</td><td>合计利润</td><td>利润率</td></tr>";
//    for (var i = 0; i < listResult.length; i++) {
//        var model = new TKCPCEO.Lottery.Speed.SerialBetModel();
//        model = listResult[i];

//        html += "<tr><td>" + i + "</td>";
//        html += "<td>" + model.Multiple + "</td>";
//        html += "<td>" + model.CurrentBuyMoney + "</td>";
//        html += "<td>" + model.AllBuyMoney + "</td>";
//        html += "<td>" + model.BonusMoney + "</td>";
//        html += "<td>" + model.ProfitsMoney + "</td>";
//        html += "<td>" + model.ProfitsRate + "</td></tr>";
//    }
//    html += "</table>";
//}
//html += tool.ErrorMessage;
//$("divHtml").innerHTML = html;
//**********************调用示例结束**********************
TKCPCEO.Lottery.Speed.SerialBetTool = function() {
    ///<summary>追号倍投计算工具</summary>
    ///<field name="OriginalMultiple">int：起始倍数</field>
    ///<field name="TicketBuyMoney">int：单倍票购买金额</field>
    ///<field name="BonusMoney">int：单票中奖金额</field>
    ///<field name="ProjectType">int：方案类型：1=全程利润比率；2=两步利利润比率；3=全程利润金额；4=两步利润金额；</field>
    ///<field name="AllProfitsRate">float：全程利润比率</field>
    ///<field name="AllProfitsMoney">int：全程利润金额</field>
    ///<field name="AllIssueCount">int：总投注期数</field>
    ///<field name="SplitIssueCount">int：分隔投注期数</field>
    ///<field name="ForepartProfitsRate">float：前面部分利润比率</field>
    ///<field name="AfterpartProfitsRate">float：后面部分利润比率</field>
    ///<field name="ForepartProfitsMoney">int：前面部分利润金额</field>
    ///<field name="AfterpartProfitsMoney">int：后面部分利润金额</field>
///<field name="ErrorMessage">string：错误信息</field>
///<field name="TimeOut">int：超时秒数</field>
this.construct.apply(this, arguments);
    this.construct.bind(this);
}

TKCPCEO.Lottery.Speed.SerialBetTool.prototype = {
    TicketBuyMoney: 2,
    OriginalMultiple: 1,
    BonusMoney: 1000,
    ProjectType: 1,
    AllProfitsRate: 0.5,
    AllProfitsMoney: 100,
    AllIssueCount: 20,
    SplitIssueCount: 10,
    ForepartProfitsRate: 0.5,
    AfterpartProfitsRate: 0.6,
    ForepartProfitsMoney: 1000,
    AfterpartProfitsMoney: 3000,
    ErrorMessage: "",
    TimeOut: 5,
    construct: function() {
        ///<summary>构造函数</summary>
        this.TicketBuyMoney = 2;
        this.OriginalMultiple = 1;
        this.BonusMoney = 1000;
        this.ProjectType = 1;
        this.AllProfitsRate = 0.5;
        this.AllProfitsMoney = 1000;
        this.AllIssueCount = 20;
        this.SplitIssueCount = 10;
        this.ForepartProfitsRate = 0.5;
        this.AfterpartProfitsRate = 0.6;
        this.ForepartProfitsMoney = 1000;
        this.AfterpartProfitsMoney = 3000;
        this.ErrorMessage = "";
        this.TimeOut = 5;
    },
    Count: function() {
        var listResult = [];
        var lastAllBuyMoney = 0; //上期累计购买总金额
        var lastMultiple = this.OriginalMultiple; //上期购买倍数
        for (var i = 0; i < this.AllIssueCount; i++) {
            //var tmpAllMoney = 0; //本期计算中的临时所有已经购买了的总金额
            var model = new TKCPCEO.Lottery.Speed.SerialBetModel();

            //检测配置是否可能实现
            model = new TKCPCEO.Lottery.Speed.SerialBetModel(lastMultiple, this.TicketBuyMoney, this.BonusMoney, lastAllBuyMoney);

            if (i == 0 && !this._CompareProfits(new TKCPCEO.Lottery.Speed.SerialBetModel(this.OriginalMultiple, this.TicketBuyMoney, this.BonusMoney, lastAllBuyMoney), i)) {
                this.ErrorMessage = "利润或利润率配置太高，无法实现方案。建议降低利润率。";
                return null;
            }

            //阶梯增加
            var step = 1;
            while (!this._CompareProfits(model, i)) {
                model = new TKCPCEO.Lottery.Speed.SerialBetModel(model.Multiple + step, this.TicketBuyMoney, this.BonusMoney, lastAllBuyMoney);
                step++;
            }

            if (i > 0) {
                //递减
                model = new TKCPCEO.Lottery.Speed.SerialBetModel(model.Multiple - 1, this.TicketBuyMoney, this.BonusMoney, lastAllBuyMoney);

                while (this._CompareProfits(model, i)) {
                    model = new TKCPCEO.Lottery.Speed.SerialBetModel(model.Multiple - 1, this.TicketBuyMoney, this.BonusMoney, lastAllBuyMoney);
                }
                model = new TKCPCEO.Lottery.Speed.SerialBetModel(model.Multiple + 1, this.TicketBuyMoney, this.BonusMoney, lastAllBuyMoney);
            }
            //替换上期数据
            lastAllBuyMoney = model.AllBuyMoney;
            lastMultiple = model.Multiple;

            //将结算结果添加到返回List中
            listResult[i] = model;

            if (model.AllBuyMoney > 10000000) { return listResult; }
        }
        return listResult;
    },
    _CompareProfits: function(model, index) {
        var blResult = true;
        switch (this.ProjectType) {
            //全程利润比率           
            case 1: blResult = model.ProfitsRate >= this.AllProfitsRate;
                break;
            //两步利利润比率            
            case 2:
                if (index < this.SplitIssueCount) { blResult = model.ProfitsRate >= this.ForepartProfitsRate; }
                else { blResult = model.ProfitsRate >= this.AfterpartProfitsRate; }
                break;
            //全程利润金额           
            case 3: blResult = model.ProfitsMoney >= this.AllProfitsMoney;
                break;
            //两步利润金额           
            case 4:
                if (index < this.SplitIssueCount) { blResult = model.ProfitsMoney >= this.ForepartProfitsMoney; }
                else { blResult = model.ProfitsMoney >= this.AfterpartProfitsMoney; }
                break;
        }
        return blResult;
    }
}

TKCPCEO.Lottery.Speed.SerialBetModel = function() {
    ///<summary>追号倍投结果模型</summary>
    ///<field name="Multiple">int：倍数</field>
    ///<field name="CurrentBuyMoney">int：当期购买金额</field>
    ///<field name="AllBuyMoney">int：累计购买金额</field>
    ///<field name="BonusMoney">int：当期中奖金额</field>
    ///<field name="ProfitsMoney">int：利润金额</field>
    ///<field name="ProfitsRate">int：利润比率</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.Lottery.Speed.SerialBetModel.prototype = {
    Multiple: 1,
    CurrentBuyMoney: 2,
    AllBuyMoney: 20,
    BonusMoney: 1000,
    ProfitsMoney: 500,
    ProfitsRate: 0.5,
    construct: function(multiple, ticketBuyMoney, ticketBounsMoney, lastAllBuyMoney) {
        ///<summary>构造函数</summary>
        this.Multiple = multiple;
        this.CurrentBuyMoney = this.Multiple * ticketBuyMoney;
        this.AllBuyMoney = this.CurrentBuyMoney + lastAllBuyMoney;
        this.BonusMoney = this.Multiple * ticketBounsMoney;
        this.ProfitsMoney = this.BonusMoney - this.AllBuyMoney;
        this.ProfitsRate = this.ProfitsMoney / this.AllBuyMoney;        
    }
}