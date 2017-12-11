import angular from 'angular'

const teamServices = angular.module('app.teamFactory', [])

teamServices.factory('teamService', function ($http, $stateParams) {
  let teamFactory = {}

  teamFactory.getUsers = function ($scope) {
    $http({
      method: 'GET',
      url: '/api/user'
    }).then((response) => {
      $scope.UsersList = []
      for (let i = 0; i < response.data.data.length; i++) {
        $scope.UsersList.push(response.data.data[i].name)
      }
    })
  }

  teamFactory.create = function ($scope) {
    $http({
      method: 'POST',
      url: '/api/member',
      data: {
        username: $scope.newMember.name,
        userRole: $scope.newMember.role,
        projectId: $stateParams.projectId
      }
    }).then(response => {
      this.get($scope)
    })
  }

  teamFactory.get = function ($scope) {
    $http({
      method: 'GET',
      url: '/api/member',
      params: {
        projectId: $stateParams.projectId
      }
    }).then(response => {
      $scope.members = []
      for (let i = 0; i < response.data.data.length; i++) {
        $scope.members.push(response.data.data[i].name)
      }
    })
  }
  teamFactory.update = function ($scope) {

  }
  teamFactory.delete = function ($scope) {

  }

  return teamFactory
})

export default teamServices
