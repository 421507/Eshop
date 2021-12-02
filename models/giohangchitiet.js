/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-25 22:23:01
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-01 15:27:54
 */

 
 module.exports=(sequelize,Sequelize) => {
 
     try {
        const Giohangchitiet=sequelize.define("giohangchitiet",{
 
            id_giohangchitiet:{
                type:Sequelize.INTEGER,
                primaryKey: true
            },
            id_giohang:{
                type:Sequelize.INTEGER,
            },
            id_sanpham:{
                type:Sequelize.INTEGER,
            },
            gia:{
                type:Sequelize.DOUBLE
            },
            soluong:{
                type:Sequelize.INTEGER
            }
        });
    
        return Giohangchitiet;
     } catch (error) {
         
     }
 };