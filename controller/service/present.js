/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-31 15:03:54
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 22:24:06
 */
const db = require("../../models/index");
const Present = db.present;

const getAll=async props =>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;
    if(props.ten !== undefined)
        condition.ten=props.ten;
    if(props.ngay_batdau !== undefined)
        condition.ngay_batdau=props.ngay_batdau;
    if(props.ngay_ketthuc !== undefined)
        condition.ngay_ketthuc=props.ngay_ketthuc;
    if(props.so_luong !== undefined)
        condition.so_luong=props.so_luong;
    if(props.so_tien !== undefined)
        condition.so_tien=props.so_tien;
    if(props.loai !== undefined)
        condition.loai=props.loai;
    
    try {
        const result=await Present.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const update=async props =>{

    const condition={};
    condition.id=props.id;

    const field={};

    if(props.ten !== undefined)
        field.ten=props.ten;
    if(props.ngay_batdau !== undefined)
        field.ngay_batdau=props.ngay_batdau;
    if(props.ngay_ketthuc !== undefined)
        field.ngay_ketthuc=props.ngay_ketthuc;
    if(props.so_luong !== undefined)
        field.so_luong=props.so_luong;
    if(props.so_tien !== undefined)
        field.so_tien=props.so_tien;
    if(props.loai !== undefined)
        field.loai=props.loai;
    
    
    try {
        const result=await Present.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports={getAll,update};