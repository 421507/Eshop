/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-03 21:22:18
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-03 21:24:47
 */
const { getAll: brandgetAll } = require('./service/thuonghieu');
const { getAll: typeGetAll } = require('./service/loaisanpham');
const { getAll: typeBrandGetAll } = require('./service/loaisp_thuonghieu');
const { isAuth } = require('./service/auth');
exports.renderBlogPage = async (req, res) => {

    const brands = await brandgetAll({});

    brands.forEach((item, index) => {

        brands[index].url = `/products?brand=${item.id_thuonghieu}`;
    });

    const types = await typeGetAll();

    const typeBrand = await typeBrandGetAll();

    types.forEach((item, index) => {

        types[index].url = `/products?type=${item.id_loaisp}`;

        const lstTmp = [];
        typeBrand.forEach(it => {

            if (it.id_loaisp === item.id_loaisp) {

                lstTmp.push({
                    link: `/products?type=${item.id_loaisp}&brand=${it.id_thuonghieu}`,
                    ten_thuonghieu: it.ten_thuonghieu
                });
            }
        });
        types[index].isSubUrl = false;
        if (lstTmp.length > 0) {
            types[index].url = `#${item.ten_loaisp}`
            types[index].isSubUrl = true;
            types[index].suburl = lstTmp;
        }

    });

    const auth=await isAuth(req);

    return res.render('blog',{
        brands:brands,
        types:types,
        auth:auth
    });
}