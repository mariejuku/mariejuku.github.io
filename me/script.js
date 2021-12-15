$( document ).ready(function() {

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    $('.dropdown-name button').click(function(){
        var string = $(this).html();
        $('.btn-name').html(string);
    });
});