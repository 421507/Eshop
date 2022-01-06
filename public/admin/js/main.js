/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 01:11:35
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 02:52:15
 */
$(document).ready(function(){

    $(function(){

        $('#login-form').submit(event=>{

            event.preventDefault();
            
            const username=$('input#username').val();
            const password=$('input#password').val();

            console.log(username);
            console.log(password);

            $.ajax({
                type:'POST',
                url:'http://localhost:3000/api/admin/login',
                data:{
                    username:username,
                    password:password
                }
            }).done(data=>{
                
                window.location.replace("/admin");
            }).fail(data=>{
                alert(data.responseText);
                console.log(data);
            })
        });

        $('#update-product-form').submit(event=>{

            event.preventDefault();

            const nameProduct=$('input#name').val();
            const description=$('textarea#description').val();
            const brand=$('select#brand option:selected').val();
            const type=$('select#type option:selected').val();
            const price=$('input#price').val();
            const isDiscount=$('#discount').is(':checked');
            let discount=0;
            let start="";
            let end="";

            const id=$('input#id_sanpham').val();

            if(isDiscount){

                discount=$('#discount-number').val();

                if(discount === ''){
                    alert("Please fill out fields");
                    return;
                }

                start=$('#start').val();
                if(start === ''){
                    alert("Please fill out fields");
                    return;
                }

                end=$('#end').val();
                if(end === ''){
                    alert("Please fill out fields");
                    return;
                }

                const startObj=new Date(start);
                const endObj=new Date(end);

                if(startObj >= endObj){
                    alert("Date invalid");
                    return;
                }

            }
            console.log(start);
            console.log(end);
            $.ajax({
                type:'PUT',
                url:`http://localhost:3000/api/admin/product/${id}`,
                data:{
                    nameProduct:nameProduct,
                    description:description,
                    brand:brand,
                    type:type,
                    price:price,
                    isDiscount:isDiscount,
                    discount:discount,
                    start:start,
                    end:end
                }
            }).done(data=>{

                alert(data);
                console.log(data);
            }).fail(data=>{
                alert(data.responseText);
                console.log(data.responseText);
            });

        });
        $('#update-present-form').submit(event=>{

            event.preventDefault();

            const name=$('input#name').val();
            const start=$('#date-created').val();
            const end=$('#date-expired').val();
            const amount=$('#amount').val();
            const type=$('#id_type').val();

            if(parseInt(amount) === 0){
                alert("Amount can not be empty");
                return;
            }

            const startObj=new Date(start);
            const endObj=new Date(end);

            if(startObj >= endObj){
                alert("Invalid date!")
                return;
            }

            const id=$('input#id_present').val();

            const payload={
                name:name,
                start:new Date(start).toISOString(),
                end:new Date(end).toISOString(),
                amount:amount,
                type:type
            };

            if(type === 'discount'){
                const discount=$('#price').val();
                if(parseInt(discount) === 0){
                    alert("Discount price must be greater than 0");
                    return;
                }
                payload.discount=discount;
            }
            else if(type === 'voucher'){
                const rows = $('input.select-row:checked');
                const vouchers=[];
                for (let index = 0; index < rows.length; index++) {
                    const element = rows[index];
                    const id=$(element).attr('id').split("_")[1];
                    const amount=$(`#amount-${id}`).val();
                    if(parseInt(amount) === 0){
                        alert("Amount can not be empty");
                        return;
                    }
                    else{
                        vouchers.push({
                            id:id,
                            amount:amount
                        });
                    }
                }

                if(vouchers.length === 0){
                    alert("Voucher must be at least 1 product");
                    return;
                }
                payload.vouchers=vouchers;
            }

            // console.log(payload);
            $.ajax({
                type:'PUT',
                url:`http://localhost:3000/api/admin/present/${id}`,
                data:payload
            }).done(data=>{

                alert(data);
                console.log(data);
            }).fail(data=>{
                alert(data.responseText);
                console.log(data.responseText);
            });

        });
        $('#update-order-form').submit(event=>{

            event.preventDefault();

            const nameShipper=$('input#name').val();
            const description=$('textarea#description').val();
            const numHouse=$('input#sonha').val();
            const street=$('input#steet').val();
            const ward=$('input#ward').val();
            const district=$('input#district').val();
            const city=$('select#city option:selected').val();
            const province=$('input#province').val();
            const status=$('select#status option:selected').val();

            const id=$('input#id_shipping').val();

            $.ajax({
                type:'PUT',
                url:`http://localhost:3000/api/admin/shipping/${id}`,
                data:{
                    nameShipper:nameShipper,
                    description:description,
                    numHouse:numHouse,
                    street:street,
                    ward:ward,
                    district:district,
                    province:province,
                    idCity:city,
                    idStatus:status
                }
            }).done(data=>{

                alert(data);
                console.log(data);
            }).fail(data=>{
                alert(data.responseText);
                console.log(data.responseText);
            });

        });

        $('#add-product-form').submit(event=>{
            event.preventDefault();

            const name=$('#name').val();
            const description=$('#description').val();
            const brand=$('#brand option:selected').val();
            const type=$('#type option:selected').val();
            const price=$('#price').val();
            const stock=$('#stock').val();
            let discount="";
            let start="";
            let end="";
            const isDiscount=$('#discount').is(':checked');

            if(isDiscount){
                discount=$('#discount-number').val();

                if(discount === ''){
                    alert("Please fill out fields");
                    return;
                }

                start=$('#start').val();
                if(start === ''){
                    alert("Please fill out fields");
                    return;
                }

                end=$('#end').val();
                if(end === ''){
                    alert("Please fill out fields");
                    return;
                }

                const startObj=new Date(start);
                const endObj=new Date(end);

                if(startObj >= endObj){
                    alert("Date invalid");
                    return;
                }
            }

            
            $.ajax({
                type:'POST',
                url:`http://localhost:3000/api/admin/product/`,
                data:{
                    name:name,
                    description:description,
                    brand:brand,
                    type:type,
                    price:price,
                    stock:stock,
                    isDiscount:isDiscount,
                    discount:discount,
                    start:new Date(start).toISOString(),
                    end:new Date(end).toISOString()
                }
            }).done(data=>{
                alert(data);
                console.log(data);
            }).fail(data=>{
                alert(data.responseText);
                console.log(data.responseText);
            });

        });

        $('#add-brand-form').submit(event=>{
            event.preventDefault();

            const name=$('#name').val();
            
            $.ajax({
                type:'POST',
                url:`http://localhost:3000/api/admin/brand/`,
                data:{
                    name:name,
                }
            }).done(data=>{
                alert(data);
                console.log(data);
            }).fail(data=>{
                alert(data.responseText);
                console.log(data.responseText);
            });

        });

        $('#add-type-form').submit(event=>{
            event.preventDefault();

            const name=$('#name').val();
            
            $.ajax({
                type:'POST',
                url:`http://localhost:3000/api/admin/type/`,
                data:{
                    name:name,
                }
            }).done(data=>{
                alert(data);
                console.log(data);
            }).fail(data=>{
                alert(data.responseText);
                console.log(data.responseText);
            });

        })
    });
});

