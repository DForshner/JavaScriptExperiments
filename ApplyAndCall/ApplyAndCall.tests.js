// Explicitly bind a function to a object using apply
test("Dogs can howl", 1, function() {
  var dog = new Dog();
  function howl(){
    return "AAAWWWOOO";
  }
  equal(howl.apply(dog), "AAAWWWOOO");
});

// Pass parameters to apply in an array.
test("Dogs can speak", function() {
  var dog = new Dog();
  equal(speak.apply(dog, ["roof!"]), "roof!"); 
});

// Use the call method which works like the apply method.
test("Dogs can still speak", function() {
  var dog = new Dog();
  equal(speak.call(dog, "roof!"), "roof!");  
});

test("Apply a function to a array", 2, function() {
  equal(Math.max(1,2,3,4,5), 5);
  var myArray = [1,2,3,4,5];
  equal(Math.max.apply(Math, myArray), 5);    
});

test("Call can pass context", function() {
  var a = new A;
  var b = new B;
  equal(whoAmI.call(a), "I am A");
  equal(whoAmI.call(b), "I am B");
});

test("Apply can also pass context", function() {
  var a = new A;
  var b = new B;
  equal(whoAmI.apply(a), "I am A");
  equal(whoAmI.apply(b), "I am B");
});

