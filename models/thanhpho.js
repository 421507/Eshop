/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-03 15:08:19
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
            },
            slug:{
                type:Sequelize.STRING
            },
        });
        return Thanhpho;
    } catch (error) {
        console.log(error);
    }


};
