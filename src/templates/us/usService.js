import angular from 'angular'
const usServices = angular.module('app.usFactory', [])

.factory('usService', function ($http) {
  let usFactory = {}

  usFactory.get = function ($scope) {
    $http({
      method: 'GET',
      url: '/api/userStory',
      params: {projectId: $scope.projectId}
    }).then(response => {
      $scope.userStories = []
      for (let i = 0; i < response.data.data.length; i++) {
        $scope.userStories.push({
          id: response.data.data[i].id,
          description: response.data.data[i].description,
          priority: response.data.data[i].priority,
          points: response.data.data[i].points,
          status: response.data.data[i].status
        })
      }
    })
  }

  usFactory.create = function ($scope) {
    console.log($scope.us)
    $http({
      method: 'POST',
      url: '/api/userStory',
      data: {
        description: $scope.us.description,
        priority: $scope.us.priority,
        points: $scope.us.points,
        status: $scope.us.status,
        projectId: parseInt($scope.projectId)
      }
    }).then(response => {
      $scope.clickCancelBtn()
      this.get($scope)
    })
  }

  usFactory.update = function ($scope) {
    $http({
      method: 'PUT',
      url: '/api/userStory',
      data: {
        id: $scope.us.id,
        description: $scope.us.description,
        priority: $scope.us.priority,
        points: $scope.us.points,
        status: $scope.us.status
      }
    }).then(response => {
      this.get($scope)
    })
  }

  usFactory.delete = function ($scope) {
    $http({
      method: 'DELETE',
      url: '/api/userStory',
      params: {
        id: $scope.us.id
      }
    }).then(response => {
      this.get($scope)
    })
  }
  return usFactory
})

export default usServices
