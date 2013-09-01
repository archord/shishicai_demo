//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.utils.*;

    public class Movie_1 extends MovieClip {

        public var num:String;
        public var mc00:MovieClip;
        public var mc0:MovieClip;
        public var mc1:MovieClip;
        public var mc2:MovieClip;
        public var mc3:MovieClip;
        public var mc4:MovieClip;
        public var statu:String;
        public var mc22:MovieClip;
        public var bonusTimer:Timer;
        public var mc44:MovieClip;
        public var mc33:MovieClip;
        public var mc11:MovieClip;

        public function Movie_1():void{
            num = "";
            mc00.visible = false;
            mc11.visible = false;
            mc22.visible = false;
            mc33.visible = false;
            mc44.visible = false;
            mc1.ballType_mc.gotoAndStop(2);
            mc2.ballType_mc.gotoAndStop(3);
            mc3.ballType_mc.gotoAndStop(4);
            mc4.ballType_mc.gotoAndStop(5);
            mc11.ballType_mc.gotoAndStop(2);
            mc22.ballType_mc.gotoAndStop(3);
            mc33.ballType_mc.gotoAndStop(4);
            mc44.ballType_mc.gotoAndStop(5);
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
            mc3.ballType_mc.gotoAndStop(int(_arg1.charAt(3)));
            mc4.ballType_mc.gotoAndStop(int(_arg1.charAt(4)));
            mc00.ballType_mc.gotoAndStop(int(_arg1.charAt(0)));
            mc11.ballType_mc.gotoAndStop(int(_arg1.charAt(1)));
            mc22.ballType_mc.gotoAndStop(int(_arg1.charAt(2)));
            mc33.ballType_mc.gotoAndStop(int(_arg1.charAt(3)));
            mc44.ballType_mc.gotoAndStop(int(_arg1.charAt(4)));
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
                case 4:
                    mc3.visible = false;
                    mc33.visible = true;
                    mc33.num_txt.text = ballNumber(num, 3);
                    break;
                case 5:
                    mc4.visible = false;
                    mc44.visible = true;
                    mc44.num_txt.text = ballNumber(num, 4);
                    break;
                default:
                    bonusTimer.removeEventListener(TimerEvent.TIMER, bonusTimerHandler);
                    dispatchEvent(new Event("flashing_evt", true));
                    dispatchEvent(new Event("numberInfoShow_evt", true));
            };
        }
        public function movieBhandler(_arg1:String):void{
            num = _arg1;
            if (_arg1 == ""){
                statu = "获取中";
                mc00.visible = false;
                mc11.visible = false;
                mc22.visible = false;
                mc33.visible = false;
                mc44.visible = false;
                mc0.visible = true;
                mc1.visible = true;
                mc2.visible = true;
                mc3.visible = true;
                mc4.visible = true;
                dispatchEvent(new Event("flashing_evt", true));
                dispatchEvent(new Event("numberInfoShow_evt", true));
            } else {
                statu = "已获取";
                dispatchEvent(new Event("hasNumberSound_evt", true));
                bonusTimer = new Timer(500);
                bonusTimer.addEventListener(TimerEvent.TIMER, bonusTimerHandler);
                bonusTimer.reset();
                bonusTimer.start();
            };
        }

    }
}//package 
