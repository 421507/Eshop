/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-03 01:33:03
 */


 module.exports = (sequelize,Sequelize) => {
    try {
      const KhachhangPresent = sequelize.define("khachhang_present", {
      
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        id_khachhang: {
          type: Sequelize.INTEGER,
        },
        id_present: {
          type: Sequelize.INTEGER,
        },
        trang_thai: {
          type: Sequelize.STRING,
        },
        slug_trangthai: {
          type: Sequelize.STRING,
        },
        loai:{
          type:Sequelize.STRING
        },
        id_giohang:{
          type:Sequelize.INTEGER
        }
      });
    
      return KhachhangPresent;
    } catch (error) {
      
    }
  };
  