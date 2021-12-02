/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:15:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 17:38:14
 */
const db = require("../models/db");
const Sanpham = db.sanpham;
const Op = require("sequelize");
const { getAll,getByPk } = require('./service/sanpham');
const { getAllByProduct } = require('./service/hinhanh');

exports.renderProductList = (req, res) => {

  
  const page = req.query.page && parseInt(req.query.page) > -1 ? parseInt(req.query.page) : 0;

  getAll(page).then(result=>{
    
    console.log('Result :',result);

    const idSp=result.sanpham.map(item=>item.id_sanpham);

    getAllByProduct(idSp)
    .then(data=>{

      const products=result.sanpham.map((item,index)=>{

        return {
          gia_sanpham: item.gia_sanpham,
          ten_sanpham: item.ten_sanpham,
          url_product: `/product-details?id=${item.id_sanpham}`,
          url: data.url[index].url
        };

        
      });

      res.render(
        'products',
        {
          data:products,
          pages:result.pages,
          needArrow:result.needArrow,
          arrowUrl:result.arrowUrl
        }
      );
    })
    .catch(err=>{

    });
  
    // let products = [];

    // result.sanpham.map(item => {

    //   getAllByProduct(item.id_sanpham).then(res=>{
    //     products.push({
    //       gia_sanpham: item.gia_sanpham,
    //       ten_sanpham: item.ten_sanpham,
    //       url_product: `/product-details?id=${item.id_sanpham}`,
    //       url: res.url[0].url
    //     });
        
    //   }).catch(err=>{

    //   });

    // });

    
  })
  .catch(err=>{

  });
};


exports.renderProductDetail=(req,res)=>{

  if(!req.query.id){

  }

  
  console.log(req.query.id);
  console.log(typeof req.query.id);


  getByPk(parseInt(req.query.id))
  .then(result=>{
    const data={};

    getAllByProduct(result.data.id_sanpham)
    .then(resu=>{

      const detailImg=resu.url[0].url;

      const similarImg=[resu.url[2].url,resu.url[3].url,resu.url[4].url];

      const name=result.data.ten_sanpham;
      const id=result.data.id_sanpham;

      const price=result.data.gia_sanpham;

      const availability=result.data.soluong_tonkho > 0? 'In Stock' : 'Sold out';

      data.detailImg=detailImg;
      data.similarImg=similarImg;
      data.name=name;
      data.id=id;
      data.price=price;
      data.availability=availability;

      console.log(data);


      res.render('product-details',{data:data});

    })
    .catch(err=>{

    });
  })
  .catch(err=>{

  });

}

exports.renderHomePage=(req,res)=>{

  getAll(0).then(data=>{

    const idSp=data.sanpham.map(item=>item.id_sanpham);
    
    getAllByProduct(idSp)
    .then(result=>{
    
      let products=[];
      for(let i=0;i<6;++i){
        console.log(i);
        console.log(data.sanpham[i].gia_sanpham);
        console.log(data.sanpham[i].ten_sanpham);
        console.log(result.url[i].url);
        products.push({
          gia_sanpham:data.sanpham[i].gia_sanpham,
          ten_sanpham:data.sanpham[i].ten_sanpham,
          url:result.url[i].url
        });


      }

      console.log('blah blah blah');

      res.render('index',{data:products});
      
    })
    .catch(err=>{

    });
  })
  .catch(err=>{

  });

}