define('views/apiplayground',
    ['z'],
    function(z) {
    'use strict';

   	z.page.on('click', '.api-endpoint', function(e) {
   		var $this = $(this);
   		$('.options').hide();

   		$this.parent().siblings('.options').show();
   		$('.endpoint-container').removeClass('focused');
   		$this.parent().parent().addClass('focused');
   	});

    return function(builder) {
    	builder.start('playground.html');
    };
});
