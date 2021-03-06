describe('To test the home page', function () {
  let homeUrl = 'http://localhost:8080/'
  const name = 'failer'
  const email = 'failer@email.fr'
  const password = 'torototo'
  const wrongName = 'tot'
  const wrongPassword = 'tototo'
  const time = 2000

  var homePage = require('./pages/home/home-page')

  // Home page test
  it('Should be able to find two buttons', function () {
    browser.get(homeUrl)
    expect(homePage.isBtnPresent('login-btn')).toBe(true)
    expect(homePage.isBtnPresent('sign-up-btn')).toBe(true)
  })

  // Sign up page test
  describe('Test the sign up and login functionnalities', function () {
    var signUpPage = require('./pages/home/sign-up-page')
    it('should fill up the form and click the submit button', function () {
      homePage.clickBtn('sign-up-btn')
      signUpPage.enterFieldName(name)
      .then(function () {
        signUpPage.enterFieldEmail(email)
      })
      .then(function () {
        signUpPage.enterFieldPassWord(password)
      })
      .then(function () {
        signUpPage.enterFieldPassWordBis(password)
      })
      .then(function () {
        signUpPage.clickSubmit()
      })
    })
  })

  // Login page test
  describe('Test the login functionnality', function () {
    var loginPage = require('./pages/home/login-page')

    it('should stay to the login page after wrong given information', function () {
      homePage.clickBtn('login-btn')
      loginPage.enterFieldName(wrongName)
      .then(function () {
        loginPage.enterFieldPassword(wrongPassword)
      })
      .then(function () {
        loginPage.clickSubmit()
      })
    })

    it('should stay to the login page after when all fields are not filled up', function () {
      homePage.clickBtn('login-btn')
      loginPage.enterFieldName('')
      .then(function () {
        loginPage.enterFieldPassword(wrongPassword)
      })
      .then(function () {
        loginPage.clickSubmit()
      })
    })

    it('should move to the user projects page  after the click on the submit button', function () {
      homePage.clickBtn('login-btn')
      loginPage.enterFieldName(name)
      .then(function () {
        loginPage.enterFieldPassword(password)
      })
      .then(function () {
        loginPage.clickSubmit()
      })
    })
  })

  // // Projects page
  describe('Test the Project page', function () {
    var projectPage = require('./pages/project/project-page')

    // Test the content of the projects page
    it('should contain a button and a table', function () {
      browser.driver.sleep(10000)
      expect(projectPage.isBtnPresent('create-project-btn')).toBe(true)
    })

    // Create project button
    it('should move to the project creation page', function () {
      projectPage.clickBtn()
    })

    // Project creation page
    describe('Test the project creation page', function () {
      let createProjectPage = require('./pages/project/create-project-page')

      it('Should be able to fill up the form and submit data', function () {
        createProjectPage.enterFieldName('project 1')
        .then(function () {
          createProjectPage.enterFieldDescription('this is my first project')
        })
        .then(() => {
          createProjectPage.enterFieldGit('git.com/scrum')
        })
        .then(function () {
          createProjectPage.clickSubmit()
        })
      })
    })
  })
})
