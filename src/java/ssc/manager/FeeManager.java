/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ssc.manager;

import com.jdbc.DatabaseManager;
import ssc.bean.*;

/**
 *
 * @author Administrator
 */
public class FeeManager {

    public void addFeeRecord(FeeRecord fr){
        String sql = "insert into fee_record(u_id,b_issue,fee_status,fee_number,fee_date)values('"
                + fr.getuID() + "','"
                + fr.getbIssue() + "','"
                + fr.getFeeStatus() + "','"
                + fr.getFeeNumber() + "',"
                + "current_timestamp())";
        DatabaseManager dbm = new DatabaseManager();
        dbm.doExecute(sql);
        dbm.close();
    }

    public void getFeeList(){

    }

    public void getFeeListByUser(UserInfo ui){

    }
}
