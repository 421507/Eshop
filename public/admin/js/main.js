/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 01:11:35
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-05 16:32:01
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

            const id=$('input#id_sanpham').val();

            $.ajax({
                type:'PUT',
                url:`http://localhost:3000/api/admin/product/${id}`,
                data:{
                    nameProduct:nameProduct,
                    description:description,
                    brand:brand,
                    type:type,
                    price:price
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