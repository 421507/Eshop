/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 15:51:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 11:05:09
 */
const db = require("../../models/index");
const Loaisp_thuonghieu = db.loaisp_thuonghieu;
const Op = require("sequelize");

const getAll = async (props) => {

    const condition={};
    if(props.id_thuonghieu !== undefined)
        condition.id_thuonghieu=props.id_thuonghieu;
    if(props.id_loaisp !== undefined)
        condition.id_loaisp=props.id_loaisp;
        
    try {
        const data = await Loaisp_thuonghieu.findAll({where:condition});

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}

const remove=async props=>{

    const condition={}
    if(props.id_thuonghieu !== undefined)
        condition.id_thuonghieu=props.id_thuonghieu;
    if(props.id_loaisp !== undefined)
        condition.id_loaisp=props.id_loaisp;
    if(props.id_loaisp_th !== undefined)
        condition.id_loaisp_th=props.id_loaisp_th;
    
    try {
        const result=await Loaisp_thuonghieu.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const update=async props=>{

    const condition={};
    if(props.id_loaisp_th !== undefined)
        condition.id_loaisp_th=props.id_loaisp_th;

    const field={}
    if(props.id_thuonghieu !== undefined){
        field.id_thuonghieu=props.id_thuonghieu;
        const {getByPk:brandGetByPk}=require('./thuonghieu');

        const brand=await brandGetByPk(props.id_thuonghieu);
        field.ten_thuonghieu=brand.ten_thuonghieu;
    }
    if(props.id_loaisp !== undefined)
        field.id_loaisp=props.id_loaisp;
    
    try {
        const result=await Loaisp_thuonghieu.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const create=async props=>{

    const field={}
    if(props.id_thuonghieu !== undefined){
        field.id_thuonghieu=props.id_thuonghieu;
        const {getByPk:brandGetByPk}=require('./thuonghieu');

        const brand=await brandGetByPk(props.id_thuonghieu);
        field.ten_thuonghieu=brand.ten_thuonghieu;
    }
    if(props.id_loaisp !== undefined)
        field.id_loaisp=props.id_loaisp;
    
    try {
        const result=await Loaisp_thuonghieu.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getByPk=async pk=>{
    try {
        return await Loaisp_thuonghieu.findByPk(pk);
    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = { getAll,remove,getByPk,update,create };