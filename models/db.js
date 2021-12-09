/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:04:10
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-01 15:04:56
 */
const sequelize=require('./index');
const Sequelize=require('sequelize');

const db={};

db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.sanpham=require('./sanpham')(sequelize,Sequelize);
db.hinhanh=require('./hinhanh')(sequelize,Sequelize);
db.khachhang=require('./khachhang')(sequelize,Sequelize);
db.giohang=require('./giohang')(sequelize,Sequelize);
db.giohangchitiet=require('./giohangchitiet')(sequelize,Sequelize);
module.exports=db;