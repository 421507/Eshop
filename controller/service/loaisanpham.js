/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-15 15:51:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-15 16:43:39
 */
const db = require("../../models/index");
const Loaisanpham = db.loaisanpham;
const Op = require("sequelize");

const getAll = async () => {

    try {

        const data = await Loaisanpham.findAll();

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports = { getAll };