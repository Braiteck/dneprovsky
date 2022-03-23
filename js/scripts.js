$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Карусель товаров
	const logosSliders = []

	$('.logos .swiper-container').each(function (i) {
		$(this).addClass('logos_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				spaceBetween: 0,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				breakpoints: {
					0: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 4
					},
					1024: {
						slidesPerView: 5
					},
					1205: {
						slidesPerView: 8
					}
				}
			}

		logosSliders.push(new Swiper('.logos_s' + i, options))

		if (slides > logosSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			logosSliders[i].destroy(true, true)
			logosSliders[i] = new Swiper('.logos_s' + i, options)
		}
	})


	// Фикс. форма заказа
	$('.fixed_order_form .btn, .fixed_order_form .close_btn').click((e) => {
		e.preventDefault()

		!$('.fixed_order_form').hasClass('show')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)

		$('.fixed_order_form').toggleClass('show')
	})


	// Программа обучения
	$('.training_program .spoler_btn, .training_program .data .close_btn').click((e) => {
		e.preventDefault()

		$('.training_program .spoler_btn').toggleClass('active')
		$('.training_program .data').slideToggle(500)
	})


	// Меню
	$('header .menu_btn').click((e) => {
		e.preventDefault()

		$('header .menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('#menu').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('#menu .close_btn, .overlay').click((e) => {
		e.preventDefault()

		$('.fixed_order_form').removeClass('show')
		$('header .menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('#menu').removeClass('show')
		$('.overlay').fadeOut(200)
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Отправка форм
	$('body').on('submit', 'form', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#success_modal',
			type: 'inline'
		}])
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.format .row').each(function () {
		formatHeight($(this), parseInt($(this).css('--format_count')))
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Выравнивание элементов в сетке
		$('.format .row').each(function () {
			formatHeight($(this), parseInt($(this).css('--format_count')))
		})


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



// Выравнивание форматов
function formatHeight(context, step) {
	let start = 0,
		finish = step,
		$items = context.find('.item')

	$items.find('.head').height('auto')

	$items.each(function () {
		setHeight($items.slice(start, finish).find('.head'))

		start = start + step
		finish = finish + step
	})
}