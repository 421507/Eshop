/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 21:12:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 02:51:50
 */
 module.exports=app=>{

    const router=require('express').Router();

    const present=require('../../../controller/admin/presents');

    // router.delete('/:id',shipping.remove);

    router.put('/:id',present.update);
    
    app.use('/api/admin/present',router);
}