/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-31 23:30:40
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 14:47:20
 */
const db = require("../../models/index");
const Voucher = db.voucher;
const {
    turnOff:customerPresentTurnOff
}=require('./khachhang_present');
const{
    remove:presentRemove,
    update:presentUpdate
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
    if(props.id_present !== undefined)
        condition.id_present=props.id_present;
        
    try {
        
        if(props.id_sanpham !== undefined){
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
                result = await customerPresentTurnOff({id_present:idPresents});

                result=await presentRemove({id:idPresents});
            }

            return result;
        }
        else if(props.id_present !== undefined){
            const result =await Voucher.destroy({where:condition});

            return result;
        }
        
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.multiCreate=async props=>{

    try {
        const result=Voucher.bulkCreate(props);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.update=async props=>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;
    const field={};

    if(props.so_luong !== undefined)
        field.so_luong=props.so_luong;

    try {
        const result=await Voucher.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.createOrUpdate=async props=>{
    const id_present=props.id_present;
    const newVouchers=props.vouchers;
    
    const vouchers=await this.getAll({
        id_present:id_present
    });
    const unselectProducts=[];
    const selectProducts=[];
    const idProducts=[];
    console.log(newVouchers);
    newVouchers.forEach(item=>{

        idProducts.push(item.id);
        
        function getVoucher(id){
            for (let index = 0; index < vouchers.length; index++) {
                const element = vouchers[index];
                if(element.id_sanpham === id)
                    return element;
            }
            return null;
        }

        const voucher=getVoucher(parseInt(item.id));
        if(voucher !== null){
            selectProducts.push({
                id:voucher.id,
                amount:item.amount
            });
        }
        else{
            unselectProducts.push({
                id_sanpham:item.id,
                so_luong:item.amount,
                id_present:id_present
            });
        }
    });

    if(unselectProducts.length > 0){
        let result=await this.multiCreate(unselectProducts);
    }
    if(selectProducts.length > 0){
        const promiseFunc=[];
    
        for (let index = 0; index < selectProducts.length; index++) {
            const element = selectProducts[index];
            promiseFunc.push(this.update({
                id:element.id,
                so_luong:element.amount
            }));
        }

        if(promiseFunc.length > 0){
            let result = await Promise.all(promiseFunc);

            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                if(element ===  null)
                    return null;
            }
        }
    }
    const{
        _getAll,
    }=require('./sanpham');
    
    const products=await _getAll({id_sanpham:idProducts});

    let value=0;

    products.forEach(item=>{

        function getVoucher(id){
            for (let index = 0; index < newVouchers.length; index++) {
                const element = newVouchers[index];
                if(parseInt(element.id) === id)
                    return element;
            }
            return null;
        }
        const voucher=getVoucher(item.id_sanpham);
        
        value+=item.gia_sanpham*parseInt(voucher.amount);

    });

    let result=await presentUpdate({
        id:id_present,
        so_tien:value
    });

    return result;
}

exports.create=async props=>{

    const id_present=props.id_present;
    const newVouchers=props.vouchers;
    
    const vouchers = newVouchers.map(item=>{

        return({
            id_sanpham:item.id,
            so_luong:item.amount,
            id_present:id_present
        });
    });

    let result=await this.multiCreate(vouchers);

    return result;

}