///<reference path="Core.js">
///the common function of script in project
function InitIframeHeight(iframeObj, addHeight) {///初始化框架高度
    var doc = iframeObj.contentWindow.document;
    //    var height = (Broswer.firefox != "0") ? (parseInt(doc.documentElement.offsetHeight + (parseInt(addHeight, 10) >= 0 ? parseInt(addHeight, 10) : 10), 10) + "px") : (parseInt(doc.documentElement.scrollHeight + (parseInt(addHeight, 10) >= 0 ? parseInt(addHeight, 10) : 10), 10) + "px");
    //    iframeObj.style.height = parseInt(doc.documentElement.scrollHeight + (parseInt(addHeight, 10) >= 0 ? parseInt(addHeight, 10) : 10), 10) + "px";
    var height;
    if (Broswer.firefox != "0") {
        height = doc.documentElement.offsetHeight;
    } else {
        var h1 = doc.documentElement.scrollHeight;
        var h2 = doc.body.scrollHeight;
        if (h2 > 0) {
            height = h2;
        } else {
            height = h1;
        }
    }
    height = addHeight >= 0 ? height + addHeight : height;
    iframeObj.style.height = height + "px";
    iframeObj.style.overflow = "hidden";
}

function InitIframeWidth(iframeObj, addWidth) {///初始化框架宽度
    var doc = iframeObj.contentWindow.document;
    //    var height = (Broswer.firefox != "0") ? (parseInt(doc.documentElement.offsetHeight + (parseInt(addHeight, 10) >= 0 ? parseInt(addHeight, 10) : 10), 10) + "px") : (parseInt(doc.documentElement.scrollHeight + (parseInt(addHeight, 10) >= 0 ? parseInt(addHeight, 10) : 10), 10) + "px");
    //    iframeObj.style.height = parseInt(doc.documentElement.scrollHeight + (parseInt(addHeight, 10) >= 0 ? parseInt(addHeight, 10) : 10), 10) + "px";
    var width;
    if (Broswer.firefox != "0") {
        width = doc.documentElement.offsetWidth;
    } else {
        var w1 = doc.documentElement.scrollWidth;
        var w2 = doc.body.scrollWidth;
        if (w2 > 0) {
            width = w2;
        } else {
            width = w1;
        }
    }
    width = addWidth >= 0 ? width + addWidth : width;
    iframeObj.style.width = width + "px";
    iframeObj.style.overflow = "hidden";
}

