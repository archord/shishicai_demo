var popoutImage = "ptn_popout_cq120";
function DateTime() {
    ///<summary>时间计时类</summary>
    ///<field name="ObjShowTime">需要显示输出时间内容的容器对象</field>
    ///<field name="ServerDateTime">服务器时间</field>
    ///<field name="EndDateTime">倒计时结束时间</field>
    ///<field name="IsAutoRun">是否自动运行</field>
    ///<field name="IsCountDown">是否倒计时</field>
    ///<field name="CountDownLeft">倒计时剩余时间</field>
    ///<field name="LastRunDateTime">上一次执行结束的时间</field>
    ///<field name="Frequency">运行频率</field>
    ///<field name="RunCount">执行次数</field>
    ///<field name="RunTime">从开始到当前执行总耗时(毫秒)</field>
    ///<field name="TimeSpanDelay">执行一次操作延迟的时间(毫秒)</field>
    ///<field name="TimeSpanError">平均执行耗时误差(毫秒)</field>
    this.constrcut.apply(this, arguments);
    this.constrcut.bind(this);
}

DateTime.prototype = {
    ObjShowTime: null,
    ServerDateTime: new Date(),
    EndDateTime: new Date(),
    IsAutoRun: true,
    IsCountDown: false,
    CountDownLeft: -1,
    LastRunDateTime: new Date(),
    Frequency: 1000,
    RunCount: 0,
    RunTime: 0,
    TimeSpanDelay: 0,
    TimeSpanError: 500,
    HasOutWin: false,
    IsBackground: false,
    DisposeRun: true,
    dispose: function() {
        this.DisposeRun = false;
    },
    countDownOver: function() {
        ///<summary>倒计时结束触发事件</summary>
    },
    datetimeMonitor: function() {
        try {
            if (this.ServerDateTime.getFullYear() == 2009 && this.ServerDateTime.getMonth() == 11 && (this.ServerDateTime.getDate() == 24 || this.ServerDateTime.getDate() == 25)) {
                popoutImage = "ptn_popout_christmas";
            } else {
                popoutImage = "ptn_popout_cq120";
            }
            var hasExe = Cookie.getCookie(cookieStr);
            if (hasExe != this.ServerDateTime.getFullYear() + "-" + this.ServerDateTime.getMonth() + "-" + this.ServerDateTime.getDate() && !this.HasOutWin) {
                if (this.ServerDateTime.getHours() >= 22 || this.ServerDateTime.getHours() <= 2) {
                    MSG1.rect(null, null, null, screen.height - 50);
                    MSG1.speed = 10;
                    MSG1.step = 5;
                    //MSG1.show();
                    this.HasOutWin = true;
                }
            }
        } catch (e) { }
    },
    outPut: function() {
        ///<summary>时间输出</summary>
        if (this.ObjShowTime != null) {
            if (this.IsCountDown == true) {
                var outPut = "";
                var CountMilliSeconds = this.EndDateTime.getTime() - this.ServerDateTime.getTime();
                var leftDays = parseInt(CountMilliSeconds / (1000 * 60 * 60 * 24), 10);
                var leftHours = parseInt(CountMilliSeconds / (1000 * 60 * 60), 10) - parseInt(leftDays * 24, 10);
                var leftMinutes = parseInt(CountMilliSeconds / (1000 * 60), 10) - parseInt(leftDays * 24 * 60 + leftHours * 60, 10);
                var leftSeconds = parseInt(CountMilliSeconds / 1000, 10) - parseInt(leftDays * 24 * 60 * 60 + leftHours * 60 * 60 + leftMinutes * 60, 10);

                outPut += leftHours >= 0 ? (leftHours <= 9 ? "0" + leftHours : leftHours) + ":" : "";
                outPut += leftMinutes >= 0 ? (leftMinutes <= 9 ? "0" + leftMinutes : leftMinutes) + ":" : "";
                outPut += leftSeconds >= 0 ? (leftSeconds <= 9 ? "0" + leftSeconds : leftSeconds) : "";

                //                outPut += leftDays > 0 ? leftDays + "天" : "";
                //                outPut += leftHours > 0 ? leftHours + "小时" : "";
                //                outPut += leftMinutes > 0 ? leftMinutes + "分" : "";
                //                outPut += leftSeconds > 0 ? leftSeconds + "秒" : "";
                this.ObjShowTime.innerHTML = outPut;
            } else {
                this.ObjShowTime.innerHTML = this.ServerDateTime.toStandardString();
                this.datetimeMonitor();
            }
        }
    },
    runLoop: function() {
        var thisObj = this;
        if (this.DisposeRun) {
            setTimeout(function() {
                thisObj.run();
            }, this.Frequency);
        }
    },
    run: function() {
        ///<summary>执行时间运算</summary>
        if (this.LastRunDateTime == null) {
            this.LastRunDateTime = new Date();
            this.LastRunDateTime.setMilliseconds(this.LastRunDateTime.getMilliseconds() - this.Frequency);

            this.RunCount = 1;
            this.RunTime = this.Frequency;
        }

        var averageRunTime = this.RunTime / this.RunCount;
        var currentTime = new Date();
        this.TimeSpanDelay = currentTime.getTime() - this.LastRunDateTime.getTime();
        this.LastRunDateTime = currentTime;
        if (Math.abs(this.TimeSpanDelay - averageRunTime) > (this.TimeSpanError * (this.Frequency / 1000))) {
            this.TimeSpanDelay = averageRunTime;
        }

        this.RunTime += this.TimeSpanDelay;
        this.RunCount += 1;

        this.ServerDateTime.setMilliseconds(this.ServerDateTime.getMilliseconds() + this.TimeSpanDelay);

        //        this.ObjShowTime.innerHTML = this.ServerDateTime.toString() + "<br />" + new Date().toString() + "<br />TimeSpanDelay:" + this.TimeSpanDelay.toString() + "<br />averageRunTime:" + averageRunTime + "<br />RunTime:" + this.RunTime + "<br />RunCount:" + this.RunCount + "<br />" + this.Frequency;

        if (this.IsCountDown == true) {
            this.CountDownLeft = this.EndDateTime.getTime() - this.ServerDateTime.getTime();
            if (this.CountDownLeft <= 0) {
                this.dispose();
                this.countDownOver();
                this.IsAutoRun = false; //不再显示输出
            }
        }

        if (this.IsAutoRun && !this.IsBackground) {
            this.outPut();
        }
        this.runLoop();
    },
    start: function() {
        ///<summary>开始执行</summary>
        if (this.ServerDateTime == null) {
            alert("请先初始化服务器时间");
            return;
        }
        if (this.IsCountDown == true && this.EndDateTime == null) {
            alert("请先输入倒计时结束时间");
            return;
        }
        this.runLoop();
    },
    constrcut: function() {
        ///<summary>构造函数</summary>
        this.ObjShowTime = null;
        this.ServerDateTime = null;
        this.EndDateTime = null;
        this.IsAutoRun = true;
        this.LastRunDateTime = null;
        this.Frequency = 1000;

        this.RunCount = 0;
        this.RunTime = 0;
        this.TimeSpanDelay = 0;
        this.TimeSpanError = 100;
    }
}














