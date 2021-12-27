/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 19:01:27
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Loaispchitiet = sequelize.define("loaispchitiet", {
            id_loaispchitiet: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            id_sanpham: {
                type: Sequelize.INTEGER,
            },
            id_loaisp:{
                type: Sequelize.INTEGER
            }
        });
        return Loaispchitiet;
    } catch (error) {
        console.log(error);
    }


};
