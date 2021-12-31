/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-01 00:37:53
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

		// $('a.cart_quantity_delete').click(function (event) {
	
		// 	var tag = $(this);
		// 	const id=tag.attr('name');
		// 	$.ajax({
		// 		type: 'DELETE',
		// 		url: `http://localhost:3000/api/cart/${id}`,
		// 	}).done(function (data) {

		// 		$(`tr#detail-cart_${id}`).css('display','none');
				
		// 		alert('Đã update');
		// 		console.log(data);
		// 	}).fail(function (data) {
		// 		alert(data.responseText);
		// 		console.log(data);
		// 	});
		// });

		$('#add-cart-btn').click(_=>{
			
			const id=$('span#product-id').text();
			const amount=$('input#quantity-product').val();
	
			$.ajax({
				type:'POST',
				url:`http://localhost:3000/api/cart/${id}`,
				data:{
					amount:parseInt(amount)
				}
			}).done((data)=>{
				alert(data);
				console.log(data);
			}).fail(data=>{
				alert(data);
				console.log(data);
			});
		});


		$('#login-form').submit(event=>{
			event.preventDefault();
			const username=$('input#login-username').val();
			const password=$('input#login-password').val();
			$.ajax({
				type: 'POST',
				url: 'http://localhost:3000/api/user/login',
				data: {
					username:username,
					password:password
				}
			}).done(function (data) {
				window.location.replace('/');
				
				console.log(data);
			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});

		})

		$('#register-form').submit(event=>{
			event.preventDefault();
			const username=$('input#register-username').val();
			const password=$('input#register-password').val();
			$.ajax({
				type: 'POST',
				url: 'http://localhost:3000/api/user/register',
				data: {
					username:username,
					password:password
				}
			}).done(function (data) {
				alert(data);				
				console.log(data);
			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});

		})

		$('#checkout-form').submit((event)=>{

			event.preventDefault();

			const form=$(this);

			console.log(form.serialize());

			const id=$(`input#id_cart`).val();

			const email=$(`input#email`).val();
			const name=$('input#name').val();
			const phone=$('input#phone').val();
			const sonha=$('input#sonha').val();
			const street=$('input#street').val();
			const ward=$('input#ward').val();
			const district=$('input#district').val();
			const idcity=$('select#city option:selected').val();
			const city=$('select#city option:selected').text();
			const province=$('input#province').val();
			

			$.ajax({
				type: 'POST',
				url: `http://localhost:3000/api/cart/checkout`,
				data: {
					email:email,
					name:name,
					phone:phone,
					sonha:sonha,
					street:street,
					ward:ward,
					district:district,
					city:city,
					idcity:idcity,
					province:province
				}
			}).done(function (data) {
				// window.localStorage.setItem('token',data.accessToken);
				// window.location.replace('')
				alert('Đã update');
				console.log(data);
				window.location.replace("/");
			}).fail(function (data) {
				alert(data.responseText);
				console.log(data);
			});
			
		});

		$('#review-form').submit(event=>{

			event.preventDefault();
			const idProduct=$('span#product-id').text();
			
			const name=$('input#name').val();
			const email=$('input#email').val();
			const description=$('textarea#description').val();
			let rating;
			
			if($('span#rating-5').hasClass("checked")){
				rating=5;
			}
			else if($('span#rating-4').hasClass("checked")){
				rating=4;
			}
			else if($('span#rating-3').hasClass("checked")){
				rating=3;
			}
			else if($('span#rating-2').hasClass("checked")){
				rating=2;
			}
			else if($('span#rating-1').hasClass("checked")){
				rating=1;
			}
			else 
				rating=0;
			

			$.ajax({
				type: 'POST',
				url: `http://localhost:3000/api/review?product=${idProduct}`,
				data: {
					name:name,
					email:email,
					description:description,
					rating:rating
				}
			}).done(function (data) {
				// window.location.replace('/');
				
				console.log(data);

				const newData={};

				newData.name=data.name;
				newData.description=data.description;
				const myDate=new Date(data.created_at);

				newData.hour=`${myDate.getUTCHours()}:${myDate.getUTCMinutes()}:${myDate.getUTCSeconds()}`;
				newData.date=`${myDate.getUTCDate()}/${myDate.getUTCMonth()}/${myDate.getUTCFullYear()}`;

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

		})
	});
});

