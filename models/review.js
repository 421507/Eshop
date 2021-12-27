/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-27 23:21:46
 */

 module.exports = (sequelize,Sequelize) => {
  
    try {
      const Review = sequelize.define("review", {
        idreview: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        created_at: {
            type: Sequelize.DATE(6),
        },
        id_sanpham:{
          type: Sequelize.INTEGER
        },
        description:{
          type:Sequelize.STRING
        }
      });
      return Review;
    } catch (error) {
      console.log(error);
    }
  
    
  };
  