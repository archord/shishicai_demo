/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ssc.bean;

import java.util.Date;

/**
 *
 * @author Administrator
 */
public class ProjectRecord{
    private Long projectId;
    private long uId;
    private long projectFee;
    private int projectBetCounts;
    private int projectStatus;          //0方案进行中，1方案中奖中止，2方案结束
    private int projectStop;            //中奖后是否继续购买，1继续购买，0停止购买
    private Date projectDate;

    public ProjectRecord() {
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public long getUId() {
        return uId;
    }

    public void setUId(long uId) {
        this.uId = uId;
    }

    public long getProjectFee() {
        return projectFee;
    }

    public void setProjectFee(long projectFee) {
        this.projectFee = projectFee;
    }

    public int getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(int projectStatus) {
        this.projectStatus = projectStatus;
    }

    public Integer getProjectStop() {
        return projectStop;
    }

    public void setProjectStop(Integer projectStop) {
        this.projectStop = projectStop;
    }

    public Date getProjectDate() {
        return projectDate;
    }

    public void setProjectDate(Date projectDate) {
        this.projectDate = projectDate;
    }

    /**
     * @return the projectBetCounts
     */
    public int getProjectBetCounts() {
        return projectBetCounts;
    }

    /**
     * @param projectBetCounts the projectBetCounts to set
     */
    public void setProjectBetCounts(int projectBetCounts) {
        this.projectBetCounts = projectBetCounts;
    }

}
