/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-25 22:23:01
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 13:03:15
 */


module.exports = (sequelize, Sequelize) => {

    try {
        const Giohangchitiet = sequelize.define("giohangchitiet", {

            id_giohangchitiet: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            id_giohang: {
                type: Sequelize.INTEGER,
            },
            id_sanpham: {
                type: Sequelize.INTEGER,
            },
            gia: {
                type: Sequelize.DOUBLE
            },
            soluong: {
                type: Sequelize.INTEGER
            },
            ten_sanpham: {
                type: Sequelize.STRING
            },
            thumbnail: {
                type: Sequelize.STRING
            },
        });

        return Giohangchitiet;
    } catch (error) {

    }
};