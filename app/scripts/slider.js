$(document).ready(function() {

  $('.slider-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    appendArrows: $('.slider__container'),
    asNavFor: '.slider-for',
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '100px',
    infinite: true,
    variableWidth: true
  });

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slider-nav',
    focusOnSelect: true,
    autoplay: false,
    fade: true,
    infinite: true
  });

  $('.slick-next').add('.slick-prev').html('');

});