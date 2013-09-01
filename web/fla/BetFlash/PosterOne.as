//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.display.*;
    import flash.net.*;
    import flash.external.*;

    public class PosterOne extends MovieClip {

        private var loader:Loader;
        public var picUrl:String = "";
        public var box:MovieClip;
        public var btn0:SimpleButton;
        public var link:Array;

        public function PosterOne():void{
            loader = new Loader();
            link = new Array();
            super();
        }
        private function comHandler(_arg1:Event):void{
            this.box.addChild(loader);
            this.btn0.addEventListener(MouseEvent.CLICK, btn0Handler);
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

    }
}//package 
