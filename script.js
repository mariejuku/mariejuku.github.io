$( document ).ready(function() {

    //set up random elements on the page
    var colours = ['#FFC926','#00DF70','#FA0032','#00EBFF'];
    var logos = ['lagoon','canyon','stadium','valley'];
    var backgroundsCount = 46;
    var random;
    random = Math.floor(Math.random()*logos.length);
    $(".mainLogo").attr("src","logo/"+logos[random]+".png");
    random = Math.floor(Math.random()*backgroundsCount);
    $("html").attr("style","background-image: url('sitebackground/img ("+random+").jpg');");

    $( ".randomColour" ).each(function() {
        var random = Math.floor(Math.random()*logos.length);
        $( this ).css( "color", colours[random]);
      });
    

});