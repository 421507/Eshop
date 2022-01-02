/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-16 17:05:18
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 15:32:51
 */
const db = require("../../models/index");
const Giohang=db.giohang;

const create=async (props)=>{

    const field={};

    field.id_khachhang=props.id_khachhang;

    if(props.id_diachi !== undefined)
        field.id_diachi=props.id_diachi;
    if(props.tongtien !== undefined)
        field.tongtien=props.tongtien;
    if(props.so_luong !== undefined)
        field.so_luong=props.so_luong;
    if(props.ngay_dat !== undefined)
        field.ngay_dat=props.ngay_dat;
    if(props.check_out !== undefined)
        field.check_out=props.check_out;
    if(props.phuongthuc_thanhtoan !== undefined)
        field.phuongthuc_thanhtoan=props.phuongthuc_thanhtoan;
    if(props.trangthai_thanhtoan !== undefined)
        field.trangthai_thanhtoan=props.trangthai_thanhtoan;
    
    try {
        const result=await Giohang.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const update=async (props)=>{

    const condition={};
    condition.id_giohang=props.id_giohang;

    const field={};

    if(props.id_khachhang !== undefined)
        field.id_khachhang=props.id_khachhang;

    if(props.id_diachi !== undefined)
        field.id_diachi=props.id_diachi;

    if(props.so_luong !== undefined)
        field.so_luong=props.so_luong;

    if(props.tong_tien !== undefined)
        field.tong_tien=props.tong_tien;

    if(props.ngay_dat !== undefined)
        field.ngay_dat=props.ngay_dat;
    
    if(props.check_out !== undefined)
        field.check_out=props.check_out;
        
    if(props.phuongthuc_thanhtoan !== undefined)
        field.phuongthuc_thanhtoan=props.phuongthuc_thanhtoan;
    
    if(props.trangthai_thanhtoan !== undefined)
        field.trangthai_thanhtoan=props.trangthai_thanhtoan;

    console.log(field);

    try {
        const result=await Giohang.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAll=async (props)=>{

    const condition={};

    if(props.id_khachhang !== undefined)
        condition.id_khachhang=props.id_khachhang;
    if(props.id_diachi !== undefined)
        condition.id_diachi=props.id_diachi;
    if(props.tong_tien !== undefined)
        condition.tong_tien=props.tong_tien;
    if(props.so_luong !== undefined)
        condition.so_luong=props.so_luong;
    if(props.ngay_dat !== undefined)
        condition.ngay_dat=props.ngay_dat;
    if(props.check_out !== undefined)
        condition.check_out=props.check_out;
    if(props.phuongthuc_thanhtoan !== undefined)
        condition.phuongthuc_thanhtoan=props.phuongthuc_thanhtoan;
    if(props.trangthai_thanhtoan !== undefined)
        condition.check_out=props.check_out;

    try {
        const result=Giohang.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getByPk=async (id)=>{

    try {
        const result=await Giohang.findByPk(id);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports={getAll,create,update,getByPk}