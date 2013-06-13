(function($){
    if(!$.Pixel){
        $.Pixel = new Object();
    };
    
    $.Pixel.ProgressBar = function(el, width, height, show, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("Pixel.ProgressBar", base);
        
        base.init = function(){
            if( typeof( width ) === "undefined" || width === null ) width = 20;
            if( typeof( height ) === "undefined" || height === null ) height = 20;
            if( typeof( show ) === "undefined" || show === null ) show = false;
            
            base.width = width;
            base.height = height;
            base.show = show;
            
            base.options = $.extend({},$.Pixel.ProgressBar.defaultOptions, options);
            
            // Put your initialization code here
        };
        
        // Sample Function, Uncomment to use
        // base.functionName = function(paramaters){
        // 
        // };
        
        // Run initializer
        base.init();
    };
    
    $.Pixel.ProgressBar.defaultOptions = {
        color: "#fff",
        backgroundColor: "#000",
        toggleClass: "on"
    };
    
    $.fn.pixel_ProgressBar = function(width, height, show, options){
        return this.each(function(){
            (new $.Pixel.ProgressBar(this, width, height, show, options));
        });
    };
    
    // This function breaks the chain, but returns
    // the Pixel.ProgressBar if it has been attached to the object.
    $.fn.getPixel_ProgressBar = function(){
        this.data("Pixel.ProgressBar");
    };
    
})(jQuery);
