/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import ssc.bean.BetRecord;
import ssc.bean.BonusRecord;
import ssc.bean.UserInfo;
import ssc.manager.BetRecordManager;
import ssc.manager.BonusManager;

/**
 *
 * @author Administrator
 */
public class ProjectUtil {

    private static Random rand = null;

    public ProjectUtil() {
    }

    //获取当前期号，格式为“日期+次数”
    public static String getCurrentIssue(int curBonusTotal) {
        String curIssue = "";
        int todayBonusTotal = 0;
        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String date = df.format(new Date());
        if (curBonusTotal == -1) {
            BonusManager bm = new BonusManager();
            todayBonusTotal = bm.getTodayBonusTotal() + 1;      //使用数据库的今天开奖总记录数作为当前开奖总数
        } else {
            todayBonusTotal = curBonusTotal + 1;                //使用servletContext中存储的总数作为当前开奖总数
        }
        if (todayBonusTotal > 99) {
            curIssue = date + "-" + todayBonusTotal;
        } else if (todayBonusTotal > 9) {
            curIssue = date + "-0" + todayBonusTotal;
        } else if (todayBonusTotal > 1) {
            curIssue = date + "-00" + todayBonusTotal;
        } else {
            curIssue = date + "-001";
        }
        return curIssue;
    }

    public static String getBonus() {
        return IntToNLengthStr(nextInt(100000), 5);
    }

    // 返回一个范围在[0, max)的随机数
    public static int nextInt(int max) {
        if (rand == null) {
            synchronized (ProjectUtil.class) {
                if (rand == null) {
                    rand = new Random(System.currentTimeMillis());
                }
            }
        }
        return rand.nextInt(max);
    }

    public static String IntToNLengthStr(int num, int len) {
        long cmp = (long) Math.pow(10, len - 1);
        StringBuilder result = new StringBuilder();
        if (num > cmp) {
            result.append(num);
        } else {
            int tmp = num;
            do {
                result.append("0");
                tmp *= 10;
            } while (tmp < cmp);
            result.append(num);
        }
        return result.toString();
    }

