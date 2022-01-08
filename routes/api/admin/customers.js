/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 21:12:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 13:19:10
 */
 module.exports=app=>{

    const router=require('express').Router();

    const customer=require('../../../controller/admin/customers');

    router.delete('/:id',customer.remove);

    router.put('/:id',customer.update);

    // router.post('/',present.create);

    // router.delete('/:id',present.remove);
    
    app.use('/api/admin/customer',router);
}