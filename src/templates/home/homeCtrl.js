
import angular from 'angular'

var homeModule = angular.module('homeModule', [])

homeModule.controller('homeCtrl',
  ['$scope', 'signUpService', 'loginService', 'eventHandler', function ($scope, signUpService, loginService, eventHandler) {
    $scope.signupForm = {
      show: false,
      minLength: 6,
      maxLength: 10,
      nameFormat: /^[a-zA-Z][a-zA-Z0-9]+$/,
      mailFormat: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    }

    $scope.loginForm = {
      show: false
    }

    $scope.user = {
      name: '',
      email: '',
      password: '',
      passwordBis: '',
      init: function () {
        this.name = ''
        this.email = ''
        this.password = ''
        this.passwordBis = ''
      }
    }

    $scope.showLoginMsgError = false

    $scope.clickSignUpBtn = function () {
      eventHandler.clickSignupBtn($scope)
    }

    $scope.clickLoginBtn = function () {
      eventHandler.clickLoginBtn($scope)
    }

    $scope.clickCancelBtn = function () {
      eventHandler.clickCancelBtn($scope)
    }

    $scope.submitSignUpData = function () {
      signUpService($scope)
    }

    $scope.submitLoginData = function () {
      loginService.login($scope)
    }

    $scope.closeForm = function ($event) {
      eventHandler.clickCloseForm($scope, $event)
    }
  }
  ])

.directive('verifyPassword', function () {
  return {
    restrict: 'A',
    controller: function ($scope) {
      $scope.passwordsMatched = false
      $scope.doVerification = function (values) {
        values.forEach(element => {
          if (element === $scope.user.passwordBis) {
            $scope.passwordsMatched = true
          } else {
            $scope.passwordsMatched = false
          }
        })
      }
    },
    link: function (scope, element, attrs) {
      attrs.$observe('verifyPassword', function () {
        scope.passwords = JSON.parse(attrs.verifyPassword)
        scope.doVerification(scope.passwords)
      })

      scope.$watch('user.passwordBis', function () {
        scope.passwords = JSON.parse(attrs.verifyPassword)
        scope.doVerification(scope.passwords)
      })
    }

  }
})

export default homeModule
