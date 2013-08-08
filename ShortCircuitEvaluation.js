// short-circuit evaluation
// The expression c || b || a is lazily evaluated by
// the interpreter until it finds a value.

// b is undefined so it stops at a
var a = "cat";
var b;
var result = c || b || a;
console.log(result);

// c is undefined and b is null so it stops at a
b = null;
result = c || b || a;
console.log(result);

var b = "mouse";
result = c || b || a;
console.log(result);

var c = "dog";
result = c || b || a;
console.log(result);
