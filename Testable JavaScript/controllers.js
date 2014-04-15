// Interface for controllers
var Controller = {
  get: function() {}
};

// Bad: because it tightly couples the code to a specific implementation of the repo.
// Object thathas·
//var BadUserController = function () {
//  this.userRepo = new UserRepoImplA();
//};

// Application code doesn't care which implementation is being used.  Since the program is constructed against the interface 
// it does not know or care about the implementation.

// Good: Inject the dependencies into the object using constructor injection.
// UserController has no interest in how things are implemented.  It just wants to be able to call the repo's get/save methods.
// LSP - Any objects that implement an interface can be used interchangeably

// Implementation of user controller
var UserController = function(userRepo){
  this.userRepo = userRepo;
};

// Implementation of matches controller
var MatchController = function(findMatchFactory) {
  this.findMatchFactory = findMatchFactory;
};
MatchController.prototype = Object.create(Controller);
MatchController.prototype.findMatches = function(type, userId) {
  // Get implementation for runtime type
  var matcher = this.findMatchFactory.getMatchImpl(type);
  return matcher.matches(userId);
};
