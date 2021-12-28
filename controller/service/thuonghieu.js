/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 15:51:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-29 00:06:38
 */
const db = require("../../models/index");
const Thuonghieu = db.thuonghieu;
const Op = require("sequelize");

const getAll= async (props)=>{

    const condition={};

    if(props.id_thuonghieu !== undefined)
        condition.id_thuonghieu=props.id_thuonghieu;
    if(props.ten_thuonghieu !== undefined)
        condition.ten_thuonghieu=props.ten_thuonghieu;
    if(props.so_sanpham !== undefined)
        condition.so_sanpham=so_sanpham;
    
    try {
        
        const data=await Thuonghieu.findAll({where:condition});

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports={getAll};