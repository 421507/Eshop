/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 19:02:21
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 19:18:18
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

module.exports={getAll};