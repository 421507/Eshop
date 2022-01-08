/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 22:40:32
 */


module.exports = (sequelize, Sequelize) => {
    try {
        const Group = sequelize.define("group", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            slug: {
                type: Sequelize.STRING,
            },
        });

        return Group;
    } catch (error) {

    }
};
