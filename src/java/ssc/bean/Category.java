/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ssc.bean;

import java.io.Serializable;
import java.math.BigInteger;

/**
 *
 * @author Administrator
 */
public class Category{
    private Integer categoryId;
    private String categoryNumber;
    private BigInteger categoryBonus;
    private Integer categoryFee;
    private Integer categorySum;
    private String categoryDetail;

    public Category() {
    }

    public Category(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryNumber() {
        return categoryNumber;
    }

    public void setCategoryNumber(String categoryNumber) {
        this.categoryNumber = categoryNumber;
    }

    public BigInteger getCategoryBonus() {
        return categoryBonus;
    }

    public void setCategoryBonus(BigInteger categoryBonus) {
        this.categoryBonus = categoryBonus;
    }

    public Integer getCategoryFee() {
        return categoryFee;
    }

    public void setCategoryFee(Integer categoryFee) {
        this.categoryFee = categoryFee;
    }

    public Integer getCategorySum() {
        return categorySum;
    }

    public void setCategorySum(Integer categorySum) {
        this.categorySum = categorySum;
    }

    public String getCategoryDetail() {
        return categoryDetail;
    }

    public void setCategoryDetail(String categoryDetail) {
        this.categoryDetail = categoryDetail;
    }

}
