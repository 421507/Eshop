/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-30 23:24:10
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Thanhpho = sequelize.define("thanhpho", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            ten_thanhpho: {
                type: Sequelize.STRING,
            },
            zipcode: {
                type: Sequelize.STRING,
            },
            gia_ship:{
                type:Sequelize.DOUBLE
            }
        });
        return Thanhpho;
    } catch (error) {
        console.log(error);
    }


};
