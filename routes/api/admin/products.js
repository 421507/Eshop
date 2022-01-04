/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 20:45:04
 */
module.exports=app=>{

    const router=require('express').Router();

    const product=require('../../../controller/admin/productPage');

    router.delete('/:id',product.remove);

    router.put('/:id',product.update);

    app.use('/api/admin/product',router);
}