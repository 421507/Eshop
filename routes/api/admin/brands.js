/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:31:36
 */
 module.exports=app=>{

    const router=require('express').Router();
    const {isAdmin, deleteProduct}=require('../../../controller/middleware/admin/user');
    const brand=require('../../../controller/admin/brands');

    router.delete('/:id',isAdmin,deleteProduct,brand.remove);
    router.put('/:id',brand.update);

    router.post('/',brand.create);
    
    app.use('/api/admin/brand',router);
}