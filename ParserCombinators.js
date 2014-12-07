// Messing around with Parser-Combinators
// Based on: http://theorangeduck.com/page/you-could-have-invented-parser-combinators

// Parser: a function accepting strings as input and returning some structure as output.
// Combinator: Combines values in various ways to build up more complex values.

var current = 0;
function inputRead(input) {
    console.log("Read: ", input[current]);
    return input[current];
}
function inputAdvance(input, step) {
    current++;
    console.log("Advancing: ", step);
}

var failure = void 0;

// Parser function that looks for a specific character and returns
// either the matching character or failure.
function lit(c) {
    console.log("Looking for: ", c);
    return (function(input) {
        var r = inputRead(input);
        if (r === c) {
            inputAdvance(input, 1);
            return c;
        } else {
            return failure;
        }
    });
}

//var parser = lit("a");
//var result = parser(input);
//console.log("Result: ", result);

// Returns a function that returns true if either input function is true
function or(parserA, parserB) {
    return (function (input) {
        var resultA = parserA(input);
        if (resultA != failure) { return resultA; }
        var resultB = parserB(input);
        if (resultB != failure) { return resultB; }
        return failure;
    });
}

//var parserAB = or(lit('a'), lit('b'));
//var resultAB = parserAB(input);
//console.log("resultAB: ", resultAB);

// Returns a function that returns the concatination of the results
// if all the functions pass.  If any function fails then the input
// is reset and failure is returned.
function and(parserA, parserB) {
    return (function(input) {
        var before = current;
        var resultA = parserA(input);
        if (resultA == failure) {
            current = before;
            return failure;
        }
        var resultB = parserB(input);
        if (resultB == failure) {
            current = before;
            return failure;
        }
        return [resultA, resultB];
    });
}

//var input = [ 'a', 'b' ];
//var parserAAndB = and(lit('a'), lit('b'));
//var resultAAndB = parserAAndB(input);
//console.log("ResultAAndB: ", resultAAndB);

//var input = [ 'c', 'd' ];
//var parserAAndB = or(and(lit('a'), lit('b')), and(lit('c'),lit('d')));
//var resultAAndB = parserAAndB(input);
//console.log("ResultAAndB: ", resultAAndB);

// Returns a function that runs a parsing function and applies f to its results.
function apply(f, parser) {
    return (function (input) {
        var result = parser(input);
        if (result == failure) { 
            return failure; 
        } else { 
            return f(result); 
        }
    });
}

//function toInt(chars) {
//    var result = [];
//    for (var i = 0; i < chars.length; i++) {
//        result.push(chars[i].charCodeAt());
//    }
//    return result;
//}

function toInt(char) {
    return char.charCodeAt(0);
}

function litToInt(c) {
    return apply(toInt, lit(c));
}

var parser = or(
        and(litToInt('a'), litToInt('b')),
        and(litToInt('c'), litToInt('d'))
    );
var input = [ 'a', 'b' ];
var result = parser(input);
console.log("result: ", result);