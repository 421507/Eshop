/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 21:12:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 21:12:47
 */
module.exports=app=>{

    const router=require('express').Router();

    const shipping=require('../../../controller/admin/shippings');

    // router.delete('/:id',shipping.remove);

    router.put('/:id',shipping.update);
    
    app.use('/api/admin/shipping',router);
}