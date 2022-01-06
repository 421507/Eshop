/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:15:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 15:09:55
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

    let resu=[];
    let promiseFunc=[];
    for(let i=0;i<lstIdLoaiSp.length;++i){

      promiseFunc.push(getAll({ page: 0, size: 4, type: lstIdLoaiSp[i] }));
      
    }
    const result = await Promise.all(promiseFunc);

    result.forEach(item=>{
      item.sanpham.forEach(it=>{
        resu.push({
          id_sanpham:it.id_sanpham,
          ten_sanpham:it.ten_sanpham,
          gia_sanpham:it.gia_sanpham,
          mieuta:it.mieuta,
          soluong_tonkho:it.soluong_tonkho,
          ngay_list:it.ngay_list,
          soluong_daban:it.soluong_daban,
          mau_sac:it.mau_sac,
          size:it.size,
          id_thuonghieu:it.id_thuonghieu,
          thumbnail:it.thumbnail,
          id_loaisp:it.id_loaisp
        });
      });
      
    });

    let samples = [];

    resu.forEach((item) => {

    
      const getNameType = (id) => {

        for(let i=0;i<types.length;++i){

          if(id === types[i].id_loaisp)
            return types[i].ten_loaisp;
        }

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

      const nameType = getNameType(item.id_loaisp);
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

    console.log(samples);

    isAuth(req)
      .then(result => {

        res.render('index',
          {
            products: products,
            brands: brands,
            types: types,
            samples: samples,
            auth: result,
          });
      })
      .catch(err => {
        console.log(err);
      })
  } catch (error) {
    console.log(error);
  }


}