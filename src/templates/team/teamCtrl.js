import angular from 'angular'

const teamCtrl = angular.module('teamModule', [])

teamCtrl.controller('teamCtrl', ['$scope', 'teamFactory', function ($scope, teamFactory) {
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

  teamFactory.get($scope)

  $scope.newMemberBtn = function () {
    teamFactory.getUsers($scope)
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
    teamFactory.create($scope)
  }

  $scope.deleteMember = function (member) {
    $scope.newMember.name = member
    teamFactory.delete($scope)
  }
}])

export default teamCtrl
