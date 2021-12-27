/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 12:28:36
 */

module.exports = (sequelize,Sequelize) => {
  
  try {
    const Sanpham = sequelize.define("sanpham", {
      id_sanpham: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      ten_sanpham: {
        type: Sequelize.STRING,
      },
      gia_sanpham: {
        type: Sequelize.DOUBLE,
      },
      mieuta: {
        type: Sequelize.STRING,
      },
      soluong_tonkho: {
        type: Sequelize.INTEGER,
      },
      soluong_daban: {
        type: Sequelize.INTEGER,
      },
      ngay_list: {
        type: Sequelize.DATE(6),
      },
      mau_sac: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      id_thuonghieu: {
        type: Sequelize.INTEGER,
      },
      thumbnail:{
        type: Sequelize.STRING
      }
    });
    return Sanpham;
  } catch (error) {
    console.log(error);
  }

  
};
