/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 16:22:04
 */
 module.exports=app=>{

    const router=require('express').Router();

    const customize=require('../../../controller/admin/customize');

    router.delete('/:id',customize.removeStatusPayment);
    router.put('/:id',customize.updateStatusPayment);

    router.post('/',customize.createStatusPayment);
    
    app.use('/api/admin/statuspayment',router);
}