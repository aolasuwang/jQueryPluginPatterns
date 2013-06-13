jQuery Plugin Patterns
----------------------------
This is a collection of some great jQuery pluin templates which can help the developers to create their own jQuery plugins quickly.

I prefer to use the first one, but all of them can help me to understanding jQuery plugin mechanism well.

Notes about jQuery plugin development
-------------------------------------
There are two jQuery Plugin Types: 

1) Plugin that works on element

This kind of plugin is actually extention to the jQuery prototype (or $.fn):

```javascript
$.fn.myPlugin = function() {
  ... //plugin content
}
```
Usage is like this:
```javascript
$('#my-elem').myPlugin();
```

2) Plugin that doesn’t work on element
They are actually functions that located in the jQuery object (or $):
```javascript
$.myPlugin = function() {
  ... //plugin content
}

Usage is like this:
```javascript
$.myPlugin();
```


jQuery Plugin Patterns LIST
------------------------------

jquery.boilerplate.js
http://jqueryboilerplate.com/

jquery.wBoiler.js
http://www.websanova.com/tutorials/jquery/jquery-plugin-development-boilerplate
http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins
http://www.websanova.com/tutorials/jquery/10-coding-tips-to-write-superior-jquery-plugins

jquery.hilight.js
[Tutorial]
http://www.learningjquery.com/2007/10/a-plugin-development-pattern
[中文翻译]http://www.iteye.com/topic/545971

jquery.pixel.progressbar.js
[online generation tool]
http://starter.pixelgraphics.us/


jquery.plugin.js
jquery.plugin.oop.js  (OOP version)
http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/


jquery.plugin.global.js  (Template of plugin that does not work on an element)
jquery.plugin.element.js (Template of plugin that does work on an element)
http://www.webdeveasy.com/jquery-plugin-pattern/


A great tutorial on jQuery plugin patterns:
http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/

