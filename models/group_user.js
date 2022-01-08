/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 21:27:00
 */


 module.exports = (sequelize, Sequelize) => {
    try {
        const Group_User = sequelize.define("group_user", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            group_id: {
                type: Sequelize.INTEGER,
            },
        });

        return Group_User;
    } catch (error) {

    }
};
