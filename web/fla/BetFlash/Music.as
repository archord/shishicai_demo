//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;

    public class Music extends MovieClip {

        public var onoff:Boolean = true;
        public var sound1_mc:MovieClip;
        public var sound0_mc:MovieClip;
        public var isSound:Boolean = true;

        public function Music():void{
            addFrameScript(0, frame1);
            this.buttonMode = true;
            this.addEventListener(MouseEvent.CLICK, soundHd);
        }
        public function soundPlay(_arg1:String):void{
            if (isSound){
                switch (_arg1){
                    case "1":
                        sound0_mc.play();
                        break;
                    case "2":
                        sound1_mc.play();
                        break;
                };
            };
        }
        function frame1(){
            stop();
        }
        function soundHd(_arg1:MouseEvent):void{
            if (onoff){
                this.gotoAndStop(2);
                onoff = false;
                isSound = false;
            } else {
                this.gotoAndStop(1);
                onoff = true;
                isSound = true;
            };
        }

    }
}//package 
