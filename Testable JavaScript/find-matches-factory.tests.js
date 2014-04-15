test("FindMatchFactoryImpl - When expect", function() {
  var matchTypes = [
    { name: "Distance", type: new FindMatchesDistance()},
    { name: "Activities", type: new FindMatchesActivities() },
  ];
  var factory = new FindMatchFactoryImpl();
  matchTypes.forEach(function(matchType) {
    deepEqual(factory.getMatchImpl(matchType.name), matchType.type);
  });
});

