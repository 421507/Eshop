/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-30 21:13:57
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-30 21:19:58
 */
const db = require("../../models/index");
const Thanhpho = db.thanhpho;
const Op = require("sequelize");

exports.getAll=async (props)=>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;
    if(props.ten_thanhpho !== undefined)
        condition.ten_thanhpho=props.ten_thanhpho;
    if(props.zipcode !== undefined)
        condition.zipcode=props.zipcode;
    if(props.gia_ship !== undefined)
        condition.gia_ship=props.gia_ship;
    
    try {
        const result=await Thanhpho.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}