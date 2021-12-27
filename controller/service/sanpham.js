/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-01 16:34:23
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-21 23:57:39
 */
const db = require("../../models/index");
const Sanpham = db.sanpham;
const Op = require("sequelize");
const {getAll:detailTypeGetAll} = require('./loaispchitiet');

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
    if (props && props.brand)
        brand=`&brand=${props.brand}`;
    if(props && props.type)
        type=`&type=${props.type}`;

    if (currentPage > 0) {
        
        pages.push({
            isActive: false,
            pageUrl:`/products?page=${currentPage - 1}${brand}`,
            pageNumber: currentPage
        });
    }
    pages.push({
        isActive: true,
        pageUrl: `/products?page=${currentPage}${brand}${type}`,
        pageNumber: currentPage + 1
    });
    if (currentPage + 2 <= totalPages) {
        pages.push({
            isActive: false,
            pageUrl: `/products?page=${currentPage + 1}${brand}${type}`,
            pageNumber: currentPage + 2
        });

        if (currentPage + 2 < totalPages) {
            needArrow = true;
            arrowUrl = `/products?page=${currentPage + 2}${brand}${type}`
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

    try {
        const result=await Sanpham.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getAll = async ( props) => {

    // return new Promise((resolve, reject) => {
        
    //         .then((data) => {
    //             const resp = getPagingData(data, page, limit,props);

    //             resolve(resp);
    //         })
    //         .catch((err) => {
    //             console.log('error');
    //             reject({
    //                 errorCode: -1,
    //                 message:
    //                     err.message || "Some error occurred while retrieving San pham."
    //             });
    //         });
    // });
    const { limit, offset } = getPagination(props.page, props.size);

    const condition = {};
    let _data;
    if (props){
        if (props.brand)
            condition.id_thuonghieu = props.brand;
        if(props.type){

            _data=await detailTypeGetAll({id_loaisp:props.type});

            const extractData=_data.map(item=>item.id_sanpham);

            condition.id_sanpham=extractData;
        }
    }
    
    try {
        const data = await Sanpham.findAndCountAll({ limit, offset, where: condition })
        const resp = getPagingData(data, props.page, limit,props);
        if(props.type)
            resp.table=_data;
        return resp;
    } catch (error) {
        console.log(error);
        return null;
    }

};

const getByPk = (pk) => {

    return new Promise((resolve, reject) => {

        Sanpham.findByPk(pk)
            .then(data => {

                if (data) {
                    resolve({
                        data,
                        errorCode: 0,
                        message: 'Success'
                    });
                }
                else {
                    reject({
                        errorCode: 1,
                        message: 'Invalid primary key'
                    });
                }
            })
            .catch(err => {
                reject({
                    errorCode: -1,
                    message: err.message || 'Error while retrieving product by pk'
                })
            });

    });

}

const update=async (props)=>{

    const condition={};
        
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

    try {
        const result = await Sanpham.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }    

}

module.exports = { getAll, getByPk,_getAll,update };