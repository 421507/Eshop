/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 18:38:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 03:39:47
 */
const db = require("../../models/index");
const Theodoi = db.theodoi;
const Op = require("sequelize");

exports.getAll=async props=>{

    const condition={};
    if(props.uuid !== undefined){
        condition.uuid=props.uuid
    }
    if(props.id_sanpham !== undefined){
        condition.id_sanpham=props.id_sanpham
    }

    try {
        return await Theodoi.findAll({where:condition});
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.update=async props=>{

    const condition={};
    condition.uuid=props.uuid;
    condition.id_sanpham=props.id_sanpham;

    const field={};
    field.solanxem=props.solanxem;

    try {
        return await Theodoi.update(field,{where:condition});

    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.increaseSoLanXem=async props=>{
    const uuid=props.uuid;
    const id_sanpham=props.id_sanpham;
    const solanxem=props.solanxem;

    const result=await this.update({
        uuid:uuid,
        id_sanpham:id_sanpham,
        solanxem:solanxem+1
    });

    return result;
}

exports.create=async props=>{
    const field={};
    field.uuid=props.uuid;
    field.id_sanpham=props.id_sanpham;
    field.solanxem=1;

    try {
        return await Theodoi.create(field);

    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.remove=async props=>{

    const condition={};
    condition.id_sanpham=props.id_sanpham;

    try {
        return await Theodoi.destroy({where:condition});

    } catch (error) {
        console.log(error);
        return null;
    }

}