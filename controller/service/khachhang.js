/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-16 17:16:59
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-03 00:13:58
 */
const db = require("../../models/index");
const Khachhang=db.khachhang;

const create=async (props)=>{

    const field={};

    field.uuid=props.uuid;

    if(props.ten !== undefined)
        field.ten=props.ten;
    if(props.phone !== undefined)
        field.phone=props.phone;
    if(props.email !== undefined)
        field.email=props.email;
    if(props.id_user !== undefined)
        field.id_user=props.id_user;
    
    try {
        const result=await Khachhang.create(field);
        return result;
    } catch (error) {   
        console.log(error);
        return null;
    }
}

const getAll=async (props)=>{

    const condition={};

    if(props.uuid !== undefined)
        condition.uuid=props.uuid;
    if(props.ten !== undefined)
        condition.ten=props.ten;
    if(props.phone !== undefined)
        condition.phone=props.phone;
    if(props.email !== undefined)
        condition.email=props.email;
    if(props.id_user !== undefined)
        condition.id_user=props.id_user;
    
    try {
        const result = await Khachhang.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const update=async (props)=>{

    const condition={
        id_khachhang:props.id_khachhang
    }

    const field={};

    if(props.uuid !== undefined)
        field.uuid=props.uuid;
    if(props.ten !== undefined) 
        field.ten=props.ten;
    if(props.phone !== undefined)
        field.phone=props.phone;
    if(props.email !== undefined)
        field.email=props.email;
    if(props.id_user !== undefined)
        field.id_user=props.id_user;
    
    try {
        const result = await Khachhang.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports={create,getAll,update}