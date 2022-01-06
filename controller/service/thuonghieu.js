/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 15:51:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 17:01:15
 */
const db = require("../../models/index");
const Thuonghieu = db.thuonghieu;
const Op = require("sequelize");
const {
    setFkNull:productSetFkNull
}=require('./sanpham');

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

const remove=async props=>{

    const condition={};

    if(props.id_thuonghieu !== undefined)
        condition.id_thuonghieu=props.id_thuonghieu;
    
    try {
        let result;
        if(props.id_thuonghieu !== undefined)
            result=await productSetFkNull({id_thuonghieu:props.id_thuonghieu});

        result=Thuonghieu.destroy({where:condition});

        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

const create=async props=>{

    const field={};

    if(props.ten_thuonghieu !== undefined)
        field.ten_thuonghieu=props.ten_thuonghieu;

    try {
        const result=await Thuonghieu.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports={getAll,remove,create};