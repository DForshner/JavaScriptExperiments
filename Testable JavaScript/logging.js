// Logger interface
var Logger = { 
  log: function(msg) {},
  getLastLog: function() {}
};

// Implementation to log to file.
var LoggerFile = function(file) {
  this.file = file;
};
LoggerFile.prototype = Object.create(Logger); // Implements the Logger interface
LoggerFile.prototype.log = function(msg) {
  this.file.write(msg);
};
