import _ from 'lodash'
import angular from 'angular'

var usCtrl = angular.module('usCtrl', [])

.controller('usCtrl',
  ['$scope', '$stateParams', '$location', 'createUsService', 'getUsService', 'deleteUsService', 'updateUsService',
    function ($scope, $stateParams, $location, createUsService, getUsService, deleteUsService, updateUsService) {
      $scope.us = []
      $scope.createUsBtnActivated = false
      $scope.idProject = $stateParams.project_id
      $scope.clickCreateUsBtn = function () {
        $scope.createUsBtnActivated = true
      }
      $scope.clickCancelBtn = function () {
        $scope.createUsBtnActivated = false
      }

      getUsService($scope)

      $scope.oneUs = {
        id: '',
        description: '',
        priority: '',
        cost: '',
        states: '',
        project_id: '',
        init: function () {
          this.id = ''
          this.description = ' '
          this.priority = ' '
          this.cost = ' '
          this.states = ' '
          this.project_id = ' '
        }
      }
      $scope.clickSprint = function () {
        $location.path('/sprint/' + $stateParams.project_id)
      }

      $scope.clickBacklog = function () {
        $location.path('/us/' + $stateParams.project_id)
      }

      $scope.create = function () {
        while ($scope.us.length !== 0) {
          $scope.us.splice(0, 1)
        }
        createUsService($scope)
        getUsService($scope)
        $scope.createUsBtnActivated = false
      }

      $scope.onEditClick = us => {
        us.isEditing = true
      }

      $scope.onCancelClick = us => {
        us.isEditing = false
      }

      $scope.upadteUs = us => {
        us.isEditing = false

        if (us.updatedDesc !== undefined) us.description = us.updatedDesc
        if (us.updatedPriority !== undefined) us.priority = us.updatedPriority
        if (us.updatedPoints !== undefined) us.cost = us.updatedPoints
        if (us.updatedStatus !== undefined) us.states = us.updatedStatus
        // if (us.updatedProjectId !== undefined) us.project_id = us.updatedProjectId

        $scope.oneUs.id = us.id
        $scope.oneUs.description = us.description
        $scope.oneUs.priority = us.priority
        $scope.oneUs.cost = us.cost
        $scope.oneUs.states = us.states
        $scope.oneUs.projectId = us.project_id

        updateUsService($scope)
      }

      $scope.deleteUs = usToDelete => {
        $scope.oneUs.id = usToDelete.id
        $scope.oneUs.description = usToDelete.description
        $scope.oneUs.priority = usToDelete.priority
        $scope.oneUs.cost = usToDelete.cost
        $scope.oneUs.states = usToDelete.states
        $scope.oneUs.projectId = usToDelete.project_id

        deleteUsService($scope)

        _.remove($scope.us, usy => (
        usy.priority === usToDelete.priority &&
        usy.description === usToDelete.description &&
        usy.cost === usToDelete.cost &&
        usy.states === usToDelete.states &&
        usy.projectId === usToDelete.projectId
      )
        )
      }
    }])

export default usCtrl
