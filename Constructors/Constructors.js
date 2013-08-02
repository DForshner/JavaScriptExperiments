function Person(name) {
  this.name = name
};

// Green because it's not polluting the global namespace.
function GreenPerson(name) {
  
  // Check whether this is really a GreenPerson (called using new).
  // If it is not a GreenPerson use new to create a GreenPerson the correct way.
  if (!(this instanceof GreenPerson))
    return new GreenPerson(name);
  this.name = name;
};

function Home(homeOwner) {
  // When returning a (non-primitive) value from constructor the value will be returned as
  // the created object instead of 'this'.
  return new Person("homeOwner");
};

// In JavaScript methods are functions that are attached to objects.
function ActivePerson(name) {
  this.name = name;
  this.run = function() {
    return this.name + " is running!";
  };
};

