import angular from 'angular'

const usCtrl = angular.module('usModule', [])

.controller('usCtrl', ['$scope', '$stateParams', 'usService',
  function ($scope, $stateParams, usService) {
    $scope.userStories = []

    $scope.projectId = $stateParams.projectId

    $scope.us = {
      description: '',
      priority: 'low',
      points: 1,
      status: 'todo'
    }

    $scope.usCreationForm = {
      show: false,
      descriptionFormat: /^([a-z]|[A-Z])[a-zA-Z0-9 ]+$/
    }

    $scope.usDetails = {
      show: false,
      id: undefined,
      description: '',
      priority: undefined,
      points: undefined,
      status: undefined
    }

    $scope.isEditing = false

    $scope.usComparator = {
      id: undefined,
      description: '',
      priority: undefined,
      points: undefined,
      status: undefined
    }

    usService.get($scope)

    $scope.newUsBtn = function () {
      $scope.usCreationForm.show = true
    }

    $scope.clickCancelBtn = function () {
      $scope.usCreationForm.show = false
    }

    $scope.create = function () {
      usService.create($scope)
    }

    $scope.showDetails = function (userStory) {
      $scope.usDetails.show = true
      $scope.usDetails.id = userStory.id
      $scope.usDetails.description = userStory.description
      $scope.usDetails.priority = userStory.priority
      $scope.usDetails.points = userStory.points
      $scope.usDetails.status = userStory.status
    }

    $scope.editUs = function () {
      $scope.isEditing = true
      $scope.usComparator.id = $scope.usDetails.id
      $scope.usComparator.description = $scope.usDetails.description
      $scope.usComparator.priority = $scope.usDetails.priority
      $scope.usComparator.points = $scope.usDetails.points
      $scope.usComparator.status = $scope.usDetails.status
    }

    $scope.deleteUs = function (userStory) {
      $scope.us.id = userStory.id
      $scope.us.description = userStory.description
      $scope.us.priority = userStory.priority
      $scope.us.points = userStory.points
      $scope.us.status = userStory.status
      usService.delete($scope)
    }

    $scope.cancelUpdate = function () {
      $scope.isEditing = false
    }

    $scope.updateUs = function (usDetails) {
      $scope.isEditing = false
      if ($scope.usComparator.description !== $scope.usDetails.description) {
        $scope.us.description = $scope.usComparator.description
      }
      if ($scope.usComparator.priority !== $scope.usDetails.priority) {
        $scope.us.priority = $scope.usComparator.priority
      }
      if ($scope.usComparator.points !== $scope.usDetails.points) {
        $scope.us.points = $scope.usComparator.points
      }
      if ($scope.usComparator.status !== $scope.usDetails.status) {
        $scope.us.status = $scope.usComparator.status
      }
      $scope.us.id = $scope.usComparator.id

      usService.update($scope)
    }
  }])

export default usCtrl
