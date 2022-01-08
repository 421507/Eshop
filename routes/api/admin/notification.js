/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 21:12:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 08:43:04
 */
 module.exports=app=>{

    const router=require('express').Router();

    const noti=require('../../../controller/admin/notification');

    // router.delete('/:id',shipping.remove);

    router.post('/:id',noti.reply);
    
    app.use('/api/admin/notification',router);
}