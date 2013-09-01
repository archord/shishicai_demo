/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.manager;

import com.jdbc.DatabaseManager;
import java.util.ArrayList;
import java.util.List;
import ssc.bean.ProjectContent;

/**
 *
 * @author Administrator
 */
public class ProjectContentManager {

    public void addProjectContents(List<ProjectContent> pcs) {
        String sql = "insert into project_content(project_id,category_number,content_number,content_fee)values(?,?,?,?)";
        DatabaseManager dbm = new DatabaseManager();
        for (int i = 0; i < pcs.size(); i++) {
            Object[] objs = {pcs.get(i).getProjectId(),
                pcs.get(i).getCategoryNumber(),
                pcs.get(i).getContentNumber(),
                pcs.get(i).getContentFee()};
            dbm.doExecute(sql, objs);
        }
        dbm.close();
    }
}
