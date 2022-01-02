/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 22:56:00
 */

module.exports = (sequelize, Sequelize) => {

    try {
        const Sanphamgiamgia = sequelize.define("sanphamgiamgia", {
            id_sanpham_giamgia: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            id_sanpham: {
                type: Sequelize.INTEGER,
            },
            gia_giam: {
                type: Sequelize.INTEGER,
            },
            ngay_batdau: {
                type: Sequelize.DATE(6)
            },
            ngay_ketthuc: {
                type: Sequelize.DATE(6)
            },
            gia_saukhigiam: {
                type: Sequelize.DOUBLE
            },

        });
        return Sanphamgiamgia;
    } catch (error) {
        console.log(error);
    }
};
