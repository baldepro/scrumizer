import angular from 'angular'

const projectCtrlModule = angular.module('homeCtrlModule', [])

.controller('projectCtrl',
  ['$scope', 'projectService', '$stateParams', 'loginService', 'projectEventHandler',
    function ($scope, projectService, $stateParams, loginService, projectEventHandler) {
      $scope.projects = []

      $scope.project = {
        id: '',
        name: '',
        description: '',
        git: '',
        ownerName: $stateParams.name,
        hasChanged: false
      }

      $scope.projectUpdate = undefined

      $scope.projectComparator = {}

      $scope.projectCreationForm = {
        show: false,
        nameFormat: /^([a-z]|[A-Z])[a-zA-Z0-9 ]+$/
        // gitFormat: /((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/
      }

      $scope.showUpdateForm = false

      $scope.init = function () {
        $scope.project.id = ''
        $scope.project.name = ''
        $scope.project.description = ''
        $scope.project.git = ''
      }

      projectService.get($scope)

      $scope.logout = function () {
        loginService.logout()
      }

      $scope.newProjectBtn = function () {
        $scope.projectCreationForm.show = true
      }

      $scope.create = function () {
        projectService.create($scope)
      }

      $scope.closeForm = function ($event) {
        projectEventHandler.closeForm($scope, $event)
      }

      $scope.clickCancelBtn = function () {
        projectEventHandler.cancelBtn($scope)
      }

      $scope.showProjectForm = function (project) {
        $scope.projectUpdate = project
        $scope.projectComparator.name = project.name
        $scope.projectComparator.git = project.git
        $scope.projectComparator.description = project.description

        $scope.showUpdateForm = true
      }

      $scope.update = function () {
        if ($scope.projectUpdate.name !== undefined && $scope.projectUpdate.name !== $scope.projectComparator.name) {
          $scope.project.name = $scope.projectUpdate.name
          $scope.project.hasChanged = true
        } else {
          $scope.project.name = $scope.projectComparator.name
        }
        if ($scope.projectUpdate.git !== $scope.projectComparator.git) {
          $scope.project.git = $scope.projectUpdate.git === undefined ? '' : $scope.projectUpdate.git
          $scope.project.hasChanged = true
        } else {
          $scope.project.git = $scope.projectComparator.git
        }
        if ($scope.projectUpdate.description !== $scope.projectComparator.description) {
          $scope.project.description = ($scope.projectUpdate.description === undefined) ? '' : $scope.projectUpdate.description
          $scope.project.hasChanged = true
        } else {
          $scope.project.description = $scope.projectComparator.description
        }

        if ($scope.project.hasChanged) {
          $scope.project.id = $scope.projectUpdate.id
          projectService.update($scope)
        }

        $scope.showUpdateForm = false
      }

      $scope.deleteProject = function (projectToDelete) {
        $scope.project.id = projectToDelete.id
        $scope.project.name = projectToDelete.name
        $scope.project.git = projectToDelete.git
        $scope.project.description = projectToDelete.description

        projectService.delete($scope)
      }
    }
  ]
)

export default projectCtrlModule
