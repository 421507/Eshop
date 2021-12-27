/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-25 22:23:01
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-16 22:36:41
 */


module.exports=(sequelize,Sequelize) => {

    try {
        console.log("cccccccccccccccccc");
        const Giohang=sequelize.define("giohang",{

            id_giohang:{
                type:Sequelize.INTEGER,
                primaryKey: true
            },
            id_khachhang:{
                type:Sequelize.INTEGER,
            },
            id_diachi:{
                type:Sequelize.INTEGER,
            },
            tong_tien:{
                type:Sequelize.DOUBLE
            },
            so_luong:{
                type:Sequelize.INTEGER
            },
            ngay_dat:{
                type:Sequelize.DATE
            },
            check_out:{
                type:Sequelize.BOOLEAN
            }
        });
    
        return Giohang;
    } catch (error) {
        
    }
};