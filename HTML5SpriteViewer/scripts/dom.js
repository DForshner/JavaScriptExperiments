//
// Helper module for manipulating DOM elements.
//
app.dom = (function() {
  var $ = Sizzle;

  // Returns true if class is found
  function hasClass(el, clsName) {
    var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
    return regex.test(el.className);
  }

  // Adds class to CSS element
  function addClass(el, clsName) {
    if (!hasClass(el, clsName)) {
      el.className += " " + clsName;
    }
  }

  // Removes CSS class from element
  function removeClass(el, clsName) {
    var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
    el.className = el.className.replace(regex, " ");
  }

  // finds element based on selector and attaches handler to event
  function bind(el, event, handler) {
    // If type is string use selector to find element otherwise
    // assume DOM element is being passed. 
    if (typeof el == "string") {
      el = $(el)[0];
    }
    el.addEventListener(event, handler, false);
  }

  return {
    $ : $,
    hasClass : hasClass,
    addClass : addClass,
    removeClass : removeClass,
    bind : bind
  };
})();
