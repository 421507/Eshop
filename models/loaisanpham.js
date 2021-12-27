/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 16:41:57
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Loaisanpham = sequelize.define("loaisanpham", {
            id_loaisp: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            ten_loaisp: {
                type: Sequelize.STRING,
            },
        });
        return Loaisanpham;
    } catch (error) {
        console.log(error);
    }


};
