//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.geom.*;
    import flash.utils.*;

    public class Movie_0 extends MovieClip {

        public var num:String = "";
        public var mccolor:ColorTransform;
        public var mc44:MovieClip;
        public var mc0:MovieClip;
        public var mc1:MovieClip;
        public var mc2:MovieClip;
        public var mc3:MovieClip;
        public var mc4:MovieClip;
        public var statu:String;
        public var m2:MovieClip;
        public var bonusTimer:Timer;
        public var mc22:MovieClip;
        public var mc33:MovieClip;
        public var mc00:MovieClip;
        public var mc11:MovieClip;

        public function Movie_0():void{
        }
        public function movieAhandler(_arg1:String):void{
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
            mccolor = new ColorTransform();
            mccolor.color = ("0x" + _arg1);
            mc0._mc.transform.colorTransform = mccolor;
            mc1._mc.transform.colorTransform = mccolor;
            mc2._mc.transform.colorTransform = mccolor;
            mc3._mc.transform.colorTransform = mccolor;
            mc4._mc.transform.colorTransform = mccolor;
            mc00.transform.colorTransform = mccolor;
            mc11.transform.colorTransform = mccolor;
            mc22.transform.colorTransform = mccolor;
            mc33.transform.colorTransform = mccolor;
            mc44.transform.colorTransform = mccolor;
        }
        private function bonusTimerHandler(_arg1:TimerEvent):void{
            switch (bonusTimer.currentCount){
                case 1:
                    mc44.txt.text = ballNumber(num, 4);
                    mc44.visible = true;
                    mc4.visible = false;
                    break;
                case 2:
                    mc33.txt.text = ballNumber(num, 3);
                    mc33.visible = true;
                    mc3.visible = false;
                    break;
                case 3:
                    mc22.txt.text = ballNumber(num, 2);
                    mc22.visible = true;
                    mc2.visible = false;
                    break;
                case 4:
                    mc11.txt.text = ballNumber(num, 1);
                    mc11.visible = true;
                    mc1.visible = false;
                    break;
                case 5:
                    mc00.txt.text = ballNumber(num, 0);
                    mc00.visible = true;
                    mc0.visible = false;
                    break;
                default:
                    bonusTimer.removeEventListener(TimerEvent.TIMER, bonusTimerHandler);
                    dispatchEvent(new Event("flashing_evt", true));
                    dispatchEvent(new Event("numberInfoShow_evt", true));
            };
        }

    }
}//package 