function CheckBoxToRadio() {
    ///<summary>转换CheckBox为Radio</summary>
    ///<field name="ObjWrap">CheckBox集合的容器对象</field>
    ///<field name="CheckedRadio">被选中的CheckBox引用对象(相当于临时对象)</field>
    ///<field name="CheckBoxList">CheckBox数组集合</field>
    ///<field name="CBValueList">CheckBox对应值集合</field>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
CheckBoxToRadio.prototype = {
    ObjWrap: null,
    CheckedRadio: null,
    CheckBoxList: [],
    CBValueList: [],
    getValue: function() {
        ///<summary>对象选中的值,为null表示没有选项被选中</summary>
        if (this.CheckedRadio != null) {
            return this.CheckedRadio.getAttribute("value");
        }
        return null;
    },
    checkedEvent: function() {
        ///<summary>被选中时的事件</summary>
    },
    cancelCheckedEvent: function() {
        ///<summary>取消选中时的事件</summary>
    },
    clickEvent: function(_objCheckBox) {
        ///<summary>点击CheckBox事件</summary>
        ///<param name="_objCheckBox">被点击的CheckBox对象本身</param>
        if (this.CheckedRadio == null) {
            this.CheckedRadio = _objCheckBox;
            this.checkedEvent(this.getValue());
        } else {
            if (this.CheckedRadio == _objCheckBox) {
                this.CheckedRadio = null;
                this.cancelCheckedEvent(this.getValue());
            } else {
                this.CheckedRadio.checked = false;
                this.CheckedRadio = _objCheckBox;
                this.checkedEvent(this.getValue());
            }
        }
    },
    construct: function() {
        ///<summary>构造函数</summary>
        this.CheckBoxList = [];
        this.CBValueList = [];
    },
    initialize: function() {
        ///<summary>初始化函数，需要预先指定CheckBoxList和CBValueList</summary>
        for (var i = 0; i < this.CheckBoxList.length; i++) {
            this.CheckBoxList[i].onclick = this.clickEvent.bind(this, this.CheckBoxList[i]);
        }
        if (this.CheckBoxList.length != this.CBValueList.length) {
            //            alert("CheckBox与值数量不匹配，请检查");
            return;
        }
        for (var i = 0; i < this.CheckBoxList.length; i++) {
            this.CheckBoxList[i].setAttribute("value", this.CBValueList[i]);
        }
    }
}

function TextInputInstead(_inputInstead, _inputRaw, _isFocus) {
    ///<summary>文本输入替换法</summary>
    ///<param name="_inputInstead">被替代的文本框</param>
    ///<param name="_inputRaw">原始文本框</param>
    ///<param name="_isFocus">是否获取焦点</param>
    if (_isFocus == true) {
        _inputInstead.style.display = "none";
        _inputRaw.style.display = "";
        _inputRaw.focus();
    } else {
        if (_inputRaw.value == "") {
            _inputRaw.value = "";
            _inputRaw.style.display = "none";
            _inputInstead.style.display = "";
        }
    }
}

function LotteryAnteCodeClientInputFormat(_anteCodeValue) {
    ///<summary>将用户输入的内容过滤全角、半角</summary>
    ///<param name="_anteCodeValue">用户输入的号码</param>
    var IR = _anteCodeValue.toString();
    IR = IR.split("０").join("0");
    IR = IR.split("１").join("1");
    IR = IR.split("２").join("2");
    IR = IR.split("３").join("3");
    IR = IR.split("４").join("4");
    IR = IR.split("５").join("5");
    IR = IR.split("６").join("6");
    IR = IR.split("７").join("7");
    IR = IR.split("８").join("8");
    IR = IR.split("９").join("9");
    IR = IR.split("＋").join("+");
    IR = IR.split("　").join(" ");
    regExp = /\s+/g;
    IR = IR.replace(regExp, " ");
    return IR.trim();
}

function TextBox_Event() {
    ///<summary>文本框事件绑定</summary>
    this.construct.apply(this, arguments);
    this.construct.bind(this);
}
TextBox_Event.prototype = {
    keyDownIntOnly: function(e) {
        ///<summary>检测子自定义本文框内容的填写规则(仅数字)</summary>
        e = window.event || e;
        var keyCode = e.keyCode || e.which;
        var code1 = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        var code2 = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
        var k = [8, 37, 39, 46, 229];
        var value = (code1.indexOf(parseInt(keyCode, 10)) == -1) ? code2.indexOf(parseInt(keyCode, 10)) : code1.indexOf(parseInt(keyCode, 10));
        if (value == -1) {
            if (k.indexOf(parseInt(keyCode, 10)) == -1) { return false; }
        }
        return true;
    },
    keyUpIntOnly: function(_min, _max, e) {
        ///<summary>检测子自定义本文框内容的填写规则(仅数字)</summary>
        e = window.event || e;
        var input = e.target || e.srcElement;
        input.value = LotteryAnteCodeClientInputFormat(input.value);
        var value = input.value.toString().trim();
        var regExp = /^\d+$/i;
        if (value == "") {
            return;
        }
        if (!regExp.test(value)) {
            input.value = _min.toString();
            return;
        }
        if (value < _min || value > _max) {
            if (value < _min) {
                input.value = _min.toString();
            } else {
                input.value = _max.toString();
            }
        }
    },
    keyChangeIntOnly: function(_min, _max, e) {
        ///<summary>检测子自定义本文框内容的填写规则(仅数字)</summary>
        e = window.event || e;
        var input = e.target || e.srcElement;
        var value = input.value.toString().trim();
        var regExp = /^\d+$/i;
        if (!regExp.test(value)) {
            input.value = _min.toString();
            return;
        }
        if (value < _min || value > _max) {
            if (value < _min) {
                input.value = _min.toString();
            } else {
                input.value = _max.toString();
            }
        }
    },
    keyUpButtonClick: function(_button, e) {
        ///<summary>文本框回车提交按钮</sumamry>
        e = window.event || e;
        var keyCode = e.keyCode || e.which;
        if (keyCode == "13") {
            _button.focus();
            try {
                _button.click();
            } catch (e) {
                _button.onclick();
            }
        }
    },
    construct: function() {
        ///<summary>构造函数</summary>
    }
}

function TranslateTicketStatus(_ticketStatus, _bonusStatus, _issueStatus) {
    ///<summary>翻译票状态</summary>
    var retStatus = "";
    switch (_ticketStatus) {
        case 0:
            retStatus = "提交成功";
            break;
        case 1:
            retStatus = "审核成功";
            break;
        case 2:
            retStatus = "正在发送";
            break;
        case 3:
            retStatus = "发送成功";
            break;
        case 4:
            if (_issueStatus == 0) {
                if (_bonusStatus == 0) {
                    retStatus = "待兑奖";
                } else {
                    switch (_bonusStatus) {
                        case 1:
                            retStatus = "已中奖";
                            break;
                        case 2:
                            retStatus = "未中奖";
                            break;
                    }
                }
            }
            else {
                if (_bonusStatus == 0) {
                    retStatus = "购买成功";
                } else {
                    switch (_bonusStatus) {
                        case 1:
                            retStatus = "已中奖";
                            break;
                        case 2:
                            retStatus = "未中奖";
                            break;
                    }
                }
            }
            break;
        case 5:
            retStatus = "购买失败";
            break;
        case 6:
            retStatus = "用户放弃";
            break;
        case 7:
            retStatus = "系统放弃";
            break;
        default:
            retStatus = "未知状态";
            break;
    }
    return retStatus;
}

function addFavorite(_url, _text) {
    ///<summary>添加至收藏夹</summary>
    _url = _url == "" || _url == null ? window.location.href : _url;
    _text = _text == "" || _text == null ? window.document.title : _text;
    if (Broswer.ie != "0") {
        window.external.addFavorite(_url, _text);
    } else {
        window.sidebar.addPanel(_text, _url, "");
    }
}

function loginOut() {
    ///<summary>退出网站登录</summary>
    if (confirm("您是否确定退出？")) {
        //        if (confirm("您是否收藏本页面")) {
        //            addFavorite();
        //        }
        window.location.href = "/Logout.aspx";
    }
}

function TextBoxFocusBlur(_textbox, _isFocus, _isSelected, _isPass) {
    ///<summary>文本框提示文字功能</summary>
    ///<param name="_textbox">文本框</param>
    ///<param name="_isFocus">是否获取焦点</param>
    ///<param name="_isPass">是否是密码文本框</param>
    if (_isFocus) {
        if (_textbox.getAttribute("initText") == null) {
            _textbox.setAttribute("initText", _textbox.value.trim());
        }
        var isInitText = _textbox.getAttribute("isInitText") || true;
        if (isInitText.toString() == "true") {
            _textbox.value = "";
        }
        if (_isSelected == true && _textbox.value != "") {
            _textbox.select();
        }
    } else {
        if (_textbox.value == "" || (_isPass != true && _textbox.value.trim() == "")) {
            _textbox.value = _textbox.getAttribute("initText");
            _textbox.setAttribute("isInitText", true);
        } else {
            _textbox.setAttribute("isInitText", false);
        }
    }
}