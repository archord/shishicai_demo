package ssc.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimerTask;
import javax.servlet.ServletContext;
import ssc.bean.BetRecord;
import ssc.bean.BonusRecord;
import ssc.manager.BetRecordManager;
import ssc.manager.BonusManager;

public class BonusGenerate extends TimerTask {

    private static boolean isRunning = false;
    private ServletContext context = null;

    public BonusGenerate(ServletContext context) {
        this.context = context;
    }

    @Override
    public void run() {
        if (!isRunning) {
            isRunning = true;
            generateBonus();
            isRunning = false;
        } else {
            context.log("上一期号码生成还未完成！");
        }
    }

    public void generateBonus() {

        Calendar cal = Calendar.getInstance();
        Long date = (Long) context.getAttribute("date");                    //上次开奖的日期，格式20110807
        Integer lastMinute = (Integer) context.getAttribute("lastMinute");      //上次开奖时间的分的数值，用来控制在规定时间内只开奖一次
        Map issues;
        int todayTotalNum;
        String nextNBetIssues;

        ProjectUtil pju = new ProjectUtil();

        if (date == null) {                                             //系统启动，程序第一次运行，需要初始化
            context.log("初始化缓存数据！");

            BonusManager bm = new BonusManager();
            DateFormat df = new SimpleDateFormat("yyyyMMdd");
            date = Long.parseLong(df.format(new Date()));
            issues = new HashMap();
            todayTotalNum = 0;
            lastMinute = -1;

            List al = bm.getTodayBonus();
            int tIndex = 0, maxIndex = 0;
            for (int i = 0; i < al.size(); i++) {
                BonusRecord br = (BonusRecord) al.get(i);
                tIndex = Integer.parseInt(br.getBIssue().split("-")[1]);
                if (tIndex > maxIndex) {
                    maxIndex = tIndex;
                }
                issues.put(br.getBIssue(), br.getBNumber());
                todayTotalNum++;
            }
            String lastIssue = "";
            String lastBonus = "";
            if (al.size() > 0) {
                lastIssue = ((BonusRecord) al.get(maxIndex - 1)).getBIssue();
                lastBonus = ((BonusRecord) al.get(maxIndex - 1)).getBNumber();
            } else {
                lastIssue = date + "-000";
            }
            context.setAttribute("date", date);                             //更新context中的缓存信息
            context.setAttribute("issues", issues);
            context.setAttribute("todayTotalNum", todayTotalNum);
            context.setAttribute("lastIssue", lastIssue);
            context.setAttribute("lastBonus", lastBonus);
            context.setAttribute("lastMinute", lastMinute);

            nextNBetIssues = pju.getNextNBetIssue(lastIssue, 400);    //获得未来400期投注号
            context.setAttribute("nextNBetIssues", nextNBetIssues);
        }

        if (isRightTime(cal, lastMinute)) {
            //if (true) {
            context.log("生成号码：");

            lastMinute = cal.get(Calendar.MINUTE);
            issues = (Map) context.getAttribute("issues");
            todayTotalNum = (Integer) context.getAttribute("todayTotalNum");

            context.removeAttribute("date");                                //记录最后次开奖的日期
            context.removeAttribute("issues");                              //今天已开奖的所有期号和号码
            context.removeAttribute("todayTotalNum");                       //今天已开奖的总次数
            context.removeAttribute("lastIssue");                           //最后的开奖期号
            context.removeAttribute("lastBonus");                           //最后的开奖号码
            context.removeAttribute("lastMinute");                           //最后开奖的时间的分的值
            context.removeAttribute("nextNBetIssues");                           //最后开奖的时间的分的值


            BonusManager bm = new BonusManager();
            String curIssue = ProjectUtil.getCurrentIssue(todayTotalNum);   //有可能出现不一致的情况
            String curBonus = ProjectUtil.getBonus();
//            curBonus = "54321";

            DateFormat df = new SimpleDateFormat("yyyyMMdd");
            Long today = Long.parseLong(df.format(new Date()));
            if (date.equals(today)) {                                             //换天
                issues.put(curIssue, curBonus);
                todayTotalNum++;
            } else {                                                        //正常出号
                date = today;
                issues.clear();
                issues.put(curIssue, curBonus);
                todayTotalNum = 1;
            }
            context.setAttribute("date", date);                             //更新context中的缓存信息
            context.setAttribute("issues", issues);
            context.setAttribute("todayTotalNum", todayTotalNum);
            context.setAttribute("lastIssue", curIssue);
            context.setAttribute("lastBonus", curBonus);
            context.setAttribute("lastMinute", lastMinute);


            nextNBetIssues = pju.getNextNBetIssue(curIssue, 400);           //可以改进，通过每次将上次的issue序列去掉第一个，增加最后一个
            context.setAttribute("nextNBetIssues", nextNBetIssues);

            BonusRecord br = new BonusRecord();
            br.setBDate(date + "");
            br.setBIssue(curIssue);
            br.setBNumber(curBonus);
            bm.addBonus(br);                                                //将当前期的出号信息添加到数据库中

            context.log("期号=" + curIssue + ";号码=" + curBonus);

            findPrize();        //找出中奖客户
            //continueIssue();    //追号开始,取消，在购买时直接生成所有追号记录
        }
    }

