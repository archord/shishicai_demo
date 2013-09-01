//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.net.*;
    import flash.external.*;

    public class PosterThree extends MovieClip {

        public var picUrl:String = "";
        public var box:MovieClip;
        private var loader:Loader;
        public var btn0:SimpleButton;
        public var btn1:SimpleButton;
        public var btn2:SimpleButton;
        public var btn3:SimpleButton;
        public var link:Array;

        public function PosterThree():void{
            loader = new Loader();
            link = new Array();
            super();
        }
        private function btn3Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[3].toString(), "_blank");
            };
        }
        private function btn2Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[2].toString(), "_blank");
            };
        }
        private function comHandler(_arg1:Event):void{
            this.box.addChild(loader);
            this.btn0.addEventListener(MouseEvent.CLICK, btn0Handler);
            this.btn1.addEventListener(MouseEvent.CLICK, btn1Handler);
            this.btn2.addEventListener(MouseEvent.CLICK, btn2Handler);
            this.btn3.addEventListener(MouseEvent.CLICK, btn3Handler);
        }
        public function init():void{
            loader.load(new URLRequest(picUrl));
            loader.contentLoaderInfo.addEventListener(Event.COMPLETE, comHandler);
        }
        private function btn0Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[0].toString(), "_blank");
            };
        }
        private function btn1Handler(_arg1:MouseEvent):void{
            if (ExternalInterface.available){
                ExternalInterface.call("window.open", link[1].toString(), "_blank");
            };
        }

    }
}//package 
