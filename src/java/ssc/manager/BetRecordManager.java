/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.manager;

import com.jdbc.DatabaseManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import ssc.bean.BetRecord;

/**
 *
 * @author Administrator
 */
public class BetRecordManager {

    public void addBetRecord(List<BetRecord> brs) {
        String sql = "insert into bet_record(u_id,b_issue,project_id,category_number,bet_number,"
                + "bet_multi,bet_fee,bet_bonus,bet_status,bet_date)values(?,?,?,?,?,?,?,?,?,?)";
        DatabaseManager dbm = new DatabaseManager();
        Date curDate = new Date();
        for (int i = 0; i < brs.size(); i++) {
            BetRecord br = brs.get(i);
            Object[] objs = {br.getuID(),
                br.getbIssue(),
                br.getProjectId(),
                br.getCategoryNumber(),
                br.getBetNumber(),
                br.getBetMulti(),
                br.getBetFee(),
                br.getBetBonus(),
                br.getBetStatus(), curDate};
            dbm.doExecute(sql, objs);
        }
        dbm.close();
    }

    public List<BetRecord> getUserBetListByIssue(String issue, Long uID){
        try {
            List<BetRecord> brs = new ArrayList<BetRecord>();
            String sql = "select * from bet_record where u_id=" + uID + " and b_issue = '" + issue + "'";
            DatabaseManager dbm = new DatabaseManager();
            ResultSet rs = dbm.doSelect(sql);
            while (rs.next()) {
                BetRecord br = new BetRecord();
                br.setBetID(rs.getLong("bet_id"));
                br.setBetBonus(rs.getLong("bet_bonus"));
                br.setBetDate(rs.getDate("bet_date"));
                br.setBetFee(rs.getInt("bet_fee"));
                br.setBetMulti(rs.getInt("bet_multi"));
                br.setBetNumber(rs.getString("bet_number"));
                br.setBetStatus(rs.getInt("bet_status"));
                br.setCategoryNumber(rs.getString("category_number"));
                br.setProjectId(rs.getInt("project_id"));
                br.setbIssue(rs.getString("b_issue"));
                br.setuID(rs.getLong("u_id"));
                brs.add(br);
            }
            dbm.close();
            return brs;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public void continueBetRecord(String curIssue) {
        //将追号信息添加到用户投注信息表中
        String sql1 = "insert into bet_record  (u_id, b_issue, project_id, category_number, bet_number, bet_multi, bet_fee, bet_bonus, bet_status, bet_date) "
                + "select "
                + "pr.u_id, "
                + "cr.b_issue, "
                + "cr.project_id, "
                + "pc.category_number, "
                + "pc.content_number bet_number, "
                + "cr.continue_multi bet_multi, "
                + "pc.content_fee*cr.continue_multi bet_fee, "
                + "0,0,current_timestamp() "
                + "from continue_record cr "
                + "inner join project_record pr on cr.project_id = pr.project_id "
                + "inner join project_content pc on cr.project_id = pc.project_id "
                + "where cr.b_issue = '" + curIssue + "' ";
        //+ "and continue_status = 0 ";
        //更新当前期相关的追号状态改为1(已追号)
        String sql2 = "update continue_record set continue_status = 1 where b_issue ='" + curIssue + "'";
        DatabaseManager dbm = new DatabaseManager();
        dbm.doExecute(sql1);
        dbm.doExecute(sql2);
        dbm.close();
    }

    //筛选出中奖的用户
    public List findPrizeList(String lastIssue, String lastBonus) {
        try {
            List<BetRecord> brs = new ArrayList<BetRecord>();
            String sql = getQueryString(lastIssue, lastBonus);
            DatabaseManager dbm = new DatabaseManager();
            ResultSet rs = dbm.doSelect(sql);
            while (rs.next()) {
                BetRecord br = new BetRecord();
                br.setBetID(rs.getLong("bet_id"));
                br.setBetBonus(rs.getLong("bet_bonus"));
                br.setBetDate(rs.getDate("bet_date"));
                br.setBetFee(rs.getInt("bet_fee"));
                br.setBetMulti(rs.getInt("bet_multi"));
                br.setBetNumber(rs.getString("bet_number"));
                br.setBetStatus(rs.getInt("bet_status"));
                br.setCategoryNumber(rs.getString("category_number"));
                br.setProjectId(rs.getInt("project_id"));
                br.setbIssue(rs.getString("b_issue"));
                br.setuID(rs.getLong("u_id"));
                brs.add(br);
            }
            dbm.close();
            return brs;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    //更新用户的中奖信息
    public void updateUserPrize(List<BetRecord> brs){
        String sql1 = "update bet_record set bet_status = 1, bet_bonus = ? where bet_id = ?";                   //更新用户彩票记录
        String sql2 = "update user_info set u_yue=u_yue + ? where u_id = ?";                                    //更新用户余额
        String sql3 = "insert into fee_record(u_id,b_issue,fee_status,fee_number,fee_date)values(?,?,?,?,current_timestamp())";   //增加用户消费记录
        DatabaseManager dbm = new DatabaseManager();
        for (int i= 0; i < brs.size(); i++) {
            BetRecord br= brs.get(i);
            Object[] objs1 = {br.getBetBonus(),br.getBetID()};      //更新用户彩票信息
            Object[] objs2 = {br.getBetBonus(),br.getuID()};        //为用户的余额增加对应的值
            Object[] objs3 = {br.getuID(),br.getbIssue(),2,br.getBetBonus()};        //用户消费记录
            dbm.doExecute(sql1, objs1);
            dbm.doExecute(sql2, objs2);
            dbm.doExecute(sql3, objs3);
        }
        dbm.close();
    }

    public void updateAllBetStatus(String lastIssue) {
        String sql = "update bet_record set bet_status = 2 where b_issue = '" + lastIssue + "'";
        DatabaseManager dbm = new DatabaseManager();
        dbm.doExecute(sql);
        dbm.close();
    }

    public String getQueryString(String lastIssue, String lastBonus) {
        int c1 = lastBonus.charAt(4) - '0';
        int c2 = lastBonus.charAt(3) - '0';
        int c3 = lastBonus.charAt(2) - '0';
        int c4 = lastBonus.charAt(1) - '0';
        int c5 = lastBonus.charAt(0) - '0';
        StringBuilder sql = new StringBuilder();
        sql.append("select * from bet_record where b_issue='");
        sql.append(lastIssue);
        sql.append("' and (");

        sql.append("(category_number = '3011' and SUBSTRING_INDEX(bet_number,',',-1)='");   //一星单式:3011     _,_,_,_,4
        sql.append(c1);
        sql.append("') or");

        //二星
        char[][] dxds = getDXDS(lastBonus);
        for (int i = 0; i < 4; i++) {
            sql.append("(category_number = '306' and bet_number='");      //大小单双大:306，大2，小1，单5，双4
            sql.append(dxds[i][0]);
            sql.append(",");
            sql.append(dxds[i][1]);
            sql.append("') or");
        }
        sql.append("(category_number = '311' and bet_number='");      //二星组选包胆:311
        sql.append(c1);
        sql.append("') or");
        if (c1 != c2) {
            sql.append("(category_number = '311' and bet_number='");      //二星组选包胆:311
            sql.append(c2);
            sql.append("') or");
        }

        sql.append("(category_number = '310' and bet_number='");      //二星组选包点:310
        sql.append(c1 + c2);
        sql.append("') or");

        sql.append("(category_number = '305' and bet_number='");      //二星和值:305
        sql.append(c1 + c2);
        sql.append("') or");

        sql.append("(category_number = '309' and locate('");      //二星组选分位:309   字符序列：_,_,_,45,45 _,_,_,4,4  可以有对子
        sql.append(c1);
        sql.append("',bet_number)>0 and locate('");
        sql.append(c2);
        sql.append("',bet_number)>0 )or");

        sql.append("((category_number = '307' or category_number = '308') and locate('");      ///二星组选:307(单注，_,_,_,3,4)和308(多注)  字符序列：3,4,5 没有对子
        sql.append(c1);
        sql.append("',bet_number)>0 and locate('");
        sql.append(c2);
        sql.append("',bet_number)>0 )or");

        sql.append("((category_number = '3032' or category_number = '3012') and locate('");      //二星 3032(_,_,_,34,345)，3012(_,_,_,3,3)
        sql.append(c1);
        sql.append("',SUBSTRING_INDEX(bet_number,',',-1))>0 and locate('");
        sql.append(c2);
        sql.append("',SUBSTRING_INDEX(SUBSTRING_INDEX(bet_number,',',-2),',',1))>0 )or");

        //三星
        sql.append("(category_number = '304' and bet_number='");      //三星和值:304
        sql.append(c1 + c2 + c3);
        sql.append("') or");

        if (c1 == c2 || c2 == c3) { //组三复式:315 复式(2,3,4)和313(单式_,_,2,2,5)
            int tmp1, tmp2;
            if (c1 == c2) {
                tmp1 = c1;
                tmp2 = c3;
            } else {
                tmp1 = c1;
                tmp2 = c2;
            }
            sql.append("(category_number = '315' and locate('");      //组三复式:315   字符序列： 复式(2,3,4)
            sql.append(tmp1);
            sql.append("',bet_number)>0 and locate('");
            sql.append(tmp2);
            sql.append("',bet_number)>0 )or");

            sql.append("(category_number = '313' and bet_number='_,_,");      //组三复式:313 (单式_,_,2,2,5
            sql.append(c3);
            sql.append(",");
            sql.append(c2);
            sql.append(",");
            sql.append(c1);
            sql.append("') or");
        }

        if (c1 != c2 && c2 != c3 && c1 != c3) { //组六复式:三个数各不相同，且顺序不限   316 (3,4,5,6)和314 (_,_,2,3,4)
            sql.append("((category_number = '316' or category_number = '314') and locate('");
            sql.append(c1);
            sql.append("',bet_number)>0 and locate('");
            sql.append(c2);
            sql.append("',bet_number)>0 and locate('");
            sql.append(c3);
            sql.append("',bet_number)>0 )or");
        }

        sql.append("(category_number = '317' and length(bet_number)=1 and locate(bet_number,'");    //三星组选包胆:317 包一胆4
        sql.append(c1);                                                                             //只需判断所选号码(只选一个)是否在开奖号码的后三位
        sql.append(c2);
        sql.append(c3);
        sql.append("')>0 )or");

        sql.append("(category_number = '317' and length(bet_number)=3 and locate(SUBSTRING_INDEX(bet_number,',',-1),'");    //三星组选包胆:317 包二胆4,3
        sql.append(c1);                                                                             //需判断所选号码(选了两个)的两个数是否在开奖号码的后三位
        sql.append(c2);
        sql.append(c3);
        sql.append("')>0 and locate(SUBSTRING_INDEX(bet_number,',',1),'");    //三星组选包胆:317 包二胆4,3
        sql.append(c1);
        sql.append(c2);
        sql.append(c3);
        sql.append("')>0 )or");

        sql.append("(category_number = '318' and bet_number='");      //三星组选包点:318
        sql.append(c1 + c2 + c3);
        sql.append("') or");

        if (c1 != c2 && c2 != c3 && c1 != c3) { //三星直选组合:319
            sql.append("(category_number = '319' and locate('");
            sql.append(c1);
            sql.append("',bet_number)>0 and locate('");
            sql.append(c2);
            sql.append("',bet_number)>0 and locate('");
            sql.append(c3);
            sql.append("',bet_number)>0 )or");
        }

        sql.append("((category_number = '3033' or category_number = '3013') and locate('");      //三星(直选):3033(_,_,345,567,789)/3013(_,_,4,4,5)
        sql.append(c1);
        sql.append("',SUBSTRING_INDEX(bet_number,',',-1))>0 and locate('");
        sql.append(c2);
        sql.append("',SUBSTRING_INDEX(SUBSTRING_INDEX(bet_number,',',-2),',',1))>0 and locate('");
        sql.append(c3);
        sql.append("',SUBSTRING_INDEX(SUBSTRING_INDEX(bet_number,',',-3),',',1))>0 )or");


        sql.append("((category_number = '3035' or category_number = '3015') and locate('");      //五星(直选):3035(123,324,54,56,67)/3015(0,1,2,3,4)
        sql.append(c1);
        sql.append("',SUBSTRING_INDEX(bet_number,',',-1))>0 and locate('"); //取个位
        sql.append(c2);
        sql.append("',SUBSTRING_INDEX(SUBSTRING_INDEX(bet_number,',',-2),',',1))>0 and locate('");  //取十位
        sql.append(c3);
        sql.append("',SUBSTRING_INDEX(SUBSTRING_INDEX(bet_number,',',-3),',',1))>0 and locate('");  //取百位
        sql.append(c4);
        sql.append("',SUBSTRING_INDEX(SUBSTRING_INDEX(bet_number,',',2),',',-1))>0 and locate('");  //取千未
        sql.append(c5);
        sql.append("',SUBSTRING_INDEX(bet_number,',',1))>0 )or");   //取万位

        sql.append("(category_number = '312' and bet_number='");      //五星通选:312(2,2,2,2,3)，一共五种情况，第一种5个号码全匹配
        sql.append(c5);
        sql.append(",");
        sql.append(c4);
        sql.append(",");
        sql.append(c3);
        sql.append(",");
        sql.append(c2);
        sql.append(",");
        sql.append(c1);
        sql.append("')or");
        sql.append("(category_number = '312' and SUBSTRING_INDEX(bet_number,',',3)='");      //五星通选:312(2,2,2,2,3)，一共五种情况，第二种前3个号码全匹配
        sql.append(c5);
        sql.append(",");
        sql.append(c4);
        sql.append(",");
        sql.append(c3);
        sql.append("')or");
        sql.append("(category_number = '312' and SUBSTRING_INDEX(bet_number,',',-3)='");      //五星通选:312(2,2,2,2,3)，一共五种情况，第三种后3个号码全匹配
        sql.append(c3);
        sql.append(",");
        sql.append(c2);
        sql.append(",");
        sql.append(c1);
        sql.append("')or");
        sql.append("(category_number = '312' and SUBSTRING_INDEX(bet_number,',',2)='");      //五星通选:312(2,2,2,2,3)，一共五种情况，第四种前两个号码全匹配
        sql.append(c5);
        sql.append(",");
        sql.append(c4);
        sql.append("')or");
        sql.append("(category_number = '312' and SUBSTRING_INDEX(bet_number,',',-2)='");      //五星通选:312(2,2,2,2,3)，一共五种情况，第五种后两个号码全匹配
        sql.append(c2);
        sql.append(",");
        sql.append(c1);
        sql.append("'))");

        //System.out.println(sql.toString());
        return sql.toString();
    }

    public char[][] getDXDS(String bonus) {
        char result[][] = new char[4][2];
        //判断第四位
        if (bonus.charAt(3) > '4') {    //大
            result[0][0] = '2';
            result[1][0] = '2';
        } else {                      //小
            result[0][0] = '1';
            result[1][0] = '1';
        }
        if (Integer.parseInt(bonus.substring(3, 4)) % 2 == 0) {   //双
            result[2][0] = '4';
            result[3][0] = '4';
        } else {      //单
            result[2][0] = '5';
            result[3][0] = '5';
        }
        //判断第五位
        if (bonus.charAt(4) > '4') {
            result[0][1] = '2';
            result[3][1] = '2';
        } else {
            result[0][1] = '1';
            result[3][1] = '1';
        }
        if (Integer.parseInt(bonus.substring(4, 5)) % 2 == 0) {
            result[2][1] = '4';
            result[1][1] = '4';
        } else {
            result[2][1] = '5';
            result[1][1] = '5';
        }
        return result;
    }
}
