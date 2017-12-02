var SignUpPage = function () {
  this.urlPage = function () {
    return 'http://localhost:3000/sign-up'
  }

  this.enterFieldName = function (name) {
    return element(by.css('.name')).sendKeys(name)
  }

  this.enterFieldEmail = function (email) {
    return element(by.css('.email')).sendKeys(email)
  }

  this.enterFieldPassWord = function (password) {
    return element(by.css('.password')).sendKeys(password)
  }

  this.enterFieldPassWordBis = function (password) {
    return element(by.css('.password-repeat')).sendKeys(password)
  }

  this.clickSubmit = function () {
    element(by.buttonText('Submit')).click()
  }
}

module.exports = new SignUpPage()
