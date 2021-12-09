/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:15:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 01:41:52
 */
const db = require("../models/db");
const Giohangchitiet = db.giohangchitiet;
const Khachhang = db.khachhang;
const Giohang = db.giohang;
const Sanpham = db.sanpham;
const Op = require("sequelize");
const { v4: uuidv4 } = require('uuid');

const getIdGiohang = (id_khachhang) => {

    const condition = {
        id_khachhang: id_khachhang,
        ngay_dat: null
    };

    Giohang.findAll({
        where: condition,
        attributes: ['id_giohang']
    })
        .then(data => {
            if (data.length > 0)
                return data[0].id_giohang;
            else {
                const record = {
                    id_khachhang: id_khachhang
                }

                Giohang.create(record)
                    .then(result => {
                        return getIdGiohang(id_khachhang);
                    })
                    .catch(err => {
                        return -1;
                    })
            }
        })
        .catch(err => {
            return -1;
        })
};

exports.create = (req, res) => {

    let uid;
    if (!req.body.uuid) {

        uid = uuidv4();

        const record = {
            session_token: uid
        }
        Khachhang.create(record)
            .then(data => {

            })
            .catch(err => {
                res.status(200).send({
                    errorCode: -1,
                    message: err.message || "Something wrong while creating new khachhang"
                });

                return;
            })
    }
    else
        uid = req.body.uuid;

    if (!req.params.id) {
        res.status(200).send({
            errorCode: 1,
            message: "Id product can not be found!",
        });

        return;
    }

    let gia_sp;
    Sanpham.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                gia_sp = data.gia_sanpham;
            } else {
                res.status(200).send({
                    errorCode: 1,
                    message: "Id product invalid, Can not find product with given Id!",
                });

                return;
            }
        })
        .catch((err) => {
            res.status(200).send({
                errorCode: -1,
                message: err.message || "Something wrong while retrieving sanpham"
            });

            return;
        });

    if (!req.body.amount) {
        res.status(200).send({
            errorCode: 1,
            message: "Amount products can not be found!",
        });

        return;
    }

    let condition = { session_token: uid };

    Khachhang.findAll({
        where: condition,
        attributes: ["id_khachhang"],
    })
        .then((data) => {

            if (data.length > 0) {

                condition = {
                    id_khachhang: data[0].id_khachhang,
                    ngay_dat: null,
                };

                const id_giohang = getIdGiohang(id_khachhang);

                if (id_giohang !== -1) {

                    condition = {
                        id_giohang: id_giohang,
                        id_sanpham: req.params.id,
                    };

                    Giohangchitiet.findAll({
                        where: condition,
                    })
                        .then((da) => {
                            if (da.length > 0) {

                                Giohangchitiet.update(
                                    {
                                        // this is payload
                                        soluong: da[0].soluong + req.body.amount,
                                        gia: da[0].gia + req.body.amount * gia_sp,
                                    },
                                    {
                                        where: {
                                            id_giohangchitiet: da[0].id_giohangchitiet,
                                        },
                                    }
                                )
                                    .then((result) => {

                                        if (result === 1) {

                                            Giohang.findByPk(id_giohang)
                                                .then(d => {
                                                    if (d) {

                                                        Giohang.update(
                                                            {
                                                                // this is payload
                                                                tongtien: d.tongtien + req.body.amount * gia_sp,
                                                                so_luong: d.soluong + req.body.amount
                                                            },
                                                            {
                                                                where: {
                                                                    id_giohang: id_giohang
                                                                }
                                                            }
                                                        )
                                                            .then(ret => {

                                                                if (ret === 1) {
                                                                    res.status(200).send({
                                                                        errorCode: 0,
                                                                        message: "Successfully!",
                                                                        uuid: req.body.uuid ? null : uid
                                                                    });

                                                                    return;
                                                                }
                                                                else {
                                                                    res.status(200).send({
                                                                        errorCode: 1,
                                                                        message: `Cannot update cart with id=${id_giohang},Maybe id is not existed or something wrong with payload`,
                                                                    });
                                                                }
                                                            })
                                                            .catch(err => {
                                                                res.status(200).send({
                                                                    errorCode: -1,
                                                                    message: err.message || "Something wrong while updating giohang"
                                                                });
                                                            })
                                                    }
                                                    else {

                                                        res.status(200).send({
                                                            errorCode: 1,
                                                            message: `No giohang found with id=${id_giohang}`,
                                                        });
                                                        return;
                                                    }
                                                })
                                                .catch(err => {

                                                    res.status(200).send({
                                                        errorCode: -1,
                                                        message: err.message || "Something wrong while retrieving giohang"
                                                    });
                                                })

                                        } else {

                                            res.status(200).send({
                                                errorCode: 1,
                                                message: `Cannot update detail cart with id=${da[0].id_giohangchitiet},Maybe id is not existed or something wrong with payload`,
                                            });
                                        }
                                    })
                                    .catch((err) => {
                                        res.status(200).send({
                                            errorCode: -1,
                                            message: err.message || "Something wrong while updating giohangchitiet"
                                        });
                                    });
                            } else {
                                const record = {
                                    id_giohang: dat[0].id_giohang,
                                    id_sanpham: req.params.id,
                                    gia: req.body.amount * gia_sp,
                                    soluong: req.body.amount
                                };
                                Giohangchitiet.create(record)
                                    .then(result => {

                                        Giohang.findByPk(id_giohang)
                                            .then(d => {
                                                if (d) {

                                                    Giohang.update(
                                                        {
                                                            // this is payload
                                                            tongtien: d.tongtien + req.body.amount * gia_sp,
                                                            so_luong: d.soluong + req.body.amount
                                                        },
                                                        {
                                                            where: {
                                                                id_giohang: id_giohang
                                                            }
                                                        }
                                                    )
                                                        .then(ret => {

                                                            if (ret === 1) {
                                                                res.status(200).send({
                                                                    errorCode: 0,
                                                                    message: "Successfully!",
                                                                    uuid: req.body.uuid ? null : uid
                                                                });

                                                                return;
                                                            }
                                                            else {
                                                                res.status(200).send({
                                                                    errorCode: 1,
                                                                    message: `Cannot update cart with id=${id_giohang},Maybe id is not existed or something wrong with payload`,
                                                                });
                                                            }
                                                        })
                                                        .catch(err => {
                                                            res.status(200).send({
                                                                errorCode: -1,
                                                                message: err.message || "Something wrong while updating giohang"
                                                            });
                                                        })
                                                }
                                                else {

                                                    res.status(200).send({
                                                        errorCode: 1,
                                                        message: `No giohang found with id=${id_giohang}`,
                                                    });
                                                    return;
                                                }
                                            })
                                            .catch(err => {

                                                res.status(200).send({
                                                    errorCode: -1,
                                                    message: err.message || "Something wrong while retrieving giohang"
                                                });
                                            })
                                    })
                                    .catch(err => {
                                        res.status(200).send({
                                            errorCode: -1,
                                            message: err.message || "Something wrong while creating new giohangchitiet"
                                        });
                                    })
                            }
                        })
                        .catch((err) => {
                            res.status(200).send({
                                errorCode: -1,
                                message: err.message || "Something wrong while retrieving giohangchitiet",
                            });
                        });
                }
                else {
                    res.stats(200).send({
                        errorCode: -1,
                        message: "Something wrong while retrieving giohang"
                    });
                }

            } else {

                res.status(200).send({
                    errorCode: 1,
                    message: "Can not find an customer with the given uuid",
                });
            }
        })
        .catch((err) => {
            res.status(200).send({
                errorCode: -1,
                message: err.message || "Something wrong while retrieving khachhang",
            });
        });
};
