/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-16 18:03:48
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-01 16:28:18
 */
const db = require("../../models/index");
const Giohangchitiet=db.giohangchitiet;

const getAll=async (props)=>{
    
    const condition={};

    if(props.id_giohang !== undefined)
        condition.id_giohang=props.id_giohang;
    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;
    if(props.gia !== undefined)
        condition.gia=props.gia;
    if(props.soluong !== undefined)
        condition.soluong=props.soluong;
    if(props.id_giohangchitiet !== undefined)
        condition.id_giohangchitiet=props.id_giohangchitiet;

    try {
        const result=await Giohangchitiet.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const create=async (props)=>{

    const field={};

    if(props.id_giohang)
        field.id_giohang=props.id_giohang;
    if(props.id_sanpham)
        field.id_sanpham=props.id_sanpham;
    if(props.gia)
        field.gia=props.gia;
    if(props.soluong)
        field.soluong=props.soluong;

    try {
        const result=await Giohangchitiet.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const multicreate=async (props)=>{

    try {
        const result=await Giohangchitiet.bulkCreate(props,{returning:true});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const update=async (props)=>{

    const condition={};
    condition.id_giohangchitiet=props.id_giohangchitiet;

    const field={};

    if(props.soluong)
        field.soluong=props.soluong;
    if(props.gia)
        field.gia=props.gia

    try {
        const result=await Giohangchitiet.update(field,{where:condition,returning:true});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const remove=async (props)=>{
    
    const condition={};

    if(props.id_giohang !== undefined)
        condition.id_giohang=props.id_giohang;
    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;
    if(props.gia !== undefined)
        condition.gia=props.gia;
    if(props.soluong !== undefined)
        condition.soluong=props.soluong;
    if(props.id_giohangchitiet !== undefined)
        condition.id_giohangchitiet=props.id_giohangchitiet;

    try {
        const result=await Giohangchitiet.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports={getAll,create,update,remove,multicreate};