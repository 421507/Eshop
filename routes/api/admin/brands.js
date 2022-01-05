/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-05 14:19:50
 */
 module.exports=app=>{

    const router=require('express').Router();

    const brand=require('../../../controller/admin/brands');

    router.delete('/:id',brand.remove);
    
    app.use('/api/admin/brand',router);
}