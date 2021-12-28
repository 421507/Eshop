/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:15:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-29 00:07:07
 */

const { getAll } = require('./service/sanpham');
const { getAll: brandgetAll } = require('./service/thuonghieu');
const { getAll: typeGetAll } = require('./service/loaisanpham');
const { getAll: typeBrandGetAll } = require('./service/loaisp_thuonghieu');

exports.renderHomePage = async (req, res) => {

  const { isAuth } = require('./service/auth');

  try {
    const data = await getAll({ page: 0, size: 6 });

    let products = [];
    for (let i = 0; i < 6; ++i) {

      products.push({
        gia_sanpham: data.sanpham[i].gia_sanpham,
        ten_sanpham: data.sanpham[i].ten_sanpham,
        url: data.sanpham[i].thumbnail,
        url_product: `/product-details?id=${data.sanpham[i].id_sanpham}`
      });
    }

    const brands = await brandgetAll({});

    brands.forEach((item, index) => {

      brands[index].url = `/products?brand=${item.id_thuonghieu}`;
    });

    const types = await typeGetAll();

    const typeBrand = await typeBrandGetAll();
    const lstIdLoaiSp = [];

    types.forEach((item, index) => {

      if (item.ten_loaisp === "t-shirt" ||
        item.ten_loaisp === "blazers" ||
        item.ten_loaisp === "sunglass" ||
        item.ten_loaisp === "kids" ||
        item.ten_loaisp === "polo shirt")
        lstIdLoaiSp.push(item.id_loaisp);


      types[index].url = `/products?type=${item.id_loaisp}`;

      const lstTmp = [];
      typeBrand.forEach(it => {

        if (it.id_loaisp === item.id_loaisp) {

          lstTmp.push({
            link: `/products?type=${item.id_loaisp}&brand=${it.id_thuonghieu}`,
            ten_thuonghieu: it.ten_thuonghieu
          });
        }
      });
      types[index].isSubUrl = false;
      if (lstTmp.length > 0) {
        types[index].url = `#${item.ten_loaisp}`
        types[index].isSubUrl = true;
        types[index].suburl = lstTmp;
      }

    });

    const resu = await getAll({ page: 0, size: 20, type: lstIdLoaiSp });

    let samples = [];

    resu.sanpham.forEach((item) => {

      const getName = (id) => {

        for (let i = 0; i < types.length; ++i)
          if (types[i].id_loaisp === id)
            return types[i].ten_loaisp;
      }
      const getNameType = (idsp, data) => {

        for (let i = 0; i < data.length; ++i)
          if (data[i].id_sanpham === idsp)
            return getName(data[i].id_loaisp);

      }

      const check = (data, name) => {

        if (data.length > 0) {

          for (let i = 0; i < data.length; ++i) {

            if (data[i].ten_loaisp === name)
              return i;
          }
        }

        return -1;
      }

      const nameType = getNameType(item.id_sanpham, resu.table);
      const index = check(samples, nameType);
      if (index !== -1) {

        samples[index].data = [
          ...samples[index].data, {
            thumbnail: item.thumbnail,
            gia_sp: item.gia_sanpham,
            ten_sanpham: item.ten_sanpham,
            url: `/product-details?id=${item.id_sanpham}`
          }];
      }
      else {

        if (samples.length === 0) {
          samples = [...samples,
          {
            isActive: true,
            ten_loaisp: nameType,
            url: `#${nameType.replace(/\s/g, '')}`,
            identify: nameType.replace(/\s/g, ''),
            data: [{
              thumbnail: item.thumbnail,
              gia_sp: item.gia_sanpham,
              ten_sanpham: item.ten_sanpham,
              url: `/product-details?id=${item.id_sanpham}`
            }]
          }];
        }
        else {
          samples = [...samples,
          {
            isActive: false,
            ten_loaisp: nameType,
            url: `#${nameType.replace(/\s/g, '')}`,
            identify: nameType.replace(/\s/g, ''),
            data: [{
              thumbnail: item.thumbnail,
              gia_sp: item.gia_sanpham,
              ten_sanpham: item.ten_sanpham,
              url: `/product-details?id=${item.id_sanpham}`
            }]
          }];
        }
      }

    });

    isAuth(req)
      .then(result => {
        res.render('index',
          {
            products: products,
            brands: brands,
            types: types,
            samples: samples,
            auth: result
          });
      })
      .catch(err => {
        console.log(err);
      })
  } catch (error) {
    console.log(error);
  }


}