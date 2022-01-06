/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 15:51:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 21:07:46
 */
const db = require("../../models/index");
const Shipping = db.shipping;
const Op = require("sequelize");

const getAll = async (props) => {

    const condition = {};

    if (props.id_shipping !== undefined)
        condition.id_shipping = props.id_shipping;
    if (props.ten_shipper !== undefined)
        condition.ten_shipper = props.ten_shipper;
    if (props.trang_thai !== undefined)
        condition.trang_thai = props.trang_thai;
    if(props.ngay_nhan !== undefined)
        condition.ngay_nhan=props.ngay_nhan;
    if(props.ngay_ketthuc !== undefined)
        condition.ngay_ketthuc=props.ngay_ketthuc;
    if(props.gia !== undefined)
        condition.gia=props.gia;
    if(props.id_giohang !== undefined)
        condition.id_giohang=props.id_giohang;
    if(props.mieu_ta !== undefined)
        condition.mieu_ta=props.mieu_ta;
    if(props.id_diachi !== undefined)
        condition.id_diachi=props.id_diachi;

    try {

        const data = await Shipping.findAll({ where: condition });

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}

const create=async (props)=>{

    const field={};

    if(props.ten_shipper !== undefined)
        field.ten_shipper=props.ten_shipper;
    if(props.trang_thai !== undefined)
        field.trang_thai=props.trang_thai;
    if(props.ngay_nhan !== undefined)
        field.ngay_nhan=props.ngay_nhan;
    if(props.ngay_ketthuc !== undefined)
        field.ngay_ketthuc=props.ngay_ketthuc;
    if(props.gia !== undefined)
        field.gia=props.gia;
    if(props.id_giohang !== undefined)
        field.id_giohang=props.id_giohang;
    if(props.mieu_ta !== undefined)
        field.mieu_ta=props.mieu_ta;
    if(props.id_diachi !== undefined)
        field.id_diachi=props.id_diachi;

    try {
        const result=await Shipping.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getByPk=async pk=>{

    try {
        const result=await Shipping.findByPk(pk);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const update=async props=>{

    const condition={};

    if(props.id_shipping !== undefined){
        condition.id_shipping=props.id_shipping;
    }

    const field={};

    if(props.ten_shipper !== undefined)
        field.ten_shipper=props.ten_shipper;
    if(props.trang_thai !== undefined)
        field.trang_thai=props.trang_thai;
    if(props.ngay_ketthuc !== undefined)
        field.ngay_ketthuc=props.ngay_ketthuc;
    if(props.gia_ship !== undefined)
        field.gia_ship=props.gia_ship;
    if(props.mieu_ta !== undefined)
        field.mieu_ta=props.mieu_ta;

    try {
        const result=await Shipping.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAll,create,getByPk,update };