/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:34:24
 */
 module.exports=app=>{

    const router=require('express').Router();
    const product=require('../../../controller/admin/productPage');
    const {isAdmin, deleteProduct}=require('../../../controller/middleware/admin/user');
    
    router.delete('/:id',isAdmin,deleteProduct,product.typeBrandRemove);
    router.put('/:id',product.typeBrandUpdate);
    router.post('/',product.typeBrandCreate);

    app.use('/api/admin/typebrand',router);
}