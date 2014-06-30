var Dog = function() {
};

var speak = function (word) {
  return word;
};

var whoAmI = function(){
    return this.name;
};

/*
 * @constructor
 */
var A = function() {
    this.name = "I am A";
};

/*
 * @constructor
 */
var B = function() {
    this.name = "I am B";
};