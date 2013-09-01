<%@page import="ssc.bean.UserInfo"%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%
    String userName="";
    long yuE=0;
    UserInfo ui = (UserInfo)session.getAttribute("curUser");
    String nextNBetIssues = (String)application.getAttribute("nextNBetIssues");
%>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<HEAD>
<TITLE>时时彩网</TITLE>
<BASE HREF="<%
    String s = request.getRequestURL().toString();
    out.print(s.substring(0, s.indexOf("/", 8))
            + request.getContextPath()+"/");
%>">
<META content="text/html; charset=utf-8" http-equiv=Content-Type>
<LINK rel="shortcut icon" href="img/favicon.ico"/>
<META content=IE=7 http-equiv=X-UA-Compatible>
<META name=Description content=时彩专业投注平台,为彩民提供专业的遗漏冷热分析,方便快捷的投注操作,高级实用的时时彩工具等服务>
<META name=keywords content=时时彩投注,时时彩代购>
<LINK rel=Stylesheet href="css/ssc.css">
<LINK rel=Stylesheet href="css/speed_cq.css">
<SCRIPT type="text/javascript" src="js/Core.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/Enum.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/Enum1.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/DateTime.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/ModalDialog.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/json2.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/AjaxHelper.js"></SCRIPT>
<SCRIPT type="text/javascript">
<!--
    try {
        cuser.HasLogin = eval("false");
        cuser.UserInfo.UserName = "";
        cuser.UserInfo.UserPhoneBinded = eval("false");
        cuser.UserInfo.VIP = eval("false");
    } catch (e) { }
-->
</SCRIPT>

<SCRIPT type="text/javascript">
    <!--
        cuser.HasLogin = false;
    -->
    </SCRIPT>
<SCRIPT type="text/javascript" src="js/ProjectCommon.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/Bet.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/SocketData.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/FlashVideo.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/SerialBetTool.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/Base.js"></SCRIPT>
<SCRIPT type="text/javascript">
    <!--
        if (window.top != window) {
            location.href = "";
        }
        fvClass.initialize(TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCCQSSC);
        //fvClass.initialize(parseInt("4", 10));
        try {
            flashServer.Port = parseInt("10004", 10);
        } catch (e) { }
        var noBetText = "<span class='adfull'><a title='研究时时彩，提高中奖率！时时彩网帮你分析！' href='/zj/cqssc' target='_blank'><img src='img/chip_plan_cq.gif' /></a></span>";
        noBetText = "<span class='adfull'><a title='时时彩网派红包' href='/management/201101' target='_blank'><img src='img/chip_2011_2.gif' /></a></span>";
        cuser.UserInfo.CurrentLotteryType = TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCCQSSC;
        cuser.setUserInfo("", "0", "0", cuser.UserInfo.CurrentLotteryType);
        ExecJsonCommand.Parameters.push(cuser.UserInfo.CurrentLotteryType);
        GetDataBonus(); ///获取近12期开奖信息
        GetDataYiLou(); ///获取遗漏数据
    -->
    </SCRIPT>
<STYLE type="text/css">
#FlashWatch {
	POSITION: fixed !important; BOTTOM: 0px; LEFT: 0px
}
.sumInfo .sList .i2 {
	WIDTH: 25.5%
}
.sumInfo .sList .i3 {
	WIDTH: 7%
}
.sumInfo .sList .i4 {
	WIDTH: 15%
}
.sumInfo .sList .i5 {
	WIDTH: 12%
}
.sumInfo .sList .i6 {
	WIDTH: 18%
}
.sumInfo .sList A SPAN {
	CURSOR: pointer
}
</STYLE>
<STYLE type="text/css">
HTML {
	OVERFLOW-Y: scroll
}
</STYLE>
<META name=GENERATOR content="MSHTML 8.00.6001.18702">
</HEAD>
<BODY>
<DIV style="DISPLAY: none" id=bottomTongji></DIV>
<FORM id=aspnetForm method=post name=aspnetForm
action=http://www.shishicai.cn/lottery/speed/fccqssc/base.aspx>

  <DIV id=ContainerWrapper></DIV>
  <DIV id=wrapper class=cq>
    <STYLE type="text/css">
		#containerLotteryChoose LI H4 {
			MARGIN-LEFT: 1em; FONT-SIZE: 12px
		}
		#containerLotteryChoose LI A {
			PADDING-BOTTOM: 3px; TEXT-INDENT: 1em; PADDING-TOP: 3px
		}
	</STYLE>
    <SCRIPT type="text/javascript">
    	noBetText = "";
	</SCRIPT>
    <SCRIPT type="text/javascript">
    	cuser.UserInfo.UserName = '';
	</SCRIPT>




    <DIV class=head>
      <H1 class=logo><A>时时彩</A></H1>
      <DIV class=headTop><SPAN class=logo_s><A href="#">时时彩</A></SPAN>
          <SCRIPT type="text/javascript">
				    function showLotteryLink(display, objId) {
				        $(objId).style.display = display ? "block" : "none";
				    }
			</SCRIPT>
        <UL class=instruction>
          <LI class=i1 onMouseOver="showLotteryLink(true,'containerGradeBonusMoney')"
  				onmouseout="showLotteryLink(false,'containerGradeBonusMoney')">奖金奖级
            <DIV style="DISPLAY: none" id=containerGradeBonusMoney class=lotclass>
              <TABLE cellSpacing=0><TBODY>
                  <TR><TD>一星</TD> <TD>10元</TD></TR>
                  <TR><TD>二星直选</TD><TD>100元</TD></TR>
                  <TR><TD>三星直选</TD><TD>1000元</TD></TR>
                  <TR><TD>五星直选</TD><TD>100000元</TD></TR>
                  <TR><TD>二星组选</TD><TD>50元</TD></TR>
                  <TR><TD>三星组选三</TD><TD>320元</TD></TR>
                  <TR><TD>三星组选六</TD><TD>160元</TD></TR>
                  <TR><TD>二星和值</TD><TD>100元</TD></TR>
                  <TR><TD>三星和值</TD><TD>1000元</TD></TR>
                  <TR><TD>二星组选</TD><TD>50元</TD></TR>
                  <TR><TD>大小单双</TD><TD>4元</TD></TR>
                  <TR><TD>五星通选一等奖</TD><TD>20000元</TD></TR>
                  <TR><TD>五星通选二等奖</TD><TD>200元</TD></TR>
                  <TR><TD>五星通选三等奖</TD><TD>20元</TD></TR>
                </TBODY></TABLE>
            </DIV>
          </LI>
          <LI class=i2 onMouseOver="showLotteryLink(true,'containerBonusTime')"
  				onmouseout="showLotteryLink(false,'containerBonusTime')">开奖时间
            <UL style="DISPLAY: none" id=containerBonusTime class=lotins>
              <LI><STRONG>开奖时间</STRONG> <P>白天10 点至22点 夜场22 点至凌晨2 点</P></LI>
              <LI><STRONG>开奖频率</STRONG><P>白天10 分钟 夜场5 分钟</P></LI>
              <LI><STRONG>每日期数</STRONG><P>白天72 期，夜场48期，共 120 期</P></LI>
              <LI><STRONG>返奖率</STRONG>：销售总金额的50%返给中奖彩民 </LI>
            </UL>
          </LI>
          <LI><A id=ctl00_cphHeader_Games2010_BetHeader1_hlDetails href="playmethod.html" target=_blank>玩法介绍</A></LI>
          <!--LI><A id=ctl00_cphHeader_Games2010_BetHeader1_hlHistoryBonus href="http://" target=_blank>历史号码</A></LI-->
          <!--LI><A id=ctl00_cphHeader_Games2010_BetHeader1_hlTrendDefault href="http://" target=_blank>走势图表</A></LI-->
          <LI><A href="#" target=_blank>时时彩网首页</A></LI>
        </UL>
        <!--SPAN class=top_admin><A class=ico_qq onClick="window.open('http://b3.qq.com/webc.htm?new=0&amp;sid=53725025&amp;eid=&amp;o=www.shishicai.cn&amp;q=7', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');return false;"
