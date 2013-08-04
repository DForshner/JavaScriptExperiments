// Javascript doesn't have classes in the tranditional sense.
// Javascript uses prototype inheritance.
// Each object has a special prototype property
// (__proto__) that gets inherited from the parent
function Dog() {
};

// Add the bark function to the Dog prototype.
// This could be done inside the Dog constructor but then a new bark
// method would be created for every dog.  By declaring it on the
// prototype one instance of brak is created and shared by all dogs.
Dog.prototype.bark = function(){
    return "woof!";
};

// We can set a constructors prototype to be another object.
function SmallDog() {
    Dog.call(this);
};
SmallDog.prototype = new Dog();
SmallDog.prototype.constructor = SmallDog;

// Each constructor has an associated prototype object.
function BigDog() {
    Dog.call(this);
};
BigDog.prototype = new Dog();
BigDog.prototype.constructor = BigDog;

// An object can override the property of its parent
BigDog.prototype.bark = function(){
    return "WOOF!";
};

function FancySmallDog() {
};
FancySmallDog.prototype = new SmallDog();
FancySmallDog.prototype.constructor = FancySmallDog;
FancySmallDog.prototype.yip = function() {
    return "Yip!";
};
