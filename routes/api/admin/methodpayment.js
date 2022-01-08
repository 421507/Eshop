/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 16:22:25
 */
 module.exports=app=>{

    const router=require('express').Router();

    const customize=require('../../../controller/admin/customize');

    router.delete('/:id',customize.removeMethodPayment);
    router.put('/:id',customize.updateMethodPayment);

    router.post('/',customize.createMethodPayment);
    
    app.use('/api/admin/methodpayment',router);
}