function Person(name, children) {
  this.name = name;
  this.children = children;
};

// Create a new method for the function.prototype
// that can be used instead of the new statement.
// Based on: http://stackoverflow.com/questions/813383/how-can-i-construct-an-object-using-an-array-of-values-for-parameters-rather-th#answer-813401
Function.prototype.new = function() {
  // Create a fake constructor that will apply
  // the real constructor as a method.
  var args = arguments;
  var constructor = this;
  function Fake(){
    constructor.apply(this, args)
  };
  // Set the fake prototype to the original constructor.
  Fake.prototype = constructor.prototype;
  // Create an object using the fake constructor and return it. 
  return new Fake;
};

// Helper method 
Function.prototype.applyNew = function() {
  return this.new.apply(this, arguments[0]);
};
