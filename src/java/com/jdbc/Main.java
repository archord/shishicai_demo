package com.jdbc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.String;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ssc.bean.BonusRecord;
import ssc.bean.UserInfo;
import ssc.manager.*;
import ssc.util.ProjectUtil;
import ssc.util.RandomNumberUtil;

//数据库连接测试类，不参与整个项目的执行
public class Main {

    /**
     * @param args
     */
    public static void main(String[] args) {
//        BetRecordManager brm = new BetRecordManager();
//        brm.getQueryString("201108260-50", "14718");
        String a="a,b,c,d,e";
        System.out.println(a.replaceAll(",", "").substring(0,3));
        
    }

    public static char[][] getDXDS(String bonus){
        char result[][] = new char[4][2];
        //判断第四位
        if(bonus.charAt(3)>'4'){    //大
            result[0][0] = '2';
            result[1][0] = '2';
        }else{                      //小
            result[0][0] = '1';
            result[1][0] = '1';
        }
        if(Integer.parseInt(bonus.substring(3, 4))%2==0){   //双
            result[2][0] = '4';
            result[3][0] = '4';
        }else{      //单
            result[2][0] = '5';
            result[3][0] = '5';
        }

        //判断第五位
        if(bonus.charAt(4)>'4'){
            result[0][1] = '2';
            result[3][1] = '2';
        }else{
            result[0][1] = '1';
            result[3][1] = '1';
        }
        if(Integer.parseInt(bonus.substring(4, 5))%2==0){
            result[2][1] = '4';
            result[1][1] = '4';
        }else{
            result[2][1] = '5';
            result[1][1] = '5';
        }
        return result;
    }

    public static String getDataFromFile(String fileName) {

        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();
        try {
            br = new BufferedReader(new InputStreamReader(new FileInputStream(fileName)));
            String s;
            while ((s = br.readLine()) != null) {
                sb.append(s);
            }
            System.out.println(sb.toString());
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                br.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return sb.toString();
    }
}

class MyStack {
    //存储空间
    //private LinkedList ll=new LinkedList();

    private ArrayList ll = new ArrayList();
    //出栈 弹栈

    public Object pop() {
        //return ll.removeLast();
        return ll.remove(ll.size() - 1);
    }
    //入栈 压栈

    public void push(Object o) {
        //ll.addLast(o);
        ll.add(o);
    }
    //查看栈顶

    public Object peek() {
        //return ll.getLast();
        return ll.get(ll.size() - 1);
    }
    //为空?

    public boolean isEmpty() {
        return ll.isEmpty();
    }
}
