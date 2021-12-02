/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:18:17
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 15:41:34
 */
const dbConfig = require("../config/db.config.js");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    underscored: false,
    freezeTableName: true,
    charset: "utf8mb4",
    dialectOptions: {
      collate: "utf8mb4_0900_ai_ci",
    },
    timestamps: false,
  },
});

const db={};

db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.sanpham=require('./sanpham')(sequelize,Sequelize);
db.hinhanh=require('./hinhanh')(sequelize,Sequelize);
db.khachhang=require('./khachhang')(sequelize,Sequelize);
db.giohang=require('./giohang')(sequelize,Sequelize);
db.giohangchitiet=require('./giohangchitiet')(sequelize,Sequelize);

module.exports = db;
