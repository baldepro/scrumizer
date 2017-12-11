import angular from 'angular'

const teamCtrl = angular.module('teamModule', [])

teamCtrl.controller('teamCtrl', ['$scope', 'teamService', function ($scope, teamService) {
  $scope.UsersList = []

  $scope.user = {
    name: ''
  }

  $scope.filterUser = undefined

  $scope.activateBtn = false

  $scope.hideThis = false

  $scope.addMember = false

  $scope.members = []

  $scope.newMember = {
    name: '',
    role: ''
  }

  teamService.get($scope)

  $scope.newMemberBtn = function () {
    teamService.getUsers($scope)
    $scope.addMember = true
  }

  $scope.complete = function (string) {
    let output = []
    angular.forEach($scope.UsersList, function (username) {
      if (username.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
        output.push(username)
      }
    })

    $scope.filterUser = output
  }

  $scope.fillTextbox = function (string) {
    $scope.user.name = string
    $scope.activateBtn = true
    $scope.hideThis = true
  }

  $scope.addNewMember = function (user) {
    $scope.newMember.name = user
    $scope.newMember.role = 'developer'
    teamService.create($scope)
    $scope.addMember = false
  }
}])

export default teamCtrl
