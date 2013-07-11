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
        var html = $this.parent().siblings('.options').html();
        var left = $this[0].offsetLeft;
        var top = $this[0].offsetTop;
        var width = $this[0].offsetWidth;
        //$this.parent().siblings('.options').show();
        $('.playfield').html(html);
    });

    z.page.on('click', '.api-name', function() {
        $('.endpoints-container').addClass('hidden');
        $(this).closest('.api-container').find('.endpoints-container')
                                         .removeClass('hidden');
    });

    z.page.on('click', 'input[name="view-selector"]', function() {
        var $this = $(this);
        var view_name = $this.val();
        $this.parent().siblings('.view').hide();
        $this.parent().siblings('.' + view_name + '-view').show();
    });

    z.page.on('click', '.send-request', function() {
        var $this = $(this);
        var url = $this.data('url');
        var method = $this.data('method');

        var params = {};
        $this.parent().siblings('.request-view').find('.request-params input').each(function() {
            var $_this = $(this);
            var val = $_this.val();
            if (val.length > 0) {
                params[$_this.data('name')] = val;
            }
        });

        var args = [];
        $this.parent().siblings('.request-view').find('.url-args input').each(function() {
            var $_this = $(this);
            args.push($_this.val());
        });

        function errorHandler(err) {
            var json = JSON.stringify(err.responseText, null, '  ');
            $this.siblings('.response-view').html('<div><p class="error">Error occured</p><pre>' + json + '</pre></div>');
        }

        function responseHandler(data) {
            // Display response in to the response panel.
            $this.parent().siblings('.response-view').html('<pre>' + JSON.stringify(data, null, '  ') + '</pre>');
            $this.siblings('.response-selector').trigger('click');
        }

        switch (method) {
            case 'get':
                url = buildUrl(url, args, params);
                url = urls.absolutifyApiUrl(url, params);
                requests.get(url).done(responseHandler).fail(errorHandler);
                break;

            case 'post':
                // TODO: pass params to the absolutify
                url = urls.absolutifyApiUrl(url);
                url = buildUrl(url, args, params);
                requests.post(url).done(responseHandler).fail(errorHandler);
                break;
        }
    });

    return function(builder) {
        builder.start('playground.html');
    };
});
