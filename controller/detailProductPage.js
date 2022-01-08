/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-20 23:41:13
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 23:29:38
 */

// const {remove:detailCartRemove,update:detailCartUpdate}=require('./service/giohangchitiet');
// const {update:cartUpdate,getAll: cartGetAll}=require('./service/giohang');
// const { getAll: customerGetAll } = require('./service/khachhang');
const {
    getByPk,
    getRelatedProducts:productGetRelated
} = require('./service/sanpham');
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
const {
    getAll: theodoiGetAll,
    increaseSoLanXem,
    create:theodoiCreate
} = require('./service/theodoi');
const{
    getUser
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
    const type=await typeGetAll({id_loaisp:result.id_loaisp});
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

    const detailImg = result.thumbnail;
    // const detailImg = resu.url[0].url;
    // resu.url.splice(0, 1);
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
    data.description=result.mieuta;
    data.listDate=new Date(result.ngay_list).toLocaleString();
    data.type=type[0].ten_loaisp;

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

    const timeVisit=await theodoiGetAll({
        uuid:req.uuid,
        id_sanpham:id
    });
    let times=1;
    if(timeVisit.length > 0){
        times=timeVisit[0].solanxem+1;
        increaseSoLanXem({
            uuid:req.uuid,
            id_sanpham:id,
            solanxem:timeVisit[0].solanxem
        });
    }
    else{
        theodoiCreate({
            uuid:req.uuid,
            id_sanpham:id,
        });
    }

    const _relatedProducts=await productGetRelated(req.query.id);
    const activeRelateProducts=[];
    const unactiveRelateProducts=[];
    for (let index = 0; index < 3; index++) {
        const element = _relatedProducts[index];
        if(element === undefined)
            break;
        activeRelateProducts.push({
            price:element.gia_sanpham,
            thumbnail:element.thumbnail,
            name:element.ten_sanpham,
            url:`/product-details?id=${element.id_sanpham}`
        });
        
    }
    for (let index = 3; index <6 ; index++) {
        const element = _relatedProducts[index];
        if(element === undefined)
            break;
        unactiveRelateProducts.push({
            price:element.gia_sanpham,
            thumbnail:element.thumbnail,
            name:element.ten_sanpham,
            url:`/product-details?id=${element.id_sanpham}`
        });
        
    }

    return res.render('product-details', { 
        data: data,
        brands:brands,
        types:types ,
        reviews:_reviews,
        auth:auth,
        timesView:times,
        activeRelateProducts:activeRelateProducts,
        unactiveRelateProducts:unactiveRelateProducts,
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
    let email = req.body.email;
    let name = req.body.name;
    const description = req.body.description;
    const rating = req.body.rating;

    const auth=await isAuth(req);

    if(auth){
        const user=await getUser(req);
        email = user.email;
        name=user.ten;
    }

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