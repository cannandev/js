 // custom js for cannanso.com

function slideShow() {
	var active = $('#testimonials .active');
	var next = active.next().length ? active.next() : active.siblings('.item').first();

	next.fadeIn().addClass('active');
	active.fadeOut().removeClass('active');

//	setInterval( slideShow, 5000 );
}

function posLightboxImg() {
	// displays image in the center of screen
	var top = ($(window).height() - $('#lightbox').height()) / 2;
	var left = ($(window).width() - $('#lightbox').width()) / 2;
	$('#lightbox')
		.css('top', top)
		.css('left', left)
		.fadeIn();
}

function removeLightbox() {
	$('#lb-overlay, #lightbox').fadeOut('slow', function() {
		$(this).remove();
		$('body').css('overflow-y', 'auto'); // show scrollbars
	});
}

$(document).ready(function(){

	var win = $(window), 
		nav = $('.page-home header'),
		navBarHeight = nav.outerHeight()+1,
		navItems = $('#main-menu a');

	
	win.scroll(function(){

		var curPos = win.scrollTop();

		//sticky nav
		if (!nav.hasClass('fixed') && (curPos > nav.offset().top)){
			nav.addClass('fixed').data('top', nav.offset().top);
			$('.top-link').fadeIn();
		}
		else if (nav.hasClass('fixed') && (curPos < nav.data('top'))){
			nav.removeClass('fixed');
			$('.top-link').fadeOut();
		}

		//active state of sticky nav
		$('section').each(function(){
			var top = $(this).offset().top - navBarHeight,
			bottom = top + $(this).outerHeight(),
			sectionId = $(this).attr('id');
			if(curPos >= top && curPos <= bottom) {
				navItems.removeClass('active');
				navItems.filter('[href="#' + sectionId + '"]').addClass('active');
			}
		});
	});

	//smooth scrolling
	navItems.click(function(e){
		var href = $(this).attr('href'),
			offsetTop = $(href).offset().top - navBarHeight+1;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 800);
		e.preventDefault();
	});	

	//scroll-to-top link
	$('.top-link').click(function(e){
		$('html, body').animate({
			scrollTop: 0
		}, 'slow');
		e.preventDefault();
	});

	//testimonal slideshow
	/* Since absolute positioning each item removes it from the DOM, 
	 give a flexible height to the wrapper. */
	var itemHeight = $('#testimonials .item').outerHeight();
	$('#testimonials .wrapper').css('height', itemHeight); 

	$('#testimonials a[role=button]').click(function(e){
		slideShow();
		e.preventDefault();
	});

	//portfolio carousel
	$('.owl-carousel').owlCarousel({
    items : 3,
    autoPlay : 4000,
    stopOnHover : true,
	});

	//portfolio thumb overlay
	$('#portfolio .thumb').hover(
		function() {
			$(this).find('.tb-overlay').fadeIn();
		}, 
		function() {
			$(this).find('.tb-overlay').fadeOut();
	});

	//portfolio lightbox
	$('.preview').click(function() {
		$('body').css('overflow-y', 'hidden'); // hide scrollbars

		$('<div id="lb-overlay"></div>')
			.css('opacity', '0')
			.animate({'opacity': '0.9'}, 'slow')
			.appendTo('body');

		$('<div id="lightbox"></div>')
			.hide()
			.html('<a class ="close fa fa-close" href="#"></a>')	
			.appendTo('body');

		$('<img>')
			.attr('src', $(this).attr('href'))
			.load(function(){
				posLightboxImg();
		})
		.click(function() {
			removeLightbox();
		})
		.appendTo('#lightbox');

		$('.close').click(function() {
			removeLightbox();
		});

		return false;
	});	

	//contact form placeholder fix for IE
	// $('[placeholder]').focus(function() {
	//   var input = $(this);
	//   if (input.val() === input.attr('placeholder')) {
	//     input.val('');
	//   }
	// }).blur(function() {
	//   var input = $(this);
	//   if (input.val() === '' || input.val() === input.attr('placeholder')) {
	//     input.val(input.attr('placeholder'));
	//   }
	// }).blur();	

	//contact form validation
	$('#contact form').on('submit', function() {		
		$('.form-control').each(function() {
			if (!$(this).val().length) {
				$(this).css('border-color', 'red');
			} 
		})
		.blur(function() {
			if ($(this).val().length) {
				$(this).css('border-color', 'green');
			}
		});	
	});

	//toggle open/close
	// $('.toggle').click(function(){
	// 	if($('#contact').is(':hidden')) {
	// 		$('#contact').slideDown('slow');
	// 	}
	// 	else {
	// 		$('#contact').slideUp('slow');
	// 	}
	// });

	//portfolio page animations
	$('.page-portfolio').hide(0).delay(400).fadeIn('slow');


}); //document.ready()

