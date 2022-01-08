/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-27 22:53:50
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 19:22:30
 */

const { getAll } = require('./service/sanpham');
const { getAll: brandgetAll } = require('./service/thuonghieu');
const { getAll: typeGetAll } = require('./service/loaisanpham');
const { getAll: typeBrandGetAll } = require('./service/loaisp_thuonghieu');
const {isAuth}=require('./service/auth');
exports.renderProductList = async (req, res) => {

    const page = req.query.page && parseInt(req.query.page) > -1 ? parseInt(req.query.page) : 0;
    const brand = req.query.brand && parseInt(req.query.brand) > 0 ? parseInt(req.query.brand) : null;
    const type = req.query.type && parseInt(req.query.type) > 0 ? parseInt(req.query.type) : null;
    const min = req.query.min && parseInt(req.query.min) > 0 ? parseInt(req.query.min) : null;
    const max = req.query.max && parseInt(req.query.max) > 0 ? parseInt(req.query.max) : null;
    const description=req.query.description !== undefined && req.query.description !== null ? req.query.description : null;
    
    const props = {};
    props.page = page;
    props.size = 12;
    if (brand !== null)
        props.brand = brand;
    if (type !== null)
        props.type = type;
    if (min !== null) {
        props.min = min;
    }
    if (max !== null) {
        props.max = max;
    }
    if(description !== null){
        props.description=description
    }

    const result = await getAll(props);
    const products = result.sanpham.map(item => {

        return {
            gia_sanpham: item.gia_sanpham,
            ten_sanpham: item.ten_sanpham,
            url_product: `/product-details?id=${item.id_sanpham}`,
            url: item.thumbnail
        }
    });

    const brands = await brandgetAll({});

    brands.forEach((item, index) => {

        brands[index].url = `/products?brand=${item.id_thuonghieu}`;
    });

    const types = await typeGetAll();

    const typeBrand = await typeBrandGetAll({});

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

    res.render(
        'products',
        {
            data: products,
            pages: result.pages,
            needArrow: result.needArrow,
            arrowUrl: result.arrowUrl,
            brands:brands,
            types:types,
            auth:auth
        }
    );
};