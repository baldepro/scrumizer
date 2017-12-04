import angular from 'angular'

const homeServices = angular.module('app.homeFactory', [])

.service('signUpService', ['$http', '$location', function ($http, $location) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/signup',
      data: { name: $scope.user.name, email: $scope.user.email, password: $scope.user.password }
    }).then((response) => {

    })
  }
}]
)

.service('loginService', ['$http', '$location', function ($http, $location) {
  return function ($scope) {
    $http({
      method: 'GET',
      url: '/login',
      data: { name: $scope.user.name, password: $scope.user.password }
    })
    .then(response => {
      if(response.data !== null){
        $scope.user.name = response.data[0].name
      }
      console.log(response.data[0].name)
    })
  }
}])

export default homeServices
