import _ from 'lodash'
import angular from 'angular'

const sprintCtrl = angular.module('sprintCtrl', [])

.controller('sprintCtrl',
  ['$scope', '$stateParams', '$location', 'createSprintService', 'getSprintService', 'deleteSprintService', 'updateSprintService', 'getUsOfSprintService', 'getTasksOfSprintService',
    function ($scope, $stateParams, $location, createSprintService, getSprintService, deleteSprintService, updateSprintService, getUsOfSprintService, getTasksOfSprintService) {
      $scope.sprints = []
      $scope.tasksOfSprint = []
      $scope.usOfSprint = []
      $scope.createUsBtnActivated = false
      $scope.idProject = $stateParams.project_id
      $scope.clickCreateUsBtn = function () {
        $scope.createUsBtnActivated = true
      }
      $scope.clickCancelBtn = function () {
        $scope.createUsBtnActivated = false
      }

      getSprintService($scope)

      $scope.sprint = {
        id: '',
        start_time: '',
        end_time: '',
        project_id: '',
        init: function () {
          this.id = ''
          this.start_time = ' '
          this.end_time = ' '
          this.project_id = ' '
        }
      }

      $scope.create = function () {
        while ($scope.sprints.length !== 0) {
          $scope.sprints.splice(0, 1)
        }
        createSprintService($scope)
        getSprintService($scope)
        $scope.createUsBtnActivated = false
      }
      $scope.clickSprint = function () {
        $location.path('/sprint/' + $stateParams.project_id)
      }

      $scope.clickBacklog = function () {
        $location.path('/us/' + $stateParams.project_id)
      }
      $scope.onEditClick = sprint => {
        sprint.isEditing = true
      }

      $scope.onCancelClick = sprint => {
        sprint.isEditing = false
      }

      $scope.upadteSprint = sprint => {
        sprint.isEditing = false

        if (sprint.updatedStart_time !== undefined) sprint.start_time = sprint.updatedStart_time
        if (sprint.updatedEnd_time !== undefined) sprint.end_time = sprint.updatedEnd_time

        $scope.sprint.id = sprint.id
        $scope.sprint.start_time = sprint.start_time
        $scope.sprint.end_time = sprint.end_time
        $scope.sprint.project_id = sprint.project_id

        updateSprintService($scope)
      }

      $scope.deleteSprint = sprintToDelete => {
        $scope.sprint.id = sprintToDelete.id
        $scope.sprint.start_time = sprintToDelete.start_time
        $scope.sprint.end_time = sprintToDelete.end_time
        $scope.sprint.project_id = sprintToDelete.project_id

        deleteSprintService($scope)

        _.remove($scope.sprints, sprint => (
        sprint.id === sprintToDelete.id &&
        sprint.start_time === sprintToDelete.start_time &&
        sprint.end_time === sprintToDelete.end_time &&
        sprint.project_id === sprintToDelete.project_id
      )
        )
      }
    }])

export default sprintCtrl
