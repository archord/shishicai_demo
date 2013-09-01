/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ssc.bean.ContinueRecord;
import ssc.bean.ProjectContent;
import ssc.bean.ProjectRecord;
import ssc.bean.UserInfo;
import ssc.manager.ContinueRecordManager;
import ssc.manager.ProjectContentManager;
import ssc.manager.ProjectManager;
import ssc.manager.UserManager;
import ssc.service.ProjectBuyService;
import ssc.util.ProjectUtil;

/**
 *
 * @author Administrator
 */
public class BaseServlet extends HttpServlet {

    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String method = request.getParameter("method");
        StringBuilder result = new StringBuilder();
        ProjectUtil pju = new ProjectUtil();
        HttpSession session = request.getSession();
        Map issues = (Map) session.getServletContext().getAttribute("issues");
        Long date = (Long) session.getServletContext().getAttribute("date");
        String lastIssue = (String) session.getServletContext().getAttribute("lastIssue");
        int todayTotalNum = (Integer) session.getServletContext().getAttribute("todayTotalNum");
        UserInfo ui = (UserInfo) session.getAttribute("curUser");


        //解析客户端传来的操作信息
        JSONObject jo = JSONObject.fromObject(request.getParameter("data"));
        if (method != null) {
            if (method.equals("UserLogin")) {//用户登录
                boolean logined = false;
                long uId = 0;
                String uLoginName = "";
                long balance = 0;
                int messages = 0;
                int point = 0;
                boolean vip = true;
                boolean uPhoneBinded = true;
                String loginBackURL = "";

                JSONArray ja = jo.getJSONArray("Parameters");                   //解析用户参数

                //获得客户端传来的客户信息
                ui = new UserInfo();
                ui.setULoginname(ja.getString(0));
                ui.setUPassword(ja.getString(1));
                //验证用户信息
                UserManager um = new UserManager();
                int flag = um.loginCheck(ui);
                if (flag == 1) {//登录成功
                    session.setAttribute("curUser", ui);   //将当前登录用户的信息保存到session中
                    logined = true;
                    result.append("cuser.loginBack({\"CommandName\":\"");
                    result.append(logined);
                    result.append("\",\"Parameters\":[\"");
                    result.append(ui.getuId());
                    result.append("\",\"");
                    result.append(ui.getULoginname());
                    result.append("\",\"");
                    result.append(ui.getUYue());
                    result.append("\",\"");
                    result.append(messages);
                    result.append("\",\"");
                    result.append(point);
                    result.append("\",\"");
                    result.append(vip);
                    result.append("\",\"");
                    result.append(uPhoneBinded);
                    result.append("\",\"");
                    result.append(loginBackURL);
                    result.append("\"]});");
                } else {
                    logined = false;
                    result.append("cuser.loginBack({\"CommandName\":\"");
                    result.append(logined);
                    result.append("\",\"Parameters\":[\"");
                    result.append(flag);
                    result.append("\",\"");
                    result.append("true"); //是否需要启动验证码输入
                    result.append("\"]});");
                }
                //System.out.println(result.toString()); 
                //result.append("cuser.loginBack({\"CommandName\":\"true245782\",\"haveaday\",\"0\",\"1\",\"0\",\"false\",\"false\",\"\\UserCenter\\Default.aspx\"]});");
            } else if (ui != null && method.equals("BuyProject")) {                 //需要用户登录
                //System.out.println(request.getParameter("data"));
                JSONArray parameters = jo.getJSONArray("Parameters");
                ProjectBuyService pbs = new ProjectBuyService(parameters.getJSONObject(0), ui, todayTotalNum, lastIssue);
                String tmp = pbs.doService();
                result.append(tmp);
            } else if (method.equals("SpeedAjax_GetTop12Bonus")) {
                result.append("GetDataBonusBack([");
                result.append(pju.bonusToString(issues, date.toString(), 12));
                result.append("]);");
            } else if (method.equals("SpeedAjax_GetRecentBetRecord")) {         //需要登录
                String tmp = pju.getRecentBetRecord(lastIssue, ui);
                //System.out.println(tmp);
                result.append(tmp);
            } else if (method.equals("SpeedAjax_GetTodayBonus")) {
                result.append("GetTodayBonusBack([");
                result.append(pju.bonusToString(issues, date.toString(), 0));
                result.append("]);");
            } else if (method.equals("SpeedAjax_GetDataYiLou")) {
                result.append(pju.getDataFromFile("/resource/yiloudata.txt"));
            } else if (method.equals("SpeedAjax_GetCurrentBetIssue")) {
                String nextNBetIssues = (String) session.getServletContext().getAttribute("nextNBetIssues");

                Calendar cal = Calendar.getInstance();
                String time = cal.get(Calendar.HOUR_OF_DAY) + ":" + cal.get(Calendar.MINUTE);
                result.append("GetCurrentBetIssueBack([");
                result.append(nextNBetIssues);
                result.append("],\"");
                result.append(time);
                result.append("\");");
            } else if (ui != null && method.equals("UserCenter_GetUserCommon")) {
                UserManager um = new UserManager();
                um.getMoney(ui);
                result.append("cuser.getNewUserInfoBack({\"CommandName\":\"\",\"Parameters\":[\"{\\\"CommandName\\\":\\\"0\\\",\\\"Parameters\\\":[\\\"");
                result.append(ui.getUYue());
                result.append("\\\",\\\"网站代管账户\\\"]}\",\"{\\\"CommandName\\\":\\\"Total\\\",\\\"Parameters\\\":[\\\"");
                result.append(ui.getUYue());
                result.append("\\\"]}\",\"");
                result.append(ui.getUYue());
                result.append("\",\"1\"]});");      //等于1，控制不能刷新；等于0，允许刷新
            } else {
                result.append("[]");
            }
        }
        //getClass().getResourceAsStream("/image/....")
        //System.out.println(getClass().getResource("/resource/yiloudata.txt"));
        System.out.println("baseServlet:\t"+method);
        try {
            //System.out.println(result.toString());
            out.println(result.toString());

        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
