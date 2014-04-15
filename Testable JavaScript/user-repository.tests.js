
// Write tests once against the inteface so they can be re-used by all implementations.
var repoSaveIdGetIdTest = function(repo) {
  var id = 99, user = { id: id };
  repo.save(user);
  equal(repo.get(id), user);
};

var getRepoImplA = function() {
  var fakeClientA = {
    get: function(id) { return this.savedUser; },
    save: function(user) { this.savedUser = user },
  };
  return new UserRepoImplA(fakeClientA);
};

test("Implementation A - When save user by id expect can get same user by id.", function() {
   repoSaveIdGetIdTest(getRepoImplA());
});

var getRepoImplB = function() {
  var fakeClientB = {
    fetch: function(id) { return this.savedUser; },
    store: function(user) { this.savedUser = user },
  };
  return new UserRepoImplB(fakeClientB);
};

test("Implementation B - When save user by id expect can get same user by id.", function() {
  repoSaveIdGetIdTest(getRepoImplB());
});
