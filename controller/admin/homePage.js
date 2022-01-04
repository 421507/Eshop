/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 02:35:55
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 02:23:30
 */

exports.renderHomePage = async (req, res) => {

    const user=req.user;

    const payload={
        name:user.ten
    }
    console.log('CCCCCCCCCCC ',payload);
    
    res.render('admin/index', { 
        auth: true,
        layout:'admin',
        data:payload
    });

}