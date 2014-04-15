// A interface with no implementation.
// SRP - The user repo interface is responsible for getting/setting/saving users.
// ISP - Objects that depend on user repo might not want caching, security, ect.
// Benifits: Can swap implementations, work/test in parallel, write tests once.
var UserRepo = {
  get: function(id) {}, // Interface has no initialization code
  save: function(user) {},
  getAll: function() {},
  edit: function(id, user) {},
  delete: function(id) {},
  query: function(query) {},
};

// A implementation of the inteface.

// Constructor specific to this implementation with injected dependencies.
var UserRepoImplA = function(client) {
  this.client = client;
};

// This object implements the UserRepo interface by setting the prototype
// to be the object.Create(Interface).
UserRepoImplA.prototype = Object.create(UserRepo);

// Implement the interface's methods by overriding the prototype functions.
UserRepoImplA.prototype.get = function (id) { return this.client.get(id); };
UserRepoImplA.prototype.save = function (user) { this.client.save(user); };


// Another implemetation of the interface for a different client.
var UserRepoImplB = function(client) {
  this.client = client;
};
UserRepoImplB.prototype = Object.create(UserRepo);
UserRepoImplB.prototype.get = function (id) { return this.client.fetch(id); };
UserRepoImplB.prototype.save = function (user) { this.client.store(user); };
