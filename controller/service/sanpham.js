/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-01 16:34:23
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 03:49:22
 */
const db = require("../../models/index");
const Sanpham = db.sanpham;
const {Op, fn} = require("sequelize");
const {
    update:detailCartUpdate
}=require('./giohangchitiet');
const {
    remove:imageRemove
}=require('./hinhanh');
const{
    remove:discountProductRemove
}=require('./sanphamgiamgia');
const{
    remove:reviewRemove
}=require('./review');
const{
    remove:voucherRemove
}=require('./voucher');
const{
    remove:theodoiRemove
}=require('./theodoi');



const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit,props) => {
    const { count: totalItems, rows: sanpham } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const errorCode = 0;
    const message = "Success";
    let pages = [];
    let needArrow = false;
    let arrowUrl = '';

    let brand='';
    let type='';
    let min='';
    let max='';
    let description='';
    if (props && props.brand)
        brand=`&brand=${props.brand}`;
    if(props && props.type)
        type=`&type=${props.type}`;
    if(props && props.min)
        min=`&min=${props.min}`;
    if(props && props.max)
        max=`&max=${props.max}`;
    if(props && props.description)
        description=`&description=${props.description}`;
        
    if (currentPage > 0) {
        
        pages.push({
            isActive: false,
            pageUrl:`/products?page=${currentPage - 1}${brand}${type}${min}${max}${description}`,
            pageNumber: currentPage
        });
    }
    
    if(sanpham.length > 0)
        pages.push({
            isActive: true,
            pageUrl: `/products?page=${currentPage}${brand}${type}${min}${max}${description}`,
            pageNumber: currentPage + 1
        });

    if (currentPage + 2 <= totalPages) {
        pages.push({
            isActive: false,
            pageUrl: `/products?page=${currentPage + 1}${brand}${type}${min}${max}${description}`,
            pageNumber: currentPage + 2
        });

        if (currentPage + 2 < totalPages) {
            needArrow = true;
            arrowUrl = `/products?page=${currentPage + 2}${brand}${type}${min}${max}${description}`
        }

    }

    return { 
        totalItems, 
        sanpham, 
        totalPages, 
        currentPage, 
        pages, 
        needArrow, 
        arrowUrl, 
        errorCode, 
        message 
    };

};


