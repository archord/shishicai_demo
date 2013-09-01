/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ssc.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ssc.util.*;

/**
 *
 * @author Administrator
 */
public class BonusServlet extends HttpServlet {

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
        try {
            //BetIssue, BetLeaveTime, TrueIssue, DrawLeaveTime, BonusIssue, BonusNumber；
            //接口格式：b('20110807-095;591;20110807-094;51;20110807-093;10424', '3'); ;第二个参数为状态，取值为1,2,3
            StringBuilder result = new StringBuilder("b('");
            ServletContext context = request.getSession().getServletContext();
            String betIssue = "";
            String trueIssue = "";
            String bonusIssue = (String) context.getAttribute("lastIssue");
            String bonusNumber = (String) context.getAttribute("lastBonus");
            int betLeaveTime = getBetLeaveTime();
            int drawLeaveTime = getDrawLeaveTime();
            String bStatus = "3";       //当前开奖状态，取值为1,2,3

            if (!bonusIssue.isEmpty()) {
                String[] tmp = bonusIssue.split("-");
                if (drawLeaveTime <= 60) {
                    trueIssue = tmp[0] + "-" + ProjectUtil.IntToNLengthStr((Integer.parseInt(tmp[1]) + 1), 3);
                    betIssue = tmp[0] + "-" + ProjectUtil.IntToNLengthStr((Integer.parseInt(tmp[1]) + 2), 3);
                } else {
                    trueIssue = tmp[0] + "-" + ProjectUtil.IntToNLengthStr((Integer.parseInt(tmp[1]) + 1), 3);
                    betIssue = trueIssue;
                }
            }
            result.append(betIssue);
            result.append(";");
            result.append(betLeaveTime);
            result.append(";");
            result.append(trueIssue);
            result.append(";");
            result.append(drawLeaveTime);
            result.append(";");
            result.append(bonusIssue);
            result.append(";");
            result.append(bonusNumber);
            result.append("', '");
            result.append(bStatus);
            result.append("');");
            //System.out.println(result.toString());
            out.println(result.toString());
//            out.print("b('20110807-095;591;20110807-094;51;20110807-093;10424', '3');");
//            System.out.println("b('20110807-095;591;20110807-094;51;20110807-093;10424', '3');");
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

    public int getDrawLeaveTime() {     //开奖剩余时间，开奖前需要等待之多60秒(白天60秒，晚上30秒)，因此要比选号剩余时间大之多60
        Calendar cal = Calendar.getInstance();
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        int minute = cal.get(Calendar.MINUTE);
        int second = cal.get(Calendar.SECOND);

        int lTime = 0;
        if (hour >= 10 && hour < 22) {                  //每10分钟开一次
            if (minute % 10 == 0) {                     //开奖倒计时
                lTime = 60 - second;
            } else {
                lTime = (9 - minute % 10) * 60 + (60 - second) + 60;      //9=10-1
            }
        } else if (hour <= 1 || hour >= 22) {           //每5分钟开一次
            if (minute % 5 == 0) {                     //开奖倒计时
                lTime = 30 - second;
            } else {
                lTime = (4 - minute % 5) * 60 + (60 - second) + 30;       //4=5-1
            }
        } else {
            lTime = ((9 - hour) * 60 + (59 - minute)) * 60 + (60 - second) + 60;     //每天从早上10点开始开奖
        }
        return lTime;
    }

    public int getBetLeaveTime() {      //选号剩余时间
        Calendar cal = Calendar.getInstance();
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        int minute = cal.get(Calendar.MINUTE);
        int second = cal.get(Calendar.SECOND);

        int lTime = 0;
        if (hour >= 10 && hour < 22) {                  //每10分钟开一次
            lTime = (9 - minute % 10) * 60 + (60 - second);      //9=10-1
        } else if (hour <= 1 || hour >= 22) {           //每5分钟开一次
            lTime = (4 - minute % 5) * 60 + (60 - second);       //4=5-1
        } else {
            lTime = ((9 - hour) * 60 + (59 - minute)) * 60 + (60 - second);     //每天从早上10点开始开奖
        }
        return lTime;
    }
}
