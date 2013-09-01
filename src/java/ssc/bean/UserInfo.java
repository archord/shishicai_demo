package ssc.bean;

import java.util.Date;

public class UserInfo  {
    private Long uId;
    private String uLoginname;
    private String uPassword;
    private String uName;
    private String uIdentifynum;
    private String uPhone;
    private String uQq;
    private String uQqmail;
    private Long uYue;
    private Date uDate;

    public UserInfo() {
    }

    public UserInfo(String uLoginname) {
        this.uLoginname = uLoginname;
    }

    public UserInfo(String uLoginname, String uPassword) {
        this.uLoginname = uLoginname;
        this.uPassword = uPassword;
    }

    public String getULoginname() {
        return uLoginname;
    }

    public void setULoginname(String uLoginname) {
        this.uLoginname = uLoginname;
    }

    public String getUPassword() {
        return uPassword;
    }

    public void setUPassword(String uPassword) {
        this.uPassword = uPassword;
    }

    public String getUName() {
        return uName;
    }

    public void setUName(String uName) {
        this.uName = uName;
    }

    public String getUIdentifynum() {
        return uIdentifynum;
    }

    public void setUIdentifynum(String uIdentifynum) {
        this.uIdentifynum = uIdentifynum;
    }

    public String getUPhone() {
        return uPhone;
    }

    public void setUPhone(String uPhone) {
        this.uPhone = uPhone;
    }

    public String getUQq() {
        return uQq;
    }

    public void setUQq(String uQq) {
        this.uQq = uQq;
    }

    public String getUQqmail() {
        return uQqmail;
    }

    public void setUQqmail(String uQqmail) {
        this.uQqmail = uQqmail;
    }

    public Long getUYue() {
        return uYue;
    }

    public void setUYue(Long uYue) {
        this.uYue = uYue;
    }

    public Date getUDate() {
        return uDate;
    }

    public void setUDate(Date uDate) {
        this.uDate = uDate;
    }

    /**
     * @return the uId
     */
    public Long getuId() {
        return uId;
    }

    /**
     * @param uId the uId to set
     */
    public void setuId(Long uId) {
        this.uId = uId;
    }

}
