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

  // this.create_project = function (data) {
  //   $http.post('/project/:user_id', data)
  //   .success((res) => {
  //     return res
  //   })
  //   .error((error) => {
  //     return error
  //   })
  // }
  // this.get_all_project_from_user = function () {
  //   $http.get('/project/:user_id')
  //   .success((res) => {
  //     return res
  //   })
  //   .error((error) => {
  //     return error
  //   })
  // }
  // this.get_one_project_from_user = function () {
  //   $http.get('/project/:user_id')
  //   .success((res) => {
  //     return res
  //   })
  //   .error((error) => {
  //     return error
  //   })
  // }
  // this.update_project = function (data) {
  //   $http.put('/project/:id', data)
  //   .success((res) => {
  //     return res
  //   })
  //   .error((error) => {
  //     return error
  //   })
  // }
  // this.delete_project = function () {
  //   $http.delete('/project/:id')
  //   .success((res) => {
  //     return res
  //   })
  //   .error((error) => {
  //     return error
  //   })
  // }

export default projectServices
