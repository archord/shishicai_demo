//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.utils.*;

    public class Movie_2 extends MovieClip {

        public var statu:String;
        public var mc00:MovieClip;
        public var num:String;
        public var bonusTimer:Timer;
        public var mc22:MovieClip;
        public var mc11:MovieClip;
        public var mc0:MovieClip;
        public var mc1:MovieClip;
        public var mc2:MovieClip;

        public function Movie_2():void{
            num = "";
            mc00.visible = false;
            mc11.visible = false;
            mc22.visible = false;
            mc0.ballType_mc.gotoAndStop(3);
            mc1.ballType_mc.gotoAndStop(2);
            mc2.ballType_mc.gotoAndStop(4);
            mc00.ballType_mc.gotoAndStop(3);
            mc11.ballType_mc.gotoAndStop(2);
            mc22.ballType_mc.gotoAndStop(4);
        }
        private function ballNumber(_arg1:String, _arg2:uint):String{
            var _local3:String = _arg1;
            var _local4:Array = _arg1.split(",");
            if (_local4.length > 1){
                _local3 = _local4[_arg2];
            } else {
                _local3 = _arg1.charAt(_arg2);
            };
            return (_local3);
        }
        public function mcColor(_arg1:String):void{
            mc0.ballType_mc.gotoAndStop(int(_arg1.charAt(0)));
            mc1.ballType_mc.gotoAndStop(int(_arg1.charAt(1)));
            mc2.ballType_mc.gotoAndStop(int(_arg1.charAt(2)));
            mc00.ballType_mc.gotoAndStop(int(_arg1.charAt(0)));
            mc11.ballType_mc.gotoAndStop(int(_arg1.charAt(1)));
            mc22.ballType_mc.gotoAndStop(int(_arg1.charAt(2)));
        }
        private function bonusTimerHandler(_arg1:TimerEvent):void{
            switch (bonusTimer.currentCount){
                case 1:
                    mc0.visible = false;
                    mc00.visible = true;
                    mc00.num_txt.text = ballNumber(num, 0);
                    break;
                case 2:
                    mc1.visible = false;
                    mc11.visible = true;
                    mc11.num_txt.text = ballNumber(num, 1);
                    break;
                case 3:
                    mc2.visible = false;
                    mc22.visible = true;
                    mc22.num_txt.text = ballNumber(num, 2);
                    break;
                default:
                    bonusTimer.removeEventListener(TimerEvent.TIMER, bonusTimerHandler);
                    dispatchEvent(new Event("flashing_evt", true));
                    dispatchEvent(new Event("numberInfoShow_evt", true));
            };
        }
        public function movieChandler(_arg1:String):void{
            num = _arg1;
            if (_arg1 == ""){
                statu = "获取中";
                trace(statu, num);
                mc00.visible = false;
                mc11.visible = false;
                mc22.visible = false;
                mc0.visible = true;
                mc1.visible = true;
                mc2.visible = true;
                dispatchEvent(new Event("flashing_evt", true));
                dispatchEvent(new Event("numberInfoShow_evt", true));
            } else {
                statu = "已获取";
                trace(statu, num);
                dispatchEvent(new Event("hasNumberSound_evt", true));
                bonusTimer = new Timer(500);
                bonusTimer.addEventListener(TimerEvent.TIMER, bonusTimerHandler);
                bonusTimer.reset();
                bonusTimer.start();
            };
        }

    }
}//package 
