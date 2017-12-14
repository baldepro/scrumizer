import angular from 'angular'

const sprintCtrlModule = angular.module('app.sprintModule', [])

.controller('sprintCtrl', ['$scope', '$stateParams', 'sprintFactory',
  function ($scope, $stateParams, sprintFactory) {
    $scope.sprints = []
    $scope.projectId = $stateParams.projectId
    $scope.sprint = {
      id: '',
      start_time: '',
      end_time: ''
    }

    $scope.sprintUpdate = undefined

    $scope.sprintComparator = {}

    $scope.sprintCreationForm = {
      show: false,
      nameFormat: /^([a-z]|[A-Z])[a-zA-Z0-9 ]+$/
      // gitFormat: /((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/
    }

    $scope.showUpdateForm = false

    sprintFactory.get($scope)

    $scope.init = function () {
      $scope.sprint.id = ''
      $scope.sprint.start_time = ''
      $scope.sprint.end_time = ''
    }

    $scope.openUs = function (sprint) {
      sprintFactory.openUs(sprint)
    }
    $scope.openTasks = function (sprint) {
      sprintFactory.openTasks(sprint)
    }
    $scope.newSprintBtn = function () {
      $scope.sprintCreationForm.show = true
    }

    $scope.create = function () {
      sprintFactory.create($scope)
    }

    $scope.clickCancelBtn = function () {
      $scope.sprintCreationForm.show = false
    }

    $scope.showSprintForm = function (sprint) {
      $scope.sprintUpdate = sprint
      $scope.sprintComparator.start_time = sprint.start_time
      $scope.sprintComparator.end_time = sprint.end_time

      $scope.showUpdateForm = true
    }

    $scope.update = function () {
      if ($scope.sprintUpdate.start_time !== undefined && $scope.sprintUpdate.start_time !== $scope.sprintComparator.start_time) {
        $scope.sprint.start_time = $scope.sprintUpdate.start_time
      } else {
        $scope.sprint.start_time = $scope.sprintComparator.start_time
      }
      if ($scope.sprintUpdate.end_time !== undefined && $scope.sprintUpdate.end_time !== $scope.sprintComparator.end_time) {
        $scope.sprint.end_time = $scope.sprintUpdate.end_time
      } else {
        $scope.sprint.end_time = $scope.sprintComparator.end_time
      }

      $scope.sprint.id = $scope.sprintUpdate.id
      sprintFactory.update($scope)

      $scope.showUpdateForm = false
    }

    $scope.delete = function (sprintToDelete) {
      $scope.sprint.id = sprintToDelete.id
      $scope.sprint.start_time = sprintToDelete.start_time
      $scope.sprint.end_time = sprintToDelete.end_time

      sprintFactory.delete($scope)
    }
  }
]
)

export default sprintCtrlModule
