var userController = angular.module('userController', [])

userController.controller('userController', function ($scope, $http) {
  $scope.user = {}

  var submit = function () {
    var data = {
      name: $scope.userName,
      email: $scope.email
    }
    $http.post('/user', data)
    .success((res) => {
      console.log(res)
    })
    .error((error) => {
      console.log(error)
    })
  }

  $http.get('/user/:id')
  .success((res) => {
    $scope.user.push(res)
  })
  .error((error) => {
    console.log(error)
  })

  $http.put('/user/;id')
})
