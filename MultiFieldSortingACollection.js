// Example of sorting the elements of a collection using multiple sort keys.

var data = [{
	fieldA: 'E',
    fieldB: 'D'
}, {
    fieldA: 'A',
    fieldB: 'Z1C'
}, {
	fieldA: 'AA',
    fieldB: 'C1C'
}, {
    fieldA: 'B2',
    fieldB: 'A2C'
}, {
    fieldA: 'C3A',
    fieldB: 'C3AA'
}];

// -----------------------------------------------------------------------------------------
// Good Approch - Apply a stable sort for each field in reverse order.
// -----------------------------------------------------------------------------------------
var toSort = _.chain(data);
sortFields.reverse().forEach(function(x) { toSort = toSort.sortBy(x); });
var sorted = toSort
    .map(function (x) { return x.fieldA + ', ' + x.fieldB; })
    .value();

console.log("Correct Sort", sorted);
// Correct Sort ["A, Z1C", "AA, C1C", "B2, A2C", "C3A, C3AA", "E, D"]

// -----------------------------------------------------------------------------------------
// Bad Approch - Concatinate the sort fields together into a composite key.  This doesn't take 
// field length into account when sorting so you end up comparing sections of different fields.
// -----------------------------------------------------------------------------------------
var sortFields = [ 'fieldA', 'fieldB' ];
data.forEach(function(x) {
    var sortKey = _.reduce(sortFields, function (memo, field) { return memo + x[field]; }, '');
	console.log("Composite key: ", sortKey);
});
// Composite key:  AZ1C  <- See how the 'Z' of data[0]'s fieldB is compared against data[1]'s 'A' of fieldA
// Composite key:  AAC1C

var badSorted = _.chain(data)
    .sortBy(function (x) {
        // Build a composite key to use for sorting by concatinating the sort fields
        return _.reduce(sortFields, function (memo, field) { return memo + x[field]; }, '');
	})
    .map(function (x) { return x.fieldA + ',' + x.fieldB; })
    .value();

console.log("Incorrect Sort", badSorted);
// Incorrect Sort ["AA,C1C", "A,Z1C", "B2,A2C", "C3A,C3AA", "E,D"]
// "A,Z1C" should have been first!!!
