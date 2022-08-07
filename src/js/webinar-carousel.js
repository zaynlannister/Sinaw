import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


const swiper = new Swiper(".swiper", {
    effect: "coverflow",
    centeredSlides: true,
    loop: true,
    slidesPerView: 1.5,
    coverflowEffect: {
        rotate: -2,
        stretch: "-80%",
        depth: 200,
        modifier: -1,
        slideShadows: false
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});