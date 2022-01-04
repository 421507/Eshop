/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-31 23:30:40
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 15:01:18
 */
const db = require("../../models/index");
const Voucher = db.voucher;
const {
    remove:customerPresentRemove
}=require('./khachhang_present');
const{
    remove:presentRemove
}=require('./present');

exports.getAll=async props=>{

    const condition={};

    if(props.id !== undefined){
        condition.id=props.id;
    }
    if(props.id_sanpham !== undefined){
        condition.id_sanpham=props.id_sanpham;
    }
    if(props.so_luong !== undefined){
        condition.so_luong=props.so_luong;
    }
    if(props.id_present !== undefined){
        condition.id_present=props.id_present;
    }

    try {
        const result=await Voucher.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.remove=async props=>{

    const condition={};

    if(props.id_sanpham !== undefined)
        condition.id_sanpham=props.id_sanpham;

    try {
        
        let bucket=[];
        
        let vouchers=await this.getAll({id_sanpham:props.id_sanpham});

        vouchers.forEach(item=>{

            function getIndex(id_present){

                if(bucket.length === 0){
                    bucket.push({
                        id_present:id_present,
                        count:0
                    });

                    return 0;
                }
                else{
                    let i=0;
                    while(i < bucket.length){
                        if(bucket[i].id_present === id_present)
                            return i;
                        i+=1;
                    }

                    bucket.push({
                        id_present:id_present,
                        count:0
                    });

                    return i;
                }
            }   
            
            const index=getIndex(item.id_present);

            bucket[index].count+=1;

        });

        let result=await Voucher.destroy({where:condition});
        
        const idPresents=bucket.map(item=>{
            if (item.count === 1){
                return item.id_present;
            }
        });

        if(idPresents.length > 0){
            result = await customerPresentRemove({id_present:idPresents});

            result=await presentRemove({id:idPresents});
        }

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}