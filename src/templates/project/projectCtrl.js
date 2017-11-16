import _ from 'lodash'
export default function ($scope) {
  var createProjectForm = document.getElementById('create-project-form')
  $scope.projects = [{
    name: 'Project 1',
    updatedName: 'Project 1',
    description: 'My first project',
    updatedDesc: 'My first project',
    gitRepository: 'Ataline'
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
      updatedName: $scope.name,
      description: $scope.description,
      updatedDesc: $scope.description,
      gitRepository: $scope.gitRepository
    })
    createProjectForm.style.display = 'none'
  }

  $scope.onEditClick = project => {
    project.isEditing = true
  }

  $scope.onCancelClick = project => {
    project.isEditing = false
  }

  $scope.upadteProject = project => {
    project.isEditing = false
    project.name = project.updatedName
    project.description = project.updatedDesc
  }

  $scope.deleteProject = projectToDelete => {
    _.remove($scope.projects,
       project => (project.name === projectToDelete.name && project.description === projectToDelete.description))
  }

  $scope.submit = function () {
    // var data = { name: $scope.name,
    //   depot: $scope.repository,
    //   description: $scope.description
    // }
    // return null// projectService.create_project(data)
  }
  // $scope.projects = projectService.get_all_project_from_user()

  // $scope.project = projectService.get_one_project_from_user()

  $scope.update = function () {
    // var data = { name: $scope.name,
    //   depot: $scope.repository,
    //   description: $scope.description
    // }
    // return null// projectService.update_project(data)
  }

  // $scope.delete_project = projectService.delete_project()
}
