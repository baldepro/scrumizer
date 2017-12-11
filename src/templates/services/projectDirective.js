import angular from 'angular'

const header = angular.module('app.headerDirective', [])

header.controller('menuCtrl', ['$scope', '$location', '$stateParams', 'loginService',
  function ($scope, $location, $stateParams, loginService) {
    $scope.getSprintPage = function () {
      $location.path('/sprint/' + $stateParams.projectId)
    }

    $scope.getUsPage = function () {
      $location.path('/us/' + $stateParams.projectId)
    }

    $scope.getTeamPage = function () {
      $location.path('/team/' + $stateParams.projectId)
    }

    $scope.logout = function () {
      loginService.logout()
    }

    $scope.homePage = function () {
      $location.path('/project/')
    }

    $scope.samePage = function () {
      $location.path()
    }
  }])
header.directive('header', function () {
  return {
    restrict: 'E',
    template: require('./header.html'),
    controller: 'menuCtrl'
  }
})

header.directive('menuBar', function () {
  return {
    restrict: 'E',
    template: require('./menuBar.html'),
    controller: 'menuCtrl'
  }
})

header.directive('main', function () {
  return {
    restrict: 'E',
    template: '<div></div>'
  }
})

export default header
