var testObjZJ = document.createElement("div");
testObjZJ.style.cssText = "position:absolute; background-color:#000; color:#fff;top:0px; z-index:99999;";
var testBtnZJ = document.createElement("input");
testBtnZJ.style.cssText = "position:absolute; background-color:#000; color:#fff;top:50px; z-index:99999;";
testBtnZJ.type = "button";
var testInnerHTML = [];
testBtnZJ.onclick = function() {
    //    ContainerTable.rows[1].className += " update";
    //UpdateCurrentBetIssue("16", "20100723-70");
    //    playSound();
    //    UpdateBonusInfo(23, "9405|-1|摆渡的人|23|江西11选5&9417|-1|摆渡的人|23|江西11选5");
    InsertRow("15444|5|测试彩种|一星|4|1000|10%-38%|87.17%|19,测试|20100906-051|0|15444");
}
var isTestView = false;

var LotteryType = -1;

TKCPCEO.FlashZJ = function() {
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TKCPCEO.FlashZJ.prototype = {
    FlashObject: null,
    Server: "video.shishicai.cn",
    Port: 10088,
    ConnectStatus: false,
    AutoConnect: null,
    AutoConnectTimes: 0,
    send: function(_jsonCmd) {
        if (this.ConnectStatus != true) {
            testBtnZJ.value = new Date().toStandardString() + "|与服务器断开";
            return;
        }
        var jStr = _jsonCmd.toString();
        jStr += ";";
        this.FlashObject.Send(jStr);
    },
    connectBack: function(_connected, _event) {
        this.ConnectStatus = _connected;
        if (this.ConnectStatus) {
            testBtnZJ.value = new Date().toStandardString() + "|与服务器建立连接成功!|" + this.Port;
            if (this.Port == 10088) {
                this.initLotteryType();
            }
            this.AutoConnectTimes = 0;
            clearInterval(this.AutoConnect);
        } else {
            //alert("未找到服务器");
        }
    },
    initLotteryType: function() {
        testBtnZJ.value = "send c2";
        this.send(JSON.stringify({ c: "2" }));
    },
    connect: function() {
        testBtnZJ.value = new Date().toStandardString() + "|连接服务器" + this.Server + ",端口：" + this.Port;
        this.AutoConnectTimes += 1;
        this.FlashObject.ConnectServer(this.Server, this.Port);
    },
    closeConnection: function() {
        this.FlashObject.CloseServer();
    },
    close: function(_connected, _event) {
        this.ConnectStatus = _connected;
        if (!this.ConnectStatus) {
            testBtnZJ.value = new Date().toStandardString() + "|与服务器断开，请刷新";
            clearInterval(this.AutoConnect);
            this.AutoConnect = setInterval(function() { flashServerZJ.connect(); }, 1000 * 20);
        }
    },
    securityError: function(_event) {
        //alert("securityError:" + JSON.stringify(_event));
        clearInterval(this.AutoConnect);
        this.AutoConnect = setInterval(function() { flashServerZJ.connect(); }, 1000 * 5);
    },
    ioError: function(_event) {
        alert("ioError:" + JSON.stringify(_event));
    },
    getError: function(_event) {
        alert("getError:" + JSON.stringify(_event));
    },
    changePort: function(port) {
        var tPort = this.Port;
        this.Port = port;
        this.closeConnection();
        this.connect();
        this.Port = tPort;
    },
    getData: function(_jsonStr) {
        if (isTestView) {
            var t = new Date();
            testObjZJ.innerHTML = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "|" + _jsonStr;
        }
        if (_jsonStr.toString().indexOf("changePort") >= 0) {
            this.changePort(parseInt(_jsonStr.split("|")[1], 10));
            return;
        }
        _jsonStr = JSON.parse(_jsonStr);
        switch (_jsonStr.c) {
            case "b":
                UpdateBonusInfo(_jsonStr.p[0], _jsonStr.p[1]);
                break;
            case "i":
                if (!onlyBonusInfo) {
                    UpdateCurrentBetIssue(_jsonStr.p[0], _jsonStr.p[1]);
                }
                break;
            case "p":
                if (!onlyBonusInfo) {
                    InsertRow(_jsonStr.p[0]);
                }
                break;
        }
    },
    wait: function() {
        var func = function(_this) {
            return function() {
                _this.wait();
            }
        } (this);
        var delay = 50;
        var tmpObj = $("LinkFlashZJ");
        if (tmpObj == null) {
            setTimeout(func, delay);
            return;
        }
        this.FlashObject = tmpObj;
        if (typeof (this.FlashObject.ConnectServer) != "function") {
            setTimeout(func, delay);
            return;
        }
        this.connect();
    },
    construct: function() {
        if (isTestView) {
            window.onload = function() {
                document.body.appendChild(testObjZJ);
                document.body.appendChild(testBtnZJ);
            }
        }
        this.wait();
    }
}

var ListLotteryProject = new Array();
var ContainerTable = null;
var containerNoticeBonus = null;
var onlyBonusInfo = false;

function InsertRow(rowData) {
    var listData = rowData.split("|");
    if (LotteryType >= 0 && parseInt(listData[1], 10) != LotteryType) {
        return;
    }
    var row = ContainerTable.insertRow(2);
    row.className = "g" + listData[1] + ((ContainerTable.rows.length - 3) % 2 == 0 ? " odd" : "");
    row.setAttribute("css", row.className);
    try {
        var show = true;
        if (flt_txtExName.value.trim() != "" && flt_txtExName.value.trim() != listData[listData.length - 4].split(",")[1].trim()) {
            show = false;
        } else if (lastSelectedIndex > 0) {
            if (listSelectObj[0].value != listData[1]) {
                show = false;
            } else if (listSelectObj[lastSelectedIndex].value >= 0 && listSelectObj[lastSelectedIndex].options[listSelectObj[lastSelectedIndex].selectedIndex].text != listData[3]) {
                show = false;
            }
        }
        row.style.display = show ? "" : "none";
    } catch (e) { }
    //if (Broswer.ie > 0 && !window.XMLHttpRequest) {
    row.onmouseover = function() {
        this.className = this.getAttribute("css") + " active";
    };
    row.onmouseout = function() {
        this.className = this.getAttribute("css");
    };
    //}
    for (var i = 0; i < listData.length; i++) {
        var cell = row.insertCell(-1);
        switch (i) {
            case 2:
                cell.className = "r1";
                cell.innerHTML = "<sup class=\"new\">new</sup>" + listData[i];
                break;
            case listData.length - 1:
                cell.innerHTML = "<a target=\"_blank\" class=\"view\" href=\"ProjectDetails.aspx?pid=" + listData[i] + "\">查看号码</a>";
                //cell.className = "num_rec";
                break;
            case listData.length - 2:
                cell.innerHTML = "可以投注";
                cell.className = "empty";
                break;
            case listData.length - 4:
                try {
                    var exId = listData[i].split(",")[0];
                    var exName = listData[i].split(",")[1];
                    //cell.innerHTML = "<a href=\"Expert.aspx?eid=" + exId + "\" target=\"_blank\">" + exName + "</a>";
                    cell.innerHTML = exName;
                } catch (e) { }
                break;
            default:
                cell.innerHTML = listData[i];
                break;
        }
        if (i < 2) {
            cell.className = "hideCell";
        }
    }
    ListLotteryProject[parseInt(listData[1], 10)].push({
        BonusStatus: 0,
        EndIssue: "",
        Id: parseInt(listData[0], 10),
        IsBetIssue: 1,
        RowIndex: ContainerTable.rows.length - 3,
        StartIssue: listData[9]
    });
    if (isTestView) {
        row.title = ContainerTable.rows.length - 3;
    }
    playSound();
}

function UpdateBonusInfo(lotteryType, bonusInfo) {
    var tempAry = bonusInfo.split("&");
    var listBonusInfo = tempAry[0].split(",");
    var listOverInfo = tempAry[1].split(",");
    var listBonus = new Array();
    var listOver = new Array();
    if (listBonusInfo[0] != "") {
        for (var i = 0; i < listBonusInfo.length; i++) {
            var bInfo = listBonusInfo[i].split("|");
            if (onlyBonusInfo) {
                try {
                    if (parseInt(listBonusInfo[i].split("|")[3], 10) == thisLotteryType && (thisLotteryType != TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.TCGD11)) {
                        bonusListItemChanged(bInfo[2], bInfo[4], bInfo[0]);
                    }
                } catch (e) { }
            } else {
                bonusListItemChanged(bInfo[2], bInfo[4], bInfo[0]);
            }
            listBonus.push(listBonusInfo[i].split("|")[0]);
        }
    }
    if (listOverInfo[0] != "") {
        for (var i = 0; i < listOverInfo.length; i++) {
            listOver.push(listOverInfo[i].split("|")[0]);
        }
    }
    if (onlyBonusInfo) return;
    var listProject = ListLotteryProject[parseInt(lotteryType, 10)];
    for (var i = listProject.length - 1; i >= 0; i--) {
        var tRow = ContainerTable.rows[ContainerTable.rows.length - listProject[i].RowIndex - 1];
        if (listBonus.exists(listProject[i].Id.toString())) {
            tRow.cells[tRow.cells.length - 2].innerHTML = "已中奖";
            tRow.cells[tRow.cells.length - 2].className = "award";
            //tRow.cells[2].className = "c1";
            //bonusListItemChanged(tRow.cells[8].innerHTML, tRow.cells[2].innerHTML, tRow.cells[0].innerHTML);
        } else if (listOver.exists(listProject[i].Id.toString())) {
            tRow.cells[tRow.cells.length - 2].innerHTML = "&nbsp;";
            //tRow.cells[2].className = "c1";
        }
    }
}

function bonusListItemChanged(expertName, lotteryTypeString, projectId) {
    var listItems = containerNoticeBonus.getElementsByTagName("li");
    var item = document.createElement("li");
    item.innerHTML = "中奖啦!中奖啦!专家”" + expertName + "”的" + lotteryTypeString + "计划中奖啦! <a target=\"_blank\" href=\"/zj/ProjectDetails.aspx?pid=" + projectId + "\">查看详情</a><span class=\"close\" onclick=\"removeBonusItem(this.parentNode);\">关闭</span>";
    var func = new Function();
    if (listItems.length > 0) {
        func = function(item, listItems) {
            return function() { containerNoticeBonus.insertBefore(item, listItems[0]); }
        } (item, listItems);
    } else {
        func = function(item) {
            return function() { containerNoticeBonus.appendChild(item); }
        } (item);
    }
    setTimeout(func, 15000);
    delayRemoveBonusItem(item, 15000);
}

function delayRemoveBonusItem(item, dTime) {
    var func = function(_item) {
        return function() { removeBonusItem(_item) };
    } (item);
    item.delayObj = setTimeout(func, dTime + 10000);
}

function removeBonusItem(item) {
    clearTimeout(item.delayObj);
    containerNoticeBonus.removeChild(item);
}

function UpdateCurrentBetIssue(lotteryType, currentBetIssue) {
    var listProject = ListLotteryProject[parseInt(lotteryType, 10)];
    for (var i = listProject.length - 1; i >= 0; i--) {
        //        alert(i + "\n" + ContainerTable.rows.length + "\n" + listProject[i].RowIndex);
        if (listProject[i].IsBetIssue == 1) {
            if (currentBetIssue > listProject[i].StartIssue) {
                listProject[i].IsBetIssue = 0;
                var tRow = ContainerTable.rows[ContainerTable.rows.length - listProject[i].RowIndex - 1];
                tRow.cells[tRow.cells.length - 2].innerHTML = "开奖中";
                tRow.cells[tRow.cells.length - 2].className = "";
                //tRow.cells[2].className = "c1";
                tRow.cells[2].innerHTML = tRow.cells[2].innerHTML.replace("class=\"new\"", "class=\"\"");
            }
        } else {
            break;
        }
    }
}