function updateCart(){

	const deleteDetailCart=localStorage.getItem("detailCarts");
	const detailCarts=[];

	$('tr.cart_detail').each(function(index){

		const id=$(this).attr('id').split('_')[1];

		const quanity=$(`input#quanity_${id}`).val();

		detailCarts.push({
			id_detailcart:id,
			quanity:quanity
		});
	});

	const voucher=$('input#voucher').is(':checked') ? true : false;
	const discount=$('input#discount').is(':checked') ? true : false;
	const idDiscount=$('input#discount').val();
	const idVoucher=$('input#voucher').val();
	// const city=$('select#area-shipping option:selected').val();

	console.log(voucher);
	console.log(discount);

	const payload={
		updateDetailCarts:detailCarts,
		deleteDetailCarts:deleteDetailCart !== null ? deleteDetailCart.split(" "):null,
		voucher:voucher,
		discount:discount,
		idDiscount:idDiscount,
		idVoucher:idVoucher,
		// city:city
	}

	console.log(payload);

	$.ajax({
		type:'PUT',
		url:'http://localhost:3000/api/cart/',
		data:payload
	}).done(data=>{

		localStorage.removeItem('detailCarts');

		console.log(data);

		if(data.empty){

			$('table#table-cart').css('display','none');

			const dom='<h3 class="table-empty">Nothing to show. Back to <a href="/products">Product page</a></h3>';

			$('div#table-cart-container').prepend(dom);
			$('section#do_action').css('display','none');
		}
		else{

			if(data.discountErrorCode !== 0){
				alert(data.discountMessage);
				
				$('input#discount').css('display','none');
				$('input#discount').attr('checked',false);
			}
			else{
				$('span#subTotal').text(`$${data.subTotal}`);
				$('span#discount').text(`${data.discount}%`);
				// $('span#shippingCost').text(`${isNaN(data.shippingCost) ? data.shippingCost : `$${data.shippingCost}`}`);
				const total= Math.ceil(data.subTotal*(1-(data.discount/100)));
				
				$('span#total').text(`$${total}`);
			}

			if(data.voucherErrorCode !== 0){
				alert(data.voucherMessage);
				$('input#discount').css('display','none');
				$('input#discount').attr('checked',false);
			}
			else{
				if(voucher){
					data.giftProducts.forEach(item=>{

						const dom=`
						<tr id="detail-cart_${item.id_detailcart}" class="cart_detail-voucher">
							<td class="cart_product">
								<a href=${item.link_sanpham}><img src=${thumbnail} alt=""></a>
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
									<input class="cart_quantity_input" type="text" name="quantity" value="${so_luong}" autocomplete="off" size="2" disabled>
								</div>
							</td>
							<td class="cart_total">
								<p class="cart_total_price"> ${tong_cong}</p>
							</td>
							<td class="cart_delete">						
							</td>
						</tr>`
	
						$('tbody#detailcart-container').append(dom);
					});
				}
				else{
					$('tr.cart_detail-voucher').remove();
				}
				
			}
		}


	})
	.fail(err=>{
		console.log(err);
	})

	console.log(detailCarts);

}

function removeDetailCart(id){

	let deleteDetailCart=localStorage.getItem("detailCarts");

	console.log(deleteDetailCart);
	if(deleteDetailCart !== null){

		deleteDetailCart+=" "+id;
	}
	else{
		deleteDetailCart=id;
	}

	localStorage.setItem("detailCarts",deleteDetailCart);
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

function increment(id,price){

	const value=$(`input#quanity_${id}`).val();
	$(`input#quanity_${id}`).val(parseInt(value)+1);
	$(`p#total_${id}`).text(`$${Math.round((parseInt(value)+1)*price)}`);
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
function decrement(id,price){
	const value=$(`input#quanity_${id}`).val();
	
	if(parseInt(value) > 1){
		$(`input#quanity_${id}`).val(parseInt(value)-1);
		$(`p#total_${id}`).text(`$${Math.round((parseInt(value)-1)*price)}`);

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

function getRatingStar(rating_star){

	$('span.rating-star').removeClass("checked");


	if(rating_star === "rating-1"){

		$('span#rating-1').addClass("checked");
	}
	else if(rating_star === "rating-2"){

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
	}
	else if(rating_star === "rating-3"){

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
		$('span#rating-3').addClass("checked");
	}
	else if(rating_star === "rating-4"){

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
		$('span#rating-3').addClass("checked");
		$('span#rating-4').addClass("checked");
	}
	else if(rating_star === "rating-5"){

		$('span#rating-1').addClass("checked");
		$('span#rating-2').addClass("checked");
		$('span#rating-3').addClass("checked");
		$('span#rating-4').addClass("checked");
		$('span#rating-5').addClass("checked");
	}


}
