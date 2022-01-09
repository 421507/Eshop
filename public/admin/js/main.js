/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 01:11:35
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 04:42:12
 */
$(document).ready(function () {

    $(function () {

        $('#reply-form').submit(event=>{

            event.preventDefault();

            const subject=$('#subject').val();
            const message=$('#message').val();

            const id=$('#id-noti').val();
            
            const payload={
                subject:subject,
                message:message
            }
            $.ajax({
                type:'POST',
                url:`http://localhost:3000/api/admin/notification/${id}`,
                data:payload
            }).done(data=>{
                alert(data);
                console.log(data);

                window.location.href='/admin';
            }).fail(data=>{
                alert(data.responseText);
                console.log(data.responseText);
            })
        });

        $('#login-form').submit(event => {

            event.preventDefault();

            const username = $('input#username').val();
            const password = $('input#password').val();

            console.log(username);
            console.log(password);
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/admin/login',
                data: {
                    username: username,
                    password: password
                }
            }).done(data => {

                window.location.replace("/admin");
            }).fail(data => {
                alert(data.responseText);
                console.log(data);
            })
        });

        $('#update-product-form').submit(event => {

            event.preventDefault();

            const nameProduct = $('input#name').val();
            const description = $('textarea#description').val();
            const brand = $('select#brand option:selected').val();
            const type = $('select#type option:selected').val();
            const price = $('input#price').val();
            const isDiscount = $('#discount').is(':checked');
            let discount = 0;
            let start = "";
            let end = "";

            const id = $('input#id-sanpham').val();

            if(id === undefined || id === null || id === ""){
                alert("ID invalid ",id);
                return;
            }

            if (isDiscount) {

                discount = $('#discount-number').val();

                if (discount === '') {
                    alert("Please fill out fields");
                    return;
                }

                start = $('#start').val();
                if (start === '') {
                    alert("Please fill out fields");
                    return;
                }

                end = $('#end').val();
                if (end === '') {
                    alert("Please fill out fields");
                    return;
                }

                const startObj = new Date(start);
                const endObj = new Date(end);

                if (startObj >= endObj) {
                    alert("Date invalid");
                    return;
                }

            }
            console.log(start);
            console.log(end);
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/product/${id}`,
                data: {
                    nameProduct: nameProduct,
                    description: description,
                    brand: brand,
                    type: type,
                    price: price,
                    isDiscount: isDiscount,
                    discount: discount,
                    start: start,
                    end: end
                }
            }).done(data => {

                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });
        $('#update-present-form').submit(event => {

            event.preventDefault();

            const name = $('input#name').val();
            const start = $('#date-created').val();
            const end = $('#date-expired').val();
            const amount = $('#amount').val();
            const type = $('#id_type').val();

            if (parseInt(amount) === 0) {
                alert("Amount can not be empty");
                return;
            }

            const startObj = new Date(start);
            const endObj = new Date(end);

            if (startObj >= endObj) {
                alert("Invalid date!")
                return;
            }

            const id = $('input#id_present').val();

            const payload = {
                name: name,
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString(),
                amount: amount,
                type: type
            };

            if (type === 'discount') {
                const discount = $('#price').val();
                if (parseInt(discount) === 0) {
                    alert("Discount price must be greater than 0");
                    return;
                }
                payload.discount = discount;
            }
            else if (type === 'voucher') {
                const rows = $('input.select-row:checked');
                const vouchers = [];
                for (let index = 0; index < rows.length; index++) {
                    const element = rows[index];
                    const id = $(element).attr('id').split("_")[1];
                    const amount = $(`#amount-${id}`).val();
                    if (parseInt(amount) === 0) {
                        alert("Amount can not be empty");
                        return;
                    }
                    else {
                        vouchers.push({
                            id: id,
                            amount: amount
                        });
                    }
                }

                if (vouchers.length === 0) {
                    alert("Voucher must be at least 1 product");
                    return;
                }
                payload.vouchers = vouchers;
            }

            // console.log(payload);
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/present/${id}`,
                data: payload
            }).done(data => {

                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });
        $('#update-order-form').submit(event => {

            event.preventDefault();

            const nameShipper = $('input#name').val();
            const description = $('textarea#description').val();
            const numHouse = $('input#sonha').val();
            const street = $('input#steet').val();
            const ward = $('input#ward').val();
            const district = $('input#district').val();
            const city = $('select#city option:selected').val();
            const province = $('input#province').val();
            const status = $('select#status option:selected').val();
            const id_cart = $('#id_cart').val();

            const id = $('input#id_shipping').val();

            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/shipping/${id}`,
                data: {
                    nameShipper: nameShipper,
                    description: description,
                    numHouse: numHouse,
                    street: street,
                    ward: ward,
                    district: district,
                    province: province,
                    idCity: city,
                    idStatus: status,
                    id_giohang:id_cart
                }
            }).done(data => {

                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });

        $('#add-product-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();
            const description = $('#description').val();
            const brand = $('#brand option:selected').val();
            const type = $('#type option:selected').val();
            const price = $('#price').val();
            const stock = $('#stock').val();
            let discount = "";
            let start = "";
            let end = "";
            const isDiscount = $('#discount').is(':checked');

            if (isDiscount) {
                discount = $('#discount-number').val();

                if (discount === '') {
                    alert("Please fill out fields");
                    return;
                }

                start = $('#start').val();
                if (start === '') {
                    alert("Please fill out fields");
                    return;
                }

                end = $('#end').val();
                if (end === '') {
                    alert("Please fill out fields");
                    return;
                }

                const startObj = new Date(start);
                const endObj = new Date(end);

                if (startObj >= endObj) {
                    alert("Date invalid");
                    return;
                }
            }

            const payload={
                name: name,
                description: description,
                brand: brand,
                type: type,
                price: price,
                stock: stock,
                isDiscount: isDiscount,
                discount: discount,
            }

            if(isDiscount){
                
                payload.start=new Date(start).toISOString();
                payload.end=new Date(end).toISOString();
            }


            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/product/`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);

                $('#id-sanpham').val(data.id);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });

        $('#add-brand-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();

            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/brand/`,
                data: {
                    name: name,
                }
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });
        $('#add-city-form').submit(event => {
            event.preventDefault();

            const city = $('#city').val();
            const zipcode = $('#zipcode').val();
            const price = $('#price').val();
            const slug = $('#slug').val();

            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/city/`,
                data: {
                    city:city,
                    zipcode:zipcode,
                    price:price,
                    slug:slug
                }
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-city-form').submit(event => {
            event.preventDefault();
            const city = $('#city').val();
            const zipcode = $('#zipcode').val();
            const price = $('#price').val();
            const slug = $('#slug').val();

            const payload = {
                city:city,
                zipcode:zipcode,
                price:price,
                slug:slug
            }
            const id=$('#id-city').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/city/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#add-methodpayment-form').submit(event => {
            event.preventDefault();

            const status = $('#status').val();
            const slug = $('#slug').val();

            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/methodpayment/`,
                data: {
                    status:status,
                    slug:slug
                }
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-methodpayment-form').submit(event => {
            event.preventDefault();
            const name = $('#name').val();
            const slug = $('#slug').val();

            const payload = {
                name:name,
                slug:slug
            }
            const id=$('#id-methodpayment').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/methodpayment/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#add-statuspayment-form').submit(event => {
            event.preventDefault();

            const status = $('#status').val();
            const slug = $('#slug').val();

            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/statuspayment/`,
                data: {
                    status:status,
                    slug:slug
                }
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-statuspayment-form').submit(event => {
            event.preventDefault();
            const name = $('#name').val();
            const slug = $('#slug').val();

            const payload = {
                name:name,
                slug:slug
            }
            const id=$('#id-statuspayment').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/statuspayment/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });

        $('#add-statusdelivery-form').submit(event => {
            event.preventDefault();

            const status = $('#status').val();
            const slug = $('#slug').val();

            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/statusdelivery/`,
                data: {
                    status: status,
                    slug:slug
                }
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });
        $('#add-typebrand-form').submit(event => {
            event.preventDefault();

            const type = $('#type option:selected').val();
            const brand = $('#brand option:selected').val();

            const payload={
                type:type,
                brand:brand
            }
            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/typebrand/`,
                data: payload
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });

        $('#add-present-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();
            const start = $('#date-created').val();
            const end = $('#date-expired').val();
            const type = $('#type option:selected').val();
            const amount = $('#amount').val();

            const startObj = new Date(start);
            const endObj = new Date(end);
            const now = new Date();

            if (startObj.getTime() >= endObj.getTime()) {
                alert('Invalid date!')
                return;
            }
            else if ((now.getTime() - startObj.getTime()) >= 86400000) {
                alert('Invalid date!')
                return;
            }

            if (parseInt(amount) === 0) {
                alert("Amount can not be empty");
                return;
            }
            const payload = {
                name: name,
                type: type,
                start: startObj.toISOString(),
                end: endObj.toISOString(),
                amount: amount
            }
            if (type === 'discount') {
                const price = $('#price').val();
                if (price === '') {
                    alert("Price must not be empty");
                    return;
                }
                payload.price = price;
            }
            else if (type === 'voucher') {
                const rows = $('input.select-row:checked');
                const vouchers = [];
                for (let index = 0; index < rows.length; index++) {
                    const element = rows[index];
                    const id = $(element).attr('id').split("_")[1];
                    const amount = $(`#amount-${id}`).val();
                    if (parseInt(amount) === 0) {
                        alert("Amount can not be empty");
                        return;
                    }
                    else {
                        vouchers.push({
                            id: id,
                            amount: amount
                        });
                    }
                }

                if (vouchers.length === 0) {
                    alert("Voucher must be at least 1 product");
                    return;
                }
                payload.vouchers = vouchers;
            }

            console.log(payload);

            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/present/`,
                data: payload
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });
        $('#add-type-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();

            $.ajax({
                type: 'POST',
                url: `http://localhost:3000/api/admin/type/`,
                data: {
                    name: name,
                }
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });

        });

        $('#update-account-form').submit(event => {

            event.preventDefault();

            const name = $('#name').val();
            const email = $('#email').val();
            const phone = $('#phone').val();
            const numHouse = $('#sonha').val();
            const street = $('#street').val();
            const ward = $('#ward').val();
            const district = $('#district').val();
            const province = $('#province').val();
            const city = $('#city option:selected').val();
            const id = $('#id-account').val();

            const payload = {
                name: name,
                email: email,
                phone: phone,
                numHouse: numHouse,
                street: street,
                ward: ward,
                district: district,
                idCity: city,
                province: province,
            }
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/user/${id}`,
                data: payload
            }).done(data => {
                alert(data);
                console.log(dat);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-profile-form').submit(event => {

            event.preventDefault();

            const name = $('#name').val();
            const email = $('#email').val();
            const phone = $('#phone').val();
            const numHouse = $('#sonha').val();
            const street = $('#street').val();
            const ward = $('#ward').val();
            const district = $('#district').val();
            const province = $('#province').val();
            const city = $('#city option:selected').val();
            const id = $('#id-user').val();

            const payload = {
                name: name,
                email: email,
                phone: phone,
                numHouse: numHouse,
                street: street,
                ward: ward,
                district: district,
                idCity: city,
                province: province,
            }
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/user/${id}`,
                data: payload
            }).done(data => {
                alert(data);
                console.log(dat);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-customer-form').submit(event => {

            event.preventDefault();

            const name = $('#name').val();
            const email = $('#email').val();
            const phone = $('#phone').val();
            const uuid = $('#uuid').val();
            const iduser = $('#user option:selected').val();
            const id = $('#id-customer').val();

            const payload = {
                name: name,
                email: email,
                phone: phone,
                uuid: uuid,
                user: iduser,
            }
            console.log(payload);
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/customer/${id}`,
                data: payload
            }).done(data => {
                alert(data);
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });

        $('#add-account-form').submit(event => {
            event.preventDefault();

            const username = $('#username').val();
            const password = $('#password').val();
            const email = $('#email').val();
            const name = $('#name').val();
            const payload = {
                username: username,
                password: password,
                email:email,
                name:name
            }
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/admin/register',
                data: payload
            }).done(data => {
                alert(data);
                console.log(data);
                // $('#id-account').val(data.id);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });

        $('#update-group-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();
            const slug = $('#slug').val();

            const payload = {
                name: name,
                slug: slug
            }

            const rows = $('input.select-row:checked');
            const idUsers = [];
            for (let index = 0; index < rows.length; index++) {
                const element = rows[index];
                const id = $(element).attr('id');
                idUsers.push(id);
            }

            payload.idUsers = idUsers.length > 0 ? idUsers : "";
            console.log(payload);
            const id = $('#id_group').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/group/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
                $('#id-account').val(data.id);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-brand-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();

            const payload = {
                name: name,
            }
            const id=$('#id-brand').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/brand/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-statusdelivery-form').submit(event => {
            event.preventDefault();

            const status = $('#status').val();
            const slug = $('#slug').val();

            const payload = {
                status: status,
                slug:slug
            }
            const id=$('#id-statusdelivery').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/statusdelivery/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-type-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();

            const payload = {
                name: name,
            }
            const id=$('#id-type').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/type/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#update-typebrand-form').submit(event => {
            event.preventDefault();

            const type = $('#type option:selected').val();
            const brand = $('#brand option:selected').val();

            const payload = {
                type: type,
                brand:brand
            }
            const id=$('#id-typebrand').val();
            $.ajax({
                type: 'PUT',
                url: `http://localhost:3000/api/admin/typebrand/${id}`,
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
        $('#add-group-form').submit(event => {
            event.preventDefault();

            const name = $('#name').val();
            const slug = $('#slug').val();

            const payload = {
                name: name,
                slug: slug
            }

            const rows = $('input.select-row:checked');
            const idUsers = [];
            for (let index = 0; index < rows.length; index++) {
                const element = rows[index];
                const id = $(element).attr('id');
                idUsers.push(id);
            }

            payload.idUsers = idUsers.length > 0 ? idUsers : "";

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/admin/group',
                data: payload
            }).done(data => {
                alert("OK");
                console.log(data);
                $('#id-account').val(data.id);
            }).fail(data => {
                alert(data.responseText);
                console.log(data.responseText);
            });
        });
    });
});

