/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 18:37:38
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Theodoi = sequelize.define("theodoi", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING,
            },
            id_sanpham: {
                type: Sequelize.INTEGER,
            },
            solanxem: {
                type: Sequelize.INTEGER,
            },
        });
        return Theodoi;
    } catch (error) {
        console.log(error);
    }


};
