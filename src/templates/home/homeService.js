import angular from 'angular'

const homeServices = angular.module('app.homeService', [])

.service('signUpService', ['$http', '$location', function ($http, $location) {
  function areDataValid (data) {
    return data.user.name && data.user.password && data.user.email &&
           (data.user.password === data.user.passwordBis)
  }

  return function ($scope) {
    if (areDataValid($scope)) {
      $http({
        method: 'POST',
        url: '/api/user/signup',
        data: $scope.user
      }).then((response) => {
        if (response.data.success) $scope.signupForm.show = false
        $scope.init()
      })
    }
  }
}])

.factory('eventHandler', function () {
  let eventHandlerFactory = {}

  eventHandlerFactory.clickLoginBtn = function ($scope) {
    $scope.loginForm.show = true
  }

  eventHandlerFactory.clickSignupBtn = function ($scope) {
    $scope.signupForm.show = true
  }

  eventHandlerFactory.clickCancelBtn = function ($scope) {
    $scope.signupForm.show = false
    $scope.loginForm.show = false
    $scope.init()
  }

  eventHandlerFactory.clickCloseForm = function ($scope, $event) {
    if ($event.target.id === 'login-form') {
      $scope.loginForm.show = false
    } else if ($event.target.id === 'sign-up-form') {
      $scope.signupForm.show = false
    }
  }

  return eventHandlerFactory
})

export default homeServices
