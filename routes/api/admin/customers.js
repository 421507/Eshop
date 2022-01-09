/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 21:12:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:32:00
 */
 module.exports=app=>{

    const router=require('express').Router();
    const {isAdmin, deleteCustomer}=require('../../../controller/middleware/admin/user');
    const customer=require('../../../controller/admin/customers');

    router.delete('/:id',isAdmin,deleteCustomer,customer.remove);

    router.put('/:id',customer.update);

    // router.post('/',present.create);

    // router.delete('/:id',present.remove);
    
    app.use('/api/admin/customer',router);
}