/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 15:13:36
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 15:16:48
 */
const db = require('../../models/index');
const Diachi=db.diachi;

exports.getByPk=async (pk) =>{


    try {
        const data=await Diachi.findByPk(pk);

        return data;
    } catch (error) {

        console.log(error);
        return null;
        
    }
}