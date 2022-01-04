/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 19:02:21
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 15:41:58
 */
const db = require('../../models/index');
const Loaispchitiet=db.loaispchitiet;

const getAll=async props=>{

    const condition={};
    if(props.id_loaisp){

        condition.id_loaisp=props.id_loaisp;
    }

    try {
        const data= await Loaispchitiet.findAll({where:condition});
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const remove=async props=>{

    const condition={};

    condition.id_sanpham=props.id_sanpham;

    try {
        const result=await Loaispchitiet.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports={getAll,remove};