/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 22:28:11
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 13:12:14
 */
module.exports = (sequelize, Sequelize) => {
    try {
        const UserNotActive = sequelize.define("usernotactive", {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
        });

        return UserNotActive;
    } catch (error) {

    }
};