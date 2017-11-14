
export default function ($scope, homeFactory) {
  var signUpForm = document.getElementById('sign-up-form')
  var loginForm = document.getElementById('login-form')

  $scope.isUserValid = false
  function init () {
    $scope.name = ''
    $scope.email = ''
    $scope.password = ''
    $scope.passwordReapet = ''
    $scope.isUserValid = false
  }

  $scope.clickSignUp = function () {
    // Get the modal
    signUpForm.style.display = 'block'
    signUpForm.style.width = 'auto'
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === signUpForm) {
        signUpForm.style.display = 'none'
      }
    }
  }

  $scope.clickCancelBtn = function () {
    init()
    signUpForm.style.display = 'none'
    loginForm.style.display = 'none'
  }

  $scope.submitSignUpData = function () {
    signUpForm.style.display = 'none'
    homeFactory.createUserAccount($scope)
  }

  $scope.clickLogin = function () {
    // Get the modal
    loginForm.style.display = 'block'
    loginForm.style.width = 'auto'
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === loginForm) {
        loginForm.style.display = 'none'
      }
    }
  }

  $scope.submitLoginData = function () {
    loginForm.style.display = 'none'
    homeFactory.canUserLogIn($scope, $scope.name)
  }
}
