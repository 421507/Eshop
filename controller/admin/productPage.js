/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:22:45
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 11:41:24
 */

const {
    _getAll: productGetAll,
    remove:productRemove,
    getByPk:productGetByPk,
    update:productUpdate,
    create:productCreate
} = require('../service/sanpham');
const {
    getAll:brandGetAll
}=require('../service/thuonghieu');
const{
    getAll:typeGetAll
}=require('../service/loaisanpham');
const{
    create:discountProductCreate,
    getAll:discountProductGetAll,
    update:discountProductUpdate,
    remove:discountProductRemove,
    getByPk:discountProductGetByPk
}=require('../service/sanphamgiamgia');
const{
    getAll:imageGetAll,
    remove:imageRemove,
    multiCreate:imageMultiCreate
}=require('../service/hinhanh');
const{
    getAll:typeBrandGetAll,
    getByPk:typeBrandGetByPk,
    update:typeBrandUpdate,
    create:typeBrandCreate,
    remove:typeBrandRemove
}=require('../service/loaisp_thuonghieu');

exports.renderListing = async (req, res) => {

    const products = await productGetAll({});

    const payload = products.map(item => {

        return {
            id:item.id_sanpham,
            ten_sanpham: item.ten_sanpham,
            gia_sanpham: item.gia_sanpham,
            soluong_tonkho: item.soluong_tonkho,
            ngay_list: new Date(item.ngay_list).toLocaleString(),
            url_delete: `/admin/api/product/delete?id=${item.id_sanpham}`,
        };

    });

    const _brands=await brandGetAll({});

    const brands=_brands.map(item=>{

        return{
            id:item.id_thuonghieu,
            ten:item.ten_thuonghieu
        }
    });

    const _types=await typeGetAll({});

    const types=_types.map(item=>{

        return{
            id:item.id_loaisp,
            ten:item.ten_loaisp
        }
    });

    const _typeBrand=await typeBrandGetAll({});

    const typeBrand=_typeBrand.map(item=>{

        function getType(id) {
            for (let index = 0; index < types.length; index++) {
                const element = types[index];
                if(element.id === id)
                    return element;
            }

            return null;
        }

        return{
            id:item.id_loaisp_th,
            brand:item.ten_thuonghieu,
            type:getType(item.id_loaisp).ten
        }
    });

    const _discountProducts=await discountProductGetAll({});

    const discountProducts=_discountProducts.map(item=>{

        function getProduct(id) {
            for (let index = 0; index < payload.length; index++) {
                const element = payload[index];
                if(element.id === id)
                    return element;
            }

            return null;
        }
        const product=getProduct(item.id_sanpham);
        const now=new Date();
        const end=new Date(item.ngay_ketthuc);

        const status= now.getTime() > end.getTime() ? "Expired" : "Not Expired";
        return{
            idDiscount:item.id_sanpham_giamgia,
            id:item.id_sanpham,
            name:product.ten_sanpham,
            price:item.gia_giam,
            start:new Date(item.ngay_batdau).toLocaleString(),
            end:new Date(item.ngay_ketthuc).toLocaleString(),
            status:status
        }
    });

    res.render('admin/products',{
        data:payload,
        brands:brands,
        types:types,
        typeBrands:typeBrand,
        discountProducts:discountProducts,
        auth:true,
        layout:'admin',
        urlAddBrand:'http://localhost:3000/admin/addbrand',
        urlAddType:'http://localhost:3000/admin/addtype'
    });
}

