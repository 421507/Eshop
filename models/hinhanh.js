/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 14:42:44
 */


 module.exports = (sequelize,Sequelize) => {
    try {
      const Hinhanh = sequelize.define("hinhanh", {
        id_hinhanh: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        url: {
          type: Sequelize.STRING,
        },
        id_sanpham: {
          type: Sequelize.INTEGER,
        }
      });
    
      return Hinhanh;
    } catch (error) {
      
    }
  };
  