    public String getDataFromFile(String fileName) {

        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();
        try {//getClass().getResource("/resource/yiloudata.txt").toString()
            //br = new BufferedReader(new InputStreamReader(new FileInputStream(fileName)));
            br = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(fileName)));
            String s;
            while ((s = br.readLine()) != null) {
                sb.append(s);
            }
            //System.out.println(sb.toString());
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                br.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return sb.toString();
    }

    /*latestN=0时，表示将Map中所有的都转换为字符串*/
    public String bonusToString(Map map, String date, int latestN) {
        int lastNum = map.size();
        if (latestN != 0) {
            lastNum = (lastNum < latestN) ? lastNum : latestN;
        }
        String issue;
        StringBuilder result = new StringBuilder();
        for (int i = lastNum; i > 0; i--) {
            if (i < 10) {
                issue = date + "-00" + i;
            } else if (i < 100) {
                issue = date + "-0" + i;
            } else {
                issue = date + i;
            }
            result.append("\"");
            result.append(issue);
            result.append("|");
            result.append(map.get(issue));
            result.append("\"");
            if (i != 1) {
                result.append(",");
            }
        }
        return result.toString();
    }

    /*返回用户邻近5期的购买记录*/
    public String getRecentBetRecord(String curIssue, UserInfo ui) {
        if (curIssue == null || curIssue.equals("")) {
            return null;
        }

        String issues[] = new String[5];
        String betList[] = new String[5];
        String date = curIssue.split("-")[0];
        String curNum = curIssue.split("-")[1];
        int startNum = 0;       //开始期号
        int index = (Integer.parseInt(curNum) >= 3) ? 3 : Integer.parseInt(curNum);   //当前活动标签
        if (Integer.parseInt(curNum) <= 3) {
            startNum = 1;
        } else if (Integer.parseInt(curNum) >= 118) {
            startNum = 116;
        } else {
            startNum = Integer.parseInt(curNum) - 1;        //当前context中保存的是最后一次开奖信息，而当前显示的是下一期待用户购买的号码，所以是-1，而不是-2
        }

        for (int i = 0; i < 5; i++) {
            issues[i] = date;
            if (startNum < 10) {
                issues[i] += "-00" + startNum++;
            } else if (startNum > 99) {
                issues[i] += "-" + startNum++;
            } else {
                issues[i] += "-0" + startNum++;
            }
        }

        if (ui != null) {
            BetRecordManager brm = new BetRecordManager();
            for (int i = 0; i < 5; i++) {       //将startNum期及其后面四期的投注编号转换为字符串
                List<BetRecord> brs = brm.getUserBetListByIssue(issues[i], ui.getuId());
                StringBuilder tmp = new StringBuilder("");
                for (int j = 0; j < brs.size(); j++) {
                    BetRecord br = brs.get(j);
                    tmp.append("{");
                    tmp.append(betRecordToJSON(br));
                    if (j != brs.size() - 1) {
                        tmp.append("},");
                    } else {
                        tmp.append("}");
                    }
                }
                betList[i] = tmp.toString();
            }
        } else {
            for (int i= 0; i < 5; i++) {
                betList[i] = "";
            }
        }
        StringBuilder result = new StringBuilder();
        result.append("GetRecentBetRecordBack({\"IssueIndex\":");
        result.append(index - 1);     //数组索引从0开始，所以要-1
        result.append(",\"ListIssue\":[\"");
        result.append(issues[0]);
        result.append("\",\"");
        result.append(issues[1]);
        result.append("\",\"");
        result.append(issues[2]);
        result.append("\",\"");
        result.append(issues[3]);
        result.append("\",\"");
        result.append(issues[4]);
        result.append("\"],\"ListRecord\":[[");

        result.append(betList[0]);
        result.append("],[");
        result.append(betList[1]);
        result.append("],[");
        result.append(betList[2]);
        result.append("],[");
        result.append(betList[3]);
        result.append("],[");
        result.append(betList[4]);
        result.append("]]}, 0);");
        return result.toString();
    }

    /*从下一期开始，获得未来400期的投注编号*/
    public String getNextNBetIssue(String curIssue, int total) {
        if (curIssue == null || curIssue.equals("")) {
            return null;
        }

        StringBuilder result = new StringBuilder();
        Calendar cal = Calendar.getInstance();
        String date = getDate(cal);
        int curNum = Integer.parseInt(curIssue.split("-")[1]) + 1;
        String tmpStr;
        for (int i = 0; i < total; i++) {
            if (curNum < 10) {
                tmpStr = date + "-00";
            } else if (curNum > 99) {
                tmpStr = date + "-";
            } else {
                tmpStr = date + "-0";
            }
            result.append("\"");
            result.append(tmpStr);
            result.append(curNum);
            result.append("\"");
            if (i != total - 1) {
                result.append(",");
            }
            if (++curNum > 120) {
                curNum = 1;
                cal.add(Calendar.DAY_OF_MONTH, 1);
                date = getDate(cal);
            }
        }
        return result.toString();
    }

    public String getDate(Calendar cal) {
        int year, month, day;
        year = cal.get(Calendar.YEAR);
        month = cal.get(Calendar.MONTH) + 1;
        day = cal.get(Calendar.DAY_OF_MONTH);
        String date = year + "";
        if (month < 10) {
            date += "0";
        }
        date += month;
        if (day < 10) {
            date += "0";
        }
        date += day;
        return date;
    }

    public String betRecordToJSON(BetRecord br) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        StringBuilder result = new StringBuilder();
        result.append("\"AnteCode\":\"");
        result.append(br.getBetNumber());
        result.append("\",\"AnteIssue\":\"\",\"BetMethod\":0,\"BonusMoney\":");
        result.append(br.getBetBonus());
        result.append(",\"BonusNumber\":\"\",\"BonusStatus\":");
        result.append(br.getBetStatus());
        result.append(",\"BuyTime\":\"");
        result.append(df.format(br.getBetDate()));
        result.append("\",\"Digest\":\"");
        result.append(br.getProjectId());
        result.append("\",\"IPAddress\":\"");
        if (br.getBetStatus() == 0) {
            result.append("购买成功");
        } else if (br.getBetStatus() == 1) {
            result.append("已中奖");
        } else {
            result.append("未中奖");
        }
        result.append("\",\"Id\":");
        result.append(br.getBetID());
        result.append(",\"LotteryType\":0,\"MamageTime\":\"");
        result.append(df.format(br.getBetDate()));
        result.append("\",\"ManagerName\":\"\",\"ManagerRemarks\":\"\",\"ManagerSequenceMax\":0,\"ManagerSequenceMin\":0,\"Money\":");
        result.append(br.getBetFee());
        result.append(",\"Multiple\":");
        result.append(br.getBetMulti());
        result.append(",\"PlayType\":\"");
        result.append(br.getCategoryNumber());
        result.append("\",\"ProjectId\":");
        result.append(br.getProjectId());
        result.append(",\"ProjectType\":0,\"ResponseTime\":\"");
        result.append(df.format(br.getBetDate()));
        result.append("\",\"SendTime\":\"");
        result.append(df.format(br.getBetDate()));
        result.append("\",\"TicketStatus\":4,\"UserId\":0,\"UserName\":\"\"");
        return result.toString();
    }
}
