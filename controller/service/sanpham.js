/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-01 16:34:23
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 01:43:41
 */
const db = require("../../models/index");
const Sanpham = db.sanpham;
const Op = require("sequelize");


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: sanpham } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const errorCode = 0;
    const message = "Success";
    let pages=[];
    let needArrow=false;
    let arrowUrl='';
    
    if(currentPage > 0){
        pages.push({
            isActive:false,
            pageUrl:`/products?page=${currentPage-1}`,
            pageNumber:currentPage
        }); 
    }
    pages.push({
        isActive:true,
        pageUrl:`/products?page=${currentPage}`,
        pageNumber:currentPage+1
    });
    if (currentPage+2 <= totalPages ){
        pages.push({
            isActive:false,
            pageUrl:`/products?page=${currentPage+1}`,
            pageNumber:currentPage+2
        });

        if (currentPage+2 < totalPages){
            needArrow=true;
            arrowUrl=`/products?page=${currentPage+2}`
        }
            
    }

    return { totalItems, sanpham, totalPages, currentPage,pages,needArrow,arrowUrl, errorCode, message };
};


const getAll = (page) => {

    return new Promise((resolve, reject) => {
        const { limit, offset } = getPagination(page, 12);

        Sanpham.findAndCountAll({ limit, offset })
            .then((data) => {
                const resp = getPagingData(data, page, limit);
             
                resolve(resp);
            })
            .catch((err) => {
                console.log('error');
                reject({
                    errorCode: -1,
                    message:
                        err.message || "Some error occurred while retrieving San pham."
                });
            });
    });

};

const getByPk=(pk)=>{
    
    return new Promise((resolve,reject) => {

        Sanpham.findByPk(pk)
        .then(data=>{

            if(data){
                resolve({
                    data,
                    errorCode:0,
                    message:'Success'
                });
            }
            else{
                reject({
                    errorCode:1,
                    message:'Invalid primary key'
                });
            }
        })
        .catch(err=>{
            reject({
                errorCode:-1,
                message: err.message || 'Error while retrieving product by pk'
            })
        });

    });

}

module.exports = { getAll,getByPk };