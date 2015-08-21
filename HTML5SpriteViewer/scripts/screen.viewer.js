//
// Viewer screen
//
app.screens["viewer-screen"] = (function(){
  var main = app.main;
  var dom = app.dom;
  var display = app.display;
  firstRun = true;

  function setup() {
    display.initialize();
	//display.redraw();
  }

  function run() {
    if (firstRun) {
      setup();
      firstRun = false;
    }
	
	display.drawText("Test", 50, 50);
  }

  return {
    run : run,
  };
  
})();
