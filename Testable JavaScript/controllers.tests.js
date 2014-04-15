
// Mock match factory 
// Verifies that the client asks the factory to create the expected type
var MockFactory = function(expectedType, fakeMatch) {
  this.expectedType = expectedType;
  this.fakeMatch = fakeMatch;
};
MockFactory.prototype = Object.create(FindMatchFactory);
MockFactory.prototype.getMatchImpl = function (type) {
  equal(type, this.expectedType);
  return this.fakeMatch;
};

var FakeMatch = function() {};
FakeMatch.prototype = Object.create(FindMatches);

test("MatchController - When get match expect asks factory for same type", function() {
  var factory = new MockFactory("Distance", new FakeMatch());
  var controller = new MatchController(factory);
  controller.findMatches("Distance");
});
