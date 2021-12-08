/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 22:28:11
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 02:24:41
 */
module.exports = (sequelize,Sequelize) => {
    try {
      const User = sequelize.define("user", {
      
        id_user: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        cong_ty: {
          type: Sequelize.INTEGER,
        },
        admin:{
          type:Sequelize.BOOLEAN
        },
        ten:{
          type:Sequelize.STRING
        },
        id_diachi:{
          type: Sequelize.INTEGER
        },
        id_voucher:{
          type:Sequelize.INTEGER
        }
      });
    
      return User;
    } catch (error) {
      
    }
  };