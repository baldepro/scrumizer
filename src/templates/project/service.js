import angular from 'angular'
var projectServices = angular.module('services', [])

.service('createProjectService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/project/create',
      data: { name: $scope.project.name, git_url: $scope.project.git, description: $scope.project.description }
    })
    .then((response) => {
      $scope.projects.push({
        name: $scope.project.name,
        description: $scope.project.description,
        git: $scope.project.git
      })
    })
  }
})

.service('getProjectsService', function ($http) {
  return function ($scope) {
    $http({
      method: 'GET',
      url: '/project/'
    })
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        $scope.projects.push({
          id: response.data[i].id,
          name: response.data[i].name,
          description: response.data[i].description,
          git: response.data[i].git_url
        })
      }
      console.log(response.data)
    })
  }
})

.service('deleteProjectService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/project/delete',
      data: {name: $scope.project.name, git_url: $scope.project.git, description: $scope.project.description}
    })
    .then((response) => {
    })
  }
})

.service('updateProjectService', function ($http) {
  return function ($scope) {
    $http({
      method: 'POST',
      url: '/project/update',
      data: {name: $scope.project.name, git_url: $scope.project.git, description: $scope.project.description}
    })
    .then((response) => {
    })
  }
})

.service('getOneProjectsService', ['$http', '$location', function ($http, $location) {
  return function ($scope) {
    $http({
      method: 'GET',
      url: '/project/:name',
      data: {name: $scope.proj.name}
    })
    .then((response) => {
      $location.path('/us/' + $scope.proj.id)
    })
  }
}])

export default projectServices
