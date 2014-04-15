// Logging decorator for user repo.  
// Wraps the repo and adds logging behavior which lets you mash a userRepo and the logger 
// togther without them actually knowing about each othe// Cross Cutting Concerns
// Ex: Logging, Auditing, Caching, Security, Profiling

// Do not tightly couple cross cutting/orthogonal concerns into your implementations.
//ReallyBadUserRepoImpl = function() {
//  this.logger = new Logger; // or Logger.Get()
//  this.profiler = new Profiler; // or Profiler.get()
//};

// We can reduce coupling by injecting but we are still are tightly coupled to
// these orthogonal concerns.
//BadUserRepoImpl = function(logger, profiler) {
//  this.logger = logger;
//  this.profiler = profiler
//};

// We are mixing unrelated concerns together increasing our coupling and making
// things harder to test.
//BadUserRepoImpl.prototype.save = function(user) {
//  logger.log('Saving user: ' + user);
//  profiler.start('saveUser');
//  ... do stuff ...
//  profiler.stop('saveUser');
//  logger.log('That took: ' + (start - end));
//};

var UserRepoLogger = function(repo, logger) {
  this.innerRepo = repo;
  this.logger = logger;

  // By using the mixin you don't have to implement all over the userRepo
  // interface's methods.
  MIXIN(repo, this); // Mixin the repo's methods.
};
// Decorate the save method with logging. The decorator will log the save
// methods and let all other methods fall through to the inner repo.
UserRepoLogger.prototype.save = function (user) {
  this.logger.log('Saving user: ' + user);
  // Delegate the actual saving of user to the original repo.
  return this.innerRepo.save(user);
};


// Profiler decorator for user repo
var UserRepoProfiler = function(repo, profiler) {
  this.innerRepo = repo;
  this.profiler = profiler;
  MIXIN(repo, this); // Mixin the repo's methods.
};
UserRepoProfiler.prototype.save = function(user) {
  this.profiler.start('save user');
  this.innerRepo.save(user); // Delegate real saving to inner repo
  this.profiler.stop('save user');
};


// During composition root you pick the implementations you want.
//var userRepo = 
//  new UserRepoLogger(
//    new UserRepoImplA(new Client()), 
//      new LoggerFile());

// Usage of everything together with both logging and profiler decorators
//var userRepoProf = new UserRepoProfiler(new UserRepoImplA(), new ProfilerTime());
//var userRepoProfLogger = new UserRepoLogger(userRepoProf, new LoggerTime());
