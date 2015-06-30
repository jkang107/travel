		function resizeImage() {
			//1. get image width, height size
			var imgHeight = parseInt($("#worldImage").css("height"), 10);
			var imgWidth = parseInt($("#worldImage").css("width"), 10);
			var resizeWidth, resizeHeight;

			//2. get ratio
			var ratio = imgHeight / imgWidth;

			//3. get screen size
			if(innerWidth > innerHeight) {
				if(innerWidth - 250 < imgWidth || innerHeight - 250 < imgHeight) {
					resizeHeight =  innerHeight - 250;
					resizeWidth = resizeHeight / ratio;
				}
				
			} else {
				if(innerWidth - 250 < imgWidth) {
					resizeWidth =  innerWidth - 250;
					resizeHeight = resizeWidth * ratio;
				}
			}
			$("#worldImage").css({"width": resizeWidth, "height": resizeHeight});
			$("#worldImage").show();
		}


		function calculateDDay() {
			var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd < 10) {
			    dd = '0'+dd;
			} 
			if(mm < 10) {
			    mm = '0'+mm;
			} 

			var todayDate = new Date(yyyy, mm, dd);
			var startDate = new Date(2014,09,23);
			var finishDate = new Date(2015,03,11);

			var diffDays = Math.round((finishDate.getTime() - startDate.getTime())/(oneDay));
			if(diffDays == 0 || diffDays == "0") {
				diffDays = "Day";
			} else if(diffDays > 0) {
				diffDays = "+" + diffDays;
			}
			$("#worldMapStr").text("D" + diffDays);
		}
		/* YouTube API */
		function onYouTubeIframeAPIReady() {
			player = new YT.Player('player', {
			  height: '390',
			  width: '640',
			  videoId: 'HFMzj0Wrl0o',
			  playerVars: { 'autoplay': 0, 'controls': 0 },
			  events: {
			    'onReady': onPlayerReady,
			    'onStateChange': onPlayerStateChange
			  }
			});
		}

		// 4. The API will call this function when the video player is ready.
		function onPlayerReady(event) {
			event.target.playVideo();
		} 

		// 5. The API calls this function when the player's state changes.
		//    The function indicates that when playing a video (state=1),
		//    the player should play for six seconds and then stop.
		var done = false;
		function onPlayerStateChange(event) {
			if (event.data == YT.PlayerState.PLAYING && !done) {
		  	setTimeout(stopVideo, 6000);
		  	done = true;
			}
		}
		function stopVideo() {
			player.stopVideo();
		}

		function moveToPhotoSlide(regionCode) {
			var slides = $(".slides");
			var destiny = null;
			destiny = slides.children().children().siblings("#" + regionCode);
			$.fn.fullpage.landscapeScroll(slides, destiny);
			//loadPhotos(regionCode);
		}

		function setImage() {
			var temp = "<div class='brick' style='width:{width}px;'><img src='{index}' width='100%'></div>";
			var w = 1, html = '';
			for (var i = 0; i < imgAlbumList.length; ++i) {
				w = 1 + 2* Math.random() << 0;
				html += temp.replace(/\{width\}/g, w*150).replace("{index}", imgAlbumList[i].thumbnail);
			}
			$("#freewall").html(html);
			
			var wall = new freewall("#freewall");
			wall.reset({
				selector: '.brick',
				animate: true,
				cellW:100,
				cellH: 'auto',
				/*gutterY: 'auto',
					gutterX: 'auto',*/
				onResize: function() {
					//wall.fitWidth(($(window).width())/0.7);
					wall.fitWidth();
				}
			});

			var images = wall.container.find('.brick');
			var length = images.length;
			images.css({visibility: 'hidden'});
			images.find('img').load(function() {
				-- length;
				if (!length) {
					setTimeout(function() {
						images.css({visibility: 'visible'});
						//wall.fitWidth(($(window).width())/0.7);
						wall.fitWidth(1500);
					}, 505);
				}
			});
		}
