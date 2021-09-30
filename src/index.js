import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './scss/styles.scss';
import Splide from '@splidejs/splide';

if (document.querySelector('#banners')) {
    new Splide('#banners', {
        arrows: false,
    }).mount();
}

document.querySelector('.header-notification__close').onclick = function () {
    // alert(this.dataset.parent)
    document.querySelector('#' + this.dataset.parent).remove();
}