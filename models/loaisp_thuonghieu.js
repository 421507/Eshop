/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 17:45:23
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Loaisp_thuonghieu = sequelize.define("loaisp_thuonghieu", {
            id_loaisp_th: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            id_loaisp: {
                type: Sequelize.STRING,
            },
            id_thuonghieu:{
                type:Sequelize.STRING
            },
            ten_thuonghieu:{
                type:Sequelize.STRING
            }
        });
        return Loaisp_thuonghieu;
    } catch (error) {
        console.log(error);
    }


};