function deleteProduct(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/product/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);

        $(`tr#product-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data);
    });

}

function deletePresent(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/present/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);

        $(`tr#${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data);
    });
}
function deleteCustomer(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/customer/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);

        $(`tr#${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data);
    });
}

function deleteSelectedProducts() {

    let selectedProducts = localStorage.getItem("selected");

    if (selectedProducts === null || selectedProducts === '') {
        alert("Please choose products");
    }
    else {

        const _listProducts = selectedProducts.split(",");

        let listProducts = [];
        _listProducts.forEach(item => {
            if (item !== '')
                listProducts.push(item);
        });

        $.ajax({
            type: 'DELETE',
            url: `http://localhost:3000/api/admin/product/multidelete`,
            data: {
                ids: listProducts
            }
        }).done(data => {
            alert(data);
            console.log(data);

            _listProducts.forEach(item => {
                $(`tr#product-${item}`).remove();
            });

            localStorage.setItem('selected', '');

        }).fail(data => {
            alert(data.responseText);
            console.log(data.responseText);
        })

    }
}

function selectProducts(ele) {

    const id = $(ele).attr('id').split("_")[1];

    const checked = $(ele).is(':checked') ? true : false;

    let selectedProducts = localStorage.getItem("selected");

    if (selectedProducts === null) {

        selectedProducts = id;
    }
    else {

        const _listProducts = selectedProducts.split(",");

        let listProducts = [];
        _listProducts.forEach(item => {
            if (item !== '')
                listProducts.push(item);
        });

        const index = listProducts.indexOf(id);

        if (checked) {

            if (index === -1) {
                listProducts.push(id);
            }
        }
        else {

            if (index > -1) {
                listProducts.splice(index, 1);
            }
        }

        selectedProducts = "";

        listProducts.forEach(item => {
            selectedProducts += item + ",";
        });
    }

    localStorage.setItem('selected', selectedProducts);
}