href="tencent://message/?uin=53725025&amp;Site=www.shishicai.cn&amp;Menu=yes">在线客服</A>
</SPAN-->
        <UL class=subMenu>
          <LI class=subl>
<%
    if(ui!=null){
%>
<DIV style="DISPLAY: none"  id=Login_UnLogined class=mmc>
<%
    }else{
%>              <DIV id=Login_UnLogined class=mmc><%
    }
%>

                <SPAN class=ins>请先登录</SPAN>
            <SPAN class=g><LABEL>用户名：</LABEL>
              <INPUT id=Login_UserName class=ipt onFocus="if(this.value!=''){this.select();}" type=text></SPAN>
              <SPAN class=g> <LABEL>密码：</LABEL>
              <INPUT style="FONT-FAMILY: arial, tahoma; FONT-SIZE: 14px" id=Login_Pass class=ipt onFocus="if(this.value!=''){this.select();}" type=password></SPAN>
              <SPAN style="DISPLAY: none" id=Login_SCBox class=g>  <LABEL>验证码：</LABEL>
              <SPAN><IMG style="WIDTH: 50px; FLOAT: left; HEIGHT: 18px; CURSOR: pointer; MARGIN-RIGHT: 2px"
  id=Login_Img title=点击刷新验证码 onclick=reLoadSessionCode() alt=点击刷新验证码 src="img/SessionCode.gif">
              <INPUT style="WIDTH: 26px" id=Login_SessinCode class=ipt onfocus=this.select() maxLength=4 type=text></SPAN></SPAN>
              <SPAN class=g><A id=submit1 class=btn_mmc onclick=LoginSetp1() href="javascript:void(0)">登录</A></SPAN>
              <!--SPAN class=g><A class=btn_mmc href="http://www.shishicai.cn/alipaylogin.aspx">支付宝登录</A></SPAN-->
              <A href="regedit.html" target=_blank>免费注册</A>
              <SCRIPT type="text/javascript">
					        function reLoadSessionCode() {
					            Login_Img.src = "/SessionCode.ashx?t=" + new Date().toString();
					            Login_SessinCode.focus();
					        }

					        var Login_UnLogined = $("Login_UnLogined");
					        var Login_Logined = null;
					        var Login_UserName = $("Login_UserName");
					        var Login_Pass = $("Login_Pass");
					        var Login_SCBox = $("Login_SCBox");
					        var Login_SessinCode = $("Login_SessinCode");
					        var Login_Img = $("Login_Img");
					        var submit1 = $("submit1");
					        function LoginSetp1() {
					            if (eval(submit1.getAttribute("disabled"))) {
					                return;
					            }
					            if (Login_UserName.value.trim() == "") {
					                alert("请输入用户名");
					                Login_UserName.focus();
					                return;
					            }
					            if (Login_Pass.value == "") {
					                alert("请输入密码");
					                Login_Pass.focus();
					                return;
					            }
					            //						            reLoadSessionCode();
					            cuser.login(Login_UserName, Login_Pass, Login_SessinCode, submit1);
					        }
					        var tbv = new TextBox_Event();
					        Login_UserName.onkeyup = tbv.keyUpButtonClick.bind(tbv, submit1);
					        Login_Pass.onkeyup = tbv.keyUpButtonClick.bind(tbv, submit1);
					        Login_SessinCode.onkeyup = tbv.keyUpButtonClick.bind(tbv, submit1);

					        cuser.loginedEventHandler_Default = function() {
					            if (Login_Logined == null) {
					                Login_Logined = $("Login_Logined");
					            }
					            Login_UnLogined.style.display = "none";
					            Login_Logined.style.display = "";
					            Login_Logined.innerHTML = "<div>正在验证您的登录信息，请稍后……</div>";
					            try {
					                setTimeout(function() {
					                    window.location.href = window.location.href;
					                }, 1000);
					            } catch (e) { }
					        }
					    </SCRIPT>
            </DIV>
<%
    if(ui!=null){
        userName = ui.getULoginname();
        yuE = ui.getUYue();
%>
<DIV id=Login_Logined class=mmc>
<%
    }else{
%>              <DIV style="DISPLAY: none" id=Login_Logined class=mmc><%
    }
