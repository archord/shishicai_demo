package ssc.bean;

public class BonusRecord{

    private String bIssue;
    private String bNumber;
    private String bDate;

    public BonusRecord() {
    }

    public BonusRecord(String bIssue) {
        this.bIssue = bIssue;
    }

    public String getBIssue() {
        return bIssue;
    }

    public void setBIssue(String bIssue) {
        this.bIssue = bIssue;
    }

    public String getBNumber() {
        return bNumber;
    }

    public void setBNumber(String bNumber) {
        this.bNumber = bNumber;
    }

    public String getBDate() {
        return bDate;
    }

    public void setBDate(String bDate) {
        this.bDate = bDate;
    }

    public String toString(){
        return bIssue+"|"+bNumber;
    }
}
