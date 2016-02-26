$(document).ready(function() {
	$('.swiper').slick({
	  dots: true,
	  infinite: false,
	  slidesToShow: 4,
	  slidesToScroll: 4,
	  arrows: false,
	  focusOnSelect: true,
	});



	$('.slick-dots').find('button').html('');
});