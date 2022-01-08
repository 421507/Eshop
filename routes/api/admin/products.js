/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:38:16
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 10:39:50
 */
module.exports=app=>{

    const router=require('express').Router();
    const uploader = require('../../../controller/middleware/upload');
    const product=require('../../../controller/admin/productPage');

    router.delete('/multidelete',product.removeMulti);

    router.delete('/:id',product.remove);

    router.put('/:id',product.update);

    router.post('/',product.create);
    router.post('/thumbnail/:id',uploader.upload.single('thumbnail'),product.updateThumbnail);
    router.post('/subphotos/:id',uploader.upload.array('subphotos',3),product.updateSubphoto);

    app.use('/api/admin/product',router);
}