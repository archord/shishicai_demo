//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.net.*;
    import flash.external.*;

    public class PosterFour extends MovieClip {

        public var link:Array;
        public var picUrl:String = "";
        public var box:MovieClip;
        private var loader:Loader;
        public var btn0:SimpleButton;
        public var btn1:SimpleButton;
        public var btn3:SimpleButton;
        public var btn4:SimpleButton;
        public var btn5:SimpleButton;
        public var btn6:SimpleButton;
        public var btn7:SimpleButton;
        public var btn8:SimpleButton;
        public var btn9:SimpleButton;
        public var btn2:SimpleButton;
        public var btn10:SimpleButton;
        public var btn11:SimpleButton;

        public function PosterFour():void{
            loader = new Loader();
            link = new Array();
            super();
        }
        private function btn3Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[3].toString(), "_blank");
            };
        }
        private function btn11Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[11].toString(), "_blank");
            };
        }
        private function comHandler(_arg1:Event):void{
            this.box.addChild(loader);
            this.btn0.addEventListener(MouseEvent.CLICK, btn0Handler);
            this.btn1.addEventListener(MouseEvent.CLICK, btn1Handler);
            this.btn2.addEventListener(MouseEvent.CLICK, btn2Handler);
            this.btn3.addEventListener(MouseEvent.CLICK, btn3Handler);
            this.btn4.addEventListener(MouseEvent.CLICK, btn4Handler);
            this.btn5.addEventListener(MouseEvent.CLICK, btn5Handler);
            this.btn6.addEventListener(MouseEvent.CLICK, btn6Handler);
            this.btn7.addEventListener(MouseEvent.CLICK, btn7Handler);
            this.btn8.addEventListener(MouseEvent.CLICK, btn8Handler);
            this.btn9.addEventListener(MouseEvent.CLICK, btn9Handler);
            this.btn10.addEventListener(MouseEvent.CLICK, btn10Handler);
            this.btn11.addEventListener(MouseEvent.CLICK, btn11Handler);
        }
        private function btn8Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[8].toString(), "_blank");
            };
        }
        private function btn0Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[0].toString(), "_blank");
            };
        }
        public function init():void{
            loader.load(new URLRequest(picUrl));
            loader.contentLoaderInfo.addEventListener(Event.COMPLETE, comHandler);
        }
        private function btn4Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[4].toString(), "_blank");
            };
        }
        private function btn10Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[10].toString(), "_blank");
            };
        }
        private function btn6Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[6].toString(), "_blank");
            };
        }
        private function btn2Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[2].toString(), "_blank");
            };
        }
        private function btn9Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[9].toString(), "_blank");
            };
        }
        private function btn7Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[7].toString(), "_blank");
            };
        }
        private function btn5Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[5].toString(), "_blank");
            };
        }
        private function btn1Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[1].toString(), "_blank");
            };
        }

    }
}//package 
