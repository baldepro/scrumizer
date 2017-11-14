export default function ($scope, projectService) {
  var createProjectForm = document.getElementById('create-project-form')
  $scope.projects = [{
    name: 'project 1',
    description: 'My first project'
  }
  ]

  $scope.name = ''
  $scope.description = ''
  $scope.gitRepository = ''

  $scope.clickCreateProjectBtn = function () {
    // Get the modal
    createProjectForm.style.display = 'block'
    createProjectForm.style.width = 'auto'
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === createProjectForm) {
        createProjectForm.style.display = 'none'
      }
    }
  }

  $scope.clickCancelBtn = function () {
    createProjectForm.style.display = 'none'
  }

  $scope.create = function () {
    $scope.projects.push({
      name: $scope.name,
      description: $scope.description,
      gitRepository: $scope.gitRepository
    })
    createProjectForm.style.display = 'none'
  }

  // $scope.submit = function () {
  //   var data = { name: $scope.name,
  //     depot: $scope.repository,
  //     description: $scope.description
  //   }
  //   return projectService.create_project(data)
  // }
  // $scope.projects = projectService.get_all_project_from_user()

  // $scope.project = projectService.get_one_project_from_user()

  // $scope.update = function () {
  //   var data = { name: $scope.name,
  //     depot: $scope.repository,
  //     description: $scope.description
  //   }
  //   return projectService.update_project(data)
  // }

  // $scope.delete_project = projectService.delete_project()
}
