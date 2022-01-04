/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 01:11:35
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 21:15:02
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

        $(`tr#${id}`).remove();
    }).fail(data=>{
        alert(data.responseText);
        console.log(data);
    });

}