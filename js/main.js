// Полная загрузка страницы
$(window).on('load', function(){
	setTimeout(()=> {
		let preloader = $('#page-preloader')
		if ( !$.contains('done') ) {
			preloader.addClass('done')
		}
	}, 1000)
})

// Кнопка входа в аккаунт ========================
$('.login__btn').on('click', () => {
	$('.popup__login').addClass('open')
	$('body').addClass('fixed')
	$('.popup__login-close').on('click', () => {
		$('.popup__login').removeClass('open')
		$('body').removeClass('fixed')
	})
		
	$('.popup__login').on('click', (e) => {
		if (!e.target.closest('.popup__login-body')) {
			$('.popup__login').removeClass('open')
			$('body').removeClass('fixed')
		}
	})
	
	$('.fa-eye').on('click', () => {
		$('.login-form__password').attr({'type':'text'})
		$('.fa-eye').css({'visibility':'hidden'})
		$('.fa-eye-slash').css({'visibility':'visible'})
	})
	$('.fa-eye-slash').on('click', () => {
		$('.login-form__password').attr({'type':'password'})
		$('.fa-eye').css({'visibility':'visible'})
		$('.fa-eye-slash').css({'visibility':'hidden'})
	})
})

//Регистрация на сайте =========================
$('.login-form__registred-link').on('click', () => {
	$('.login-form__registred-link').preventDefault
	$('.popup__register').addClass('open')
	$('body').addClass('fixed')
	$('.popup__register-close').on('click', () => {
		$('.popup__register').removeClass('open')
	})	

	$('.popup__register').on('click', (e) => {
		if (!e.target.closest('.popup__register-body')) {
			$('.popup__register').removeClass('open')
		}
	})

	$('.fa-eye').on('click', () => {
		$('.register-form__password').attr({'type':'text'})
		$('.fa-eye').css({'visibility':'hidden'})
		$('.fa-eye-slash').css({'visibility':'visible'})
	})
	$('.fa-eye-slash').on('click', () => {
		$('.register-form__password').attr({'type':'password'})
		$('.fa-eye').css({'visibility':'visible'})
		$('.fa-eye-slash').css({'visibility':'hidden'})
	})	
})

//Слайдер ==========================
$(document).ready(() => {
	$('.slider').slick({
		easing: 'ease',
		autoplay: true,
		pauseOnHover: false,
		pauseOnActive: true,
		draggable: false,
		swipe: true
	})
})



// Табы =============================
$('.tabs__items').on('click', 'a.tabs__item:not(.active)', function(e) {
	e.preventDefault()
	$(this)
	  	.addClass('active').siblings().removeClass('active')
	  	.closest('div.tabs').find('div.tabs__block').removeClass('active').eq($(this).index()).addClass('active')
	  	
  	let id = $(this).find('.tabs__number').attr('data-tab'),
   		content = $('.tabs__number[data-tab="'+ id +'"]');

   	$('.tabs__number.active').removeClass('active'); 
	$(this).addClass('active'); 
	   
	$('.tabs__number.active').removeClass('active'); 
	content.addClass('active'); 
})
	 


// Попап карточка =====================
$('#card-link-1').on('click', () => {
	$('#card-popup-1').addClass('active')
	$('body').addClass('fixed')
	$('.scroll__top').hide()
})
$('#card-link-2').on('click', () => {
	$('#card-popup-2').addClass('active')
	$('body').addClass('fixed')
	$('.scroll__top').hide()
})
$('#card-link-3').on('click', () => {
	$('#card-popup-3').addClass('active')
	$('body').addClass('fixed')
	$('.scroll__top').hide()
})
$('.card-popup__close').on('click', (e) => {
	$('.card-popup__wrapper').removeClass('active')
	$('body').removeClass('fixed')
	$('.scroll__top').show()
})
$('.card-popup__wrapper').on('click', (e) => {
	if (!e.target.closest('.card-popup__inner')) {
		$('.card-popup__wrapper').removeClass('active')
		$('body').removeClass('fixed')
		$('.scroll__top').show()
	}
})
// Прогресс на карточках
$('.card__progress-fill').each( function()  {
	let $this 		= $(this),
			percent 	= $this.attr('per')

	$this.css('width', percent + '%')	
})

	

// Скроллер наверх ==============================
$(document).ready(function(){   
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });
    $('#scroll-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});



// Бургер меню ======================================
$(document).ready(function () {
	$('.header__burger').on('click', function (e){
		$('.header__burger, .header__menu').toggleClass('active')
		$('body').toggleClass('lock')
	})
})


// Фиксированная шапка ======================================
$(document).ready(function() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('.header').addClass('fixed')
		} else {
			$('.header').removeClass('fixed')
		}
	})
})



// Скроллер навигации ======================================
$(function(){
	$('.menu__link').on('click', function(e){
		e.preventDefault()
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+(-60)+"px"});
		$('.header__menu').removeClass('active')
		$('.header__burger').removeClass('active')
		$('body').removeClass('lock')
		return false;
	});
});



// Активный блок меню ======================================
var positions = [], //сюда сложим на загрузке страницы позиции наших "якорных" блоков, чтобы не считать их каждый раз. и сюда же положим ссылки на соответствующие a.scroll-to
    currentActive = null, //здесь будет храниться id текущего блока, чтобы не менять классы по 100 раз за одну прокрутку 
    links = $('.menu__link'); //сохраним массив всех ссылок

$(".anchor").each(function(){ //перебираем блоки, сохраняем позиции и ссылки на пункты меню
    positions.push({
        top: $(this).position().top - 100,
        a: links.filter('[href="#'+$(this).attr('id')+'"]')
    });
});

//делаем реверс массива, чтобы при скролле перебирать его с конца и выходить из цикла при нахождении
//зачем нам проверять каждый блок, если прокрутка уже ниже последнего, верно?
positions = positions.reverse(); 

$(window).on('scroll',function() {
    var winTop = $(window).scrollTop();
    for(var i = 0; i < positions.length; i++){
        if(positions[i].top < winTop){ //если прокрутка страницы ниже нашего блока
            if(currentActive !== i){ //и если мы еще не добавили класс текущему блоку
                currentActive = i;
                links.filter('.active').removeClass('active'); //снимаем класс .active с текущего пункта меню
                positions[i].a.addClass("active");
            }
            break; //выходим из цикла, не нужно проверять блоки, которые выше
        }
    }
});


