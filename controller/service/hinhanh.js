/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-01 17:17:23
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 17:19:27
 */
const db = require("../../models/index");
const Hinhanh=db.hinhanh;
const Op=require('sequelize');

const getAllByProduct=(idSanpham) => {
    
    return new Promise((resolve,reject)=>{
        
        const condition={
            id_sanpham:idSanpham
        };
        
        Hinhanh.findAll({
            where:condition,
            attributes:['url']
        })
        .then(lst=>{
        
            resolve ({
                errorCode:0,
                message:"Success",
                url:lst
            });
    
        })
        .catch(err=>{
            console.log("Error retrieve image");
            console.log(err);
    
            reject ({
                errorCode:-1,
                message:
                    err.message || "Some error occurred while retrieving Hinh anh."
            });
        });
    });

}

module.exports={getAllByProduct};