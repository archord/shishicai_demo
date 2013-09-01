//Created by Action Script Viewer - http://www.buraks.com/asv
package {
    import flash.events.*;
    import flash.utils.*;

    public class MyTimer extends EventDispatcher {

        private var lastTime:Number = 0;
        private var timer:Timer;
        private var nowTime:Number;
        private var date:Date;
        private var numA:Number;
        private var numB:Number;

        public function MyTimer():void{
            date = new Date();
            timer = new Timer(100);
            super();
        }
        public function stopTimer():void{
            if (timer.hasEventListener(TimerEvent.TIMER)){
                timer.removeEventListener(TimerEvent.TIMER, handler);
            };
        }
        public function startTimer():void{
            numA = date.getTime();
            if (timer.hasEventListener(TimerEvent.TIMER) == false){
                timer.addEventListener(TimerEvent.TIMER, handler);
                timer.start();
            };
        }
        private function handler(_arg1:TimerEvent):void{
            numB = new Date().getTime();
            nowTime = ((numB - numA) / 1000);
            if (Math.floor(nowTime) > lastTime){
                lastTime = Math.floor(nowTime);
                dispatchEvent(new Event("myTimer_evt"));
            };
        }

    }
}//package 
