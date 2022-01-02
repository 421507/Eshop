/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:18:17
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 15:29:11
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
db.user=require('./user')(sequelize,Sequelize);
db.diachi=require('./diachi')(sequelize,Sequelize);
db.thuonghieu=require('./thuonghieu')(sequelize,Sequelize);
db.loaisanpham=require('./loaisanpham')(sequelize,Sequelize);
db.loaisp_thuonghieu=require('./loaisp_thuonghieu')(sequelize,Sequelize);
db.loaispchitiet=require('./loaispchitiet')(sequelize,Sequelize);
db.review=require('./review')(sequelize,Sequelize);
db.shipping=require('./shipping')(sequelize,Sequelize);
db.thanhpho=require('./thanhpho')(sequelize,Sequelize);
db.trangthaigiaohang=require('./trangthaigiaohang')(sequelize,Sequelize);
db.khachhang_present=require('./khachhang_present')(sequelize,Sequelize);
db.present=require('./present')(sequelize,Sequelize);
db.voucher=require('./voucher')(sequelize,Sequelize);
db.trangthaithanhtoan=require('./trangthaithanhtoan')(sequelize,Sequelize);
db.phuongthucthanhtoan=require('./phuongthucthanhtoan')(sequelize,Sequelize);


module.exports = db;
