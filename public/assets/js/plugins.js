// Smart Resize
(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }
      if (timeout)        clearTimeout(timeout);
      else if (execAsap)  func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 50);
    };
  };
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');


jQuery(document).ready(function($) {


    $('.toggleimage .icon-picture').click(function () {  
        if($(this).hasClass('notpresent')){
            $(this).removeClass('notpresent');
            $(('.searchimage')).removeClass('notpresent');
        }else{
            $(this).addClass('notpresent');
            $(('.searchimage')).addClass('notpresent');
        }

    });  

/*
        if($('.modalwrap h3').html()=="Order Confirmation"){
            setTimeout(function() {       
                location.href="/";
            }, 200);
        }
*/

});