// Use a mixin share behavior using composition not inheritance
var MIXIN = function(baseObject, extendObject) {
  var prop;
  for (prop in baseObject) {
    // If extention object doesn't have function point it to the base object.
    if (typeof baseObject[prop] === 'function' && !extendObject[prop]) {
      extendObject[prop] = baseObject[prop].bind(baseObject);
    }
  }
};
