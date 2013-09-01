package ssc.servlet;

/**下面就Servlet侦听器结合Java定时器来讲述整个实现过程。要运用Servlet侦听器需要实现
 *javax.servlet.ServletContextListener接口，同时实现它的
 *contextInitialized(ServletContextEvent event)和contextDestroyed(ServletContextEvent event)
 *两个接口函数。考虑定时器有个建立和销毁的过程，看了前面两个接口函数，就不容置疑的把建立的过程置入
 *contextInitialized，把销毁的过程置入contextDestroyed了。
 */
import java.util.Timer;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import ssc.util.BonusGenerate;

public class SysContextListener implements ServletContextListener {

    private Timer timer = null;
    /*在这里初始化监听器，在tomcat启动的时候监听器启动，可以在这里实现定时器功能*/
    public void contextInitialized(ServletContextEvent event) {
        timer = new Timer(true);
        event.getServletContext().log("定时器已启动");
        /*调用exportHistoryBean，0表示任务无延迟，5*1000表示每隔5秒执行任务，60*60*1000表示一个小时。*/
        timer.schedule(new BonusGenerate(event.getServletContext()), 0, 10 * 1000);
        event.getServletContext().log("已经添加任务");
    }

    /*在这里关闭监听器，所以在这里销毁定时器。*/
    public void contextDestroyed(ServletContextEvent event) {
        timer.cancel();
        event.getServletContext().log("定时器销毁");
    }
}
