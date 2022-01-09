/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:15:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:14:50
 */

const { getAll,_getAll:_productGetAll,getProductHomePage,getSamples } = require('./service/sanpham');
const { getAll: brandgetAll } = require('./service/thuonghieu');
const { getAll: typeGetAll } = require('./service/loaisanpham');
const { getAll: typeBrandGetAll } = require('./service/loaisp_thuonghieu');

exports.renderHomePage = async (req, res) => {

  const { isAuth } = require('./service/auth');

  try {
    const data = await getProductHomePage();

    let products =data.map(item=>{
      return{
        gia_sanpham: item.gia_sanpham,
        ten_sanpham: item.ten_sanpham,
        url: item.thumbnail,
        url_product: `/product-details?id=${item.id_sanpham}`
      }
    })

    const brands = req.brands;

    brands.forEach((item, index) => {

      brands[index].url = `/products?brand=${item.id_thuonghieu}`;
    });

    const types = req.types;

    const typeBrand = await typeBrandGetAll({});
    const lstIdLoaiSp = [];

    types.forEach((item, index) => {

      if (item.ten_loaisp === "T-shirt" ||
        item.ten_loaisp === "Blazers" ||
        item.ten_loaisp === "Sunglass" ||
        item.ten_loaisp === "Shoes" ||
        item.ten_loaisp === "Polo shirt")
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
    // let promiseFunc=[];
    console.log("AAAAAAAAAAAAAAAAA ",lstIdLoaiSp);
    // for(let i=0;i<lstIdLoaiSp.length;++i){

    //   promiseFunc.push(getAll({ page: 0, size: 4, type: lstIdLoaiSp[i] }));
      
    // }
    // const result = await Promise.all(promiseFunc);
    const result = await _productGetAll({
      id_loaisp:lstIdLoaiSp
    });
    
    // console.log(result);
    const table={};
    lstIdLoaiSp.forEach(item=>{
      table[`type_${item}`]=0;
    });
    
    result.forEach(item=>{
      
      function check(id){
        if(table[`type_${id}`] < 4)
          return false;
        return true;
      }

      if(!check(item.id_loaisp)){
        table[`type_${item.id_loaisp}`]=table[`type_${item.id_loaisp}`]+1;
        resu.push({
          id_sanpham:item.id_sanpham,
          ten_sanpham:item.ten_sanpham,
          gia_sanpham:item.gia_sanpham,
          mieuta:item.mieuta,
          soluong_tonkho:item.soluong_tonkho,
          ngay_list:item.ngay_list,
          soluong_daban:item.soluong_daban,
          mau_sac:item.mau_sac,
          size:item.size,
          id_thuonghieu:item.id_thuonghieu,
          thumbnail:item.thumbnail,
          id_loaisp:item.id_loaisp
        });
      }
      
    });

    console.log(table);

    // console.log(resu);

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

            if (data[i].id_loaisp === name)
              return i;
          }
        }

        return -1;
      }

      const nameType = getNameType(item.id_loaisp);
      const index = check(samples, item.id_loaisp);
      if (index !== -1) {

        samples[index].data = [
          ...samples[index].data, {
            thumbnail: item.thumbnail,
            gia_sp: item.gia_sanpham,
            id_loaisp:item.id_loaisp,
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
            id_loaisp:item.id_loaisp,
            url: `#${nameType.replace(/\s/g, '')}`,
            identify: nameType.replace(/\s/g, ''),
            data: [{
              thumbnail: item.thumbnail,
              gia_sp: item.gia_sanpham,
              id_loaisp:item.id_loaisp,
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
            id_loaisp:item.id_loaisp,
            url: `#${nameType.replace(/\s/g, '')}`,
            identify: nameType.replace(/\s/g, ''),
            data: [{
              thumbnail: item.thumbnail,
              gia_sp: item.gia_sanpham,
              id_loaisp:item.id_loaisp,
              ten_sanpham: item.ten_sanpham,
              url: `/product-details?id=${item.id_sanpham}`
            }]
          }];
        }
      }

    });

    // console.log(products);
    console.log(samples);
    const auth=await isAuth(req);
    res.render('index',{
      products: products,
      brands: brands,
      types: types,
      samples: samples,
      auth: auth,
    });
    
  } catch (error) {
    console.log(error);
  }


}