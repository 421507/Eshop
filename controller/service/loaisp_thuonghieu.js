/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 15:51:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 17:23:41
 */
const db = require("../../models/index");
const Loaisp_thuonghieu = db.loaisp_thuonghieu;
const Op = require("sequelize");

const getAll = async () => {

    try {

        const data = await Loaisp_thuonghieu.findAll();

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports = { getAll };