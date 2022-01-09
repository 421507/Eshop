/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 14:34:28
 */
/*price range*/

$('#sl2').slider();

var RGBChange = function () {
	$('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
};

/*scroll to top*/

$(document).ready(function () {
	localStorage.removeItem('detailCarts');
	$(function () {

		$.scrollUp({
			scrollName: 'scrollUp', // Element ID
			scrollDistance: 300, // Distance from top/bottom before showing element (px)
			scrollFrom: 'top', // 'top' or 'bottom'
			scrollSpeed: 300, // Speed back to top (ms)
			easingType: 'linear', // Scroll to top easing (see http://easings.net/)
			animation: 'fade', // Fade, slide, none
			animationSpeed: 200, // Animation in speed (ms)
			scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
			//scrollTarget: false, // Set a custom target element for scrolling to the top
			scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
			scrollTitle: false, // Set a custom <a> title if required.
			scrollImg: false, // Set true to use image
			activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
			zIndex: 2147483647 // Z-Index for the overlay
		});

		$('#profile-form').submit(function (event) {
			event.preventDefault();

			var form = $(this);
			$.ajax({
				type: 'POST',
				url: 'http://localhost:3000/api/user',
				data: form.serialize()
			}).done(function (data) {
				// window.localStorage.setItem('token',data.accessToken);
				// window.location.replace('')
				alert('Đã update');
				console.log(data);
			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});
		});

		$('#add-cart-btn').click(_ => {

			const id = $('span#product-id').text();
			const amount = $('input#quantity-product').val();

			$.ajax({
				type: 'POST',
				url: `http://localhost:3000/api/cart/${id}`,
				data: {
					amount: parseInt(amount)
				}
			}).done((data) => {
				alert(data);
				console.log(data);
			}).fail(data => {
				alert(data);
				console.log(data);
			});
		});


		$('#login-form').submit(event => {
			event.preventDefault();
			const username = $('input#login-username').val();
			const password = $('input#login-password').val();
			$.ajax({
				type: 'POST',
				url: 'http://localhost:3000/api/user/login',
				data: {
					username: username,
					password: password
				}
			}).done(function (data) {
				window.location.href='/';

				console.log(data);
			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});

		})

		$('#register-form').submit(event => {
			event.preventDefault();
			const username = $('input#register-username').val();
			const password = $('input#register-password').val();
			const email = $('input#register-email').val();
			const name = $('input#register-name').val();
			$.ajax({
				type: 'POST',
				url: 'http://localhost:3000/api/user/register',
				data: {
					username: username,
					password: password,
					email:email,
					name:name
				}
			}).done(function (data) {
				alert(data);
				console.log(data);
			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});

		})

		$('#checkout-form').submit((event) => {

			event.preventDefault();

			const form = $(this);

			console.log(form.serialize());

			const id = $(`input#id_cart`).val();

			const email = $(`input#email`).val();
			const name = $('input#name').val();
			const phone = $('input#phone').val();
			const sonha = $('input#sonha').val();
			const street = $('input#street').val();
			const ward = $('input#ward').val();
			const district = $('input#district').val();
			const idcity = $('select#city option:selected').val();
			const city = $('select#city option:selected').text();
			const province = $('input#province').val();
			const message = $('textarea#message').val();

			let methodPayment;
			let statusPayment;
			if($('input#credit-card').is(':checked')){
			
				methodPayment="creditcard";
				statusPayment="dathanhtoan";

				if($('input#name-credit-card').val() === '' || $('input#card-number').val() === '' || $('input#expiry').val() === '' || $('input#cvv').val() === ''){
					alert("Xin hãy điền đủ thông tin");
					return;
				}

			}
			else if($('input#check-payment').is(':checked')){
				methodPayment="checkpayment";
				statusPayment="chuathanhtoan";
			}
			else{
				alert("Hãy chọn một phương thức thanh toán");
				return;
			}

			const credit_card=$('input#name-credit-card').val();
			var cardno = /^(?:3[47][0-9]{13})$/;
			if(credit_card.match(cardno)){
				alert("Invalid card number");
				return;
			}
			
			$.ajax({
				type: 'POST',
				url: `http://localhost:3000/api/cart/checkout`,
				data: {
					email: email,
					name: name,
					phone: phone,
					sonha: sonha,
					street: street,
					ward: ward,
					district: district,
					city: city,
					idcity: idcity,
					province: province,
					message: message,
					methodPayment:methodPayment,
					statusPayment:statusPayment
				}
			}).done(function (data) {
				console.log(data);
				window.location.href=`/result?id=${data.id}&method=${data.methodPayment}&status=${data.statusPayment}&total=${data.total}&voucher=${data.voucher}&nameVoucher=${data.nameVoucher}&shopping=${data.shopping}`;
			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});

		});

		$('#review-form').submit(event => {

			event.preventDefault();
			const idProduct = $('span#product-id').text();

			const name = $('input#name').val();
			const email = $('input#email').val();
			const description = $('textarea#description').val();
			let rating;

			if ($('span#rating-5').hasClass("checked")) {
				rating = 5;
			}
			else if ($('span#rating-4').hasClass("checked")) {
				rating = 4;
			}
			else if ($('span#rating-3').hasClass("checked")) {
				rating = 3;
			}
			else if ($('span#rating-2').hasClass("checked")) {
				rating = 2;
			}
			else if ($('span#rating-1').hasClass("checked")) {
				rating = 1;
			}
			else
				rating = 0;


			$.ajax({
				type: 'POST',
				url: `http://localhost:3000/api/review?product=${idProduct}`,
				data: {
					name: name,
					email: email,
					description: description,
					rating: rating
				}
			}).done(function (data) {
				// window.location.replace('/');

				console.log(data);

				const newData = {};

				newData.name = data.name;
				newData.description = data.description;
				const myDate = new Date(data.created_at);

				newData.hour = `${myDate.getUTCHours()}:${myDate.getUTCMinutes()}:${myDate.getUTCSeconds()}`;
				newData.date = `${myDate.getUTCDate()}/${myDate.getUTCMonth()}/${myDate.getUTCFullYear()}`;

				$('div#_reviews').prepend(
					`<div>
						<ul>
							<li><a href=""><i class="fa fa-user"></i>${newData.name}</a></li>
							<li><a href=""><i class="fa fa-clock-o"></i>${newData.hour}</a></li>
							<li><a href=""><i class="fa fa-calendar-o"></i>${newData.date}</a></li>
						</ul>
						<p>${newData.description}</p>
					</div>`
				)

			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});

		});

		$('#main-contact-form').submit(event=>{
			event.preventDefault();

			const name=$('#name').val();
			const email=$('#email').val();
			const subject=$('#subject').val();
			const message=$('#message').val();

			$.ajax({
				type:'POST',
				url:'http://localhost:3000/api/contact',
				data:{
					name:name,
					email:email,
					subject:subject,
					message:message
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

function updateCart() {

	const deleteDetailCart = localStorage.getItem("detailCarts");
	const detailCarts = [];

	$('tr.cart_detail').each(function (index) {

		const id = $(this).attr('id').split('_')[1];

		const quanity = $(`input#quanity_${id}`).val();

		detailCarts.push({
			id_detailcart: id,
			quanity: quanity
		});
	});

	const voucher = $('input#voucher').is(':checked') ? true : false;
	const discount = $('input#discount').is(':checked') ? true : false;
	const idDiscount = $('input#discount').val() !== 'on' ? $('input#discount').val() : -1;
	const idVoucher = $('input#voucher').val() !== 'on' ? $('input#voucher').val() : -1;
	// const city=$('select#area-shipping option:selected').val();

	console.log(voucher);
	console.log(discount);

	const payload = {
		updateDetailCarts: detailCarts.length > 0 ? detailCarts : null,
		deleteDetailCarts: deleteDetailCart !== null ? deleteDetailCart.split(" ") : null,
		voucher: voucher,
		discount: discount,
		idDiscount: idDiscount,
		idVoucher: idVoucher,
		// city:city
	}

	console.log(payload);

	$.ajax({
		type: 'PUT',
		url: 'http://localhost:3000/api/cart/',
		data: payload
	}).done(data => {

		localStorage.removeItem('detailCarts');

		console.log(data);

		if (data.empty) {

			$('table#table-cart').css('display', 'none');

			const dom = '<h3 class="table-empty">Nothing to show. Back to <a href="/products">Product page</a></h3>';

			$('div#table-cart-container').prepend(dom);
			$('section#do_action').css('display', 'none');
		}
		else {
			if (data.checkout) {
				if ($('a#check_out').length === 0)
					$('div#chose_area').append(`<a id="check_out" class="btn btn-default check_out" href="/checkout">Checkout</a>`);
			}
			else
				$('a#check_out').remove();

			if (data.discountErrorCode !== undefined && data.discountErrorCode !== 0) {
				alert(data.discountMessage);

				if (data.discountErrorCode === -1) {
					$('input#discount').attr('checked', false);
					$('span#subTotal').text(`$${data.subTotal}`);
					$('span#discount').text(`${data.discount}%`);
					// $('span#shippingCost').text(`${isNaN(data.shippingCost) ? data.shippingCost : `$${data.shippingCost}`}`);
					const total = Math.ceil(data.subTotal * (1 - (data.discount / 100)));

					$('span#total').text(`$${total}`);
				}
				else {
					$('li#discount-checkbox-container').css('display', 'none');
					$('input#discount').attr('checked', false);
				}


			}
			else if (data.discountErrorCode !== undefined) {
				$('span#subTotal').text(`$${data.subTotal}`);
				$('span#discount').text(`${data.discount}%`);
				// $('span#shippingCost').text(`${isNaN(data.shippingCost) ? data.shippingCost : `$${data.shippingCost}`}`);
				const total = Math.ceil(data.subTotal * (1 - (data.discount / 100)));

				$('span#total').text(`$${total}`);
			}

			if (data.voucherErrorCode !== undefined && data.voucherErrorCode !== 0) {
				alert(data.voucherMessage);
				if(data.voucherErrorCode === -1){
					$('input#voucher').attr('checked', false);
				}
				else{
					$('li#voucher-checkbox-container').css('display', 'none');
					$('input#voucher').attr('checked', false);
				}
				

				$('tr.cart_detail-voucher').remove();
			}
			else if (data.voucherErrorCode !== undefined) {
				if (voucher) {
					if (data.giftProducts !== undefined) {
						data.giftProducts.forEach(item => {

							const dom = `
							<tr id="detail-cart_${item.id_detailcart}" class="cart_detail-voucher">
								<td class="cart_product">
									<a href=${item.link_sanpham}><img src=${item.thumbnail} alt=""></a>
								</td>
								<td class="cart_description">
									<h4><a href="">${item.ten_sanpham}</a></h4>
									<p>Web ID: ${item.id_sanpham}</p>
								</td>
								<td class="cart_price">
									<p>${item.gia}</p>
								</td>
								<td class="cart_quantity">
									<div class="cart_quantity_button">
										<input class="cart_quantity_input" type="text" name="quantity" value="${item.so_luong}" autocomplete="off" size="2" disabled>
									</div>
								</td>
								<td class="cart_total">
									<p class="cart_total_price"> ${item.tong_cong}</p>
								</td>
								<td class="cart_delete">						
								</td>
							</tr>`

							$('tbody#detailcart-container').append(dom);
						});
					}

				}
				else {
					$('tr.cart_detail-voucher').remove();
				}

			}
		}


	})
		.fail(err => {
			console.log(err);
		})

}

function removeDetailCart(id) {

	let deleteDetailCart = localStorage.getItem("detailCarts");

	console.log(deleteDetailCart);
	if (deleteDetailCart !== null) {

		deleteDetailCart += " " + id;
	}
	else {
		deleteDetailCart = id;
	}

	localStorage.setItem("detailCarts", deleteDetailCart);
	$(`tr#detail-cart_${id}`).remove();
	// $.ajax({
	// 	type: 'DELETE',
	// 	url: `http://localhost:3000/api/cart/${id}`,
	// }).done(function (data) {


	// 	alert('Đã update');
	// 	console.log(data);
	// }).fail(function (data) {
	// 	alert(data.responseText);
	// 	console.log(data);
	// });

}

function increment(id, price) {

	const value = $(`input#quanity_${id}`).val();
	$(`input#quanity_${id}`).val(parseInt(value) + 1);
	$(`p#total_${id}`).text(`$${Math.round((parseInt(value) + 1) * price)}`);
	// $.ajax({
	// 	type: 'PUT',
	// 	url: `http://localhost:3000/api/cart/${id}`,
	// 	data: {
	// 		amount:parseInt(value)+1,
	// 	}
	// }).done(function (data) {
	// 	// window.localStorage.setItem('token',data.accessToken);
	// 	// window.location.replace('')
	// 	alert('Đã update');
	// 	console.log(data);
	// }).fail(function (data) {
	// 	alert(data.responseText);
	// 	console.log(data);
	// });

}
function decrement(id, price) {
	const value = $(`input#quanity_${id}`).val();

	if (parseInt(value) > 1) {
		$(`input#quanity_${id}`).val(parseInt(value) - 1);
		$(`p#total_${id}`).text(`$${Math.round((parseInt(value) - 1) * price)}`);

		// $.ajax({
		// 	type: 'PUT',
		// 	url: `http://localhost:3000/api/cart/${id}`,
		// 	data: {
		// 		amount:parseInt(value)-1,
		// 	}
		// }).done(function (data) {
		// 	alert('Đã update');
		// 	console.log(data);
		// }).fail(function (data) {
		// 	alert(data.responseText);
		// 	console.log(data);
		// });
	}
}

function getRatingStar(rating_star) {

	$('span.rating-star').removeClass("checked");


	if (rating_star === "rating-1") {

		$('span#rating-1').addClass("checked");
	}
	else if (rating_star === "rating-2") {

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
	}
	else if (rating_star === "rating-3") {

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
		$('span#rating-3').addClass("checked");
	}
	else if (rating_star === "rating-4") {

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
		$('span#rating-3').addClass("checked");
		$('span#rating-4').addClass("checked");
	}
	else if (rating_star === "rating-5") {

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
		$('span#rating-3').addClass("checked");
		$('span#rating-4').addClass("checked");
		$('span#rating-5').addClass("checked");
	}
}

function handlePayment(element){
	console.log(element);
	$('input#credit-card').attr('checked',false);
	$('input#check-payment').attr('checked',false);

	$(`input#${element}`).prop('checked',true);

	if(element === "credit-card"){

		if($('div#credit-card-form').hasClass('disabled')){

			$('div#credit-card-form').removeClass('disabled');
		}
	}
	else{
		$('div#credit-card-form').addClass('disabled');
	}

}

function viewDetailCart(element){

	window.location.href=`/history?id=${element}`;
}

function searchMinMax(){

	
	const value=$('#sl2').val();
	let result;
	if(value === "")
		result=[250,450];
	else{
		result=value.split(",");
	}

	window.location.href=`/products?min=${result[0]}&max=${result[1]}`;
}

function forgetPassword(){

	const username = $('#login-username').val();

	if(username === ""){
		alert("Hãy nhập username");
		return;
	}

	$.ajax({
		type:'POST',
		url:'http://localhost:3000/api/user/forgetpass',
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

function changePassword(){

	// $('#main').append(
	// 	`<div class='row col-md-12'>
	// 		<form action='/api/user/changepass' method='post'>
	// 			<div class='col-md-12'>
	// 			<label class='labels'>Old pass</label><input name='oldpass' class='form-control' type='password' required/>
	// 			</div>
	// 			<div class='col-md-12'>
	// 			<label class='labels'>New pass</label><input name='newpass' class='form-control' type='password' required/>
	// 			</div>
	// 			<div class='col-md-12'>
	// 			<input type='submit' value='Submit'/>
	// 			</div>
	// 		</form>
	// 	</div>`
	// );

	// $('#changepass-btn').remove();

	if($('#changepass-form').hasClass('disabled')){
		$('#changepass-form').removeClass('disabled')
	}
	else{
		$('#changepass-form').addClass('disabled')
	}
}

function mySubmit() {
	const oldpass=$('#oldpass').val();
	const newpass=$('#newpass').val();

	if(oldpass === '' || newpass === ''){
		alert("Oldpass and Newpass can not be empty");
		return;
	}

	$.ajax({
		type:'POST',
		url:'http://localhost:3000/api/user/changepass',
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
