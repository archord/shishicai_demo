/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ssc.bean;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

/**
 *
 * @author Administrator
 */
public class FeeRecord{
    private Long feeId;
    private Long uID;
    private String bIssue;      //付款时的期号
    private Integer feeStatus;  //0消费，1充值，2中奖
    private Long feeNumber;
    private Date feeDate;

    public FeeRecord() {
    }

    public FeeRecord(Long feeId) {
        this.feeId = feeId;
    }

    public Long getFeeId() {
        return feeId;
    }

    public void setFeeId(Long feeId) {
        this.feeId = feeId;
    }


    public Integer getFeeStatus() {
        return feeStatus;
    }

    public void setFeeStatus(Integer feeStatus) {
        this.feeStatus = feeStatus;
    }

    public Long getFeeNumber() {
        return feeNumber;
    }

    public void setFeeNumber(Long feeNumber) {
        this.feeNumber = feeNumber;
    }

    public Date getFeeDate() {
        return feeDate;
    }

    public void setFeeDate(Date feeDate) {
        this.feeDate = feeDate;
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
     * @return the uID
     */
    public Long getuID() {
        return uID;
    }

    /**
     * @param uID the uID to set
     */
    public void setuID(Long uID) {
        this.uID = uID;
    }

}
