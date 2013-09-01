/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ssc.bean;


/**
 *
 * @author Administrator
 */
public class ContinueRecord {
    private Long continueId;
    private long projectId;
    private String bIssue;
    private int continueMulti;
    private Integer continueStatus;     //状态为0，代表该追号还未进行，状态为1，代表追号已经完成

    public ContinueRecord() {
    }

    public Long getContinueId() {
        return continueId;
    }

    public void setContinueId(Long continueId) {
        this.continueId = continueId;
    }

    public long getProjectId() {
        return projectId;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }

    public String getBIssue() {
        return bIssue;
    }

    public void setBIssue(String bIssue) {
        this.bIssue = bIssue;
    }

    public int getContinueMulti() {
        return continueMulti;
    }

    public void setContinueMulti(int continueMulti) {
        this.continueMulti = continueMulti;
    }

    public Integer getContinueStatus() {
        return continueStatus;
    }

    public void setContinueStatus(Integer continueStatus) {
        this.continueStatus = continueStatus;
    }

}
