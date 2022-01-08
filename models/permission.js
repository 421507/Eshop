/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 21:09:43
 */


module.exports = (sequelize, Sequelize) => {
    try {
        const Permission = sequelize.define("permission", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            slug: {
                type: Sequelize.INTEGER,
            },
        });

        return Permission;
    } catch (error) {

    }
};
