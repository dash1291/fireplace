define('views/apiplayground',
    ['z', 'requests', 'urls'],
    function(z, requests, urls) {
    'use strict';

    z.page.on('click', '.api-endpoint', function(e) {
        var $this = $(this);
        $('.options').hide();

        $this.parent().siblings('.options').show();
        $('.endpoint-container').removeClass('focused');
        $this.parent().parent().addClass('focused');
    });

    z.page.on('click', '.api-name', function() {
        $('.endpoints-container').addClass('hidden');
        $(this).parent().siblings('.endpoints-container').removeClass('hidden');
    });

    z.page.on('click', '.send-request', function() {
        var $this = $(this);
        var url = $this.parent().parent().data('url');
        var method = $this.parent().parent().data('method');
        console.log(method);
        if (method=='get') {
            var url = urls.absolutifyApiUrl(url);
            requests.get(url).done(function(data) {
                $this.siblings('.response').html(JSON.stringify(data, null, '  '));
            });
        }
    });

    return function(builder) {
        builder.start('playground.html');
    };
});
