/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.manager;

import com.jdbc.DatabaseManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import ssc.bean.UserInfo;

/**
 *
 * @author Administrator
 */
public class UserManager {

    public UserManager() {
    }

    public int addUser(UserInfo ui) {
        return 0;
    }

    public boolean isUserNameExist(String userName){
        return true;
    }

    public void getMoney(UserInfo ui) {
        try {
            DatabaseManager dbm = new DatabaseManager();
            String sql = "select u_yue from user_info where u_loginname = '" + ui.getULoginname() + "'";
            ResultSet rs = dbm.doSelect(sql);
            if (rs.next()) {
                ui.setUYue(rs.getLong("u_yue"));
            }
            dbm.close();
        } catch (SQLException ex) {
            System.out.println("获取用户余额出错！");
            ex.printStackTrace();
        }
    }

    public void updateMoney(UserInfo ui) {
        DatabaseManager dbm = new DatabaseManager();
        String sql = "update user_info set u_yue =" + ui.getUYue() + " where u_loginname = '" + ui.getULoginname() + "'";
        dbm.doExecute(sql);
        dbm.close();
    }

    /*返回值：0系统异常；1登陆成功；2密码错误；3用户名不存在*/
    public int loginCheck(UserInfo ui) {
        int flag = 0;
        DatabaseManager dbm = new DatabaseManager();
        try {
            String sql = "select * from user_info where u_loginname = '" + ui.getULoginname() + "'";
            ResultSet rs = dbm.doSelect(sql);
            if (rs.next()) {
                if (ui.getUPassword().equalsIgnoreCase(rs.getString("u_password"))) {
                    ui.setuId(rs.getLong("u_id"));
                    ui.setUName(rs.getString("u_name"));
                    ui.setUIdentifynum(rs.getString("u_identifynum"));
                    ui.setUYue(rs.getLong("u_yue"));
                    flag = 1;
                } else {
                    flag = 2;
                }
            } else {
                flag = 3;
            }
        } catch (SQLException ex) {
            System.out.println("登陆异常！");
            ex.printStackTrace();
        }
        dbm.close();
        return flag;
    }
}