function selectProductsVoucher(ele) {
    const id = $(ele).attr('id').split("_")[1];
    const checked = $(ele).is(':checked') ? true : false;

    if (checked) {
        $(`input#amount-${id}`).attr('disabled', false);
        $(`#row-${id}`).prependTo("tbody");
    }
    else {
        $(`input#amount-${id}`).attr('disabled', true);
        $(`#row-${id}`).appendTo("tbody");
    }

}

function deleteBrand(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/brand/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);

        $(`tr#brand-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data);
    });

}

function deleteType(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/type/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);

        $(`tr#type-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data);
    });

}

function handleCheckDiscount() {

    if ($('div.discount-group').hasClass("disabled")) {
        $('div.discount-group').removeClass("disabled")
    }
    else {
        $('div.discount-group').addClass("disabled")
    }

}

function viewShippingDetail(element) {

    window.location.href = `/admin/shippingdetails?id=${element}`;

}

function viewProductDetail(element) {
    window.location.href = `/admin/productdetails?id=${element}`
}

function viewPresentDetail(element) {
    window.location.href = `/admin/presentdetail?id=${element.split('-')[1]}`;
}

function handlePresentType(element) {

    const type = $(`#${element} option:selected`).val();

    if (type === "discount") {
        $('#price').attr('disabled', false);
        if (!$('#products').hasClass('disabled')) {
            $('#products').addClass('disabled')
        }
    }
    else {
        $('#price').attr('disabled', true);
        if ($('#products').hasClass('disabled')) {
            $('#products').removeClass('disabled')
        }
    }

}

