// An object shares the prototype of the parent object.
test("A dog is a dog", 1, function() {
    var dog = new Dog();
  deepEqual(dog.__proto__, Dog.prototype);
});

test("Dogs bark", 1, function() {
  // When a constructor creates an object its parent is set to the
  // prototype object associated with the constructor that created it.
  var dog = new Dog();
  equal(dog.bark(), 'woof!');
});

test("Small dogs bark", 1, function() {
  var dog = new SmallDog();
  equal(dog.bark(), 'woof!');
});

test("Small dogs are dogs", 2, function() {
  var dog = new SmallDog();
  equal(dog.__proto__, SmallDog.prototype);
  ok(dog instanceof Dog);
});

test("Big dogs BARK!", 1, function() {
  var dog = new BigDog();
  equal(dog.bark(), 'WOOF!');
});

test("Fancy small dogs are dogs", 2, function() {
  var dog = new FancySmallDog();
  equal(dog.__proto__, FancySmallDog.prototype);
  ok(dog instanceof Dog);
});

test("Fancy small dogs can bark and yip", 2, function() {
  var dog = new FancySmallDog();
  ok('bark' in dog);
  ok('yip' in dog);
});

// hasOwnProperty tests that the object has the property not
// the prototype
test("Annoying fancy small dogs Yap", 2, function() {
  var dog = new FancySmallDog();
  dog.yap = function() {
    return "Yap Yap Yap";
  };
  ok(dog.hasOwnProperty('yap'));
  ok(!dog.hasOwnProperty('yip'));
});
