// Use factories to create Runtime or short-lived dependencies
// Use an abstract factory will convert a runtime values into a dependencies

// Interface for find match factory
var FindMatchFactory = {
  getMatchImpl: function(type) {},
};

// Implementation of find match factory
// Using new in a factory is OK because it's a factory' job to create objects.
// Instead of creating new matchers each time we could create the once during
// composition root and the reuse the same factories.
var FindMatchFactoryImpl = function(repo) {
  this.repo = repo;
};
FindMatchFactoryImpl.prototype = Object.create(FindMatchFactory);
FindMatchFactoryImpl.prototype.getMatchImpl = function(type) { 
  // Use a lookup table if there are many match types.
  if (type === "Distance") {
    return new FindMatchesDistance(this.repo);
  } else if (type === "Activities") {
    return new FindMatchesActivities(this.repo);
  } else {
    throw "Invalid match type.";
  }
};
