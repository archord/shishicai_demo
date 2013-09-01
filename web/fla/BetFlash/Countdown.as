//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.text.*;

    public class Countdown extends Sprite {

        public var time_txt:TextField;
        public var num_txt:TextField;
        public var pillar_mc:MovieClip;

        public function Countdown():void{
        }
        private function timeTxt(_arg1:Number):String{
            var _local2 = "";
            var _local3:uint = Math.floor(_arg1);
            var _local4:uint = Math.floor((_local3 / 60));
            _local3 = (_local3 % 60);
            if (_local4 < 10){
                _local2 = (_local2 + "0");
            };
            _local2 = (_local2 + _local4.toString());
            _local2 = (_local2 + ":");
            if (_local3 < 10){
                _local2 = (_local2 + "0");
            };
            _local2 = (_local2 + _local3.toString());
            return (_local2.replace(/1/ig, " 1"));
        }
        public function changTime(_arg1:int):void{
            if (_arg1 > 0){
                time_txt.text = timeTxt(_arg1);
            } else {
                if (_arg1 == 0){
                    dispatchEvent(new Event("drawTime_evt"));
                    trace("完成开奖倒计时");
                    time_txt.text = "00:00";
                } else {
                    time_txt.text = " ";
                };
            };
        }
        public function hasPillar(_arg1:Boolean=true):void{
            if (_arg1){
                pillar_mc.visible = true;
            } else {
                pillar_mc.visible = false;
            };
        }
        public function numTxt(_arg1:String=""):void{
            num_txt.text = (("距  " + _arg1) + "  期开奖还有 ： ");
        }
        public function changStatus(_arg1:String):void{
            if (_arg1 == "0"){
                this.alpha = 0;
            } else {
                this.alpha = 1;
            };
        }

    }
}//package 
