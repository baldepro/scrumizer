var CreateProjectPage = function () {
  this.enterFieldName = function (name) {
    return element(by.css('.name')).sendKeys(name)
  }

  this.enterFieldDescription = function (description) {
    return element(by.css('.description')).sendKeys(description)
  }

  this.enterFieldGit = function (git) {
    return element(by.css('.git')).sendKeys(git)
  }

  this.clickSubmit = function () {
    element(by.buttonText('Submit')).click()
  }
}

module.exports = new CreateProjectPage()
