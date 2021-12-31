/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 22:21:41
 */

module.exports = (sequelize, Sequelize) => {

    try {
        const Present = sequelize.define("present", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            ten: {
                type: Sequelize.STRING,
            },
            ngay_batdau: {
                type: Sequelize.DATE(6),
            },
            ngay_ketthuc: {
                type: Sequelize.DATE(6),
            },
            so_luong: {
                type: Sequelize.INTEGER
            },
            so_tien:{
                type:Sequelize.INTEGER
            },
            loai:{
                type:Sequelize.STRING
            }
        });
        return Present;
    } catch (error) {
        console.log(error);
    }

};
