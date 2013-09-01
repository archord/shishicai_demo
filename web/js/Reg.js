function Reg_CheckUserName(obj) {//验证用户名
    obj.value = obj.value.trim();
    var valLen = obj.value.length;
    if (valLen < 3 || valLen > 10) {
        OpenError(obj, "用户名长度须在3～10个字符之间。");
        return;
    }
    var useChar = /^[a-zA-Z0-9\u4E00-\u9FA5\_]*$/;
    if (!useChar.test(obj.value)) {
        OpenError(obj, "用户名只能由英文字母(不区分大小写)、数字、下划线及汉字组成。");
        return;
    }
    var command = new JSONCommand();
    command.CommandName = "CheckUserName";
    command.Parameters = [obj.value, obj.id];
    SendToServer(command.toString());
    //CloseError(obj);
}

function Reg_CheckUserNameReturn(exits, objId) {//检测用户名是否存在
    if (exits) {
        OpenError($(objId), "该用户名已经存在，请换一个试试。");
        return;
    }
    CloseError($(objId));
}

function Reg_CheckPass(obj) {//验证密码
    obj.value = obj.value.trim();
    var valLen = obj.value.length;
    if (valLen < 6 || valLen > 16) {
        OpenError(obj, obj.getAttribute("oTip"));
        return;
    }
    CloseError(obj);
}

function Reg_CheckConfirmPass(obj) {//验证确认密码
    obj.value = obj.value.trim();
    if (obj.value.length == 0) {
        OpenError(obj, "请输入确认密码。");
        return;
    }
    if (obj.value != $c("Reg_Pass")[0].value.trim()) {
        OpenError(obj, "确认密码与密码不匹配，请重新输入。");
        return;
    }
    CloseError(obj);
}

function Reg_CheckTrueName(obj) {//验证真实姓名
    obj.value = obj.value.trim();
    if (!(obj.value.toString().replace(/\·/g, "").IsChinese() && obj.value.ChLen() >= 4)) {
        OpenError(obj, obj.getAttribute("oErr"));
        return;
    }
    CloseError(obj);
}

function Reg_CheckIdentityCardType(obj) {//验证证件类型
    CloseError(obj);
}

function Reg_CheckIdentityCard(obj) {//验证证件号码
    obj.value = obj.value.trim();
    var t = new IdentityCard(obj.value);
    if (!t.getPass(serverDate)) {
        var errMsg = "身份证号码不正确。";
        switch (t.getCheckStatus(serverDate)) {
            case 6:
                errMsg = "对不起，您的年龄未满18周岁。";
                break;
            default:
                break;
        }
        OpenError(obj, errMsg);
        //            OpenError(obj, errMsg + t.getCheckStatus(serverDate));
        return;
    }
    CloseError(obj);
}

function Reg_CheckMobilePhone(obj) {//验证电话号码
    var mobileRe = /^((\+86)|(86))?\d{11}$/;
    if (!mobileRe.test(obj.value.trim())) {
        OpenError(obj, "手机号码不正确。");
        return;
    }
    CloseError(obj);
}

function Reg_CheckEmail(obj) {//验证电子邮件
    var mailRe = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!mailRe.test(obj.value.trim())) {
        OpenError(obj, "电子邮件格式不正确。（推荐QQ邮箱，例如：您的QQ号码@qq.com）");
        return;
    }
    CloseError(obj);
}

function Reg_CheckQQ(obj) {//验证QQ号码
    var qqRe = /^[1-9]\d{4,11}$/;
    if (!qqRe.test(obj.value.trim())) {
        OpenError(obj, obj.getAttribute("oTip"));
        return;
    }
    CloseError(obj);
}

function Reg_CheckAgreement(obj) {//验证同意协议
    if (obj.checked) {
        pushOKInputs(obj); //添加正确验证
    } else {
        removeOKInputs(obj); //删除正确验证
    }
}

//--------

function getInputFocus(oErr) {
    var oInput = oErr.parentNode.getElementsByTagName("input")[0];
    oInput.focus();
}

function CloseError(oInput) {
    oInput.setAttribute("isError", "0");
    var tipObj = oInput.parentNode.getElementsByTagName("span")[0];
    tipObj.style.display = "none";
    pushOKInputs(oInput); //添加正确验证
}