exports.remove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID field not found!");
    
    const products=await productGetAll({id_sanpham:id});

    if(products === null)
        return res.status(401).send("Something wrong please try again");
    else if(products.length === 0)
        return res.status(401).send("Invalid product");

    const result=await productRemove({id_sanpham:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
    return res.status(200).send("Ok");

}

exports.removeMulti=async (req,res) =>{

    const products=req.body.ids;

    const result=await productRemove({id_sanpham:products});

    if(result === null){
        return res.status(401).send("Something wrong please try again");
    }
    return res.status(200).send("ok");

}

exports.renderDetail=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin/products');
    
    
    const product=await productGetByPk(id);

    if(product === null){

        return res.render('admin/product-details',{
            empty:true,
            auth:true
        });

    }

    const payload={
        ten_sanpham:product.ten_sanpham,
        mieuta:product.mieuta,
        gia_sanpham:product.gia_sanpham,
        soluong_tonkho:product.soluong_tonkho,
        thumbnail:product.thumbnail !== undefined && product.thumbnail !== null ? product.thumbnail : '/images/download.png',
        ngay_list: new Date(product.ngay_list).toLocaleString(),
        id_sanpham:product.id_sanpham,
        subphotos:[
            {
                url:"/images/download.png",
                id:"subphoto-1"
            },
            {
                url:"/images/download.png",
                id:"subphoto-2"
            },
            {
                url:"/images/download.png",
                id:"subphoto-3"
            },
        ]
        // thumbnail:`admin/${product.thumbnail}`
    }

    const brands=await brandGetAll({});

    const _brands=brands.map(item=>{

        if(item.id_thuonghieu === product.id_thuonghieu){
            return {
                id_thuonghieu:item.id_thuonghieu,
                ten_thuonghieu:item.ten_thuonghieu,
                selected:true
            }
        }
        return {
            id_thuonghieu:item.id_thuonghieu,
            ten_thuonghieu:item.ten_thuonghieu,
            selected:false
        }
    });

    const types=await typeGetAll({});

    const _types=types.map(item=>{

        if(item.id_loaisp===product.id_loaisp){
            return{
                id_loaisp:item.id_loaisp,
                ten_loaisp:item.ten_loaisp,
                selected:true
            }
        }
        return{
            id_loaisp:item.id_loaisp,
            ten_loaisp:item.ten_loaisp,
            selected:false
        }
    });

    const discountProducts=await discountProductGetAll({id_sanpham:id});
    let isDiscount=false;
    let startDate="",endDate="",discount="";
    if(discountProducts.length > 0){
        const start=new Date(discountProducts[0].ngay_batdau);
        const end=new Date(discountProducts[0].ngay_ketthuc);
        const now=new Date();

        if(now >= start && now <= end){
            isDiscount=true;
            start.setHours(start.getHours()+7);
            end.setHours(end.getHours()+7);
            startDate=start.toISOString().substring(0,start.toISOString().indexOf('.'));
            endDate=end.toISOString().substring(0,end.toISOString().indexOf('.'));
            discount=discountProducts[0].gia_giam;
        }
        
    }

    const _subphotos=await imageGetAll({
        id_sanpham:id
    });

    if(_subphotos.length > 0){
        // console.log(_subphotos);
        _subphotos.forEach((element,index) => {
            payload.subphotos[index].url=element.url;
        });
    }

    return res.render('admin/product-details',{
        empty:false,
        data:payload,
        layout:'admin',
        brands:_brands,
        types:_types,
        auth:true,
        isDiscount:isDiscount,
        start:startDate,
        end:endDate,
        discount:discount
    });
}

exports.update=async (req,res)=>{

    const nameProduct=req.body.nameProduct;
    const description=req.body.description;
    const brand=req.body.brand;
    const type=req.body.type;
    const price=req.body.price;
    const isDiscount=req.body.isDiscount === "true" ? true:false;
    const discountPrice=req.body.discount;
    const startdate=req.body.start;
    const enddate=req.body.end;

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");
    
    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    let result=await brandGetAll({id_thuonghieu:brand});
    
    if(result === null)
        return res.status(401).send("Something wrong please try again");
    else if(result.length === 0)
        return res.status(401).send("ID brand invalid");

    result=await typeGetAll({id_loaisp:type});

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    else if(result.length === 0)
        return res.status(401).send("ID type invalid");

    const discount=await discountProductGetAll({id_sanpham:id});
    if(discount === null){
        return res.status(401).send("Something wrong please try again");
    }

    if (isDiscount){

        if(discount.length > 0){

            result=await discountProductUpdate({
                id_sanpham_giamgia:discount[0].id_sanpham_giamgia,
                gia_giam:discountPrice,
                ngay_ketthuc:enddate,
                ngay_batdau:startdate
            });

            if(result === null)
                return res.status(401).send("Something wrong please try again"); 
        }
        else{
            result=await discountProductCreate({
                id_sanpham:id,
                gia_giam:discountPrice,
                ngay_batdau:startdate,
                ngay_ketthuc:enddate
            });

            if(result === null)
                return res.status(401).send("Something wrong please try again");
        }
    }
    else{
        if(discount.length > 0){
            result=await discountProductRemove({
                id_sanpham_giamgia:discount[0].id_sanpham_giamgia
            });

            if(result === null)
                return res.status(401).send("Something wrong please try again");
        }
    }
    
    const product = await productUpdate({
        id_sanpham:id,
        ten_sanpham:nameProduct,
        mieuta:description,
        id_thuonghieu:brand,
        id_loaisp:type,
        gia_sanpham:price
    });

    if(product === null)
        return res.status(401).send("Something wrong please try again");
    return res.status(200).send("OK");
}

exports.renderAddPage=async (req,res)=>{

    const brands=await brandGetAll({});

    const _brands=brands.map(item=>{
        
        return {
            id_thuonghieu:item.id_thuonghieu,
            ten_thuonghieu:item.ten_thuonghieu,
        }
    });

    const types=await typeGetAll({});

    const _types=types.map(item=>{

        return{
            id_loaisp:item.id_loaisp,
            ten_loaisp:item.ten_loaisp,
        }
    });

    return res.render('admin/add-product',{
        layout:'admin',
        brands:_brands,
        types:_types,
        auth:true
    });
}

