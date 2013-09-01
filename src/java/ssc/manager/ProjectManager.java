/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.manager;

import com.jdbc.DatabaseManager;
import ssc.bean.ProjectRecord;

/**
 *
 * @author Administrator
 */
public class ProjectManager {

    public void addProject(ProjectRecord pr) {
        String sql = "insert into project_record(u_id,project_fee,project_betCounts,project_status,project_stop,project_date)values('"
                + pr.getUId() + "','"
                + pr.getProjectFee() + "','"
                + pr.getProjectBetCounts() + "','"
                + pr.getProjectStatus() + "','"
                + pr.getProjectStop() + "',"
                + "current_timestamp())";
        DatabaseManager dbm = new DatabaseManager();
        Object key = dbm.doExecute(sql);
        if (key == null) {
            System.out.println("插入操作后，获取主键出错！");
        } else {
            pr.setProjectId((Long) key);
        }
        dbm.close();
    }
}
