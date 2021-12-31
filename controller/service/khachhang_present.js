/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-31 14:47:20
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 22:22:59
 */
const db = require("../../models/index");
const KhachhangPresent=db.khachhang_present;

const getAll=async props=>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;
    if(props.id_khachhang !== undefined)
        condition.id_khachhang=props.id_khachhang;
    if(props.id_present !== undefined)
        condition.id_present=props.id_present;
    if(props.trang_thai !== undefined)
        condition.trang_thai=props.trang_thai;
    if(props.slug_trangthai !== undefined)
        condition.slug_trangthai=props.slug_trangthai;
    if(props.loai !== undefined)
        condition.loai=props.loai;

    try {
        const result=await KhachhangPresent.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const update=async props=>{

    const condition={};
    condition.id=props.id;

    const field={}

    if(props.id_khachhang !== undefined)
        field.id_khachhang=props.id_khachhang;
    if(props.id_present !== undefined)
        field.id_present=props.id_present;
    if(props.trang_thai !== undefined)
        field.trang_thai=props.trang_thai;
    if(props.slug_trangthai !== undefined)
        field.slug_trangthai=props.slug_trangthai;
    if(props.loai !== undefined)
        field.loai=props.loai;

    try {
        const result=await KhachhangPresent.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}


module.exports={getAll,update}