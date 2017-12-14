import angular from 'angular'

const userSessionService = angular.module('app.userSessionService', [])

.factory('loginService', ['$http', '$location', 'authToken', function ($http, $location, authToken) {
  var loginFactory = {}

  loginFactory.login = function ($scope) {
    $http({
      method: 'POST',
      url: '/api/user/login',
      data: $scope.user
    })
    .then(response => {
      if (response.data.success) {
        authToken.setToken(response.data.token)
        $scope.init()
        let path = '/project/' + response.data.info.name
        $location.path(path)
      }
    }, response => {
      $scope.showLoginMsgError = true
    })
  }

  loginFactory.logout = function () {
    authToken.setToken()
    $location.path('/')
  }

  loginFactory.isLoggedIn = function () {
    if (authToken.getToken()) return true
    return false
  }

  return loginFactory
}])

.factory('authToken', ['$window', function ($window) {
  var authTokenFactory = {}

  authTokenFactory.setToken = function (token) {
    if (token) $window.localStorage.setItem('token', token)
    else $window.localStorage.removeItem('token')
  }

  authTokenFactory.getToken = function () {
    return $window.localStorage.getItem('token')
  }

  return authTokenFactory
}])

export default userSessionService
