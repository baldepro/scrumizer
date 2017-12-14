import angular from 'angular'
var sprintServices = angular.module('app.sprintFactory', [])

.factory('sprintFactory', function ($http, $location) {
  let sprintFactory = {}

  sprintFactory.get = function ($scope) {
    $http({
      method: 'GET',
      url: '/api/sprint',
      params: {projectId: $scope.projectId}
    }).then(response => {
      $scope.sprints = []
      for (let i = 0; i < response.data.data.length; i++) {
        $scope.sprints.push({
          id: response.data.data[i].id,
          start_time: response.data.data[i].start_time,
          end_time: response.data.data[i].end_time,
          projectId: response.data.data[i].project_id
        })
      }
    })
  }

  sprintFactory.create = function ($scope) {
    $http({
      method: 'POST',
      url: '/api/sprint',
      data: {
        start_time: $scope.sprint.start_time,
        end_time: $scope.sprint.end_time,
        projectId: parseInt($scope.projectId)
      }
    }).then(response => {
      $scope.clickCancelBtn()
      this.get($scope)
    })
  }

  sprintFactory.update = function ($scope) {
    $http({
      method: 'PUT',
      url: '/api/sprint',
      data: {
        id: $scope.sprint.id,
        start_time: $scope.sprint.start_time,
        end_time: $scope.sprint.end_time
      }
    }).then(response => {
      this.get($scope)
    })
  }

  sprintFactory.delete = function ($scope) {
    $http({
      method: 'DELETE',
      url: '/api/sprint',
      params: {
        id: $scope.sprint.id
      }
    }).then(response => {
      this.get($scope)
    })
  }
  sprintFactory.openUs = function (sprint) {
    $location.path('/sprint_us/' + sprint.projectId + '/' + sprint.id)
  }
  sprintFactory.openTasks = function (sprint) {
    $location.path('/task/' + sprint.projectId + '/' + sprint.id)
  }
  return sprintFactory
})

export default sprintServices
