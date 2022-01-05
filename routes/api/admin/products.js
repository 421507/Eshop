/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-05 15:38:42
 */
module.exports=app=>{

    const router=require('express').Router();

    const product=require('../../../controller/admin/productPage');

    router.delete('/multidelete',product.removeMulti);

    router.delete('/:id',product.remove);

    router.put('/:id',product.update);

    router.post('/',product.create);

    app.use('/api/admin/product',router);
}