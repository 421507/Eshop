/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-02 15:29:20
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 17:16:43
 */
const db = require("../../models/index");
const Phuongthucthanhtoan = db.phuongthucthanhtoan;
const Op = require("sequelize");

exports.getAll = async (props) => {

    const condition = {};

    if (props.id !== undefined)
        condition.id = props.id;
    if (props.ten !== undefined)
        condition.ten = props.ten;
    if (props.slug !== undefined)
        condition.slug = props.slug;

    try {
        const result = await Phuongthucthanhtoan.findAll({ where: condition });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getByPk=async pk=>{

    try {
        return await Phuongthucthanhtoan.findByPk(pk);
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.update=async props=>{

    const condition={};
    condition.id=props.id;

    const field={};
    if (props.ten !== undefined)
        field.ten = props.ten;
    if (props.slug !== undefined)
        field.slug = props.slug;

    try {
        return await Phuongthucthanhtoan.update(field,{where:condition});
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.create=async props=>{

    const field={};
    if (props.ten !== undefined)
        field.ten = props.ten;
    if (props.slug !== undefined)
        field.slug = props.slug;

    try {
        return await Phuongthucthanhtoan.create(field);
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.remove=async props=>{

    const condition={};
    condition.id=props.id;

    try {
        return await Phuongthucthanhtoan.destroy({where:condition});
    } catch (error) {
        console.log(error);
        return null;
    }
}