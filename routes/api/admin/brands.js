/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 17:03:44
 */
 module.exports=app=>{

    const router=require('express').Router();

    const brand=require('../../../controller/admin/brands');

    router.delete('/:id',brand.remove);

    router.post('/',brand.create);
    
    app.use('/api/admin/brand',router);
}