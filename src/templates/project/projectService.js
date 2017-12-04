import angular from 'angular'
import _ from 'lodash'

const projectServices = angular.module('services', [])

.factory('projectService', function ($http) {
  let projectFactory = {}

  projectFactory.create = function ($scope) {
    $http({
      method: 'POST',
      url: '/api/project',
      data: { name: $scope.project.name, git: $scope.project.git, description: $scope.project.description, ownerName: $scope.project.ownerName }
    })
    .then((response) => {
      this.get($scope)

      $scope.projectCreationForm.show = false
      $scope.init()
    })
  }

  projectFactory.get = function ($scope) {
    $http({
      method: 'GET',
      url: '/api/project',
      params: {ownerName: $scope.project.ownerName}
    })
    .then((response) => {
      $scope.projects = []
      for (let i = 0; i < response.data.data.length; i++) {
        $scope.projects.push({
          id: response.data.data[i].id,
          name: response.data.data[i].name,
          description: response.data.data[i].description,
          git: response.data.data[i].git_url,
          ownerId: response.data.data[i].creator_id
        })
      }
    })
  }

  projectFactory.update = function ($scope) {
    $http({
      method: 'PUT',
      url: '/api/project',
      data: {id: $scope.project.id, name: $scope.project.name, git: $scope.project.git, description: $scope.project.description}
    })
    .then((response) => {
      $scope.init()
    })
  }

  projectFactory.delete = function ($scope) {
    $http({
      method: 'DELETE',
      url: '/api/project',
      params: {id: $scope.project.id}
    })
    .then(response => {
      _.remove($scope.projects, project => (
        project.id === $scope.project.id &&
        project.name === $scope.project.name &&
        project.description === $scope.project.description &&
        project.git === $scope.project.git
      ))
    })
  }

  return projectFactory
})

.factory('projectEventHandler', function () {
  let eventHandler = {}
  eventHandler.closeForm = function ($scope, $event) {
    if ($event.target.id === 'create-project-form') {
      $scope.projectCreationForm.show = false
      $scope.showUpdateForm = false
    }
  }

  eventHandler.cancelBtn = function ($scope) {
    $scope.projectCreationForm.show = false
    $scope.showUpdateForm = false
  }
  return eventHandler
})

export default projectServices
