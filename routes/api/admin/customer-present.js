/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 21:12:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 14:02:54
 */
 module.exports=app=>{

    const router=require('express').Router();

    const cp=require('../../../controller/admin/customer-present');

    router.delete('/:id',cp.remove);
    
    app.use('/api/admin/customerpresent',router);
}