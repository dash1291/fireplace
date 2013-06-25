define('views/show_thread',
    ['l10n', 'underscore', 'z', 'urls', 'requests', 'user', 'nunjucks'],
    function(l10n, _, z, urls, requests, user, nunjucks) {
    'use strict';

    var gettext = l10n.gettext;

    z.page.on('click', '.reply.button.open-reply', function(e) {
        var $this = $(this);
        $this.siblings('.reply-box').removeClass('hidden');
        $this.removeClass('open-reply');
        $this.addClass('close-reply');
        $this.html('Cancel reply');
    });

    z.page.on('click', '.reply.button.close-reply', function(e) {
        var $this = $(this);
        $this.siblings('.reply-box').addClass('hidden');
        $this.removeClass('close-reply');
        $this.addClass('open-reply');
        $this.html('Respond');
    });

    z.page.on('keyup', '.reply-text', function(e) {
        var $this = $(this);
        var $replyBtn = $this.siblings('button.post');
        if ($this.val().length > 0) {
            $replyBtn.removeClass('disabled');
        } else {
            $replyBtn.addClass('disabled');
        }
    });

    var postNote = function($text_elem) {
        // TODO: fix hardcoded url
        var thread_url = ['/api/v1/comm/thread/', $text_elem.attr('data-thread-id'), '/'].join('');
        var data = {
            thread: thread_url,
            note_type: 0,
            body: $text_elem.val(),
        };

        requests.post(urls.api.url('notes'), data).done(function(data) {
            var $threadElem = $text_elem.parent().parent();

            // Add a new note element.
            var noteMarkup = nunjucks.env.getTemplate('comm/note_detail.html').render({note: data});
            var $noteCount = $threadElem.find('.note-count');
            var count = Number($noteCount.attr('data-count'));
            $noteCount.html(count + 1 + ' notes');
            $noteCount.attr('data-count', count + 1);
            $threadElem.siblings('.notes-container').prepend(noteMarkup);

            // Close the reply box.
            var $replyButton = $threadElem.find('.reply.button.close-reply');
            $threadElem.find('.reply-box').addClass('hidden');
            $replyButton.removeClass('close-reply');
            $replyButton.addClass('open-reply');
            $replyButton.html('Respond');
            $text_elem.siblings('button.post').addClass('disabled');
            $text_elem.val('');

        }).fail(function() {
            // report the error here
            console.log('failed');
        });
    };

    z.page.on('click', 'button.post', function(e) {
        postNote($(this).siblings('.reply-text'));
    });

    return function(builder, args, params) {
        console.log(args);
        builder.start('comm/main.html', {
            endpoint: urls.api.url('threads'),
        });
    };
});