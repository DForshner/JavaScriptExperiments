// Interface for profiler
var Profiler = {
  start: function(id) {},
  stop: function(id) {},
  getProfile: function(id) {}
};

// Implementation of profiler for time.
var ProfileTime = function() { this.profiles = {}; }; // Implementation specific constructor
ProfileTime.prototype = Object.create(Profiler); // Implement interface
ProfileTime.prototype.start = function(id) {
  this.profiles[id] = new Date().getTimestamp();
};
ProfileTime.stop = function(id) { /* ... */ };
ProfileTime.getProfile = function(id) { /* ... */ };
