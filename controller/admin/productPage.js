/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:22:45
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 20:52:07
 */

const {
    _getAll: productGetAll,
    remove:productRemove,
    getByPk:productGetByPk,
    update:productUpdate,
} = require('../service/sanpham');
const {
    getAll:brandGetAll
}=require('../service/thuonghieu');
const{
    getAll:typeGetAll
}=require('../service/loaisanpham');

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

    res.render('admin/products',{
        data:payload,
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

exports.renderDetail=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin/products');
    
    
    const product=await productGetByPk(id);

    if(product === null){

        return res.render('admin/product-details',{
            empty:true,
        });

    }

    const payload={
        ten_sanpham:product.ten_sanpham,
        mieuta:product.mieuta,
        gia_sanpham:product.gia_sanpham,
        soluong_tonkho:product.soluong_tonkho,
        thumbnail:product.thumbnail,
        ngay_list: new Date(product.ngay_list).toISOString(),
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

    return res.render('admin/product-details',{
        empty:false,
        data:payload,
        layout:'admin',
        brands:_brands,
        types:_types
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