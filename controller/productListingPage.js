/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-27 22:53:50
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-27 22:55:05
 */

const { getAll } = require('./service/sanpham');

exports.renderProductList = async (req, res) => {


    const page = req.query.page && parseInt(req.query.page) > -1 ? parseInt(req.query.page) : 0;
    const brand = req.query.brand && parseInt(req.query.brand) > 0 ? parseInt(req.query.brand) : null;
    const type = req.query.type && parseInt(req.query.type) > 0 ? parseInt(req.query.type) : null;
    const props = {};
    props.page = page;
    props.size = 12;
    if (brand !== null)
        props.brand = brand;
    if (type !== null)
        props.type = type;

    const result = await getAll(props);
    const products = result.sanpham.map(item => {

        return {
            gia_sanpham: item.gia_sanpham,
            ten_sanpham: item.ten_sanpham,
            url_product: `/product-details?id=${item.id_sanpham}`,
            url: item.thumbnail
        }
    });

    res.render(
        'products',
        {
            data: products,
            pages: result.pages,
            needArrow: result.needArrow,
            arrowUrl: result.arrowUrl
        }
    );
};