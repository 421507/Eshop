/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-02 22:56:14
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 22:59:50
 */
const db = require("../../models/index");
const Sanphamgiamgia = db.sanphamgiamgia;

exports.getAll=async (props) =>{

    const condition={};

    if(props.id_sanpham_giamgia !== undefined)
        condition.id_sanpham_giamgia=props.id_sanpham_giamgia;
    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;
    if(props.gia_giam !== undefined)
        condition.gia_giam=props.gia_giam;
    if(props.ngay_batdau !== undefined)
        condition.ngay_batdau=props.ngay_batdau;
    if(props.ngay_ketthuc !== undefined)
        condition.ngay_ketthuc=props.ngay_ketthuc;
    if(props.gia_saukhigiam !== undefined)
        condition.gia_saukhigiam=props.gia_saukhigiam;

    try {
        const result=await Sanphamgiamgia.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}