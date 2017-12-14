import angular from 'angular'
const taskServices = angular.module('app.taskService', [])

.factory('taskFactory', function ($http) {
  let taskFactory = {}

  taskFactory.get = function ($scope) {
    $http({
      method: 'GET',
      url: '/api/task',
      params: {sprintId: $scope.sprintId}
    }).then(response => {
      $scope.tasks = []
      for (let i = 0; i < response.data.data.length; i++) {
        $scope.tasks.push({
          id: response.data.data[i].id,
          description: response.data.data[i].description,
          status: response.data.data[i].status,
          developerId: response.data.data[i].developer_id,
          sprintId: response.data.data[i].sprint_id
        })
      }
    })
  }

  taskFactory.create = function ($scope) {
    $http({
      method: 'POST',
      url: '/api/task',
      data: {
        description: $scope.task.description,
        status: $scope.task.status,
        developerId: $scope.task.developerId,
        sprintId: parseInt($scope.sprintId)
      }
    }).then(response => {
      $scope.clickCancelBtn()
      this.get($scope)
    })
  }

  taskFactory.update = function ($scope) {
    $http({
      method: 'PUT',
      url: '/api/task',
      data: {
        id: $scope.task.id,
        description: $scope.task.description,
        status: $scope.task.status,
        developerId: $scope.developerId,
        sprintId: parseInt($scope.sprintId)
      }
    }).then(response => {
      this.get($scope)
    })
  }

  taskFactory.delete = function ($scope) {
    $http({
      method: 'DELETE',
      url: '/api/task',
      params: {
        id: $scope.task.id
      }
    }).then(response => {
      this.get($scope)
    })
  }
  return taskFactory
})

export default taskServices
