// Code for a shared worker.
// Shared workers are different than dedicate workers because they can have
// multiple connections.  Multiple HTML pages from the same origin can access
// any shared workers created by one of the pages.

var connections = 0;
 
// Connection event
addEventListener("connect", function(event) {
  var id = connections++;
  var port = event.ports[0];

  // Send message back to client indicating connection
  port.postMessage("Connection #" + id);

  // When client sends signal respond.
  port.addEventListener("message", function(event) {
    if (event.data == "Signal") {
      port.postMessage("Signal from connection #" + id);
    }
  }, false);

  // port.start() must be called before any messages can be received.
  port.start();

}, false);
