/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-28 00:15:12
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 14:28:15
 */
 module.exports=app=>{

    const contact=require('../../controller/contact');
    const router=require('express').Router();

    router.post('/',contact.add);

    app.use('/api/contact',router);


}