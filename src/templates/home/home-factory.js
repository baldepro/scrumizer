import angular from 'angular'

const homeFactory = angular.module('app.homeFactory', [])

.factory('homeFactory', ['$http', '$location', function ($http, $location) {
  function init ($scope) {
    $scope.name = ''
    $scope.email = ''
    $scope.password = ''
    $scope.passwordReapet = ''
    $scope.isUserValid = false
  }
  // Indicates if a user can login with the given data
  function canUserLogIn ($scope, username) {
    $http({ method: 'GET', url: '/home/login'})
    .then(function (response) {
      $scope.isUserValid = (response.data.password === $scope.password) && (response.data.name === $scope.name)
      if ($scope.isUserValid) {
        $location.path('/project')
      } else {
        init($scope)
      }
    })
  }

  function createUserAccount ($scope) {
    $http({
      method: 'POST',
      url: '/home/sign-up',
      data: { name: $scope.name, email: $scope.email, password: $scope.password }
    }).then(function (response) {
      console.log('Data have been sent')
      init($scope)
      // TODO
    }).then(function (response) {
      // TODO
    })
  }

  return {
    canUserLogIn,
    createUserAccount
  }
}])

export default homeFactory
