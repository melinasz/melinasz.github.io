			window.twttr = (function (d, s, id) {
			  var t, js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id; js.src= "https://platform.twitter.com/widgets.js";
			  fjs.parentNode.insertBefore(js, fjs);
			  return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
			}(document, "script", "twitter-wjs"));


			function scrollEffect() {
			    scrollPos = $(this).scrollTop();
			    
			    if (scrollPos >= $('#profile').offset().top - 130) {
			    	if ( !$('.header-container').is(':visible') ) {
			    		$('.header-container').fadeIn();
			    	}
			        $('nav a').removeClass('active');
			        $('nav a.profile').addClass('active');
			    }
			    if (scrollPos >= $('#work').offset().top - 150) {
			        $('nav a').removeClass('active');
			        $('nav a.work').addClass('active');
			    }
			    if (scrollPos >= $('#social').offset().top - 150) {
			        $('nav a').removeClass('active');
			        $('nav a.twitter').addClass('active');
			    }
			    
			    if (scrollPos <= $('#profile').offset().top - 175 && $('.header-container').is(':visible')) {
				    $('.header-container').fadeOut();
			    }

			}

			function capitaliseFirstLetter(string) {
			    return string.charAt(0).toUpperCase() + string.slice(1);
			}
			// anchor smooth scrolling
			function filterPath(string) {
			    return string.replace(/^\//,'').replace(/(index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'');
			}
			
			$(window).scroll(function() {
			    scrollEffect();
			});

			$(document).ready(function() {
				var locationPath = filterPath(location.pathname);
				$('nav a[href*=#], .link').each(function() {
				    var thisPath = filterPath(this.pathname) || locationPath;
				    if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/,'')) {
				        var $target = $(this.hash), target = this.hash;
				        if (target) {
				        $(this).on('click',function(event) {
				            event.preventDefault();
				            var targetOffset = $target.offset().top - 65;
				            $('html, body').animate({scrollTop: targetOffset}, 500, 'linear', function() {
				           // location.hash = target;
				            });
				        });
				        }
				    }
				});
				
			});
			
			/* detect touch */
			if("ontouchstart" in window){
			    document.documentElement.className = document.documentElement.className + " touch";
			}
			if(!$("html").hasClass("touch")){
			    /* background fix */
			    $(".parallax").css("background-attachment", "fixed");
			}
			
			/* fix vertical when not overflow
			call fullscreenFix() if .fullscreen content changes */
			function fullscreenFix(){
			    var h = $('body').height();
			    // set .fullscreen height
			    $(".content-b").each(function(i){
			        if($(this).innerHeight() <= h){
			            $(this).closest(".fullscreen").addClass("not-overflow");
			        }
			    });
			}
			$(window).resize(fullscreenFix);
			fullscreenFix();
			
			/* resize background images */
			function backgroundResize(){
			    var windowH = $(window).height();
			    $(".background").each(function(i){
			        var path = $(this);
			        // variables
			        var contW = path.width();
			        var contH = path.height();
			        var imgW = path.attr("data-img-width");
			        var imgH = path.attr("data-img-height");
			        var ratio = imgW / imgH;
			        // overflowing difference
			        var diff = parseFloat(path.attr("data-diff"));
			        diff = diff ? diff : 0;
			        // remaining height to have fullscreen image only on parallax
			        var remainingH = 0;
			        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
			            var maxH = contH > windowH ? contH : windowH;
			            remainingH = windowH - contH;
			        }
			        // set img values depending on cont
			        imgH = contH + remainingH + diff;
			        imgW = imgH * ratio;
			        // fix when too large
			        if(contW > imgW){
			            imgW = contW;
			            imgH = imgW / ratio;
			        }
			        //
			        path.data("resized-imgW", imgW);
			        path.data("resized-imgH", imgH);
			        path.css("background-size", imgW + "px " + imgH + "px");
			    });
			}
			$(window).resize(backgroundResize);
			$(window).focus(backgroundResize);
			backgroundResize();
			
			/* set parallax background-position */
			function parallaxPosition(e){
			    var heightWindow = $(window).height();
			    var topWindow = $(window).scrollTop();
			    var bottomWindow = topWindow + heightWindow;
			    var currentWindow = (topWindow + bottomWindow) / 2;
			    $(".parallax").each(function(i){
			        var path = $(this);
			        var height = path.height();
			        var top = path.offset().top;
			        var bottom = top + height;
			        // only when in range
			        if(bottomWindow > top && topWindow < bottom){
			            var imgW = path.data("resized-imgW");
			            var imgH = path.data("resized-imgH");
			            // min when image touch top of window
			            var min = 0;
			            // max when image touch bottom of window
			            var max = - imgH + heightWindow;
			            // overflow changes parallax
			            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
			            top = top - overflowH;
			            bottom = bottom + overflowH;
			            // value with linear interpolation
			            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
			            // set background-position
			            var horizontalPosition = path.attr("data-horiz-pos");
			            horizontalPosition = horizontalPosition ? horizontalPosition : "50%";
			            $(this).css("background-position", horizontalPosition + " " + value + "px");
			        }
			    });
			}
			if(!$("html").hasClass("touch")){
			    $(window).resize(parallaxPosition);
			    //$(window).focus(parallaxPosition);
			    $(window).scroll(parallaxPosition);
			    parallaxPosition();
			}

