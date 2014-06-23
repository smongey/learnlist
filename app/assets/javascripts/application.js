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

/*! waitForImages jQuery Plugin 2013-07-20 */
!function(a){var b="waitForImages";a.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"]},a.expr[":"].uncached=function(b){if(!a(b).is('img[src!=""]'))return!1;var c=new Image;return c.src=b.src,!c.complete},a.fn.waitForImages=function(c,d,e){var f=0,g=0;if(a.isPlainObject(arguments[0])&&(e=arguments[0].waitForAll,d=arguments[0].each,c=arguments[0].finished),c=c||a.noop,d=d||a.noop,e=!!e,!a.isFunction(c)||!a.isFunction(d))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var h=a(this),i=[],j=a.waitForImages.hasImageProperties||[],k=/url\(\s*(['"]?)(.*?)\1\s*\)/g;e?h.find("*").addBack().each(function(){var b=a(this);b.is("img:uncached")&&i.push({src:b.attr("src"),element:b[0]}),a.each(j,function(a,c){var d,e=b.css(c);if(!e)return!0;for(;d=k.exec(e);)i.push({src:d[2],element:b[0]})})}):h.find("img:uncached").each(function(){i.push({src:this.src,element:this})}),f=i.length,g=0,0===f&&c.call(h[0]),a.each(i,function(e,i){var j=new Image;a(j).on("load."+b+" error."+b,function(a){return g++,d.call(i.element,g,f,"load"==a.type),g==f?(c.call(h[0]),!1):void 0}),j.src=i.src})})}}(jQuery);

function popState() {
	$('#single, #ghost').hide();	
	$('.link a.in').on('click', function(e){
		e.preventDefault();

		$('body').css({
			'overflow': 'hidden',
			'height': '100%'
		});
		var $link = $(this).attr('href');
		var $segment = $link + ' #link'

		$('#single').load( $segment, function() {
			console.log($segment);
			$('#close, #ghost').on('click', function(){
				$('#single').fadeOut(150).removeClass('active').empty();
				$('#ghost').fadeOut(150);
				$('body').css({
					'overflow-y': 'scroll',
					'height': 'auto'
				});
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

	popState();
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
	document.title = randomSymbol();




});

$(window).load( function(){
	reReady()
});

$(document).on('page:load', function(){
	
	reReady();

	$('.container').waitForImages(function(){
		var $container = $(".container");
		$container.imagesLoaded(function() {
			return $container.masonry({
				itemSelector: '.link',
				columnWidth: 300,
				gutterWidth: 50,
				isAnimated: true
			});
    });
	});
});



