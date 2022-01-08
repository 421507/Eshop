/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-30 21:13:57
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 17:34:16
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
    if(props.slug !== undefined)
        condition.slug=props.slug;
    
    try {
        const result=await Thanhpho.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getByPk=async pk=>{
    try {
        const result=await Thanhpho.findByPk(pk);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.create=async props=>{

    const field={};

    if(props.ten_thanhpho !== undefined)
        field.ten_thanhpho=props.ten_thanhpho;
    if(props.zipcode !== undefined)
        field.zipcode=props.zipcode;
    if(props.gia_ship !== undefined)
        field.gia_ship=props.gia_ship;
    if(props.slug !== undefined)
        field.slug=props.slug;

    try {
        return await Thanhpho.create(field);
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.update=async props=>{
    const condition={};

    condition.id=props.id;

    const field={};

    if(props.ten_thanhpho !== undefined)
        field.ten_thanhpho=props.ten_thanhpho;
    if(props.zipcode !== undefined)
        field.zipcode=props.zipcode;
    if(props.gia_ship !== undefined)
        field.gia_ship=props.gia_ship;
    if(props.slug !== undefined)
        field.slug=props.slug;

    try {
        return await Thanhpho.update(field,{where:condition});
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.remove=async props=>{

    const condition={};
    condition.id=props.id;

    try {
        return await Thanhpho.destroy({where:condition});
    } catch (error) {
        console.log(error);
        return null;
    }
}