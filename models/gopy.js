/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 22:28:11
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 08:46:54
 */
module.exports = (sequelize, Sequelize) => {
    try {
        const Gopy = sequelize.define("gop_y", {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            subject: {
                type: Sequelize.STRING,
            },
            message: {
                type: Sequelize.STRING,
            },
            create_at: {
                type: Sequelize.DATE(6),
            },
            reply: {
                type: Sequelize.BOOLEAN
            },
        });

        return Gopy;
    } catch (error) {

    }
};