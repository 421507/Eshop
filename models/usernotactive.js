/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 22:28:11
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 21:02:39
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
        });

        return UserNotActive;
    } catch (error) {

    }
};