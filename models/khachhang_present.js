/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 22:21:55
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
        }
      });
    
      return KhachhangPresent;
    } catch (error) {
      
    }
  };
  