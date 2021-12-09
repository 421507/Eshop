/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 22:28:11
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 15:13:05
 */
 module.exports = (sequelize,Sequelize) => {
    try {
      const Diachi = sequelize.define("diachi", {
      
        id_diachi: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        so_nha: {
          type: Sequelize.STRING,
        },
        ten_duong: {
          type: Sequelize.STRING,
        },
        phuong: {
          type: Sequelize.STRING,
        },
        quan: {
          type: Sequelize.STRING,
        },
        thanh_pho: {
          type: Sequelize.STRING,
        },
        tinh:{
          type:Sequelize.STRING
        }
      });
    
      return Diachi;
    } catch (error) {
      
    }
  };