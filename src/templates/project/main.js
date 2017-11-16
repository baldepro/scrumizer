var app = angular.module('app', ['ngRoute']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'templates/backlog.html',
            controller: 'backlog-controler'
        })
        // route for the backlog page
        .when('/backlog', {
            templateUrl: 'templates/backlog.html',
            controller: 'backlog-controller'
        })

        // route for the sprint page
        .when('/sprint', {
            templateUrl: 'templates/sprint.html',
            controller: 'sprint-controller'
        })

        // route for the contact page
        .when('/depot', {
            templateUrl: 'templates/contact.html',
            controller: 'depot-controller'
        })
        // route for the team page
        .when('/team', {
            templateUrl: 'templates/team.html',
            controller: 'team-controller'
        });
});


app.controller('backlog-controller', ['$scope', function ($scope) {

    $scope.form = null;
    $scope.values = [];
    $scope.test = 0;
    $scope.records = [
        {
            "description": "Alfreds Futterkiste",
            "priority": "Germany",
            "cost": "Germany",
            "states": "Germany",
        },
        {
            "description": "Alfreds Futterkiste",
            "priority": "Germany",
            "cost": "Germany",
            "states": "Germany",
        },
        {
            "description": "Alfreds Futterkiste",
            "priority": "Germany",
            "cost": "Germany",
            "states": "Germany",
        }
    ]

        ;
    $scope.show = function () {

        $scope.test = 1;


    }
    $scope.hide = function () {

        $scope.test = 0;
        $scope.reset();

    }

    $scope.reset = function () {

        $scope.form = null;


    }
    $scope.save = function () {

        console.log($scope.form.description);
        console.log($scope.form.priority);
        console.log($scope.form.cost);
        console.log($scope.form.states);

        $scope.record =
            {
                "description": $scope.form.description,
                "priority": $scope.form.priority,
                "cost": $scope.form.cost,
                "states": "a faire"
            };


        $scope.records.push($scope.record);

        $scope.hide();
        $scope.reset();

    }
}]);



app.controller('project-controller', ['$scope', function ($scope) {
    $scope.backlog = 0;
    $scope.sprint = 0;
    $scope.template = "templates/backlog.html";
    $scope.submitted = false;
    $scope.clique = function () {
        $scope.template = "templates/backlog.html";
        $scope.submitted = true;
        console.log($scope.template);


    }


}]);


app.controller('sprint-controller', ['$scope', function ($scope) {
    $scope.backlog = 0;
    $scope.sprint = 0;
    $scope.template = "templates/backlog.html";
    $scope.submitted = false;
    $scope.clique = function () {
        $scope.template = "templates/backlog.html";
        $scope.submitted = true;
        console.log($scope.template);


    }


}]);