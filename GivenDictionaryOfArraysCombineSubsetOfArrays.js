var data = {
    A: [ 1, 2, 3],
    B: [ 4, 5, 6],
    C: [ 7, 8, 9]
}

var selectKeys = [ "A", "C" ]; // Combine only A and B

var selected = selectKeys
	.map(function(x) { return data[x]; })
  .reduce(function(a,b) { return a.concat(b); });

console.log(selected);
// [1, 2, 3, 7, 8, 9]