function OpenError(oInput, oTip) {
    var errObj = oInput.parentNode.getElementsByTagName("span")[0];
    errObj.style.display = "block";
    errObj.className = "tip error";
    errObj.innerHTML = "填写错误：" + oTip;
    //ShowTip(oInput);
    removeOKInputs(oInput); //删除正确验证
}

function ShowTip(oInput) {
    if (showedObj != null) {
        //showedObj.style.display = "none";
    }
    var tipObj = oInput.parentNode.getElementsByTagName("span")[0];
    showedObj = tipObj;
    var isError = oInput.getAttribute("isError") != null || oInput.getAttribute("isError") == "1";
    isError = false;
    tipObj.innerHTML = isError ? oInput.getAttribute("oErr") : oInput.getAttribute("oTip");
    tipObj.style.display = "block";
    tipObj.className = isError ? "tip error" : "tip active";
    try {
        var listTip = oInput.parentNode.getElementsByTagName("span");
        var tipOK = listTip[1];
        tipOK.className = "tipOK hide";
        var tipOK2 = listTip[2];
        tipOK2.className = "tipOK2 hide";
    } catch (e) { }
}

document.onclick = function (eve) {
    eve = window.event || eve;
    var beObj = eve.srcElement || eve.target;
    if (beObj.className != "tip" && beObj.className != "tip active" && beObj.getAttribute("oTip") == null && showedObj != null) {
        showedObj.blur();
    }
    //    if (beObj != $("agreementItem")) {//用户协议
    //        $("agreementItem").parentNode.getElementsByTagName("div")[0].style.display = "none";
    //    }
}

var showedObj = null;
var okObjInputs = new Array();

//-------------

function pushOKInputs(okObj) {
    if (!okObjInputs.exists(okObj) && okObj.tagName.toLowerCase() == "input") {
        okObjInputs.push(okObj);
    }
    subStatus();
    try {
        var listTip = okObj.parentNode.getElementsByTagName("span");
        var tipOK = listTip[1];
        tipOK.className = "tipOK ";
        var tipOK2 = listTip[2];
        tipOK2.className = "tipOK2 ";
        tipOK2.innerHTML = "填写正确";
    } catch (e) { }
}

function removeOKInputs(okObj) {
    okObjInputs.remove(okObj);
    subStatus();
    try {
        var listTip = okObj.parentNode.getElementsByTagName("span");
        var tipOK = listTip[1];
        tipOK.className = "tipOK hide";
        var tipOK2 = listTip[2];
        tipOK2.className = "tipOK2 hide";
    } catch (e) { }
}

function subStatus() {
    var Reg_Links = $("Reg_MainBox").getElementsByTagName("a");
    //    if (okObjInputs.length == 10) {
    //        Reg_Links[1].className = "reg-active";
    //    } else {
    //        Reg_Links[1].className = "reg-active reg-refz";
    //    }
}

function validateInputs() {
    var Reg_Inputs = $("Reg_MainBox").getElementsByTagName("input");
    var errIndexInput = -1;
    for (var i = 0; i < Reg_Inputs.length; i++) {
        Reg_Inputs[i].focus();
        Reg_Inputs[i].blur();
        if (!okObjInputs.exists(Reg_Inputs[i]) && errIndexInput < 0) {
            errIndexInput = i;
        }
    }
    return errIndexInput;
}

var submiting = false;

function Reg_formSubmit() {
    if (submiting == false) {
        submiting = true;
        var errIndexInput = validateInputs();
        //alert(errIndexInput);
        var Reg_Inputs = $("Reg_MainBox").getElementsByTagName("input");
        if (errIndexInput >= 0 && errIndexInput < 8) {
            if (Reg_Inputs[errIndexInput].getAttribute("oErr") == "" || Reg_Inputs[errIndexInput].getAttribute("oErr") == null) {
                //alert("您填写内容有错误，请检查！");
                Reg_Inputs[errIndexInput].focus();
                submiting = false;
                return false;
            } else {
                //alert(Reg_Inputs[errIndexInput].getAttribute("oErr"));
                Reg_Inputs[errIndexInput].focus();
                submiting = false;
                return false;
            }
        } else if (errIndexInput >= 8) {
            alert((errIndexInput == 8 ? "请仔细阅读并接受《用户服务协议》" : "请确认您已如实填写姓名、身份证号码等信息，以此作为领奖身份凭据。"));
            Reg_Inputs[errIndexInput == 8 ? 8 : 9].focus();
            submiting = false;
            return false;
        }
        if (okObjInputs.length >= 9) {
            return true;
        }
    }
    return false;
}