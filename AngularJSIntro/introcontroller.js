app.controller("IntroController", function($scope){
  $scope.controllerscope = "This is in controller scrope.";

  $scope.inputValue = "";

  $scope.selectedPerson = 0;
  $scope.selectedGenre = null;
  $scope.people = [
    {
      id: 0,
      name: "Mr Biggles",
      music: [
        'Rock',
        'Metal',
        'Dubstep'
      ],
      good: false
    },
    {
      id: 1,
      name: "Mr Clean",
      music: [
        'Indie',
        'Good',
        'Dubstep'
      ],
      good: true
    },
  ];

  $scope.newPerson = null;
  $scope.addNew = function() {
    if ($scope.newPerson != null && $scope.newPerson != "") {
      $scope.people.push({
        id: $scope.people.length,
        name: $scope.newPerson,
        good: true,
        music: []
      });
    }
  };

});
