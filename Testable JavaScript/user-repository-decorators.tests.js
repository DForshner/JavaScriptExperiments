var FakeUserRepo = function() {};
FakeUserRepo.prototype = Object.create(UserRepo);

var LoggerMock = function() {
  result: {}
};
LoggerMock.prototype = Object.create(Logger);
LoggerMock.prototype.log = function(msg) { this.result = msg; }
LoggerMock.prototype.getLastLog = function() { return this.result; }
LoggerMock.prototype.verifyLastLogStartsWith = function(msg) {
  console.assert(typeof msg === "string");
  if (this.result.slice(0, msg.length) !== msg) {
    throw "Expected log message to start with[" + msg + "] but message was [" + this.result + "]";
  }
  return true;
};

test("UserRepoLogger - When save user by id expect save is logged", function() {
  var repo = new FakeUserRepo();
  var id = 99, user = { id: id };
  var loggerMock = new LoggerMock();
  var testRepo = new UserRepoLogger(repo, loggerMock);
  testRepo.save(user);
  ok(loggerMock.verifyLastLogStartsWith("Saving"));
});