const _getAll=async (props)=>{

    const condition={};

    if(props.id_sanpham)
        condition.id_sanpham=props.id_sanpham;
    if(props.ten_sanpham)
        condition.ten_sanpham=props.ten_sanpham;
    if(props.gia_sanpham)
        condition.gia_sanpham=props.gia_sanpham;
    if(props.mieuta)
        condition.mieuta=props.mieuta;
    if(props.soluong_tonkho)
        condition.soluong_tonkho=props.soluong_tonkho;
    if(props.ngay_list)
        condition.ngay_list=props.ngay_list;
    if(props.soluong_daban)
        condition.soluong_daban=props.soluong_daban;
    if(props.mau_sac)
        condition.mau_sac=props.mau_sac;
    if(props.size)
        condition.size=props.size;
    if(props.id_thuonghieu)
        condition.id_thuonghieu=props.id_thuonghieu;
    if(props.thumbnail)
        condition.thumbnail=props.thumbnail;
    if(props.id_loaisp)
        condition.id_loaisp=props.id_loaisp;

    try {
        const result=await Sanpham.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getAll = async ( props) => {

    const { limit, offset } = getPagination(props.page, props.size);

    const condition = {};
    condition.thumbnail={
        [Op.ne]:null
    }
    let _data;
    if (props){
        if (props.brand !== undefined)
            condition.id_thuonghieu = props.brand;
        if(props.type !== undefined){

            // _data=await detailTypeGetAll({id_loaisp:props.type});

            // const extractData=_data.map(item=>item.id_sanpham);

            // condition.id_sanpham=extractData;
            condition.id_loaisp=props.type;
        }
        if(props.min !== undefined && props.max === undefined){

            condition.gia_sanpham={
                [Op.gte]:props.min
            };
        }
        if(props.max !== undefined && props.min === undefined){

            condition.gia_sanpham={
                [Op.lte]:props.max
            };
        }
        if(props.max !== undefined && props.min !== undefined){

            condition.gia_sanpham={
                [Op.between]:[props.min,props.max]
            };
        }
        if(props.description !== undefined){
            condition.ten_sanpham={
                [Op.like]:`%${props.description}%`
            }
        }
    }

    console.log(condition);
    
    try {
        const data = await Sanpham.findAndCountAll({ limit, offset, where: condition })
        const resp = getPagingData(data, props.page, limit,props);
     
        return resp;
    } catch (error) {
        console.log(error);
        return null;
    }

};

const getByPk =async (pk) => {

    try {
        const result=await Sanpham.findByPk(pk);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const setFkNull=async (props) => {

    const condition={};
    const field={};
    if(props.id_thuonghieu !== undefined){
        condition.id_thuonghieu=props.id_thuonghieu
        field.id_thuonghieu=null;
    }
    if(props.id_loaisp !== undefined){
        condition.id_loaisp=props.id_loaisp
        field.id_loaisp=null;
    }

    try {
        const result=await Sanpham.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const update=async (props)=>{

    const condition={};
        
    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;

    const field={};

    if(props.ten_sanpham)
        field.ten_sanpham=props.ten_sanpham;
    if(props.gia_sanpham)
        field.gia_sanpham=props.gia_sanpham;
    if(props.mieuta)
        field.mieuta=props.mieuta;
    if(props.soluong_tonkho)
        field.soluong_tonkho=props.soluong_tonkho;
    if(props.ngay_list)
        field.ngay_list=props.ngay_list;
    if(props.soluong_daban)
        field.soluong_daban=props.soluong_daban;
    if(props.mau_sac)
        field.mau_sac=props.mau_sac;
    if(props.size)
        field.mau_sac=props.mau_sac;
    if(props.id_thuonghieu)
        field.id_thuonghieu=props.id_thuonghieu;
    if(props.thumbnail)
        field.thumbnail=props.thumbnail;
    if(props.id_loaisp)
        field.id_loaisp=props.id_loaisp;

    try {
        const result = await Sanpham.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }    

}

const remove=async (props)=>{

    const condition={};

    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;
    
    try {
        if(props.id_thuonghieu !== undefined){
            const{
                update:brandUpdate,
                getByPk:brandGetByPk
            }=require('./thuonghieu');

            const brand=await brandGetByPk(props.id_thuonghieu);

            brandUpdate({
                id_thuonghieu:props.id_thuonghieu,
                so_sanpham:brand.so_sanpham-1
            });
        }
        console.log("CCCCCCCCCCCC ",props.id_sanpham);
        await imageRemove({id_sanpham:props.id_sanpham});
        await discountProductRemove({id_sanpham:props.id_sanpham});
        await reviewRemove({id_sanpham:props.id_sanpham});
        await voucherRemove({id_sanpham:props.id_sanpham});
        await detailCartUpdate({id_sanpham:props.id_sanpham});
        await theodoiRemove({id_sanpham:props.id_sanpham});

        const result=await Sanpham.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const create=async (props)=>{

    const field={};

    if(props.ten_sanpham !== undefined)
        field.ten_sanpham=props.ten_sanpham;
    if(props.gia_sanpham !== undefined)
        field.gia_sanpham=props.gia_sanpham;
    if(props.mieuta !== undefined)
        field.mieuta=props.mieuta;
    if(props.soluong_tonkho !== undefined)
        field.soluong_tonkho=props.soluong_tonkho;
    if(props.ngay_list !== undefined)
        field.ngay_list=props.ngay_list;
    if(props.soluong_daban !== undefined)
        field.soluong_daban=props.soluong_daban;
    if(props.mau_sac !== undefined)
        field.mau_sac=props.mau_sac;
    if(props.size !== undefined)
        field.mau_sac=props.mau_sac;
    if(props.id_thuonghieu !== undefined)
        field.id_thuonghieu=props.id_thuonghieu;
    if(props.thumbnail !== undefined)
        field.thumbnail=props.thumbnail;
    if(props.id_loaisp !== undefined)
        field.id_loaisp=props.id_loaisp;

    try {

        if(props.id_thuonghieu !== undefined){

            const{
                update:brandUpdate,
                getByPk:brandGetByPk
            }=require('./thuonghieu');

            const brand=await brandGetByPk(props.id_thuonghieu);

            brandUpdate({
                id_thuonghieu:props.id_thuonghieu,
                so_sanpham:brand.so_sanpham+1
            });
        }

        const result=await Sanpham.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getRelatedProducts=async pk=>{

    const product=await getByPk(pk);

    const condition={
        [Op.or]:[{id_loaisp:product.id_loaisp},{id_thuonghieu:product.id_thuonghieu}],
        id_sanpham:{
            [Op.ne]:product.id_sanpham
        }
    };

    try {
        return await Sanpham.findAll({where:condition});
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getTopProducts=async ()=>{

    const {
        getTopProducts:detailCartGetTop
    }=require('./giohangchitiet');

    const result=await detailCartGetTop();

    const idProds=result.map(item=>item.id_sanpham);

    const _products=await _getAll({
        id_sanpham:idProds
    });
    const products=[];
    result.forEach(item=>{

        function getProduct(id){
            for (let index = 0; index < _products.length; index++) {
                const element = _products[index];
                if(element.id_sanpham === id)
                    return element;
            }
            return null;
        }

        const prod=getProduct(item.id_sanpham);

        products.push({
            name:prod.ten_sanpham,
            amount:prod.soluong_daban
        });
    });

    return products;
}

const recover=async props=>{

    const idProds=props.products.map(item=>item.id);

    const products=await _getAll({
        id_sanpham:idProds
    });

    const data=[];
    props.products.forEach(item=>{

        function getProduct(id){

            for (let index = 0; index < products.length; index++) {
                const element = products[index];
                if(element.id_sanpham === id)
                    return element;
            }

            return null;
        }

        const prod=getProduct(item.id);

        // promiseFunc.push(update({
        //     id_sanpham:item.id,
        //     soluong_daban:prod.soluong_daban+item.amount,
        //     soluong_tonkho:prod.soluong_tonkho-item.amount
        // }));

        data.push({
            id_sanpham:item.id,
            soluong_daban:prod.soluong_daban+item.amount,
            soluong_tonkho:prod.soluong_tonkho-item.amount
        })
    });



    // let result=await Promise.all(promiseFunc);

    // for (let index = 0; index < result.length; index++) {
    //     const element = result[index];
    //     if(element === null)
    //         return null;
    // }


    try {
        const result =await Sanpham.bulkCreate(data,{updateOnDuplicate:['soluong_daban','soluong_tonkho']});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getProductHomePage=async _=>{

    try {
        const result=await Sanpham.findAll({
            limit:12,
            where:{
                thumbnail:{
                    [Op.ne]:null
                }
            },
            order:[
                ['ngay_list','DESC']
            ]
        });

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getSamples=async types=>{

    try {
        const result=await Sanpham.findAndCountAll({
            group:['id_loaisp'],
            // attributes:['id_loaisp','sanpham.*'],
            where:{
                id_loaisp:types
            },
            limit:4
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports = { 
    getAll, 
    getByPk,
    _getAll,
    update,
    remove,
    setFkNull,
    create,
    getRelatedProducts,
    getTopProducts,
    recover,
    getProductHomePage,
    getSamples
};