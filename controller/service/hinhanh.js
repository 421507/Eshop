/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-01 17:17:23
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 05:57:18
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

const getAll=async props=>{

    const condition={};

    if(props.id_sanpham !== undefined){
        condition.id_sanpham=props.id_sanpham
    }
    try {
        const result=await Hinhanh.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const remove=async props=>{

    const condition={};

    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;
    
    try {
        const result=await Hinhanh.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const multiCreate=async props=>{

    try {
        const result=await Hinhanh.bulkCreate(props);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports={getAllByProduct,remove,getAll,multiCreate};