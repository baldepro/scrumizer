import angular from 'angular'

const homeServices = angular.module('app.homeFactory', [])

.service('signUpService', ['$http', '$location', function ($http, $location) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/home/sign-up',
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
      url: '/home/login',
      data: { name: $scope.user.name }
    })
    .then((response) => {
      let val = response.data
      console.log(val)
      if (val[0].length !== 0 && (val[0].password === $scope.user.password) && (val[0].name === $scope.user.name)) {
        $scope.isUserValid = true
        $location.path('/project/' + $scope.user.name)
      } else {
        console.log('----->No such user ' + $scope.name)
      }
    })
  }
}])

export default homeServices
