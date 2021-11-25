/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:18:17
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-11-24 13:22:37
 */
const dbConfig = require("../config/db.config.js");

const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
});

module.exports = sequelize;