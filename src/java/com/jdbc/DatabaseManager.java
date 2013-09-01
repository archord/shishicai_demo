package com.jdbc;

import java.sql.*;

//数据库管理类，封装基本的数据库操作集合
public class DatabaseManager {

    private Statement statement = null;            //数据库静态结果集
    private PreparedStatement pStatement = null;   //数据库动态结果集
    private Connection con = null;                 //数据库连接对象

    public DatabaseManager() {
        this.getConnection();
    }

    public ResultSet doSelect(String sql) {//执行sql语句，主要针对数据库选择操作，并对sql语句进行校验

        if (sql == null || sql.trim().equals("")) {  //校验sql语句的合法性
            System.out.println("sql语句为空！");
            return null;
        }
        //System.out.println("sql语句为：" + sql);

        ResultSet rs = null;
        //getConnection(); //获得数据库连接
        try {
            statement = con.createStatement();//获得状态集对象
            rs = statement.executeQuery(sql);//执行sql语句
        } catch (SQLException e) {
            rs = null;
            System.out.println("执行sql语句出错");
            e.printStackTrace();
        }
        return rs;
    }

    public Object doExecute(String sql) {//执行sql语句，主要针对增加，修改，删除操作，使用静态状态集对象，并对sql语句进行校验

        if (sql == null || sql.trim().equals("")) {
            System.out.println("sql语句为空！");
        }
        //System.out.println("sql语句为：" + sql);
        //getConnection();
        Object result = null;
        try {
            statement = con.createStatement();    //获得静态状态集对象
            statement.execute(sql);
            ResultSet rs = statement.getGeneratedKeys();
            if (rs.next()) {
                result = rs.getObject(1);
            }
        } catch (SQLException e) {
            System.out.println("执行sql语句出错");
            e.printStackTrace();
        }
        return result;
    }

    public ResultSet doExecute(String sql, Object[] objs) {//执行sql语句，主要针对增加，修改，删除操作，使用动态状态集对象，并对sql语句进行校验

        if (sql == null || sql.trim().equals("")) {
            System.out.println("sql语句为空！");
            return null;
        }
        //System.out.println("sql语句为：" + sql);
        //getConnection();
        ResultSet rs = null;
        try {
            pStatement = con.prepareStatement(sql, //获得动态状态集对象
                    ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
            if (objs == null) {
                objs = new Object[0];
            }
            for (int i = 0; i < objs.length; i++) { //对动态状态集对象中的参数进行赋值，参数位置取决于sql语句中的“？”的位置
                pStatement.setObject(i + 1, objs[i]);
            }
            pStatement.execute();
            rs = pStatement.getResultSet();
        } catch (SQLException e) {
            rs = null;
            System.out.println("执行sql语句出错");
            e.printStackTrace();
        }
        return rs;
    }

    public int getRowCount(String tableName, String condition) {  //获取制定表的数据的行数
        ResultSet rs;
        String sql = "select count(*) from " + tableName;
        if (condition != null) {
            sql += " where " + condition;
        }
        int rowCount = 0;
        rs = doSelect(sql);
        try {
            if (rs.next()) {
                rowCount = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rowCount;
    }

    protected void getConnection() {    //获得数据库连接
        if (con == null) {
            con = ConnectionFactory.getConnection();
        }
    }

    public void close() {  //关闭数据库连接
        try {
            if (statement != null) {
                statement.close();
            }
            if (pStatement != null) {
                pStatement.close();
            }
            if (con != null) {
                con.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
