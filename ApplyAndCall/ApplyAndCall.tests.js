// You can explicitly bind a function to a object using apply
test("Dogs can howl", 1, function() {
  var dog = new Dog();
  function howl(){
    return "AAAWWWOOO";
  }
  equal(howl.apply(dog), "AAAWWWOOO");
});

// Parameters can be passed to apply in an array.
test("Dogs can speak", 1, function() {
  var dog = new Dog();
  equal(speak.apply(dog, ["roof!"]), "roof!"); 
});

// You can also use the call method which works like
// the apply method.
test("Dogs can still speak", 1, function() {
  var dog = new Dog();
  equal(speak.call(dog, "roof!"), "roof!");  
});

// Use can apply a function to an array.
test("Apply to array", 2, function() {
  equal(Math.max(1,2,3,4,5), 5);
  var myArray = [1,2,3,4,5];
  equal(Math.max.apply(Math, myArray), 5);    
});