/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-07 16:00:40
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:29:15
 */
const {
    getAll: customerGetAll
} = require('./service/khachhang');
const {
    isAuth
} = require('./service/auth');
const {
    getAll: customerPresentGetAll,
    getValidPresents: customerPresentGetValidPresent,
    create: customerPresentCreate
} = require('./service/khachhang_present');
const {
    getByPk: presentGetByPk,
} = require('./service/present');


exports.renderPage = async (req, res) => {

    const uuid = req.query.customer;
    const idPresent = req.query.present;

    const auth = await isAuth(req);

    if (uuid === undefined || uuid === null || idPresent === undefined || idPresent === null || parseInt(idPresent) < 1) {

        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'Link ưu đãi không hợp lệ',
            brands: req.brands,
            types: req.types
        });
    }

    const customers = await customerGetAll({ uuid: uuid });

    if (customers === null) {
        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'Có lỗi xảy ra vui lòng quay lại sau',
            brands: req.brands,
            types: req.types
        });
    }
    else if (customers.length === 0) {
        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'đối tượng nhận ưu đãi không hợp lệ',
            brands: req.brands,
            types: req.types
        });
    }

    const present = await presentGetByPk(idPresent);

    if (present === null) {
        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'Có lỗi xảy ra vui lòng quay lại sau',
            brands: req.brands,
            types: req.types
        });
    }

    if (present.so_luong === 0) {
        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'Ưu đãi đã được nhận hết',
            brands: req.brands,
            types: req.types
        });
    }

    const now = new Date();
    const end = new Date(present.ngay_ketthuc);

    if (now.getTime() > end.getTime()) {
        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'Ưu đãi đã hết hạn',
            brands: req.brands,
            types: req.types
        });
    }

    let presents = await customerPresentGetAll({
        id_khachhang: customers[0].id_khachhang
    });

    for (let index = 0; index < presents.length; index++) {
        const element = presents[index];
        if (element.id_present === parseInt(idPresent))
            return res.render('present', {
                auth: auth,
                empty: true,
                message: 'Ưu đãi này đã được dùng',
                brands: req.brands,
                types: req.types
            });
    }


    presents = await customerPresentGetValidPresent({
        id_khachhang: customers[0].id_khachhang
    });

    if (presents === null) {
        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'Có lỗi xảy ra vui lòng quay lại sau',
            brands: req.brands,
            types: req.types
        });
    }
    else if (presents.length > 0) {

        for (let index = 0; index < presents.length; index++) {
            const element = presents[index];
            if (element.loai === present.loai)
                return res.render('present', {
                    auth: auth,
                    empty: true,
                    message: 'Hiện tại bạn đang có một số ưu đãi cùng loại chưa dùng tới',
                    brands: req.brands,
                    types: req.types
                });

        }
    }

    let result = await customerPresentCreate({
        id_khachhang: customers[0].id_khachhang,
        id_present: idPresent,
        trang_thai: 'Chưa sử dụng',
        slug_trangthai: 'not_used',
        loai: present.loai,
    });

    if (result === null) {
        return res.render('present', {
            auth: auth,
            empty: true,
            message: 'Có lỗi xảy ra vui lòng quay lại sau',
            brands: req.brands,
            types: req.types
        });
    }

    return res.render('present', {
        auth: auth,
        empty: false,
        id: result.null,
        type: present.loai,
        value: present.so_tien,
        start: new Date(present.ngay_batdau).toLocaleString(),
        end: new Date(present.ngay_ketthuc).toLocaleString(),
        condition: 'Bạn phải mua một sản phẩm bất kì tại eshop để sử dụng được ưu đãi',
        brands: req.brands,
        types: req.types
    });
}