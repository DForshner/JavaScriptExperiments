var data = {
    A: [ 1, 2, 3],
    B: [ 1, 2, 4],
    C: [ 1, 2, 5]
}

var selectKeys = [ "A", "C" ];

// Create array of selected arrays
var selected = selectKeys.map(function(x) { return data[x]; });

var uniqueSubset = _.union.apply(_, selected);

console.log(uniqueSubset);
// [1, 2, 3, 5]
