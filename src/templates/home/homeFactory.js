import angular from 'angular'

const homeServices = angular.module('app.homeFactory', [])

.factory('signUpService', ['$http', '$location', function ($http, $location) {
  function areDataValid ($scope) {
    return $scope.user.name && $scope.user.password && $scope.user.email &&
           ($scope.user.password === $scope.user.passwordBis)
  }

  return function ($scope) {
    if (areDataValid($scope)) {
      $http({
        method: 'POST',
        url: '/api/user/signup',
        data: { name: $scope.user.name, email: $scope.user.email, password: $scope.user.password }
      }).then((response) => {
        if (response.data.success) $scope.signupForm.show = false
        $scope.user.init()
      })
    }
  }
}])

.factory('eventHandler', [function () {
  var eventHandlerFactory = {}

  eventHandlerFactory.clickLoginBtn = function ($scope) {
    $scope.loginForm.show = true
  }

  eventHandlerFactory.clickSignupBtn = function ($scope) {
    $scope.signupForm.show = true
  }

  eventHandlerFactory.clickCancelBtn = function ($scope) {
    $scope.signupForm.show = false
    $scope.loginForm.show = false
    $scope.user.init()
  }

  eventHandlerFactory.clickCloseForm = function ($scope, $event) {
    if ($event.target.id === 'login-form') {
      $scope.loginForm.show = false
    } else if ($event.target.id === 'sign-up-form') {
      $scope.signupForm.show = false
    }
  }

  return eventHandlerFactory
}])

export default homeServices
