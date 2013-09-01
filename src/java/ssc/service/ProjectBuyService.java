/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.service;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import net.sf.json.*;
import ssc.bean.*;
import ssc.manager.*;
import ssc.util.ProjectUtil;

/**
 *
 * @author Administrator
 */
public class ProjectBuyService {

    private JSONObject jo = null;
    private UserInfo ui = null;
    private String curIssueNumber = null;
    private String lastIssue = null;
    ProjectRecord pjr = null;

    public ProjectBuyService(JSONObject jo, UserInfo ui, int curBonusTotal, String lastIssue) {
        this.jo = jo;
        this.ui = ui;
        this.lastIssue = lastIssue;
        this.curIssueNumber = ProjectUtil.getCurrentIssue(curBonusTotal);
    }

    public String doService() {
        StringBuilder result = new StringBuilder();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        result.append("BetRetBack({\"CommonArrayList\":[");
        if(checkUser()){
            String firstIssue = noteProjectInfo();      //记录方案信息
            result.append(pjr.getProjectId());
            result.append("],\"CommonBoolean\":false,\"CommonDataTable\":null,\"CommonDateTime\":\"");
            result.append(df.format(pjr.getProjectDate()));
            result.append("\",\"CommonDecimal\":");
            result.append(pjr.getProjectFee());
            result.append(",\"CommonInt\":-1,\"CommonString\":\"");
            result.append(firstIssue);
            result.append("\"});");
        }else{
            result.append("");
            result.append("],\"CommonBoolean\":false,\"CommonDataTable\":null,\"CommonDateTime\":\"");
            result.append(df.format(new Date()));
            result.append("\",\"CommonDecimal\":");
            result.append("0");
            result.append(",\"CommonInt\":3003,\"CommonString\":\"");
            result.append("");
            result.append("\"});");
        }
        //System.out.println(result.toString());
        return result.toString();
    }

    public boolean checkUser() {        //检查用户余额是否够支付此次购买费用，如果够则返回true
        boolean flag = false;
        UserManager um = new UserManager();
        long needMoney = jo.getLong("TotalMoney");
        Long curMoney = ui.getUYue();
        um.getMoney(ui);
        if (curMoney >= needMoney) {
            ui.setUYue(curMoney - needMoney);
            um.updateMoney(ui);     //从用户账户中扣除此次购买所需的费用
            consumeMoney(ui,lastIssue,needMoney);       //记录用户的消费数据
            flag = true;
        }
        return flag;
    }

    public String noteProjectInfo() {       //记录方案信息，如果追号记录包含当前期，则购买当前期号码(生成投注记录，写往用户投注记录表)
        ProjectManager pjm = new ProjectManager();

        String firstIssue = null;
        pjr = new ProjectRecord();                        //方案信息
        pjr.setUId(ui.getuId());
        pjr.setProjectFee(jo.getInt("TotalMoney"));
        pjr.setProjectBetCounts(jo.getInt("TotalBetCount"));
        pjr.setProjectStop((jo.getBoolean("BonusStop") ? 1 : 0));           //中奖后是否继续购买，1继续购买，0停止购买
        pjr.setProjectStatus(1);                                        //0方案进行中，1方案中奖中止，2方案结束
        pjr.setProjectDate(new Date());
        pjm.addProject(pjr);

        List<ProjectContent> pcs = new ArrayList<ProjectContent>();     //方案内容列表
        JSONArray joPC = jo.getJSONArray("TicketList");
        for (int i = 0; i < joPC.size(); i++) {
            JSONObject projectContent = joPC.getJSONObject(i);
            ProjectContent pjc = new ProjectContent();                      //方案内容
            pjc.setProjectId(pjr.getProjectId());
            pjc.setCategoryNumber(projectContent.getString("PlayType"));
            //pjc.setContentNumber(projectContent.getString("AnteCode").replace(",", ""));
            pjc.setContentNumber(projectContent.getString("AnteCode"));
            pjc.setContentFee(projectContent.getInt("Money"));
            pcs.add(pjc);
        }
        
        ProjectContentManager pcm = new ProjectContentManager();
        pcm.addProjectContents(pcs);

        List<ContinueRecord> crs = new ArrayList<ContinueRecord>();     //方案追号列表
        JSONArray joCR = jo.getJSONArray("IssueList");
        for (int i = 0; i < joCR.size(); i++) {
            JSONObject tmp = joCR.getJSONObject(i);
            ContinueRecord cr = new ContinueRecord();                    //方案追号
            cr.setProjectId(pjr.getProjectId());
            cr.setBIssue(tmp.getString("IssueNumber"));
            cr.setContinueMulti(tmp.getInt("Multiply"));
//            if (cr.getBIssue().equals(curIssueNumber)) {
                cr.setContinueStatus(1);        //8.27日改，直接将购买的追号方案写到购买记录表中，取消在每次开奖之后才进行追号
                buyCurrentIssue(pcs, cr);
//            } else {
//                cr.setContinueStatus(0);                                    //状态为0，代表该追号还未进行，状态为1，代表追号已经完成
//            }
            crs.add(cr);
        }
        firstIssue = crs.get(0).getBIssue();
        ContinueRecordManager crm = new ContinueRecordManager();
        crm.addContinueRecord(crs);
        return firstIssue;
    }

    public boolean buyCurrentIssue(List<ProjectContent> pcs, ContinueRecord cr) {      //购买当前期号码，将对应的信息写到用户投注记录表中，在生成投注方案时使用，不用到数据库读取投注内容
        List<BetRecord> brs = new ArrayList<BetRecord>();
        for (int i = 0; i < pcs.size(); i++) {
            BetRecord br = new BetRecord();
            ProjectContent pc = pcs.get(i);
            br.setuID(ui.getuId());
            br.setbIssue(cr.getBIssue());       //8.28改，不仅仅买当前期，而且其他期都买
//            br.setbIssue(curIssueNumber);
            br.setProjectId(cr.getProjectId());
            br.setCategoryNumber(pc.getCategoryNumber());
            br.setBetNumber(pc.getContentNumber());
            br.setBetMulti(cr.getContinueMulti());
            br.setBetFee(cr.getContinueMulti()*pc.getContentFee());
            br.setBetBonus(0);          //奖金，默认为0
            br.setBetStatus(0);         //0未开奖，1已中奖(反奖)，2未中奖
            brs.add(br);
        }
        BetRecordManager brm = new BetRecordManager();
        brm.addBetRecord(brs);
        return true;
    }


    public boolean consumeMoney(UserInfo ui, String issue, Long totalMoney) {          //从用户账户中扣除此次购买所需的费用
        FeeRecord fr = new FeeRecord();
        fr.setFeeDate(new Date());
        fr.setFeeNumber(totalMoney);
        fr.setFeeStatus(0);     //0消费，1充值
        fr.setuID(ui.getuId());
        fr.setbIssue(issue);

        FeeManager fm = new FeeManager();
        fm.addFeeRecord(fr);
        return true;
    }
}
