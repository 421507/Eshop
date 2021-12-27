/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-28 00:15:12
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-28 00:18:17
 */
module.exports=app=>{

    const review=require('../../controller/detailProductPage');
    const router=require('express').Router();

    router.post('/',review.addReview);

    app.use('/api/review',router);


}