/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 15:27:59
 */

module.exports = (sequelize, Sequelize) => {

    try {
        const Trangthaithanhtoan = sequelize.define("trangthaithanhtoan", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            ten: {
                type: Sequelize.STRING,
            },
            slug:{
                type: Sequelize.STRING,
            }
        });
        return Trangthaithanhtoan;
    } catch (error) {
        console.log(error);
    }
};
