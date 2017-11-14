var SignUpPage = function () {
  this.urlPage = function () {
    return 'http://localhost:3000/sign-up'
  }

  this.enterFieldName = function (name) {
    return element(by.model('name')).sendKeys(name)
  }

  this.enterFieldEmail = function (email) {
    return element(by.model('email')).sendKeys(email)
  }

  this.enterFieldPassWord = function (password) {
    return element(by.model('password')).sendKeys(password)
  }

  this.clickSubmit = function () {
    element(by.buttonText('Submit')).click()
  }
}

module.exports = new SignUpPage()