var cookieStr = "newwin";
var MSG1 = new CLASS_MSN_MESSAGE("newWinAd", 269, 135, "短消息提示：", "您有1封消息", "今天请我吃饭哈");
MSG1.autoHide = false;

function CLASS_MSN_MESSAGE(id, width, height, caption, title, message, target, action) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.message = message;
    this.target = target;
    this.action = action;
    this.width = width ? width : 200;
    this.height = height ? height : 120;
    this.timeout = 150;
    this.speed = 20;
    this.step = 1;
    this.right = screen.width - 1;
    this.bottom = screen.height;
    this.left = this.right - this.width;
    this.top = this.bottom - this.height;
    this.timer = 0;
    this.pause = false;
    this.close = false;
    this.autoHide = true;
}

/**//*  
*    隐藏消息方法  
*/
CLASS_MSN_MESSAGE.prototype.hide = function() {
    if (this.onunload()) {
        var offset = this.height > this.bottom - this.top ? this.height : this.bottom - this.top;
        var me = this;
        if (this.timer > 0) {
            window.clearInterval(me.timer);
        }
        var fun = function() {
            if (me.pause == false || me.close) {
                var x = me.left;
                var y = 0;
                var width = me.width;
                var height = 0;
                if (me.offset > 0) {
                    height = me.offset;
                }

                y = me.bottom - height;

                if (y >= me.bottom) {
                    window.clearInterval(me.timer);
                    me.Pop.hide();
                } else {
                    me.offset = me.offset - me.step;
                }
                me.Pop.show(x, y, width, height);
            }
        }
        this.timer = window.setInterval(fun, this.speed);
        Cookie.setCookie(cookieStr, new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate());
    }
}