%>
            
              <UL class=u>
              <LI>欢迎您，<EM id=UserInfo_UserName><%=userName%></EM>[<A href="LogoutServlet">退出</A>]</LI>
              <LI class=msg title=站内短信>(<EM><A id=UserInfo_Message href="" target=_blank>0</A></EM>)</LI>
              <LI>余额：<SPAN id=logined_Money><%=yuE%>.00</SPAN>元 [<A onclick=cuser.refreshBalanceUpdate() href="javascript:void(0)">刷新</A>]</LI>
              </UL>
              <SPAN class="g g2"><A class=btn_mmc title="请到收银台办理" target=_blank>帐户充值</A>
              <A class=btn_mmc  title="请到收银台办理" target=_blank>提取奖金</A>
              <A class=btn_mmc href="" target=_blank>投注记录</A>
              <A class=btn_mmc href="" target=_blank>资金明细</A></SPAN>
            </DIV>
          </LI>
          <!--LI class=subr>公告：<A href="" target=_blank>
          <SPAN style="COLOR: rgb(255,0,0); MARGIN-LEFT: 0px">8月的又一个大奖，金额高达42000元</SPAN></A></LI-->
        </UL>
      </DIV>
    </DIV>




    <SCRIPT type="text/javascript">
	    try {
	        var isSaleStop = eval("false");
	        function stopSale() {
	            var BtnSubmitBetList = $("BtnSubmitBetList") || $("btnBet");
                    if (BtnSubmitBetList == null) {return;}
	            BtnSubmitBetList.style.display = "none";
	            var btnStopSale = document.createElement("a");
	            btnStopSale.className = "btn btn_now btnChartConfirm btnChartConfirmStop";
	            btnStopSale.href = "javascript:void(0)";
	            btnStopSale.innerHTML = "暂停销售";
	            btnStopSale.onclick = function () {
	                alert("中心通讯故障，暂停销售！".replace(/(<[^>]+>)/ig, ""));
	            }
	            BtnSubmitBetList.parentNode.appendChild(btnStopSale);
	            var pText = document.createElement("p");
	            pText.innerHTML = "中心通讯故障，暂停销售！";
	            BtnSubmitBetList.parentNode.parentNode.appendChild(pText);
	        }
	        if (isSaleStop) {
	            if (document.all) {
	                window.attachEvent("onload", stopSale);
	            } else {
	                window.addEventListener("load", stopSale, false);
	            }
	        }
                function autoPutBetMenu(list) {
	            for (var i = 0; i < list.length; i++) {
	                betList.addItem(11, list[i].p, list[i].a, list[i].c, list[i].b);
	            }
	            setTimeout(function () { window.scroll(0, $("ContainerBetListWrap").offsetTop) }, 1500);
	        }
	    } catch (e) { }
	</SCRIPT>



    <DIV class=lottery><A style="DISPLAY: block; FONT: 0px/0px sans-serif; HEIGHT: 0px" name=top>&nbsp;</A>
      <DIV class=lotNow>
        <OBJECT id=BetFlash name=SocketForJs width=470 height=183 type="application/x-shockwave-flash">
            <param name="movie" value="fla/demo.shishicai.cn/BetFlash.swf?lt=%e9%87%8d%e5%ba%86%e6%97%b6%e6%97%b6%e5%bd%a9&group=1"/>
            <param name="quality" value="high"/>
            <param name="bgcolor" value="#ffffff"/>
            <param name="allowScriptAccess" value="sameDomain"/>
            <param name="wmode" value="transparent"/>
            <embed id="BetFlash" src="fla/demo.shishicai.cn/BetFlash.swf?lt=%e9%87%8d%e5%ba%86%e6%97%b6%e6%97%b6%e5%bd%a9&group=1" wmode="transparent"
                 quality="high" bgcolor="#ffffff" width="470" height="183" name="CQSSCAwardNumberShow" align="middle" play="true" loop="false"
                 allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash"
                 pluginspage="http://www.macromedia.com/go/getflashplayer" />
        </OBJECT>
      </DIV>
      <DIV class=sumInfo>
        <DIV class=sListt>
        <SPAN style="DISPLAY: none" id=MoreTrend class=sumInfoMore>
        <A href="" target=_blank>更多今日开奖</A></SPAN>
        <SPAN style="DISPLAY: none" id=MoreBetRecord class=sumInfoMore>
        <A href="" target=_blank>中奖查询</A></SPAN>
          <UL id=ActionListContainerMenu class=tab_sList>
            <LI class=rctly><SPAN>今日开奖</SPAN></LI>
            <LI><SPAN>&nbsp;&nbsp;&nbsp;&nbsp;</SPAN></LI>
            <LI><SPAN>&nbsp;&nbsp;&nbsp;&nbsp;</SPAN></LI>
            <LI><SPAN>&nbsp;&nbsp;&nbsp;&nbsp;</SPAN></LI>
            <LI><SPAN>&nbsp;&nbsp;&nbsp;&nbsp;</SPAN></LI>
            <LI><SPAN>&nbsp;&nbsp;&nbsp;&nbsp;</SPAN></LI>
          </UL>
        </DIV>
        <UL style="DISPLAY: none" id=ActionListContainerBonusHead class="sList thc deftlight">
          <LI><SPAN class=i1>期号</SPAN><SPAN class=i2>开奖号码</SPAN>
          <SPAN class=i3>2星和</SPAN><SPAN class=i4>3星和</SPAN>
          <SPAN class=i5>大小单双</SPAN><SPAN class=i6>2星组选</SPAN><SPAN class=i7>3星组选</SPAN></LI></UL>
        <UL style="DISPLAY: none" id=ActionListContainerRecordHead class="sList thc">
          <LI><SPAN class=i1>玩法类型</SPAN><SPAN class=i2>投注内容</SPAN><SPAN class=i3>倍数</SPAN>
          <SPAN class=i4>金额</SPAN><SPAN class=i5>状态</SPAN><SPAN class=i6>奖金</SPAN><SPAN class=i7></SPAN></LI></UL>
        <UL style="BACKGROUND-COLOR: #dddddd; DISPLAY: none" id=ActionListContainerRecordUl1 class="sList liHighlight"></UL>
        <UL style="BACKGROUND-COLOR: #dddddd; DISPLAY: none" id=ActionListContainerRecordUl2 class="sList liHighlight"></UL>
        <UL style="BACKGROUND-COLOR: #dddddd; DISPLAY: none" id=ActionListContainerRecordUl3 class="sList liHighlight"></UL>
        <UL style="BACKGROUND-COLOR: #dddddd; DISPLAY: none" id=ActionListContainerRecordUl4 class="sList liHighlight"></UL>
        <UL style="BACKGROUND-COLOR: #dddddd; DISPLAY: none" id=ActionListContainerRecordUl5 class="sList liHighlight"></UL>
        <UL style="BACKGROUND-COLOR: #474747; DISPLAY: none" id=ActionListContainerBonusUl class="sList deftlight">
          <LI class=othersNone><SPAN>Loading……</SPAN></LI>        </UL>
      </DIV>
    </DIV>


    <A style="DISPLAY: block; FONT: 0px/0px sans-serif; HEIGHT: 0px" name=jumpmenuselect>&nbsp;</A>


    <DIV id=ContainerBetMenuWrap class=section>
      <UL class=classCheck>
        <LI class=c1>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="2星和值" pt="sum_star_2"><SPAN>2星和值</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="3星和值" pt="sum_star_3"><SPAN>3星和值</SPAN></A>
        </LI>
        <LI class=c2>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="五星通选" pt="tongxuan_star_5"><SPAN>五星通选</SPAN></A>
        </LI>
        <LI class=c3>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="3组包点" pt="baodian_star_3"><SPAN>3组包点</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="3组包胆" pt="baodan_star_3"><SPAN>3组包胆</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="组选三" pt="zuxuan3_star_3"><SPAN>组选三</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="三星直选组合" pt="zhixuanzuhe_star_3"><SPAN>三星直选组合</SPAN></A>
        <A class=tr onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="组选六" pt="zuxuan6_star_3"><SPAN>组选六</SPAN></A>
        </LI>
        <LI class=c4>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="标准1星" pt="standard_star_1"><SPAN>1星</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="标准2星" pt="standard_star_2"><SPAN>2星</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="标准3星" pt="standard_star_3"><SPAN>3星</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="标准5星" pt="standard_star_5"><SPAN>5星</SPAN></A>
        </LI>
        <LI class=c5>
        <A id=initMenu onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="大小单双" pt="dxds"><SPAN>大小单双</SPAN></A>
        </LI>
        <LI class=c6>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="2星组选" pt="zuxuan_star_2"><SPAN>2星组选</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="2组分位" pt="fenwei_star_2"><SPAN>2组分位</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="2组包点" pt="baodian_star_2"><SPAN>2组包点</SPAN></A>
        <A onclick=BetMenu.setMenu(this) href="javascript:void(0)" ptcn="2组包胆" pt="baodan_star_2"><SPAN>2组包胆</SPAN></A>
        </LI>
      </UL>
      <DIV class=stnmain>
        <DIV id=ContainerIframes class=nPanel>
        <SPAN class=panelItem>
        <EM id=menuTitle></EM>
        <SPAN class=panelItemr>
        <A id=menuNormal href="javascript:void(0)">常规选号</A>
        <A style="VISIBILITY: visible" id=menuTrend href="javascript:void(0)">走势选号</A>
        <A style="VISIBILITY: visible" id=menuFile href="javascript:void(0)">手工录入</A>
        <A style="VISIBILITY: visible" id=menuSpecial href="javascript:void(0)">和值</A>
        </SPAN>
        <Q id=menuQ></Q>
        </SPAN>
        </DIV>
      </DIV>
      <DIV class=stnbottom></DIV>
    </DIV>




    <SCRIPT type="text/javascript">
	<!--
	    BetMenu.ContainerIframes = $("ContainerIframes");
	    BetMenu.ChildMenu.Title = $("menuTitle");
	    BetMenu.ChildMenu.Q = $("menuQ");
	    BetMenu.ChildMenu.Normal = $("menuNormal");
	    BetMenu.ChildMenu.Trend = $("menuTrend");
	    BetMenu.ChildMenu.File = $("menuFile");
	    BetMenu.ChildMenu.Special = $("menuSpecial");
	    BetMenu.initialize();
	    BetMenu.setMenu($("ContainerBetMenuWrap").getElementsByTagName("ul")[0].getElementsByTagName("a")[8], true);
	-->
	</SCRIPT>
    <A style="DISPLAY: block; FONT: 0px/0px sans-serif; HEIGHT: 0px" name=jumpjetlist>&nbsp;</A>


    <DIV id=ContainerBetListWrap class="section sectionChart">
      <H3 class=stn>重庆时时彩投注单<SPAN class=str></SPAN></H3>
      <DIV class=stnmain>
        <DIV class=chartIn>
          <UL id=BetListWrap class=liHighlight>
            <LI class=thc><SPAN class=l>投注项：<EM id=BetListCount>0</EM></SPAN><SPAN id=BetListDelete class=r title=删除全部>×</SPAN></LI>
          </UL>
          <I class=shadowBottom><I class=shadowBottomL></I></I></DIV>
        <DIV class=multiple>
          <DIV class=zh><SPAN>
            <LABEL for=cnn>
              <INPUT id=cnn type=checkbox>追号</LABEL>
            </SPAN></DIV>
          <DIV></DIV>
          <DIV id=ContainerMultipleMost class=zhuihao>
            <DIV id=ContainerIssue class=multipleC>
              <DIV class=thc>
              <SPAN class=l>期数倍数</SPAN>
              <SPAN class=r>
              <A style="DISPLAY: none" class=ico_help title=帮助 href="">帮助</A></SPAN></DIV>
              <UL class=tab_multiple>
                <LI>
                  <INPUT id=MenuIssue1 CHECKED type=radio name=MenuIssue>
                  <LABEL   for=MenuIssue1>自定义</LABEL></LI>
                <LI onClick="alert(this.getAttribute('toolTip'))" toolTip="倍投计算器暂仅支持单组号码计算">
                  <INPUT id=MenuIssue2 disabled onClick="betList.setMutiplyIssueType(true, this, $('MenuIssue1'))" type=radio name=MenuIssue>
                  <LABEL for=MenuIssue2>倍投工具</LABEL></LI>
              </UL>
              <UL class="itemList condtn">
                <LI><SPAN class=cse>
                <A title=购买1期 onclick=betList.ModelIssue.createIssues(1) href="javascript:void(0)">1期</A>
                <A title=购买5期 onclick=betList.ModelIssue.createIssues(5) href="javascript:void(0)">5期</A>
                <A title=购买10期 onclick=betList.ModelIssue.createIssues(10) href="javascript:void(0)">10期</A>
                <A title=购买15期 onclick=betList.ModelIssue.createIssues(15) href="javascript:void(0)">15期</A>
                <A title=购买20期 onclick=betList.ModelIssue.createIssues(20) href="javascript:void(0)">20期</A></SPAN>
                起始:<SELECT id=ObjectIssueSelect> </SELECT>
                  追<INPUT id=ObjectIssueTextInput value=1 type=text> 期(最多<EM id=CountIssue1></EM>期) </LI>              </UL>
              <DIV class=itemBox>
                <UL class="itemList thc">
                  <LI><SPAN class=i1><INPUT id=ObjectIssueCheckBox type=checkbox> </SPAN>
                  <SPAN class=i2>期号</SPAN> <SPAN style="COLOR: #ebab00" class=i3>输入倍数</SPAN>
                  <SPAN class=i4>当期投入</SPAN><SPAN class=i5>累积投入</SPAN><SPAN class=i6>当期奖金</SPAN>
                  <SPAN class=i7>合计利润</SPAN></LI></UL>
                <UL id=Container_Issue class=itemList> </UL>
              </DIV>
              <I class=shadowBottom><I class=shadowBottomL></I></I></DIV>
            <DIV></DIV>
            <DIV style="DISPLAY: none; BACKGROUND-REPEAT: repeat-y" id=ContainerMutiply class="multipleC multipleCTool">
              <DIV class=thc><SPAN class=l>期数倍数</SPAN>
              <SPAN class=r><A style="DISPLAY: none" class=ico_help title="帮助" href="">帮助</A>
              </SPAN></DIV>
              <UL class=tab_multiple>
                <LI><INPUT id=MenuMutiply1 onClick="betList.setMutiplyIssueType(false, this, $('MenuMutiply2'))" type=radio name=MenuMutiply>
                  <LABEL for=MenuMutiply1>自定义</LABEL> </LI>
                <LI class=active><INPUT id=MenuMutiply2 CHECKED type=radio name=MenuMutiply>
                  <LABEL for=MenuMutiply2><STRONG>倍投工具</STRONG></LABEL> </LI>
              </UL>
              <UL class="itemList condtn">
                <LI>起始期号：<SELECT id=ObjectMutiplySelect> </SELECT>
                追<INPUT id=ObjectMutiplyTextInput value=10 type=text> 期 （最多可追<EM   id=CountIssue2></EM>期）
                  <P>起始倍数:<INPUT id=ObjectMutiplyStartMutiply value=1 type=text> </P>
                  <UL>
                    <LI>
                    <INPUT onclick=betList.ModelMutiply.setProjectType(this.value) value=1 type=radio name=ObjectMutiplayRadioType>全程利润率：
                    <INPUT id=ObjectMutiplyAllProfitsRate class=cdn_ipt value=10 type=text> % </LI>
                    <LI>
                      <INPUT onclick=betList.ModelMutiply.setProjectType(this.value) value=2 type=radio name=ObjectMutiplayRadioType>前
                      <INPUT id=ObjectMutiplySplitIssueCount2 class=cdn_ipt value=5 type=text>期利润率
                      <INPUT id=ObjectMutiplyForepartProfitsRate class=cdn_ipt value=10 type=text>%，之后利润率
                      <INPUT id=ObjectMutiplyAfterpartProfitsRate class=cdn_ipt value=5 type=text>% </LI>
                    <LI>
                      <INPUT onclick=betList.ModelMutiply.setProjectType(this.value) value=3 type=radio name=ObjectMutiplayRadioType>全程累计利润：
                      <INPUT id=ObjectMutiplyAllProfitsMoney class=cdn_ipt value=100 type=text>  元 </LI>
                    <LI>
                      <INPUT onclick=betList.ModelMutiply.setProjectType(this.value) value=4 type=radio name=ObjectMutiplayRadioType>前
                      <INPUT id=ObjectMutiplySplitIssueCount4 class=cdn_ipt value=5 type=text> 期累计利润
                      <INPUT id=ObjectMutiplyForepartProfitsMoney class=cdn_ipt value=100 type=text>元，之后累计利润
                      <INPUT id=ObjectMutiplyAfterpartProfitsMoney class=cdn_ipt value=50 type=text> 元 </LI>
                  </UL>
                  <P class=cdn_go> <INPUT onclick=betList.ModelMutiply.createList() value=生成投资计划表 type=button></P>
                </LI>
              </UL>
              <DIV class=itemBox>
                <UL class="itemList thc">
                  <LI><SPAN class=i1>期号</SPAN><SPAN class=i2>倍数</SPAN>
                  <SPAN class=i3>当期投入</SPAN><SPAN class=i4>累积投入</SPAN>
                  <SPAN class=i5>当期奖金</SPAN><SPAN class=i6>合计利润</SPAN>
                  <SPAN class=i7>利润率</SPAN></LI>
                </UL>
                <UL id=ContainerMutiplyList class=itemList></UL>
              </DIV>
              <I class=shadowBottom><I class=shadowBottomL></I></I></DIV>
            <DIV></DIV>
            <UL style="DISPLAY: none" id=ContainerChase class="itemList chase stp">
              <LI>
                <DIV class=l>
                  <P>
                    <INPUT id=ObjectChase onclick=betList.ChaseChanged(this) type=checkbox>
                    <EM>
                    <LABEL for=ObjectChase>中奖后停止</LABEL>
                    </EM>投注多期时，当某期中奖后，自动放弃后面几期投注操作。 <BR>
                    <I style="DISPLAY: none; MARGIN-LEFT: 25px">
                    <INPUT id=radioBonusStop2 value=2 type=radio name=bonusStop>
                    <LABEL id=labelBonusStop2 for=radioBonusStop2>中2停止</LABEL>
                    <INPUT id=radioBonusStop3 value=3 type=radio name=bonusStop>
                    <LABEL id=labelBonusStop3 for=radioBonusStop3>中3停止</LABEL>
                    <INPUT id=radioBonusStop5 value=5 type=radio name=bonusStop>
                    <LABEL id=labelBonusStop5 for=radioBonusStop5>中5停止</LABEL>
                    </I></P>
                  <P>
                    <INPUT id=ObjectChase2 onclick=betList.ChaseChanged(this) CHECKED type=checkbox>
                    <EM> <LABEL for=ObjectChase2>出号后放弃</LABEL>
                    </EM>延后投注时，投注号码提前开出，自动放弃后面几期投注操作。 <BR>
                    <I style="DISPLAY: none; MARGIN-LEFT: 25px">
                    <INPUT id=radioShouldBonusStop2 value=2 type=radio name=shouldBonusStop>
                    <LABEL id=labelShouldBonusStop2 for=radioShouldBonusStop2>中2放弃</LABEL>
                    <INPUT id=radioShouldBonusStop3 value=3 type=radio name=shouldBonusStop>
                    <LABEL id=labelShouldBonusStop3 for=radioShouldBonusStop3>中3放弃</LABEL>
                    <INPUT id=radioShouldBonusStop5 value=5 type=radio name=shouldBonusStop>
                    <LABEL id=labelShouldBonusStop5 for=radioShouldBonusStop5>中5放弃</LABEL>
                    </I></P>
                </DIV>
                <DIV style="CLEAR: both;display: none;">
                <SPAN style="MARGIN-TOP: 15px" class=m>(我已仔细阅读并接受“
                <A href="http://www.shishicai.cn/Help/Details.aspx?id=67" target=_blank>追号服务协议</A>”。)</SPAN>
                <SPAN class=r><A class=ico_help title=帮助 href="http://www.shishicai.cn/Help/Details.aspx?id=47" target=_blank>帮助</A></SPAN> </DIV>
              </LI>
            </UL>
            <DIV></DIV>
            <DIV class=chartCheck>
              <!--P><A style="COLOR: #f00" href="http://www.shishicai.cn/Help/Details.aspx?id=113" target=_blank>无法输入投注倍数？点击这里</A></P-->
              <P class=sum>共<EM id=ObjectBetCount></EM>注，购买<EM id=ObjectIssueCount></EM>期，合计：<EM id=ObjectBetMoney></EM></P>
            </DIV>
          </DIV>
          <DIV></DIV>
          <DIV id=ContainerMultipleSimple class=zhuihao0>
            <P class=z2><SPAN>单倍注数<EM id=ObjectBetCount0 class=flt>0</EM>注， </SPAN><SPAN>倍数:
              <INPUT id=ObjectMultiple0 class=bs value=1 type=text>
              </SPAN><SPAN>合计：<EM id=ObjectBetMoney0 class=flt></EM></SPAN></P>
            <P class=z3><SPAN class=vra>当前期:<SPAN id=ContainerCurrentBetIssue></SPAN>
            <IMG id=ImageCurrentBetIssue alt="" src="img/navl_new.gif"></SPAN></P>
          </DIV>
          <DIV class=chartCheck>
            <P><A id=BtnSubmitBetList class="btn btnChartConfirm" onclick=SumitBetList() href="javascript:void(0)">放入投注单</A></P>
          </DIV>
        </DIV>
      </DIV>
      <DIV class=stnbottom></DIV>
    </DIV>





    <DIV></DIV>



    <DIV class="section sectionChart update">
      <H3 class=stn>今日开奖
      <!--A style="COLOR: #f00; MARGIN-LEFT: 20px; FONT-SIZE: 12px" href="http://video.shishicai.cn/haoma/cqssc/down.aspx" target=_blank>下载历史开奖号码</A-->
      <SPAN class=str></SPAN></H3>
      <DIV class=stnmain>
        <DIV id=ActionListContainerBonus class=updateElement></DIV>
      </DIV>
      <DIV class=stnbottom></DIV>
    </DIV>


    <EMBED id=FlashWatch height=100
        name=CQSSCAwardNumberShow type="application/x-shockwave-flash" align=middle
        pluginspage="http://www.macromedia.com/go/getflashplayer" width=120
        src="fla/demo.shishicai.cn/watch.swf?lt=%e9%87%8d%e5%ba%86%e6%97%b6%e6%97%b6%e5%bd%a9&amp;r=102046"
        allowFullScreen="false" allowScriptAccess="always" bgcolor="#ffffff"
        quality="high" wmode="transparent"/>
      <SCRIPT type="text/javascript">
	<!--
	    function FlashWatchShow(){
	        if(document.documentElement.scrollTop >= ($("BetFlash").offsetTop + $("BetFlash").offsetHeight / 3)){
	            $("FlashWatch").style.display = "";
	        }else{
    	        $("FlashWatch").style.display = "none";
    	    }
	    }
	    window.onscroll = FlashWatchShow;
	    FlashWatchShow();
        $("FlashWatch").style.display = "";
	    var modalDialog = new ModalDialog("modalDialog");
	    modalDialog.ContentIndex = 0;
	    var betList = new TKCPCEO.Lottery.FCCQSSC.BetList();
	    betList.ListBonusMoney = ["10","100","100","1000","1000","100000","100000","100","1000","4","50","50","320","320","160","160","1000"];
	    betList.ContainerWrap = $("BetListWrap");
	    betList.CommonSpeedInfo.DateTime_StartTime = "0:00:00";
	    betList.CommonSpeedInfo.Seconds_BetEndTime = "60";
	    betList.CommonSpeedInfo.Minutes_IntervalTime = "10";
	    betList.CommonSpeedInfo.Count_EveryDay = "120";
	    betList.CommonSpeedInfo.SplitString_Issue = [<%=nextNBetIssues%>].toString();
	    betList.ModelIssue.Container.Wrap = $("ContainerIssue");
	    betList.ModelIssue.Container.Issue = $("Container_Issue");
	    betList.ObjShowBetListCount = $("BetListCount");
	    betList.ObjBetListDelete = $("BetListDelete");
	    betList.ModelIssue.Object.TextInput = $("ObjectIssueTextInput");
	    betList.ModelIssue.Object.CheckBox = $("ObjectIssueCheckBox");
	    betList.ModelIssue.Object.Select = $("ObjectIssueSelect");
	    betList.ModelIssue.Parent = betList;
	    betList.ModelMutiply.Container.Wrap = $("ContainerMutiply");
	    betList.ModelMutiply.Container.Issue = $("ContainerMutiplyList");
	    betList.ModelMutiply.Object.Select = $("ObjectMutiplySelect");
	    betList.ModelMutiply.Object.TextInput = $("ObjectMutiplyTextInput");
	    betList.ModelMutiply.Object.StartMutiply = $("ObjectMutiplyStartMutiply");
	    betList.ModelMutiply.Object.AllIssueCount = $("ObjectMutiplyTextInput");
	    betList.ModelMutiply.Object.AllProfitsRate = $("ObjectMutiplyAllProfitsRate");
	    betList.ModelMutiply.Object.AllProfitsMoney = $("ObjectMutiplyAllProfitsMoney");
	    betList.ModelMutiply.Object.SplitIssueCount2 = $("ObjectMutiplySplitIssueCount2");
	    betList.ModelMutiply.Object.SplitIssueCount4 = $("ObjectMutiplySplitIssueCount4");
	    betList.ModelMutiply.Object.ForepartProfitsRate = $("ObjectMutiplyForepartProfitsRate");
	    betList.ModelMutiply.Object.AfterpartProfitsRate = $("ObjectMutiplyAfterpartProfitsRate");
	    betList.ModelMutiply.Object.ForepartProfitsMoney = $("ObjectMutiplyForepartProfitsMoney");
	    betList.ModelMutiply.Object.AfterpartProfitsMoney = $("ObjectMutiplyAfterpartProfitsMoney");
	    betList.ModelMutiply.Parent = betList;
	    betList.ContainerChase = $("ContainerChase");
	    betList.ObjectChase = $("ObjectChase");
	    betList.ObjectChase2 = $("ObjectChase2");
	    betList.initialize();

	    var actionList = new TKCPCEO.Lottery.FCCQSSC.ActionList();
	    actionList.Container.Menu = $("ActionListContainerMenu");
	    actionList.Container.BonusHead = $("ActionListContainerBonusHead");
	    actionList.Container.BonusUl = $("ActionListContainerBonusUl");
	    actionList.Container.BetRecordHead = $("ActionListContainerRecordHead");
	    actionList.Container.BetRecordUl1 = $("ActionListContainerRecordUl1");
	    actionList.Container.BetRecordUl2 = $("ActionListContainerRecordUl2");
	    actionList.Container.BetRecordUl3 = $("ActionListContainerRecordUl3");
	    actionList.Container.BetRecordUl4 = $("ActionListContainerRecordUl4");
	    actionList.Container.BetRecordUl5 = $("ActionListContainerRecordUl5");
	    actionList.initialize();

	    var checkEvent_AllowErr = setInterval(function() { Event_AllowErr(); }, 20000);
        var checkEvent_RefreshCurrentIssueRecord = setInterval(function() { Event_RefreshCurrentIssueRecord(); }, 15000);
        var checkEvent_RefreshBeBonusedRecord = null;

	    GetRecentBetRecord(0);
	    ExecJsonCommand.CommandName = "GetTodayBonus";
        SendJsonCommand.Parameters[0] = ExecJsonCommand.toString();
        SendToServer(SendJsonCommand.toString());


