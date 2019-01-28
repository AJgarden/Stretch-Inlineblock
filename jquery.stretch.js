/*!
 * stretch.js v0.1901
 * @copyright 2019 AJgarden
 * ##### Author: Jia #####
 * ##### Update: 2019/01/28 #####
 */
 
$.fn.stretch = function(options) {

  var $selector = $(this);

  var defaults = {
    item: '.stretch-item',
    stretch: '.stretch-target'
  };

  var settings = $.extend({}, defaults, options);

  $selector.each(function(i,element) {
    var elem = $(element);

    elem.css('position', 'relative').attr('data-stretch', 'init').attr('data-bp', 0);

    $(window).on('resize', function() {
      var bp = elem.outerWidth();
      // do if breakpoint is different with last doing
      if (bp != parseInt(elem.attr('data-bp'))) {
        var target = $(settings.item,elem);
        var count = 0;
        target.each(function(j,t) {
          if ($(t).position().top == 0)
            count++;
          else
            return false;
        });

        $(settings.stretch,elem).css('height', 'auto');
        var row = Math.ceil(target.length/count);
        var heightGroup = new Array();
        var heightTemp = 0;
        target.each(function(k,t) {
          if (k%count == 0) heightTemp = 0;
          var stretch = $(settings.stretch,$(t));
          if (stretch.outerHeight() > heightTemp)
            heightTemp = stretch.outerHeight();
          heightGroup[Math.floor(k/count)] = heightTemp;
        });

        target.each(function(l,t) {
          $(settings.stretch,$(t)).css('height', heightGroup[Math.floor(l/count)]);
        });
      }
    }).trigger('resize');
  });

};
