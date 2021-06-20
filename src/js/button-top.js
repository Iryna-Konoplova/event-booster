// jQuery(document).ready(function() {
//     jQuery("a.scrollto").click(function () {
//         elementClick = jQuery(this).attr("href")
//         destination = jQuery(elementClick).offset().top;
//         jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
//         return false;
//     });
// });


$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) { 
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
     
    $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});
