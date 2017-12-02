import angular from 'angular'

const homeServices = angular.module('app.homeFactory', [])

.service('signUpService', ['$http', '$location', function ($http, $location) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/api/user/signup',
      data: { name: $scope.user.name, email: $scope.user.email, password: $scope.user.password }
    }).then((response) => {

    })
  }
}]
)

.service('loginService', ['$http', '$location', function ($http, $location) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/api/user/login',
      data: { name: $scope.user.name, password: $scope.user.password }
    })
    .then(response => {
      console.log(response)
    })
  }
}])

export default homeServices
