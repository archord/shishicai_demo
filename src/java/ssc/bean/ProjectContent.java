/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ssc.bean;


/**
 *
 * @author Administrator
 */
public class ProjectContent{
    private Long contentId;
    private long projectId;
    private String categoryNumber;      //玩法类型编号
    private String contentNumber;
    private int contentFee;

    public ProjectContent() {
    }

    public Long getContentId() {
        return contentId;
    }

    public void setContentId(Long contentId) {
        this.contentId = contentId;
    }

    public long getProjectId() {
        return projectId;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }

    public String getCategoryNumber() {
        return categoryNumber;
    }

    public void setCategoryNumber(String categoryNumber) {
        this.categoryNumber = categoryNumber;
    }

    public String getContentNumber() {
        return contentNumber;
    }

    public void setContentNumber(String contentNumber) {
        this.contentNumber = contentNumber;
    }

    public int getContentFee() {
        return contentFee;
    }

    public void setContentFee(int contentFee) {
        this.contentFee = contentFee;
    }

}
