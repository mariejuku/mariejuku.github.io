$( document ).ready(function() {
    $('.dropdown-name button').click(function(){
        var string = $(this).html();
        $('.btn-name').html(string);
    });
});