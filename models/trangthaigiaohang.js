/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 00:35:55
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Trangthaigiaohang = sequelize.define("trangthaigiaohang", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            ten_trangthai: {
                type: Sequelize.STRING,
            },
            slug:{
                type: Sequelize.STRING,
            }
        });
        return Trangthaigiaohang;
    } catch (error) {
        console.log(error);
    }


};
