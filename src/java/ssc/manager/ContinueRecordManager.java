/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.manager;

import com.jdbc.DatabaseManager;
import java.util.List;
import ssc.bean.ContinueRecord;

/**
 *
 * @author Administrator
 */
public class ContinueRecordManager {

    public void addContinueRecord(List<ContinueRecord> crs) {
        String sql = "insert into continue_record(project_id,b_issue,continue_multi,continue_status)values(?,?,?,?)";
        DatabaseManager dbm = new DatabaseManager();
        for (int i = 0; i < crs.size(); i++) {
            Object[] objs = {crs.get(i).getProjectId(),
                crs.get(i).getBIssue(),
                crs.get(i).getContinueMulti(),
                crs.get(i).getContinueStatus()};
            dbm.doExecute(sql, objs);
        }
        dbm.close();
    }
}
