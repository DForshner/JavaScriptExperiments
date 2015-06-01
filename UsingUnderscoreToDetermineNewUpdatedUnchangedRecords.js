// Demo code using the underscore library to compare a collection of new/changed records 
// to an existing collection and determine which records are updated, inserted, unchanged.
// Requires underscore (go figure)

//
// Upsert array example
//
var storedRecords = [
    { id: 1, name: "a" },
    { id: 2, name: "toUpdate" },
    { id: 3, name: "a" },
    { id: 4, name: "a" }
];
var recordsFromServer = [
    { id: 2, name: "updated" },
    { id: 5, name: "new" }
];
    
var updatedRecords = _.filter(storedRecords, function(stored) {
    return _.some(recordsFromServer, function(updated) {
        return updated.id === stored.id;
    });
});
console.log("updated records:", updatedRecords);

var newRecords = _.filter(recordsFromServer, function(updated) {
    return !_.some(storedRecords, function(stored) {
        return updated.id === stored.id;
    });
});
console.log("new records:", newRecords);

var unchangedRecords = _.filter(storedRecords, function(stored) {
    return !_.some(recordsFromServer, function(updated) {
        return updated.id === stored.id;
    });
});
console.log("unchanged records:", unchangedRecords);

//
// Upsert map (object) example where object has index field
//
var storedRecords2 = {
    1: { id: 1, name: "a" },
    2: { id: 2, name: "toUpdate" },
    3: { id: 3, name: "a" },
    4: { id: 4, name: "a" }
};
var recordsFromServer2 = {
    2: { id: 2, name: "updated" },
    5: { id: 5, name: "new" }
};

var updatedRecords2 = _.filter(storedRecords2, function(stored) {
    return (recordsFromServer2.hasOwnProperty(stored.id));
});
console.log("updated records2:", updatedRecords2);
                                      
var newRecords2 = _.filter(recordsFromServer2, function(updated) {
    return (!storedRecords2.hasOwnProperty(updated.id));
});
console.log("new records2:", newRecords);

var unchangedRecords2 = _.filter(storedRecords2, function(stored) {
    return (!recordsFromServer2.hasOwnProperty(stored.id));
});
console.log("unchanged records2:", unchangedRecords2);

//
// Bonus Rround: Upsert map (object) example where object does not have an index field.
//
var storedRecords3 = {
    1: { name: "a" },
    2: { name: "toUpdate" },
    3: { name: "a" },
    4: { name: "a" }
};

var recordsFromServer3 = {
    2: { name: "updated" },
    5: { name: "new" }
};

var updatedRecords3 = _.chain(storedRecords3)
    .map(function(value, key) { return { values: value, key: key }; })
    .filter(function(x) { return recordsFromServer3.hasOwnProperty(x.key); })
    .map(function(x) { return x.values; })
    .value();
console.log("updated records3:", updatedRecords3);
                                      
var newRecords3 = _.chain(recordsFromServer3)
    .map(function(value, key) { return { values: value, key: key }; })
    .filter(function(x) { return !storedRecords3.hasOwnProperty(x.key); })
    .map(function(x) { return x.values; })
    .value();
console.log("new records3:", newRecords3);

var unchangedRecords3 = _.chain(storedRecords3)
    .map(function(value, key) { return { values: value, key: key }; })
    .filter(function(x) { return !recordsFromServer3.hasOwnProperty(x.key); })
    .map(function(x) { return x.values; })
    .value();
console.log("unchanged records3:", unchangedRecords3);
