/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:06:41
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 17:39:59
 */

 module.exports = (sequelize, Sequelize) => {

    try {
        const Shipping = sequelize.define("shipping", {
            id_shipping: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            ten_shipper: {
                type: Sequelize.STRING,
            },
            trang_thai: {
                type: Sequelize.INTEGER,
            },
            ngay_nhan:{
                type: Sequelize.DATE(6)
            },
            ngay_ketthuc:{
                type:Sequelize.DATE(6)
            },
            gia:{
                type:Sequelize.DOUBLE
            },
            id_giohang:{
                type:Sequelize.INTEGER
            },
            mieu_ta:{
                type:Sequelize.STRING
            },
            id_diachi:{
                type:Sequelize.INTEGER
            },
            
        });
        return Shipping;
    } catch (error) {
        console.log(error);
    }


};
