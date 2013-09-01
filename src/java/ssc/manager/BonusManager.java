package ssc.manager;

import com.jdbc.*;
import com.jdbc.DatabaseManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import ssc.bean.BetRecord;
import ssc.bean.BonusRecord;

/*开奖记录管理类*/
public class BonusManager {

    public BonusManager() {
    }

    public void addBonus(BonusRecord br) {
        DatabaseManager dbm = new DatabaseManager();
        String sql = "insert into bonus_record(b_issue,b_number,b_date)values('"
                + br.getBIssue() + "','" + br.getBNumber() + "','" + br.getBDate() + "')";
        dbm.doExecute(sql);
        dbm.close();
    }

    public List getTodayBonus() {
        DatabaseManager dbm = new DatabaseManager();
        try {
            List<BonusRecord> al = new ArrayList<BonusRecord>();
            DateFormat df = new SimpleDateFormat("yyyyMMdd");
            String date = df.format(new Date());
            String sql = "select * from bonus_record where b_date=" + date;
            ResultSet rs = dbm.doSelect(sql);
            while (rs.next()) {
                BonusRecord br = new BonusRecord();
                br.setBIssue(rs.getString("b_issue"));
                br.setBNumber(rs.getString("b_number"));
                br.setBDate(rs.getString("b_date"));
                al.add(br);
            }
            dbm.close();
            return al;
        } catch (SQLException ex) {
            if (dbm != null) {
                dbm.close();
            }
            System.out.println("获取今天开奖记录失败！");
            return null;
        }
    }

    public int getTodayBonusTotal() {
        DatabaseManager  dbm= new DatabaseManager();
        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String date = df.format(new Date());
        int total = dbm.getRowCount("bonus_record", "b_date=" + date);
        dbm.close();
        return total;
    }

    public int getBonusTotalByDate(String date) {
        DatabaseManager  dbm= new DatabaseManager();
        int total = dbm.getRowCount("bonus_record", "b_date=" + date);
        dbm.close();
        return total;
    }

}
