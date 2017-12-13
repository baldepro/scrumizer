import angular from 'angular'
var sprintServices = angular.module('app.sprintFactory', [])

.service('createSprintService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/sprint/create',
      data: { start_time: $scope.sprint.start_time, end_time: $scope.sprint.end_time, project_id: $scope.idProject }
    })
    .then((response) => {
    }, (error) => {
      console.log('error: ' + error)
    })
  }
})
.service('getSprintService', function ($http) {
  return function ($scope) {
    $http({
      method: 'GET',
      url: '/sprint/' + $scope.idProject
    })
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        $scope.sprints.push({
          id: response.data[i].id,
          start_time: response.data[i].start_time,
          end_time: response.data[i].end_time,
          project_id: response.data[i].project_id
        })
      }
    }, (error) => {
      console.log('error: ' + error)
    })
  }
})
.service('getUsOfSprintService', function ($http) {
  return function ($scope) {
    $http({
      method: 'GET',
      url: '/sprint/' + $scope.idProject + '/' + $scope.sprint.id
    })
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        $scope.usOfSprint.push({
          id: response.data[i].id,
          description: response.data[i].description,
          priority: response.data[i].priority,
          cost: response.data[i].points,
          states: response.data[i].status,
          project_id: response.data[i].project_id
        })
      }
    })
  }
})
.service('getTasksOfSprintService', function ($http) {
  return function ($scope) {
    $http({
      method: 'GET',
      url: '/sprint/' + $scope.idProject + '/' + $scope.sprint.id
    })
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        $scope.tasksOfSprint.push({
          id: response.data[i].id,
          description: response.data[i].description,
          status: response.data[i].status,
          developer_id: response.data[i].developer_id,
          sprint_id: response.data[i].sprint_id
        })
      }
    })
  }
})
.service('deleteSprintService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/sprint/delete',
      data: {id: $scope.sprint.id, project_id: $scope.sprint.project_id}
    })
    .then((response) => {
    }, (error) => {
      console.log('error: ' + error)
    })
  }
})
.service('updateSprintService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/sprint/update',
      data: {id: $scope.sprint.id, start_time: $scope.sprint.start_time, end_time: $scope.sprint.end_time, project_id: $scope.sprint.project_id}
    })
    .then((response) => {

    }, (error) => {
      console.log('error: ' + error)
    })
  }
})

export default sprintServices
