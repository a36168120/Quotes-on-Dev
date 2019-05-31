
(function ($) {
    $('#toggle-status').on('click', function (event) {
        
        event.preventDefault();

        $.ajax({
            method: 'post',
            url: api_vars.rest_url + 'wp/v2/posts/' + api_vars.post_id,
        })
            .done(function (response) {
                alert('Success! Status changed');
            });
    });
})(jQuery);