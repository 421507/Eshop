/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-30 21:13:57
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 00:36:07
 */
const db = require("../../models/index");
const Trangthaigiaohang = db.trangthaigiaohang;
const Op = require("sequelize");

exports.getAll = async (props) => {

    const condition = {};

    if (props.id !== undefined)
        condition.id = props.id;
    if (props.ten_trangthai !== undefined)
        condition.ten_trangthai = props.ten_trangthai;
    if (props.slug !== undefined)
        condition.slug = props.slug;

    try {
        const result = await Trangthaigiaohang.findAll({ where: condition });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}