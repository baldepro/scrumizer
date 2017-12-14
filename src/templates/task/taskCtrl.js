import angular from 'angular'

const taskCtrl = angular.module('app.taskModule', [])

.controller('taskCtrl', ['$scope', '$stateParams', 'taskFactory', 'teamFactory',
  function ($scope, $stateParams, taskFactory, teamFactory) {
    $scope.tasks = []
    $scope.members = []
    $scope.sprintId = $stateParams.sprintId
    $scope.task = {
      id: '',
      description: '',
      status: 'todo',
      developerId: '',
      sprintId: $stateParams.sprintId
    }
    teamFactory.get($scope)
    $scope.taskCreationForm = {
      show: false,
      descriptionFormat: /^([a-z]|[A-Z])[a-zA-Z0-9 ]+$/
    }

    $scope.taskDetails = {
      show: false,
      id: undefined,
      description: '',
      status: undefined,
      developerId: undefined
    }

    $scope.isEditing = false

    $scope.taskComparator = {
      id: undefined,
      description: '',
      status: undefined,
      developerId: undefined
    }

    taskFactory.get($scope)

    $scope.newTaskBtn = function () {
      $scope.taskCreationForm.show = true
    }

    $scope.clickCancelBtn = function () {
      $scope.taskCreationForm.show = false
    }

    $scope.create = function () {
      taskFactory.create($scope)
    }

    $scope.showDetails = function (task) {
      $scope.taskDetails.show = true
      $scope.taskDetails.id = task.id
      $scope.taskDetails.description = task.description
      $scope.taskDetails.status = task.status
      $scope.taskDetails.developerId = task.developerId
    }

    $scope.editTask = function () {
      $scope.isEditing = true
      $scope.taskComparator.id = $scope.taskDetails.id
      $scope.taskComparator.description = $scope.taskDetails.description
      $scope.taskComparator.status = $scope.taskDetails.status
      $scope.taskComparator.developerId = $scope.taskDetails.developerId
    }

    $scope.deleteTask = function (task) {
      $scope.task.id = task.id
      $scope.task.description = task.description
      $scope.task.status = task.status
      $scope.task.developerId = task.developerId
      taskFactory.delete($scope)
    }

    $scope.cancelUpdate = function () {
      $scope.isEditing = false
    }

    $scope.updateTask = function (taskDetails) {
      $scope.isEditing = false
      if ($scope.taskComparator.description !== $scope.taskDetails.description) {
        $scope.task.description = $scope.taskComparator.description
      }
      if ($scope.taskComparator.status !== $scope.taskDetails.status) {
        $scope.task.status = $scope.taskComparator.status
      }
      if ($scope.taskComparator.developerId !== $scope.taskDetails.developerId) {
        $scope.task.developerId = $scope.taskComparator.developerId
      }
      $scope.task.id = $scope.taskComparator.id

      taskFactory.update($scope)
    }
  }])

export default taskCtrl
