(function ($) {

    $(function() {

        let lastPage = '';

        // Events
        // $('#new-quote-button').on('click', getRandomQuote);
        // $('#quote-submission-form').on('submit', postQuote);


        // Get request
        $('#new-quote-button').on('click', getRandomQuote);
        function getRandomQuote (event) {
            event.preventDefault();

            lastPage = document.URL;

            $.ajax({
                method: 'get',
                url: api_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
            })
            .done(function(data){
                const randomQuote = data [0];
                console.log(randomQuote);
                // update the Dom with the returened quote
                history.pushState(null, null, randomQuote.slug);
            })
            .fail(function(){
                // append a message it went wrong
            });

            $(window).on('popstate', function(){
                window.location.replace(lastPage);
            });
        } // End of RandomQuote


        // Post request
        $('#quote-submission-form').on('submit', postQuote);
        function postQuote(event) {
            event.preventDefault();
            console.log('form submitted');

            const quoteAuthor = $('#quote-author').val();

            if (quoteAuthor !== '') {
                // check if the field is empty
                postAjax();
            } else {
                console.log ('no input');
            }
            // Post Ajax
            function postAjax() {
                $.ajax({
                    method: 'post',
                    url: api_vars.rest_url + 'wp/v2/posts',
                    data: {
                        // TODO use the form input .val() for the title, content
                        title: quoteAuthor,
                        content: 'The most amazing quote by Gordon Ramsey',
                        post_status: 'pending'
                        // _qod_quote_source:
                        // _qod_quote_source_url:
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
                    }
                })
                .done(function() {
                    console.log('yay');
                    $('#quote-submission-form').slideUp(2000);
                })
                .fail(function() {
                    console.log('nooo');
                });

            } // End of Post Ajax
        } // Enf of Post Request
    }); // End of Doc ready
})(jQuery);