
import angular from 'angular'

var homeModule = angular.module('homeModule', [])

homeModule.controller('homeCtrl',
  ['$scope', 'signUpService', 'loginService',
    function ($scope, signUpService, loginService) {
      $scope.signUpBtnActivated = false
      $scope.loginBtnActivated = false

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

      $scope.clickSignUp = function () {
        $scope.signUpBtnActivated = true
      }

      $scope.clickCancelBtn = function () {
        $scope.signUpBtnActivated = false
        $scope.loginBtnActivated = false
        $scope.user.init()
      }

      $scope.submitSignUpData = function () {
        $scope.signUpBtnActivated = false
        signUpService($scope)
        $scope.user.init()
      }

      $scope.clickLogin = function () {
        $scope.loginBtnActivated = true
      }

      $scope.submitLoginData = function () {
        $scope.loginBtnActivated = false
        loginService($scope)
        $scope.user.init()
      }
    }
  ])

export default homeModule
