/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-31 14:47:20
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 19:04:30
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
    if(props.id_giohang !== undefined)
        condition.id_giohang=props.id_giohang;

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
    if(props.id !== undefined)
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
    if(props.id_giohang !== undefined)
        field.id_giohang=props.id_giohang;

    try {
        const result=await KhachhangPresent.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const remove=async props=>{

    const condition={};
    if(props.id_present !== undefined)
        condition.id_present=props.id_present;
    if(props.id_khachhang !== undefined)
        condition.id_khachhang=props.id_khachhang;
    if(props.id !== undefined)
        condition.id=props.id;
    try {
        const result=await KhachhangPresent.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const increaseExpireDate=async props=>{

    const condition={};
    condition.slug_trangthai='outdated';
    condition.id_present=props.id_present;

    const field={};
    field.slug_trangthai='not used';
    field.trang_thai='Chưa sử dụng';

    try {
        const result=await KhachhangPresent.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const turnOff=async props=>{
    const condition={};

    if(props.id_present !== undefined)
        condition.id_present=props.id_present

    const field={};

    field.slug_trangthai='outdated';
    field.trang_thai='Không thể sử dụng';
    field.id_present=null;

    try {
        const result=await KhachhangPresent.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateUnexpireToExpire=async props=>{
    const condition={};

    if(props.id_present !== undefined)
        condition.id_present=props.id_present

    const field={};

    field.slug_trangthai='outdated';
    field.trang_thai='Không thể sử dụng';

    try {
        const result=await KhachhangPresent.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getValidPresents=async props=>{

    const id_khachhang=props.id_khachhang;

    const presents=await getAll({
        id_khachhang:id_khachhang,
        slug_trangthai:['pending','not_used']
    });

    if(presents.length > 0){

        const idPresents=presents.map(item=>item.id_present);

        const {
            getExpirePresent:presentGetExpirePresent
        }=require('./present');

        const expirePresents=await presentGetExpirePresent({
            idPresents:idPresents
        });

        if(expirePresents.length > 0){
            const result=await updateUnexpireToExpire({
                id_present:expirePresents
            });
        }

        const unexpirePresents=[];
        presents.forEach(element => {
            function check(id){
                for (let index = 0; index < expirePresents.length; index++) {
                    const element = expirePresents[index];
                    if(element === id)
                        return true;
                }
                return false;
            }

            if(!check(element.id_present)){
                unexpirePresents.push(element);
            }
        });

        return unexpirePresents;
    }

    return presents;
}

const create=async props=>{

    const field={};

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
    if(props.id_giohang !== undefined)
        field.id_giohang=props.id_giohang;

    try {
        const khpresent=await KhachhangPresent.create(field);

        const {
            addCustomerPresent:presentAddCustomerPresent
        }=require('./present');

        const result=await presentAddCustomerPresent({
            id_present:props.id_present
        });

        return khpresent;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const updateToNotUsed=async props=>{

    const condition={};

    if(props.id_giohang !== undefined)
        condition.id_giohang=props.id_giohang

    const field={};

    field.slug_trangthai='not_used';
    field.trang_thai='Chưa sử dụng';
    field.id_giohang=null;

    try {
        const result=await KhachhangPresent.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports={
    getAll,
    update,
    remove,
    increaseExpireDate,
    turnOff,
    getValidPresents,
    create,
    updateToNotUsed
}