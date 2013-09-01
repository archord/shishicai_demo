/// <reference path="~/JS/NoUse/JScript.js" />
function ModalDialog(_instance, _width, _height, _contentIndex) {
    ///<summary>自定义仿模态窗口层</summary>
    ///<param name="_instance">实例名(必须)</param>
    ///<param name="_width">窗口宽(可选)</param>
    ///<param name="_height">窗口高(可选)</param>
    ///<param name="_contentIndex">窗口内容索引(可选，默认为0)</param>
    ///<field name="MainWindow">层容器</field>
    ///<field name="MaskIframe">遮罩层</field>
    ///<field name="MaskDiv">遮罩层修正拖动bug</field>
    ///<field name="ShowMask">是否显示遮罩层</field>
    ///<field name="MaskOpacity">遮罩透明度</field>
    ///<field name="MaskBgColor">遮罩背景色</field>
    ///<field name="Instance">实例名称</field>
    ///<field name="Message">层内容容器对象</field>
    ///<field name="Message.Title">内容标题</field>
    ///<field name="Message.CloseBtnText">内容关闭按钮文本</field>
    ///<field name="Message.HTML">内容HTML代码</field>
    ///<field name="ContentIndex">拖动状态</field>
    ///<field name="IsShowed">是否显示过</field>
    ///<field name="MoveStatus">移动状态</field>
    ///<field name="Mx">鼠标横坐标</field>
    ///<field name="My">鼠标纵坐标</field>
    ///<field name="Ox">对象横坐标</field>
    ///<field name="Oy">对象纵坐标</field>
    ///<field name="IsFirstMove">是否是第一次移动</field>
    this.initialize.apply(this, arguments);
    this.initialize.bind(this);
}

