document.addEventListener('DOMContentLoaded', function () {
    const popularSlider = new Swiper('.popular-slider', {
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: '.popular-slider__arrow--next',
            prevEl: '.popular-slider__arrow--prev',
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            575: {
                slidesPerView: "auto"
            },
            1200: {
                slidesPerView: 3,
            },
        }
    });

    const news = new Swiper('.news-slider', {
        slidesPerView: 3,
        loop: false,
        allowTouchMove: false,
        spaceBetween: 20,
        breakpoints: {
            300: {
                slidesPerView: 1,
                allowTouchMove: true,
            },
            575: {
                slidesPerView: "auto",
                allowTouchMove: true,
            },
            1200: {
                slidesPerView: 3,
                allowTouchMove: false,
            },
        }
    });

    const otherSlider = new Swiper('.other-slider', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.other-slider__arrow--next',
            prevEl: '.other-slider__arrow--prev',
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: "auto"
            },
            1200: {
                slidesPerView: 3,
            },
        }
    });


    const readSlider = new Swiper('.read-slider', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.read-slider__arrow--next',
            prevEl: '.read-slider__arrow--prev',
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: "auto"
            },
            1200: {
                slidesPerView: 3,
            },
        }
    });

    let burger = document.querySelector('.hamburger');
    let mobile = document.querySelector('.mobile');
    burger.addEventListener('click', () => {
        if (burger.classList.contains('active')) {
            burger.classList.remove('active');
            mobile.classList.remove('active');
            document.body.style.overflow = "visible";
        } else {
            burger.classList.add('active');
            mobile.classList.add('active');
            document.body.style.overflow = "hidden";
        }
    });

// функция для модалки

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
            modal_ = document.querySelector(modal),
            modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });

            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal__container')) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal', 'modal--active', '[data-modal-auth]', '.modal__close');

// Accordion
    const tabs = document.querySelector('.modal-content');
    const tabsBtn = document.querySelectorAll('.modal-triggers__item');
    const tabsContent = document.querySelectorAll('.modal-content__form');

    if (tabs) {
        tabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-triggers__item')) {
                const tabsPath = e.target.dataset.tabsPath;
                tabsBtn.forEach(el => {
                    el.classList.remove('modal-triggers__item--active')
                });
                document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('modal-triggers__item--active');
                tabsHandler(tabsPath);
            }
        });
    }

    const tabsHandler = (path) => {
        tabsContent.forEach(el => {
            el.classList.remove('modal-content__form--active')
        });
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('modal-content__form--active');
    };

// menu

    let menuBtn = document.querySelector('[data-menu]');
    let headerMenu = document.querySelector('.header-search');
    let header = document.querySelector('header');
    let input = document.querySelector('.search-form__input');

    menuBtn.addEventListener('click', () => {
        headerMenu.classList.toggle('active');
        header.classList.toggle('active');
        input.focus();
    });

    headerMenu.addEventListener(
        "mouseleave",
        (event) => {
            headerMenu.classList.remove('active');
            header.classList.remove('active');
        },
        false
    );
});

jQuery(function($) {
    $('body').on('click', '[data-scroll]', (e) => {
        e.preventDefault();
        const $link = $(e.currentTarget);
        let index = $link.data('scrollIndex');
        if (index === undefined) {
            index = 0;
        }
        const $el = $($link.data('scroll')).eq(index);
        $('html, body').animate(
            {
                scrollTop: $el.offset().top - ($(window).height() * 8) / 100,
            }, 600
        );
    });
});