import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './scss/styles.scss';
import Splide from '@splidejs/splide';

if (document.querySelector('#banners')) {
    new Splide('#banners', {
        arrows: false,
    }).mount();
}
// закрытие уведомления
document.querySelector('.header-notification__close').onclick = function () {
    document.querySelector('#' + this.dataset.parent).remove();
}
// закрытие модального окна
document.querySelectorAll('.popup__close').forEach(element => {
    element.onclick = function () {
        this.closest('.popup').classList.toggle('active');
    }
})
// тригеры модальных окон
if (document.querySelector('.user.no-login')) {
    document.querySelector('#regbtn').onclick = function () {
        document.querySelector('#registrationForm').classList.toggle('active');
    }
    document.querySelector('#loginbtn').onclick = function () {
        document.querySelector('#loginForm').classList.toggle('active');
    }
}

// clock