ModalDialog.prototype = {
    MainWindow: null,
    MaskIframe: null,
    MaskDiv: null,
    ShowMask: false,
    MaskOpacity: 0.7,
    MaskBgColor: "#000",
    Instance: "",
    Message: {
        Title: "标题",
        TitleClass: null,
        ShowBtn: true,
        CloseBtnText: "×",
        HTML: "html代码信息"
    },
    ContentIndex: 0,
    DragMove: true,
    IsShowed: false,
    MoveStatus: false,
    Mx: 0,
    My: 0,
    Ox: 0,
    Oy: 0,
    IsFirstMove: true,
    mouseup: function(e) {
        this.MoveStatus = false;
        document.body.onmousemove = null;
        document.body.style.mozUserSelect = "";
        document.body.onselectstart = function() { return true; }
    },
    mousemove: function(e) {
        if (this.MoveStatus) {
            document.body.style.mozUserSelect = "none";
            document.body.onselectstart = function() { return false; }
            e = window.event || e;
            var nx = e.clientX;
            var ny = e.clientY;
            this.MainWindow.style.left = this.Ox + nx - this.Mx + "px";
            this.MainWindow.style.top = this.Oy + ny - this.My + "px";
            if (!this.ShowMask) {
                this.MaskIframe.style.left = this.MainWindow.style.left;
                this.MaskIframe.style.top = this.MainWindow.style.top;

                this.MaskDiv.style.left = this.MaskIframe.style.left;
                this.MaskDiv.style.top = this.MaskIframe.style.top;
            }
        }
    },
    mousedown: function(e) {
        if (this.DragMove) {
            e = window.event || e;
            this.MoveStatus = true;
            this.Mx = e.clientX;
            this.My = e.clientY;
            if (this.IsFirstMove) {
                this.Ox = this.MainWindow.offsetLeft + this.MainWindow.offsetWidth / 2;
                this.Oy = this.MainWindow.offsetTop + ((Broswer.ie == "6.0") ? 0 : this.MainWindow.offsetHeight / 2);
            } else {
                this.Ox = parseInt(getStyleValue(this.MainWindow, "left"), 10) | 0;
                this.Oy = parseInt(getStyleValue(this.MainWindow, "top"), 10) | 0;
            }
            document.body.onmousemove = this.mousemove.bind(this);
        }
    },
    setMaskBgColor: function() {
        this.MaskIframe.contentWindow.document.body.style.backgroundColor = this.MaskBgColor;
    },
    initMaskIframe: function() {
        ///<summary>初始化遮罩层</summary>
        this.MaskIframe = createElement($("ContainerWrapper"), "iframe", null, "ModalDialogMask");
        this.MaskIframe.setAttribute("src", "about:blank");
        this.MaskIframe.frameBorder = "0";
        this.MaskIframe.style.display = this.MainWindow.style.display;
        this.MaskIframe.onload = this.setMaskBgColor.bind(this); //非IE
        this.MaskIframe.onreadystatechange = this.setMaskBgColor.bind(this); //IE

        this.MaskDiv = createElement($("ContainerWrapper"), "div", null, "");
        this.MaskDiv.style.display = this.MaskIframe.style.display;
    },
    initialize: function(_instance, _width, _height, _contentIndex) {
        this.Instance = _instance || "";
        this.ContentIndex = _contentIndex || 0;
        if (this.Instance == "") { alert("必须将此类的实例名作为第一个参数传入"); return; }
    },
    show: function(_reShow) {
        ///<summary>打开、显示提示层</summary>
        if (!this.IsShowed) {
            this.MainWindow = createElement($("ContainerWrapper"), "div", null, "");
            this.MainWindow.style.display = "none";
            this.initMaskIframe(); //初始化遮罩层
            this.MainWindow.onmousedown = this.mousedown.bind(this);
            document.body.onmouseup = this.mouseup.bind(this);
        }
        this.MainWindow.setAttribute("id", "sysDrag");
        this.MainWindow.innerHTML = this.getContent();
        this.MainWindow.style.display = "block";
        this.MaskIframe.style.display = "block";
        this.MaskDiv.style.display = this.MaskIframe.style.display;
        if (!this.IsShowed || _reShow == true) {
            var cssText = "";
            cssText += "position:fixed!important;";
            cssText += "margin-left:-" + this.MainWindow.offsetWidth / 2 + "px;";
            cssText += (Broswer.ie == "6.0") ? "" : "margin-top:-" + this.MainWindow.offsetHeight / 2 + "px;";
            cssText += "position:absolute;";
            cssText += "left:50%;";
            cssText += (Broswer.ie == "6.0" || Broswer.firefox != "0") ? "top:50%;" : "top:50%!important;"
            //            cssText += "*top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? (document.documentElement.clientHeight-this.clientHeight)/2 - 1 : (document.body.clientHeight-this.clientHeight)/2 - 1);_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? document.documentElement.scrollTop + (document.documentElement.clientHeight-this.clientHeight)/2 - 1 : document.body.scrollTop + (document.body.clientHeight-this.clientHeight)/2 - 1);";
            cssText += "_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? document.documentElement.scrollTop + (document.documentElement.clientHeight-this.clientHeight)/2 - 1 : document.body.scrollTop + (document.body.clientHeight-this.clientHeight)/2 - 1);";
            cssText += "z-index:99999;";
            cssText += this.DragMove ? "cursor:move;" : "cursor:normal;";
            this.MainWindow.style.cssText = cssText;
            if (Broswer.ie == "6.0") {
                this.MainWindow.style.top = eval(document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement.scrollTop + (document.documentElement.clientHeight - this.MainWindow.clientHeight) / 2 - 1 : document.body.scrollTop + (document.body.clientHeight - this.MainWindow.clientHeight) / 2 - 1
//                document.documentElement.scrollTop += 1;
//                document.documentElement.scrollTop -= 1;
            }
            //==============ShowMask===============
            if (!this.ShowMask) {
                cssText += (Broswer.firefox != "0") ? ("opacity:0;") : ("filter:alpha(opacity=0);");
                this.MaskIframe.style.cssText = cssText;
                this.MaskIframe.style.width = this.MainWindow.offsetWidth + "px";
                this.MaskIframe.style.height = this.MainWindow.offsetHeight + "px";

                this.MaskDiv.style.cssText = cssText;
                this.MaskDiv.style.backgroundColor = "#f00";
                this.MaskDiv.style.width = this.MaskIframe.style.width;
                this.MaskDiv.style.height = this.MaskIframe.style.height;
            }
            else {
                cssText = "";
                cssText += "background-color: #000;";
                cssText += "width: 100%;";
                cssText += "height: 100%;";
                cssText += "left:0;";
                cssText += "top:0;";
                cssText += (Broswer.firefox != "0") ? ("opacity:" + this.MaskOpacity + ";") : ("filter:alpha(opacity=" + parseInt(this.MaskOpacity * 100, 10) + ");");
                cssText += "position:fixed!important;";
                cssText += "position:absolute;";
                //                cssText += "_top:expression(eval(document.compatMode && document.compatMode=='CSS1Compat') ? documentElement.scrollTop + (document.documentElement.clientHeight-this.offsetHeight)/2 : document.body.scrollTop + (document.body.clientHeight - this.clientHeight)/2);";
                this.MaskIframe.style.cssText = cssText;
                this.MaskIframe.style.width = "100%";
                this.MaskIframe.style.height = (Broswer.ie == "6.0") ? document.body.offsetHeight + "px" : "100%";

                this.MaskDiv.style.cssText = cssText;
                if (Broswer.firefox != "0") {
                    this.MaskDiv.style.opacity = "0";
                } else {
                    this.MaskDiv.style.filter = "alpha(opacity=0);";
                }
                this.MaskDiv.style.width = this.MaskIframe.style.width;
                this.MaskDiv.style.height = this.MaskIframe.style.height;
            }
            this.MaskIframe.style.zIndex = "99997";
            this.MaskDiv.style.zIndex = "99998";
            //==============ShowMask===============
            this.IsShowed = true;
        }
    },
    hide: function() {
        ///<summary>隐藏、关闭提示层</summary>
        if (this.IsShowed) {
            this.MainWindow.style.display = "none";
            this.MaskIframe.style.display = "none";
            this.MaskDiv.style.display = this.MaskIframe.style.display;
        }
    },
    reShow: function(_hideBtnClose, _contentIndex) {
        ///<summary>当内容更改后调用此方法代替show()</summary>
        ///<param name="_hideBtnClose">可选。是否隐藏关闭按钮</param>
        this.ContentIndex = _contentIndex == null ? 0 : _contentIndex;
        if (_hideBtnClose == true) { this.Message.ShowBtn = false; }
        else { this.Message.ShowBtn = true; }
        this.show(true);
    },
    close: function() {
        ///<summary>关闭提示层（可重载，直接调用hide()）</summary>
        this.hide();
    },
    setTitleClass: function(_class) {
        ///<summary>设置Title样式</summary>
        if (typeof (_class) == "undefined" || _class == null) {
            this.Message.TitleClass = "";
            return;
        }
        this.Message.TitleClass = (_class == true) ? ("ico_sys_status_yes") : ("ico_sys_status_no");
    },
    reSetTitle: function(_title, _class) {
        ///<summary>重新设置Title名称</summary>
        this.Message.Title = _title;
        if ($("ModalDialog_Title") == null) {
            this.Message.Title = _title;
        } else {
            $("ModalDialog_Title").innerHTML = _title;
        }
        this.setTitleClass(_class);
    },
    showLogin: function() {
        ///<summary>显示登录框</summary>
        this.ContentIndex = 1;
        this.ShowMask = true;
        this.DragMove = false;
        this.reShow(true, 1);
        $("sysDragLoginUser").focus();
        cuser.ObjUserInfo.ObjUserName = $("UserInfo_UserName");
        cuser.ObjUserInfo.ObjMoney = $("UserInfo_Money");
    },
    getContent: function() {
        ///<summary>获取层内容</suumary>
        var winContent = new Array();
        //the first style
        var htmlCode = "<table class=\"sysTip\">\r\n";
        htmlCode += "   <tr>\r\n";
        htmlCode += "       <td class=\"grid-tl\"></td>\r\n";
        htmlCode += "       <td class=\"grid-tm\"></td>\r\n";
        htmlCode += "       <td class=\"grid-tr\"></td>\r\n";
        htmlCode += "   </tr>\r\n";
        htmlCode += "   <tr>\r\n";
        htmlCode += "       <td class=\"grid-ml\"></td>\r\n";
        htmlCode += "       <td class=\"grid-mm\">\r\n";
        htmlCode += "           <div class=\"sysTip\">\r\n";
        htmlCode += "               <h4 id=\"ModalDialog_Head\" class=\"" + this.Message.TitleClass + "\"><a id=\"ModalDialog_BtnClose\"" + (this.Message.ShowBtn == true ? "" : " style=\"display:none;\"") + " href=\"javascript:void(0)\" title=\"关闭\" onclick=\"" + this.Instance + ".close()\">" + this.Message.CloseBtnText + "</a><em id=\"ModalDialog_Title\">" + this.Message.Title + "</em></h4>\r\n";
        htmlCode += "               " + this.Message.HTML + "\r\n";
        htmlCode += "           </div>\r\n";
        htmlCode += "       </td>\r\n";
        htmlCode += "       <td class=\"grid-mr\"></td>\r\n";
        htmlCode += "   </tr>\r\n";
        htmlCode += "   <tr>\r\n";
        htmlCode += "       <td class=\"grid-bl\"></td>\r\n";
        htmlCode += "       <td class=\"grid-bm\"></td>\r\n";
        htmlCode += "       <td class=\"grid-br\"></td>\r\n";
        htmlCode += "   </tr>\r\n";
        htmlCode += "</table>\r\n";
        winContent[winContent.length] = htmlCode;

        //the second style
        htmlCode = "<table class=\"sysTip sysCommon\">\r\n";
        htmlCode += "<tbody><tr><td class=\"grid-tl\"/><td class=\"grid-tm\">用户登录</td><td class=\"grid-tr\"/></tr>\r\n";
        htmlCode += "<tr><td class=\"grid-ml\"/>\r\n";
        htmlCode += "<td class=\"grid-mm\">\r\n";
        htmlCode += "<div class=\"sysTip\">\r\n";
        htmlCode += "<div class=\"fms\"><label>用户名：</label><input type= \"text\" class=\"f-ipt\" id=\"sysDragLoginUser\"/> <a href=\"/Register.aspx\" class=\"f-orange \">免费注册！</a></div>\r\n";
        htmlCode += "<div class=\"fms\"><label>密&nbsp;&nbsp;&nbsp;&nbsp;码：</label><input type= \"password\" class=\"f-ipt\" id=\"sysDragLoginPwd\"/> <a href=\"\" class=\"f-orange \">忘记密码？</a></div>\r\n";
        htmlCode += "<div class=\"fms\">";
        htmlCode += "<a class=\"btnExt\" href=\"javascript:void(0)\" onclick=\"cuser.ModalDialog = " + this.Instance + ";cuser.login($('sysDragLoginUser'), $('sysDragLoginPwd'), event)\"><span>登录</span></a>";
        //        htmlCode += "<a class=\"btnExt btnExtt\" href=\"javascript:void(0)\" onclick=\"" + this.Instance + ".hide()\"><span>取消</span></a>";
        htmlCode += "</div>";
        htmlCode += "</div>\r\n";
        htmlCode += "</td>\r\n";
        htmlCode += "<td class=\"grid-mr\"></td>\r\n";
        htmlCode += "</tr>\r\n";
        htmlCode += "<tr><td class=\"grid-bl\"/><td class=\"grid-bm\"/><td class=\"grid-br\"/></tr>\r\n";
        htmlCode += "</tbody></table>\r\n";
        winContent[winContent.length] = htmlCode;
        return winContent[this.ContentIndex];
    }
}