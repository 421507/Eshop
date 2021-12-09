/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-25 22:23:01
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-01 15:28:05
 */


module.exports=(sequelize,Sequelize) => {

    try {
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
            tongtien:{
                type:Sequelize.DOUBLE
            },
            so_luong:{
                type:Sequelize.INTEGER
            },
            ngay_dat:{
                type:Sequelize.DATE(6)
            }
        });
    
        return Giohang;
    } catch (error) {
        
    }
};