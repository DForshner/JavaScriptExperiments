test( "hello test", 1, function() {
  ok( 1 == "1" );
});

test("My name is bob", 1, function () {
  var bob = new Person('Bob');
  equal(bob.name, 'Bob');
});

test("Bob is an instance of Person", 1, function() {
  var bob = new Person('Bob');
  ok(bob instanceof Person);
});

test("Globals are bad", 1, function() {
  // Call Person has a function (without new)
  Person('Tim');
  // Inside of Person 'this' will refer to the global (window) object.
  equal(window.name, 'Tim');
});

test("Avoiding globals is good", 1, function() {
  var jen = GreenPerson("Jen");
  ok(jen instanceof GreenPerson);
});

test("Returning a value in a constructor", 1, function() {
  var bob = new Home("Bob");
  ok(bob instanceof Person);
});

test("Methods are functions attached to objects", 1, function() {
  var tim = new ActivePerson("Tim");
  equal(tim.run(), "Tim is running!");
});

test("Methods can be attached to objects after construction", 1, function() {
  var tim = new ActivePerson("Tim");
  tim.jump = function () {
    return this.name + " is jumping!";
  };
  equal(tim.jump(), "Tim is jumping!");
});

test("Objects can be created without constructors", 1, function() {
  var alien = {
    name: "Durr!!Yr#!",
    greet: function() {
      return "Greetings Plp!";
    }
  };
  equal(alien.greet(), "Greetings Plp!");
});
