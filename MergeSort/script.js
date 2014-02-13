var DOMUtil = (function() {
  function display(id, arrayToDisplay, selector) {
    console.assert(Object.prototype.toString.call(arrayToDisplay) 
      === '[object Array]');

    var frag = document.createDocumentFragment();
    var list = document.getElementById(id);

    console.log("============ updating:", id);
    // Add properties to fragment
    for (var i = 0; i < arrayToDisplay.length; i++) {
      console.log(selector.call(this, arrayToDisplay[i]));
      var el = document.createElement("li");
      el.appendChild(document.createTextNode(selector.call(this, arrayToDisplay[i])));
      frag.appendChild(el);
    }
    console.log("============");

    // Add fragment to DOM
    list.appendChild(frag);
  }

  return {
    display: display,
  };
})();

var MergeSort = (function() {

    // Merge two lists together
    function merge(left, right, compare) {
      var result = [],
        leftLoc = 0,
        rightLoc = 0;

      console.log("Merging: ", left, " and ", right);

      while (leftLoc < left.length && rightLoc < right.length) {
        //if (left[leftLoc] < right[rightLoc]) {
        if (compare.call(this, left[leftLoc], right[rightLoc])) {
            result.push(left[leftLoc++]);
          } else {
            result.push(right[rightLoc++]);
          }
        }

        // Add any remaining left elements.
        if (leftLoc < left.length) {
          return result.concat(left.slice(leftLoc));
        }

        // Add any remaining right elements.
        if (rightLoc < right.length) {
          return result.concat(right.slice(rightLoc));
        }
      }

      // Create n one item lists and combine back together
      // into a single sorted list.
      function sort(arrayToSort, compare) {

        // Array is already sorted if 0 or 1 items.
        if (arrayToSort.length < 2) {
          return arrayToSort;
        }

        var middle = Math.floor(arrayToSort.length / 2), // Round down
          left = arrayToSort.slice(0, middle), // 0 to (middle - 1)
          right = arrayToSort.slice(middle); // middle to end

        // Sort left, sort right, merge results
        return merge(sort(left, compare), sort(right, compare), compare);
      }

      return {
        sort: sort,
      };

    })();

var unsortedArray = [ {val:5}, {val:1}, {val:6}, {val:9}, 
                    {val:3}, {val:2}, {val:0}, {val:8}, {val:4}, {val:7}];
DOMUtil.display('unsorted-array', unsortedArray, function(x) { return x.val; });
var sortedArray = MergeSort.sort(unsortedArray, function(a, b) { return a.val < b.val;}); 
DOMUtil.display('sorted-array', sortedArray, function(x) { return x.val; });