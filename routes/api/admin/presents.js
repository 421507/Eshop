/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 21:12:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:33:24
 */
 module.exports=app=>{

    const router=require('express').Router();

    const present=require('../../../controller/admin/presents');
    const {isAdmin, deletePresent}=require('../../../controller/middleware/admin/user');
    // router.delete('/:id',shipping.remove);

    router.put('/:id',present.update);

    router.post('/',present.create);

    router.delete('/:id',isAdmin,deletePresent,present.remove);
    
    app.use('/api/admin/present',router);
}