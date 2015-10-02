// PromiseChainExceptionHandling
// Looking at different ways of handling exceptions in promise chains.
// Built using the Q.js promise library

// HTML used for testing in JSFiddle
//<button id="sequence1">1</button>
//<button id="sequence2">2</button>
//<button id="sequence3">3</button>
//<button id="sequence4">4</button>
//<button id="sequence5">5</button>
//<button id="clear">Clear</button>
//<h3>Events</h3>
//<ul id="events"></ul>

var log = function (txt) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(txt));
    var ul = document.getElementById("events");
    ul.appendChild(li);
}

var doAsyncWork = function (step, val) {
    var dfd = Q.defer(); // deferred created
    log("Async step " + step + " start - value passed: " + val);
    setTimeout(function () {
        log("Async step " + step + " stop - value passed: " + val);
        dfd.resolve(step); // deferred resolved
    }, 2000);
    return dfd.promise;
}

var doAsyncRejected = function (step, val) {
    var dfd = Q.defer(); // deferred created
    log("Async step " + step + " start - value passed: " + val);
    setTimeout(function () {
        log("Async step " + step + " stop - value passed: " + val);
        dfd.reject(step); // deferred resolved
    }, 2000);
    return dfd.promise;
}

var doAsyncError = function (step, val) {
    var dfd = Q.defer(); // deferred created
    log("Async step " + step + " start - value passed: " + val);
    setTimeout(function () {
        log("Async step " + step + " stop - value passed: " + val);
        throw new Error("Error in step " + step);
    }, 2000);
    return dfd.promise;
}

var doSyncWork = function (step, val) {
    log("Sync step " + step + " - value passed: " + val);
    return step;
}

var doSyncError = function (step, val) {
    log("Sync step " + step + " - value passed: " + val);
    throw new Error("Error in step " + step);
}

var handleError = function (step, err) {
    log("Handle error step " + step + " - error passed: " + err);
    return step;
}

// Resolving a promise and returning a value
var sequence1 = function () {
    log("Sequence 1 - Start");
    doAsyncWork(0)
        .then(doSyncWork.bind(this, 1))
        .then(doAsyncWork.bind(this, 2))
        .then(doSyncWork.bind(this, 3))
        .then(doAsyncWork.bind(this, 4));
}

// Resolving a promise with sync error caught by then error handler.
var sequence2 = function () {
    log("Sequence 2 - Start");
    doAsyncWork(0)
        .then(doSyncWork.bind(this, 1))
        .then(doSyncError.bind(this, 2))
        .then(doSyncWork.bind(this, 3)) // Skipped
    	.then(doSyncWork.bind(this, 4), handleError.bind(this, 4)) // Error handler called
    	.then(doSyncError.bind(this, 5), handleError.bind(this, 5)); // Continues running
}

// Error occurs in sync method caught by catch error handler
var sequence3 = function () {
    log("Sequence 3 - Start");
        doAsyncWork(0)
            .then(doSyncWork.bind(this, 1))
            .then(doSyncError.bind(this, 2))
            .then(doSyncWork.bind(this, 3)) // Skipped
        	.catch(handleError.bind(this, 4)) // Catches
            .then(doSyncError.bind(this, 5), handleError.bind(this, 5)); // Continues running
}

// Rejected promise caught by catch error handler
var sequence4 = function () {
    log("Sequence 4 - Start");
        doAsyncWork(0)
            .then(doSyncWork.bind(this, 1))
            .then(doAsyncRejected.bind(this, 2))
            .then(doSyncWork.bind(this, 3)) // Skipped
        	.catch(handleError.bind(this, 4))
            .then(doSyncError.bind(this, 5), handleError.bind(this, 5)); // Continues running
}

// Error occurs in async method caught by window error handler
var sequence5 = function () {
    log("Sequence 5 - Start");
    try {
        doAsyncWork(0)
            .then(doSyncWork.bind(this, 1))
            .then(doAsyncError.bind(this, 2))
            .then(doSyncWork.bind(this, 3)) // Doesn't get called
        	.catch(handleError.bind(this, 4)) // Doesn't get called
            .then(doSyncError.bind(this, 5), handleError.bind(this, 5)); // Doesn't get called
    } catch (ex) {
        log("sequence 5 - unhandled error" + ex); // Doesn't catch async error!
    }
}

window.onerror = function (err) {
    log("window - unhandled error: " + err);
    return true;
};

document.getElementById("sequence1").onclick = sequence1;
document.getElementById("sequence2").onclick = sequence2;
document.getElementById("sequence3").onclick = sequence3;
document.getElementById("sequence4").onclick = sequence4;
document.getElementById("sequence5").onclick = sequence5;

var btnclear = document.getElementById("clear");
btnclear.onclick = function () {
    var ul = document.getElementById("events");
    ul.innerHTML = "";
}
