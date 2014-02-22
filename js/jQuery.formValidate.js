(function($){
	$.fn.formValidate = function(options){
		var defaults = {
			groupClass:"group1,group2",
			errorColor:"red"
		};
		var setting = $.extend(true, {}, defaults,options);

		return this.each(function(){
			var that = this;
			var errors = [];

			$(that).find('input[type="submit"]').on('click',function(){


				checkRequired();

				console.log(errors);
				return false;

				/*==================================
				//functions
				==================================*/
				function checkRequired(){
					var target = $(that).find('.required');
					target.each(function(index, el) {
						if($(el).val() === ''){
							$(this).addClass('error');
							errors.push({index:index,errorType:'empty'});
						}
						errors.push({index:index,errorType:''});
						$(this).on('click blur keydown keyup keypress change',function(){
							if($(this).val() == '' && !$(this).hasClass('error')){
								$(this).addClass('error');
							}else{
								$(this).removeClass('error');
							}
						});
					});//each



				}//checkRequired


			});//each
		});

	};
})(jQuery);