/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:34:41
 */
 module.exports=app=>{

    const router=require('express').Router();
    const {isAdmin, deleteProduct}=require('../../../controller/middleware/admin/user');
    const type=require('../../../controller/admin/types');

    router.delete('/:id',isAdmin,deleteProduct,type.remove);
    router.put('/:id',type.update);

    router.post('/',type.create);
    
    app.use('/api/admin/type',router);
}