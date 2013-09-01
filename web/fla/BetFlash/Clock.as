//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.text.*;

    public class Clock extends Sprite {

        public var timeStr:String;
        public var movie_mc:MovieClip;
        public var lock_mc:MovieClip;
        public var s:String;
        public var num_txt:TextField;
        public var tfTime:TextFormat;

        public function Clock():void{
            tfTime = new TextFormat();
            super();
            movie_mc.alpha = 0;
        }
        public function changTime(_arg1:int):void{
            if (_arg1 >= 60){
                movie_mc.alpha = 0;
            } else {
                if ((((60 > _arg1)) && ((_arg1 > 0)))){
                    if ((((10 > _arg1)) && ((_arg1 > 0)))){
                        dispatchEvent(new Event("soundCountDown_evt"));
                    };
                    movie_mc.alpha = 1;
                    movie_mc.gotoAndStop(_arg1);
                } else {
                    if (_arg1 == 0){
                        movie_mc.alpha = 0;
                        trace("投注倒计时完成");
                        dispatchEvent(new Event("betTime_evt"));
                    } else {
                        movie_mc.alpha = 0;
                    };
                };
            };
            txtShow(_arg1);
        }
        public function timeTxt(_arg1:Number):String{
            var _local2 = "";
            var _local3:int = Math.floor(_arg1);
            var _local4:int = Math.floor((_local3 / 60));
            var _local5:int = Math.floor((_local4 / 60));
            _local3 = (_local3 % 60);
            _local4 = (_local4 % 60);
            if (_local5 != 0){
                if (_local5 < 10){
                    _local2 = (_local2 + "0");
                };
                _local2 = (_local2 + String(_local5));
                _local2 = (_local2 + ":");
            };
            if (((!((_local5 == 0))) || (!((_local4 == 0))))){
                if (_local4 < 10){
                    _local2 = (_local2 + "0");
                };
                _local2 = (_local2 + String(_local4));
                _local2 = (_local2 + ":");
            };
            if (_local3 < 10){
                _local2 = (_local2 + "0");
            };
            _local2 = (_local2 + String(_local3));
            return (_local2.replace(/1/ig, " 1"));
        }
        public function changStatus(_arg1:String):void{
            s = _arg1;
            if (_arg1 == "0"){
                movie_mc.visible = true;
                num_txt.visible = true;
                lock_mc.visible = false;
            } else {
                movie_mc.visible = false;
                num_txt.visible = false;
                lock_mc.visible = true;
            };
        }
        public function txtShow(_arg1:int):void{
            timeStr = timeTxt(_arg1);
            switch (timeStr.replace(/\s/ig, "").length){
                case 5:
                    num_txt.text = timeStr;
                    tfTime.size = 26;
                    num_txt.y = -17;
                    num_txt.x = -50;
                    break;
                case 2:
                    num_txt.text = timeStr;
                    tfTime.size = 51;
                    num_txt.y = -29.4;
                    num_txt.x = -50;
                    break;
                case 8:
                    num_txt.text = timeStr;
                    tfTime.size = 19;
                    num_txt.y = -12.4;
                    num_txt.x = -50;
                    break;
                default:
                    num_txt.text = " ";
            };
            num_txt.setTextFormat(tfTime);
        }

    }
}//package 
