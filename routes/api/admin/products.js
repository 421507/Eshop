/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:33:46
 */
module.exports=app=>{

    const router=require('express').Router();
    const uploader = require('../../../controller/middleware/upload');
    const product=require('../../../controller/admin/productPage');
    const {isAdmin, deleteProduct}=require('../../../controller/middleware/admin/user');
    router.delete('/multidelete',isAdmin,deleteProduct,product.removeMulti);

    router.delete('/:id',product.remove);

    router.put('/:id',product.update);

    router.post('/',product.create);
    router.post('/thumbnail/:id',uploader.upload.single('thumbnail'),product.updateThumbnail);
    router.post('/subphotos/:id',uploader.upload.array('subphotos',3),product.updateSubphoto);

    router.get('/top',product.getTopProducts);
    router.get('/profit',product.getProfit);

    app.use('/api/admin/product',router);
}