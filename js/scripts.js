(function ($) {
	"use strict";

	if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
		var s = skrollr.init({forceHeight: false});
	}

	/*==========  Responsive Navigation  ==========*/
	$('.main-nav').children().clone().appendTo('.responsive-nav');
	$('.responsive-menu-open').on('click', function(event) {
		event.preventDefault();
		$('body').addClass('no-scroll');
		$('.responsive-menu').addClass('open');
		return false;
	});
	$('.responsive-menu-close').on('click', function(event) {
		event.preventDefault();
		$('body').removeClass('no-scroll');
		$('.responsive-menu').removeClass('open');
		return false;
	});
	$('.main-nav ul ul li').each(function(index) {
		if ($(this).find('ul').length) {
			var text = $(this).find('> a').text();
			$(this).find('> a').prepend('<i class="fa fa-angle-right"></i>');
		}
	});
	$('.responsive-nav li').each(function(index) {
		if ($(this).find('ul').length) {
			var text = $(this).find('> a').text();
			var id = text.replace(/\s+/g, '-').toLowerCase();
			$(this).find('> a').attr('href', '#collapse-' + id);
			$(this).find('> a').attr('data-toggle', 'collapse');
			$(this).find('> a').append('<i class="fa fa-angle-down"></i>');
			$(this).find('> ul').attr('id', 'collapse-' + id);
			$(this).find('> ul').addClass('collapse');
		}
	});
	$('.responsive-nav a').on('click', function() {
		if ($(this).parent().hasClass('collapse-active')) {
			$(this).parent().removeClass('collapse-active');
		} else {
			$(this).parent().addClass('collapse-active');
		}
	});
	$('.mega-menu-open').on({
		mouseenter: function() {
			var $this = $(this);
			var id = $this.attr('href');
			var open_left = $this.offset();
			var open_width = $this.width();
			var mega_menu_left = $(id).offset();
			$(id).find('.arrow').css('left', open_left.left - mega_menu_left.left + open_width/2);
			$(id).addClass('open');
		},
		mouseleave: function() {
			$('.mega-menu').removeClass('open');
		}
	});
	$('.mega-menu').on({
		mouseenter: function() {
			$(this).addClass('open');
		},
		mouseleave: function() {
			$('.mega-menu').removeClass('open');
		}
	});
	$('.header-button').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		var id = $this.attr('href');
		var open_left = $this.offset();
		var open_width = $this.width();
		var header_dropdown_left = $(id).offset();
		$('.header-dropdown').not(id).removeClass('open');
		$(id).find('.arrow').css('left', open_left.left - header_dropdown_left.left + open_width/2);
		$(id).toggleClass('open');
	});
	$('.close-dropdown').on('click', function(e) {
		e.preventDefault();
		$('.header-dropdown').removeClass('open');
	});
	$('.header').headroom({
		offset: 144
	});
	$('body').headroom({
		offset: 144
	});

	$('.smooth-scroll').on('click', function(event){
		event.preventDefault();
		var target= $(this.hash);
		$('body,html').animate({
			'scrollTop': target.offset().top
			}, 1000
		);
	});

	$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

	$('input:not([type=submit]):not([type=file]):not([type=checkbox]):not([type=radio])').blur(function() {
		if ($(this).val()) {
			$(this).parents('.form-group').addClass('has-content');
		} else {
			$(this).parents('.form-group').removeClass('has-content');
		}
	});

	/*==========  Accordion  ==========*/
	$('.panel-heading a').on('click', function() {
		if ($(this).parents('.panel-heading').hasClass('active')) {
			$('.panel-heading').removeClass('active');
		} else {
			$('.panel-heading').removeClass('active');
			$(this).parents('.panel-heading').addClass('active');
		}
	});

	/*==========  Sponsor Slider  ==========*/
	$('.sponsor-slider').owlCarousel({
		loop: true,
		nav: false,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 3
			}
		}
	});
	$('.sponsor-slider-nav .next').on('click', function(e) {
		e.preventDefault();
		$('.sponsor-slider').trigger('next.owl.carousel');
	});
	$('.sponsor-slider-nav .prev').on('click', function(e) {
		e.preventDefault();
		$('.sponsor-slider').trigger('prev.owl.carousel');
	});
	$('.sponsor-slider-four').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 4
			}
		}
	});

	/*==========  Testimonial Slider  ==========*/
	$('.testimonial-slider').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 1
	});

	/*==========  Team Slider  ==========*/
	$('.team-slider').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		margin: 30,
		responsive: {
			0: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});

	$('.countTo').each(function(index) {
		var countTo = $(this);
		countTo.waypoint(function() {
			countTo.countTo({
				speed: 600,
				formatter: function(value, options) {
					value = value.toFixed(options.decimals);
					value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					return value;
				}
			});
		}, {
			offset: 'bottom-in-view'
		});
	});

	$('.timeline .item').on({
		mouseenter: function() {
			$(this).addClass('active');
		},
		mouseleave: function() {
			$(this).removeClass('active');
		}
	});

	/* COUNTDOWN */
	$("#countdown").countdown({
		date: "17 Mar 2017 09:00:00", // Put your date here
		format: "on"
	});

	/*==========  Portfolio Masonry  ==========*/
	var $projectMasonryContainer = $('#portfolio-masonry').imagesLoaded(function() {
		$projectMasonryContainer.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
				columnWidth: $projectMasonryContainer.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-masonry-filters').on('click', 'button', function() {
		$('#portfolio-masonry-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$projectMasonryContainer.isotope({filter: filterValue});
	});
	/*==========  Portfolio 3 Col  ==========*/
	var $project3ColContainer = $('#portfolio-3col').imagesLoaded(function() {
		$project3ColContainer.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
				columnWidth: $project3ColContainer.find('.portfolio-sizer')[0]
			}
		});
		return false;
	});
	$('#portfolio-3col-filters').on('click', 'button', function() {
		$('#portfolio-3col-filters button').removeClass('active');
		$(this).addClass('active');
		var filterValue = $(this).attr('data-filter');
		$project3ColContainer.isotope({filter: filterValue});
	});
	
	/*==========  Validate Email  ==========*/
	function validateEmail($validate_email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $validate_email ) ) {
			return false;
		} else {
			return true;
		}
		return false;
	}
	
	/*==========  Contact Form  ==========*/
	$('#contact-form').on('submit', function() {
		$('#contact-form').find('.button').prop('disabled', true);
		if (validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			var action = $(this).attr('action');
			$.ajax({
				type: "POST",
				url : action,
				data: {
					contact_name: $('#contact-name').val(),
					contact_email: $('#contact-email').val(),
					contact_website: $('#contact-website').val(),
					contact_message: $('#contact-message').val()
				},
				success: function() {
					$('#contact-form').find('.button').prop('disabled', false);
					swal({
						title: 'Success!',
						text: 'Thanks for contacting us!',
						type: 'success',
						html: true
					});
				},
				error: function() {
					$('#contact-form').find('.button').prop('disabled', false);
					swal({
						title: 'Error!',
						text: 'Sorry, an error occurred.',
						type: 'error',
						html: true
					});
				}
			});
		} else if (!validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			$('#contact-form').find('.button').prop('disabled', false);
			swal({
				title: 'Oops!',
				text: 'Please enter a valid email.',
				html: true
			});
		} else {
			$('#contact-form').find('.button').prop('disabled', false);
			swal({
				title: 'Oops!',
				text: 'Please fill out all the fields.',
				html: true
			});
		}
		return false;
	});

	/*==========  Newsletter Form  ==========*/
	var $form = $('#mc-embedded-subscribe-form');
	$form.on('submit', function() {
		$form.find('.button').prop('disabled', true);
		if (validateEmail($('#mce-EMAIL').val()) && $('#mce-EMAIL').val().length !== 0) {
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache: false,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				error: function(err) {
					$form.find('.button').prop('disabled', false);
					swal({
						title: 'Error!',
						text: err.msg,
						type: 'error',
						html: true
					});
				},
				success: function(data) {
					if (data.result !== 'success') {
						$form.find('.button').prop('disabled', false);
						swal({
							title: 'Wait!',
							text: data.msg,
							html: true
						});
					} else {
						$form.find('.button').prop('disabled', false);
						swal({
							title: 'Success!',
							text: data.msg,
							type: 'success',
							html: true
						});
					}
				}
			});
		} else {
			$form.find('.button').prop('disabled', false);
			swal({
				title: 'Error!',
				text: 'Please enter a valid email.',
				type: 'error',
				html: true
			});
		}
		return false;
	});

	/*==========  Footer Map  ==========*/
	var full_width_map;
	function initialize_full_width_map() {
		if ($('.full-width-map').length) {
			var myLatLng = new google.maps.LatLng(-37.814199, 144.961560);
			var mapOptions = {
				zoom: 12,
				center: myLatLng,
				scrollwheel: false,
				panControl: false,
				zoomControl: true,
				scaleControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
			};
			full_width_map = new google.maps.Map(document.getElementById('full-width-map'), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: full_width_map,
				title: 'Envato',
				icon: './images/marker.png'
			});
		} else {
			return false;
		}
		return false;
	}
	google.maps.event.addDomListener(window, 'load', initialize_full_width_map);

	/*==========  Map  ==========*/
	var map;
	function initialize_map() {
		if ($('.map').length) {
			var myLatLng = new google.maps.LatLng(13.6511597, 78.78559389999998);
			var mapOptions = {
				zoom: 14,
				center: myLatLng,
				scrollwheel: false,
				zoomControl: true,
				zoomControlOptions: {
					position:google.maps.ControlPosition.LEFT_BOTTOM
				},
				scaleControl: false,
				mapTypeControl: false,
				streetViewControl: false,
				draggable: false,
				styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"0.00"},{"lightness":"74"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"3"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
			};
			map = new google.maps.Map(document.getElementById('map'), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Shilanya',
				icon: './images/marker.png'
			});
		} else {
			return false;
		}
		return false;
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);

	/*==========  Ripples  ==========*/
	$('.ripples').ripples({
	resolution: 512,
	dropRadius: 30,
	perturbance: 1,
	});
	$('.ripples').ripples('drop', 200, 100, 30, 1)
	$('.ripples').ripples('drop', 500, 500, 30, 1)
	$('.ripples').ripples('drop', 1100, 300, 30, 1)


})(jQuery);