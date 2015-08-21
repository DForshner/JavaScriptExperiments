// Create namespace
var app = {

  /* Namespaces */
  screens : {},

  /* settings */
  settings : {
    rows : 8,
    cols : 8,
  }
};

window.addEventListener("load", function() {
	console.log("DOM has finished loading.");
	  
	// Start dynamic loading
	Modernizr.load([
    {
      load : [
        "scripts/lib/sizzle.js",
        "scripts/dom.js",
        "scripts/main.js",
        "scripts/screen.main-menu.js",
        "scripts/display.js",
        "scripts/screen.viewer.js",
      ],

      // Complete callback that happens after scripts are loaded and executed.
      complete : function () {
        console.log("All files loaded"); 
        app.main.setup();
        //app.main.showScreen("main-menu");
        app.main.showScreen("viewer-screen");
      }
    }
  ]);
  
}, false);