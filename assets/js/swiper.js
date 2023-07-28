// var swiper = new Swiper(".swiper-container", {
//   spaceBetween: 30,
//   centeredSlides: true,
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });
var swiper = new Swiper(".swiper-container", {
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    568: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    968: {
      slidesPerView: 4,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
