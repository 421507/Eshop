/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-31 23:30:40
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 23:32:58
 */
const db = require("../../models/index");
const Voucher = db.voucher;

exports.getAll=async props=>{

    const condition={};

    if(props.id !== undefined){
        condition.id=props.id;
    }
    if(props.id_sanpham !== undefined){
        condition.id_sanpham=props.id_sanpham;
    }
    if(props.so_luong !== undefined){
        condition.so_luong=props.so_luong;
    }
    if(props.id_present !== undefined){
        condition.id_present=props.id_present;
    }

    try {
        const result=await Voucher.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}