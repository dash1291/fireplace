define('views/apiplayground',
    ['z', 'requests', 'urls'],
    function(z, requests, urls) {
    'use strict';

    function buildUrl(url, args, params) {
        var arg = null;
        var val = '';
        var regex = null;
        var matches;
        var regex = /\/\(.+?\)\//g;

        var i = 0;
        url = url.replace(regex, function() {
            return '/' + args[i++] + '/';
        });

        return url
    }

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

        if (method == 'get') {
            var params = {};
            $this.siblings('.request-params').find('input').each(function() {
                var $_this = $(this);
                params[$_this.data('name')] = $_this.val();
            });

            url = urls.absolutifyApiUrl(url, params);
            console.log(url);
            var args = [];
            $this.siblings('.url-args').find('input').each(function() {
                var $_this = $(this);
                args.push($_this.val());
            });

            url = buildUrl(url, args, params);
            requests.get(url).done(function(data) {
                console.log($this);
                $this.siblings('.response').html(JSON.stringify(data, null, '  '));
            });
        }
    });

    return function(builder) {
        builder.start('playground.html');
    };
});
