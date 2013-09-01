//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.utils.*;
    import flash.display.*;

    public class Poster extends MovieClip {

        public var timer:Timer;
        public var speed:Number = 10000;
        public var two_mc:PosterTwo;
        public var four_mc:PosterFour;
        private var i:uint = 0;
        public var one_mc:PosterOne;
        public var three_mc:PosterThree;

        public function Poster():void{
            this.stop();
            timer = new Timer(speed);
            timer.addEventListener(TimerEvent.TIMER, timerHandler);
        }
        private function timerHandler(_arg1:TimerEvent):void{
            switch (i){
                case 0:
                    one_mc.visible = true;
                    two_mc.visible = false;
                    three_mc.visible = false;
                    four_mc.visible = false;
                    i = 1;
                    break;
                case 1:
                    one_mc.visible = false;
                    two_mc.visible = true;
                    three_mc.visible = false;
                    four_mc.visible = false;
                    i = 2;
                    break;
                case 2:
                    one_mc.visible = false;
                    two_mc.visible = false;
                    three_mc.visible = true;
                    four_mc.visible = false;
                    i = 3;
                    break;
                case 3:
                    one_mc.visible = false;
                    two_mc.visible = false;
                    three_mc.visible = false;
                    four_mc.visible = true;
                    i = 0;
                    break;
            };
        }
        public function xmlShow(_arg1:XML):void{
            if (_arg1.IsShowAd == true){
                this.one_mc.picUrl = ((_arg1.ListTemplate.Template[0].Image + "?r=") + (Math.random() * 10).toString());
                this.one_mc.link.push(_arg1.ListTemplate.Template[0].Url.string);
                this.one_mc.init();
                this.two_mc.picUrl = ((_arg1.ListTemplate.Template[1].Image + "?r=") + (Math.random() * 10).toString());
                this.two_mc.link.push(_arg1.ListTemplate.Template[1].Url.string[0]);
                this.two_mc.link.push(_arg1.ListTemplate.Template[1].Url.string[1]);
                this.two_mc.init();
                this.three_mc.picUrl = ((_arg1.ListTemplate.Template[2].Image + "?r=") + (Math.random() * 10).toString());
                this.three_mc.link.push(_arg1.ListTemplate.Template[2].Url.string[0]);
                this.three_mc.link.push(_arg1.ListTemplate.Template[2].Url.string[1]);
                this.three_mc.link.push(_arg1.ListTemplate.Template[2].Url.string[2]);
                this.three_mc.link.push(_arg1.ListTemplate.Template[2].Url.string[3]);
                this.three_mc.init();
                this.four_mc.picUrl = ((_arg1.ListTemplate.Template[3].Image + "?r=") + (Math.random() * 10).toString());
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[0]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[1]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[2]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[3]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[4]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[5]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[6]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[7]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[8]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[9]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[10]);
                this.four_mc.link.push(_arg1.ListTemplate.Template[3].Url.string[11]);
                this.four_mc.init();
            };
        }

    }
}//package 
