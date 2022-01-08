/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 11:07:28
 */
 module.exports=app=>{

    const router=require('express').Router();
    const product=require('../../../controller/admin/productPage');

    router.delete('/:id',product.typeBrandRemove);
    router.put('/:id',product.typeBrandUpdate);
    router.post('/',product.typeBrandCreate);

    app.use('/api/admin/typebrand',router);
}