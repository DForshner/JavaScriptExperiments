test( "hello test", 1, function() {
  ok( 1 == "1" );
});

test("will add 5 to number", 1, function () {
    var res = mathLib.add5(10)
    equal(res, 15);
});

test("will not add 6 to number", 1, function () {
    var res = mathLib.add5(10)
    notEqual(res, 16);
});

module( "group a");
asyncTest("asynchronous test: one second later!", 1, function() {
 
  setTimeout(function() {
    ok( true, "Passed and ready to resume!" );
    start();
  }, 1000);
});

test( "keylogger api behavior", function() {
 
  var event,
      $doc = $( document ),
      keys = KeyLogger( $doc );
 
  // trigger event
  event = $.Event( "keydown" );
  event.keyCode = 9;
  $doc.trigger( event );
 
  // verify expected behavior
  equal( keys.log.length, 1, "a key was logged" );
  equal( keys.log[ 0 ], 9, "correct key was logged" );
 
});

module( "group b");
test( "Appends a div", function() {
  var $fixture = $( "#qunit-fixture" );
 
  $fixture.append( "<div>hello!</div>" );
  equal( $( "div", $fixture ).length, 1, "div added successfully!" );
});
 
test( "Appends a span", function() {
  var $fixture = $( "#qunit-fixture" );
 
  $fixture.append("<span>hello!</span>" );
  equal( $( "span", $fixture ).length, 1, "span added successfully!" );
});

module( "group c", {
  setup: function() {
    var $fixture = $( "#qunit-fixture" );
    $fixture.append( "<div>hello!</div>" );
  }, teardown: function() {
    var $fixture = $( "#qunit-fixture" );
    $fixture.detach();
  }
});

test( "Appends a div in the setup and removes in teardown", function() {
  var $fixture = $( "#qunit-fixture" );
  equal( $( "div", $fixture ).length, 1, "div added successfully!" );
});

test( "deepEqual test", function() {
  var obj = { foo: "bar", cat: "micky" };
 
  deepEqual( obj, { foo: "bar", cat: "micky" }, "Two objects can be the same in value" );
});
