var projectController = angular.module('projectController',[])
import projectService  from  './services'

projectController.controller('projectController', function ($scope, projectService) {
  $scope.submit     = function(){
    var data = { name        : $scope.name,
                 depot       : $scope.repository,
                 description : $scope.description
    }
    return  projectService.create_project(data)
  }
  $scope.projects  = projectService.get_all_project_from_user()

  $scope.project   = projectService.get_one_project_from_user()

  $scope.update    = function(){
    var data = { name        : $scope.name,
                 depot       : $scope.repository,
                 description : $scope.description
    }
    return projectService.update_project(data)
  }

  $scope.delete_project = projectService.delete_project()
  //$scope.msg = 'This is a simple test for the projects page controller'
}
module.exports = projectController