function deleteProduct(id){

    $.ajax({
        type:'DELETE',
        url:`http://localhost:3000/api/admin/product/${id}`,
        data:{}
    }).done(data=>{
        alert(data);
        console.log(data);

        $(`tr#product-${id}`).remove();
    }).fail(data=>{
        alert(data.responseText);
        console.log(data);
    });

}

function deleteSelectedProducts(){

    let selectedProducts=localStorage.getItem("selected");

    if(selectedProducts === null || selectedProducts === ''){
        alert("Please choose products");
    }
    else{

        const _listProducts=selectedProducts.split(",");

        let listProducts=[];
        _listProducts.forEach(item=>{
            if (item !== '')
                listProducts.push(item);
        });

        $.ajax({
            type:'DELETE',
            url:`http://localhost:3000/api/admin/product/multidelete`,
            data:{
                ids:listProducts
            }
        }).done(data=>{
            alert(data);
            console.log(data);

            _listProducts.forEach(item=>{
                $(`tr#${item}`).remove();
            });

            localStorage.setItem('selected','');
            
        }).fail(data=>{
            alert(data.responseText);
            console.log(data.responseText);
        })

    }
}

function selectProducts(ele){

    const id=$(ele).attr('id').split("_")[1];

    const checked=$(ele).is(':checked') ? true : false;
    
    let selectedProducts=localStorage.getItem("selected");

    if(selectedProducts === null){

        selectedProducts=id;
    }
    else{

        const _listProducts=selectedProducts.split(",");

        let listProducts=[];
        _listProducts.forEach(item=>{
            if (item !== '')
                listProducts.push(item);
        });

        const index=listProducts.indexOf(id);

        if(checked){

            if(index === -1){
                listProducts.push(id);
            }
        }
        else{

            if(index > -1){
                listProducts.splice(index,1);
            }
        }

        selectedProducts="";

        listProducts.forEach(item=>{
            selectedProducts+=item+",";
        });
    }

    localStorage.setItem('selected',selectedProducts);
}

function selectProductsVoucher(ele){
    const id=$(ele).attr('id').split("_")[1];
    const checked=$(ele).is(':checked') ? true : false;
    
    if(checked){
        $(`input#amount-${id}`).attr('disabled',false);
        $(`#row-${id}`).prependTo("tbody");
    }
    else{
        $(`input#amount-${id}`).attr('disabled',true);
        $(`#row-${id}`).appendTo("tbody");
    }
    
}

function deleteBrand(id){

    $.ajax({
        type:'DELETE',
        url:`http://localhost:3000/api/admin/brand/${id}`,
        data:{}
    }).done(data=>{
        alert(data);
        console.log(data);

        $(`tr#brand-${id}`).remove();
    }).fail(data=>{
        alert(data.responseText);
        console.log(data);
    });

}

function deleteType(id){

    $.ajax({
        type:'DELETE',
        url:`http://localhost:3000/api/admin/type/${id}`,
        data:{}
    }).done(data=>{
        alert(data);
        console.log(data);

        $(`tr#type-${id}`).remove();
    }).fail(data=>{
        alert(data.responseText);
        console.log(data);
    });

}

function handleCheckDiscount(){

    if($('div.discount-group').hasClass("disabled")){
        $('div.discount-group').removeClass("disabled")
    }
    else{
        $('div.discount-group').addClass("disabled")
    }

}

function viewShippingDetail(element){

    window.location.href=`/admin/shippingdetails?id=${element}`;
    
}

function viewProductDetail(element){
    window.location.href=`/admin/productdetails?id=${element.split('-')[1]}`
}

function viewPresentDetail(element){
    window.location.href=`/admin/presentdetail?id=${element.split('-')[1]}`;
}