<%
    if(ui!=null){
        /*
            cuser.UserInfo.UserId = "<!--%=ui.getuId()%-->";
            cuser.UserInfo.UserName = "<!--%=ui.getULoginname()%-->";
            cuser.UserInfo.Balance = parseFloat("<!--%=ui.getUYue()%-->");
            var jsonBalance = new JSONCommand();
            jsonBalance.CommandName = "0";
            jsonBalance.Parameters.push(cuser.UserInfo.Balance);
            jsonBalance.Parameters.push("网站账户");
            cuser.UserInfo.ListAccount.push(jsonBalance);
            cuser.UserInfo.ListAccount.push(cuser.UserInfo.Balance);
            cuser.UserInfo.Message = parseInt("0", 10);
            cuser.UserInfo.Point = parseInt("0", 10);
            cuser.UserInfo.VIP = eval(false);
            cuser.UserInfo.UserPhoneBinded = eval(false);
            cuser.UserInfo.UrlLoginBack = "";
            cuser.HasLogin = true;
            cuser.refreshUserInfo();
        */
%>


        function SumitBetList(){
            ///<summary>提交投注单</summary>
            modalDialog.ContentIndex = 0;
            betList.JsonCmdProject.IssueList = betList.IsMutiplyTool == true ? betList.ModelMutiply.ListIssues : betList.ModelIssue.ListIssues;
            if(betList.JsonCmdProject.IssueList==betList.ModelMutiply.ListIssues && !$("cnn").checked){
                betList.JsonCmdProject.IssueList = betList.ModelIssue.ListIssues;
            }
            if (betList.JsonCmdProject.TicketList.length <= 0) {
                alert("投注单内容不能为空");
                return;
            }
            if (betList.JsonCmdProject.IssueList.length <= 0) {
                alert("至少必须购买一期");
                return;
            }

            var firmMsg = "请确认以下信息，确认无误后请点击确认按钮\n";
            firmMsg += "------------------------------------------------\n";
            for(var i = 0 ; i < betList.ListItems.length; i++){
                var spans = betList.ListItems[i].getElementsByTagName("span");
                firmMsg += "[" + spans[0].innerHTML.split(".")[1] + "]";
                //firmMsg += " " + spans[1].innerHTML;
                var ac = betList.ListItems[i].ticket.AnteCode;
                ac=TKCPCEO.Enum.prototype.getAnteText(betList.ListItems[i].ticket.PlayType,ac);
                firmMsg += "\t" + ac;
                firmMsg += "\t" + spans[2].innerHTML + "\n";
                if(i == 20){break;}
            }
            firmMsg += "\n总计:注数:" + betList.JsonCmdProject.TotalBetCount;
            firmMsg += "  金额:" + (betList.JsonCmdProject.TotalBetCount * 2 * 100 / 100).toString().toMoney();
            //=========特殊
            var caseStr = "";
            var val = "";
            if($("ContainerChase").style.display != "none"){
                if($("ObjectChase").parentNode.style.display != "none" && $("ObjectChase").checked){
                    caseStr += betList.JsonCmdProject.BonusStop ? "中奖后停止" : "";
                    for(var i=2;i<bonusStopAry.length;i++){
                        if(bonusStopAry[i]==null){ continue; };
                        if(bonusStopAry[i].checked){
                            caseStr += "(中"+i.toString()+"停止)";
                            val += i.toString();
                            break;
                        }
                    }
                }
                if($("ObjectChase2").parentNode.style.display != "none" && $("ObjectChase2").checked){
                    caseStr += betList.JsonCmdProject.ShouldBonusStop ? "  出号后放弃" : "";
                    for(var i=2;i<shouldBonusStopAry.length;i++){
                        if(shouldBonusStopAry[i]==null){ continue; };
                        if(shouldBonusStopAry[i].checked){
                            caseStr += "(中"+i.toString()+"放弃)";
                            val += "|" + i.toString();
                            break;
                        }
                    }
                }
                if(caseStr != ""){
                    caseStr = "\n方案状态:" + caseStr;
                }
            }
            firmMsg += caseStr;
            //=========特殊
            firmMsg += "\n------------------------------------------------\n";
            firmMsg += "起始期号:" + (betList.JsonCmdProject.IssueList[0].IssueNumber);
            firmMsg += "  期数:" + (betList.JsonCmdProject.IssueList.length);
            firmMsg += "  总金额:" + betList.JsonCmdProject.TotalMoney.toString().toMoney();
            if(confirm(firmMsg)){
                if(betList.JsonCmdProject.IssueList.length==1){
                    betList.JsonCmdProject.BonusStop=false;
                    try{
                        if(betList.JsonCmdProject.IssueList[0].IssueNumber==betList.CurrentIssue){
                            betList.JsonCmdProject.ShouldBonusStop=false;
                        }
                    }catch(e){ betList.JsonCmdProject.ShouldBonusStop=false; }
                }
                val+=val.indexOf("|")>=0?"":"|";
                betList.JsonCmdProject.Filters = val;
                var ajaxJSON = new JSONCommand();
                ajaxJSON.CommandName = "BuyProject";
                betList.JsonCmdProject.LotteryType = TKCPCEO.Enum.prototype.Lottery.Lottery.LotteryType.FCCQSSC;
                ajaxJSON.Parameters.push(JsonCmdProjectFilter(betList.JsonCmdProject).toString());
                //            alert(ajaxJSON.toString());
                setSubmitButtonStatus(false, "您的投注数据正在提交，请等待提交成功后再投注。");
                SendToServer(ajaxJSON.toString());
//                alert("正在提交投注单，请稍等……\n注意：请不要关闭浏览器，以免造成您的投注信息出错！");
            }
        }

        function BetRetBack(_retJSON) {
            setSubmitButtonStatus(true);
            if (parseInt(_retJSON.CommonInt, 10) < 0) {
                GetRecentBetRecord(0);
//                modalDialog.reSetTitle("投注成功", true);
                var caseNo = _retJSON.CommonArrayList[0];
                var issueBegin = _retJSON.CommonString;
                var drawTime = _retJSON.CommonDateTime;
                var totalMoney = _retJSON.CommonDecimal.toString().toMoney();
                cuser.getNewUserInfo();

//                modalDialog.Message.HTML = "<div class=\"in\">";
//                modalDialog.Message.HTML += "方案编号：<a href=\"\">" + caseNo + "</a>";
//                modalDialog.Message.HTML += "<p>总额：" + totalMoney + "</p>";
//                modalDialog.Message.HTML += "<p>起始期数：" + issueBegin + "</p>";
//                modalDialog.Message.HTML += "</div>";
//                modalDialog.close = function(){
//                    modalDialog.hide();
//                    window.location.hash = "top";
//                }
//                modalDialog.reShow();
                //清理
                betList.clearAll();
                try{
                    $("ObjectMultiple0").value = "1";
                }catch(e){}
                betList.ModelIssue.createIssues(1);

                actionList.Current.CaseNo=caseNo;

                var alertMsg="方案已提交";
                alertMsg+="\n------------------------------------------------";
                alertMsg+="\n方案编号："+caseNo;
                alertMsg+="\n起始期数："+issueBegin;
                alertMsg+="\n投注总额："+totalMoney;
                alertMsg+="\n------------------------------------------------";
                alert(alertMsg);
                window.location.hash = "top";
            } else {
//                modalDialog.reSetTitle("投注失败", false);
//                modalDialog.Message.HTML = "<div class=\"in\">" + GetAjaxReturnByCode(_retJSON.CommonInt) + "</div>";
//                modalDialog.reShow();
                var msg="方案提交失败";
                msg+="\n------------------------------------------------\n";
                msg+=GetAjaxReturnByCode(_retJSON.CommonInt, _retJSON.CommonString);
                msg+="\n------------------------------------------------";
                if(_retJSON.CommonInt==0)
                {
                    if(confirm(msg)){
                        window.location.href="/Register.aspx";
                    }
                }
                else{
                    alert(msg);
                }
            }
        }
<%
    }else{
%>
	 function SumitBetList(){
	     ///<summary>提交投注单</summary>
            alert("游客不能进行投注，请登录");
        }
<%
    }
