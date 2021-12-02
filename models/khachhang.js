/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-01 15:27:44
 */


 module.exports = (sequelize,Sequelize) => {
    try {
      const Khachhang = sequelize.define("khachhang", {
      
        id_khachhang: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        session_token: {
          type: Sequelize.STRING,
        },
        ten: {
          type: Sequelize.DOUBLE,
        },
        phone: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        id_user: {
          type: Sequelize.INTEGER,
        },
      });
    
      return Khachhang;
    } catch (error) {
      
    }
  };
  