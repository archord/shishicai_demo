//Created by Action Script Viewer - http://www.buraks.com/asv
package _fla {
    import flash.events.*;
    import flash.utils.*;
    import flash.display.*;
    import flash.text.*;
    import flash.ui.*;
    import flash.net.*;
    import flash.external.*;
    import flash.accessibility.*;
    import flash.errors.*;
    import flash.filters.*;
    import flash.geom.*;
    import flash.media.*;
    import flash.system.*;

    public dynamic class MainTimeline extends MovieClip {

        public var loading_mc:MovieClip;
        public var urlAry:Array;
        public var mymenu:ContextMenu;
        public var dataMovie:MovieClip;
        public var thisname:String;
        public var bonusIssue_txt:TextField;
        public var drawTime:int;
        public var type_mc:MovieClip;
        public var timer:MyTimer;
        public var sound_mc:Music;
        public var poster_mc:Poster;
        public var allow:Boolean;
        public var time_mc:Countdown;
        public var myitem0:ContextMenuItem;
        public var myitem1:ContextMenuItem;
        public var statusType:String;
        public var betIssue:String;
        public var bonusNumber:String;
        public var hasAd:Boolean;
        public var clock_mc:Clock;
        public var i:uint;
        public var trueIssue:String;
        public var just:Boolean;
        public var bonusInfo:Array;
        public var back_mc:MovieClip;
        public var url:String;
        public var lc:LocalConnection;
        public var betIssue_txt:TextField;
        public var bonusIssue:String;
        public var betTime:int;

        public function MainTimeline(){
            addFrameScript(0, frame1, 1, frame2);
        }
        public function asCallJS_1():void{
            ExternalInterface.call("fvClass.flash_BonusEnd");
        }
        public function xmlLoadHandler(_arg1:Event):void{
            var _local2:XML = new XML(_arg1.target.data);
            poster_mc.xmlShow(_local2);
        }
        public function drawTimeEndHd(_arg1:Event):void{
            asCallJS_1();
        }
        public function colorShow(_arg1:String):void{
            switch (_arg1.length){
                case 6:
                    type_mc.ssc_mc.mcColor(_arg1);
                    break;
                case 5:
                    type_mc.fiveBall_mc.mcColor(_arg1);
                    break;
                case 3:
                    type_mc.threeBall_mc.mcColor(_arg1);
                    break;
            };
        }
        public function statusShow(_arg1:String):void{
            clock_mc.changStatus(_arg1);
            lc.send(thisname, "changeStatus", statusType);
            if (_arg1 == "0"){
                if (dataMovie.currentFrame != 1){
                    dataMovie.gotoAndPlay("up");
                };
                if (hasAd){
                    poster_mc.visible = false;
                    poster_mc.timer.reset();
                };
            } else {
                if (dataMovie.currentFrame != 25){
                    dataMovie.gotoAndPlay("down");
                };
                if (hasAd){
                    poster_mc.visible = true;
                    poster_mc.timer.start();
                };
            };
        }
        public function flashHd(_arg1:Event):void{
            if (_arg1.target.statu == "获取中"){
                trace("闪光");
                dataMovie.data_mc.flash_mc.gotoAndPlay("g2");
                back_mc.flash_mc.gotoAndPlay("g2");
            } else {
                trace("停止闪光");
                dataMovie.data_mc.flash_mc.gotoAndStop(1);
                back_mc.flash_mc.gotoAndStop(1);
            };
        }
        public function hasNumberSoundHd(_arg1:Event):void{
            sound_mc.soundPlay("2");
        }
        public function bonusInfoShow():void{
            switch (bonusInfo.length){
                case 4:
                    dataMovie.data_mc.gotoAndStop(1);
                    setTimeout(function ():void{
                        dataMovie.data_mc.a0_txt.text = bonusInfo[0].Name;
                        dataMovie.data_mc.a1_txt.text = bonusInfo[0].Value;
                        dataMovie.data_mc.b0_txt.text = bonusInfo[1].Name;
                        dataMovie.data_mc.b1_txt.text = bonusInfo[1].Value;
                        dataMovie.data_mc.c0_txt.text = bonusInfo[2].Name;
                        dataMovie.data_mc.c1_txt.text = bonusInfo[2].Value;
                        dataMovie.data_mc.d0_txt.text = bonusInfo[3].Name;
                        dataMovie.data_mc.d1_txt.text = bonusInfo[3].Value;
                    }, 100);
                    break;
                case 3:
                    dataMovie.data_mc.gotoAndStop(2);
                    setTimeout(function ():void{
                        dataMovie.data_mc.a0_txt.text = bonusInfo[0].Name;
                        dataMovie.data_mc.a1_txt.text = bonusInfo[0].Value;
                        dataMovie.data_mc.b0_txt.text = bonusInfo[1].Name;
                        dataMovie.data_mc.b1_txt.text = bonusInfo[1].Value;
                        dataMovie.data_mc.c0_txt.text = bonusInfo[2].Name;
                        dataMovie.data_mc.c1_txt.text = bonusInfo[2].Value;
                    }, 100);
                    break;
                case 2:
                    dataMovie.data_mc.gotoAndStop(3);
                    setTimeout(function ():void{
                        dataMovie.data_mc.a0_txt.text = bonusInfo[0].Name;
                        dataMovie.data_mc.a1_txt.text = bonusInfo[0].Value;
                        dataMovie.data_mc.b0_txt.text = bonusInfo[1].Name;
                        dataMovie.data_mc.b1_txt.text = bonusInfo[1].Value;
                    }, 100);
                    break;
                case 1:
                    dataMovie.data_mc.gotoAndStop(3);
                    setTimeout(function ():void{
                        dataMovie.data_mc.a0_txt.text = bonusInfo[0].Name;
                        dataMovie.data_mc.a1_txt.text = bonusInfo[0].Value;
                    }, 100);
                    break;
                default:
                    dataMovie.data_mc.gotoAndStop(1);
                    setTimeout(function ():void{
                        dataMovie.data_mc.a0_txt.text = bonusInfo[0].Name;
                        dataMovie.data_mc.a1_txt.text = bonusInfo[0].Value;
                        dataMovie.data_mc.b0_txt.text = bonusInfo[1].Name;
                        dataMovie.data_mc.b1_txt.text = bonusInfo[1].Value;
                        dataMovie.data_mc.c0_txt.text = bonusInfo[2].Name;
                        dataMovie.data_mc.c1_txt.text = bonusInfo[2].Value;
                        dataMovie.data_mc.d0_txt.text = bonusInfo[3].Name;
                        dataMovie.data_mc.d1_txt.text = bonusInfo[3].Value;
                    }, 100);
            };
        }
        function frame1(){
            stop();
            stage.scaleMode = StageScaleMode.NO_SCALE;
            mymenu = new ContextMenu();
            myitem0 = new ContextMenuItem("www.shishicai.cn");
            myitem1 = new ContextMenuItem("时时彩网免费开奖视频 2.24a");
            mymenu.customItems.push(myitem0);
            mymenu.customItems.push(myitem1);
            mymenu.hideBuiltInItems();
            this.contextMenu = mymenu;
            loading_mc.gotoAndStop(1);
            this.loaderInfo.addEventListener(ProgressEvent.PROGRESS, loadingHd);
            this.loaderInfo.addEventListener(Event.COMPLETE, loadedHd);
        }
        public function soundCountDownHd(_arg1:Event):void{
            sound_mc.soundPlay("1");
        }
        public function trueIssueShow(_arg1:String):void{
            time_mc.num_txt.text = (("距  " + _arg1) + "  期开奖还有 ： ");
        }
        public function timerHd(_arg1:Event):void{
            clock_mc.changTime(betTime);
            betTime = (betTime - 1);
            time_mc.changTime(drawTime);
            drawTime = (drawTime - 1);
            trace("嘀嗒");
            lc.send(thisname, "changTime", betTime);
        }
        public function bonusIssueShow(_arg1:String):void{
            bonusIssue_txt.text = ((((thisname + "   ") + "第 ") + _arg1) + " 期");
        }
        public function init():void{
            clock_mc.addEventListener("betTime_evt", betTimeEndHd);
            clock_mc.addEventListener("soundCountDown_evt", soundCountDownHd);
            this.addEventListener("hasNumberSound_evt", hasNumberSoundHd);
            time_mc.addEventListener("drawTime_evt", drawTimeEndHd);
            this.addEventListener("flashing_evt", flashHd);
            this.addEventListener("numberInfoShow_evt", numberInfoShowHd);
            poster_mc.visible = false;
            loadVars();
            if (ExternalInterface.available){
                ExternalInterface.addCallback("BetFlash", flashHandler);
            };
        }
        public function loadVars():void{
            if (stage.loaderInfo.parameters["group"] != undefined){
                switch (stage.loaderInfo.parameters["group"]){
                    case "1":
                        type_mc.gotoAndStop(1);
                        dataMovie.data_mc.pillar_mc.visible = false;
                        time_mc.pillar_mc.visible = false;
                        break;
                    case "2":
                        type_mc.gotoAndStop(2);
                        dataMovie.data_mc.pillar_mc.visible = true;
                        time_mc.pillar_mc.visible = true;
                        break;
                    case "3":
                        type_mc.gotoAndStop(3);
                        dataMovie.data_mc.pillar_mc.visible = true;
                        time_mc.pillar_mc.visible = true;
                        break;
                    default:
                        type_mc.gotoAndStop(1);
                        dataMovie.data_mc.pillar_mc.visible = false;
                        time_mc.pillar_mc.visible = false;
                };
            };
            if (stage.loaderInfo.parameters["lt"] != undefined){
                thisname = unescape(stage.loaderInfo.parameters["lt"]);
            };
            if (stage.loaderInfo.parameters["ad"] != undefined){
                if (stage.loaderInfo.parameters["ad"] == "1"){
                    hasAd = true;
                    getXml();
                } else {
                    hasAd = false;
                };
            };
            if (stage.loaderInfo.parameters["color"] != undefined){
                colorShow(stage.loaderInfo.parameters["color"]);
            };
        }
        public function bonusShow(_arg1:String):void{
            if (_arg1 != ""){
                asCallJS_2();
            };
            trace((("当前在  ：" + type_mc.currentFrame) + "  帧"));
            switch (type_mc.currentFrame){
                case 1:
                    type_mc.ssc_mc.movieAhandler(_arg1);
                    break;
                case 2:
                    type_mc.fiveBall_mc.movieBhandler(_arg1);
                    break;
                case 3:
                    type_mc.threeBall_mc.movieChandler(_arg1);
                    break;
                default:
                    type_mc.ssc_mc.movieAhandler(_arg1);
            };
        }
        public function flashHandler(_arg1:Object):void{
            loading_mc.visible = false;
            loading_mc.gotoAndStop(2);
            statusType = _arg1.Status;
            statusShow(statusType);
            betIssue = _arg1.DataModel.BetIssue;
            betIssueShow(betIssue);
            trueIssue = _arg1.DataModel.TrueIssue;
            trueIssueShow(trueIssue);
            if (_arg1.DataModel.BetLeaveTime > -10000){
                betTime = _arg1.DataModel.BetLeaveTime;
            };
            if (_arg1.DataModel.DrawLeaveTime > -10000){
                drawTime = _arg1.DataModel.DrawLeaveTime;
            };
            bonusInfo = _arg1.BonusInfo;
            if (!(((bonusIssue == _arg1.DataModel.BonusIssue)) && ((bonusNumber == _arg1.DataModel.BonusNumber)))){
                bonusIssue = _arg1.DataModel.BonusIssue;
                bonusIssueShow(bonusIssue);
                bonusNumber = _arg1.DataModel.BonusNumber;
                bonusShow(bonusNumber);
            };
            if (just){
                timer.startTimer();
                just = false;
            };
        }
        public function numberInfoShowHd(_arg1:Event):void{
            bonusInfoShow();
        }
        public function loadingHd(_arg1:ProgressEvent):void{
            trace("加载中...");
        }
        public function loadedHd(_arg1:Event):void{
            trace("加载完成");
            this.loaderInfo.removeEventListener(ProgressEvent.PROGRESS, loadingHd);
            this.loaderInfo.removeEventListener(Event.COMPLETE, loadedHd);
            gotoAndStop(2);
        }
        public function betIssueShow(_arg1:String):void{
            betIssue_txt.text = _arg1;
        }
        public function betTimeEndHd(_arg1:Event):void{
            asCallJS_0();
        }
        public function getXml():void{
            var _local1:URLLoader = new URLLoader();
            _local1.load(new URLRequest("http://soft.shishicai.cn/InCome/SwfInCome.aspx"));
            _local1.addEventListener(Event.COMPLETE, xmlLoadHandler);
        }
        public function asCallJS_0():void{
            ExternalInterface.call("fvClass.flash_BetEnd");
        }
        public function asCallJS_2():void{
            ExternalInterface.call("fvClass.flash_BonusOK");
        }
        function frame2(){
            stop();
            hasAd = false;
            bonusInfo = [];
            just = true;
            url = stage.loaderInfo.url;
            urlAry = [".shishicai.cn", ".shishicai.com", ".cqdream.cn", ".cqdream.com", "demo.shishicai.cn", "开奖视频"];
            i = 0;
            while (i < urlAry.length) {
                if (url.toString().indexOf(urlAry[i].toString()) > -1){
                    allow = true;
                    break;
                };
                i++;
            };
            if (!allow){
                return;
            };
            timer = new MyTimer();
            timer.addEventListener("myTimer_evt", timerHd);
            lc = new LocalConnection();
            lc.addEventListener(StatusEvent.STATUS, function (){
            });
            init();
        }

    }
}//package _fla 
