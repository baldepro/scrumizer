var LoginPage = function () {
  this.urlPage = function () {
    return 'http://localhost:3000/login'
  }

  this.enterFieldName = function (name) {
    return element(by.css('.name')).sendKeys(name)
  }

  this.enterFieldPassword = function (password) {
    return element(by.css('.password')).sendKeys(password)
  }

  this.clickSubmit = function () {
    element(by.buttonText('Submit')).click()
  }
}

module.exports = new LoginPage()