function viewAccountDetail(id) {
    window.location.href = `/admin/accountdetail?id=${id}`;

}
function viewGroupDetail(id) {
    window.location.href = `/admin/groupdetail?id=${id}`;
}
function viewPermissionDetail(id) {
    window.location.href = `/admin/permissiondetail?id=${id}`;
}

function updatePermission() {

    const rows = $('input.select-row:checked');
    const idGroups = [];
    const id = $('#id-account').val();

    if (id === '') {
        alert("ID account not found");
        return;
    }

    for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        const id = $(element).attr('id');

        idGroups.push(id);
    }

    const payload = {
        idGroups: idGroups.length === 0 ? "" : idGroups
    }
    console.log(payload);
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/api/admin/permission/${id}`,
        data: payload
    }).done(data => {
        alert(data);
        console.log(data);
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}

function selectGroup(ele) {

    const id = $(ele).attr('id');
    const checked = $(ele).is(':checked') ? true : false;

    if (checked) {
        $(`#group-${id}`).prependTo("tbody");
    }
    else {
        $(`#group-${id}`).appendTo("tbody");
    }
}
function selectUser(ele) {

    const id = $(ele).attr('id');
    const checked = $(ele).is(':checked') ? true : false;

    if (checked) {
        $(`#row-${id}`).prependTo("tbody");
    }
    else {
        $(`#row-${id}`).appendTo("tbody");
    }
}

