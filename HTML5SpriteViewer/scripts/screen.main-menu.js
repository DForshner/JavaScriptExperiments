//
// Main menu menu screen
//
app.screens["main-menu"] = (function() {
  var dom = app.dom;
  var main = app.main;
  var firstRun = true;

  // Attach event handler that shows different screens based on what button the user clicked.
  function setup() {
    dom.bind("#main-menu ul.menu", "click", function(e) {
      if (e.target.nodeName.toLowerCase() === "button") {
        // Determine button name and call the corresponding screen (Event Delegation) 
        var action = e.target.getAttribute("name");
        main.showScreen(action);
      }
    });
  }
 
  function run() {
    if (firstRun) {
		console.log("Setting up main menu");
		setup();
		firstRun = false;
    }
  }

  return {
    run : run
  };

})();
