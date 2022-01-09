/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-16 18:03:48
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 03:51:10
 */
const db = require("../../models/index");
const Giohangchitiet=db.giohangchitiet;
const {fn,literal, Op}=require('sequelize');

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
    if(props.thumbnail !== undefined)
        condition.thumbnail=props.thumbnail;
    if(props.ten_sanpham !== undefined)
        condition.ten_sanpham=props.ten_sanpham;

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
    if(props.ten_sanpham)
        field.ten_sanpham=props.ten_sanpham;
    if(props.thumbnail)
        field.thumbnail=props.thumbnail;

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
    if(props.id_giohangchitiet !== undefined)
        condition.id_giohangchitiet=props.id_giohangchitiet;
    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;
        
    const field={};

    if(props.soluong !== undefined)
        field.soluong=props.soluong;
    if(props.gia !== undefined)
        field.gia=props.gia;
    if(props.id_sanpham !== undefined)
        field.id_sanpham=null;

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
    if(props.ten_sanpham !== undefined)
        condition.ten_sanpham=props.ten_sanpham;
    if(props.thumbnail !== undefined)
        condition.thumbnail=props.thumbnail;

    try {
        const result=await Giohangchitiet.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getTopProducts=async ()=>{

    try {
        const result=await Giohangchitiet.findAll({
            attributes:['id_sanpham',[fn('COUNT','id_giohangchitiet'),'detailCartCount']],
            group:['id_sanpham'],
            order:[
                [literal('detailCartCount'),'DESC']
            ],
            limit:10,
            where:{
                id_sanpham:{
                    [Op.ne]:null
                }
            }
        });

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports={getAll,create,update,remove,multicreate,getTopProducts};