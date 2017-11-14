var homeController = angular.module('homeController',[])
//import projectService  from  './services'

homeController.controller('homeController', function ($scope, $http) {
  $scope.msg = 'This is a simple test for the home page controller'
}
/*export default function ($scope) {
  $scope.msg = 'This is a simple test for the home page controller'
}*/
