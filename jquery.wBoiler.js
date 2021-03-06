// keep all your code in a closure.
(function($)
{
    // make your plugin names unique.
    $.fn.wBoiler = function(option, settings)
    {
        // check if user is setting/getting properties manually after plugin creation.
        if(typeof option === 'object')
        {
            settings = option;
        }
        else if(typeof option === 'string')
        {
            var values = []; // return 0 or more values if getting settings.

            // even when setting/getting values we don't want to break jQuery method
            // chaining, so run what we need to and return the element except when
            // returning values in which case we will return 0 or more values.
            var elements = this.each(function()
            {
                var data = $(this).data('_wBoiler');

                if(data)
                {
                    // we can create any special cases and call necessary functions.
                    if(option === 'reset') { data.reset(); }
                    else if(option === 'theme') { data.setTheme(settings); }
                    else if($.fn.wBoiler.defaultSettings[option] !== undefined)
                    {
                        if(settings !== undefined) { data.settings[option] = settings; }
                        else { values.push(data.settings[option]); }
                    }
                }
            });

            if(values.length === 1) { return values[0]; }
            if(values.length > 0) { return values; }
            else { return elements; }
        }

        // iterate through all elements and return them to maintain jQuery method chaining.
        return this.each(function()
        {
            var $elem = $(this);

            // create a local copy of settings extending the defaults
            // this ensures that only values for current element are changed.
            var $settings = $.extend({}, $.fn.wBoiler.defaultSettings, settings || {});

            // create a plugin object
            var boiler = new Boiler($settings, $elem);

            // typically some generation code for the plugin will be run around here.
            var $el = boiler.generate();

            // run some code here, try to keep as much of the main code in the prototype 
            // methods as possible focus on just setting up the plugin and calling proper
            // methods from here.
            $('body').append($el);

            // store the object for later reference
            $elem.data('_wBoiler', boiler);
        });
    }

    // provide default settings, keeping it one spot like this makes it much
    // easier for developers to understand how your plugin works.  It also makes
    // it simpler for developers to modify the defaults like so:
    // $.fn.wBoiler.defaultSettings.theme = 'green';
    $.fn.wBoiler.defaultSettings = {
        theme       : 'red',
        onClick     : null
    };

    // create our plugin "class"
    // this will store the unique individual properties for each instance of the plugin
    function Boiler(settings, $elem)
    {
        this.boiler = null;
        this.settings = settings;
        this.$elem = $elem;

        return this;
    }

    // prototype the plugin class
    // this will contain methods shared amongst all plugin instances
    // DO NOT keep any unique plugin properties here
    Boiler.prototype = 
    {
        generate: function()
        {
            // set local reference of this
            // this will be important when using in other closures like event closures
            var $this = this;

            // return the plugin incase it has already been created
            if($this.boiler) return $this.boiler;

            // write some code
            $this.boiler = $('&lt;div class="_wBoiler_holder">&lt;/div>');

            $this.boiler
            .click(function()
            {
                $this.boiler.html('you clicked me!');

                if($this.settings.onClick) $this.settings.onClick.apply($this, []);
            })
            .mousedown(function() //works on mobile too
            {
                $this.boiler.html('you mouse downed me!');
            });

            $this.bindMobile($this.boiler);
            $this.setTheme($this.settings.theme);
            $this.reset();

            // return the plugin object (sometimes this might be the elment itself)
            return $this.boiler;
        },

        setTheme: function(theme)
        {
            this.settings.theme = theme;
            this.boiler.attr('class', '_wBoiler_holder _wBoiler_' + this.settings.theme);
        },

        reset: function()
        {
            this.boiler.html('click me');
        },

        // bind mobile events to an element
        bindMobile: function($el, preventDefault)
        {
            $el.bind('touchstart touchmove touchend touchcancel', function ()
            {
                var touches = event.changedTouches, first = touches[0], type = ""; 

                switch (event.type)
                {
                    case "touchstart": type = "mousedown"; break; 
                    case "touchmove": type = "mousemove"; break; 
                    case "touchend": type = "mouseup"; break; 
                    default: return;
                }

                var simulatedEvent = document.createEvent("MouseEvent"); 

                simulatedEvent.initMouseEvent(
                    type, true, true, window, 1, 
                    first.screenX, first.screenY, first.clientX, first.clientY, 
                    false, false, false, false, 0/*left*/, null
                );
                first.target.dispatchEvent(simulatedEvent);
                if(preventDefault) event.preventDefault();
            });
        }
    }
})(jQuery);