    public void continueIssue() {      //追号,购买当前期号码，将对于的信息写到用户投注记录表中

        int curIssueNum = (Integer) context.getAttribute("todayTotalNum");
        String curIssue = ProjectUtil.getCurrentIssue(curIssueNum);
        BetRecordManager brm = new BetRecordManager();
        brm.continueBetRecord(curIssue);

    }

    public void findPrize() {
        String lastIssue = (String) context.getAttribute("lastIssue");
        String lastBonus = (String) context.getAttribute("lastBonus");

        BetRecordManager brm = new BetRecordManager();
        brm.updateAllBetStatus(lastIssue);
        List<BetRecord> brs = brm.findPrizeList(lastIssue, lastBonus);
        this.checkUserPrize(brs, lastBonus);
        brm.updateUserPrize(brs);

        for (int i = 0; i < brs.size(); i++) {
            BetRecord br = brs.get(i);
            System.out.println(br.toString() + "; lastBonus = " + lastBonus);
        }
        if (brs.isEmpty()) {
            System.out.println("无人中奖！");
        }
    }

    public void checkUserPrize(List<BetRecord> brs, String lastBonus) {
        int c1 = lastBonus.charAt(4) - '0'; //个位
        int c2 = lastBonus.charAt(3) - '0'; //十位
        int c3 = lastBonus.charAt(2) - '0'; //百位
        int c4 = lastBonus.charAt(1) - '0'; //千位
        int c5 = lastBonus.charAt(0) - '0'; //万位

        for (int i = 0; i < brs.size(); i++) {
            BetRecord br = brs.get(i);
            int type = Integer.parseInt(br.getCategoryNumber());
            switch (type) {
                case 3011:   //一星单式
                    br.setBetBonus(10*br.getBetMulti());
                    break;
                case 306:   //大小单双
                    br.setBetBonus(4*br.getBetMulti());
                    break;
                case 311:   //二星组选包胆
                case 310:   //二星组选包点
                case 309:   //二星组选分位
                    if (c1 != c2) {
                        br.setBetBonus(50*br.getBetMulti());
                    } else {
                        br.setBetBonus(100*br.getBetMulti());
                    }
                    break;
                case 307:   //二星组选
                case 308:   //二星组选
                    br.setBetBonus(50*br.getBetMulti());
                    break;
                case 3032:   //二星（直选）
                case 3012:   //
                case 305:   //二星和值
                    br.setBetBonus(100*br.getBetMulti());
                    break;
                case 304:   //三星和值
                case 319:   //三星直选组合
                case 3033:   //三星（直选）
                case 3013:   //
                    br.setBetBonus(1000*br.getBetMulti());
                    break;
                case 315:   //组三复式
                case 313:   //
                    br.setBetBonus(320*br.getBetMulti());
                    break;
                case 316:   //组六复式
                case 314:   //
                    br.setBetBonus(160*br.getBetMulti());
                    break;
                case 317:   //三星组选包胆
                case 318:   //三星组选包点
                    if (c1 == c2 && c2 == c3) {
                        br.setBetBonus(1000*br.getBetMulti());
                    } else if (c1 == c2 || c2 == c3) {
                        br.setBetBonus(320*br.getBetMulti());
                    } else {
                        br.setBetBonus(160*br.getBetMulti());
                    }
                    break;
                case 3035:   //五星（直选）
                case 3015:   //
                    br.setBetBonus(100000*br.getBetMulti());
                    break;
                case 312:   //五星通选
                    String tmp = br.getBetNumber().replaceAll(",", "");
                    if (tmp.equals(lastBonus)) {
                        br.setBetBonus(20000*br.getBetMulti());
                    } else if (tmp.substring(2).equals(lastBonus.substring(2)) || tmp.substring(0, 3).equals(lastBonus.substring(0, 3))) {
                        br.setBetBonus(200*br.getBetMulti());
                    } else if (tmp.substring(3).equals(lastBonus.substring(3)) || tmp.substring(0, 2).equals(lastBonus.substring(0, 2))) {
                        br.setBetBonus(20*br.getBetMulti());
                    }
                    break;
                default:
                    br.setBetStatus(1);
            }
        }
    }

    public boolean isRightTime(Calendar cal, int lastMinute) {
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        int minute = cal.get(Calendar.MINUTE);
        int second = cal.get(Calendar.SECOND);

        boolean flag = false;
        if (minute != lastMinute) {
            if (hour >= 10 && hour < 22) {
                if (minute % 10 == 1) {     //在每个时间段的第一分钟产生开奖号码
                    flag = true;
                }
            } else if (hour <= 1 || hour >= 22) {
                if ((minute % 5 == 0) && (second >= 30)) {     //在每个时间段的第一分钟产生开奖号码
                    flag = true;
                }
            }
        }
        return flag;
    }
}