function deleteAccount(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/user/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#account-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteGroup(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/group/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#group-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteTypeBrand(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/typebrand/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#spth-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteDiscountProduct(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/discountproduct/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#discountproduct-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteCustomerPresent(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/customerpresent/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#customerpresent-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteStatusDelivery(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/statusdelivery/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#statusdelivery-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteStatusPayment(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/statuspayment/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#statuspayment-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteCity(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/city/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#city-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}
function deleteMethodPayment(id) {

    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/admin/methodpayment/${id}`,
        data: {}
    }).done(data => {
        alert(data);
        console.log(data);
        $(`#methodpayment-${id}`).remove();
    }).fail(data => {
        alert(data.responseText);
        console.log(data.responseText);
    });
}

function uploadAvatar() {

    const file = document.getElementById('avatar');;

    if (!file.files[0]) {
        alert("Please select a file before clicking 'Load'");
        return
    }
    const data = new FormData();
    data.append('avatar',file.files[0]);

    const req = new XMLHttpRequest();
    
    const id=$('#id-user').val();

    req.open("POST", `http://localhost:3000/api/admin/upload/${id}`);

    req.onload = function(oEvent) {
        if (req.status == 200) {
            alert("Upload");
        } else {
            alert("Error");
        }
    };

    req.send(data);
}

