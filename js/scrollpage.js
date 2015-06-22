$(function(){
	$(".scroll").each(function(){
		var $container = $(this),
				$slideGroup = $container.find(".scroll-content"),
				$slides = $slideGroup.find("section"),
				$stops = $container.find(".elevation").find(".stops"),

				slideLength = $slides.length,
				elevationHtml = "",
				currentIndex = 0,
				duration = 1000,
				easing = "easeInSine",
				ft = 0;
				// timer;

		$slides.each(function(i){
			$(this).css({top: 640 * i + "px"});
			if(i < slideLength - 1 ) {
				elevationHtml += "<div class='stop stop-" + (i + 1) + "' data-step='"
				+ (slideLength - i - 1) + "'></div><div class='ticks'></div>"
			}
		});
    elevationHtml +="<div class='stop stop-0' data-step='0'></div>"
		$stops.html(elevationHtml);

		function goslide(index) {
			if(ft == index * 1000)
				return;
			var range = Math.abs(index - currentIndex);
			var refresh = setInterval(function(){
				if(ft < index * 1000){
					ft += 100;
					$(".height").text(ft);
				}else if(ft > index * 1000){
					ft -= 100;
					$(".height").text(ft);
				}else{
					clearInterval(refresh);
				}
			}, 100); // 0.1 increase per 0.1s => 1s (duration)
			$slideGroup.animate({top: - 640 * index + "px"}, duration * range, easing);
      $stops.animate({bottom: - 74 * index + 15 + "px"}, duration * range, easing);
			currentIndex = index;
			updateBase()
		}

		function updateBase() {
			$stops.find(".stop").removeClass("active").eq(currentIndex).addClass('active');
		}

		$stops.find(".stop").on("click", function(){
		  var step = $(this).data("step");
			 	goslide(step);
		  event.preventDefault();
		});

	});

	var mytext = document.getElementById('mytext');

	mytext.onkeypress = function(e){
	  e = e || window.event;
	  var keycode=e.charCode || e.keyCode;

	  if(keycode===115){
	    e.preventDefault();
	  	mytext.value+='o';
	    return;
	  }

	  if(keycode===103){
	    e.preventDefault();
	  	mytext.value+='i';
	    return;
	  }
	};
});