(function($){
	$.fn.junShuffle = function(options){
		var defaults = {
			shuffle:10,
			speed:20
		};
		var setting = $.extend(true, {},defaults,options);

		return this.each(function(i){
			var that = this;
			var str = $(this).text();
			$(this).text("");
			var randomArray = '_ ';

			var timeCnt = 0;
			var shuffleCnt = 0;
			var completeStr = '';
			var timeID = setInterval(function(){
				if(shuffleCnt < setting.shuffle){
					var randomNumber = Math.floor(0 + Math.random()*randomArray.length);
					var tempStr = completeStr+randomArray[randomNumber];
					shuffleCnt++;
					$(that).text(tempStr);
				}else {
					completeStr += str[timeCnt];
					shuffleCnt = 0;
					timeCnt++;
					$(that).text(completeStr);
				}

				if(timeCnt == str.length){
					clearInterval(timeID);
				}
			},setting.speed);//setInterval


		});

	};
})(jQuery);
