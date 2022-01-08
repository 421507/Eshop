/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 22:07:29
 */


module.exports = (sequelize, Sequelize) => {
    try {
        const Group_Permissions = sequelize.define("group_permissions", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            group_id: {
                type: Sequelize.INTEGER,
            },
            permission_id: {
                type: Sequelize.INTEGER,
            },
        });

        return Group_Permissions;
    } catch (error) {

    }
};
