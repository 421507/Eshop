/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-28 00:51:31
 */
/*price range*/

$('#sl2').slider();

var RGBChange = function () {
	$('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
};

/*scroll to top*/

$(document).ready(function () {
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
			alert("blah blah");

			console.log(form.serialize());

			const id=$(`input#id_cart`).val();

			const email=$(`input#email`).val();
			const name=$('input#name').val();
			const phone=$('input#phone').val();
			const sonha=$('input#sonha').val();
			const street=$('input#street').val();
			const ward=$('input#ward').val();
			const district=$('input#district').val();
			const city=$('input#city').val();
			const province=$('input#province').val();

			$.ajax({
				type: 'POST',
				url: `http://localhost:3000/api/cart/checkout/${id}`,
				data: {
					email:email,
					name:name,
					phone:phone,
					sonha:sonha,
					street:street,
					ward:ward,
					district:district,
					city:city,
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

			$.ajax({
				type: 'POST',
				url: `http://localhost:3000/api/review?product=${idProduct}`,
				data: {
					name:name,
					email:email,
					description:description
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

function removeDetailCart(id){

	$.ajax({
		type: 'DELETE',
		url: `http://localhost:3000/api/cart/${id}`,
	}).done(function (data) {

		$(`tr#detail-cart_${id}`).css('display','none');
		
		alert('Đã update');
		console.log(data);
	}).fail(function (data) {
		alert(data.responseText);
		console.log(data);
	});

}

function increment(id,price){

	const value=$(`input#quanity_${id}`).val();
	$(`input#quanity_${id}`).val(parseInt(value)+1);
	$(`p#total_${id}`).text(`$${Math.round((parseInt(value)+1)*price)}`);
	$.ajax({
		type: 'PUT',
		url: `http://localhost:3000/api/cart/${id}`,
		data: {
			amount:parseInt(value)+1,
		}
	}).done(function (data) {
		// window.localStorage.setItem('token',data.accessToken);
		// window.location.replace('')
		alert('Đã update');
		console.log(data);
	}).fail(function (data) {
		alert(data.responseText);
		console.log(data);
	});

}
function decrement(id,price){
	const value=$(`input#quanity_${id}`).val();
	
	if(parseInt(value) > 1){
		$(`input#quanity_${id}`).val(parseInt(value)-1);
		$(`p#total_${id}`).text(`$${Math.round((parseInt(value)-1)*price)}`);

		$.ajax({
			type: 'PUT',
			url: `http://localhost:3000/api/cart/${id}`,
			data: {
				amount:parseInt(value)-1,
			}
		}).done(function (data) {
			alert('Đã update');
			console.log(data);
		}).fail(function (data) {
			alert(data.responseText);
			console.log(data);
		});
	}
}
