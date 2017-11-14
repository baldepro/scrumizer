export default function ($scope) {
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
}
