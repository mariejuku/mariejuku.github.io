$( document ).ready(function() {

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    $('.dropdown-name button').click(function(){
        var string = $(this).html();
        $('.btn-name').html(string);
    });

    $('.row.collapse').on('show.bs.collapse', function () {
        $(this).find("video").each(function(){
            $(this).get(0).play(); 
        });
    });
    $('.row.collapse').on('shown.bs.collapse', function () {
        //pause all still hidden
        $('.row.collapse:not(.show) video').each(function(){
            $(this).get(0).pause(); 
        }); 
    });
    $('.row.collapse').on('hidden.bs.collapse', function () {
        $(this).find("video").each(function(){
            $(this).get(0).pause(); 
        }); 
    });

    //play all shown
    $('.row.collapse.show video').each(function(){
        $(this).get(0).play(); 
    }); 
    //pause all hidden
    $('.row.collapse:not(.show) video').each(function(){
        $(this).get(0).pause(); 
    }); 
});