var projectController = angular.module('projectController',[]);

projectController.controller('projectController', function ($scope, $http) {
  $scope.projects   = {};
  $scope.oneProject = {};
   $scope.submit    = function(){
    var data = { name        : $scope.name,
                 description : $scope.description,
                 user_id     : $scope.user_id
    }
    $http.post('/project/create', data)
    .success((data) => {
      console.log(data);
    })
    .error((error) => {
      console.log(error);
    });
  }

  $http.get('/project/list')
  .success((data) => {
    $scope.projects.push(data);
  })
  .error((error) => {
    console.log(error);
  });

  $http.get('/project/:id')
  .success((data) => {
    $scope.OneProject.push(data);
  })
  .error((error) => {
    console.log(error);
  });

  $http.put('/project/:id',$scope.new_name)
  .success((data) => {
    console.log(data);
  })
  .error((error) => {
    console.log(error);
  });

  $http.delete('/project/:id')
  .success((data) => {
    console.log(data);
  })
  .error((error) => {
    console.log(error);
  });

  $scope.msg = 'This is a simple test for the projects page controller'
};
