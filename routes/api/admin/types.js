/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 17:10:27
 */
 module.exports=app=>{

    const router=require('express').Router();

    const type=require('../../../controller/admin/types');

    router.delete('/:id',type.remove);

    router.post('/',type.create);
    
    app.use('/api/admin/type',router);
}