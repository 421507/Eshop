/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 15:40:17
 */
 module.exports=app=>{

    const router=require('express').Router();

    const customize=require('../../../controller/admin/customize');

    router.delete('/:id',customize.removeStatusDelivery);
    router.put('/:id',customize.updateStatusDelivery);

    router.post('/',customize.createStatusDelivery);
    
    app.use('/api/admin/statusdelivery',router);
}