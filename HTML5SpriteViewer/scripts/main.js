//
// Module containing viewer logic 
//
app.main = (function() {
  var dom = app.dom;
  var $ = dom.$;

  // Displays screen.
  function showScreen(screenId) {
	console.log("Displaying Screen: ", screenId);
	
    var activeScreen = $("#app .screen.active")[0];
    if (activeScreen) {
		console.log("Hiding active screen");
		dom.removeClass(activeScreen, "active");
    }

    // Run new screen module
    app.screens[screenId].run();
	
    // Display new screen html 
    var screen = $("#" + screenId)[0];
    dom.addClass(screen, "active");
  }

  function setup() {
  }
  
  return {
    showScreen : showScreen,
    setup : setup,
  };

})();
