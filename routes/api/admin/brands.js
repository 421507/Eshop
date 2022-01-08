/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 09:40:48
 */
 module.exports=app=>{

    const router=require('express').Router();

    const brand=require('../../../controller/admin/brands');

    router.delete('/:id',brand.remove);
    router.put('/:id',brand.update);

    router.post('/',brand.create);
    
    app.use('/api/admin/brand',router);
}