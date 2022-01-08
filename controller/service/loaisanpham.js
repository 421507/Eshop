/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 15:51:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 09:51:11
 */
const db = require("../../models/index");
const Loaisanpham = db.loaisanpham;
const Op = require("sequelize");
const {
    setFkNull:productSetFkNull
}=require('./sanpham');

const getAll = async () => {

    try {

        const data = await Loaisanpham.findAll();

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}

const remove=async props=>{

    const condition={};

    if(props.id_loaisp !== undefined)
        condition.id_loaisp=props.id_loaisp;
    
    try {
        let result;
        if(props.id_loaisp !== undefined){
            result =await productSetFkNull({id_loaisp:props.id_loaisp});
            
            const{
                remove:typeProdBrandRemove
            }=require('./loaisp_thuonghieu');
            result = await typeProdBrandRemove({id_loaisp:props.id_loaisp});
            
        }
        result=Loaisanpham.destroy({where:condition});

        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

const create=async props=>{

    const field={};

    if(props.ten_loaisp !== undefined)
        field.ten_loaisp=props.ten_loaisp;
    
    try {
        const result=await Loaisanpham.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getByPk=async pk=>{
    try {
        return await Loaisanpham.findByPk(pk);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const update=async props=>{

    const condition={};

    if(props.id_loaisp !== undefined)
        condition.id_loaisp=props.id_loaisp;
    const field={};
    if(props.ten_loaisp !== undefined)
        field.ten_loaisp=props.ten_loaisp;
    
    try {
        const result=await Loaisanpham.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAll,remove,create,getByPk ,update};