CLASS_MSN_MESSAGE.prototype.onunload = function() {
    return true;
}
CLASS_MSN_MESSAGE.prototype.oncommand = function() {
    //this.close = true;
    this.hide();
    parent.window.location.href = "http://www.shishicai.cn/Lottery/Speed/FCCQSSC/Base.aspx";

}
CLASS_MSN_MESSAGE.prototype.show = function() {
    var oPopup = window.createPopup(); //IE5.5+  

    this.Pop = oPopup;

    var w = this.width;
    var h = this.height;

    var str = "<div style=\" style='Z-INDEX: 99999; LEFT: 0px;WIDTH: " + w + "px; POSITION: relative; TOP: 0px; HEIGHT: " + h + "px; \"><div id=\"btSysClose\" style=\"position:absolute; z-index:99999; top:3px; right:3px; cursor:pointer;color:#000; background-color:#fff; float:right; width:16px; height:16px; font-weight:bold;\">×</div><div style=\"cursor:pointer;\" id=\"btCommand\"><img src=\"/images/patterns/" + popoutImage + ".gif\" /></div></div>";

    oPopup.document.body.innerHTML = str;


    this.offset = 0;
    var me = this;
    oPopup.document.body.onmouseover = function() { me.pause = true; }
    oPopup.document.body.onmouseout = function() { me.pause = false; }
    var fun = function() {
        var x = me.left;
        var y = 0;
        var width = me.width;
        var height = me.height;
        if (me.offset > me.height) {
            height = me.height;
        } else {
            height = me.offset;
        }
        y = me.bottom - me.offset;
        if (y <= me.top) {
            me.timeout--;
            if (me.timeout == 0) {
                window.clearInterval(me.timer);
                if (me.autoHide) {
                    me.hide();
                }
            }
        } else {
            me.offset = me.offset + me.step;
        }
        me.Pop.show(x, y, width, height);
    }

    this.timer = window.setInterval(fun, this.speed)



    var btClose = oPopup.document.getElementById("btSysClose");

    btClose.onclick = function() {
        me.close = true;
        me.hide();
    }

    var btCommand = oPopup.document.getElementById("btCommand");
    btCommand.onclick = function() {
        me.oncommand();
    }
    //    var ommand = oPopup.document.getElementById("ommand");
    //    ommand.onclick = function() {
    //        //this.close = true;
    //        me.hide();
    //        window.open(ommand.href);
    //    }
}
CLASS_MSN_MESSAGE.prototype.speed = function(s) {
    var t = 20;
    try {
        t = praseInt(s);
    } catch (e) { }
    this.speed = t;
}
CLASS_MSN_MESSAGE.prototype.step = function(s) {
    var t = 1;
    try {
        t = praseInt(s);
    } catch (e) { }
    this.step = t;
}

CLASS_MSN_MESSAGE.prototype.rect = function(left, right, top, bottom) {
    try {
        this.left = left != null ? left : this.right - this.width;
        this.right = right != null ? right : this.left + this.width;
        this.bottom = bottom != null ? (bottom > screen.height ? screen.height : bottom) : screen.height;
        this.top = top != null ? top : this.bottom - this.height;
    } catch (e) { }
} 