exports.create=async (req,res)=>{
    console.log(req.body);
    const{
        name,
        description,
        brand,
        type,
        price,
        stock,
        isDiscount,
        discount,
        start,
        end
    }=req.body;

    const _isDiscount=isDiscount === "true" ? true:false;

    let result=await brandGetAll({id_thuonghieu:brand});
    
    if(result === null)
        return res.status(401).send("Something wrong please try again");
    else if(result.length === 0)
        return res.status(401).send("ID brand invalid");

    result=await typeGetAll({id_loaisp:type});

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    else if(result.length === 0)
        return res.status(401).send("ID type invalid");

    result=await productCreate({
        ten_sanpham:name,
        mieuta:description,
        id_thuonghieu:brand,
        id_loaisp:type,
        gia_sanpham:price,
        soluong_tonkho:stock
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    console.log(_isDiscount);
    if(_isDiscount){

        const id=result.null;

        const _result=await discountProductCreate({
            id_sanpham:id,
            gia_giam:discount,
            ngay_batdau:start,
            ngay_ketthuc:end,
        });

        if(_result === null)
            return res.status(401).send("Something wrong please try again");
    }

    return res.status(200).send({
        id:result.null
    });
}

exports.updateThumbnail=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const product=await productGetByPk(id);

    if(product === null)
        return res.status(401).send("ID Invalid");

    const file = req.file
    if (!file) {
        return res.status(401).send("Please upload a file");
    }

    let result=await productUpdate({
        id_sanpham:id,
        thumbnail:`/images/${file.filename}`
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    console.log(file);
    res.status(200).send("OK");
}
exports.updateSubphoto=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const product=await productGetByPk(id);

    if(product === null)
        return res.status(401).send("ID Invalid");

    const file = req.files;
    if (!file) {
        return res.status(401).send("Please upload a file");
    }

    await imageRemove({
        id_sanpham:id
    });

    const data=file.map(item=>{
        return{
            url:`/images/${item.filename}`,
            id_sanpham:id
        }
    });

    let result=await imageMultiCreate(data);

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    console.log(file);
    res.status(200).send("OK");
}

exports.renderTypeBrandDetail=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.redirect('/admin');
    }

    const typeBrand=await typeBrandGetByPk(id);

    if(typeBrand === null)
        return res.redirect('/admin');

    const _brands=await brandGetAll({});

    const brands=_brands.map(item=>{

        if(item.id_thuonghieu === typeBrand.id_thuonghieu)
        return{
            id:item.id_thuonghieu,
            name:item.ten_thuonghieu,
            selected:true
        }
        else
            return{
                id:item.id_thuonghieu,
                name:item.ten_thuonghieu,
                selected:false
            }
    });

    const _types=await typeGetAll({});

    const types=_types.map(item=>{

        if(item.id_loaisp === typeBrand.id_loaisp)
        return{
            id:item.id_loaisp,
            name:item.ten_loaisp,
            selected:true
        }
        else
            return{
                id:item.id_loaisp,
                name:item.ten_loaisp,
                selected:false
            }
    });

    const payload={
        types:types,
        brands:brands,
        id:id
    }
    return res.render('admin/typebrand-detail',{
        layout:'admin',
        auth:true,
        data:payload
    });
}
exports.renderTypeBrandCreate=async (req,res)=>{

    const _brands=await brandGetAll({});

    const brands=_brands.map(item=>{

        return{
            id:item.id_thuonghieu,
            name:item.ten_thuonghieu,
        }
    });

    const _types=await typeGetAll({});

    const types=_types.map(item=>{
        return{
            id:item.id_loaisp,
            name:item.ten_loaisp,
        }

    });

    const payload={
        types:types,
        brands:brands,
    }
    return res.render('admin/add-typebrand',{
        layout:'admin',
        auth:true,
        data:payload
    });
}


exports.typeBrandUpdate=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const typeBrand=await typeBrandGetByPk(id);

    if(typeBrand === null)
        return res.status(401).send("ID invalid");

    const type=req.body.type;
    const brand=req.body.brand;

    let result=await typeBrandGetAll({
        id_thuonghieu:brand,
        id_loaisp:type
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    else if(result.length > 0){
        return res.status(401).send("Đã tồn tại vui lòng chọn lại");
    }

    
    result=await typeBrandUpdate({
        id_loaisp_th:id,
        id_thuonghieu:brand,
        id_loaisp:type
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
    return res.status(200).send("OK");
}
exports.typeBrandCreate=async (req,res)=>{

    const type=req.body.type;
    const brand=req.body.brand;

    let result=await typeBrandGetAll({
        id_thuonghieu:brand,
        id_loaisp:type
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    else if(result.length > 0){
        return res.status(401).send("Đã tồn tại vui lòng chọn lại");
    }
    
    result=await typeBrandCreate({
        id_thuonghieu:brand,
        id_loaisp:type
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
    return res.status(200).send("OK");
}

exports.typeBrandRemove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const typeBrand=await typeBrandGetByPk(id);

    if(typeBrand === null)
        return res.status(401).send("ID invalid");

    let result=await typeBrandRemove({
        id_loaisp_th:id
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
        return res.status(200).send("OK");
}

exports.discountProductRemove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const discountProduct=await discountProductGetByPk(id);

    if(discountProduct === null)
        return res.status(401).send("ID invalid");

    let result=await discountProductRemove({
        id_sanpham_giamgia:id
    });
    
    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
    return res.status(200).send("OK");
}