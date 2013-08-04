test("A person can have children", 1, function() {
  var children = [new Person('Ben'), new Person('Dan')];
  var agnes = new Person("Agnes", children);
  equal(agnes.children.length, 2);
});

test("A person can be created from an array", 1, function() {
  var children = [new Person('Ben'), new Person('Dan')];
  var args = [ ['Bob'], children ];
  var bob = Person.new.apply(Person, args);
  equal(bob.children.length, 2);
});

test("A person can be created from an array 2.0", 1, function() {
  var children = [new Person('Ben'), new Person('Dan')];
  var args = [ ['Bob'], children ];
  var bob = Person.applyNew(args);
  equal(bob.children.length, 2);
});

test("A person can be created from an array 2.0 with no kids", 1, function() {
  var args = ['Bob'];
  var bob = Person.applyNew(args);
  equal(bob.children, undefined);
});
