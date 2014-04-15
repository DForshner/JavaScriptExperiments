// Interface for matchers
var FindMatches = {
  matches: function(userId) {}
};

var FindMatchesDistance = function(userRepo) { /* ... */ };
FindMatchesDistance.prototype = Object.create(FindMatches);
FindMatchesDistance.prototype.matches = function(userId) { /* ... */ };

var FindMatchesActivities = function(userRepo) { /* ... */ };
FindMatchesActivities.prototype = Object.create(FindMatches);
FindMatchesActivities.prototype.matches = function(userId) { /* ... */ };

