$(document).ready(function() {

  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slider-for',
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '180px',
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

});