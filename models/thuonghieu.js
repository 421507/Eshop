/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 15:50:29
 */

module.exports = (sequelize, Sequelize) => {

    try {
        const Thuonghieu = sequelize.define("thuonghieu", {
            id_thuonghieu: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            ten_thuonghieu: {
                type: Sequelize.STRING,
            },
            so_sanpham: {
                type: Sequelize.INTEGER,
            },
        });
        return Thuonghieu;
    } catch (error) {
        console.log(error);
    }


};
