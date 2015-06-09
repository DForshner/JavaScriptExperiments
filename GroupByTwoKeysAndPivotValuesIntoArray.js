// Produces one row for each unique combination of KeyA and KeyB with
// a Values property that is an array of values that match the
// given key combination.

var raw = [
    { KeyA: "A", KeyB: 11, Value: 100 },
    { KeyA: "A", KeyB: 11, Value: 200 },
    { KeyA: "A", KeyB: 22, Value: 300 },
    { KeyA: "A", KeyB: 33, Value: 350 },
    { KeyA: "B", KeyB: 11, Value: 400 },
    { KeyA: "B", KeyB: 11, Value: 500 },
    { KeyA: "B", KeyB: 22, Value: 600 },
    { KeyA: "B", KeyB: 22, Value: 700 }
];

var grouped = _.chain(raw)
    .groupBy(function(x) { return x.KeyA + '_' + x.KeyB; })
    .map(function(x) {
        var first = x[0]; // At least one element always exists
        var values = x.map(function(v) { return v.Value; });
        return { KeyA: first.KeyA, KeyB: first.KeyB, Values: values };
    })
    .value()

console.log(grouped);

// Produces:
// [
//     { KeyA: "A", KeyB: 11, Values: [ 100, 200 ] },
//     { KeyA: "A", KeyB: 22, Values: [ 300 ] },
//     ...
// ]
