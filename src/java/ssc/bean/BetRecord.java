/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ssc.bean;

import java.math.BigInteger;
import java.util.Date;

public class BetRecord {
    private Long betID;
    private Long uID;
    private String bIssue;
    private long projectId;
    private String categoryNumber;
    private String betNumber;
    private Integer betMulti;
    private Integer betFee;
    private long betBonus;          //奖金，默认为0
    private Integer betStatus;      //0购买成功，1已中奖(反奖)，2未中奖，3未购买
    private Date betDate;

    public BetRecord() {
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

    public String getBetNumber() {
        return betNumber;
    }

    public void setBetNumber(String betNumber) {
        this.betNumber = betNumber;
    }

    public Integer getBetMulti() {
        return betMulti;
    }

    public void setBetMulti(Integer betMulti) {
        this.betMulti = betMulti;
    }

    public Integer getBetFee() {
        return betFee;
    }

    public void setBetFee(Integer betFee) {
        this.betFee = betFee;
    }

    public long getBetBonus() {
        return betBonus;
    }

    public void setBetBonus(long betBonus) {
        this.betBonus = betBonus;
    }

    public Integer getBetStatus() {
        return betStatus;
    }

    public void setBetStatus(Integer betStatus) {
        this.betStatus = betStatus;
    }

    public Date getBetDate() {
        return betDate;
    }

    public void setBetDate(Date betDate) {
        this.betDate = betDate;
    }

    /**
     * @return the uLoginName
     */
    public Long getuID() {
        return uID;
    }

    /**
     * @param uLoginName the uLoginName to set
     */
    public void setuID(long uID) {
        this.uID = uID;
    }

    /**
     * @return the bIssue
     */
    public String getbIssue() {
        return bIssue;
    }

    /**
     * @param bIssue the bIssue to set
     */
    public void setbIssue(String bIssue) {
        this.bIssue = bIssue;
    }

    /**
     * @return the betID
     */
    public Long getBetID() {
        return betID;
    }

    /**
     * @param betID the betID to set
     */
    public void setBetID(Long betID) {
        this.betID = betID;
    }

    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("id=");
        sb.append(this.getBetID());
        sb.append(";user=");
        sb.append(this.getuID());
        sb.append(";number=");
        sb.append(this.getBetNumber());
        sb.append(";categoryid=");
        sb.append(this.getCategoryNumber());
        sb.append(";issue=");
        sb.append(this.getbIssue());
        sb.append(";mutil=");
        sb.append(this.getBetMulti());
        sb.append(";bonus=");
        sb.append(this.getBetBonus());
        return sb.toString();
    }
}
