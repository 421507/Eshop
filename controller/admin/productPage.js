/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:22:45
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-05 16:58:31
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
    getAll:discountProductGetAll
}=require('../service/sanphamgiamgia');

exports.renderListing = async (req, res) => {

    const products = await productGetAll({});

    const payload = products.map(item => {

        return {
            id:item.id_sanpham,
            ten_sanpham: item.ten_sanpham,
            gia_sanpham: item.gia_sanpham,
            soluong_tonkho: item.soluong_tonkho,
            ngay_list: new Date(item.ngay_list).toISOString(),
            url_delete: `/admin/api/product/delete?id=${item.id_sanpham}`,
            url_update: `/admin/productdetails?id=${item.id_sanpham}`
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
    })

    res.render('admin/products',{
        data:payload,
        brands:brands,
        types:types,
        auth:true,
        layout:'admin'
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
        thumbnail:product.thumbnail,
        ngay_list: new Date(product.ngay_list).toLocaleString(),
        id_sanpham:product.id_sanpham
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
        
        console.log(start);
        console.log(end);
        console.log(now);

        if(now >= start && now <= end){
            isDiscount=true;

            startDate=start.toLocaleString();
            endDate=end.toLocaleString();
            discount=discountProducts[0].gia_giam;
        }
        
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

        result=await discountProductCreate({
            id_sanpham:id,
            gia_giam:discount,
            ngay_batdau:start,
            ngay_ketthuc:end,
        });

        if(result === null)
            return res.status(401).send("Something wrong please try again");
    }

    return res.status(200).send("OK");
}