/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-20 23:41:13
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 15:34:04
 */

// const {remove:detailCartRemove,update:detailCartUpdate}=require('./service/giohangchitiet');
// const {update:cartUpdate,getAll: cartGetAll}=require('./service/giohang');
// const { getAll: customerGetAll } = require('./service/khachhang');
const { getByPk } = require('./service/sanpham');
const { getAllByProduct } = require('./service/hinhanh');
const { getAll: brandGetAll } = require('./service/thuonghieu');
const { getAll: typeGetAll } = require('./service/loaisanpham');
const { getAll: typeBrandGetAll } = require('./service/loaisp_thuonghieu');
const { getAll: reviewGetAll, create: reviewCreate, getByPk: reviewGetByPk } = require('./service/review');
const {
    getAll: discountProductGetAll,
} = require('./service/sanphamgiamgia');
const{
    isAuth
}=require('./service/auth');

exports.renderProductDetail = async (req, res) => {

    if (!req.query.id) {
        return res.redirect('/');
    }
    const auth=await isAuth(req);
    

    if(parseInt(req.query.id) === -1){
        return res.render('product-details',{
            empty:true,
            auth:auth
        });
    }

    let result = null;

    try {
        result = await getByPk(parseInt(req.query.id));
        
        if(result === null){
            return res.render('product-details',{
                empty:true,
                auth:auth
            });
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }

    const data = {};
    let resu = null;
    try {
        resu = await getAllByProduct(result.id_sanpham)

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }

    let discountProduct = await discountProductGetAll({ id_sanpham: req.query.id });

    if (discountProduct === null) {
        return res.redirect('/');
    }
    else if (discountProduct.length > 0) {

        const start = new Date(discountProduct[0].ngay_batdau);
        const end = new Date(discountProduct[0].ngay_ketthuc);
        const now = new Date();
        now.setHours(now.getHours() + 7);

        if (now >= start && now <= end) {

            data.isDiscount = true;
            data.price = Math.round(result.gia_sanpham * (1 - discountProduct[0].gia_giam / 100));
            data.originPrice = result.gia_sanpham;

        }
        else {

            data.price = result.gia_sanpham;

            data.isDiscount = false;
        }
    }
    else {
        data.price = result.gia_sanpham;

        data.isDiscount = false;
    }

    const brand = await brandGetAll({ id_thuonghieu: result.id_thuonghieu });
    const reviews = await reviewGetAll({ id_sanpham: result.id_sanpham });
    let _reviews=[];
    let ratingMark = 5;
    let positiveRating = 1;
    reviews.forEach(item => {

        if (item.rating >= 3) {
            positiveRating += 1;
            ratingMark += item.rating;
        }
    });

    ratingMark = Math.ceil(ratingMark / positiveRating);

    const detailImg = resu.url[0].url;
    resu.url.splice(0, 1);
    const similarImg = resu.url.map(item => item.url);

    const name = result.ten_sanpham;
    const id = result.id_sanpham;

    const availability = result.soluong_tonkho > 0 ? 'In Stock' : 'Sold out';

    const listedDate = new Date(result.ngay_list);
    const currentDate = Date.now();

    const diffTime = Math.abs(currentDate - listedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    data.detailImg = detailImg;
    data.similarImg = similarImg;
    data.name = name;
    data.id = id;
    data.availability = availability;
    data.brand = brand[0].ten_thuonghieu;
    data.isNew = diffDays > 7 ? false : true;
    data.rating = ratingMark;

    if (reviews !== null) {

        if (reviews.length > 0) {

            _reviews= reviews.map(item => {

                const myDate = new Date(item.created_at);
                // const myArray=item.created_at.split(" ");

                const hour = `${myDate.getUTCHours()}:${myDate.getUTCMinutes()}:${myDate.getUTCSeconds()}`;
                const date = `${myDate.getUTCDate()}/${myDate.getUTCMonth()}/${myDate.getUTCFullYear()}`;

                return {
                    name: item.name,
                    hour: hour,
                    date: date,
                    description: item.description
                }

            });

            console.log(_reviews);

            // return res.render('product-details', { data: data, reviews: review });
        }


    }

    const brands = await brandGetAll({});

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
    
    return res.render('product-details', { 
        data: data,
        brands:brands,
        types:types ,
        reviews:_reviews,
        auth:auth,
        empty:false
    });

}

exports.addReview = async (req, res) => {

    if (!req.cookies.uuid) {

        return res.status(401).send("Not able to identify");
    }

    if (!req.query.product) {
        return res.status(401).send("Not able to detect whether product is");
    }

    const id_product = req.query.product;
    const email = req.body.email;
    const name = req.body.name;
    const description = req.body.description;
    const rating = req.body.rating;

    const result = await reviewCreate({
        id_sanpham: id_product,
        email: email,
        name: name,
        description: description,
        rating: rating
    });

    if (result === null) {
        return res.status(401).send("Something wrong please try again");
    }

    const review = await reviewGetByPk(result.null);

    if (review !== null) {
        return res.status(200).send(review);
    }

    return res.status(401).send("Something wrong please try again");

}