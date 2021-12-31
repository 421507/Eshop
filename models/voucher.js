/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 23:30:00
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Voucher = sequelize.define("voucher", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            id_sanpham: {
                type: Sequelize.INTEGER,
            },
            so_luong: {
                type: Sequelize.INTEGER,
            },
            id_present: {
                type: Sequelize.INTEGER,
            },
        });
        return Voucher;
    } catch (error) {
        console.log(error);
    }


};