function uploadThumbnail() {
    const id=$('#id-sanpham').val();
    
    if(id === ''){
        alert("ID product not found");
        return;
    }
    const file = document.getElementById('thumbnail');

    if (!file.files[0]) {
        alert("Please select a file before clicking 'Load'");
        return
    }
    console.log(file.files[0]);
    const data = new FormData();
    data.append('thumbnail',file.files[0]);

    const req = new XMLHttpRequest();
    
    

    req.open("POST", `http://localhost:3000/api/admin/product/thumbnail/${id}`);

    req.onload = function(oEvent) {
        if (req.status == 200) {
            alert("Upload");
        } else {
            alert("Error");
        }
    };

    req.send(data);
}

function uploadSubphoto() {
    
    const files = document.getElementById('subphotos');

    // const _data=[];
    
    // for (let index = 0; index < files.length; index++) {
    //     const element = files[index];
    //     if(!element.files[0]){
    //         alert("Please select a file before clicking 'Upload'")
    //         return;
    //     }
    //     _data.push(element.files[0]);
    // }
    // console.log(_data);

    console.log(files.files);
    const data = new FormData();

    for (let index = 0; index < files.files.length; index++) {
        const element = files.files[index];
        data.append('subphotos',element);
    }
    
    const req = new XMLHttpRequest();
    
    const id=$('#id-sanpham').val();

    req.open("POST", `http://localhost:3000/api/admin/product/subphotos/${id}`);

    req.onload = function(oEvent) {
        if (req.status == 200) {
            alert("Upload");
        } else {
            alert("Error");
        }
    };

    req.send(data);

}    

function _uploadSubphoto() {
    
    const files = document.getElementsByClassName('subphotos');

    const data = new FormData();
    
    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        if(!element.files[0]){
            alert("Please select a file before clicking 'Upload'")
            return;
        }
        data.append('subphotos',element.files[0]);
    }
    // console.log(_data);

    // console.log(files.files);
    

    // for (let index = 0; index < files.files.length; index++) {
    //     const element = files.files[index];
    //     data.append('subphotos',element);
    // }
    
    const req = new XMLHttpRequest();
    
    const id=$('#id-sanpham').val();

    if(id === ''){
        alert("ID product not found");
        return;
    }
    
    req.open("POST", `http://localhost:3000/api/admin/product/subphotos/${id}`);

    req.onload = function(oEvent) {
        if (req.status == 200) {
            alert("Upload");
        } else {
            alert("Error");
        }
    };

    req.send(data);

}    

function viewBrandDetail(id) {
    window.location.href=`/admin/branddetail?id=${id}`;
}
function viewTypeDetail(id) {
    window.location.href=`/admin/typedetail?id=${id}`;
}
function viewTypeBrandDetail(id) {
    window.location.href=`/admin/typebranddetail?id=${id}`;
}
function viewCustomerDetail(id) {
    window.location.href=`/admin/customerdetail?id=${id}`;
}
function viewStatusDelivery(id) {
    window.location.href=`/admin/statusdelivery?id=${id}`;
}
function viewMethodPayment(id) {
    window.location.href=`/admin/methodpayment?id=${id}`;
}
function viewCity(id) {
    window.location.href=`/admin/city?id=${id}`;
}
function viewStatusPayemnt(id) {
    window.location.href=`/admin/statuspayment?id=${id}`;
}

function handleForgetPass(){

    const username=$('#username').val();

    if(username === ''){
        alert("Hãy nhập username");
        return;
    }

    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/admin/forgetpass',
        data:{
            username:username
        }
    }).done(data=>{
        alert(data);
        console.log(data);
        
    }).fail(data=>{
        alert(data.responseText);
        console.log(data.responseText);
    });

}

function changePass(){

    if($('#oldpass-div').hasClass('disabled')){
        $('#oldpass-div').removeClass('disabled');
        $('#newpass-div').removeClass('disabled');
    }
    else{
        const oldpass=$('#oldpass').val();
        const newpass=$('#newpass').val();

        if(oldpass === '' || newpass === ''){
            alert("Old pass or new pass can not be empty");
            return;
        }

        $.ajax({
            type:'POST',
            url:'http://localhost:3000/api/admin/changepass',
            data:{
                oldpass:oldpass,
                newpass:newpass
            }
        }).done(data=>{
            alert(data);
            console.log(data);
        }).fail(data=>{
            alert(data.responseText);
            console.log(data.responseText);
        });
    }

}