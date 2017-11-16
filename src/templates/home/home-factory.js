import angular from 'angular'

function init ($scope) {
  $scope.name = ''
  $scope.email = ''
  $scope.password = ''
  $scope.passwordReapet = ''
  $scope.isUserValid = false
}

const homeServices = angular.module('app.homeFactory', [])

.service('signUpService', ['$http', '$location', function ($http, $location) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/home/sign-up',
      data: { name: $scope.name, email: $scope.email, password: $scope.password }
    }).then((response) => {
      init($scope)
    })
  }
}]
)

.service('loginService', ['$http', '$location', function ($http, $location) {
  function init ($scope) {
    $scope.name = ''
    $scope.email = ''
    $scope.password = ''
    $scope.passwordReapet = ''
    $scope.isUserValid = false
  }
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/home/login',
      data: { name: $scope.name }
    })
    .then(function (response) {
      let val = response.data
      console.log(val)
      if (val[0].length !== 0 && (val[0].password === $scope.password) && (val[0].name === $scope.name)) {
        $scope.isUserValid = true
        $location.path('/project/' + $scope.name)
        init($scope)
      } else {
        console.log('----->No such user ' + $scope.name)
        init($scope)
      }
    })
  }
}])

export default homeServices
