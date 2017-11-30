import angular from 'angular'
var usServices = angular.module('usServices', [])

.service('createUsService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/us/create',
      data: { description: $scope.us.description, priority: $scope.us.priority, points: $scope.us.cost, status: 'todo', project_id: $scope.idProject }
    })
    .then((response) => {
    }, (error) => {
      console.log('error: ' + error)
    })
  }
})
.service('getUsService', function ($http) {
  return function ($scope) {
    $http({
      method: 'GET',
      url: '/us/' + $scope.idProject
    })
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        $scope.us.push({
          id: response.data[i].id,
          description: response.data[i].description,
          priority: response.data[i].priority,
          cost: response.data[i].points,
          states: response.data[i].status,
          project_id: response.data[i].project_id
        })
      }
      // console.log(response.data)
    })
  }
})
.service('deleteUsService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/us/delete',
      data: {id: $scope.oneUs.id, description: $scope.oneUs.description, priority: $scope.oneUs.priority, points: $scope.oneUs.cost, status: $scope.oneUs.states, project_id: $scope.oneUs.project_id}
    })
    .then((response) => {
    }, (error) => {
      console.log('error: ' + error)
    })
  }
})
.service('updateUsService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/us/update',
      data: {id: $scope.oneUs.id, description: $scope.oneUs.description, priority: $scope.oneUs.priority, points: $scope.oneUs.cost, status: $scope.oneUs.states, project_id: $scope.oneUs.project_id}
    })
    .then((response) => {

    }, (error) => {
      console.log('error: ' + error)
    })
  }
})

export default usServices
