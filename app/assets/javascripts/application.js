// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require masonry/jquery.masonry


function popState() {
	$('#single, #ghost').hide();	
	$('.link a').on('click', function(e){
		e.preventDefault();

		$('body').css('overflow-y', 'hidden');
		var $link = $(this).attr('href');
		var $segment = $link + ' #link'

		$('#single').load( $segment, function() {
			console.log($segment);
			$('#close, #ghost').on('click', function(){
				$('#single').fadeOut(150).removeClass('active');
				$('#ghost').fadeOut(150);
				$('body').css('overflow-y', 'scroll');
			});

		}).fadeIn(150).addClass('active');
		$('#ghost').fadeIn(150);
	});
}



function reReady(){
	var $container = $('.container');
	// initialize
	$container.masonry({
		itemSelector: '.link',
		columnWidth: 300,
		gutterWidth: 50,
		isAnimated: true
	});
	popState()
}



$(document).ready(function(){

	function randomSymbol(){
		var symbols = ['✖', '☂', '', '✔', '✌', '✏', '☀', '☼', '◵', '❖', '◆', '⎔', '⊕', '⧫', '⧄', '✜'];
		var randomNum = Math.floor(Math.random() * symbols.length);
		return symbols[randomNum]
	}
	randomSymbol();
	
	// 
	$('.home').empty().append(randomSymbol());
	$('document.title').empty().append(randomSymbol());




});

$(window).load( function(){
	reReady()
});

$(document).on('page:load', function(){
	reReady()
});




