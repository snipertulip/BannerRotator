﻿; (function($, window, document, undefined) {

    var Rotator = function(ele, opt) {

        this.$element = ele,
        this.defaults = {
            'millisec': 3000
        },
        this.options = $.extend({},
        this.defaults, opt);

        this.last_i = 0,
        this.current_i = 0,
        this.i_count = 0,
        this.li_cache = {},
        this.li_cache_btn = {},
        this.interval = {};
        this.li_cache = this.$element.find('.animation li'),
        this.li_cache_btn = this.$element.find('.button li');
        this.i_count = this.li_cache.length;
        //解决命名空间问题，这是闭包吗？很神奇……
        (function($this) {
            $this.li_cache_btn.each(function(index, element) {
                $(this).bind("mousedown",
                function() {
                    if ($this.index !== $this.last_i) {
                        $this.current_i = index;
                        clearInterval($this.interval);
                        $this.action();
                        $this.interval = setInterval($this.action.bind($this), $this.options.millisec);
                    }
                })
            });
        })(this);
        this.action();
        this.interval = setInterval(this.action.bind(this), this.options.millisec);
    }

    Rotator.prototype = {
        action: function() {
            return (function($this) {
                $this.li_cache.each(function(index, element) {
                    //reset animation.
                    if ($this.last_i != $this.current_i && index === $this.last_i) {
                        $(element).find('[data-easing]').each(function(index, element) {
                            $(element).animate($.parseJSON(($(element).attr('data-from')).replace(/\'/g, '"')), $(element).attr('data-speed'), $(element).attr('data-easing'));
                        });
                        //reset button.
                        $($this.li_cache_btn[index]).removeClass("active")
                    }
                    //active current animation.
                    if (index === $this.current_i) {
                        $(element).find('[data-easing]').each(function(index, element) {
                            $(element).animate($.parseJSON(($(element).attr('data-to')).replace(/\'/g, '"')), $(element).attr('data-speed'), $(element).attr('data-easing'));
                        });
                        //active current button.
                        $($this.li_cache_btn[index]).addClass("active")
                    }
                });
                if ($this.i_count === $this.current_i + 1) {
                    $this.last_i = $this.current_i,
                    $this.current_i = 0;
                } else {
                    $this.last_i = $this.current_i++;
                }
            } (this));
        }
    }

    $.fn.html5Rotator = function(options) {
        new Rotator(this, options);
    }
})(jQuery, window, document);