%>
        bonusStopAry = [null, null, $("radioBonusStop2"), $("radioBonusStop3"), null, $("radioBonusStop5")];
        labelBonusStopAry = [null, null, $("labelBonusStop2"), $("labelBonusStop3"), null, $("labelBonusStop5")];
        shouldBonusStopAry = [null, null, $("radioShouldBonusStop2"), $("radioShouldBonusStop3"), null, $("radioShouldBonusStop5")];
        labelShouldBonusStopAry = [null, null, $("labelShouldBonusStop2"), $("labelShouldBonusStop3"), null, $("labelShouldBonusStop5")];
        containerBonusStop = bonusStopAry[2].parentNode;
        containerShouldBonusStop = shouldBonusStopAry[2].parentNode;
	-->
	</SCRIPT>
    <STYLE type="text/css">
.award_new {
	Z-INDEX: 99999; POSITION: fixed !important; TEXT-ALIGN: center; WIDTH: 984px; BOTTOM: 0px; FONT-FAMILY: "微软雅黑", Arial, Verdana, Tahoma; COLOR: #fff; MARGIN-LEFT: -492px; FONT-SIZE: 14px; FONT-WEIGHT: bold; LEFT: 50%
}
.award_new LI {
	BORDER-BOTTOM: #b32a00 1px solid; POSITION: relative; BORDER-LEFT: #ffa285 1px solid; PADDING-BOTTOM: 10px; PADDING-LEFT: 5px; PADDING-RIGHT: 5px; BACKGROUND: #ff3c00; BORDER-TOP: #ffa285 1px solid; BORDER-RIGHT: #b32a00 1px solid; PADDING-TOP: 10px
}
.award_new LI A {
	COLOR: #ff0; MARGIN-LEFT: 15px; FONT-SIZE: 16px; TEXT-DECORATION: underline
}
.award_new LI A:hover {
	COLOR: #fff; TEXT-DECORATION: none
}
.award_new LI .close {
	POSITION: absolute; FONT-FAMILY: "宋体", Arial, Verdana, Tahoma; FONT-SIZE: 12px; TOP: 12px; CURSOR: pointer; RIGHT: 15px; FONT-WEIGHT: normal
}
</STYLE>
    <SCRIPT type="text/javascript" src="js/SocketData.js"></SCRIPT>
    <!--OBJECT id=LinkFlashZJ name=LinkFlashZJ
        data="fla/demo.shishicai.cn/LinkFlash.swf?obj=flashServerZJ" width=0 height=0
        type="application/x-shockwave-flash">
              <embed id="LinkFlashZJ"
        src="fla/demo.shishicai.cn/LinkFlash.swf?obj=flashServerZJ" wmode="transparent" quality="high"
        bgcolor="#ffffff" width="0" height="0" name="LinkFlashZJ" align="middle"
        allowScriptAccess="always" allowFullScreen="false"
        type="application/x-shockwave-flash"
        pluginspage="http://www.macromedia.com/go/getflashplayer" />
    </OBJECT-->
    <DIV style="POSITION: relative">
      <UL id=containerNoticeBonus class=award_new>
      </UL>
    </DIV>
    <SCRIPT type="text/javascript">
//        try {
//            $("Login_Pass").style.fontSize = "7px";
//        } catch (e) { }
        containerNoticeBonus = $("containerNoticeBonus");
        onlyBonusInfo = true;
        //isTestView = eval('true');
        var flashServerZJ = new TKCPCEO.FlashZJ();
    </SCRIPT>
  </DIV>
</FORM>
</BODY>
</HTML>
