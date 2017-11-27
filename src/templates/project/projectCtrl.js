import _ from 'lodash'
import angular from 'angular'

var projectCtrlModule = angular.module('homeCtrlModule', [])

.controller('projectCtrl',
  ['$scope', '$location', 'createProjectService', 'getProjectsService', 'deleteProjectService', 'updateProjectService', 'getOneProjectsService',
    function ($scope, $location, createProjectService, getProjectsService, deleteProjectService, updateProjectService, getOneProjectsService) {
      $scope.projects = []

      getProjectsService($scope)

      $scope.project = {
        name: '',
        description: '',
        git: '',
        init: function () {
          this.name = ' '
          this.description = ' '
          this.git = ' '
        }
      }

      $scope.createProjectBtnActivated = false

      $scope.clickCreateProjectBtn = function () {
        $scope.createProjectBtnActivated = true
      }

      $scope.clickCancelBtn = function () {
        $scope.createProjectBtnActivated = false
      }

      $scope.create = function () {
        createProjectService($scope)
        $scope.createProjectBtnActivated = false
      }

      $scope.onEditClick = project => {
        project.isEditing = true
      }

      $scope.onCancelClick = project => {
        project.isEditing = false
      }

      $scope.upadteProject = project => {
        project.isEditing = false

        if (project.updatedName !== undefined) project.name = project.updatedName
        if (project.updatedDesc !== undefined) project.description = project.updatedDesc
        if (project.updatedGit !== undefined) project.git = project.updatedGit

        $scope.project.name = project.name
        $scope.project.description = project.description
        $scope.project.git = project.git

        updateProjectService($scope)
      }
      $scope.getBacklog = project => {
        project.isEditing = false
        $scope.proj = project
        getOneProjectsService($scope, $location)
      }
      $scope.deleteProject = projectToDelete => {
        $scope.project.name = projectToDelete.name
        $scope.project.description = projectToDelete.description
        $scope.project.git = projectToDelete.git

        deleteProjectService($scope)

        _.remove($scope.projects, project => (
      project.name === projectToDelete.name &&
      project.description === projectToDelete.description &&
      project.git === projectToDelete.git
    )
  )
      }
    }])

export default projectCtrlModule
